import { Component, OnInit } from '@angular/core';
import {SongServiceService} from "../song-service.service";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-new-settings',
  templateUrl: './new-settings.component.html',
  styleUrls: ['./new-settings.component.scss']
})
export class NewSettingsComponent implements OnInit {

  constructor(public songService: SongServiceService, public dialog: MatDialog) { }
  images = [];
  fileToUpload: File | null = null;
  previewImage: any;

  ngOnInit() {
    this.songService.getBackgroundImages().subscribe(x => {
      this.images = x;
    });
  }

  getColor(code: string, index: number){
    return  '#' + code.substring((index * 6) - 6, index * 6)+ ';';
  }

  getActiveColor(color){
    if (color.id == this.songService.choosedColor.id){
      return '#ff4081';
    }
    return 'white';
  }

  getActiveImage(image){
    if (this.songService.choosedImages.some(x => x === image)){
      return '#ff4081';
    }
    return 'white';
  }

  getImageIndex(image){
    return this.songService.choosedImages.indexOf(image);
  }

  chooseImage(image){
    this.songService.isImage = true;
    if (this.songService.choosedImages.some(x => x === image)){
      let index = this.songService.choosedImages.indexOf(image);
      if (index > -1) {
        this.songService.choosedImages.splice(index, 1);
        if (this.songService.choosedImages.length === 0){
          this.songService.isImage = false;
        }
      }
    }else{
      this.songService.choosedImages.push(image);
      this.songService.getImageById(image).subscribe(x => this.songService.preloadedImages.push({id: image, data: x}));
      return '#ff4081';
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);

    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.previewImage = reader.result;
    }

    this.addImage();
  }

  addImage() {
    this.songService.addBackgroundImage(null, this.fileToUpload).subscribe(x => {
      this.songService.openSnackBar("Image saved");
    });
  }

  getImageUrl(imageId: number) {
     return `${this.songService.apiUrl}ImagePreview/${imageId}`
  }

  deleteImage(image) {
    this.songService.deleteImageById(image).subscribe(s => {
      const index = this.images.indexOf(image);
      if (index > -1) {
        this.images.splice(index, 1);
      }

      let choosen = this.songService.choosedImages.indexOf(image);
      if (choosen > -1) {
        this.songService.choosedImages.splice(choosen, 1);
        if (this.songService.choosedImages.length === 0){
          this.songService.isImage = false;
        }
      }
      this.songService.openSnackBar("Image deleted");
    });
  }
}
