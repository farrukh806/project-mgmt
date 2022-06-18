import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Project from './pages/Project';

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
				<Router>
					<div className='container'>
						<Routes>
							<Route path='/' exact element={<Home />} />
							<Route path='/projects/:id' element={<Project />} />
							<Route path='*' element={<NotFound />} />
						</Routes>
					</div>
				</Router>
			</ApolloProvider>
		</>
	);
}

export default App;
