import React from "react";

interface StatsContainerProps {
	children: React.ReactNode;
}

export function StatsContainer({ children }: StatsContainerProps) {
	return (
		<>
			<section id="stats">{children}</section>
		</>
	);
}
