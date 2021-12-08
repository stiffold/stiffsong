import { Component } from '@angular/core';
import {SongServiceService} from "./song-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stiffsong';
  constructor(public songService: SongServiceService){

  }
}
