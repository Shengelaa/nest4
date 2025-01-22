import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  private posts = [
    {
      id: 1,
      title: 'post 1',
      content: 'content 1',
    },
    {
      id: 2,
      title: 'post 2',
      content: 'content 2',
    },
    {
      id: 3,
      title: 'post 3',
      content: 'content 3',
    },
    {
      id: 4,
      title: 'post 4',
      content: 'content 4',
    },
    {
      id: 5,
      title: 'post 5',
      content: 'content 5',
    },
  ];
  create(createPostDto: CreatePostDto) {
    const { content, title } = createPostDto;
    const lastId = this.posts[this.posts.length - 1]?.id || 0;
    const newPost = {
      id: lastId + 1,
      content,
      title,
    };
    this.posts.push(newPost);
    return newPost;
  }

  findAll() {
    return this.posts;
  }

  findOne(id: number) {
    const post = this.posts.find((el) => el.id === id);
    if (!post) throw new NotFoundException('post not found');
    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    const index = this.posts.findIndex((el) => el.id === id);
    if (index === -1) throw new BadRequestException('post could not delete');
    const { content, title } = updatePostDto;
    const updateRequest: { content?: string; title?: string } = {};
    if (content) updateRequest.content = content;
    if (title) updateRequest.title = title;

    this.posts[index] = {
      ...this.posts[index],
      ...updateRequest,
    };
    return this.posts[index];
  }

  remove(id: number) {
    const index = this.posts.findIndex((el) => el.id === id);
    if (index === -1) throw new BadRequestException('post could not delete');
    const deletedPost = this.posts.splice(index, 1);
    return deletedPost;
  }
}
