import { UsersRoutingModule } from './users-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserviewComponent } from './userview.component';
import { UsersComponent } from './users.component';
import { UsersDroneComponent } from './users-drone.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
     ReactiveFormsModule 
  ],
  declarations: [UserComponent, UserviewComponent, UsersComponent, UsersDroneComponent]
})
export class UsersModule { }
