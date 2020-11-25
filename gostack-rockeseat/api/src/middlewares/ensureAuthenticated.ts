/**
 * Created by erivelto on 24/11/20
 */
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
  //validacao token jwt

  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new Error('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, auth.jwt.secret);

    const { sub } = decodedToken as TokenPayload;

    request.user = {
      id: sub,
    }
    next();
  } catch {
    throw new Error('Invalid JWT token')
  }


}
