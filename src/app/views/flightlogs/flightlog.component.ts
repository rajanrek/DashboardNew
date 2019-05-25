import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  ActivatedRoute, Params } from "@angular/router"; 
import { Router } from '@angular/router';
import { FlightlogsService } from './flightlogs.service';
@Component({
  selector: 'app-flightlog',
  templateUrl: './flightlog.component.html',
  styleUrls: ['./flightlog.component.scss']
})
export class FlightlogComponent implements OnInit {

  public mission;
  public flights;
  public id;
  constructor(private access: FlightlogsService, private httpClient: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { 

    this.activatedRoute.params.subscribe((params: Params) => {
      this.id=params.id;
   })    

  }

  ngOnInit() {
    if(this.id==0){
    this.NewDetails();
   }
   else{
   this.EditDetails()
   }
   
   
  }
  NewDetails(){
    this.access.getNewFlight()
    .subscribe((data => {
      this.flights = data;
    }))
  }
  EditDetails(){
    this.access.getFlight(this.id).subscribe((data => {
      this.flights = data;     
      console.log(this.flights)
   
    }))
  }
}

