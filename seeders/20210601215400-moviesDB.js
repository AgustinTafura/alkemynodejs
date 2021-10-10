'use strict';
const genres = require('./genres.json')
const directors = require('./directors.json')
const movies = require('./movies.json')
const tvshows = require('./tvshows.json')
const seasons = require('./seasons.json')
const episodes = require('./episodes.json')
const actors = require('./actors.json')
const actors_episodes = require('./actors_episodes.json')
const actors_movies = require('./actors_movies.json')

module.exports = {
  up: async (queryInterface, Sequelize) => {

    /**
     * Add seed commands here.
     */

    //Seed Genre Table
    for (const elem in genres) {
      const genre = genres[elem];
      await queryInterface.bulkInsert('Genres', [{
        createdAt :  new Date(),
        updatedAt :  new Date(),
        name : genre.name
      }]) 
    }

    //Seed Dorector Table
    for (const elem in directors) {
      const director = directors[elem];
      await queryInterface.bulkInsert('Directors', [{
        createdAt : new Date(),
        updatedAt : new Date(),
        firstName : director.first_name,
        lastName : director.last_name,
      }]) 
    } 


    //Seed Movie Table
    for (const elem in movies) {
      const movie = movies[elem];
      await queryInterface.bulkInsert('Movies', [{
        createdAt : new Date(),
        updatedAt : new Date(),
        title : movie.title,
        awards : movie.awards,
        releaseDate : movie.release_date,
        length : movie.length,
        genreId : movie.genre_id,
        revenue : movie.revenue,
        directorId : movie.director_id
      }]) 
    } 

    //Seed Tvshows Table
    for (const elem in tvshows) {
      const tvshow = tvshows[elem];
      await queryInterface.bulkInsert('Tvshows', [{
        createdAt : new Date(),
        updatedAt : new Date(),
        title : tvshow.title,
        releaseDate : tvshow.release_date,
        endDate : tvshow.end_date,
        genreId : tvshow.genre_id,
      }]) 
    }

    //Seed Seasons Table
    for (const elem in seasons) {
      const season = seasons[elem];
      await queryInterface.bulkInsert('Seasons', [{
        createdAt : new Date(),
        updatedAt : new Date(),
        title : season.title,
        releaseDate : season.release_date,
        endDate : season.end_date,
        tvshowId : season.serie_id,
      }]) 
    }

    //Seed Episodes Table
    for (const elem in episodes) {
      const episode = episodes[elem];
      await queryInterface.bulkInsert('Episodes', [{
        createdAt : new Date(),
        updatedAt : new Date(),
        title : episode.title,
        releaseDate : episode.release_date,
        number : episode.number,
        rating : episode.rating,
        seasonId : episode.season_id,
      }]) 
    }

    //Seed Actor Table
    for (const elem in actors) {
      const actor = actors[elem];
      await queryInterface.bulkInsert('Actors', [{
        createdAt : new Date(),
        updatedAt : new Date(),
        firstName : actor.first_name,
        lastName : actor.last_name,
      }]) 
    } 
    

    //Seed Actors_Episodes Table
    for (const elem in actors_episodes) {
      const actor_episode = actors_episodes[elem];
      await queryInterface.bulkInsert('Actors_episodes', [{
        createdAt : new Date(),
        updatedAt : new Date(),
        actorId : actor_episode.actor_id,
        episodeId : actor_episode.episode_id,
      }]) 
    }

    //Seed Actor_Movies Table
    for (const elem in actors_movies) {
      const actor_movie = actors_movies[elem];
      await queryInterface.bulkInsert('Actors_movies', [{
        createdAt : new Date(),
        updatedAt : new Date(),
        actorId : actor_movie.actor_id,
        movieId : actor_movie.movie_id,
      }]) 
    }



  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
    */
     
    //  await queryInterface.bulkDelete('Movies', null, {});
     await queryInterface.bulkDelete('Genres', null, {});
          
  }
};
