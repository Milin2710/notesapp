"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesService = void 0;
const notes_entity_1 = require("./notes.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const notes_schema_1 = require("./notes.schema");
let NotesService = class NotesService {
    notesRepository;
    notesMongoDBRepository;
    constructor(notesRepository, notesMongoDBRepository) {
        this.notesRepository = notesRepository;
        this.notesMongoDBRepository = notesMongoDBRepository;
    }
    async createNotePostgres(email, username, title, content) {
        const note = this.notesRepository.create({
            email,
            username,
            title,
            content,
        });
        return this.notesRepository.save(note);
    }
    async createNoteMongoDB(email, username, title, content) {
        const note = new this.notesMongoDBRepository({
            email,
            username,
            title,
            content,
        });
        return note.save();
    }
    async getAllNotes(email) {
        const pgNotes = await this.notesRepository.find({
            where: { email },
            order: { created_at: 'DESC' },
        });
        const mongoNotes = await this.notesMongoDBRepository
            .find({ email })
            .sort({ createdAt: -1 });
        console.log('Mongo Notes:', mongoNotes);
        console.log('Postgres Notes:', pgNotes);
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
        combinedNotes.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        return combinedNotes;
    }
    async getNoteById(id, email) {
        const note = await this.notesRepository.findOne({
            where: { id, email },
        });
        return note || null;
    }
};
exports.NotesService = NotesService;
exports.NotesService = NotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notes_entity_1.NoteEntity)),
    __param(1, (0, mongoose_1.InjectModel)(notes_schema_1.NoteMongo.name)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mongoose_2.Model])
], NotesService);
//# sourceMappingURL=notes.service.js.map