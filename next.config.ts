import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

// Define the base Next.js configuration
const nextConfig: NextConfig = {
  // Add any other Next.js configuration options here
};

export default withNextIntl(nextConfig);
