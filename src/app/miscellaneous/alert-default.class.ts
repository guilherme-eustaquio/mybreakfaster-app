import { AlertController } from '@ionic/angular';

export class AlertDefault {

    private static alertController = new AlertController();

    public static async commonAlert(message) {

        const alert = await AlertDefault.alertController.create({
            header: "Alerta",
            subHeader: "",
            message: message,
            buttons: ['OK']
        });
      
        await alert.present();
    } 

    public static async confirmationAlert(message, confirm) {

        const alert = await this.alertController.create({
            header: 'Alerta',
            message: message,
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel'
              }, 
              {
                text: 'Sim',
                handler: () => {
                  confirm();
                }
              }
            ]
        });
      
        await alert.present();
    }

}