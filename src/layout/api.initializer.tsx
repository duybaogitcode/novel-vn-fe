// src/layout/api.initializer.tsx
'use client';
import { useEffect } from 'react';
import { OpenAPI } from '@/src/api/generated/core/OpenAPI';

export function ApiInitializer() {
  useEffect(() => {
    // Đảm bảo cài đặt này chạy TRƯỚC khi bất kỳ API request nào được gọi
    OpenAPI.BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9999';
    OpenAPI.WITH_CREDENTIALS = true;

    // Thêm event listener cho unhandledrejection để debug
    const handler = (event: PromiseRejectionEvent) => {
      if (event.reason?.name === 'ApiError') {
        console.error('API Error details:', {
          message: event.reason.message,
          url: event.reason.url,
          status: event.reason.status,
          body: event.reason.body,
        });
      }
    };

    window.addEventListener('unhandledrejection', handler);

    return () => {
      window.removeEventListener('unhandledrejection', handler);
    };
  }, []);

  return null;
}
