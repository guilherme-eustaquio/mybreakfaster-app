import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoaderService {

  constructor(public loadingController : LoadingController) {}

  async show() {
    const loading = await this.loadingController.create({
      message: "Aguarde...",
      spinner: "circular",
    });
    await loading.present();
  }

  async hide() {
    this.loadingController.dismiss();
  }

}
