import '@/app/global.css';
import { Provider } from '@/app/provider';
import { GeistMono } from 'geist/font/mono';
import { Figtree } from 'next/font/google';

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  weight: ['400', '500', '600', '700'],
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${figtree.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen overflow-x-hidden">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
