/**
 * Created by erivelto on 19/11/20
 */
import { Router } from 'express';
import { hash } from 'bcryptjs';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {

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
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {

    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename
    });

    delete user?.password;

    return res.status(200).json(user);
})

export default usersRouter;

