import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notes, NotesType } from '../models/notes.model'; // Ensure the correct import path
import { notesDTO } from '../DTO/notes.dto';
import slugify from 'slugify';
import { NotFoundError, retry } from 'rxjs';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Notes.name) private NotesModel: Model<NotesType>) {}


  async getAllNotes(){
    const allNotes = await this.NotesModel.find({})

    return {
        notes:allNotes,
        tota:allNotes.length
    }
  }

  async createNote(data: notesDTO) {
    const { content, short_desc, title } = data;
    const slug = slugify(title + ' ' + new Date().getTime(), {
      lower: true,
      replacement: '-',
      trim: true,
    });

    await this.NotesModel.create({
      slug,
      content,
      short_desc,
      title,
    });

    return 'Note is created';
  }

  async deleteNote(id:string){
    const data = await this.NotesModel.findByIdAndDelete(id)

    if(!data){
      throw new NotFoundException('note not found')
    }

    return 'note is deleted'
  }

  async publishNote(id:string){
    const data = await this.NotesModel.findById(id)

    if(!data){
      throw new NotFoundException('note note found')
    }

    if(data?.isPublish){
      await this.NotesModel.findByIdAndUpdate(id,{
        isPublish:false
      })
    return 'note is un-published'
    }
    else{
      await this.NotesModel.findByIdAndUpdate(id,{
        isPublish:true
      })
      return 'note is published'
    }
  }

  async updateNote(id:string,data:notesDTO){
    const note = await this.NotesModel.findById(id)

    if(!note){
      throw new NotFoundException('note not found')
    }

    await this.NotesModel.findByIdAndUpdate(id,data)

    return 'note is updated'
  }
}
