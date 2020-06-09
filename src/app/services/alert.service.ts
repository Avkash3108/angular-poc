import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import { Alert } from '../alert';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alerts: Alert [] = [];
  private _alertSubject = new BehaviorSubject(this.alerts);
  private _alertObservable$ = this._alertSubject.asObservable();
  constructor() { }

  getAlerts() {
      return this._alertObservable$;
  }
  showAlert(alert: Alert) {
      alert.isOpen = true;
      this.alerts.push(alert);
      this._alertSubject.next(this.alerts);
  }

  hideAlert(id: string) {
      this.alerts = this.alerts.filter((alert) => {
          return alert.id !== id;
      });
      this._alertSubject.next(this.alerts);
  }
}
