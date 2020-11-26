/**
 * Created by erivelto on 25/11/20
 */
import { getRepository } from 'typeorm';
import User from '../models/User';
import upload from '../config/upload';
import * as path from 'path';
import * as fs from 'fs';
import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  avatarFilename: string;
}
class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename}: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if(!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if(user.avatar) {

      const userAvatarFilePath = path.join(upload.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

      user.avatar = avatarFilename;

      await usersRepository.save(user);

      return user;
  }
}

export default UpdateUserAvatarService;
