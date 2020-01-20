# Centmovies App

## Setup

Pre-requisites:

- Ionic 4
- Npm
- Angular 6 ++

Run `npm i` in the root of the project.
Run `ionic serve -l` afterwards and your browser will open and the app will be running.

## Url and server communication:
The app assumes the api is run on the same machine, but to change go to `cd src/app/services/movies.service.ts` and modify the global variable `serverurl` accordingly
- `GET http://localhost:3000/api/v1/movies`: the movies name
