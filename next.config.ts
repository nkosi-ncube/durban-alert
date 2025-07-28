import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (
    config,
    { isServer }
  ) => {
    // Exclude specific dependencies from being bundled on the client-side
    if (!isServer) {
        config.externals.push(
            '@opentelemetry/instrumentation',
            '@opentelemetry/sdk-node',
            'handlebars'
        );
    }

    return config
  },
};

export default nextConfig;
