import { Role } from 'src/common/enums/role.enum';

export type TokenPayload = {
  sub: number;
  mobile: string;
  role: Role;
};
