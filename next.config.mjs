/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: ["@chakra-ui/react"],
        esmExternals: false
    },
    images: {
        domains: ["www.google.com",'encrypted-tbn0.gstatic.com'], // Add any other domains if needed
    },
};

export default nextConfig;
