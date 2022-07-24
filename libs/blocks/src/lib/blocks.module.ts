import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@society/material';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { AddressComponent } from './components/address/address.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DataBranchComponent } from './components/data-branch/data-branch.component';
import { DirectorPanelComponent } from './director-panel/director-panel.component';
import { ImageUploadingComponent } from './components/image-uploading/image-uploading.component';
import { PinModalComponent } from './components/pin-modal/pin-modal.component';

@NgModule({
  imports: [CommonModule, FormsModule, MaterialModule, TextMaskModule],
  declarations: [
    AddressComponent,
    DataTableComponent,
    DataBranchComponent,
    DirectorPanelComponent,
    ImageUploadingComponent,
    PinModalComponent,
  ],
  exports: [
    AddressComponent,
    DataTableComponent,
    DataBranchComponent,
    DirectorPanelComponent,
    ImageUploadingComponent,
    PinModalComponent,
  ],
})
export class BlocksModule {}
