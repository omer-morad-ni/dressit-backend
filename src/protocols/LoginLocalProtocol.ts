import { BodyParams, Req } from '@tsed/common';
import { OnVerify, Protocol } from '@tsed/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { Credentials } from '../models/credentials';
import { UserRepository } from '../repositories/UserRepository';

@Protocol<IStrategyOptions>({
  name: 'login',
  useStrategy: Strategy,
  settings: {
    usernameField: 'email',
    passwordField: 'password',
  },
})
export class LoginLocalProtocol implements OnVerify {
  constructor(private userRepository: UserRepository) {}

  async $onVerify(@Req() request: Req, @BodyParams() credentials: Credentials) {
    const { email, password } = credentials;

    const user = await this.userRepository.findOne({ email });

    if (!user) {
      return false;
      // OR throw new NotAuthorized("Wrong credentials")
    }

    if (!user.verifyPassword(password)) {
      return false;
      // OR throw new NotAuthorized("Wrong credentials")
    }

    return user;
  }
}
