import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req, UseGuards, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { S3Service } from 'src/s3/s3.service';

@UseGuards(AuthGuard)
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService, private readonly s3Service: S3Service) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File, @Req() req: any) {
    return this.bookService.createPdf(file, req.user)
  }

  @Get('mybooks')
  findAll(@Req() req: any) {
    return this.bookService.findAll(req.user);
    
  }

  @Get('read')
  async findOne(@Query('key') key: string) {
    if (!key) {
      return { error: 'Missing key' };
    }

    const url = await this.s3Service.getSignedUrl(key);
    return { url };
  }
  
  @Patch(':id')
  update(@Param('id') id: string) {
    return this.bookService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
