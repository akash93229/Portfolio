import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { geist, instrumentSerif, spaceGrotesk, inter, jetbrainsMono } from '@/lib/fonts';

export const metadata: Metadata = {
  metadataBase: new URL('https://akashmalviya.dev'),
  title: {
    default: 'Akash Malviya | Full Stack Developer & DevOps Engineer',
    template: '%s | Akash Malviya',
  },
  description:
    'Portfolio of Akash Malviya — Full Stack Developer & DevOps Engineer. 3+ years delivering production cloud infrastructure on AWS, high-throughput container pipelines, and modern web applications.',
  keywords: [
    'Akash Malviya',
    'Full Stack Developer',
    'DevOps Engineer',
    'AWS Cloud Engineer',
    'React',
    'Node.js',
    'Python',
    'Django',
    'Docker',
    'Kubernetes',
    'Terraform',
    'CI/CD Pipelines',
    'ECS Fargate',
  ],
  authors: [{ name: 'Akash Malviya', url: 'https://github.com/akash93229' }],
  creator: 'Akash Malviya',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://akashmalviya.dev',
    title: 'Akash Malviya | Full Stack Developer & DevOps Engineer',
    description:
      '3+ years building web applications and running them on AWS with 99.9% uptime, 60% faster deploys, and automated infrastructure.',
    siteName: 'Akash Malviya Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akash Malviya | Full Stack Developer & DevOps Engineer',
    description:
      '3+ years building web applications and running them on AWS with 99.9% uptime and automated infrastructure.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${geist.variable} ${instrumentSerif.variable} ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://prod.spline.design" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://prod.spline.design" />
        <link
          rel="prefetch"
          as="fetch"
          crossOrigin="anonymous"
          href="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-neutral-800 selection:text-white flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1 w-full pt-16">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
