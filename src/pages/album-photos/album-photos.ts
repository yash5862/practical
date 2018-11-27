import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Album, Photo, UserService} from "../../services/user.service";
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {CommonService} from "../../services/common.service";

@IonicPage()
@Component({
    selector: 'page-album-photos',
    templateUrl: 'album-photos.html',
})
export class AlbumPhotosPage {

    album: Album;
    photos: Array<Photo>;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private photoViewer: PhotoViewer,
                private commonService: CommonService,
                private userService: UserService) {
        this.album = navParams.get('album');
        this.getAlbumPhotos();
    }

    getAlbumPhotos() {
        this.userService.getAlbumPhotos(this.album.id)
            .subscribe((res) => {
                this.photos = res;
            }, (err) => {
                this.commonService.toastMessage('Error Getting Album Photos');
            })
    }

    openImage(photo: Photo) {
        this.photoViewer.show(photo.url, photo.title);
    }

}
