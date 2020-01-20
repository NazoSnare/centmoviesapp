import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  p={
    title: 'List Movies',
    url: '/list',
    icon: 'list'
  };
  constructor() {}

}
