import { Body, Controller, Post,Get, Inject, Delete, Param, Put, Patch } from '@nestjs/common';
import { noteId, notesDTO } from 'src/DTO/notes.dto';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
    constructor(private noteService: NotesService){}

    @Post('/create')
    async createNote(@Body() data:notesDTO ){
        console.log(data)
       return this.noteService.createNote(data)
    }

    @Get('/getNotes')
    async getNotes(){
       return this.noteService.getAllNotes()
    }

    @Delete('/delete/:id')
    async deleteNote(@Param() data:noteId){
        return this.noteService.deleteNote(data.id)
    }

    @Put('/publish/:id')
    async publishNote(@Param() data:noteId){
        return this.noteService.publishNote(data.id)
    }

    @Patch('/update/:id')
    async updateNote(@Param() param:noteId, @Body() data:notesDTO){
return this.noteService.updateNote(param.id,data)
    }
}
