'use client';

import React from 'react';
import { Button, Input, Checkbox, Link, Form, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Controller, useForm } from 'react-hook-form';
import { SigninFormValues, signinSchema } from '@/src/lib/validations/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function SignInForm() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    mode: 'onChange',
    defaultValues: {
      email: 'example@gmail.com',
      password: '',
      remember: false,
    },
  });

  const onSubmit = async (data: SigninFormValues) => {
    console.log('Form data:', data);
    // Xử lý đăng ký tại đây (gọi API, firebase, etc.)
    try {
      // await registerUser(data);
      console.log('Đăng ký thành công!');
    } catch (error) {
      console.error('Lỗi đăng ký:', error);
    }
  };

  return (
    <div className='flex h-full w-full items-center justify-center'>
      <div className='flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-large font-medium'>Đăng nhập</h1>
          <p className='text-small text-default-500'>để tiếp tục đọc truyện tại Novel Online</p>
        </div>

        <Form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                isRequired
                label='Email'
                placeholder='Nhập email của bans'
                type='email'
                variant='bordered'
              />
            )}
          ></Controller>

          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                isRequired
                isInvalid={!!errors.password}
                endContent={
                  <button type='button' onClick={toggleVisibility}>
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
                name='password'
                placeholder='Nhập mật khẩu của bạn'
                type={isVisible ? 'text' : 'password'}
                variant='bordered'
                errorMessage={errors.password?.message}
              />
            )}
          ></Controller>
          <div className='flex w-full items-center justify-between px-1 py-2'>
            {/* <Checkbox name='remember' size='sm'>
              Remember me
            </Checkbox> */}
            <Link className='text-default-500' href='#' size='sm'>
              Quên mật khẩu?
            </Link>
          </div>
          <Button className='w-full' color='primary' type='submit'>
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
          >
            Đăng nhập bằng Google
          </Button>
          <Button
            startContent={<Icon className='text-default-500' icon='fe:github' width={24} />}
            variant='bordered'
          >
            Đăng nhập bằng Github
          </Button>
        </div>
        <p className='text-center text-small'>
          Chưa có tài khoản?&nbsp;
          <Link href='#' size='sm'>
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
}
