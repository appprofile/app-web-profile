import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
/* Models. */
import { Courses } from '@models/courses';
import { Experience } from '@models/experience';
import { UserData } from '@models/user-data';
/* Services. */
import { ProfileService } from '@services/profile/profile.service';

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
    this.user = new UserData();
    this.job = new Experience();
    this.course = new Courses();
    this.edit.user = true;
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
      if ( element.id === id) {
        element.index = index;
        return true;
      }
    });

    return found;
  }

  onClickRegisterUserData() {

    if (this.user.id === '') {
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
    this.course.id = this.courses.length;
    this.courses.push(this.course);
    this.course = new Courses();
  }

  onClickEditCourse(index: number) {
    if (index >= 0) {
      this.course = this.courses[index];
    }
  }

  onClickDeleteCourse(index: number) {
    if (index >= 0) {
      this.courses.splice(index, 1);
      this.course = new Courses();
    }
  }

  onClickAddSkill() {
    this.addSkill(this.abilitie);
    this.abilitie = '';
  }

  onKeyDownAddSkill(event) {
    if (event.keyCode === 13) {
      this.onClickAddSkill();
    }
  }

  onClickDeleteSkill(index: number) {
    if (index >= 0) {
      this.abilities.splice(index, 1);
      this.abilitie = '';
    }
  }

}
