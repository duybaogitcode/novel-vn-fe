// src/components/forms/sign-in.forms.tsx
'use client';

import React, { useState } from 'react';
import { Button, Input, Link, Form, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Controller, useForm } from 'react-hook-form';
import { SigninFormValues, signinSchema } from '@/src/lib/validations/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { firebaseService } from '@/src/lib/firebase/firebase.service';
import { AuthService, FirebaseIdToken } from '@/src/api/generated';

export default function SignInForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = async (data: SigninFormValues) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const result = await firebaseService.loginWithEmailPassword(data);
      if (result.success) {
        console.log('Đăng nhập thành công!', result.data);
        router.push('/');
      } else {
        setErrorMessage(result.error);
      }
    } catch (error: any) {
      setErrorMessage('Có lỗi xảy ra khi đăng nhập');
      console.error('Lỗi đăng nhập:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setErrorMessage(null);

    try {
      const result = await firebaseService.loginWithGoogle();
      if (result.success) {
        const idToken = await result.data?.user?.getIdToken();
        if (!idToken) {
          setErrorMessage('Có lỗi xảy ra khi đăng nhập với Google');
          return;
        }

        try {
          const body: FirebaseIdToken = {
            token: idToken,
          };

          const response = await AuthService.authControllerSignInByFirebaseToken(body);
          console.log('Đăng nhập Google thành công!', response);
          router.push('/');
        } catch (apiError: any) {
          console.error('Backend API error:', apiError);
          setErrorMessage('Lỗi xác thực với hệ thống: ' + (apiError.message || ''));
        }
      } else {
        setErrorMessage(result.error || 'Có lỗi xảy ra khi đăng nhập với Google');
      }
    } catch (error: any) {
      setErrorMessage('Có lỗi xảy ra khi đăng nhập với Google');
      console.error('Lỗi đăng nhập Google:', error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className='flex h-full w-full items-center justify-center'>
      <div className='flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-large font-medium'>Đăng nhập</h1>
          <p className='text-small text-default-500'>để tiếp tục đọc truyện tại Novel Online</p>
        </div>

        {errorMessage && (
          <div className='bg-danger-100 text-danger p-2 rounded-medium text-small'>
            {errorMessage}
          </div>
        )}

        <Form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                isRequired
                isInvalid={!!errors.email}
                label='Email'
                placeholder='Nhập email của bạn'
                type='email'
                variant='bordered'
                errorMessage={errors.email?.message}
                disabled={isLoading || isGoogleLoading}
              />
            )}
          />

          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                isRequired
                isInvalid={!!errors.password}
                endContent={
                  <button
                    type='button'
                    onClick={toggleVisibility}
                    disabled={isLoading || isGoogleLoading}
                  >
                    {isVisible ? (
                      <Icon
                        className='pointer-events-none text-2xl text-default-400'
                        icon='solar:eye-closed-linear'
                      />
                    ) : (
                      <Icon
                        className='pointer-events-none text-2xl text-default-400'
                        icon='solar:eye-bold'
                      />
                    )}
                  </button>
                }
                label='Mật khẩu'
                placeholder='Nhập mật khẩu của bạn'
                type={isVisible ? 'text' : 'password'}
                variant='bordered'
                errorMessage={errors.password?.message}
                disabled={isLoading || isGoogleLoading}
              />
            )}
          />

          <div className='flex w-full items-center justify-between px-1 py-2'>
            <Link className='text-default-500 ml-auto' href='#' size='sm'>
              Quên mật khẩu?
            </Link>
          </div>

          <Button
            className='w-full'
            color='primary'
            type='submit'
            isLoading={isLoading}
            isDisabled={isLoading || isGoogleLoading}
          >
            Đăng nhập
          </Button>
        </Form>

        <div className='flex items-center gap-4 py-2'>
          <Divider className='flex-1' />
          <p className='shrink-0 text-tiny text-default-500'>Hoặc</p>
          <Divider className='flex-1' />
        </div>

        <div className='flex flex-col gap-2'>
          <Button
            startContent={<Icon icon='flat-color-icons:google' width={24} />}
            variant='bordered'
            onClick={handleGoogleLogin}
            isLoading={isGoogleLoading}
            isDisabled={isLoading || isGoogleLoading}
          >
            Đăng nhập bằng Google
          </Button>

          <Button
            startContent={<Icon className='text-default-500' icon='fe:github' width={24} />}
            variant='bordered'
            isDisabled={true} // Chưa hỗ trợ đăng nhập bằng GitHub
          >
            Đăng nhập bằng Github
          </Button>
        </div>

        <p className='text-center text-small'>
          Chưa có tài khoản?&nbsp;
          <Link href='/signup' size='sm'>
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
}
