import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'society-plot-file-view',
  templateUrl: './plot-file-view.component.html',
  styleUrls: ['./plot-file-view.component.scss']
})
export class PlotFileViewComponent implements OnInit {

  lblCategory: string = '';
  lblType: string = '';
  lblNature: string = '';
  
  constructor() { }

  ngOnInit(): void {
  }

}
