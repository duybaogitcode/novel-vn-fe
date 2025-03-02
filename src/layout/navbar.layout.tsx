// src/layout/navbar.layout.tsx
'use client';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Spinner,
} from '@heroui/react';
import { useEffect, useState } from 'react';
import { useAuth } from '@/src/context/auth.context';
import { authService } from '@/src/service/auth.service';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    router.push('/sign-in');
  };

  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <p className='font-bold text-inherit'>NOVEL ONLINE</p>
      </NavbarBrand>

      {!isMobile && (
        <NavbarContent justify='center' className='gap-4'>
          <NavbarItem>
            <Link color='foreground' href='/'>
              Trang chủ
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color='foreground' href='/novel'>
              Danh sách truyện
            </Link>
          </NavbarItem>
        </NavbarContent>
      )}

      <NavbarContent justify='end'>
        {loading ? (
          <NavbarItem>
            <Spinner size='sm' />
          </NavbarItem>
        ) : user ? (
          <Dropdown placement='bottom-end'>
            <DropdownTrigger>
              <Avatar
                as='button'
                className='transition-transform'
                src={user.photoURL || undefined}
                name={user.displayName || user.email?.charAt(0) || 'User'}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label='User Actions'>
              <DropdownItem key='profile' textValue='Trang cá nhân'>
                Trang cá nhân
              </DropdownItem>
              <DropdownItem key='settings' textValue='Cài đặt'>
                Cài đặt
              </DropdownItem>
              <DropdownItem
                key='logout'
                textValue='Đăng xuất'
                color='danger'
                onClick={handleLogout}
              >
                Đăng xuất
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem>
              <Button as={Link} variant='light' href='/sign-in'>
                Đăng nhập
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color='primary' href='/signup' variant='flat'>
                Đăng ký
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
