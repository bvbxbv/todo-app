export const formatDate = (date: Date) => {
	return date.toLocaleString('en-En', {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
	});
};

export const formatTime = (date: Date) => {
	const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
	return time;
};

export const getDaysInMonth = (month: number, year: number): number => {
	return new Date(year, month + 1, 0).getDate();
};
