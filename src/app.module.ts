import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { AlbumsModule } from './modules/albums/albums.module';
import { FavoritesModule } from './modules/favourites/favorites.module';
import { CleanupModule } from './common/cleanup/cleanup.module';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
    CleanupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
