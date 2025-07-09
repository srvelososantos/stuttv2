import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>

  ) { }

  async create(createUserDto: CreateUserDto) {

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    try{
      const user = this.usersRepo.create({
        ...createUserDto,
        password: hashedPassword
      });

      await this.usersRepo.save(user)
      return user;
    }catch(e){
      throw new HttpException('Nao foi possivel criar o usuario: ' + e, HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(mail: string){
    return await this.usersRepo.findOne({ where: { email: mail } })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
