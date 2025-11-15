import { FileTypeValidator, MaxFileSizeValidator, ParseFilePipe } from '@nestjs/common';

export const ImageValidation = new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
    new FileTypeValidator({ fileType: 'image/(png|jpg|jpeg|webp)' }),
  ],
});

export const ImageOptionalValidation = new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
    new FileTypeValidator({ fileType: 'image/(png|jpg|jpeg|webp)' }),
  ],
  fileIsRequired: false,
});
