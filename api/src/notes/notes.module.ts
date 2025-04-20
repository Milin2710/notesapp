import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { NoteEntity } from './notes.entity';
import { NoteMongo, NoteSchema } from './notes.schema';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NoteEntity, User]),
    MongooseModule.forFeature([{ name: NoteMongo.name, schema: NoteSchema }]),
    AuthModule,
  ],
  providers: [NotesService, AuthService],
  controllers: [NotesController],
})
export class NotesModule {}
