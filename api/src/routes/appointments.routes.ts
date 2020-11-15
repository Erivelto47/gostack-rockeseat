import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentsRepository();


appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parseDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentRepository.findByDate(parseDate)

  if (findAppointmentInSameDate) {
    return res
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = appointmentRepository.create(provider, parseDate);
  
  return res.json({appointment})
})

export default appointmentsRouter;
