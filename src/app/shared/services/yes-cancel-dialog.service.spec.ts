import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { YesCancelDialogComponent } from '../components/yes-cancel-dialog/yes-cancel-dialog.component';
import { YesCancelDialogData } from '../models/yesCancelDialogData.model';
import { YesCancelDialogService } from './yes-cancel-dialog.service';

describe('YesCancelDialogService', () => {
  let component: YesCancelDialogComponent;
  let fixture: ComponentFixture<YesCancelDialogComponent>;
  const model: YesCancelDialogData = {
    titulo: 'titulo',
    descripcion: 'descripcion',
  };

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [YesCancelDialogComponent],
      providers: [
        YesCancelDialogService,
        { provide: MAT_DIALOG_DATA, useValue: model },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(YesCancelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(
    'should be created',
    waitForAsync(() => {
      expect(component).toBeTruthy();
    })
  );
});
