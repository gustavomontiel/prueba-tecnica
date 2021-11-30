import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { YesCancelDialogComponent } from '../components/yes-cancel-dialog/yes-cancel-dialog.component';
import { YesCancelDialogData } from '../models/yesCancelDialogData.model';

@Injectable({
  providedIn: 'root',
})
export class YesCancelDialogService {
  constructor(public matDialog: MatDialog) {}

  openConfirmModal(data: YesCancelDialogData): Observable<boolean> {
    const dialogRef = this.matDialog.open(YesCancelDialogComponent, {
      data: data,
    });

    return dialogRef.afterClosed().pipe( map( res => !!res ));
  }
}
