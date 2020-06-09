import { Component, OnInit } from '@angular/core';

import { AlertService } from '../../services/alert.service';
import {Alert} from '../../alert';
@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  alerts = [];
  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
      this.alertService.getAlerts().subscribe(alerts => {
      console.log(alerts);
      this.alerts = alerts;
      });
  }

  removeAlert(id) {
      this.alertService.hideAlert(id);
  }

}
