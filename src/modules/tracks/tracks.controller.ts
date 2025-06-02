import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  ParseUUIDPipe,
  Put,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiBody,
} from '@nestjs/swagger';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { BaseTrackDto } from './dto/base-track.dto';

@ApiTags('Track')
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @ApiOperation({ summary: 'Create track' })
  @ApiBody({ type: CreateTrackDto })
  @ApiResponse({
    status: 201,
    description: 'The track has been created',
    type: BaseTrackDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Body does not contain required fields',
  })
  create(@Body(ValidationPipe) createTrackDto: CreateTrackDto): BaseTrackDto {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({
    status: 200,
    description: 'The list of tracks',
    type: [BaseTrackDto],
  })
  findAll(): BaseTrackDto[] {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single track by id' })
  @ApiParam({ name: 'id', description: 'Track ID', format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'The track',
    type: BaseTrackDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string): BaseTrackDto {
    const track = this.tracksService.findOne(id);

    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    return track;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update track' })
  @ApiParam({ name: 'id', description: 'Track ID', format: 'uuid' })
  @ApiBody({ type: CreateTrackDto })
  @ApiResponse({
    status: 200,
    description: 'The track has been updated',
    type: BaseTrackDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateTrackDto: UpdateTrackDto,
  ): BaseTrackDto {
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete track' })
  @ApiParam({ name: 'id', description: 'Track ID', format: 'uuid' })
  @ApiResponse({ status: 204, description: 'The track has been deleted' })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tracksService.remove(id);
  }
}
