import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CutPlanner - Otimização de Cortes',
  description: 'Sistema inteligente de otimização de cortes para serralherias',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

