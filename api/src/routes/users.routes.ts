/**
 * Created by erivelto on 19/11/20
 */
import { Router } from 'express';
import { hash } from 'bcryptjs';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {

  try {
    const { name, email, password } = req.body;

    const createUserService = new CreateUserService();

    const hasPassword = await hash(password, 8);

    const user = await createUserService.execute({
      name,
      email,
      password: hasPassword
    });

    // @ts-ignore
    delete user.password;

    return res.send(user);
  } catch (err) {

    res.status(400).json({ error: err.message})
  }
});

usersRouter.patch('/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {

  return res.json({ ok : true });
})

export default usersRouter;

