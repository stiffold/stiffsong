import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {SearchDto} from "./search.dto";
import {SongDto} from "./song.dto";
import {MatSnackBar} from "@angular/material";
import {map} from "rxjs/operators";
import {SetupDto} from "./setup.dto";

@Injectable()
export class SongServiceService {
  chosen: Array<SongDto> = [];
  chosenChordImages = [];
  apiUrl = 'https://stiff.cz/';
  //apiUrl = 'http://localhost:5001/';

  httpOptions = {
    headers: new HttpHeaders({
      'user-key':  'stiff-song',
    })
  };

  choosedColor = { id:'1', code:'dddddd000000ffffff000000', date:'09/22/15', likes:'200000' };
  public choosedImages: Array<number> = [];
  public preloadedImages = [];
  isImage = false;

  constructor(private http: HttpClient, public snackBar: MatSnackBar) {

  }

  getById(id: number): Observable<SongDto>{
    return this.http.get<SongDto>(`${this.apiUrl}song/${id}`, this.httpOptions);
  }

  mark(id: number): Observable<void>{
    return this.http.get<void>(`${this.apiUrl}mark/${id}`, this.httpOptions);
  }

  create(song: SongDto): Observable<number>{
    return this.http.post<number>(`${this.apiUrl}createsong`, song, this.httpOptions);
  }

  update(song: SongDto){
    return this.http.post(`${this.apiUrl}updatesong`, song, this.httpOptions);
  }

  delete(id: number){
    return this.http.delete(`${this.apiUrl}deletesong/${id}`, this.httpOptions);
  }

  search(song: SearchDto): Observable<Array<SongDto>>{
    return this.http.post<Array<SongDto>>(`${this.apiUrl}searchSongs`, song, this.httpOptions);
  }

  addChrondImage(id: number, file: File): Observable<Object>{
    // create multipart form for file
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = SongServiceService.getFileHeaders();

    // POST
    return this.http
      .post(`${this.apiUrl}addchordimage/${id}`, formData, {headers: headers})
      .pipe(map(response => response));
  }

  addBackgroundImage(imageId: number | null, file: File): Observable<Object>{

    let formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = SongServiceService.getFileHeaders();

    // POST
    return this.http
      .post(`${this.apiUrl}addBackgroundImage/${imageId ? imageId : '0'}`, formData, {headers: headers})
      .pipe(map(response => response));
  }

  getImageById(imageId: number): Observable<string>{
    return this.http.get(`${this.apiUrl}Image/${imageId}`, { responseType: 'text' });
  }

  getImagePreviewById(imageId: number): Observable<string>{
    return this.http.get<string>(`${this.apiUrl}ImagePreview/${imageId}`, this.httpOptions);
  }

  getBackgroundImages(): Observable<number[]>{
    return this.http.get<number[]>(`${this.apiUrl}backgroundimages`, this.httpOptions);
  }

  deleteImageById(imageId: number){
    return this.http.delete(`${this.apiUrl}Image/${imageId}`, this.httpOptions);
  }

  getImageBySongId(songId: number): Observable<string>{
    return this.http.get<string>(`${this.apiUrl}songImage/${songId}`, this.httpOptions);
  }

  rotateImageBySongId(songId: number): Observable<string>{
    return this.http.get<string>(`${this.apiUrl}rotateToRight/${songId}`, this.httpOptions);
  }

  deleteImageBySongId(songId: number){
    return this.http.delete(`${this.apiUrl}songImage/${songId}`, this.httpOptions);
  }

  getSetupById(id: number): Observable<SetupDto>{
    return this.http.get<SetupDto>(`${this.apiUrl}setup/${id}`, this.httpOptions);
  }

  createSetup(setup: SetupDto): Observable<number>{
    return this.http.post<number>(`${this.apiUrl}setup`, setup, this.httpOptions);
  }

  openSnackBar(message: string, action: string = null) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getTextColor(){
    return this.getColor(4);
  }

  getTitleColor(){
    return this.getColor(1);
  }

  getBodyColor(){
    return this.getColor(3);
  }

  getColor(index: number){
    return  this.choosedColor.code.substring((index * 6) - 6, index * 6);
  }

  private static getFileHeaders() {
    return new HttpHeaders()
      .append('Content-Disposition', 'mulipart/form-data')
      .append('user-key', 'stiff-song');
  }
}

