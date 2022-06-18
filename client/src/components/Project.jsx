import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries';
import ProjectCard from './ProjectCard';
import Spinner from './Spinner';
const Project = () => {
	const { loading, error, data } = useQuery(GET_PROJECTS);
	if (loading) return <Spinner />;
	if (error) return <span>Something went wrong!</span>;
	return (
		<>
			{data.projects.length > 0 ? (
				<div className='row mt-3'>
					{data.projects.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>
			) : (
				<p>No Projects</p>
			)}
		</>
	);
};

export default Project;
