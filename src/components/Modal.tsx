import React, { useState } from 'react';

interface ModalProps {
	title: string;
	children: React.ReactNode;
	isActive: boolean;
	onClose: () => void;
}

export function Modal({ title, children, isActive, onClose }: ModalProps) {
	return (
		<section className={isActive ? 'active' : 'hidden'} id='modal'>
			<div className='__wrap'>
				<div className='__title'>
					<span>{title}</span>

					<button className='icon' onClick={() => onClose()}>
						[X]
					</button>
				</div>

				<div className='__content'>{children}</div>
			</div>
		</section>
	);
}
