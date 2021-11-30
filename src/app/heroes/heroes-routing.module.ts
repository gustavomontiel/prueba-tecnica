import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { HeroesFormComponent } from './heroes-form/heroes-form.component';
import { CanDeactivateGuard } from '../shared/guards/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HeroesComponent,
    children: [
      {
        path: 'list',
        component: HeroesListComponent
      },
      {
        path: 'create',
        component: HeroesFormComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'update/:id',
        component: HeroesFormComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      { path: '**', redirectTo: 'list', pathMatch: 'full' },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
