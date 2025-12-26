import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '@/components/layout/root-layout';
import { LandingPage } from '@/pages/landing';
import { ContactPage } from '@/pages/contact';
import { SupportPage } from '@/pages/support';
import {
  DocsOverview,
  InstallationPage,
  QuickStartPage,
  RqlBasicsPage,
  RqlTransformsPage,
  RqlExpressionsPage,
} from '@/pages/docs';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/contact',
        element: <ContactPage />,
      },
      {
        path: '/support',
        element: <SupportPage />,
      },
      {
        path: '/docs',
        element: <DocsOverview />,
      },
      {
        path: '/docs/installation',
        element: <InstallationPage />,
      },
      {
        path: '/docs/quick-start',
        element: <QuickStartPage />,
      },
      {
        path: '/docs/rql/basics',
        element: <RqlBasicsPage />,
      },
      {
        path: '/docs/rql/transforms',
        element: <RqlTransformsPage />,
      },
      {
        path: '/docs/rql/expressions',
        element: <RqlExpressionsPage />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
