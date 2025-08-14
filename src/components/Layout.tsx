import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Bell, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const navItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Documents', path: '/documents' },
  { name: 'Versions', path: '/versions' },
  { name: 'Workflows', path: '/workflows' },
  { name: 'AI Assistant', path: '/ai-assistant' },
];

export default function Layout() {
  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-6">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <div className="text-sm font-bold">TD</div>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-foreground">TeleDoc AI</h1>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs px-2 py-0.5">
                Intelligent Standards Management
              </Badge>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <div className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full"></div>
            </Button>
            <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              New Standard
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t">
          <nav className="flex overflow-x-auto px-4 py-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex-shrink-0 px-3 py-2 text-sm font-medium rounded-md transition-colors mr-2 ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}