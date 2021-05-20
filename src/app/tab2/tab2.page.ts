import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddLightPage } from '../add-light/add-light.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    todoListLight = [
    {
      Lightname: 'Test1',
      Location: 'Kitchen',
      Switch: 'Off'
    },
  
    {
      Lightname: 'Test2',
      Location: 'Living Room',
      Switch: 'On'
    },

    {
      Lightname: 'Test3',
      Location: 'Bedroom',
      Switch: 'Off'
    },

    {
      Lightname: 'Test4',
      Location: 'Bathroom',
      Switch: 'On'
    }
  ]

  constructor(public modalCtrl:ModalController) {}

  async addLight(){
    const modal = await this.modalCtrl.create({
      component: AddLightPage
    })
  
    return await modal.present()

  }

}
