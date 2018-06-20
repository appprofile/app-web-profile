import { Component, OnInit } from '@angular/core';
/* Models. */
import { Courses } from '@models/courses';
import { Experience } from '@models/experience';
import { UserData } from '@models/user-data';
/* Services. */
import { ProfileService } from '@services/profile/profile.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profileID: string;
  public profile: UserData;
  public jobs: Experience[] = [];
  public courses: Courses[] = [];
  public abilities = [];
  public alertProp = {
    success: { cssClass: 'alert-success', timeout: 4000 },
    error: { cssClass: 'alert-danger', timeout: 4000 }
  };

  public job: Experience;
  public course: Courses;
  public abilitie;

  public edit = {
    profile: true,
    jobs: true,
    courses: true
  };

  constructor(public profileService: ProfileService,
    public flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.profile = new UserData();
    // User information.
    this.profileID = localStorage.getItem('user_id');
    // Get profile information.
    if (this.profileID) {
      this.fillObjects(this.profileID);
    }

    // Experiences.
    this.job = new Experience();
    this.course = new Courses();

    // Enable edition.
    this.edit.profile = true;
  }

  private addSkill(skill: string) {
    const found = this.abilities.find(function (element) {
      return element === skill;
    });
    if (skill !== '' && found === undefined) {
      this.abilities.push(skill);
    }
  }

  findExperience(id: string) {
    const found = this.jobs.find(function (element, index) {
      if (element.id === id) {
        element.index = index;
        return true;
      }
    });
    return found;
  }

  findCourse(id: string) {
    const found = this.courses.find(function (element, index) {
      if (element.id === id) {
        element.index = index;
        return true;
      }
    });
    return found;
  }

  onClickRegisterUserData() {

    if (this.jobs && this.jobs.length > 0) {
      this.profile.experiences = this.jobs;
    }
    if (this.courses && this.courses.length > 0) {
      this.profile.educations = this.courses;
    }
    if (this.abilities && this.abilities.length > 0) {
      this.profile.abilities = this.abilities;
    }

    if (this.profile.id === '') {
      // Setup profile ID.
      this.profile.id = this.profileID;

      this.profileService.registerUserData(this.profile).subscribe(
        (data) => {
          this.flashMessagesService.show('Datos Registrados correctamente.', this.alertProp.success);
          this.edit.profile = false;
        }, (error) => {
          this.flashMessagesService.show(`Error registrando datos del usuario. ${error.error.error_message}`, this.alertProp.error);
          // Restore the domain object.
          this.profile.id = '';
        }
      );
    } else {
      this.profileService.updateUserData(this.profile.id, this.profile).subscribe(
        (data) => {
          this.flashMessagesService.show('Datos Editados correctamente.', this.alertProp.success);
          this.edit.profile = false;
        }, (error) => {
          this.flashMessagesService.show(`Error editando datos del usuario. ${error.error.error_message}`, this.alertProp.error);
        }
      );
    }
  }

  onClickEditUserData() {
    this.edit.profile = true;
  }

  onClickAddJob() {
    // verifco que haya datos de usuario
    if (this.profile.id !== '') {

      this.job.from = new Date(this.job.from + ' 00:00:00').toISOString();
      this.job.to = new Date(this.job.to + ' 00:00:00').toISOString();

      if (this.job.id === '') {
        this.profileService.registerUserExperience(this.profile.id, this.job).subscribe(
          (data) => {
            this.flashMessagesService.show('Experiencia registrada correctamente.', this.alertProp.success);
            this.job.id = data.id;
            this.jobs.push(this.job);
            this.job = new Experience();
          }, (error) => {
            this.flashMessagesService.show(`Error registrando datos de la experiencia. ${error.error.error_message}`, this.alertProp.error);
          }
        );

      } else {
        this.profileService.updateUserExperience(this.profile.id, this.job.id, this.job).subscribe(
          (data) => {
            this.flashMessagesService.show('Experiencia registrada correctamente.', this.alertProp.success);
            const tmp = this.findExperience(this.job.id);
            if (tmp !== undefined) {
              this.jobs[this.job.index] = this.job;
            }
            this.job = new Experience();
          }, (error) => {
            this.flashMessagesService.show(`Error registrando datos de la experiencia. ${error.error.error_message}`, this.alertProp.error);
          }
        );
      }
    } else {
      this.flashMessagesService.show(`Error editando datos del usuario.`, this.alertProp.error);
    }
  }

  onClickEditJob(index: number) {
    if (index >= 0) {
      this.job = this.jobs[index];
    }
  }

  onClickDeleteJob(index: number) {
    if (index >= 0) {
      const tmp = this.jobs[index];
      this.profileService.deleteUserExperience(this.profile.id, tmp.id).subscribe(
        (data) => {
          this.flashMessagesService.show('Experiencia eliminada correctamente.', this.alertProp.success);
          this.jobs.splice(index, 1);
          this.job = new Experience();
        }, (error) => {
          this.flashMessagesService.show(`Error eliminando datos de la experiencia. ${error.error.error_message}`, this.alertProp.error);
        }
      );
    }
  }

  onClickAddCourse() {
    if (this.profile.id !== '') {

      this.course.from = new Date(this.course.from + ' 00:00:00').toISOString();
      this.course.to = new Date(this.course.to + ' 00:00:00').toISOString();

      if (this.course.id === '') {
        this.profileService.registerUserEducation(this.profile.id, this.course).subscribe(
          (data) => {
            this.flashMessagesService.show('Educacion registrada correctamente.', this.alertProp.success);
            this.course.id = data.id;
            this.courses.push(this.course);
            this.course = new Courses();
          }, (error) => {
            this.flashMessagesService.show(`Error registrando datos de la educacion. ${error.error.error_message}`, this.alertProp.error);
          }
        );

      } else {
        this.profileService.updateUserEducation(this.profile.id, this.course.id, this.course).subscribe(
          (data) => {
            this.flashMessagesService.show('Educacion registrada correctamente.', this.alertProp.success);
            const tmp = this.findCourse(this.course.id);
            if (tmp !== undefined) {
              this.courses[this.course.index] = this.course;
            }
            this.course = new Courses();
          }, (error) => {
            this.flashMessagesService.show(`Error registrando datos de la educacion. ${error.error.error_message}`, this.alertProp.error);
          }
        );
      }
    } else {
      this.flashMessagesService.show(`Error editando datos del usuario.`, this.alertProp.error);
    }
  }

  onClickEditCourse(index: number) {
    if (index >= 0) {
      this.course = this.courses[index];
    }
  }

  onClickDeleteCourse(index: number) {
    if (index >= 0) {
      const tmp = this.courses[index];
      this.profileService.deleteUserEducation(this.profile.id, tmp.id).subscribe(
        (data) => {
          this.flashMessagesService.show('Educacion eliminada correctamente.', this.alertProp.success);
          this.courses.splice(index, 1);
          this.course = new Courses();
        }, (error) => {
          this.flashMessagesService.show(`Error eliminando datos de la educacion. ${error.error.error_message}`, this.alertProp.error);
        }
      );
    }
  }

  onClickAddSkill() {
    if (this.profile.id !== '') {
      this.onClickRegisterUserData();
    }
  }

  onKeyDownAddSkill(event) {
    if (event.keyCode === 13) {
      this.addSkill(this.abilitie);
      this.abilitie = '';
    }
  }

  onClickDeleteSkill(index: number) {
    if (index >= 0) {
      this.onClickRegisterUserData();
      this.abilities.splice(index, 1);
      this.abilitie = '';

    }
  }

  fillObjects(profileID: string) {
    this.profileService.getUser(profileID).subscribe(
      (data) => {
        this.profile.id = data.id;
        this.profile.name = data.name;
        this.profile.address = data.address;
        this.profile.phone = data.phone;
        this.profile.description = (data.description !== undefined) ? data.description : '';
        this.profile.email = (data.email !== undefined) ? data.email : '';
        if (data.abilities.length > 0) {
          this.abilities = data.abilities;
        }

        if (data.experiences && data.experiences.length > 0) {
          this.fillExperiences(data.experiences);
        }

        if (data.educations && data.educations.length > 0) {
          this.fillCourses(data.educations);
        }

        // Disble edition.
        this.edit.profile = false;
      }, (error) => {
        /* this.flashMessagesService.show(`Error obteniendo datos del usuario. ${error.error.error_message}`, this.alertProp.error); */
      }
    );
  }

  private fillExperiences(experiences: any) {
    for (let index = 0; index < experiences.length; index++) {
      const element = experiences[index];
      const obj = new Experience();
      obj.id = element.id;
      obj.title = element.title;
      obj.company = element.company;
      obj.from = new Date(element.from).toISOString();
      obj.to = new Date(element.to).toISOString();
      obj.description = element.description;
      this.jobs.push(obj);
    }
  }
  private fillCourses(courses: any) {
    for (let index = 0; index < courses.length; index++) {
      const element = courses[index];
      const obj = new Courses();
      obj.id = element.id;
      obj.course = element.course;
      obj.institute = element.institute;
      obj.from = new Date(element.from).toISOString();
      obj.to = new Date(element.to).toISOString();
      obj.description = element.description;
      this.courses.push(obj);
    }
  }

}
