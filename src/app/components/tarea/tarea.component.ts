import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.scss'],
})
export class TareaComponent implements OnInit {
  @Input('editable') editable:string = "false";
  public color = "gray"
  constructor() { }

  ngOnInit() {
    if(this.editable=='true'){
      this.color="red";
    }
  }

}
