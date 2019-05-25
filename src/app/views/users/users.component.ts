
import {UsersService} from './users.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users;
  public userdata;
  constructor(private access: UsersService, public router: Router) {
    console.log('users::constructor');
    
  } 

  ngOnInit() {
    this.access.getUsers().subscribe((data => {
      this.userdata = data;
      this.users = this.userdata.Users;
      console.log("checking users data:", this.users);
    }))
  }

  deleteUser(id) {
    this.access.deleteUser(id)
      .subscribe((data => {
        console.log(data, "success")
        error => console.log('error', error)
        this.router.navigate(['/users']);
      }))
  }
}
