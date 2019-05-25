import { Component, OnInit } from '@angular/core';
import { UavsService } from './uavs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uavs',
  templateUrl: './uavs.component.html',
  styleUrls: ['./uavs.component.scss']
})
export class UavsComponent implements OnInit {

  public uavs;
  constructor(private access: UavsService, public router: Router) {
    
   }

  ngOnInit(){
    this.listDrone();
  }
  deleteUAV(id) {
    this.access.deleteUAV(id)
      .subscribe((data => {
        console.log(data, "success")
        error => console.log('error', error)
       this.listDrone();
      }))
      
  }

  listDrone(){
    this.access.getDrones().subscribe((data => {
      this.uavs = data;    
       console.log("drone data ", this.uavs);
    }))
  }
}
