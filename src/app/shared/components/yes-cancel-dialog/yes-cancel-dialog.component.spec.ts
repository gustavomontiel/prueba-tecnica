import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { YesCancelDialogData } from '../../models/yesCancelDialogData.model';

import { YesCancelDialogComponent } from './yes-cancel-dialog.component';

describe('YesCancelDialogComponent', () => {
  let component: YesCancelDialogComponent;
  let fixture: ComponentFixture<YesCancelDialogComponent>;

  const model: YesCancelDialogData = {
    titulo: 'titulo',
    descripcion: 'descripcion',
  };
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YesCancelDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: model },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YesCancelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
