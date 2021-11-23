import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import * as dotenv from 'dotenv';

dotenv.config();

const USER_CONTEXT: string = 'https://api.vouch.us/context/user';
const PARTNER_CONTEXT: string = 'azp';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                // Reads the public keys from Auth0 known keys set for the application.
                jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
            }),

            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            audience: process.env.AUTH0_AUDIENCE,
            issuer: `${process.env.AUTH0_ISSUER_URL}`,
        });
    }

    // Verifies and validates the payload.
    validate(payload: any): any {
        return {
            partnerKey: payload[PARTNER_CONTEXT],
            userInfo: payload[USER_CONTEXT],
        };
    }
}
