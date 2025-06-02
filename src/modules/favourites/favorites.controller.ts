import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { FavoritesResponseDto } from './dto/favorites-response.dto';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({
    status: 200,
    description: 'The list of favorites',
    type: FavoritesResponseDto,
  })
  findAll(): FavoritesResponseDto {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  @ApiOperation({ summary: 'Add track to favorites' })
  @ApiParam({ name: 'id', description: 'Track ID', format: 'uuid' })
  @ApiResponse({ status: 201, description: 'Track added to favorites' })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({ description: 'Track not found' })
  addTrack(@Param('id', ParseUUIDPipe) id: string): string {
    return this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete track from favorites' })
  @ApiParam({ name: 'id', description: 'Track ID', format: 'uuid' })
  @ApiResponse({ status: 204, description: 'Track removed from favorites' })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track not found in favorites' })
  removeTrack(@Param('id', ParseUUIDPipe) id: string): void {
    return this.favoritesService.removeTrack(id);
  }

  @Post('album/:id')
  @ApiOperation({ summary: 'Add album to favorites' })
  @ApiParam({ name: 'id', description: 'Album ID', format: 'uuid' })
  @ApiResponse({ status: 201, description: 'Album added to favorites' })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({ description: 'Album not found' })
  addAlbum(@Param('id', ParseUUIDPipe) id: string): string {
    return this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete album from favorites' })
  @ApiParam({ name: 'id', description: 'Album ID', format: 'uuid' })
  @ApiResponse({ status: 204, description: 'Album removed from favorites' })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album not found in favorites' })
  removeAlbum(@Param('id', ParseUUIDPipe) id: string): void {
    return this.favoritesService.removeAlbum(id);
  }

  @Post('artist/:id')
  @ApiOperation({ summary: 'Add artist to favorites' })
  @ApiParam({ name: 'id', description: 'Artist ID', format: 'uuid' })
  @ApiResponse({ status: 201, description: 'Artist added to favorites' })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({ description: 'Artist not found' })
  addArtist(@Param('id', ParseUUIDPipe) id: string): string {
    return this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete artist from favorites' })
  @ApiParam({ name: 'id', description: 'Artist ID', format: 'uuid' })
  @ApiResponse({ status: 204, description: 'Artist removed from favorites' })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist not found in favorites' })
  removeArtist(@Param('id', ParseUUIDPipe) id: string): void {
    return this.favoritesService.removeArtist(id);
  }
}
