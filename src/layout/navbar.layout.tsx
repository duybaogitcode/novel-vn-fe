// src/layout/navbar.layout.tsx
'use client';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
  User,
} from '@heroui/react';
import { useAuth } from '@/src/context/auth.context';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Search from '../components/input/search.input';

export default function Header() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Danh sách menu items cho cả desktop và mobile
  const mainMenuItems = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Danh sách truyện', href: '/novel' },
    // { name: 'Thể loại', href: '/novel/categories' },
    { name: 'Bảng xếp hạng', href: '/novel/ranking' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/sign-in');
      setIsMenuOpen(false); // Close mobile menu if open
    } catch (error: any) {
      console.error('Logout failed:', error);
      router.push('/sign-in');
    }
  };

  // Menu items cho user đăng nhập (mobile view)
  // const userMenuItems = user
  //   ? [
  //       { name: `Hồ sơ: ${user.firstName} ${user.lastName}`, href: '/profile', emphasis: true },
  //       { name: 'Cài đặt', href: '/settings' },
  //       { name: 'Ví của tôi', href: '/wallet' },
  //       { name: 'Tủ sách', href: '/bookmarks' },
  //       { name: 'Lịch sử đọc truyện', href: '/history' },
  //       { name: 'Trợ giúp và phản hồi', href: '/help' },
  //       { name: 'Đăng xuất', href: '#', danger: true, onClick: handleLogout },
  //     ]
  //   : [];

  return (
    <>
      <style jsx global>{`
        /* Mobile toggle button - only visible on mobile */
        .mobile-toggle {
          display: flex;
        }

        /* Desktop navigation - hidden on mobile */
        .desktop-nav {
          display: none;
        }

        /* Mobile auth buttons - hidden on desktop */
        .mobile-auth-buttons {
          display: block;
        }

        /* Desktop auth buttons - hidden on mobile */
        .desktop-auth-buttons {
          display: none;
        }

        /* User component responsive styles */
        .user-email {
          display: none;
        }

        .user-name {
          display: none;
        }

        /* Media queries for desktop */
        @media (min-width: 640px) {
          .mobile-toggle {
            display: none;
          }

          .desktop-nav {
            display: flex;
          }

          .mobile-auth-buttons {
            display: none;
          }

          .desktop-auth-buttons {
            display: flex;
          }
        }

        @media (min-width: 1024px) {
          .user-email {
            display: block;
          }

          .user-name {
            display: block;
          }
        }
      `}</style>

      <Navbar
        shouldHideOnScroll
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        {/* Mobile Toggle Button */}
        <NavbarContent className='mobile-toggle' justify='start'>
          <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
        </NavbarContent>

        {/* Logo/Brand - always visible */}
        <NavbarBrand>
          <p className='font-bold text-inherit'>NOVEL ONLINE</p>
        </NavbarBrand>

        {/* Desktop Navigation */}
        <NavbarContent className='desktop-nav' justify='center'>
          {mainMenuItems.map((item) => (
            <NavbarItem key={item.name}>
              <Link color='foreground' href={item.href}>
                {item.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        {/* Auth Related Content */}
        <NavbarContent justify='end'>
          {loading ? (
            <NavbarItem>
              <Spinner size='sm' />
            </NavbarItem>
          ) : user ? (
            <>
              <Search></Search>
              <Dropdown placement='bottom-start'>
                <DropdownTrigger>
                  <User
                    as='button'
                    avatarProps={{
                      isBordered: true,
                      src: user.avatar,
                    }}
                    className='transition-transform'
                    classNames={{
                      description: 'user-email',
                      name: 'user-name',
                    }}
                    // description={user.email}
                    // name={`${user.firstName} ${user.lastName}`}
                    description={``}
                    name={``}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label='User Actions' variant='flat'>
                  <DropdownItem key='profile' className='gap-2'>
                    {`Hồ sơ: ${user.firstName} ${user.lastName}`}
                  </DropdownItem>
                  <DropdownItem key='setting'>Cài đặt</DropdownItem>
                  <DropdownItem key='wallet'>Ví của tôi</DropdownItem>
                  <DropdownItem key='bookmark'>Tủ sách</DropdownItem>
                  <DropdownItem key='reading-history'>Lịch sử đọc truyện</DropdownItem>
                  <DropdownItem key='help_and_feedback'>Trợ giúp và phản hồi</DropdownItem>
                  <DropdownItem key='logout' color='danger' onClick={handleLogout}>
                    Đăng xuất
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
          ) : (
            <>
              {/* Login/Signup buttons - desktop */}
              <div className='desktop-auth-buttons'>
                <Search></Search>

                <NavbarItem>
                  <Button as={Link} variant='flat' color='primary' href='/sign-in'>
                    Đăng nhập
                  </Button>
                </NavbarItem>
                {/* <NavbarItem>
                  <Button as={Link} color='primary' href='/signup' variant='flat'>
                    Đăng ký
                  </Button>
                </NavbarItem> */}
              </div>
            </>
          )}
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu>
          {/* Main navigation items */}
          {mainMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.name}-${index}`}>
              <Link
                className='w-full'
                color='foreground'
                href={item.href}
                size='lg'
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}

          {/* Divider if needed */}
          {!user && <div className='my-4 h-px bg-gray-200 dark:bg-gray-700' />}

          {/* Authentication items for mobile */}
          {!user ? (
            // Login/Signup for mobile
            <>
              <NavbarMenuItem>
                <Link
                  className='w-full'
                  href='/sign-in'
                  size='lg'
                  onClick={() => setIsMenuOpen(false)}
                >
                  Đăng nhập
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link
                  className='w-full'
                  color='primary'
                  href='/signup'
                  size='lg'
                  onClick={() => setIsMenuOpen(false)}
                >
                  Đăng ký
                </Link>
              </NavbarMenuItem>
            </>
          ) : (
            <></>
          )}
        </NavbarMenu>
      </Navbar>
    </>
  );
}
