import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { CreateUserData } from '../interfaces/userInterfaces.js';

type CreateUserDataLogin = Omit<CreateUserData, "name" | "confirmPassword">;

import * as userRepository from '../repositories/userRepository.js';
import { encrypt } from '../utils/encryptDataUser.js';


import { 
  conflictError,
  notFoundError,
  unautorizedError,
 } from '../utils/errorHandlerUtils.js';

 export async function registerUser({ name, email, password, confirmPassword }: CreateUserData){
  const userExists = await userRepository.findByEmail(email);

  if(userExists) {
    throw conflictError("This e-mail is already registered!");
  }

  const hashPassword = encrypt.bcrypt.encryptPassword(password);
  const hashConfirmPassword = encrypt.bcrypt.encryptPassword(confirmPassword);
  const createdUser = await userRepository.register({
    name,
    email,
    password: hashPassword,
    confirmPassword: hashConfirmPassword,
  });

  return createdUser;
};

export async function loginUser({ email, password }: CreateUserDataLogin){
  const foundUser = await userRepository.findByEmail(email);

  const JWT_TOKEN = process.env.JWT_TOKEN;

  const passwordCompatible = encrypt.bcrypt.decryptPasswordAndCompare(
    password,
    foundUser?.password,
  );

  if(!foundUser || !passwordCompatible) {
    throw unautorizedError("Wrong e-mail or password!");
  };

  const token = jwt.sign({ email: foundUser.email }, JWT_TOKEN);

  return token;
};

export async function findByEmail(email: string){
  const foundUser = await userRepository.findByEmail(email);

  if(!foundUser) {
    throw notFoundError("user not found!");
  }

  return foundUser;

}








