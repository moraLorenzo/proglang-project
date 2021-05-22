import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  taskName: any = '';
  taskList = [];
  switches: any;

  bedroom_active: number = 0;
  bathroom_active: number = 0;
  living_active: number = 0;
  kitchen_active: number = 0;

  bedroom_inactive: number = 0;
  bathroom_inactive: number = 0;
  living_inactive: number = 0;
  kitchen_inactive: number = 0;

  constructor(
    private dataService: DataService,
    public router: Router,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {}

  addTask() {
    if (this.taskName.length > 0) {
      let task = this.taskName;
      this.taskList.push(task);
      this.taskName = '';
    }
  }
  deleteTask(index) {
    this.taskList.splice(index, 1);
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      cssClass: 'my-custom-class-toast',
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  ionViewWillEnter() {
    this.bedroom_active = 0;
    this.bathroom_active = 0;
    this.living_active = 0;
    this.kitchen_active = 0;

    this.bedroom_inactive = 0;
    this.bathroom_inactive = 0;
    this.living_inactive = 0;
    this.kitchen_inactive = 0;
    this.LoadSwitches();
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

        // console.log('Result', res);
        if (res['payload'].data) {
          // console.log(res['payload'].data);
          this.switches = res['payload'].data.reverse();

          this.bedroom_active = this.switches.filter(
            (e) => e.switch_location === 'Bedroom' && e.is_lit === 1
          ).length;
          this.bathroom_active = this.switches.filter(
            (e) => e.switch_location === 'Bathroom' && e.is_lit === 1
          ).length;
          this.living_active = this.switches.filter(
            (e) => e.switch_location === 'Living Room' && e.is_lit === 1
          ).length;
          this.kitchen_active = this.switches.filter(
            (e) => e.switch_location === 'Kitchen' && e.is_lit === 1
          ).length;

          this.bedroom_inactive = this.switches.filter(
            (e) => e.switch_location === 'Bedroom' && e.is_lit === 0
          ).length;
          this.bathroom_inactive = this.switches.filter(
            (e) => e.switch_location === 'Bathroom' && e.is_lit === 0
          ).length;
          this.living_inactive = this.switches.filter(
            (e) => e.switch_location === 'Living Room' && e.is_lit === 0
          ).length;
          this.kitchen_inactive = this.switches.filter(
            (e) => e.switch_location === 'Kitchen' && e.is_lit === 0
          ).length;
        } else if (res['payload'].error) {
          console.log(res['payload'].error);
        }
      })
      .catch((err) => {
        if (err['message']) {
          // console.log('No Switches Detected');
          this.presentToast('No Switches Detected');
        }
        // console.log(err);
      });
  }
}
