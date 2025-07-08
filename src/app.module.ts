import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ 
    UserModule,
    BookModule,
    ConfigModule.forRoot({ isGlobal: true }), 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      database: 'stutt',
      username: 'postgres',
      password: 'postgres',
      synchronize: true,
      autoLoadEntities: true,
      logging: false,
      migrations: [__dirname + 'database/migrations/*{.js,.ts}'],
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
