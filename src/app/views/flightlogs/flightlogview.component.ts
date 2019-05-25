import { Component, OnInit } from '@angular/core';
import { FlightlogsService } from './flightlogs.service';
import {  ActivatedRoute, Params } from "@angular/router";  
@Component({
  selector: 'app-flightlogview',
  templateUrl: './flightlogview.component.html',
})
export class FlightlogviewComponent implements OnInit {

    public id;
    public flights;
  constructor(private access: FlightlogsService, private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params)
      this.id=params.id;
   })

    this.access.getFlight(this.id).subscribe((data => {
      this.flights = data;
      console.log(this.flights);
    }))

  }

  ngOnInit() {
  }

}
