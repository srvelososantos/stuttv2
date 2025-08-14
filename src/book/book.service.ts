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

  async createPdf(file: Express.Multer.File, req: any) {
    console.log(req.sub)
    const usr = await this.usersRepo.findOne({where: { id: req.sub }})
    
    if(!usr) throw new HttpException('user not found', HttpStatus.NOT_FOUND)

    try{
      const pdf = await this.booksRepo.create({
        filename: file.originalname,
        data: file.buffer,
        title: file.originalname,
        author: 'Unknown',
        user: usr,
        progress: 0,
      })

      await this.booksRepo.save(pdf)
      return { message: 'Pdf salvo com sucesso', id: pdf.id }
    }catch(e){
      throw new HttpException('--'+file+e, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(user: any) {
    console.log(user.sub)

    return await this.booksRepo.find({
      where: {user: { id: user.sub }}, 
      select: {
        id: true,
        title: true,
        author: true,
        voice: true,
        uploadedAt: true,
        filename: true,
        progress: true,
        user: true,
      } 
    })
  }
  
  async findOne(id: number) {
    return await this.booksRepo.findOne({where: { id: id }})
  }

  update(id: number) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
