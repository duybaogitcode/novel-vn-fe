import { cn } from '../lib/utils/tw';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className='w-full min-h-screen bg-background'>
      <main
        className={cn(
          'mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16',
          className
        )}
      >
        {children}
      </main>
    </div>
  );
}
