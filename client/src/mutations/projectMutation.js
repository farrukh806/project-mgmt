import { gql } from '@apollo/client';

const ADD_PROJECT = gql`
	mutation AddProject(
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

const UPDATE_PROJECT = gql`
	mutation UpdateProject(
		$id: ID!
		$name: String
		$description: String
		$status: ProjectStatusUpdate
	) {
		updateProject(
			id: $id
			name: $name
			description: $description
			status: $status
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

export { ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT };
