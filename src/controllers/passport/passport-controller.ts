import { Controller, Get, Post, Req, Status } from '@tsed/common';
import { Authenticate, Authorize } from '@tsed/passport';
import { Responses, Returns } from '@tsed/swagger';
import { User } from '../../entities/user';

@Controller('/auth')
export class PassportController {
  @Post('/login')
  @Authenticate('login', { failWithError: false })
  @Returns(User)
  @Responses(400, { description: 'Validation error' })
  login(@Req() req: Req) {
    // FACADE
    return req.user;
  }

  @Post('/signup')
  @Status(201)
  @Authenticate('signup')
  @Returns(User)
  signup(@Req() req: Req) {
    // FACADE
    return req.user;
  }

  @Get('/userinfo')
  @Authenticate('basic', { security: ['auth:basic'] })
  @Returns(User)
  getUserInfo(@Req() req: Req): any {
    // FACADE
    return req.user;
  }

  @Get('/logout')
  logout(@Req() req: Req) {
    req.logout();
  }

  @Get('/connect/:protocol')
  @Authorize(':protocol')
  @Returns(User)
  connectProtocol(@Req() req: Req): any {
    // FACADE
    return req.user;
  }

  @Get('/connect/:protocol/callback')
  @Authorize(':protocol')
  @Returns(User)
  connectProtocolCallback(@Req() req: Req): any {
    // FACADE
    return req.user;
  }
}
