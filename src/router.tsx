import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '@/components/layout/root-layout';
import { LandingPage } from '@/pages/landing';
import { ContactPage } from '@/pages/contact';
import { SupportPage } from '@/pages/support';
import { DocsGate } from '@/components/docs-gate';
import {
  DocsOverview,
  InstallationPage,
  QuickStartPage,
  RqlBasicsPage,
  RqlTransformsPage,
  RqlExpressionsPage,
  FilterPage,
  SortPage,
  OperatorsPage,
  FunctionsOverviewPage,
  TextFunctionsPage,
  MathFunctionsPage,
  DateFunctionsPage,
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
        element: <DocsGate><DocsOverview /></DocsGate>,
      },
      {
        path: '/docs/installation',
        element: <DocsGate><InstallationPage /></DocsGate>,
      },
      {
        path: '/docs/quick-start',
        element: <DocsGate><QuickStartPage /></DocsGate>,
      },
      {
        path: '/docs/rql/basics',
        element: <DocsGate><RqlBasicsPage /></DocsGate>,
      },
      {
        path: '/docs/rql/transforms',
        element: <DocsGate><RqlTransformsPage /></DocsGate>,
      },
      {
        path: '/docs/rql/expressions',
        element: <DocsGate><RqlExpressionsPage /></DocsGate>,
      },
      {
        path: '/docs/rql/transforms/filter',
        element: <DocsGate><FilterPage /></DocsGate>,
      },
      {
        path: '/docs/rql/transforms/sort',
        element: <DocsGate><SortPage /></DocsGate>,
      },
      {
        path: '/docs/rql/expressions/operators',
        element: <DocsGate><OperatorsPage /></DocsGate>,
      },
      {
        path: '/docs/functions',
        element: <DocsGate><FunctionsOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/functions/text',
        element: <DocsGate><TextFunctionsPage /></DocsGate>,
      },
      {
        path: '/docs/functions/math',
        element: <DocsGate><MathFunctionsPage /></DocsGate>,
      },
      {
        path: '/docs/functions/date',
        element: <DocsGate><DateFunctionsPage /></DocsGate>,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
