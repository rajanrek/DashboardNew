import { Component } from '@angular/core';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {
  ProfileService
} from "../profile/profile.service";

@Component({
  templateUrl: 'profile.component.html'
})
export class ProfileComponent {

  public profiledata 
  constructor(private access: ProfileService) {
    console.log('Profile::constructor');
    
    this.access.getUserByLoginId().subscribe((data => {
      this.profiledata = data;
    }))

    console.log(this.profiledata);
  }


  activate() {
    console.log('Profile::activate');
    this.Initialize();
  }

  Initialize() {
    console.log('Profile::initialized');
  }

}
