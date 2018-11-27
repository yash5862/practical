import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserService, User} from '../../services/user.service';
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {CommonService} from "../../services/common.service";

@IonicPage()
@Component({
    selector: 'page-user-list',
    templateUrl: 'user-list.html',
})
export class UserListPage {

    users: Array<User> = [];
    filteredUsers: Array<User> = [];
    searchBar: FormControl = new FormControl();

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private commonService: CommonService,
                private userService: UserService) {

    }

    ionViewWillLoad() {
        this.getListOfUsers();
        this.subscriptions();
    }

    subscriptions() {
        this.searchBar.valueChanges.pipe(
            debounceTime(400),
            distinctUntilChanged()
        ).subscribe((value) => {
            if (!value) {
                this.filteredUsers = this.users;
            } else {
                this.filteredUsers = this.users.filter((user) => user.name.toUpperCase().includes((value).toUpperCase()))
            }
        });
    }

    getListOfUsers() {
        this.userService.getUsersList()
            .subscribe((res: Array<User>) => {
                this.users = res;
                this.filteredUsers = res;
            }, (err) => {
                this.commonService.toastMessage('Error Getting Users');
            });
    }

    goToAlbumList(user: User) {
        this.navCtrl.push('AlbumListPage', { user: user });
    }

}
