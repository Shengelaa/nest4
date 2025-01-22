import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 20)
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
