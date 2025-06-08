import { Injectable, NotFoundException } from '@nestjs/common';
import { CleanupService } from 'src/common/cleanup/cleanup.service';
import { TracksRepository } from 'src/db/tracks.repository';
import { v4 as uuidv4 } from 'uuid';
import { BaseTrackDto } from './dto/base-track.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(
    private readonly tracksRepository: TracksRepository,
    private readonly cleanupService: CleanupService,
  ) {}

  create(createTrackDto: CreateTrackDto): BaseTrackDto {
    const track: BaseTrackDto = {
      ...createTrackDto,
      id: uuidv4(),
    };

    this.tracksRepository.create(track);

    return track;
  }

  findAll(): BaseTrackDto[] {
    return this.tracksRepository.findAll();
  }

  findOne(id: string): BaseTrackDto {
    return this.tracksRepository.findOne(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto): BaseTrackDto {
    const track = this.tracksRepository.findOne(id);

    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    const updatedTrack = {
      ...track,
      ...updateTrackDto,
    };
    const result = this.tracksRepository.update(id, updatedTrack);
    return result;
  }

  remove(id: string): void {
    const index = this.tracksRepository.findTrackIndexById(id);

    if (index === -1) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    this.tracksRepository.remove(index);

    this.cleanupService.removeTrackFromOtherResources(id);
  }
}
