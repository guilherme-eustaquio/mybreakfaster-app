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

    public static async rateAlert(callback) {

      const alert = await AlertDefault.alertController.create({
          header: 'Avaliação',
          subHeader: "",
          message: "Avalie o estabelecimento de 0 a 5",
          inputs: [{
            name: 'rate',
            type: 'number',
            min: 0,
            max: 5
          }],
          buttons: [{
            text: 'Avaliar',
            handler: (alertData) => {
              callback(alertData.rate);
            }
          }],
          backdropDismiss: false
      });
    
      await alert.present();
    } 

    public static async obrigatoryRegister(message, callback) {

      const alert = await AlertDefault.alertController.create({
          header: 'Alerta',
          subHeader: "",
          message: message,
          buttons: [{
            text: 'OK',
            handler: () => {
              callback();
            }
          }],
          backdropDismiss: false
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

    public static async indentifyPlace(yes, no) {

      const alert = await this.alertController.create({
          header: 'Alerta',
          message: "Você está no restaurante?",
          buttons: [
            {
              text: 'Sim',
              handler: () => {
                yes();
              }
            }, 
            {
              text: 'não',
              handler: () => {
                no();
              }
            },
            {
              text: 'Cancelar'
            }
          ]
      });
    
      await alert.present();
    }

    public static async getPaymentType(type, callback) {

      const alert = await this.alertController.create({
          header: 'Alerta',
          message: "Selecione o tipo de pagamento",
          buttons: [
            {
              text: 'Cancelar',
              handler: () => {
              }
            },
            {
              text: 'Cartão',
              handler: () => {
                type = "CARD";
                callback(type);
              }
            }, 
            {
              text: 'Dinheiro',
              handler: () => {
                type = "MONEY";
                callback(type);
              }
            }
          ]
      });
    
      await alert.present();
    }

}