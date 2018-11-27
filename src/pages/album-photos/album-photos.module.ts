import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlbumPhotosPage } from './album-photos';
import {PhotoViewer} from "@ionic-native/photo-viewer";

@NgModule({
  declarations: [
    AlbumPhotosPage,
  ],
  imports: [
    IonicPageModule.forChild(AlbumPhotosPage),
  ],
    providers: [ PhotoViewer ]
})
export class AlbumPhotosPageModule {}
