import { NoteEntity } from './notes.entity';
import { Repository } from 'typeorm';
import { Model } from 'mongoose';
import { NoteMongoDocument } from './notes.schema';
export declare class NotesService {
    private readonly notesRepository;
    private readonly notesMongoDBRepository;
    constructor(notesRepository: Repository<NoteEntity>, notesMongoDBRepository: Model<NoteMongoDocument>);
    createNotePostgres(email: string, username: string, title: string, content: string): Promise<NoteEntity>;
    createNoteMongoDB(email: string, username: string, title: string, content: string): Promise<NoteMongoDocument>;
    getAllNotes(email: string): Promise<any[]>;
    getNoteById(id: string, email: string): Promise<NoteEntity | null>;
}
