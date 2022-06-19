import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { GET_PROJECT } from '../queries/projectQueries';
import { UPDATE_PROJECT } from '../mutations/projectMutation';

const EditProjectForm = ({ project }) => {
	const [name, setName] = useState(project.name);
	const [description, setDescription] = useState(project.description);
	const [status, setStatus] = useState('');

	const [updateProject] = useMutation(UPDATE_PROJECT, {
		variables: { name, description, status, id: project.id },
		refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }]
	});

	const submitHandle = (e) => {
		e.preventDefault();

		if (name === '' || description === '' || status === '') {
			return alert('Empty fields are not accepted');
		}

		updateProject(name, description, status, project.id);
	};
	return (
		<div className='mt-5'>
			<h3>Update Project Form</h3>
			<form onSubmit={submitHandle}>
				<div className='mb-3'>
					<label className='form-label'>Name</label>
					<input
						type='text'
						className='form-control'
						id='name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className='mb-3'>
					<label className='form-label'>Description</label>
					<textarea
						className='form-control'
						id='description'
						value={description}
						onChange={(e) =>
							setDescription(e.target.value)
						}></textarea>
				</div>
				<div className='mb-3'>
					<label className='form-label'>Status</label>

					<select
						id='status'
						className='form-select'
						value={status}
						onChange={(e) => setStatus(e.target.value)}>
						<option value='new'>Not started</option>
						<option value='progress'>In progress</option>
						<option value='completed'>Completed</option>
					</select>
				</div>

				<button type='submit' className='btn btn-primary'>
					Submit
				</button>
			</form>
		</div>
	);
};

export default EditProjectForm;
