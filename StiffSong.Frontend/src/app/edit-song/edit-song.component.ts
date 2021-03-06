import {Component, OnInit} from '@angular/core';
import {SongServiceService} from "../song-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";
import {Font} from "../presentation-generator/font";
import jsPDF from 'jspdf'

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.scss']
})
export class EditSongComponent implements OnInit {

  fileToUpload: File | null = null;
  previewImage: any;

  constructor(private songService: SongServiceService, private router: Router, private activatedRoute: ActivatedRoute) {
    //get id from params
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
    });
  }

  id = null;
  title = new FormControl('', Validators.required);
  lyrics = new FormControl('', Validators.required);
  chordsText = new FormControl('');

  ngOnInit() {
    //load model to edit
    this.songService.getById(this.id).subscribe(x => {
      this.title.setValue(x.title);
      this.lyrics.setValue(x.lyrics);
      this.chordsText.setValue(x.chordsText);
    });

    this.songService.getImageBySongId(this.id).subscribe(x => {
      if (x) {
        this.previewImage = "data:image/png;base64," + x;
      }
    });
  }

  save() {
    if (this.fileToUpload){
      this.addImage();
    }

    this.songService.update({id: this.id, title: this.title.value, lyrics: this.lyrics.value, chordsText: this.chordsText.value}).subscribe(x => {
      this.songService.openSnackBar("Saved");
      this.router.navigate(['edit/' + x])
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);

    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.previewImage = reader.result;
    }
  }

  haveChords(): boolean{
    return this.previewImage || this.chordsText.value;
  }

  addImage() {
    this.songService.addChrondImage(this.id, this.fileToUpload).subscribe(x => {
      this.songService.openSnackBar("Image saved");
      this.router.navigate(['edit/' + x])
    });
  }

  deleteImage(){
    this.songService.deleteImageBySongId(this.id).subscribe(x => {
      this.previewImage = null;
      this.fileToUpload = null;
      this.songService.openSnackBar("Image deleted");
    })
  }

  rotateImage(){
    this.songService.rotateImageBySongId(this.id).subscribe(x => {
      this.songService.openSnackBar("Image rotated");
      location.reload();
    })
  }

  previewPdf() {
    const doc = new jsPDF();
    doc.addFileToVFS('Roboto-Regular.ttf', Font);
    doc.addFont('Roboto-Regular.ttf', 'custom', 'normal');
    doc.setFont('custom');
    doc.setFontSize(20);
    doc.text(this.chordsText.value, 10, 30);
    doc.setFontSize(30);
    doc.text(this.title.value, 10, 10);
    doc.setFontSize(20);
    doc.save(`Chords-${new Date().toISOString().slice(0, 10)}.pdf`);
  }
}
