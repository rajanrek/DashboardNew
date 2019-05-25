import { Component} from '@angular/core';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent  {
  public projects 
  public id: any;

  constructor(private access: ProjectsService) {
    console.log('Organizations::constructor');
    
    
    this.access.getProjects().subscribe((data => {
      this.projects = data;    
       console.log(this.projects);
    }))

  }


}
