import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostDto {
  @IsNumber()
  category: number;

  @IsString()
  title: string;

  @IsString()
  images: string;

  @IsNumber()
  views: number;

  @IsString()
  content: string;

  @IsNumber()
  mode_hide: number;

  @IsString()
  mentions: string;

  @IsNumber()
  @IsNotEmpty()
  owner_id: number;
}
