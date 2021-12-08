import {Component, OnInit} from '@angular/core';
import {SongServiceService} from "../song-service.service";
import {FormControl} from "@angular/forms";
import {debounceTime} from "rxjs/operators";
import {SongDto} from "../song.dto";


@Component({
  selector: 'app-song-browser',
  templateUrl: './song-browser.component.html',
  styleUrls: ['./song-browser.component.scss']
})
export class SongBrowserComponent implements OnInit {
  constructor(private songService: SongServiceService) {
  }

  title = new FormControl('');
  lyrics = new FormControl('');

  songs = [];

  ngOnInit() {
    this.title.valueChanges.pipe(debounceTime(500)).subscribe(x => this.songService.search({
      title: x,
      lyrics: this.lyrics.value
    }).subscribe(y => this.songs = y));


    this.lyrics.valueChanges.pipe(debounceTime(500)).subscribe(x => this.songService.search({
      title: this.title.value,
      lyrics: x
    }).subscribe(y => this.songs = y));

    this.refill();
  }

  refill(){
    this.songService.search({
      title: this.title.value,
      lyrics: this.lyrics.value
    }).subscribe(y => this.songs = y);
  }

  songChoosed(song: SongDto) {
    this.songService.chosen.push(song);
    this.songService.getImageBySongId(song.id).subscribe(x => {
      if (x){
        this.songService.chosenChordImages.push({id: song.id, image: x}) ;
      }
    });
    this.songService.openSnackBar("Added to list");
  }

  delete(song: SongDto){
    let index = this.songs.indexOf(song);
    if (index !== -1) this.songs.splice(index, 1);
    this.songService.delete(song.id).subscribe(x => {this.songService.openSnackBar("Deleted");});
  }

  clear(){
    this.title.reset(null, {emitEvent: false});
    this.lyrics.reset(null, {emitEvent: false});
    this.songs = [];

    this.refill();
  }

  addBrakes(lyrics: string): string {
       if (lyrics){
         return lyrics.replace(/(?:\r\n|\r|\n)/g, '<br>');
       }
       return '';
  }
}
