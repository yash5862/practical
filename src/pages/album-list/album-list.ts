import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Album, User, UserService} from "../../services/user.service";
import {CommonService} from "../../services/common.service";

@IonicPage()
@Component({
    selector: 'page-album-list',
    templateUrl: 'album-list.html',
})
export class AlbumListPage {

    user: User;
    albums: Array<Album>;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private commonService: CommonService,
                private userService: UserService) {
        this.user = this.navParams.get('user');
        this.getUserAlbums();
    }

    getUserAlbums() {
        this.userService.getUsersAlbums(this.user.id)
            .subscribe((res: Array<Album>) => {
                this.albums = res;
            }, (err) => {
                this.commonService.toastMessage('Error Getting Albums');
            })
    }

    goToAlbumDetail(album) {
        this.navCtrl.push('AlbumPhotosPage', { album: album });
    }
}
