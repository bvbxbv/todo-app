import React, { useEffect } from 'react';
import { Button } from './ui/Button';

interface ModalProps {
	title: string;
	children: React.ReactNode;
	isActive: boolean;
	onClose: () => void;
}

export function Modal({ title, children, isActive, onClose }: ModalProps) {
	useEffect(() => {
		if (isActive) {
			document.body.classList.add('modal-open');
		} else {
			document.body.classList.remove('modal-open');
		}

		return () => {
			document.body.classList.remove('modal-open');
		};
	}, [isActive]);

	return (
		<section className={isActive ? 'active' : 'hidden'} id='modal'>
			<div className='__wrap'>
				<div className='__title'>
					<span>{title}</span>

					<Button className='icon' onClick={onClose} text='[X]' />
				</div>

				<div className='__content'>{children}</div>
			</div>
		</section>
	);
}
