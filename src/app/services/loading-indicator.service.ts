import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorService {

public showLoader = false;
  constructor() { }

  show() {
    this.showLoader = true;
  }

  hide() {
    this.showLoader = false;
  }
}
