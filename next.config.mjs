/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: ["@chakra-ui/react"],
        esmExternals: false
    },
    images: {
        domains: ["www.google.com", "encrypted-tbn0.gstatic.com"], // Add other domains if needed
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        return config;
    }
};

export default nextConfig;
