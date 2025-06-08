import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AlbumsService } from './albums.service';
import { BaseAlbumDto } from './dto/base-album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@ApiTags('Album')
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @ApiOperation({ summary: 'Create album' })
  @ApiBody({ type: CreateAlbumDto })
  @ApiResponse({
    status: 201,
    description: 'The album has been created',
    type: BaseAlbumDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Body does not contain required fields',
  })
  create(@Body(ValidationPipe) createAlbumDto: CreateAlbumDto): BaseAlbumDto {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({
    status: 200,
    description: 'The list of albums',
    type: [BaseAlbumDto],
  })
  findAll(): BaseAlbumDto[] {
    return this.albumsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single album by id' })
  @ApiParam({ name: 'id', description: 'Album ID', format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'The album',
    type: BaseAlbumDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string): BaseAlbumDto {
    const album = this.albumsService.findOne(id);

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return album;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update album' })
  @ApiParam({ name: 'id', description: 'Album ID', format: 'uuid' })
  @ApiBody({ type: CreateAlbumDto })
  @ApiResponse({
    status: 200,
    description: 'The album has been updated',
    type: BaseAlbumDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateAlbumDto: UpdateAlbumDto,
  ): BaseAlbumDto {
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete album' })
  @ApiParam({ name: 'id', description: 'Album ID', format: 'uuid' })
  @ApiResponse({ status: 204, description: 'The album has been deleted' })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album not found' })
  remove(@Param('id', ParseUUIDPipe) id: string): void {
    this.albumsService.remove(id);
  }
}
