import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/movies")
      .then(response => {
        this.setState(() => ({ movies: response.data }));
      })
      .catch(error => {
        console.error("Server Error", error);
      });
  }

  render() {
    return (
      <div className='movie-list'>
        {this.state.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
}

function MovieDetails({ movie }) {
  const { title, director, metascore, stars } = movie;
  return (
    <div className='movie-card'>
      {/* I found the instructions confusing here, I had to really search around to find where they mean "Make it so that the card in MovieList". So I did the whole card */}
      <Link to={`/movies/${movie.id}`}>
        <h2>{title}</h2>

        <div className='movie-director'>
          Director: <em>{director}</em>
        </div>
        <div className='movie-metascore'>
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>

        {stars.map(star => (
          <div key={star} className='movie-star'>
            {star}
          </div>
        ))}
      </Link>
    </div>
  );
}
