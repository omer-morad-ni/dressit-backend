import { BodyParams, Req } from '@tsed/common';
import { Forbidden } from '@tsed/exceptions';
import { OnVerify, Protocol } from '@tsed/passport';
import { Strategy } from 'passport-local';
import { UserCreation } from '../models/user-creation';
import { UserRepository } from '../repositories/UserRepository';

@Protocol({
  name: 'signup',
  useStrategy: Strategy,
  settings: {
    usernameField: 'email',
    passwordField: 'password',
  },
})
export class SignupLocalProtocol implements OnVerify {
  constructor(private userRepository: UserRepository) {}

  async $onVerify(@Req() request: Req, @BodyParams() user: UserCreation) {
    const { email } = user;
    const found = await this.userRepository.findOne({ email });

    if (found) {
      throw new Forbidden('Email is already registered');
    }

    return this.userRepository.create(user);
  }
}
