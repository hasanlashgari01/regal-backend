import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MaterialService } from './material.service';
import { ApiConsumes } from '@nestjs/swagger';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialService.create(createMaterialDto);
  }

  @Get()
  findAll() {
    return this.materialService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.materialService.findOneById(+id);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  update(@Param('id') id: string, @Body() updateMaterialDto: UpdateMaterialDto) {
    return this.materialService.update(+id, updateMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialService.remove(+id);
  }
}
