import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { MODE_HIDE } from 'src/@core/enums/posts.enum';

export class PostDto {
  @IsNumber()
  @ApiProperty()
  category: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  images: string;

  @ApiProperty()
  @IsNumber()
  views: number;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsNumber()
  mode_hide: MODE_HIDE;

  @ApiProperty()
  @IsString()
  mentions: string;

  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  ownerId: number;
}
