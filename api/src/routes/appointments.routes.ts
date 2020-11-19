import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import { getCustomRepository } from 'typeorm';

const appointmentsRouter = Router();

appointmentsRouter.get('/', (async (req, res) => {
  const appointmentRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentRepository.find();

  return res.json(appointments);
}))

appointmentsRouter.post('/', async (req, res) => {

  try {
    const { provider, date } = req.body;
    const parseDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();

    const appointment = await createAppointmentService.execute({provider, date: parseDate});

    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message})
  }

});

export default appointmentsRouter;
