import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectComponent } from './project.component';
import { FormsComponent } from './forms.component';
import { SwitchesComponent } from './switches.component';
import { TablesComponent } from './tables.component';
import { TabsComponent } from './tabs.component';
import { CarouselsComponent } from './carousels.component';
import { CollapsesComponent } from './collapses.component';
import { PaginationsComponent } from './paginations.component';
import {PopoversComponent} from './popovers.component';
import {ProgressComponent} from './progress.component';
import {TooltipsComponent} from './tooltips.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectComponent,
    data: {
      title: 'Projects'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}
