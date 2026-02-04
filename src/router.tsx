import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '@/components/layout/root-layout';
import { LandingPage } from '@/pages/landing';
import { ContactPage } from '@/pages/contact';
import { SupportPage } from '@/pages/support';
import { FaqPage } from '@/pages/faq';
import { ValuesPage } from '@/pages/company/values';
import { MissionPage } from '@/pages/company/mission';
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
  // Date module
  DateModuleOverviewPage,
  DateYearPage,
  DateMonthPage,
  DateDayPage,
  DateHourPage,
  DateMinutePage,
  DateSecondPage,
  DateNowPage,
  DateAddPage,
  DateDiffPage,
  DateFormatPage,
  // Math module
  MathModuleOverviewPage,
  MathSumPage,
  MathAvgPage,
  MathMinPage,
  MathMaxPage,
  MathCountPage,
  MathAbsPage,
  MathRoundPage,
  MathFloorPage,
  MathCeilPage,
  MathPowerPage,
  // Text module
  TextModuleOverviewPage,
  TextLowerPage,
  TextUpperPage,
  TextTrimPage,
  TextLengthPage,
  TextConcatPage,
  TextSubstringPage,
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
        path: '/faq',
        element: <FaqPage />,
      },
      {
        path: '/company/values',
        element: <ValuesPage />,
      },
      {
        path: '/company/mission',
        element: <MissionPage />,
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
      // Date module
      {
        path: '/docs/functions/date',
        element: <DocsGate><DateModuleOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/functions/date/year',
        element: <DocsGate><DateYearPage /></DocsGate>,
      },
      {
        path: '/docs/functions/date/month',
        element: <DocsGate><DateMonthPage /></DocsGate>,
      },
      {
        path: '/docs/functions/date/day',
        element: <DocsGate><DateDayPage /></DocsGate>,
      },
      {
        path: '/docs/functions/date/hour',
        element: <DocsGate><DateHourPage /></DocsGate>,
      },
      {
        path: '/docs/functions/date/minute',
        element: <DocsGate><DateMinutePage /></DocsGate>,
      },
      {
        path: '/docs/functions/date/second',
        element: <DocsGate><DateSecondPage /></DocsGate>,
      },
      {
        path: '/docs/functions/date/now',
        element: <DocsGate><DateNowPage /></DocsGate>,
      },
      {
        path: '/docs/functions/date/add',
        element: <DocsGate><DateAddPage /></DocsGate>,
      },
      {
        path: '/docs/functions/date/diff',
        element: <DocsGate><DateDiffPage /></DocsGate>,
      },
      {
        path: '/docs/functions/date/format',
        element: <DocsGate><DateFormatPage /></DocsGate>,
      },
      // Math module
      {
        path: '/docs/functions/math',
        element: <DocsGate><MathModuleOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/functions/math/sum',
        element: <DocsGate><MathSumPage /></DocsGate>,
      },
      {
        path: '/docs/functions/math/avg',
        element: <DocsGate><MathAvgPage /></DocsGate>,
      },
      {
        path: '/docs/functions/math/min',
        element: <DocsGate><MathMinPage /></DocsGate>,
      },
      {
        path: '/docs/functions/math/max',
        element: <DocsGate><MathMaxPage /></DocsGate>,
      },
      {
        path: '/docs/functions/math/count',
        element: <DocsGate><MathCountPage /></DocsGate>,
      },
      {
        path: '/docs/functions/math/abs',
        element: <DocsGate><MathAbsPage /></DocsGate>,
      },
      {
        path: '/docs/functions/math/round',
        element: <DocsGate><MathRoundPage /></DocsGate>,
      },
      {
        path: '/docs/functions/math/floor',
        element: <DocsGate><MathFloorPage /></DocsGate>,
      },
      {
        path: '/docs/functions/math/ceil',
        element: <DocsGate><MathCeilPage /></DocsGate>,
      },
      {
        path: '/docs/functions/math/power',
        element: <DocsGate><MathPowerPage /></DocsGate>,
      },
      // Text module
      {
        path: '/docs/functions/text',
        element: <DocsGate><TextModuleOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/functions/text/lower',
        element: <DocsGate><TextLowerPage /></DocsGate>,
      },
      {
        path: '/docs/functions/text/upper',
        element: <DocsGate><TextUpperPage /></DocsGate>,
      },
      {
        path: '/docs/functions/text/trim',
        element: <DocsGate><TextTrimPage /></DocsGate>,
      },
      {
        path: '/docs/functions/text/length',
        element: <DocsGate><TextLengthPage /></DocsGate>,
      },
      {
        path: '/docs/functions/text/concat',
        element: <DocsGate><TextConcatPage /></DocsGate>,
      },
      {
        path: '/docs/functions/text/substring',
        element: <DocsGate><TextSubstringPage /></DocsGate>,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
