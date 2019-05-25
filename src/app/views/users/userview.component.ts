import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Params } from "@angular/router";  
import { UsersService } from './users.service';
@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
})
export class UserviewComponent implements OnInit {
  public user;
  public id;
  public userData;
  constructor(private access: UsersService, private activatedRoute: ActivatedRoute) {
    console.log('user::constructor');
     this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params)
      this.id=params.id;
   })

    this.access.getUser(this.id).subscribe((data => {
      this.user = data;
        console.log(this.user);
    }))
    
  }
  ngOnInit() {
  }

}
