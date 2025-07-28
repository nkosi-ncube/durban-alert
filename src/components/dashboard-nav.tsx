'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Users,
  ShieldAlert,
  CalendarClock,
  MessageCircleWarning,
  Settings,
} from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { href: '/dashboard/risk-analysis', label: 'Risk Analysis', icon: ShieldAlert },
  { href: '/dashboard/weekly-summary', label: 'Weekly Summary', icon: CalendarClock },
  { href: '/dashboard/users', label: 'Users', icon: Users },
  { href: '/dashboard/alerts', label: 'Alert Log', icon: MessageCircleWarning },
  { href: '/dashboard/configure-twilio', label: 'Configure Twilio', icon: Settings },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} passHref legacyBehavior>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              tooltip={{ children: item.label }}
            >
              <a>
                <item.icon />
                <span>{item.label}</span>
              </a>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
