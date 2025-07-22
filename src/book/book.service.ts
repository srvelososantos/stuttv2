import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BookService {
  
  constructor(
    @InjectRepository(Book)
    private readonly booksRepo: Repository<Book>,

    @InjectRepository(User)
    private readonly usersRepo: Repository<User>

  ){  }

  async createPdf(file: Express.Multer.File, req) {

    const usr = await this.usersRepo.findOne({where: { id: req.sub }})
    if(!usr) throw new HttpException('user not found', HttpStatus.NOT_FOUND)

    try{
      const pdf = await this.booksRepo.create({
        filename: file.originalname,
        data: file.buffer,
        title: file.originalname,
        author: 'Unknown',
        user: usr,
      })

      await this.booksRepo.save(pdf)
      return { message: 'Pdf salvo com sucesso', id: pdf.id }
    }catch(e){
      throw new HttpException('--'+file+e, HttpStatus.BAD_REQUEST)
    }
  }

  findAll(user: any) {
    //return this.booksRepo.find({where: {user: user.id}})
    return user
  }
  
  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
