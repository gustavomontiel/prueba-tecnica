import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Heroe } from 'src/app/shared/models/heroe.model';
import { YesCancelDialogData } from 'src/app/shared/models/yesCancelDialogData.model';
import { HeroesService } from 'src/app/shared/services/heroes.service';
import { YesCancelDialogService } from 'src/app/shared/services/yes-cancel-dialog.service';

@Component({
  selector: 'app-heroes-form',
  templateUrl: './heroes-form.component.html',
  styleUrls: ['./heroes-form.component.scss']
})
export class HeroesFormComponent implements OnInit {

  form!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private heroesService: HeroesService,
    private yesCancelDialogService: YesCancelDialogService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      identidad: ['', Validators.required],
      universo: ['', Validators.required],
      poderes: new FormArray([]),
    });

    this.activatedRoute.params.subscribe((params) => {
      const id = Number(params['id']);
      if (id !== NaN && !!id) {
        this.getHeroe(id);
      } else {
        this.addPoder();
      }
    });
  }

  getHeroe(id: number) {
    this.heroesService.getHeroe(id).subscribe((heroe) => {
      this.setFormValues(heroe as Heroe);
    });
  }

  setFormValues(heroe: Heroe) {
    const { id, nombre, identidad, universo, poderes } = heroe;
    this.form.patchValue({ id, nombre, identidad, universo });
    poderes.forEach((poder) => this.addPoder(poder));
  }

  openSaveConfirmModal() {
    const data: YesCancelDialogData = {
      titulo: 'Guardar héroe',
      descripcion: `Confirma guardar el registro ${
        this.form.get('nombre')?.value 
      }`,
    };

    this.yesCancelDialogService
      .openConfirmModal(data)
      .subscribe((res: boolean) => res && this.saveHeroe());
  }

  saveHeroe() {
    const heroe = this.form.value;
    if (heroe.id) {
      this.updateHeroe(heroe);
    } else {
      this.createHeroe(heroe)
    }
  }

  createHeroe(heroe: Heroe){
    this.heroesService.postHeroe(heroe).subscribe((res) => {
      this.afterSave()
    });
  }

  updateHeroe(heroe: Heroe){
    this.heroesService.putHeroe(heroe).subscribe((res) => {
      this.afterSave()
    });
  }

  afterSave(){
    this.snackBar.open('Registro guardado correctamente', 'ok', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    })
    this.form.markAsPristine();
    this.router.navigate(['/heroes']);
  }

  get poderes() {
    return this.form.get('poderes') as FormArray;
  }

  addPoder(poder = '') {
    this.poderes.push(new FormControl(poder, Validators.required));
  }

  removePoder(index: number) {
    this.poderes.removeAt(index);
  }

  canDeactivate(): Observable<boolean> | boolean {

    if (this.form.dirty) {
      const data: YesCancelDialogData = {
        titulo: 'Salir?',
        descripcion: `Confirma salir de la pantalla de carga?`,
      };

      return this.yesCancelDialogService.openConfirmModal(data);
    }
    return true;
  }

}
