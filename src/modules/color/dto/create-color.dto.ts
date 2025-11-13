import { ApiProperty } from '@nestjs/swagger';

export class CreateColorDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  code: string;
}
