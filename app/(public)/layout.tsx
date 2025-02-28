import MainLayout from '@/src/layout/main.layout';
import Header from '@/src/layout/navbar.layout';

export default function NavbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <MainLayout>{children}</MainLayout>
    </>
  );
}
