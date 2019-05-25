import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import {UserComponent} from './user.component';
import{UserviewComponent} from './userview.component';
import { UsersDroneComponent } from './users-drone.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: {
      title: 'users'
    }
  },
  {
    path: 'user/:id',
    component: UserComponent,
    data: {
      title: 'User'
    }
  },
{
    path: 'userview/:id',
    component: UserviewComponent,
    data: {
      title: 'Userview'
    }
  },
  {
    path: 'users-drone/:id',
    component: UsersDroneComponent,
    data: {
      title: 'Users Drone Assignation'
    }
  },
];

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
// tslint:disable-next-line: whitespace
  declarations:[]
})
export class UsersRoutingModule { }
