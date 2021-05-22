import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import jwt_decode from 'jwt-decode';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  passwordType2: string = 'password';
  passwordIcon2: string = 'eye-off';

  email: string;
  username: string;
  password: string;
  cpassword: string;
  constructor(
    private dataService: DataService,
    public router: Router,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {}

  ngOnInit() {}
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  hideShowPassword2() {
    this.passwordType2 = this.passwordType2 === 'text' ? 'password' : 'text';
    this.passwordIcon2 = this.passwordIcon2 === 'eye-off' ? 'eye' : 'eye-off';
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
        '<ion-img src="../../assets/Logo/SwitchOn.png" alt="loading..."></ion-img><br/> <p>Registering...</p>',
      translucent: true,
      showBackdrop: false,
      spinner: null,
      duration: 2000,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    this.dataService
      .processData(btoa('register'), token)
      .then(async (res: any) => {
        res = jwt_decode(res);

        if (res['payload'].msg == 'Successfully Registered') {
          // this.router.navigate(['login']);
          this.presentToast(res['payload'].msg);
          this.email = '';
          this.username = '';
          this.password = '';
          this.cpassword = '';
          this.router.navigate(['login']);
        } else if (res['payload'].msg == 'Invalid Inputs') {
          // console.log('Invalid Inputs');
          this.presentToast(res['payload'].msg);
        }
        // console.log('Result', res['uc']);
      })
      .catch((err) => {
        if (err['message']) {
          console.log('Invalid Inputs');
        }
        // console.log(err);
      });
    // console.log('Loading dismissed!');
  }

  register(e) {
    e.preventDefault();
    let account_email = e.target[0].value;
    let account_name = e.target[1].value;
    let account_password = e.target[2].value;
    let confirm_password = e.target[3].value;

    if (account_password == confirm_password) {
      // Encode Payload with this

      let payload = JSON.stringify({
        account_name,
        account_email,
        account_password,
      });
      let token = btoa(payload);
      // console.log('Payload: ', token);

      this.presentLoading(token);
    } else {
      // console.log('Error Confirmation of password');
      this.presentToast('Error Confirmation of password');
    }
  }
}
