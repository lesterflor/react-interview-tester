import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
	title: 'React Interview Tester',
	description: 'Application for testing your knowledge of React.'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>
				{children}
				<Toaster
					expand={true}
					richColors
				/>
			</body>
		</html>
	);
}
