import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { AddLightPage } from '../add-light/add-light.page';
import { DataService } from '../services/data.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  switches: any;
  testId = 1;

  constructor(
    public modalCtrl: ModalController,
    private dataService: DataService,
    public router: Router,
    public loadingController: LoadingController,
    public alertController: AlertController
  ) {
    this.presentLoading();
  }

  ionViewWillEnter() {
    this.LoadSwitches();
  }

  async addLight() {
    const modal = await this.modalCtrl.create({
      component: AddLightPage,
      componentProps: { users: 2 },
    });

    modal.onDidDismiss().then((data) => {
      this.presentLoading();
      // console.log(data); // Here's your selected user!
    });

    return await modal.present();
  }

  crazyEvent(id, is_lit) {
    // console.log(id, is_lit);
    if (is_lit == true) {
      is_lit = 1;
    } else {
      is_lit = 0;
    }

    let payload = JSON.stringify({ switch_id: id, switch_to: is_lit });
    let token = btoa(payload);
    this.dataService
      .processData(btoa('switch'), token)
      .then(async (res: any) => {
        res = jwt_decode(res);
        // this.presentLoading();
        // console.log('Result', res);
        if (res['payload'].msg == 'Successfully Switched') {
          // console.log(res['payload'].msg);
        } else if (res['payload'].error) {
          console.log(res['payload'].error);
        }
      })
      .catch((err) => {
        if (err['message']) {
          console.log('Invalid Inputs');
        }
        console.log(err);
      });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message:
        '<ion-img src="../../assets/Logo/SwitchOn.png" alt="loading..."></ion-img><br/> <p>Loading Switches...</p>',
      translucent: true,
      showBackdrop: false,
      spinner: null,
      duration: 2000,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    let account_id = window.sessionStorage.getItem('user_id');
    // console.log(account_id);

    let payload = JSON.stringify({ account_id: account_id });
    let token = btoa(payload);

    this.dataService
      .processData(btoa('my_switch'), token)
      .then(async (res: any) => {
        res = jwt_decode(res);
        // this.presentLoading();
        // console.log('Result', res);
        if (res['payload'].data) {
          // console.log(res['payload'].data);
          this.switches = res['payload'].data.reverse();
          // console.log(
          //   this.switches.filter(
          //     (e) => e.switch_location === 'Bathroom' && e.is_lit === 1
          //   ).length
          // );
        } else if (res['payload'].error) {
          console.log(res['payload'].error);
        }
      })
      .catch((err) => {
        if (err['message']) {
          console.log('Invalid Inputs');
        }
        console.log(err);
      });
  }

  async LoadSwitches() {
    let account_id = window.sessionStorage.getItem('user_id');
    // console.log(account_id);

    let payload = JSON.stringify({ account_id: account_id });
    let token = btoa(payload);

    this.dataService
      .processData(btoa('my_switch'), token)
      .then(async (res: any) => {
        res = jwt_decode(res);
        // this.presentLoading();
        // console.log('Result', res);
        if (res['payload'].data) {
          // console.log(res['payload'].data);
          this.switches = res['payload'].data.reverse();
          // console.log(
          //   this.switches.filter(
          //     (e) => e.switch_location === 'Bathroom' && e.is_lit === 1
          //   ).length
          // );
        } else if (res['payload'].error) {
          console.log(res['payload'].error);
        }
      })
      .catch((err) => {
        if (err['message']) {
          console.log('Invalid Inputs');
        }
        console.log(err);
      });
  }

  async remove_switch(switch_id) {
    // console.log(switch_id);
    const alert = await this.alertController.create({
      cssClass: 'confirm-custom',
      header: 'Attention Switcher',
      message:
        '<ion-img src="../../assets/Logo/SwitchOn.png" alt="loading..."></ion-img><br/><p>Do you confirm to <strong>REMOVE</strong> this switch?</p>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Okay',
          handler: async () => {
            let payload = JSON.stringify({ switch_id });
            let token = btoa(payload);
            // console.log('Payload: ', token);
            const loading = await this.loadingController.create({
              cssClass: 'my-custom-class-login',
              message:
                '<ion-img src="../../assets/Logo/SwitchOn.png" alt="loading..."></ion-img><br/> <p>Processing Switch...</p>',
              translucent: true,
              showBackdrop: false,
              spinner: null,
              duration: 2000,
            });
            await loading.present();

            const { role, data } = await loading.onDidDismiss();
            // console.log('Loading dismissed!');
            this.dataService
              .processData(btoa('remove_switch'), token)
              .then(async (res: any) => {
                res = jwt_decode(res);
                // this.presentLoading();
                // console.log('Result', res);
                if (res['payload'].msg == 'Successfully Removed') {
                  let account_id = window.sessionStorage.getItem('user_id');
                  // console.log(account_id);

                  let payload = JSON.stringify({ account_id: account_id });
                  let token = btoa(payload);
                  this.dataService
                    .processData(btoa('my_switch'), token)
                    .then(async (res: any) => {
                      res = jwt_decode(res);
                      // this.presentLoading();
                      // console.log('Result', res);
                      if (res['payload'].data) {
                        // console.log(res['payload'].data);
                        this.switches = res['payload'].data.reverse();
                      } else if (res['payload'].error) {
                        console.log(res['payload'].error);
                      }
                    })
                    .catch((err) => {
                      if (err['message']) {
                        this.switches = null;
                        console.log('Invalid Inputs');
                      }
                      console.log(err);
                    });
                } else {
                  console.log(res['payload'].msg);
                }
              })
              .catch((err) => {
                if (err['message']) {
                  console.log('Invalid Inputs');
                }
                console.log(err);
              });
          },
        },
      ],
    });

    await alert.present();
  }
}
