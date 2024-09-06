import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notes, NotesSchema } from 'src/models/notes.model';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Notes.name,
    schema: NotesSchema
  }])],
  controllers: [NotesController],
  providers: [NotesService]
})
export class NotesModule { }
