import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import jwt_decode from 'jwt-decode';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-add-light',
  templateUrl: './add-light.page.html',
  styleUrls: ['./add-light.page.scss'],
})
export class AddLightPage implements OnInit {
  switch_name: string;
  switch_location: string;

  constructor(
    public modalCtrl: ModalController,
    private dataService: DataService,
    public router: Router,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {}

  ngOnInit() {}

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      cssClass: 'my-custom-class-toast',
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  async add_switch() {
    if (this.switch_name && this.switch_location) {
      let payload = JSON.stringify({
        account_id: window.sessionStorage.getItem('user_id'),
        switch_name: this.switch_name,
        switch_location: this.switch_location,
      });
      let token = btoa(payload);
      this.dataService
        .processData(btoa('add_switch'), token)
        .then(async (res: any) => {
          res = jwt_decode(res);

          if ((res['payload'].msg = 'Successfully Added new Switch')) {
            await this.modalCtrl.dismiss({
              switch_name: this.switch_name,
              switch_location: this.switch_location,
            });
            this.presentToast(res['payload'].msg);
          } else if (res['payload'].error) {
            console.log(res['payload'].error);
          }
        })
        .catch((err) => {
          if (err['message']) {
            // console.log('Invalid Inputs');
            this.presentToast('Invalid Inputs');
          }
          console.log(err);
        });
    } else {
      this.presentToast('All Fields Required');
    }
  }
}
