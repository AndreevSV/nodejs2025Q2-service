# Home Library Service

## Overview

REST API service for managing a home music library (tracks, albums, artists and favorites).

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Getting Started

### Installation

```bash
# Clone repository
git clone

# Install dependencies
npm install
```

### Running the App

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

### Testing

```bash
# Run tests
npm run test

# Run linting
npm run lint
```

## API Endpoints

### Users

- `POST /user` - Create user
- `GET /user` - Get all users
- `GET /user/:id` - Get user by ID
- `PATCH /user/:id` - Update user password
- `DELETE /user/:id` - Delete user

### Tracks, Albums, Artists

Standard CRUD operations:

- `POST /{entity}` - Create
- `GET /{entity}` - Get all
- `GET /{entity}/:id` - Get by ID
- `PUT /{entity}/:id` - Update
- `DELETE /{entity}/:id` - Delete

Where `{entity}` is one of: `track`, `album`, `artist`

### Favorites

- `GET /favs` - Get all favorites
- `POST /favs/{entity}/:id` - Add to favorites
- `DELETE /favs/{entity}/:id` - Remove from favorites

Where `{entity}` is one of: `track`, `album`, `artist`

## Documentation

After starting the app, OpenAPI documentation is available at http://localhost:4000/api/
