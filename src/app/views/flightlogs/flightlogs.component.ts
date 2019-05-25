import { Component, OnInit } from '@angular/core';
import { FlightlogsService } from './flightlogs.service';

@Component({
  selector: 'app-flightlogs',
  templateUrl: './flightlogs.component.html',
  styleUrls: ['./flightlogs.component.scss']
})
export class FlightlogsComponent implements OnInit {

  public flights;
   public flightdata;
    constructor(private access:FlightlogsService) { 

    this.access.getFlights().subscribe((data => {
      this.flightdata = data;    
      this.flights=this.flightdata.Flights;
       console.log(this.flights);
    }))

  }

  ngOnInit() {

    
  }

}
