import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/user.entity';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';
import { NoteEntity } from './notes/notes.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, NoteEntity],
      synchronize: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    NotesModule,
  ],
})
export class AppModule {}
