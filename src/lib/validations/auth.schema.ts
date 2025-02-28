// src/lib/validations/auth.schema.ts
import * as z from 'zod';

// Schema đăng nhập hiện có
export const signinSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' }),
  password: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
  remember: z.boolean().optional().default(false),
});

// Thêm schema đăng ký mới
export const signupSchema = z
  .object({
    name: z.string().min(3, { message: 'Name phải có ít nhất 3 ký tự' }),
    email: z.string().email({ message: 'Email không hợp lệ' }),
    password: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
    confirmPassword: z.string().min(6, { message: 'Mật khẩu xác nhận phải có ít nhất 6 ký tự' }),
    terms: z.boolean().refine((val) => val === true, { message: 'Bạn phải đồng ý với điều khoản' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

export type SigninFormValues = z.infer<typeof signinSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
