import { Component, OnInit} from '@angular/core';
import { OrganizationService } from './organization.service';
import { HttpClient } from '@angular/common/http';
 import {  ActivatedRoute, Params } from "@angular/router";  
 import { FormBuilder} from '@angular/forms';
 import { Router } from '@angular/router';
@Component({
  selector: 'app-orgnization-form',
  templateUrl: './orgnization-form.component.html',
  styleUrls: ['./orgnization-form.component.scss']
})
export class OrgnizationFormComponent implements OnInit {
  public organization; 
  public id:any;

    constructor(private access: OrganizationService,public router: Router, private activatedRoute: ActivatedRoute,private fb: FormBuilder, private formBuilder: FormBuilder, private httpClient: HttpClient) {
    console.log('Organizations::constructor');
      this.activatedRoute.params.subscribe((params: Params) => {
      this.id=params.id; 
   })     
 }
 
 ngOnInit() {  
    if(this.id==0){
      this.NewDetails();
     }
     else{
      this.EditDetails();  
     }
  }
  
  EditDetails(){
    this.access.getOrganization(this.id).subscribe((data => {
      this.organization = data;     
      console.log( this.organization)
   
    }))
  }  

  NewDetails(){
    this.access.getNewOrganization()
    .subscribe((data => {
      this.organization = data;
    }))
  }
 
  onSubmit() {
    this.access.saveOrganizationData(this.organization).subscribe(
      (data) => {
           console.log(data, "success")
        error => console.log('error', error)
        this.router.navigate(['/organizations']);
    })   
  
  }
  cancel(){
    this.router.navigate(['/organizations']);
  }
  setselectedOption(event) {
    this.organization.SelectedSurveyOutputs = [];
    var cnt = event.target.options;
    for (let i = 0; i < cnt.length; i++) {
      let option = event.target.options[i];
      var item = {
        'SurveyOutputId': parseInt(option.value),
        'Name': option.text,
        'IsSelected': option.selected
      }
      //Only Push selected option to SelectedSurveyOutputs
      if (item.IsSelected == true) {
        this.organization.SelectedSurveyOutputs.push(item);
      }
    }
  }
  

} 
