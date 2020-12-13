import * as moment from 'moment';

export class DateFormatter {

  public static getFormattedDate(date : string) {
    return moment(date).format('DD/MM/YYYY HH:mm:ss');
  }

}