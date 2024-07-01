const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'julie-website-mongo.s3.amazonaws.com',
                pathname: '/**',
            },
        ],
    },
});

module.exports = nextConfig;
