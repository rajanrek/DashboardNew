import { Component, OnInit } from '@angular/core';
import { MissionsService } from './missions.service';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent {
  public missions;
  constructor(private access: MissionsService) {
    // console.log('Organizations::constructor');
    
    // this.access.getMissions().subscribe((data => {
    //   this.missions = data;    
    //    console.log("checking missions", this.missions);
    // }))

  }

}
