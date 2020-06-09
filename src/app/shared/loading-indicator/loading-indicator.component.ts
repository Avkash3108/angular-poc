import { Component, OnInit } from '@angular/core';

import { LoadingIndicatorService } from '../../services/loading-indicator.service';
@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent implements OnInit {

  constructor(public loadingIndicatorService: LoadingIndicatorService) {}


  ngOnInit(): void {
  }

}
