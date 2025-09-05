'use client';

import { RootProvider } from 'fumadocs-ui/provider';
import type { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const SearchDialog = dynamic(() => import('@/components/search'));

export function Provider({ children }: { children: ReactNode }) {
  return (
    <RootProvider
      search={{
        SearchDialog,
      }}
    >
      {children}
    </RootProvider>
  );
}