import Header from './components/Header';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Client from './components/Client';
import AddClientModal from './components/AddClientModal';

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				clients: {
					merge(existing, incoming) {
						return incoming;
					}
				},
				projects: {
					merge(existing, incoming) {
						return incoming;
					}
				}
			}
		}
	}
});

const client = new ApolloClient({
	uri: 'http://192.168.248.4:5000/graphql',
	cache
});

function App() {
	return (
		<>
			<ApolloProvider client={client}>
				<Header />
				<div className='container'>
					<AddClientModal />
					<Client />
				</div>
			</ApolloProvider>
		</>
	);
}

export default App;
