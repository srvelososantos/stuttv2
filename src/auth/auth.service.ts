import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {

    constructor( private usersService: UserService, private readonly jwtService: JwtService ) {  }

    async validateUser(mail: string, password: string) {
    const user = await this.usersService.findOne(mail)
    if (!user) throw new UnauthorizedException('Usuário não encontrado');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Senha inválida');

    const { password: _, ...result } = user; // remove a senha da resposta
    return result; //verificar pra enviar como tipo User
  }

  async login(user: any) {
    const payload = { username: user.name, id: user.id, email: user.email, type: user.type };
    return { access_token: this.jwtService.sign(payload) };
  }
}
