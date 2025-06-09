import { PrismaClient, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const currentDate = new Date();

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

const artistData: Prisma.ArtistCreateInput[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'Artist A',
    grammy: true,
  },
  {
    id: '11111111-1111-1111-1111-111111111112',
    name: 'Artist B',
    grammy: false,
  },
  {
    id: '11111111-1111-1111-1111-111111111113',
    name: 'Artist C',
    grammy: true,
  },
  {
    id: '11111111-1111-1111-1111-111111111114',
    name: 'Artist D',
    grammy: false,
  },
  {
    id: '11111111-1111-1111-1111-111111111115',
    name: 'Artist E',
    grammy: true,
  },
];

const albumData: Prisma.AlbumCreateInput[] = [
  {
    id: '22222222-2222-2222-2222-222222222221',
    name: 'Album A',
    year: 2020,
    artist: {
      connect: { id: '11111111-1111-1111-1111-111111111111' },
    },
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    name: 'Album B',
    year: 2021,
    artist: {
      connect: { id: '11111111-1111-1111-1111-111111111112' },
    },
  },
  {
    id: '22222222-2222-2222-2222-222222222223',
    name: 'Album C',
    year: 2022,
    artist: {
      connect: { id: '11111111-1111-1111-1111-111111111113' },
    },
  },
  {
    id: '22222222-2222-2222-2222-222222222224',
    name: 'Album D',
    year: 2023,
    artist: {
      connect: { id: '11111111-1111-1111-1111-111111111114' },
    },
  },
  {
    id: '22222222-2222-2222-2222-222222222225',
    name: 'Album E',
    year: 2024,
    artist: {
      connect: { id: '11111111-1111-1111-1111-111111111115' },
    },
  },
];

const trackData: Prisma.TrackCreateInput[] = [
  {
    id: '33333333-3333-3333-3333-333333333331',
    name: 'Track A',
    duration: 180,
    artist: {
      connect: {
        id: '11111111-1111-1111-1111-111111111111',
      },
    },
    album: {
      connect: {
        id: '22222222-2222-2222-2222-222222222221',
      },
    },
  },
  {
    id: '33333333-3333-3333-3333-333333333332',
    name: 'Track B',
    duration: 190,
    artist: {
      connect: {
        id: '11111111-1111-1111-1111-111111111112',
      },
    },
    album: {
      connect: {
        id: '22222222-2222-2222-2222-222222222222',
      },
    },
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    name: 'Track C',
    duration: 200,
    artist: {
      connect: {
        id: '11111111-1111-1111-1111-111111111113',
      },
    },
    album: {
      connect: {
        id: '22222222-2222-2222-2222-222222222223',
      },
    },
  },
  {
    id: '33333333-3333-3333-3333-333333333334',
    name: 'Track D',
    duration: 210,
    artist: {
      connect: {
        id: '11111111-1111-1111-1111-111111111114',
      },
    },
    album: {
      connect: {
        id: '22222222-2222-2222-2222-222222222224',
      },
    },
  },
  {
    id: '33333333-3333-3333-3333-333333333335',
    name: 'Track E',
    duration: 220,
    artist: {
      connect: {
        id: '11111111-1111-1111-1111-111111111115',
      },
    },
    album: {
      connect: {
        id: '22222222-2222-2222-2222-222222222225',
      },
    },
  },
];

const userData: Prisma.UserCreateInput[] = [
  {
    id: '44444444-4444-4444-4444-444444444441',
    login: 'user1',
    password: 'user1',
    version: 1,
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: '44444444-4444-4444-4444-444444444442',
    login: 'user2',
    password: 'user2',
    version: 1,
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: '44444444-4444-4444-4444-444444444443',
    login: 'user3',
    password: 'user3',
    version: 1,
    createdAt: currentDate,
    updatedAt: currentDate,
  },
];

async function main() {
  console.log(`Start seeding ...`);

  console.log(`Start seeding Artists...`);
  for (const ar of artistData) {
    const artist = await prisma.artist.create({
      data: ar,
    });
    console.log(`Created artist with id: ${artist.id}`);
  }
  console.log(`Finished seeding Artists...`);

  console.log(`Start seeding Albums...`);
  for (const al of albumData) {
    const album = await prisma.album.create({
      data: al,
    });
    console.log(`Created album with id: ${album.id}`);
  }
  console.log(`Finished seeding Albums...`);

  console.log(`Start seeding Tracks...`);
  for (const t of trackData) {
    const track = await prisma.track.create({
      data: t,
    });
    console.log(`Created track with id: ${track.id}`);
  }
  console.log(`Finished seeding Tracks...`);

  console.log(`Start seeding Users...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: {
        ...u,
        password: await hashPassword(u.password),
      },
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Finished seeding Users...`);

  console.log(`Start seeding Favorites for user1...`);
  const user1Id = '44444444-4444-4444-4444-444444444441';
  await prisma.user.update({
    where: { id: user1Id },
    data: {
      favoriteArtists: {
        connect: [
          { id: '11111111-1111-1111-1111-111111111111' }, // Artist A
          { id: '11111111-1111-1111-1111-111111111112' }, // Artist B
        ],
      },
      favoriteAlbums: {
        connect: [
          { id: '22222222-2222-2222-2222-222222222221' }, // Album A
        ],
      },
      favoriteTracks: {
        connect: [
          { id: '33333333-3333-3333-3333-333333333331' }, // Track A
          { id: '33333333-3333-3333-3333-333333333332' }, // Track B
          { id: '33333333-3333-3333-3333-333333333333' }, // Track C
        ],
      },
    },
  });
  console.log(`Connected favorites for user with id: ${user1Id}`);
  console.log(`Finished seeding Favorites...`);

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
