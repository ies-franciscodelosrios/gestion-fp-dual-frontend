import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-ce',
  templateUrl: './edit-ce.component.html',
  styleUrls: ['./edit-ce.component.scss'],
})
export class EditCEComponent implements OnInit {
  @Input('editable') editable:string = "false";
  constructor() { }

  ngOnInit() {}

}
