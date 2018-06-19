import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
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

}
