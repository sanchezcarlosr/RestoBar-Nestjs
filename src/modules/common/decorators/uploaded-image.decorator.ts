import { Injectable, UploadedFile } from '@nestjs/common';
import { ImageValidationPipe } from '../pipes';

/**
 * We created a decorator to improve decoupling
 */
export function UploadedImage() {
  return UploadedFile(ImageValidationPipe);
}
