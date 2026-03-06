import type {Metadata} from 'next';
import './globals.css';
import {Navigation} from '@/components/Navigation';
import {Toaster} from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Sarva Simulation Dashboard',
  description: 'A civic simulation demonstrating Indias collective potential.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Code+Pro&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <footer className="border-t py-8 bg-card text-muted-foreground text-sm">
          <div className="container mx-auto px-4 text-center">
            <p>© {new Date().getFullYear()} Sarva Simulation Project. This is a non-monetary simulation experiment.</p>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
