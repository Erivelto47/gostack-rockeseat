/**
 * Created by erivelto on 14/11/20
 */
import {uuid} from 'uuidv4';

class Appointment {
  id: string;
  provider: string;
  date: Date;

  constructor(provider: string, date: Date) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
