export const formatDate = (date: Date) => {
	return date.toLocaleString('en-En', {
		weekday: 'short',
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
};
