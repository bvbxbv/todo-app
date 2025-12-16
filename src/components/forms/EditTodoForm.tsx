import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface EditTodoFormProps {
	title: string;
	description: string;
	onTitleChange: (title: string) => void;
	onDescriptionChange: (description: string) => void;
	onSubmit: () => void;
}

export function EditTodoForm({
	title,
	description,
	onTitleChange,
	onDescriptionChange,
	onSubmit,
}: EditTodoFormProps) {
	return (
		<form action='' onSubmit={(e) => e.preventDefault()}>
			<Input
				labelText="You don't like title?"
				name='change-title'
				id='change-todo-title'
				placeholder='Your edited title'
				onChange={(e) => onTitleChange(e.target.value)}
				value={title}
			/>

			<Input
				labelText="Description isn't good?"
				name='change-description'
				id='change-todo-description'
				placeholder='New beautiful description'
				onChange={(e) => onDescriptionChange(e.target.value)}
				value={description}
			/>

			<Button text="> I think it's good" type='submit' onClick={onSubmit} />
		</form>
	);
}
