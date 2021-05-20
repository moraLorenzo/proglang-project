import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddLightPage } from './add-light.page';

const routes: Routes = [
  {
    path: '',
    component: AddLightPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddLightPageRoutingModule {}
