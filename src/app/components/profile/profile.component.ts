import { Component, OnInit } from '@angular/core';
import { Courses } from '../../../models/courses';
import { Experience } from '../../../models/experience';
import { Skills } from '../../../models/skills';
import { UserData } from '../../../models/user-data';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: UserData;
  public jobs: Experience[] = [];
  public courses: Courses[] = [];
  public skills: Skills[] = [];

  public job: Experience;
  public course: Courses;
  public skill: Skills;

  public edit = {
    user: true,
    jobs: true,
    courses: true
  };

  constructor() { }

  ngOnInit() {
    this.user = new UserData();
    this.job = new Experience();
    this.course = new Courses();
    this.skill = new Skills();
    this.edit.user = true;
  }

  private addSkill(skill: Skills) {

    const found = this.skills.find(function(element) {
      return element.name === skill.name;
    });
    if (skill.name !== '' && found === undefined) {
      skill.id = this.skills.length;
      this.skills.push(skill);
    }
  }

  onClickRegisterUserData() {
    if (this.user.id === 0) {
      this.user.id = 1;
      console.log('registrar');
    } else {
      console.log('editar');
    }
    this.edit.user = false;
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
      this.jobs.splice(index , 1);
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
      this.courses.splice(index , 1);
      this.course = new Courses();
    }
  }

  onClickAddSkill() {
    this.addSkill(this.skill);
    this.skill = new Skills();
  }

  onKeyDownAddSkill(event) {
    if (event.keyCode === 13) {
      this.onClickAddSkill();
    }
  }

  onClickDeleteSkill(index: number) {
    if (index >= 0) {
      this.skills.splice(index , 1);
      this.skill = new Skills();
    }
  }

}
