import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { YesCancelDialogData } from '../../models/yesCancelDialogData.model';

@Component({
  selector: 'app-yes-cancel-dialog',
  templateUrl: './yes-cancel-dialog.component.html'
})
export class YesCancelDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: YesCancelDialogData,
  ) { }
}
