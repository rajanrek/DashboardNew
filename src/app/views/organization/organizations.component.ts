import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  OrganizationService
} from "../organization/organization.service";

@Component({
  selector: 'app-organization',
  templateUrl: 'organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent  {
  public organizations 
  constructor(private access: OrganizationService, public router: Router) {
    console.log('Organizations::constructor');
    
    this.access.getOrganizations().subscribe((data => {
      this.organizations = data;    
       console.log(this.organizations);
    }))

  }

  deleteOrganization(id) {
    this.access.deleteOrganization(id)
      .subscribe((data => {
        console.log(data, "success")
        error => console.log('error', error)
        this.router.navigate(['/organizations']);
      }))
  }
}
