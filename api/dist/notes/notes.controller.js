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
exports.NotesController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const notes_service_1 = require("./notes.service");
let NotesController = class NotesController {
    notesService;
    authService;
    constructor(notesService, authService) {
        this.notesService = notesService;
        this.authService = authService;
    }
    async createNote(body, request) {
        const token = request.cookies?.['auth-token'];
        if (!token) {
            return null;
        }
        const user = await this.authService.verifyTokenAndGetUser(token);
        if (!user) {
            return null;
        }
        const { email, username } = user;
        const { title, content } = body;
        return this.notesService.createNotePostgres(email, username, title, content);
    }
    async createNoteMongoDB(body, request) {
        const token = request.cookies?.['auth-token'];
        if (!token) {
            return null;
        }
        const user = await this.authService.verifyTokenAndGetUser(token);
        if (!user) {
            return null;
        }
        const { email, username } = user;
        const { title, content } = body;
        return this.notesService.createNoteMongoDB(email, username, title, content);
    }
    async getAllNotes(request) {
        const token = request.cookies?.['auth-token'];
        if (!token) {
            return null;
        }
        const user = await this.authService.verifyTokenAndGetUser(token);
        if (!user) {
            return null;
        }
        const { email } = user;
        return this.notesService.getAllNotes(email);
    }
    async getNoteById(id, request) {
        const token = request.cookies?.['auth-token'];
        if (!token) {
            return null;
        }
        const user = await this.authService.verifyTokenAndGetUser(token);
        if (!user) {
            return null;
        }
        const { email } = user;
        return this.notesService.getNoteById(id, email);
    }
};
exports.NotesController = NotesController;
__decorate([
    (0, common_1.Post)('create/postgres'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "createNote", null);
__decorate([
    (0, common_1.Post)('create/mongodb'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "createNoteMongoDB", null);
__decorate([
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "getAllNotes", null);
__decorate([
    (0, common_1.Get)('note/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "getNoteById", null);
exports.NotesController = NotesController = __decorate([
    (0, common_1.Controller)('notes'),
    __metadata("design:paramtypes", [notes_service_1.NotesService,
        auth_service_1.AuthService])
], NotesController);
//# sourceMappingURL=notes.controller.js.map