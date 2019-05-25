import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkspaceComponent } from './workspace.component';
import { WorkspaceComparePanelComponent } from './workspace.comparepanel.component';
import { WorkspaceSketchComponent } from './workspace-sketch.component';
import { Workspace2dComponent } from './workspace-2d.component';
import { WorkspaceInspectionComponent } from './workspace-inspection.component';
import { WorkspaceInspectionReportComponent } from './workspace-inspection-report.component';
import { WorkspaceVideosComponent } from './workspace-videos.component';
import { Workspace2dCompareComponent } from './workspace-2d-compare.component';
import { Workspace3dCompareComponent } from './workspace-3d-compare.component';
import { WorkspaceVideoCompareComponent } from './workspace-videocompare.component';
import { WorkspaceImageCompareComponent } from './workspace-imagecompare.component';
import { CadComponent } from './workspace-cad.component';

const routes: Routes = [
  
  
  {
    path: '',
   
    data: {
      title: 'Workspace'
    }, children: [
      {
        path: 'cad/:id',
        component: CadComponent,
        data: {
          title: 'pdf'
        },
      },
      {
        path: '2d/:id',
        component: Workspace2dComponent,
        data: {
          title: '2d'
        },
      },
      {
        path: 'sketch/:id',
        component: WorkspaceSketchComponent,
        data: {
          title: 'sketch'
        }
      },
      {
        path: 'inspection/:id',
        component: WorkspaceInspectionComponent,
        data: {
          title: 'inspection'
        }
      },
      {
        path: 'inspection-report/:id',
        component: WorkspaceInspectionReportComponent,
        data: {
          title: 'inspection-report'
        }
      },
      {
        path: 'workspace-videos/:id',
        component: WorkspaceVideosComponent,
        data: {
          title: 'workspace-videos'
        }
      },
      {
        path: '2d-compare/:id',
        component: Workspace2dCompareComponent,
        data: {
          title: '2d-compare'
        }
      },
      {
        path: '3d-compare/:id',
        component: Workspace3dCompareComponent,
        data: {
          title: '3d-compare'
        }
      },
      {
        path: 'video-compare/:id',
        component: WorkspaceVideoCompareComponent,
        data: {
          title: 'video-compare'
        }
      },
      {
        path: 'image-compare/:id',
        component: WorkspaceImageCompareComponent,
        data: {
          title: 'image-compare'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule {}
