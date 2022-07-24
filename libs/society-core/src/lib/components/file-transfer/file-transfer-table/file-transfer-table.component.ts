import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'society-file-transfer-table',
  templateUrl: './file-transfer-table.component.html',
  styleUrls: ['./file-transfer-table.component.scss']
})
export class FileTransferTableComponent implements OnInit {

  tblSearch: string = '';
  tableData: any = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
