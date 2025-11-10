import { TokenPayload } from 'src/modules/auth/types/token-payload.type';

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}
