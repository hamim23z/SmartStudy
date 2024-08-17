import { Kanit } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';

// Import Inter and Kanit fonts with specific weights
const kanit = Kanit({
  subsets: ['latin'],
  weight: ['400', '700'], // Ensure these weights are available
});

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${kanit.className}`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
