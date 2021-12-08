import {Component, OnInit} from '@angular/core';
import {SongServiceService} from "../song-service.service";
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-song-create',
  templateUrl: './song-create.component.html',
  styleUrls: ['./song-create.component.scss']
})
export class SongCreateComponent implements OnInit {

  constructor(private songService: SongServiceService, private router: Router) {
  }

  title = new FormControl('', Validators.required);
  lyrics = new FormControl('',Validators.required);

  ngOnInit() {
  }

  save() {
    this.songService.create({id: null, title: this.title.value, lyrics: this.lyrics.value}).subscribe(x => {
      this.songService.openSnackBar("Saved");
      this.router.navigate(['edit/' + x])
    });
  }
}
