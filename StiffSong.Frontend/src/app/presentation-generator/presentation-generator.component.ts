import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {SongServiceService} from "../song-service.service";
import * as PptxGenJS from 'pptxgenjs-angular'
import jsPDF from 'jspdf'
import {Font} from "./font";

@Component({
  selector: 'app-presentation-generator',
  templateUrl: './presentation-generator.component.html',
  styleUrls: ['./presentation-generator.component.scss']
})
export class PresentationGeneratorComponent implements OnInit {


  constructor(public songService: SongServiceService) {
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
          title: image,
          bkgd: { data: `image/png;base64,${this.songService.preloadedImages.find(x => x.id == image).data}`},
          objects: [],
          slideNumber: {x: 0.3, y: '92%', color: 'FFFFFF'}
        });
      }
    }


    let index = 0;
    for (let s of this.songService.chosen) {
      let segments = this.splitLyricsText(s.lyrics);

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
          this.addImageSlide(pptx, segment, s.title, fontSize, slideName)
        }
      }
      this.songService.mark(s.id).subscribe();
      index++;
    }
    pptx.save(`Songs-${new Date().toISOString().slice(0, 10)}`, () => {
      this.saving = false;
    });
  }

  splitLyricsText(lyrics: string): { segments: Array<string>, maxLineLenght: number } {
    let result = [];
    let arrayOfLines = lyrics.match(/[^\r\n]+/g);

    let maxLineLenght = null;
    for (let i = 0; i < arrayOfLines.length; i++) {
      if (maxLineLenght === null || maxLineLenght < arrayOfLines[i].length) {
        maxLineLenght = arrayOfLines[i].length;
      }
    }

    let segment = '';
    for (let line of arrayOfLines) {
      let index = arrayOfLines.indexOf(line);
      if (line.startsWith('[') && !line.startsWith('[:') && !line.startsWith('[ :')) {
        if (index !== 0) {
          result.push(segment);
          segment = '';
        }
      } else {
        if (line && line.trim() != '' && line != '\n') {
          if (segment === '') {
            segment = line;
          } else {
            segment = `${segment} \n ${line}`;
          }
        }
      }
    }

    result.push(segment);
    return {segments: result, maxLineLenght: maxLineLenght};
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
    doc.save(`Songs-${new Date().toISOString().slice(0, 10)}.pdf`);
  }
}
