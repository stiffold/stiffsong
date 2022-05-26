import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule, MatDialogModule, MatExpansionModule,
  MatIconModule, MatInputModule, MatListModule,
  MatMenuModule, MatSnackBarModule, MatTabsModule,
  MatToolbarModule,
} from "@angular/material";
import { SongBrowserComponent } from './song-browser/song-browser.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ReactiveFormsModule} from "@angular/forms";
import { PresentationGeneratorComponent } from './presentation-generator/presentation-generator.component';
import {SongServiceService} from "./song-service.service";
import {HttpClientModule} from "@angular/common/http";
import { SongCreateComponent } from './song-create/song-create.component';
import { EditSongComponent } from './edit-song/edit-song.component';
import { SettingsComponent } from './settings/settings.component';
import { PreviewDialogComponent } from './settings/preview-dialog/preview-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {NewSettingsComponent} from "./new-settings/new-settings.component";


@NgModule({
  declarations: [
    AppComponent,
    SongBrowserComponent,
    PresentationGeneratorComponent,
    SongCreateComponent,
    EditSongComponent,
    SettingsComponent,
    NewSettingsComponent,
    PreviewDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatBadgeModule,
    MatExpansionModule,
    MatListModule,
    DragDropModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTabsModule,
    MatProgressSpinnerModule
  ],
  providers: [SongServiceService],
  bootstrap: [AppComponent],
  entryComponents: [PreviewDialogComponent]
})
export class AppModule { }
