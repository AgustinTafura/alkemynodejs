'use strict';
const genres = require('./genres.json')
const movies = require('./movies.json')
const characters = require('./characters.json')
const characters_movies = require('./characters_movies.json')

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
        name : genre.name,
        image : genre.image
      }]) 
    }

    //Seed Movie Table
    for (const elem in movies) {
      const movie = movies[elem];
      await queryInterface.bulkInsert('Movies', [{
        createdAt : new Date(),
        updatedAt : new Date(),
        title : movie.title,
        image: movie.image,
        qualification: Math.floor(Math.random() * (5 - 1)) + 1,
        releaseDate : movie.release_date,
        genreId : movie.genre_id,
      }]) 
    } 

    //Seed Character Table
    for (const elem in characters) {
      const character = characters[elem];
      await queryInterface.bulkInsert('Characters', [{
        createdAt : new Date(),
        updatedAt : new Date(),
        name : character.name,
        image: "https://assets.stickpng.com/images/580b57fbd9996e24bc43bd2f.png",
        age: Math.floor(Math.random() * (60 - 1)) + 1,
        weight: Math.floor(Math.random() * (110 - 40)) + 40,
        history: "Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI como Aldus PageMaker."
      }]) 
    } 
    
    //Seed Character_Movies Table
    for (const elem in characters_movies) {
      const character_movie = characters_movies[elem];
      await queryInterface.bulkInsert('Characters_movies', [{
        createdAt : new Date(),
        updatedAt : new Date(),
        characterId : character_movie.character_id,
        movieId : character_movie.movie_id,
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
