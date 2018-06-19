import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Courses } from '../../../models/courses';
import { Experience } from '../../../models/experience';
import { UserData } from '../../../models/user-data';
import { ProfileService } from '../../../services/profile/profile.service';

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

  onClickRegisterUserData() {

    if (this.user.id === '') {
      this.profileService.registerUserData(this.user).subscribe(
        (data) => {
          this.flashMessagesService.show('Datos Registrados correctamente.',
          {cssClass: 'alert-success', timeout : 4000});
           this.user.id = data.id;
          this.edit.user = false;
        }, (error) => {
          this.flashMessagesService.show(`Error registrando datos del usuario. ${error.error.error_message}`,
          {cssClass: 'alert-danger', timeout : 4000});
        }
      );
    } else {
      this.profileService.updateUserData(this.user.id, this.user).subscribe(
        (data) => {
          this.flashMessagesService.show('Datos Editados correctamente.',
          {cssClass: 'alert-success', timeout : 4000});
          this.edit.user = false;
        }, (error) => {
          this.flashMessagesService.show(`Error editando datos del usuario. ${error.error.error_message}`,
          {cssClass: 'alert-danger', timeout : 4000});
        }
      );
    }
  }

  onClickEditUserData() {
    this.edit.user = true;
  }

  onClickAddJob() {
    this.job.id = this.jobs.length;
    this.jobs.push(this.job);
    this.job = new Experience();
  }

  onClickEditJob(index: number) {
    if (index >= 0) {
      this.job = this.jobs[index];
    }
  }

  onClickDeleteJob(index: number) {
    if (index >= 0) {
      this.jobs.splice(index, 1);
      this.job = new Experience();
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
