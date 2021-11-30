import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { HeroesFormComponent } from './heroes-form/heroes-form.component';
import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroesComponent } from './heroes.component';
import { CanDeactivateGuard } from '../shared/guards/can-deactivate-guard.service';
import { ToUpperCaseDirective } from '../shared/directives/to-upper-case.directive';


@NgModule({
  declarations: [
    ToUpperCaseDirective,
    HeroesListComponent,
    HeroesFormComponent,
    HeroesComponent
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [CanDeactivateGuard]
})
export class HeroesModule { }
