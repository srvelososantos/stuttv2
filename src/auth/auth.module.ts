import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      global: true,
      secret: 'teste', // idealmente use process.env.JWT_SECRET
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, AuthGuard],
  controllers: [AuthController, ],
  exports: [ AuthGuard, AuthService ]
})
export class AuthModule {}
