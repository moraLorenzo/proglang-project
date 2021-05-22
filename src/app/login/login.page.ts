import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import jwt_decode from 'jwt-decode';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  email: string;
  password: string;

  constructor(
    private dataService: DataService,
    public router: Router,
    public loadingController: LoadingController,
    private user: UserService,
    public toastController: ToastController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    if (this.user.isLoggedIn()) {
      // console.log('wb');
      this.router.navigate(['tabs']);
    }
  }

  redirectReg() {
    this.router.navigate(['/register']);
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      cssClass: 'my-custom-class-toast',
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  async presentLoading(token) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class-login',
      message:
        '<ion-img src="../../assets/Logo/SwitchOn.png" alt="loading..."></ion-img><br/> <p>Logging in...</p>',
      translucent: true,
      showBackdrop: false,
      spinner: null,
      duration: 2000,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!');
    this.dataService
      .processData(btoa('login'), token)
      .then(async (res: any) => {
        res = jwt_decode(res);
        // this.presentLoading();
        // console.log('Result', res);
        if (res['payload'].data) {
          // console.log(res['payload'].data['account_id']);
          this.user.setLoggedIn();
          window.sessionStorage.setItem(
            'user_id',
            res['payload'].data['account_id']
          );
          this.email = '';
          this.password = '';
          this.presentToast('Successfully Logged In');
          this.router.navigate(['/tabs']);
        } else if (res['payload'].error) {
          // console.log(res['payload'].error);
          this.presentToast('Invalid Inputs');
        }
      })
      .catch((err) => {
        if (err['message']) {
          this.presentToast(err['message']);
        }
        console.log(err);
      });
  }

  login(e) {
    e.preventDefault();
    let param1 = e.target[0].value;
    let param2 = e.target[1].value;

    // Encode Payload with this

    let payload = JSON.stringify({ param1, param2 });
    let token = btoa(payload);
    // console.log('Payload: ', token);
    this.presentLoading(token);
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
}
