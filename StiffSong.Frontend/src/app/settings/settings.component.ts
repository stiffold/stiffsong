import { Component, OnInit } from '@angular/core';
import {SongServiceService} from "../song-service.service";
import {MatDialog} from "@angular/material";
import {PreviewDialogComponent} from "./preview-dialog/preview-dialog.component";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(public songService: SongServiceService, public dialog: MatDialog) { }
  images = [];

  ngOnInit() {
    for (let i = 1; i < 43; i++){
       this.images.push('assets/thumb-' + i + '.jpg')
    }
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
      return '#ff4081';
    }
  }

  choose(color){
    this.songService.choosedColor = color;
    this.songService.isImage = false;
  }

  preview(color): void {
    const dialogRef = this.dialog.open(PreviewDialogComponent, {
      width: '350px',
      data: color
    });
  }

  colors = [
    { id:'1', code:'dddddd000000ffffff000000', date:'09/22/15', likes:'200000' },
    { id:'2763', code:'222831393e4600adb5eeeeee', date:'09/22/15', likes:'17221' },
    { id:'361', code:'f9ed69f08a5db83b5e6a2c70', date:'08/12/15', likes:'12507' },
    { id:'7642', code:'f38181fce38aeaffd095e1d3', date:'11/07/15', likes:'10635' },
    { id:'17117', code:'08d9d6252a34ff2e63eaeaea', date:'03/01/16', likes:'9830' },
    { id:'15830', code:'364f6b3fc1c9f5f5f5fc5185', date:'02/14/16', likes:'8647' },
    { id:'8328', code:'a8d8eaaa96dafcbad3ffffd2', date:'11/12/15', likes:'8641' },
    { id:'42191', code:'e3fdfdcbf1f5a6e3e971c9ce', date:'11/05/16', likes:'7785' },
    { id:'14832', code:'e4f9f530e3ca11999e40514e', date:'02/08/16', likes:'7549' },
    { id:'1504', code:'48466d3d84a846cdcfabedd8', date:'08/14/15', likes:'6699' },
    { id:'9506', code:'00b8a9f8f3d4f6416cffde7d', date:'12/01/15', likes:'6589' },
    { id:'238', code:'2b2e4ae8454590374953354a', date:'08/10/15', likes:'6417' },
    { id:'22272', code:'f9f7f7dbe2ef3f72af112d4e', date:'04/09/16', likes:'6402' },
    { id:'15697', code:'e23e5788304e522546311d3f', date:'02/11/16', likes:'6288' },
    { id:'62193', code:'2121213232320d737714ffec', date:'01/12/17', likes:'6248' },
    { id:'39602', code:'ffcfdffefdcae0f9b5a5dee5', date:'09/20/16', likes:'6118' },
    { id:'105443', code:'ffc7c7ffe2e2f6f6f68785a2', date:'01/09/18', likes:'6110' },
    { id:'71302', code:'a8e6cfdcedc1ffd3b6ffaaa5', date:'04/28/17', likes:'5941' },
    { id:'14114', code:'3ec1d3f6f7d7ff9a00ff165d', date:'01/30/16', likes:'5921' },
    { id:'12081', code:'ffc8c8ff9999444f5a3e4149', date:'01/02/16', likes:'5881' },
    { id:'18612', code:'6fe7dd3490de6639a6521262', date:'03/15/16', likes:'5828' },
    { id:'72652', code:'defcf9cadefcc3bef0cca8e9', date:'05/15/17', likes:'5774' },
    { id:'107482', code:'ffb6b9fae3d9bbded661c0bf', date:'02/15/18', likes:'5681' },
    { id:'67815', code:'8ef6e49896f1d59bf6edb1f1', date:'03/28/17', likes:'5556' },
    { id:'7247', code:'2d4059ea5455f07b3fffd460', date:'10/18/15', likes:'5463' },
    { id:'100885', code:'f67280c06c846c5b7b355c7d', date:'12/08/17', likes:'5198' },
    { id:'42533', code:'384259f738597ac7c4c4edde', date:'10/23/16', likes:'4988' },
    { id:'78712', code:'dcedc2ffd3b5ffaaa6ff8c94', date:'06/28/17', likes:'4777' },
    { id:'19113', code:'30384100adb5eeeeeeff5722', date:'03/19/16', likes:'4770' },
    { id:'13313', code:'2a363be84a5fff847cfecea8', date:'01/10/16', likes:'4750' },
    { id:'119059', code:'bad7dfffe2e2f6f6f699ddcc', date:'05/25/18', likes:'4737' },
    { id:'92306', code:'a1eafbfdfdfdffcef3cabbe9', date:'10/15/17', likes:'4632' },
    { id:'12457', code:'cefff1ace7efa6aceca56cc1', date:'01/12/16', likes:'4622' },
    { id:'41089', code:'f85f73fbe8d3928a97283c63', date:'10/07/16', likes:'4491' },
    { id:'66116', code:'a9eee6fefaecf9a1bc625772', date:'02/28/17', likes:'4473' },
    { id:'39609', code:'15b7b910ddc2f5f5f5f57170', date:'09/14/16', likes:'4458' },
    { id:'36477', code:'00e0ff74f9ffa6fff2e8ffe8', date:'08/02/16', likes:'4454' },
    { id:'1649', code:'f0f5f9c9d6df52616b1e2022', date:'08/15/15', likes:'4451' },
    { id:'67166', code:'7effdbb693fe8c82fcff9de2', date:'04/03/17', likes:'4448' },
    { id:'66990', code:'07689fa2d5f2fafafaff7e67', date:'01/17/17', likes:'4426' },
    { id:'22672', code:'0c056d590d82b61aaef25d9c', date:'04/11/16', likes:'4224' },
    { id:'85473', code:'dff4f3dde7f2b9bbdf878ecd', date:'09/10/17', likes:'4196' },
    { id:'64711', code:'ebfffac6fce56ef3d60dceda', date:'02/15/17', likes:'4146' },
    { id:'33990', code:'f7fbfcd6e6f2b9d7ea769fcd', date:'06/28/16', likes:'4116' },
    { id:'42676', code:'303a52574b909e579dfc85ae', date:'11/04/16', likes:'4014' },
    { id:'66129', code:'1fab8962d2a29df3c4d7fbe8', date:'01/19/17', likes:'3851' },
    { id:'17140', code:'fffcca55e9bc11d3bc537780', date:'02/17/16', likes:'3798' },
    { id:'118795', code:'a8e6cffdffabffd3b6ffaaa5', date:'05/16/18', likes:'3776' },
    { id:'81674', code:'fcefeefccde2fc5c9cc5e3f6', date:'08/22/17', likes:'3764' },
    { id:'68089', code:'c7f5fefcc8f8eab4f8f3f798', date:'04/07/17', likes:'3757' },
    { id:'41810', code:'adf7d195e8d77dace48971d0', date:'10/24/16', likes:'3675' },
    { id:'12715', code:'fef0ffd6c8ffc79ecf7e6bc4', date:'02/01/16', likes:'3668' },
    { id:'13712', code:'4d606e3fbac2d3d4d8f5f5f5', date:'01/27/16', likes:'3653' },
    { id:'62610', code:'e0fcff90f2ff6eb6ff7098da', date:'02/07/17', likes:'3622' },
    { id:'87244', code:'27296d5e63b6a393ebf5c7f7', date:'09/13/17', likes:'3614' },
    { id:'31443', code:'9ddcdcfff4e1ffebb7e67a7a', date:'06/11/16', likes:'3613' },
    { id:'31046', code:'ffa5a5ffffc2c8e7edbfcfff', date:'06/04/16', likes:'3609' },
    { id:'93125', code:'d4a5a5ffecdaf9ffeaa6d0e4', date:'10/20/17', likes:'3605' },
    { id:'66816', code:'233142455d7af95959e3e3e3', date:'03/06/17', likes:'3569' },
    { id:'66334', code:'c8f4dea4e5d966c6ba649dad', date:'03/15/17', likes:'3556' },
    { id:'124272', code:'99e1e5f3e8cbf2c6b4fbafaf', date:'07/05/18', likes:'3555' },
    { id:'35497', code:'3038413a4750d72323eeeeee', date:'07/11/16', likes:'3544' },
    { id:'62260', code:'2a363be84a5fff847bfecea8', date:'10/30/16', likes:'3516' },
    { id:'105677', code:'3932324d45458d6262ed8d8d', date:'01/15/18', likes:'3502' },
    { id:'62940', code:'f69d9dffeab6fdffbac0ffc2', date:'01/25/17', likes:'3477' },
    { id:'110868', code:'11cbd7c6f1e7f0fff3fa4659', date:'03/20/18', likes:'3457' },
    { id:'42937', code:'700961b80d57e03e36ff7c38', date:'08/10/16', likes:'3454' },
    { id:'66766', code:'dff5f287dfd646b7b92f9296', date:'03/31/17', likes:'3446' },
    { id:'108152', code:'3a0088930077e61c5dffbd39', date:'02/24/18', likes:'3429' },
    { id:'93362', code:'155263ff6f3cff9a3cffc93c', date:'10/26/17', likes:'3428' },
    { id:'62803', code:'253b6e1f5f8b1891acd2ecf9', date:'01/24/17', likes:'3425' },
    { id:'108574', code:'ff6464ff8264ffaa64fff5a5', date:'03/03/18', likes:'3424' },
    { id:'79451', code:'a9eee6fefaecf38181625772', date:'07/27/17', likes:'3417' },
    { id:'69667', code:'fafafae8f1f5005691004a7c', date:'04/30/17', likes:'3395' },
    { id:'114174', code:'283149404b69f73859dbedf3', date:'04/05/18', likes:'3395' },
    { id:'110859', code:'a7efe97fdfd4fbe1b6fbac91', date:'03/18/18', likes:'3392' },
    { id:'62767', code:'ffd9e8de95ba7f4a884a266a', date:'01/13/17', likes:'3375' },
    { id:'42657', code:'7a08faa82ffcc264fef8ecfd', date:'10/25/16', likes:'3337' },
    { id:'110223', code:'c7f3fffdc7ffffdcf5f2f4c3', date:'03/12/18', likes:'3332' },
    { id:'6998', code:'f06868fab57aedf79880d6ff', date:'10/13/15', likes:'3323' },
    { id:'38861', code:'e4fffea4f6f9ff99feba52ed', date:'09/12/16', likes:'3292' },
    { id:'94114', code:'66bfbfeaf6f6fcfefef76b8a', date:'10/31/17', likes:'3271' },
    { id:'25729', code:'222831393e4600adb500fff5', date:'04/20/16', likes:'3259' },
    { id:'64671', code:'29c6cdf6e4c4fea386f19584', date:'01/14/17', likes:'3224' },
    { id:'108974', code:'00204a00579200bbf0d9faff', date:'03/07/18', likes:'3223' },
    { id:'102454', code:'a1d9ffca82f8ed93cbf2bbbb', date:'12/26/17', likes:'3202' },
    { id:'8283', code:'f4f7f7aacfd079a8a91f4e5f', date:'11/23/15', likes:'3164' },
    { id:'38642', code:'d5fdff9de5ffaca8ffac73ff', date:'08/26/16', likes:'3155' },
    { id:'9148', code:'f33535d8e9f033425b29252c', date:'12/02/15', likes:'3135' },
    { id:'63246', code:'f4f7f7aacfd05da0a234495e', date:'02/01/17', likes:'3124' },
    { id:'40128', code:'fa4659feffe4a3de832eb872', date:'09/26/16', likes:'3116' },
    { id:'89856', code:'ffffc1ffd2a5ffa8b8d988bc', date:'09/28/17', likes:'3112' },
    { id:'40297', code:'c7fffffbeeffebc6ff7e80ff', date:'09/24/16', likes:'3107' },
    { id:'10792', code:'3038413a475000adb5eeeeee', date:'12/14/15', likes:'3106' },
    { id:'117448', code:'f8b595f67280c06c846c5b7c', date:'04/23/18', likes:'3077' },
    { id:'17143', code:'e4f1fe8dc6ff22313f34495e', date:'02/25/16', likes:'3061' },
    { id:'89958', code:'f6f6f6d6e4f01e56a0163172', date:'10/10/17', likes:'3051' },
    { id:'80619', code:'f2fcfcbdf1f68fbaf30245a3', date:'08/18/17', likes:'3038' },
    { id:'42617', code:'f47c7cf7f48ba1de9370a1d7', date:'11/08/16', likes:'3021' },
    { id:'63366', code:'560764913175dd5b82fe9797', date:'01/16/17', likes:'3008' },
    { id:'7817', code:'3498dbecf0f134495ef1c40f', date:'10/31/15', likes:'3007' },
    { id:'8941', code:'2fc5cc6df1cce3ffc3ff89c0', date:'11/19/15', likes:'3001' },
    { id:'118028', code:'240041900048ff4057ff8260', date:'05/02/18', likes:'2987' },
    { id:'106550', code:'e7e6e1f7f6e7c1c0b9537791', date:'01/27/18', likes:'2982' },
    { id:'27158', code:'0204382841841f8ea300eaff', date:'04/30/16', likes:'2949' },
    { id:'121870', code:'35477d6c5b7bc06c84f67280', date:'06/25/18', likes:'2943' },
    { id:'84126', code:'a6e4e7f9f9f9ebcbae8f8787', date:'09/03/17', likes:'2933' },
    { id:'40156', code:'0f1021d01257fb90b7ffcee4', date:'09/19/16', likes:'2929' },
    { id:'101436', code:'fbfbfbb9e1dcf38181756c83', date:'12/17/17', likes:'2926' },
    { id:'65929', code:'f6f5f5e3e3e33bb4c1048998', date:'03/08/17', likes:'2925' },
    { id:'9474', code:'f64662c6195174193856132a', date:'11/25/15', likes:'2916' },
    { id:'42272', code:'f38181fce38ad6f7ad95e1d3', date:'10/31/16', likes:'2916' },
    { id:'103966', code:'071a5208697217b978a7ff83', date:'01/02/18', likes:'2893' },
    { id:'110659', code:'fbf0f0dfd3d3b8b0b07c7575', date:'03/15/18', likes:'2878' },
    { id:'38817', code:'e6f8f6a0f6d272dfd003414d', date:'08/30/16', likes:'2877' },
    { id:'62655', code:'fd9191fddd8af5fc9e9efcb4', date:'01/11/17', likes:'2866' },
    { id:'118331', code:'f8b195f67280c06c84355c7d', date:'05/05/18', likes:'2852' },
    { id:'74424', code:'ffdedef7f3cec5ecbe4797b1', date:'05/27/17', likes:'2850' },
    { id:'11752', code:'0278ae51dacf9ef5cfe8ffc1', date:'01/06/16', likes:'2842' },
    { id:'86615', code:'39065a6a05729a0f98ea0599', date:'09/15/17', likes:'2839' },
    { id:'63788', code:'ffabe5c7f5ffd89ffff6fcae', date:'02/13/17', likes:'2829' },
  ];

}
