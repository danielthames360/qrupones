'use client';

import { SessionProvider } from 'next-auth/react';
import * as React from 'react';

interface Props {
  children: React.ReactNode;
}
export function AuthProvider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}
