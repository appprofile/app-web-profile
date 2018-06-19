import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Courses } from '@models/courses';
import { Experience } from '@models/experience';
import { UserData } from '@models/user-data';
import { BaseService } from '../base/base.service';

@Injectable()
export class ProfileService extends BaseService {


  constructor(public http: HttpClient) {
    super(http);
  }


  getUserData() {
    return this.get('profile', []);
  }

  registerUserData(data: UserData) {
    return this.post('profile', data, []);
  }

  updateUserData(userId: string, userData: UserData) {
    return this.patch(`profile/${userId}`, userData, []);
  }

  registerUserExperience(userId: string, userExperience: Experience) {
    return this.post(`profile/${userId}/experience`, userExperience, []);
  }

  updateUserExperience(userId: string, experienceId: string, userExperience: Experience) {
    return this.patch(`profile/${userId}/experience/${experienceId}`, userExperience, []);
  }

  deleteUserExperience(userId: string, experienceId: string) {
    return this.delete(`profile/${userId}/experience/${experienceId}`, []);
  }

  registerUserEducation(userId: string, userEducation: Courses) {
    return this.post(`profile/${userId}/education`, userEducation, []);
  }

  updateUserEducation(userId: string, educationId: string, userEducation: Courses) {
    return this.patch(`profile/${userId}/education/${educationId}`, userEducation, []);
  }

  deleteUserEducation(userId: string, educationId: string) {
    return this.delete(`profile/${userId}/education/${educationId}`, []);
  }

}
