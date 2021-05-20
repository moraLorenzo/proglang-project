import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddLightPageRoutingModule } from './add-light-routing.module';

import { AddLightPage } from './add-light.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddLightPageRoutingModule
  ],
  declarations: [AddLightPage]
})
export class AddLightPageModule {}
