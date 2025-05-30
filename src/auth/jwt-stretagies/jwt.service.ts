import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy  extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
      const secret = configService.get<string>('JWT_SECRET');
        console.log('JWT_SECRET:', secret);
    if (!secret) {
      throw new Error('JWT_SECRET environment variable is not set');
    }
    super({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: secret,
});

  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username, role: payload.role };
  }
}