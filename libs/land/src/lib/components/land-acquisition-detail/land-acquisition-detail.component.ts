import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'society-land-acquisition-detail',
  templateUrl: './land-acquisition-detail.component.html',
  styleUrls: ['./land-acquisition-detail.component.scss'],
})
export class LandAcquisitionDetailComponent implements OnInit {
  rdbOption: number = 1;
  rdbLand = 1;

  constructor() {}

  ngOnInit(): void {}
}
