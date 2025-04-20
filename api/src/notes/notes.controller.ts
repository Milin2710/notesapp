import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { Response, Request as ExpressRequest } from 'express';
import { AuthService } from '../auth/auth.service';
import { NotesService } from './notes.service';
import { UnauthorizedException } from '@nestjs/common';

@Controller('notes')
export class NotesController {
  constructor(
    private readonly notesService: NotesService,
    private readonly authService: AuthService,
  ) {}

  @Post('create/postgres')
  async createNote(
    @Body() body: { title: string; content: string },
    @Req() request: ExpressRequest,
  ) {
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
    return this.notesService.createNotePostgres(
      email,
      username,
      title,
      content,
    );
  }

  @Post('create/mongodb')
  async createNoteMongoDB(
    @Body() body: { title: string; content: string },
    @Req() request: ExpressRequest,
  ) {
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

  @Get('all')
  async getAllNotes(@Req() request: ExpressRequest) {
    const token = request.cookies?.['auth-token'];
    if (!token) {
      throw new UnauthorizedException('No auth token');
    }
    const user = await this.authService.verifyTokenAndGetUser(token);
    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }
    const { email } = user;
    return this.notesService.getAllNotes(email);
  }

  @Get('note/:id')
  async getNoteById(@Param('id') id: string, @Req() request: ExpressRequest) {
    const token = request.cookies?.['auth-token'];
    if (!token) {
      throw new UnauthorizedException('No auth token');
    }
    const user = await this.authService.verifyTokenAndGetUser(token);
    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }
    const { email } = user;
    return this.notesService.getNoteById(id, email);
  }
}
