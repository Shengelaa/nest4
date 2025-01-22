import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { IsAdmin, IsEditor, IsViewer } from 'src/guards/role.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Admin and Editor can create a post
  @Post()
  @UseGuards(IsEditor)
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  // Admin, Editor, and Viewer can read posts
  @Get()
  @UseGuards(IsViewer)
  findAll() {
    return this.postsService.findAll();
  }

  // Admin, Editor, and Viewer can view a specific post
  @Get(':id')
  @UseGuards(IsViewer)
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  // Admin and Editor can update a post
  @Patch(':id')
  @UseGuards(IsEditor)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  // Only Admin can delete a post
  @Delete(':id')
  @UseGuards(IsAdmin)
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
