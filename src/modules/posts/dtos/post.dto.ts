import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  mode_hide: number;

  @ApiProperty()
  @IsString()
  mentions: string;

  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  owner_id: number;
}
