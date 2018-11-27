import {Injectable} from "@angular/core";
import {ToastController} from "ionic-angular";

@Injectable()
export class CommonService {

    constructor(private toastController: ToastController) {

    }

    toastMessage(message: string, duration = 3000, position = 'top') {
        this.toastController.create({
            message: message,
            duration: duration,
            position: position
        }).present();
    }

}
