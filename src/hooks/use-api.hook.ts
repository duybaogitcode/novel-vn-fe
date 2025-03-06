import { useEffect } from 'react';
import { OpenAPI } from '@/src/api/generated/core/OpenAPI';

export function useApiConfig() {
  useEffect(() => {
    OpenAPI.BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9999';
    OpenAPI.WITH_CREDENTIALS = true;
  }, []);
}
