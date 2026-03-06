"use client";

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {cn} from '@/lib/utils';
import {Book, FileText, LayoutDashboard, Landmark, Cog, MessageSquare} from 'lucide-react';

const navItems = [
  {name: 'Dashboard', href: '/', icon: LayoutDashboard},
  {name: 'Operations', href: '/operations', icon: Cog},
  {name: 'Public Ledger', href: '/ledger', icon: Landmark},
  {name: 'Constitution', href: '/constitution', icon: Book},
  {name: 'Manifesto', href: '/manifesto', icon: FileText},
  {name: 'Forum', href: '/forum', icon: MessageSquare},
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight text-primary shrink-0">
          <div className="w-7 h-7 bg-primary rounded-sm flex items-center justify-center text-primary-foreground text-sm">
            S
          </div>
          <span>SARVA</span>
        </Link>
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar ml-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-xs font-medium transition-colors hover:text-primary flex items-center gap-1.5 whitespace-nowrap",
                pathname === item.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="w-3.5 h-3.5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
