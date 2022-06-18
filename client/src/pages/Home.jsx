import Project from '../components/Project';
import Client from '../components/Client';
import AddClientModal from '../components/AddClientModal';

const Home = () => {
	return (
		<>
			<div className='d-flex gap-3 mb-4'>
				<AddClientModal />
			</div>
			<Project />
			<hr />
			<Client />
		</>
	);
};

export default Home;
