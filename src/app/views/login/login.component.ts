import {
  Component
} from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms'
import {Http, Response} from '@angular/http';
import {LoginService} from './login.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-dashboard',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent {
  loginForm: FormGroup;
  errormessage: string;
  successmessage: string;
  showerrormessage: boolean = false;
  showsuccessmessage: boolean = false;
  data: any;
  constructor(private fb: FormBuilder, private router: Router, private access: LoginService, private spinner: NgxSpinnerService) {
    this.loginForm = fb.group({
      email: ['', Validators.required,
     
    ],
      password: ['', Validators.required,
        ],
         
    })
  }
  login(value: any) {
    this.spinner.show();
    this.access.login(value).subscribe((data) => {
      this.spinner.hide();
      if (data.IsAuthenticated) {
        localStorage.setItem('token', data.Token);
        this.showerrormessage = false;
        this.showsuccessmessage = true;
        this.successmessage = "Login Successful !!";
        this.router.navigate(['/', 'dashboard']);

      } else {
        this.showerrormessage = true;
        this.errormessage = "Incorrect Credentials!";
      }
    })
  }
}
