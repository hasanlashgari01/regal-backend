import { ApiProperty } from '@nestjs/swagger';

export class CreateMaterialDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;
}
