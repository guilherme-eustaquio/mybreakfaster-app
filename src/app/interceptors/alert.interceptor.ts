import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry, tap } from "rxjs/operators";
import { AlertController } from '@ionic/angular';

@Injectable()
export class AlertInterceptor implements HttpInterceptor {
    
    constructor(private alertController : AlertController){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          this.presentAlert({
            header: `Erro (${error.status})`,
            subheader: "",
            message: this.handleExceptionMessage(error.error)
          });
          return throwError(error);
        })
      );
    }
    
    private handleExceptionMessage(messages) : string {

        console.log(messages);

        if(Array.isArray(messages)) {
    
          let messageHandle = "";
    
          messages.forEach(message => {
            messageHandle += message.message + "<br>";
          });
    
          return messageHandle;
    
        } else {
          return messages.message;
        }
    }
    private async presentAlert(message : any) {
        const alert = await this.alertController.create({
          header: message.header,
          subHeader: message.subHeader,
          message: message.message,
          buttons: ['OK']
        });
    
        await alert.present();
    }
}