import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { distinctUntilChanged, concatMap } from 'rxjs/operators';

@Injectable()
export class LoaderService {


  private loadingRequestsStream$: Subject<boolean>;

  private loaderElement: HTMLIonLoadingElement;

  constructor(private loadingCtrl: LoadingController) {
    this.initValues();
  };

  private initValues() {
    this.loaderElement = null;
    this.loadingRequestsStream$ = new Subject();
    this.loadingRequestsStream$.pipe(
      distinctUntilChanged(),
      concatMap(loader => {
        if (loader) {
          return this.createLoader()
        } else {
          return this.dismissLoader()
        };
      })
    ).subscribe();
  };

  public show() {
    this.loadingRequestsStream$.next(true);
  };

  public hide() {
    this.loadingRequestsStream$.next(false);
  };

  public async createLoader() {
    this.loaderElement = await this.loadingCtrl.create({
      message: "Carregando...",
      spinner: "crescent"
    });
    return this.loaderElement.present();
  };

  public dismissLoader() {
    if (this.loaderElement) {
      return this.loaderElement.dismiss();
    };
  };

}
