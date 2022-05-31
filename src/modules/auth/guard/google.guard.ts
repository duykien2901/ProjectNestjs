import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
class GoogleGuard extends AuthGuard('google') {}

export default GoogleGuard;
