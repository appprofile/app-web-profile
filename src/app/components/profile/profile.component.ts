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

  public user: UserData;
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
    user: true,
    jobs: true,
    courses: true
  };

  constructor(public profileService: ProfileService,
    public flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    const storedToken: string = localStorage.getItem('user_id');
    this.user = new UserData();
    this.job = new Experience();
    this.course = new Courses();
    this.edit.user = true;
    if (storedToken) {
      this.user.id = storedToken;
      this.fillObjects(storedToken);
    }

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

    if (this.user.id === '') {
      if (this.abilities.length > 0) {
        this.user.abilities = this.abilities;
      }
      this.profileService.registerUserData(this.user).subscribe(
        (data) => {
          this.flashMessagesService.show('Datos Registrados correctamente.', this.alertProp.success);
          this.user.id = data.id;
          this.edit.user = false;
        }, (error) => {
          this.flashMessagesService.show(`Error registrando datos del usuario. ${error.error.error_message}`, this.alertProp.error);
        }
      );
    } else {
      this.profileService.updateUserData(this.user.id, this.user).subscribe(
        (data) => {
          this.flashMessagesService.show('Datos Editados correctamente.', this.alertProp.success);
          this.edit.user = false;
        }, (error) => {
          this.flashMessagesService.show(`Error editando datos del usuario. ${error.error.error_message}`, this.alertProp.error);
        }
      );
    }
  }

  onClickEditUserData() {
    this.edit.user = true;
  }

  onClickAddJob() {
    // verifco que haya datos de usuario
    if (this.user.id !== '') {

      this.job.from = new Date(this.job.from + ' 00:00:00').toISOString();
      this.job.to = new Date(this.job.to + ' 00:00:00').toISOString();

      if (this.job.id === '') {
        this.profileService.registerUserExperience(this.user.id, this.job).subscribe(
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
        this.profileService.updateUserExperience(this.user.id, this.job.id, this.job).subscribe(
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
      this.profileService.deleteUserExperience(this.user.id, tmp.id).subscribe(
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
    if (this.user.id !== '') {

      this.course.from = new Date(this.course.from + ' 00:00:00').toISOString();
      this.course.to = new Date(this.course.to + ' 00:00:00').toISOString();

      if (this.course.id === '') {
        this.profileService.registerUserEducation(this.user.id, this.course).subscribe(
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
        this.profileService.updateUserEducation(this.user.id, this.course.id, this.course).subscribe(
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
      this.profileService.deleteUserEducation(this.user.id, tmp.id).subscribe(
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
    if (this.user.id !== '') {
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

  fillObjects(userId: string) {
    /*
    "experiences": [
        {
            "id": "5b2956e46679d7003d5349de",
            "title": "asdasd",
            "company": "asdasd",
            "from": "2018-05-27T04:00:00Z",
            "to": "2018-06-11T04:00:00Z",
            "description": "consume los mensajes de los clientes",
            "created": "2018-06-19T19:17:56.946Z",
            "updated": "2018-06-19T19:17:56.946Z"
        },
        {
            "id": "5b295b126679d7003d5349df",
            "title": "asdasd",
            "company": "asd",
            "from": "2018-06-11T04:00:00Z",
            "to": "2018-06-28T04:00:00Z",
            "description": "consume los mensajes de los clientes",
            "created": "2018-06-19T19:35:46.03Z",
            "updated": "2018-06-19T19:35:46.03Z"
        }
    ],
    "educations": [],
    "abilities": [
        "sairio",
        "antonio",
        "pena",
        "pulgar"
    ],
    "created": "0001-01-01T00:00:00Z",
    "updated": "2018-06-19T19:16:36.404Z"*/
    this.profileService.registerUserData(this.user).subscribe(
      (data) => {
        this.user.id = data.id;
        this.user.name = data.name;
        this.user.address = data.address;
        this.user.phone = data.phone;
        this.user.description = (data.description !== undefined) ? data.description : '';
        this.user.email = (data.email !== undefined) ? data.email : '';
        if (data.abilities.length > 0) {
          this.abilities = data.abilities;
        }

        if (data.experiences.length > 0) {
          this.fillExperiences(data.experiences);
        }
      }, (error) => {
        this.flashMessagesService.show(`Error obteniendo datos del usuario. ${error.error.error_message}`, this.alertProp.error);
      }
    );
  }

  private fillExperiences(experiences: any) {
    for (let index = 0; index < experiences.length; index++) {
      const element = experiences[index];
      const obj = new Experience();
      const d1 = new Date(element.from);
      const d2 = new Date(element.to);
      obj.id = element.id;
      obj.title = element.title;
      obj.company = element.company;
      obj.from = `${d1.getFullYear()}-${d1.getDate()}-${d1.getDay()}`;
      obj.to = `${d2.getFullYear()}-${d2.getDate()}-${d2.getDay()}`;
      obj.description = element.description;
      this.jobs.push(obj);
    }
  }
  private fillCourses() {}

}
