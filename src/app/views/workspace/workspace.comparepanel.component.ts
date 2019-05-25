import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'workspace-comparepanel',
  templateUrl: 'workspace.comparepanel.component.html',
  styleUrls: ['./workspace.comparepanel.component.scss']
})
export class WorkspaceComparePanelComponent {
  @Input() surveydropdown: any;
  @Output() sendDatatoCompare = new EventEmitter();
  @Input() survey1: any;
  @Input() survey2: any;
  @Input() showTag: any;
  @Input() tag: any;
  myFunction() {
    var element = document.getElementById("right_side_bar");
    element.classList.toggle("side-bar-hide");
  }
  compare() {
    if (this.survey1 && this.survey2) {
      this.sendDatatoCompare.emit({ "Survey1": this.survey1, "Survey2": this.survey2 });
    }
    else {
      alert("Select Both Mission to Compare")
    }
  }
}
