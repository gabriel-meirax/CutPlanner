/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remover rewrites para produção no Vercel
  // As API routes do Next.js fazem proxy diretamente via fetch
};

module.exports = nextConfig;

