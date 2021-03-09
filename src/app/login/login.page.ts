import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  login(e) {
    e.preventDefault();
    let param1 = e.target[0].value;
    let param2 = e.target[1].value;
    console.log(param1);
    console.log(param2);
  }
}
