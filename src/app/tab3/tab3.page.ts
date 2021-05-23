import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import jwt_decode from 'jwt-decode';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  account_email: string;
  account_name: string;

  constructor(
    private dataService: DataService,
    public router: Router,
    public loadingController: LoadingController,
    private user: UserService,
    public alertController: AlertController
  ) {
    this.presentLoading();
  }

  ionViewWillEnter() {
    // this.LoadSelf();
  }

  async LoadSelf() {
    let account_id = window.sessionStorage.getItem('user_id');
    // console.log(account_id);

    let payload = JSON.stringify({ account_id: account_id });
    let token = btoa(payload);

    this.dataService
      .processData(btoa('switch_user'), token)
      .then(async (res: any) => {
        res = jwt_decode(res);
        // this.presentLoading();
        // console.log('Result', res);
        if (res['payload'].data) {
          // console.log(res['payload'].data);
          this.account_email = res['payload'].data['account_email'];
          this.account_name = res['payload'].data['account_name'];
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
        '<ion-img src="../../assets/Logo/SwitchOn.png" alt="loading..."></ion-img><br/> <p>Getting Account Details...</p>',
      translucent: true,
      showBackdrop: false,
      spinner: null,
      duration: 500,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    let account_id = window.sessionStorage.getItem('user_id');
    // console.log(account_id);

    let payload = JSON.stringify({ account_id: account_id });
    let token = btoa(payload);

    this.dataService
      .processData(btoa('switch_user'), token)
      .then(async (res: any) => {
        res = jwt_decode(res);
        // this.presentLoading();
        // console.log('Result', res);
        if (res['payload'].data) {
          // console.log(res['payload'].data);
          this.account_email = res['payload'].data['account_email'];
          this.account_name = res['payload'].data['account_name'];
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

  public async logout() {
    const alert = await this.alertController.create({
      cssClass: 'confirm-custom',
      header: 'Attention Switcher',
      message:
        '<ion-img src="../../assets/Logo/SwitchOn.png" alt="loading..."></ion-img><br/><p>Do you wish to <strong>LOGOUT</strong>?</p>',
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
            await this.user.setLoggedOut();
            this.router.navigate(['login']);
          },
        },
      ],
    });

    await alert.present();
  }
}
