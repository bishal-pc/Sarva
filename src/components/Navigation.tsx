"use client";

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {cn} from '@/lib/utils';
import {Book, FileText, LayoutDashboard, Landmark} from 'lucide-react';

const navItems = [
  {name: 'Dashboard', href: '/', icon: LayoutDashboard},
  {name: 'Public Ledger', href: '/ledger', icon: Landmark},
  {name: 'Constitution', href: '/constitution', icon: Book},
  {name: 'Manifesto', href: '/manifesto', icon: FileText},
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center text-primary-foreground">
            S
          </div>
          <span>SARVA</span>
        </Link>
        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary flex items-center gap-2",
                pathname === item.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
