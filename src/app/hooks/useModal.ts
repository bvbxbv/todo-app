import { useState } from 'react';

export function useModal(initialState: boolean = false) {
	const [isModalActive, setIsActive] = useState<boolean>(initialState);
	const openModal = () => setIsActive(true);
	const closeModal = () => setIsActive(false);
	return { isModalActive, openModal, closeModal };
}
