import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {SongServiceService} from "../song-service.service";
import * as PptxGenJS from 'pptxgenjs-angular'
import jsPDF from 'jspdf'
import {Font} from "./font";
import {LyricsParser} from "../lyrics-parser";
import {SetupDto} from "../setup.dto";
import { Router } from '@angular/router';

@Component({
  selector: 'app-presentation-generator',
  templateUrl: './presentation-generator.component.html',
  styleUrls: ['./presentation-generator.component.scss']
})
export class PresentationGeneratorComponent implements OnInit {


  constructor(public songService: SongServiceService, private router: Router) {
  }

  saving = false;

  ngOnInit() {
  }

  remove(item) {
    let index = this.songService.chosen.indexOf(item);
    if (index !== -1) this.songService.chosen.splice(index, 1);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.songService.chosen, event.previousIndex, event.currentIndex);
  }

  savePresentation() {
    setTimeout(() => {
      this.saving = true;
    });

    const pptx = new PptxGenJS();
    pptx.setLayout('LAYOUT_WIDE');
    pptx.setBrowser(true);


    if (this.songService.isImage === false) {
      pptx.defineSlideMaster({
        title: 'MAIN_SLIDE',
        bkgd: this.songService.getBodyColor(),
        objects: [
          {'rect': {x: 0, y: 0, w: '100%', h: 0.75, fill: this.songService.getTitleColor()}},
        ],
        slideNumber: {x: 0.3, y: '92%', color: this.songService.getTextColor()}
      });
    } else {
      for (let image of this.songService.choosedImages) {
        pptx.defineSlideMaster({
          title: image.toString(),
          bkgd: { data: `image/png;base64,${this.songService.preloadedImages.find(x => x.id == image).data}`},
          objects: [],
          slideNumber: {x: 0.3, y: '92%', color: 'FFFFFF'}
        });
      }
    }


    let index = 0;
    for (let s of this.songService.chosen) {
      let segments = LyricsParser.splitLyricsText(s.lyrics);

      let fontSize = 50;
      if (segments.maxLineLenght >= 40) {
        fontSize = 40;
      }
      if (segments.maxLineLenght >= 50) {
        fontSize = 35;
      }

      for (let segment of segments.segments) {
        if (this.songService.isImage === false) {
          this.addColorSlide(pptx, segment, s.title, fontSize)
        } else {
          let slideName = this.songService.choosedImages[index];
          if (!slideName) {
            index = 0;
            slideName = this.songService.choosedImages[0];
          }
          this.addImageSlide(pptx, segment, s.title, fontSize, slideName.toString())
        }
      }
      this.songService.mark(s.id).subscribe();
      index++;
    }
    pptx.save(`Songs-${new Date().toISOString().slice(0, 10)}`, () => {
      this.saving = false;
    });
  }



  private addColorSlide(pptx: any, segment: string, title: string, fontSize: number) {
    const slide = pptx.addNewSlide('MAIN_SLIDE');
    slide.addText(title, {
      x: 0.2,
      y: 0,
      w: '100%',
      h: 0.75,
      align: 'l',
      bold: true,
      color: this.songService.getTextColor()
    });
    slide.addText(segment, {
      x: 0.2,
      y: 1.0,
      w: '97%',
      h: '85%',
      align: 'c',
      fontSize: fontSize,
      color: this.songService.getTextColor()
    });
  }

  private addImageSlide(pptx: any, segment: string, title: string, fontSize: number, slideName: string) {
    const slide = pptx.addNewSlide(slideName);
    slide.addText(title, {
      x: 0,
      y: 0,
      w: '100%',
      h: 0.75,
      align: 'c',
      bold: true,
      color: 'FFFFFF',
      outline: {size: 0.5, color: '000000'},
      shadow: {type: 'outer', color: '000000', blur: 1, offset: 5, angle: 45}
    });
    slide.addText(segment, {
      x: 0.2,
      y: 1.0,
      w: '97%',
      h: '85%',
      align: 'c',
      bold: true,
      fontSize: fontSize,
      color: 'FFFFFF',
      outline: {size: 1.5, color: '000000'},
      shadow: {type: 'outer', color: '000000', blur: 1, offset: 5, angle: 45}
    });
  }

  public savePdf() {
    const doc = new jsPDF();
    doc.addFileToVFS('Roboto-Regular.ttf', Font);
    doc.addFont('Roboto-Regular.ttf', 'custom', 'normal');
    doc.setFont('custom');
    doc.setFontSize(20);

    doc.text("Chords generated :)", 75, 100);
    doc.text(new Date().toDateString(), 80, 120);
    for (let s of this.songService.chosen) {
      doc.addPage();

      let image = this.songService.chosenChordImages.find(x => x.id == s.id);
      if (s.chordsText) {
        doc.text(s.chordsText, 10, 30);
      } else if (image) {
        doc.addImage(image.image, 'PNG', 0, 8, 210, 290, s.title, 'NONE', 0);
      }else{
        doc.text(`Please fill chords - nothing here for ${s.title}`, 10, 30);
      }

      doc.setFontSize(30);
      doc.text(s.title, 10, 10);
      doc.setFontSize(20);

    }
    doc.save(`Chords-${new Date().toISOString().slice(0, 10)}.pdf`);
  }

  goToPresenter() {
    //store setup
    let setupDto = <SetupDto>{
      songs: this.songService.chosen.map(x => x.id).join(';'),
      images: this.songService.choosedImages.join(';')
    };
    this.songService.createSetup(setupDto).subscribe(setupId => {
      //route to presenter with that setup
      const url = this.router.serializeUrl(this.router.createUrlTree([`/presenter/${setupId}`]));
      window.open(`#/${url}`, '_blank');
    });

  }
}
