import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import {Alert} from '../../alert';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() alert: Alert = new Alert();
  @Output() onClose = new EventEmitter();

  timeoutUnit = 1000;
  timer = null;
  constructor() { }

  ngOnInit(): void {
      if (this.alert.autoClose) {
          this.timer = setTimeout(() => {
                return this.closeAlert();
          }, this.alert.autoCloseTime * this.timeoutUnit);
      }

  }

  getAlertClass(): string {
     return {
       success: 'alert-success',
       warning: 'alert-warning',
       error: 'alert-error'
     }[this.alert.alertType];
  }
  closeAlert() {
    if (this.timer) {
        clearTimeout(this.timer);
    }
    this.onClose.emit(this.alert.id);
  }
}
