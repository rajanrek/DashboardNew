import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { WorkspaceComponent } from './workspace.component';
import { WorkspaceComparePanelComponent } from './workspace.comparepanel.component';
import { WorkspaceSketchComponent } from './workspace-sketch.component';
import { Workspace2dComponent } from './workspace-2d.component';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceInspectionComponent } from './workspace-inspection.component';
import { WorkspaceSidebarComponent } from './workspace-sidebar.component';
import { WorkspaceInspectionReportComponent } from './workspace-inspection-report.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { WorkspaceVideosComponent } from './workspace-videos.component';
import { Workspace2dCompareComponent } from './workspace-2d-compare.component';
import { Workspace3dCompareComponent } from './workspace-3d-compare.component';
import { WorkspaceVideoCompareComponent } from './workspace-videocompare.component';
import { WorkspaceImageCompareComponent } from './workspace-imagecompare.component';
import { CadComponent } from './workspace-cad.component';
import { PdfrepoDirective } from '../../pdfrepo.directive';
import { WorkspacePanelComponent } from './workspace-panel.component';



@NgModule({
  imports: [
    WorkspaceRoutingModule,
     ChartsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    RouterModule

  ],
  declarations: [WorkspaceComponent,CadComponent, WorkspaceSketchComponent, PdfrepoDirective,
     Workspace2dComponent, WorkspaceInspectionComponent,
      WorkspaceSidebarComponent, WorkspaceInspectionReportComponent, 
      WorkspaceVideosComponent, Workspace2dCompareComponent, 
      Workspace3dCompareComponent, WorkspaceComparePanelComponent, 
      WorkspaceVideoCompareComponent, WorkspaceImageCompareComponent, WorkspacePanelComponent]
})
export class WorkspaceModule { }
