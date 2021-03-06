/**
 * Created by erivelto on 23/11/20
 */
import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (req, res) => {

  const { email, password } = req.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password
  })

  // @ts-ignore
  delete user.password;

  return res.status(200).send({ user, token });
});


export default sessionRouter;

