import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SongBrowserComponent} from "./song-browser/song-browser.component";
import {PresentationGeneratorComponent} from "./presentation-generator/presentation-generator.component";
import {SongCreateComponent} from "./song-create/song-create.component";
import {EditSongComponent} from "./edit-song/edit-song.component";
import {NewSettingsComponent} from "./new-settings/new-settings.component";
import {RevealPresenterComponent} from "./reveal-presenter/reveal-presenter.component";

const routes: Routes = [
  {path: 'browser', component: SongBrowserComponent},
  {path: 'create', component: SongCreateComponent},
  {path: 'creator', component: PresentationGeneratorComponent},
  {path: 'settings', component: NewSettingsComponent},
  {path: 'edit/:id', component: EditSongComponent},
  {path: 'presenter/:id', component: RevealPresenterComponent},
  {path: '', redirectTo: '/browser', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
