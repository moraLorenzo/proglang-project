import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-light',
  templateUrl: './add-light.page.html',
  styleUrls: ['./add-light.page.scss'],
})
export class AddLightPage implements OnInit {

  constructor(public modalCtrl:ModalController) { }

  ngOnInit() {
  }

  async dismiss(){
      await this.modalCtrl.dismiss();
  }

}
