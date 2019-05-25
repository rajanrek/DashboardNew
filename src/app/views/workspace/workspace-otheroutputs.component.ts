import { Component } from '@angular/core';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {
  ProfileService
} from "../profile/profile.service";

@Component({
  templateUrl: 'workspace-otheroutputs.component.html'
})
export class WorkspaceOtherOutputsComponent {

  public FirstName
  public LastName
  constructor(private access: ProfileService) {
    console.log('Workspace Other Outputs::constructor');
    //var profiledata = this.access.getUserByLoginId();
    //console.log(profiledata);
  }


  activate(missionId) {
    console.log('Workspace Other Outputs::activate');
    this.Initialize();
  }

  Initialize() {
    //var profiledata = this.access.getUserByLoginId();

    console.log('Workspace Other Outputs::initialized');
  }

}
