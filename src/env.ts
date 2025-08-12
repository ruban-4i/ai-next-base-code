import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
    ONLINE_TEST_APPLICATION_URL: z.url(),
  },
  client: {
    NEXT_PUBLIC_REACT_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_REACT_ENV: process.env.NEXT_PUBLIC_REACT_ENV,
    ONLINE_TEST_APPLICATION_URL: process.env.ONLINE_TEST_APPLICATION_URL,
  },
});
