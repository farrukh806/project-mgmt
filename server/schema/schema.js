const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull
} = require('graphql');

const Project = require('../models/Project');
const Client = require('../models/Client');

const ProjectType = new GraphQLObjectType({
	name: 'Project',
	fields: () => ({
		name: { type: GraphQLString },
		id: { type: GraphQLID },
		description: { type: GraphQLString },
		status: { type: GraphQLString },
		client: {
			type: ClientType,
			resoleve(parent, args) {
				// here `parent` refers to the project
				return Client.findById(parent.clientId);
			}
		}
	})
});
const ClientType = new GraphQLObjectType({
	name: 'Client',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		phone: { type: GraphQLString }
	})
});

// Query

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		clients: {
			type: new GraphQLList(ClientType),
			resolve(parent, args) {
				return Client.find();
			}
		},
		client: {
			type: ClientType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Client.findById(args.id);
			}
		},

		projects: {
			type: new GraphQLList(ProjectType),
			resolve(parent, args) {
				return Project.find();
			}
		},
		project: {
			type: ProjectType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Project.findById(args.id);
			}
		}
	}
});

// Mutation

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addClient: {
			type: ClientType,
			args: {
				name: { type: GraphQLNonNull(GraphQLString) },
				email: { type: GraphQLNonNull(GraphQLString) },
				phone: { type: GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, args) {
				const client = new Client({
					name: args.name,
					email: args.email,
					phone: args.phone
				});
				return client.save();
			}
		},
		deleteClient: {
			type: ClientType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Client.findByIdAndDelete(args.id);
			}
		}
	}
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation });
