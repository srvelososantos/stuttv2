import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import * as jwt from 'jsonwebtoken';

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
    const payload = { username: user.name, sub: user.id, email: user.email, type: user.type };
    return { access_token: this.jwtService.sign(payload) };
  }

  async me(token: string){
    const secret = 'teste';

    try {
      // decodifica e valida a assinatura
      const payload = jwt.verify(token, secret);
      return payload;
      // exemplo: { sub: '123', email: 'teste@exemplo.com', iat: 1692871, exp: 1692981 }
    } catch (err) {
      console.error('Token inválido ou expirado', err);
    }
  }
}
