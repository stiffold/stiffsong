import { Component } from '@angular/core';
import {SongServiceService} from "./song-service.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stiffsong';
  constructor(public songService: SongServiceService, private router: Router){

  }

  get isPresenter() : boolean{
    return this.router.url.includes("presenter");
  }
}
