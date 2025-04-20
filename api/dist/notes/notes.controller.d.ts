import { Request as ExpressRequest } from 'express';
import { AuthService } from '../auth/auth.service';
import { NotesService } from './notes.service';
export declare class NotesController {
    private readonly notesService;
    private readonly authService;
    constructor(notesService: NotesService, authService: AuthService);
    createNote(body: {
        title: string;
        content: string;
    }, request: ExpressRequest): Promise<import("./notes.entity").NoteEntity | null>;
    createNoteMongoDB(body: {
        title: string;
        content: string;
    }, request: ExpressRequest): Promise<import("./notes.schema").NoteMongoDocument | null>;
    getAllNotes(request: ExpressRequest): Promise<any[] | null>;
    getNoteById(id: string, request: ExpressRequest): Promise<import("./notes.entity").NoteEntity | null>;
}
