import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSizeDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  enName: string;

  @ApiPropertyOptional()
  sort: number;
}
