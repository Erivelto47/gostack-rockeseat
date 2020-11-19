/**
 * Created by erivelto on 14/11/20
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('time with time zone')
  date: Date;

}

export default Appointment;
