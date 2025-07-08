import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>

  ) { }

  async create(createUserDto: CreateUserDto) {
    try{
      const user = this.usersRepo.create({
        ...createUserDto
      });

      await this.usersRepo.save(user)
      return user;
    }catch(e){
      throw new HttpException('Nao foi possivel criar o usuario', HttpStatus.BAD_REQUEST)
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
