import { Component } from '@angular/core';
// import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';
// import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {OrganizationService} from "../organization/organization.service";
import {  ActivatedRoute, Params } from "@angular/router";  
@Component({
  templateUrl: 'organizationview.component.html'
})
export class OrganizationViewComponent{
  public organizationdata;
  public id;
  constructor(private access: OrganizationService, private activatedRoute: ActivatedRoute) {
    console.log('OrganizationView::constructor');
    

    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params)
      this.id=params.id;
   })  
    
  }

ngOnInit(){  
  //console.log("orgnizationName", this.organizationdata.Name)
  this.access.getOrganization(this.id).subscribe((data => {
    this.organizationdata = data;
    console.log(this.organizationdata);
  }))
}
  

}
