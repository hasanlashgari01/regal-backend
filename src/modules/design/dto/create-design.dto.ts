import { ApiProperty } from '@nestjs/swagger';

export class CreateDesignDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  enName: string;
}
