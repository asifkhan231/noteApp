import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesController } from './notes/notes.controller';
import { NotesModule } from './notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesService } from './notes/notes.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/noteBook',) ,
    NotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
