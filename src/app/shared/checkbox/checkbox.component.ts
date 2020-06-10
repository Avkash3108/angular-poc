import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() value: any;
  @Input() checked: boolean;
  @Input() class = '';
  @Input() id: any = '';
  @Output() onChange = new EventEmitter();


  constructor() { }

  ngOnInit(): void {

  }

  onChangeCheckbox($event) {
    this.checked = $event.target.checked
    this.onChange.emit($event);
  }
}
