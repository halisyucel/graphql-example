import React, {useEffect} from 'react';
import { useQuery, gql } from '@apollo/client';

export interface Movie {
	id: string;
	title: string;
	description: string;
	year: number;
}

const GET_MOVIES = gql`
  query getMovies {
    movies {
      id
      title
      description
      year
    }
  }
`;

const MovieList = () => {
	const { loading, error, data } = useQuery(GET_MOVIES);

	useEffect(() => {
		console.log(data);
	}, [data]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;
	return (
		<div>
			<ul>
				{data.movies.map((movie: Movie) => (
					<li>
						<h2>{movie.title}</h2>
						<p>{movie.description}</p>
						<p>{movie.year}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default MovieList;
