import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistsRepository } from 'src/db/artists.repository';
import { v4 as uuidv4 } from 'uuid';
import { BaseArtistDto } from './dto/base-artist.dto';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { CleanupService } from 'src/common/cleanup/cleanup.service';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly artistsRepository: ArtistsRepository,
    private readonly cleanupService: CleanupService,
  ) {}

  create(createArtistDto: CreateArtistDto): BaseArtistDto {
    const newArtist: BaseArtistDto = {
      ...createArtistDto,
      id: uuidv4(),
    };

    const result = this.artistsRepository.create(newArtist);
    return result;
  }

  findAll(): BaseArtistDto[] {
    return this.artistsRepository.findAll();
  }

  findOne(id: string) {
    const foundArtist = this.artistsRepository.findOne(id);

    if (!foundArtist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    return foundArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): BaseArtistDto {
    const artist = this.artistsRepository.findOne(id);

    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    const updatedArtist = {
      ...artist,
      ...updateArtistDto,
    };
    const result = this.artistsRepository.update(id, updatedArtist);

    return result;
  }

  remove(id: string): void {
    const index = this.artistsRepository.findArtistIndexById(id);

    if (index === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    this.artistsRepository.remove(index);
    this.cleanupService.removeArtistFromOtherResources(id);
  }
}
