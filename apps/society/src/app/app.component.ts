import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { LoaderService } from '@society/shared/services/global-data';

@Component({
  selector: 'society-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'society';

  constructor(public loaderService: LoaderService, public globalDataService: SharedServicesGlobalDataModule) {
  }

  ngOnInit() {

  }
}
