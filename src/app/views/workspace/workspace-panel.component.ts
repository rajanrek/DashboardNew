import { Component, Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-workspace-panel',
  templateUrl: './workspace-panel.component.html',
  styleUrls: ['./workspace-panel.component.scss']
})
export class WorkspacePanelComponent {
  @Input() showTag: any;
  @Input() tag: any;
  myFunction() {
    var element = document.getElementById("right_side_bar");
    element.classList.toggle("side-bar-hide");
  }

  imageUrl='https://www.holidify.com/blog/wp-content/uploads/2016/08/kashi-vishwanath.jpg';
  imageUrl2='https://m.telegraphindia.com/unsafe/620x350/smart/static.telegraphindia.com/derivative/THE_TELEGRAPH/1672718/16X9/imagef0200e15-165f-42f6-9299-379defef16ce.jpg'
  
}
