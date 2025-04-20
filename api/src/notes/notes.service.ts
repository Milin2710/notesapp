import { NoteEntity } from './notes.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NoteMongo, NoteMongoDocument } from './notes.schema';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly notesRepository: Repository<NoteEntity>,
    @InjectModel(NoteMongo.name)
    private readonly notesMongoDBRepository: Model<NoteMongoDocument>,
  ) {}
  async createNotePostgres(
    email: string,
    username: string,
    title: string,
    content: string,
  ): Promise<NoteEntity> {
    const note = this.notesRepository.create({
      email,
      username,
      title,
      content,
    });
    return this.notesRepository.save(note);
  }

  async createNoteMongoDB(
    email: string,
    username: string,
    title: string,
    content: string,
  ): Promise<NoteMongoDocument> {
    const note = new this.notesMongoDBRepository({
      email,
      username,
      title,
      content,
    });
    return note.save();
  }

  async getAllNotes(email: string): Promise<any[]> {
    const pgNotes = await this.notesRepository.find({
      where: { email },
      order: { created_at: 'DESC' },
    });

    const mongoNotes = await this.notesMongoDBRepository
      .find({ email })
      .sort({ createdAt: -1 });

    const pgNormalized = pgNotes.map((note) => ({
      id: note.id,
      email: note.email,
      username: note.username,
      title: note.title,
      content: note.content,
      source: 'postgres',
      created_at: note.created_at,
    }));

    const mongoNormalized = mongoNotes.map((note) => ({
      id: note._id,
      email: note.email,
      username: note.username,
      title: note.title,
      content: note.content,
      source: 'mongodb',
      created_at: note.created_at,
    }));

    const combinedNotes = [...pgNormalized, ...mongoNormalized];

    combinedNotes.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );

    return combinedNotes;
  }
  async getNoteById(id: string, email: string): Promise<NoteEntity | null> {
    const note = await this.notesRepository.findOne({
      where: { id, email },
    });
    return note || null;
  }
}
