import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Heroe } from 'src/app/shared/models/heroe.model';
import { YesCancelDialogData } from 'src/app/shared/models/yesCancelDialogData.model';
import { YesCancelDialogService } from 'src/app/shared/services/yes-cancel-dialog.service';
import { HeroesService } from '../../shared/services/heroes.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'identidad', 'universo', 'acciones'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  @ViewChild('searchText', { static: true }) searchText!: ElementRef;
  textoBuscado = '';

  constructor(
    public heroesService: HeroesService,
    private yesCancelDialogService: YesCancelDialogService,
    private snackBar: MatSnackBar,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getHeroes();  
  }


  getHeroes(filtro: string = '') {
    this.textoBuscado = filtro;
    this.heroesService.getHeroes(filtro).subscribe(
      resp => {
        this.dataSource = new MatTableDataSource(resp);
        this.ref.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }
  
  openRemoveConfirmModal(heroe: Heroe) {
    const data: YesCancelDialogData = {
      titulo: 'Eliminar héroe',
      descripcion: `Confirma eliminar el registro ${heroe.nombre}`,
    };

    this.yesCancelDialogService
      .openConfirmModal(data)
      .subscribe((res) => res && this.deleteHeroe(heroe.id!));
  }

  deleteHeroe(id: number) {
    this.heroesService.deleteHeroe(id).subscribe(
      res => {
        this.snackBar.open('Registro borrado correctamente', 'ok', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000
        })
        
        
        this.getHeroes(this.textoBuscado);
      }      
    )
  }

}
