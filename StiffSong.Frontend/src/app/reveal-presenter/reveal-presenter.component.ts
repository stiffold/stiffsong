import { Component, OnInit, AfterViewInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import Reveal from 'reveal.js';
import {SongServiceService} from "../song-service.service";
import {LyricsParser} from "../lyrics-parser";
import { ActivatedRoute } from '@angular/router';
import {SetupDto} from "../setup.dto";
import {SongDto} from "../song.dto";

@Component({
  selector: 'app-reveal-presenter',
  templateUrl: './reveal-presenter.component.html',
  styleUrls: ['./reveal-presenter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RevealPresenterComponent implements OnInit, AfterViewInit  {

  songSlides: Array<SongSlide>;
  id: number = null;
  reveal: any;
  afterInit = false;
  initialized = false;

  constructor(private songService: SongServiceService, private activatedRoute: ActivatedRoute) {
    //get id from params
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      this.songService.getSetupById(this.id).subscribe(setup => {
        this.prepareSlidesFromSetup(setup);
      })
    });
  }

  async prepareSlidesFromSetup(setup: SetupDto){
    let songs: Array<SongDto> = [];
    for (let songId of setup.songs.split(';')){
      let song = await this.songService.getById(Number(songId)).toPromise();
      songs.push(song);
    }

    let images = setup.images.split(';');

    let result:Array<SongSlide> = [];
    let index = 1;
    let imageIndex = 1;
    //get slides structure
    for (let song of songs) {
      let image = images.length < imageIndex ? null : images[imageIndex-1];
      let segments = LyricsParser.splitLyricsText(song.lyrics).segments;

      for (let segment of segments){
        let arrayOfLines = segment.match(/[^\r\n]+/g);
        result.push({
          title: song.title,
          lines: arrayOfLines,
          image: image
        });
      }
      index++;
      imageIndex++;
      if (imageIndex> images.length){
        imageIndex = 1;
      }
    }

    this.songSlides = result;
    console.log("setup finish");
    setTimeout(() => this.initializeSafe(), 1000);
  }

  ngOnInit() {
      this.reveal = Reveal;
  }

  getImageUrl(imageId: number) {
    return `${this.songService.apiUrl}ImagePresenter/${imageId}`
  }

  ngAfterViewInit(){
     this.afterInit = true;
     setTimeout(() => this.initializeSafe(), 1000);
  }

  initializeSafe(){
    if (this.afterInit && this.songSlides != undefined && !this.initialized){
      Reveal.initialize({transition: 'fade'})
      this.initialized = true;
      console.log('initialized');
    }
  }
}

interface SongSlide{
  title: string,
  lines: Array<string>;
  image?: string;
}
