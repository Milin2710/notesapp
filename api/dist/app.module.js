"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./auth/user.entity");
const auth_module_1 = require("./auth/auth.module");
const notes_module_1 = require("./notes/notes.module");
const notes_entity_1 = require("./notes/notes.entity");
const mongoose_1 = require("@nestjs/mongoose");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'milin',
                database: 'notesapp',
                entities: [user_entity_1.User, notes_entity_1.NoteEntity],
                synchronize: true,
            }),
            mongoose_1.MongooseModule.forRoot('mongodb://localhost:27017/notesapp'),
            auth_module_1.AuthModule,
            notes_module_1.NotesModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map