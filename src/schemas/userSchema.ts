import joi from 'joi';
import { CreateUserData } from '../interfaces/userInterfaces.js';

type CreateUserDataSignin = Omit<CreateUserData, "name" | "confirmPassword">;

export const signupSchema = joi.object<CreateUserData>({
  name: joi.string().max(20).required(),
  email: joi.string().email().required(),
  password: joi.string().min(4).pattern(new RegExp("^[a-zA-Z0-9]{10,}$")).required(),
  confirmPassword: joi.ref('password'),
});

export const signinSchema = joi.object<CreateUserDataSignin>({
  email: joi.string().email().required(),
  password: joi.string().required(),

})