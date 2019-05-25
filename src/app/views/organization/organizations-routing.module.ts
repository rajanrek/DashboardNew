import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationsComponent } from './organizations.component';
import { OrgnizationFormComponent } from './orgnization-form.component';
import { OrganizationViewComponent } from './organizationview.component';


const routes: Routes = [
  {
    path: '',
    component: OrganizationsComponent,
    data: {
      title: 'Organizations'
    }
  }
  ,
  {
    path: 'organization/:id',
    component: OrgnizationFormComponent,
    data: {
      title: 'Organization'
    }
  },
  {
    path: 'organizationview/:id',
    component: OrganizationViewComponent,
    data: {
      title: 'Organization Details'
    }
  }
 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationsRoutingModule {}
