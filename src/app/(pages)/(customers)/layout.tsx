import { AuthProvider } from '@/app/providers/auth-provider';
import { Navbar } from '@/components';
import type { Viewport } from 'next';

export const viewport: Viewport = {
  viewportFit: 'cover',
  maximumScale: 1,
  initialScale: 1,
  width: 'device-width',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Navbar />
      {children}
    </AuthProvider>
  );
}
