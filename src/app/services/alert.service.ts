import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import { Alert } from '../alert';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alerts: Alert [] = [];
  private alertSubject = new BehaviorSubject(this.alerts);
  private alertObservable$ = this.alertSubject.asObservable();
  constructor() { }

  getAlerts() {
      return this.alertObservable$;
  }
  showAlert(alert: Alert) {
      alert.isOpen = true;
      this.alerts.push(alert);
      this.alertSubject.next(this.alerts);
  }

  hideAlert(id: string) {
      this.alerts = this.alerts.filter((alert) => {
          return alert.id !== id;
      });
      this.alertSubject.next(this.alerts);
  }
}
