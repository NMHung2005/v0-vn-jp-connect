import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['vi', 'ja'],
  defaultLocale: 'ja', // Default to Japanese as requested
  pathnames: {
    '/': '/',
    '/login': '/login',
    '/register': '/register',
    '/home': '/home',
    '/#': '/#',
  }
});

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
