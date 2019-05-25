import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPdfrepo]'
})
export class PdfrepoDirective {

  constructor(private el:ElementRef) {
    el.nativeElement.color="red"
    console.log(el);
    // el.nativeElement.style.color='red';
   }
   

}
