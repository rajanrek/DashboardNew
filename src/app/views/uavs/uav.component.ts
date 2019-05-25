import { Component, OnInit } from '@angular/core';
import { UavsService } from './uavs.service';
import { ActivatedRoute, Params } from "@angular/router";
import { Router } from '@angular/router';
import { FormGroup,  FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-uav',
  templateUrl: './uav.component.html',
  styleUrls: ['./uav.component.scss']
})
export class UavComponent implements OnInit {
 
  public uav;
  public id:any;
  registerForm: FormGroup;
  submitted = false;
   constructor(private access: UavsService, private formBuilder: FormBuilder, public router: Router,  private activatedRoute: ActivatedRoute) {


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
     
    this.registerForm = this.formBuilder.group({
      Name: ['', Validators.required],
      DeviceId: ['', Validators.required],
      DeviceModelId:['', Validators.required],
      Uin: ['', [Validators.required, Validators.email]],
      UAVDigiSkyId:['', Validators.required],
      Organization:['', Validators.required]
  });
  
  }
  get f() {
    return this.registerForm.controls;
    }

NewDetails(){
  this.access.getNewDrone()
  .subscribe((data => {
    this.uav = data;
    console.log(this.uav)

  }))
  
}

EditDetails(){
  this.access.getDrone(this.id).subscribe((data => {
    this.uav = data; 
    
  }))
}

  onSubmit() {
    this.access.saveUAV(this.uav).subscribe(
      (data) => {
        console.log(data, "success")
        error => console.log('error', error)
        this.router.navigate(['/uavs']);
      })
      this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
          return;
       }
  }
  // cancel() {
  //   this.router.navigate(['/uavs']);
  // }
}
