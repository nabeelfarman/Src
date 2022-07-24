import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'society-inventory-handing-taking-modal',
  templateUrl: './inventory-handing-taking-modal.component.html',
  styleUrls: ['./inventory-handing-taking-modal.component.scss'],
})
export class InventoryHandingTakingModalComponent implements OnInit {
  @Input() modalPageHeading: string = '';
  constructor() {}

  pageHeading: string = '';

  ngOnInit(): void {}
}
