import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {

  constructor(
    @InjectRepository(Book)
    private readonly booksRepo: Repository<Book>
  ){  }

  async createPdf(file: Express.Multer.File) {
    const pdf = this.booksRepo.create({
      filename: file.originalname,
      data: file.buffer,
      title: file.filename,
      author: 'Unknown'
    })

    await this.booksRepo.save(pdf)
    return { message: 'Pdf salvo com sucesso', id: pdf.id }
  }

  findAll(user: any) {
    //return this.booksRepo.find({where: {user: user.id}})
    return user
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
