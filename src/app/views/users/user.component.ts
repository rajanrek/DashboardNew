import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { HttpClient } from '@angular/common/http';
 import {  ActivatedRoute, Params } from "@angular/router";  
 import { FormBuilder} from '@angular/forms';
 import { Router } from '@angular/router';
 import { FormGroup,   Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public user: any = {};
  public id:any;
  angForm: FormGroup;
  registerForm: FormGroup;
  submitted = false;
    constructor(private access: UsersService, private formBuilder: FormBuilder, public router: Router, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
    console.log('user::constructor');
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
    this.access.getNewUser()
    .subscribe((data => {
      this.user = data;
      console.log(this.user)
    }))
  }
  EditDetails(){
    this.access.getUser(this.id).subscribe((data => {
      this.user = data;     
      console.log(this.user)
       }))
  }

  onSubmit() {
    this.access.saveUser(this.user).subscribe(
      (data) => {
        console.log(data, "success")
        error => console.log('error', error)
        this.router.navigate(['/users']);
      })
      

  }
  cancel() {
    this.router.navigate(['/users']);
  }

  onOptionsSelected(event) {
    this.user.SelectedRole = [];
    var cnt = event.target.options;
    console.log("checking multiselct",cnt);
    for (let i = 0; i < cnt.length; i++) {
      let option = cnt[i];
      var item = {
        'RoleId': parseInt(option.value),
        'RoleName': option.text,
        'IsSelected': option.selected
      }
      //Only Push selected option to SelectedSurveyOutputs
      if (item.IsSelected == true) {
        this.user.SelectedRole.push(item);
      }
    }
  }



}
