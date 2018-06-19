import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ProfileService } from '@services/profile/profile.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  public data;
  public errorProps;
  public total;

  constructor(public profileService: ProfileService,
    public flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.errorProps = { cssClass: 'alert-danger', timeout: 4000 };

    this.profileService.getUserData().subscribe(data => {
      this.data = data.profiles;
      this.total = data.total;
    }, error => {
      this.flashMessagesService.show(`Error leyendo los datos de usuarios. ${error.error.error_message}`, this.errorProps);
    });
  }

}
