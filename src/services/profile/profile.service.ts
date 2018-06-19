import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Experience } from '../../models/experience';
import { UserData } from '../../models/user-data';
import { BaseService } from '../base/base.service';

@Injectable()
export class ProfileService extends BaseService {


  constructor(public http: HttpClient) {
    super(http);
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

}
