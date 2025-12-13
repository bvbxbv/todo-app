import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldErrors, useForm } from 'react-hook-form';
import { Toast } from '../Toast';
import { todoSchema, TodoFormData } from '../../types/forms';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface AddTodoFormProps {
	onSubmit: (data: TodoFormData) => void;
}

export function AddTodoForm({ onSubmit }: AddTodoFormProps) {
	const [toastText, setToastText] = useState<string>('');
	const [toastTrigger, setToastTrigger] = useState<number>(0);

	const onError = (errors: FieldErrors<TodoFormData>) => {
		if (errors.title?.message) {
			setToastText(errors.title.message);
			setToastTrigger((v) => v + 1);
		}
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<TodoFormData>({
		resolver: zodResolver(todoSchema),
		mode: 'onChange',
	});

	const _onSubmit = (data: TodoFormData) => {
		onSubmit(data);
		reset();
	};
	return (
		<>
			{toastText !== '' && <Toast text={toastText} trigger={toastTrigger} />}

			<form action='' onSubmit={handleSubmit(_onSubmit, onError)}>
				<Input
					{...register('title')}
					placeholder='what about title?'
					className={errors.title ? 'primary error' : 'primary'}
				/>
				<Input {...register('description')} placeholder='little bit of details...' />
				<Button type='submit' text='&#8594;' />
			</form>
		</>
	);
}
