import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'society-data-branch',
  templateUrl: './data-branch.component.html',
  styleUrls: ['./data-branch.component.scss']
})
export class DataBranchComponent implements OnInit {
  locationList: any[] | undefined;

  constructor() { }

  ngOnInit(): void {
    this.locationList = [
      {
        locationCd: 1,
        locationName: 'Islamabad'
      },
      {
        locationCd: 2,
        locationName: 'Karachi'
      },
      {
        locationCd: 3,
        locationName: 'Lahore'
      },
    ];

  }

}
