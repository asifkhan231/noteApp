import { IsEmpty, IsMongoId } from "class-validator";

export class notesDTO{
@IsEmpty({message:"title is required"})
    title:String

    @IsEmpty({message:"slug is required"})
    slug:String

    @IsEmpty({message:"content is required"})
    content:String

    @IsEmpty({message:"short_desc is required"})
    short_desc:String

}

export class noteId{

    @IsMongoId({message:'Please provide valid mongodb id'})
    @IsEmpty({message:"note is empty"})
    id:string
}