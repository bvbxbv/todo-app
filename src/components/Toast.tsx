import { useEffect, useRef, useState } from 'react';

interface ToastProps {
	text: string | undefined;
	trigger: number;
	delay?: number;
}

export function Toast({ text, trigger, delay = 2000 }: ToastProps) {
	const [hidden, setHidden] = useState<boolean>();
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	useEffect(() => {
		if (intervalRef.current !== null) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
		setHidden(false);
		intervalRef.current = setTimeout(() => {
			setHidden(true);
		}, delay);
	}, [trigger]);

	return (
		<>
			<div className={'toast ' + (hidden ? 'exit' : 'enter')}>
				<div className='__title'>
					<span>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span>
					<div className='__controls'>
						<button>[X]</button>
					</div>
				</div>

				<div className='__content'>{text}</div>
			</div>
		</>
	);
}
