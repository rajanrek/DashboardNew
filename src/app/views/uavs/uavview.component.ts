import { Component, OnInit } from '@angular/core';
import { UavsService } from './uavs.service';
import {  ActivatedRoute, Params } from "@angular/router";  

@Component({
  selector: 'app-uavview',
  templateUrl: './uavview.component.html',
})
export class UavviewComponent implements OnInit {

  public id;
  public uav;
  constructor(private access: UavsService, private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params)
      this.id=params.id;
   })

    this.access.getDrone(this.id).subscribe((data => {
      this.uav = data;
        console.log(this.uav);
    }))
   }

  ngOnInit() {
  }

}
