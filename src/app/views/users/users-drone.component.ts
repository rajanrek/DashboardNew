import { UsersService } from './users.service';
import { UavsService } from '../uavs/uavs.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users-drone.component.html',
  styleUrls: ['./users-drone.component.scss']
})
export class UsersDroneComponent implements OnInit {
  public users;
  public uavs;
  public associatedDrones;
  public id;
  constructor(private UsersService: UsersService, private UAVService: UavsService, public router: Router, private activatedRoute: ActivatedRoute) {
    console.log('users-drone::constructor');
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params)
      this.id = params.id;
    })
  } 

  ngOnInit() {
    this.UAVService.getDrones().subscribe((data => {
      this.uavs = data;      
      console.log("checking drone data:", this.uavs);

      if (this.uavs.length > 0) {

        this.UsersService.getAssociatedDrones(this.id).subscribe((dronedata => {
          this.associatedDrones = dronedata;
          console.log("checking drone data:", this.associatedDrones);

          if (this.associatedDrones.length > 0) {
            this.uavs.forEach(d => {
              d.isSelected = (this.associatedDrones.findIndex(x => x.DroneId == d.DroneId) != -1);
            })
          }


        }))

      }


    }))
  }

  onSubmit() {
    let selectedDrones = this.uavs.filter(x => x.isSelected);
    if (selectedDrones.length > 0) {
      let associations = [];
      selectedDrones.forEach(item => {
        associations.push({ "DroneId": item.DroneId, "UserId": this.id });
      });

      this.UsersService.associateDrones(associations);      
    }
  }

  cancel() {
    this.router.navigate(['/users']);
  }

}
