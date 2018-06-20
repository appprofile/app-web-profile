import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
/* Services. */
import { ProfileService } from '@services/profile/profile.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  public currentUserProfileID: string;
  public profileID: string;
  public profile: any;
  public alertProp = {
    success: { cssClass: 'alert-success', timeout: 4000 },
    error: { cssClass: 'alert-danger', timeout: 4000 }
  };

  constructor(private route: ActivatedRoute,
    private profileService: ProfileService,
    private flashMessagesService: FlashMessagesService) {

    this.currentUserProfileID = localStorage.getItem('user_id');

    this.route.params.subscribe((params) => {
      this.profileID = params.id;
      // Get the profile info.
      this.profileService.getUser(this.profileID).subscribe((data) => {
        this.profile = data;
      }, (error) => {
        this.flashMessagesService.show(`Error obteniendo datos del usuario. ${error.error.error_message}`, this.alertProp.error);
      }
      );
    });
  }

  isCurrentUser(): boolean {
    return this.currentUserProfileID && this.profileID && this.currentUserProfileID === this.profileID;
  }

  ngOnInit() {
  }

}
