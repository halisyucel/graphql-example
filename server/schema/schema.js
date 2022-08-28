const graphql = require('graphql');
const Movie = require('../models/movie');
const Director = require('../models/director');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull } = graphql;

const MovieType = new GraphQLObjectType({
	name: 'Movie',
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: new GraphQLNonNull(GraphQLString) },
		description: { type: GraphQLString },
		year: { type: GraphQLInt },
		director: {
			type: DirectorType,
			resolve(parent, args) {
				return Director.findById(parent.directorId);
			}
		}
	})
});

const DirectorType = new GraphQLObjectType({
	name: 'Director',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		birth: { type: GraphQLString },
		movies: {
			type: new GraphQLList(MovieType),
			resolve(parent, args) {
				return Movie.find({ directorId: parent.id });
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		movie: {
			type: MovieType,
			args: {
				id: { type: GraphQLID }
			},
			resolve(parent, args) {
				return Movie.findById(args.id);
			}
		},
		movies: {
			type: new GraphQLList(MovieType),
			resolve(parent, args) {
				return Movie.find({});
			}
		},
		director: {
			type: DirectorType,
			args: {
				id: { type: GraphQLID }
			},
			resolve(parent, args) {
				return Director.findById(args.id);
			}
		},
		directors: {
			type: new GraphQLList(DirectorType),
			resolve(parent, args) {
				return Director.find({});
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addMovie: {
			type: MovieType,
			args: {
				title: { type: GraphQLString },
				description: { type: GraphQLString },
				year: { type: GraphQLInt },
				directorId: { type: GraphQLID }
			},
			resolve(parent, args) {
				const movie = new Movie({
					title: args.title,
					description: args.description,
					year: args.year,
					directorId: args.directorId
				});
				return movie.save();
			}
		},
		addDirector: {
			type: DirectorType,
			args: {
				name: { type: GraphQLString },
				birth: { type: GraphQLInt },
			},
			resolve(parent, args) {
				const director = new Director({
					name: args.name,
					birth: args.birth
				});
				return director.save();
			}
		},
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});