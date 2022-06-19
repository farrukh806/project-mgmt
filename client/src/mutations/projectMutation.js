import { gql } from '@apollo/client';

const ADD_PROJECT = gql`
	mutation addProject(
		$name: String!
		$description: String!
		$status: ProjectStatus!
		$clientId: ID!
	) {
		addProject(
			name: $name
			description: $description
			status: $status
			clientId: $clientId
		) {
			name
			description
			id
			status
			client {
				name
				id
				email
				phone
			}
		}
	}
`;

const DELETE_PROJECT = gql`
	mutation deleteProject($id: ID!) {
		deleteProject(id: $id) {
			id
		}
	}
`;

export { ADD_PROJECT, DELETE_PROJECT };