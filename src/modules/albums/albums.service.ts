import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumsRepository } from 'src/db/albums.repository';
import { BaseAlbumDto } from './dto/base-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { CleanupService } from 'src/common/cleanup/cleanup.service';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly albumsRepository: AlbumsRepository,
    private readonly cleanupService: CleanupService,
  ) {}

  create(createAlbumDto: CreateAlbumDto): BaseAlbumDto {
    const albumDto: BaseAlbumDto = {
      ...createAlbumDto,
      id: uuidv4(),
    };

    const album = this.albumsRepository.create(albumDto);
    return album;
  }

  findAll(): BaseAlbumDto[] {
    return this.albumsRepository.findAll();
  }

  findOne(id: string): BaseAlbumDto {
    const album = this.albumsRepository.findOne(id);

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): BaseAlbumDto {
    const index = this.albumsRepository.findIndexById(id);

    if (index === -1) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    const album = this.albumsRepository.findOne(id);

    const updatedAlbum = {
      ...album,
      ...updateAlbumDto,
    };

    const result = this.albumsRepository.update(index, updatedAlbum);

    return result;
  }

  remove(id: string): void {
    const index = this.albumsRepository.findIndexById(id);

    if (index === -1) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    this.albumsRepository.remove(index);
    this.cleanupService.removeAlbumFromOtherResources(id);
  }
}
