import {Component, ViewChild} from '@angular/core';
import {Platform, IonicApp, NavController, AlertController, Nav} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    @ViewChild('nav') nav: Nav;
    rootPage: any = 'UserListPage';

    constructor(private platform: Platform,
                statusBar: StatusBar,
                splashScreen: SplashScreen,
                private alertCtrl: AlertController,
                private ionicApp: IonicApp) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            this.registerBackEvent();
        });
    }

    registerBackEvent() {
        this.platform.registerBackButtonAction(() => {
            let activePortal = this.ionicApp._loadingPortal.getActive() ||
                this.ionicApp._modalPortal.getActive() ||
                this.ionicApp._toastPortal.getActive() ||
                this.ionicApp._overlayPortal.getActive();


            if (activePortal) {
                activePortal.dismiss();
                return;
            }

            let view = this.nav.getActive();
            let page = view ? this.nav.getActive().instance : null;
            if (this.nav.canGoBack() || view && view.isOverlay) {
                this.nav.pop();
            }
            else if (page) {
                const alert = this.alertCtrl.create({
                    title: 'Exit App',
                    message: 'Are you sure to want to exit ?',
                    buttons: [
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            handler: () => {
                            }
                        },
                        {
                            text: 'Yes, Exit.',
                            handler: () => {
                                this.platform.exitApp(); //Exit from app
                            }
                        }
                    ]
                });
                alert.present();
            }
        });
    }
}

