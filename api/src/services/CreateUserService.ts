/**
 * Created by erivelto on 19/11/20
 */
import { getRepository } from 'typeorm';
import User from '../models/User';
import AppError from '../errors/AppError';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: { email }
    });

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const user = userRepository.create({
      name,
      email,
      password
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
