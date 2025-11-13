import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { RolesGuard } from 'src/modules/auth/guard/roles.guard';
import { Role } from '../enums/role.enum';

export function Authorization() {
  return applyDecorators(ApiBearerAuth('Authorization'), UseGuards(AuthGuard));
}

export function AuthWithRole(...roles: Role[]) {
  return applyDecorators(Authorization(), UseGuards(RolesGuard), Roles(...roles));
}

export function Admin() {
  return applyDecorators(AuthWithRole(Role.Admin));
}
