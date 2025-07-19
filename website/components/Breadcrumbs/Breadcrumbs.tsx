'use client';

import { Breadcrumbs as MantineBreadcrumbs, Anchor } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Breadcrumbs() {
  const pathname = usePathname();
  
  // Don't show breadcrumbs on home page
  if (pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);
  
  const items = [
    { title: 'Home', href: '/' },
    ...segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join('/')}`;
      const title = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      return { title, href };
    }),
  ];

  return (
    <MantineBreadcrumbs separator="/" mt="md" mb="xl">
      {items.map((item, index) => (
        <Anchor 
          key={item.href} 
          component={Link} 
          href={item.href}
          c={index === items.length - 1 ? 'dimmed' : undefined}
          fw={index === items.length - 1 ? 500 : undefined}
        >
          {item.title}
        </Anchor>
      ))}
    </MantineBreadcrumbs>
  );
}
