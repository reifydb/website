import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/components/layout/root-layout';
import { LandingPage } from '@/pages/landing';
import { ContactPage } from '@/pages/contact';
import { SupportPage } from '@/pages/support';
import { FaqPage } from '@/pages/faq';
import { ValuesPage } from '@/pages/company/values';
import { MissionPage } from '@/pages/company/mission';
import { DocsGate } from '@/components/docs-gate';
import { BlogListingPage, BlogPostPage } from '@/pages/blog';
import { ExamplesPage } from '@/pages/examples';
import { TourPage } from '@/pages/tour';
import { PlaygroundPage } from '@/pages/playground';
import { NotFoundPage } from '@/pages/not-found';
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
  // Blob module
  BlobModuleOverviewPage,
  BlobB58Page,
  BlobB64Page,
  BlobB64urlPage,
  BlobHexPage,
  BlobUtf8Page,
  // Clock module
  ClockModuleOverviewPage,
  ClockNowPage,
  ClockSetPage,
  ClockAdvancePage,
  // Date module
  DateModuleOverviewPage,
  DateYearPage,
  DateMonthPage,
  DateDayPage,
  DateNowPage,
  DateAddPage,
  DateDiffPage,
  DateFormatPage,
  DateDayOfYearPage,
  DateDayOfWeekPage,
  DateQuarterPage,
  DateWeekPage,
  DateIsLeapYearPage,
  DateDaysInMonthPage,
  DateEndOfMonthPage,
  DateStartOfMonthPage,
  DateStartOfYearPage,
  DateNewPage,
  DateSubtractPage,
  DateTruncPage,
  DateAgePage,
  // Datetime module
  DatetimeModuleOverviewPage,
  DatetimeYearPage,
  DatetimeMonthPage,
  DatetimeDayPage,
  DatetimeHourPage,
  DatetimeMinutePage,
  DatetimeSecondPage,
  DatetimeNanosecondPage,
  DatetimeDayOfYearPage,
  DatetimeDayOfWeekPage,
  DatetimeQuarterPage,
  DatetimeWeekPage,
  DatetimeDatePage,
  DatetimeTimePage,
  DatetimeEpochPage,
  DatetimeEpochMillisPage,
  DatetimeNewPage,
  DatetimeNowPage,
  DatetimeFromEpochPage,
  DatetimeFromEpochMillisPage,
  DatetimeAddPage,
  DatetimeSubtractPage,
  DatetimeDiffPage,
  DatetimeTruncPage,
  DatetimeAgePage,
  DatetimeFormatPage,
  // Duration module
  DurationModuleOverviewPage,
  DurationYearsPage,
  DurationMonthsPage,
  DurationWeeksPage,
  DurationDaysPage,
  DurationHoursPage,
  DurationMinutesPage,
  DurationSecondsPage,
  DurationMillisPage,
  DurationGetMonthsPage,
  DurationGetDaysPage,
  DurationGetNanosPage,
  DurationAddPage,
  DurationSubtractPage,
  DurationNegatePage,
  DurationScalePage,
  DurationTruncPage,
  DurationFormatPage,
  // Identity module
  IdentityModuleOverviewPage,
  IdentityIdPage,
  // Is module
  IsModuleOverviewPage,
  IsSomePage,
  IsNonePage,
  IsTypePage,
  IsRootPage,
  IsAnonymousPage,
  // Math module
  MathModuleOverviewPage,
  MathSumPage,
  MathAvgPage,
  MathMinPage,
  MathMaxPage,
  MathAbsPage,
  MathRoundPage,
  MathFloorPage,
  MathCeilPage,
  MathPowerPage,
  MathAcosPage,
  MathAsinPage,
  MathAtanPage,
  MathAtan2Page,
  MathClampPage,
  MathCosPage,
  MathEPage,
  MathExpPage,
  MathGcdPage,
  MathLcmPage,
  MathLogPage,
  MathLog10Page,
  MathLog2Page,
  MathModPage,
  MathPiPage,
  MathSignPage,
  MathSinPage,
  MathSqrtPage,
  MathTanPage,
  MathTruncatePage,
  // Meta module
  MetaModuleOverviewPage,
  MetaTypePage,
  // Text module
  TextModuleOverviewPage,
  TextLowerPage,
  TextUpperPage,
  TextTrimPage,
  TextLengthPage,
  TextConcatPage,
  TextSubstringPage,
  TextAsciiPage,
  TextCharPage,
  TextContainsPage,
  TextCountPage,
  TextEndsWithPage,
  TextIndexOfPage,
  TextPadLeftPage,
  TextPadRightPage,
  TextRepeatPage,
  TextReplacePage,
  TextReversePage,
  TextStartsWithPage,
  TextTrimEndPage,
  TextTrimStartPage,
  TextFormatBytesPage,
  TextFormatBytesSiPage,
  // Time module
  TimeModuleOverviewPage,
  TimeHourPage,
  TimeMinutePage,
  TimeSecondPage,
  TimeNanosecondPage,
  TimeNewPage,
  TimeNowPage,
  TimeAddPage,
  TimeSubtractPage,
  TimeDiffPage,
  TimeTruncPage,
  TimeAgePage,
  TimeFormatPage,
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
      // Blob module
      {
        path: '/docs/functions/blob',
        element: <DocsGate><BlobModuleOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/functions/blob/b58',
        element: <DocsGate><BlobB58Page /></DocsGate>,
      },
      {
        path: '/docs/functions/blob/b64',
        element: <DocsGate><BlobB64Page /></DocsGate>,
      },
      {
        path: '/docs/functions/blob/b64url',
        element: <DocsGate><BlobB64urlPage /></DocsGate>,
      },
      {
        path: '/docs/functions/blob/hex',
        element: <DocsGate><BlobHexPage /></DocsGate>,
      },
      {
        path: '/docs/functions/blob/utf8',
        element: <DocsGate><BlobUtf8Page /></DocsGate>,
      },
      // Clock module
      {
        path: '/docs/functions/clock',
        element: <DocsGate><ClockModuleOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/functions/clock/now',
        element: <DocsGate><ClockNowPage /></DocsGate>,
      },
      {
        path: '/docs/functions/clock/set',
        element: <DocsGate><ClockSetPage /></DocsGate>,
      },
      {
        path: '/docs/functions/clock/advance',
        element: <DocsGate><ClockAdvancePage /></DocsGate>,
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
      {
        path: '/docs/functions/date/day_of_year',
        element: <DocsGate><DateDayOfYearPage /></DocsGate>,
      },
      {
        path: '/docs/functions/date/day_of_week',
        element: <DocsGate><DateDayOfWeekPage /></DocsGate>,
      },
      {
        path: '/docs/functions/date/quarter',
        element: <DocsGate><DateQuarterPage /></DocsGate>,
      },
      {
        path: '/docs/functions/date/week',
        element: <DocsGate><DateWeekPage /></DocsGate>,
      },
      {
        path: '/docs/functions/date/is_leap_year',
        element: <DocsGate><DateIsLeapYearPage /></DocsGate>,
      },
      {
        path: '/docs/functions/date/days_in_month',
        element: <DocsGate><DateDaysInMonthPage /></DocsGate>,
      },
      {
        path: '/docs/functions/date/end_of_month',
        element: <DocsGate><DateEndOfMonthPage /></DocsGate>,
      },
      {
        path: '/docs/functions/date/start_of_month',
        element: <DocsGate><DateStartOfMonthPage /></DocsGate>,
      },
      {
        path: '/docs/functions/date/start_of_year',
        element: <DocsGate><DateStartOfYearPage /></DocsGate>,
      },
      {
        path: '/docs/functions/date/new',
        element: <DocsGate><DateNewPage /></DocsGate>,
      },
      {
        path: '/docs/functions/date/subtract',
        element: <DocsGate><DateSubtractPage /></DocsGate>,
      },
      {
        path: '/docs/functions/date/trunc',
        element: <DocsGate><DateTruncPage /></DocsGate>,
      },
      {
        path: '/docs/functions/date/age',
        element: <DocsGate><DateAgePage /></DocsGate>,
      },
      // Datetime module
      {
        path: '/docs/functions/datetime',
        element: <DocsGate><DatetimeModuleOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/functions/datetime/year',
        element: <DocsGate><DatetimeYearPage /></DocsGate>,
      },
      {
        path: '/docs/functions/datetime/month',
        element: <DocsGate><DatetimeMonthPage /></DocsGate>,
      },
      {
        path: '/docs/functions/datetime/day',
        element: <DocsGate><DatetimeDayPage /></DocsGate>,
      },
      {
        path: '/docs/functions/datetime/hour',
        element: <DocsGate><DatetimeHourPage /></DocsGate>,
      },
      {
        path: '/docs/functions/datetime/minute',
        element: <DocsGate><DatetimeMinutePage /></DocsGate>,
      },
      {
        path: '/docs/functions/datetime/second',
        element: <DocsGate><DatetimeSecondPage /></DocsGate>,
      },
      {
        path: '/docs/functions/datetime/nanosecond',
        element: <DocsGate><DatetimeNanosecondPage /></DocsGate>,
      },
      {
        path: '/docs/functions/datetime/day_of_year',
        element: <DocsGate><DatetimeDayOfYearPage /></DocsGate>,
      },
      {
        path: '/docs/functions/datetime/day_of_week',
        element: <DocsGate><DatetimeDayOfWeekPage /></DocsGate>,
      },
      {
        path: '/docs/functions/datetime/quarter',
        element: <DocsGate><DatetimeQuarterPage /></DocsGate>,
      },
      {
        path: '/docs/functions/datetime/week',
        element: <DocsGate><DatetimeWeekPage /></DocsGate>,
      },
      {
        path: '/docs/functions/datetime/date',
        element: <DocsGate><DatetimeDatePage /></DocsGate>,
      },
      {
        path: '/docs/functions/datetime/time',
        element: <DocsGate><DatetimeTimePage /></DocsGate>,
      },
      {
        path: '/docs/functions/datetime/epoch',
        element: <DocsGate><DatetimeEpochPage /></DocsGate>,
      },
      {
        path: '/docs/functions/datetime/epoch_millis',
        element: <DocsGate><DatetimeEpochMillisPage /></DocsGate>,
      },
      {
        path: '/docs/functions/datetime/new',
        element: <DocsGate><DatetimeNewPage /></DocsGate>,
      },
      {
        path: '/docs/functions/datetime/now',
        element: <DocsGate><DatetimeNowPage /></DocsGate>,
      },
      {
        path: '/docs/functions/datetime/from_epoch',
        element: <DocsGate><DatetimeFromEpochPage /></DocsGate>,
      },
      {
        path: '/docs/functions/datetime/from_epoch_millis',
        element: <DocsGate><DatetimeFromEpochMillisPage /></DocsGate>,
      },
      {
        path: '/docs/functions/datetime/add',
        element: <DocsGate><DatetimeAddPage /></DocsGate>,
      },
      {
        path: '/docs/functions/datetime/subtract',
        element: <DocsGate><DatetimeSubtractPage /></DocsGate>,
      },
      {
        path: '/docs/functions/datetime/diff',
        element: <DocsGate><DatetimeDiffPage /></DocsGate>,
      },
      {
        path: '/docs/functions/datetime/trunc',
        element: <DocsGate><DatetimeTruncPage /></DocsGate>,
      },
      {
        path: '/docs/functions/datetime/age',
        element: <DocsGate><DatetimeAgePage /></DocsGate>,
      },
      {
        path: '/docs/functions/datetime/format',
        element: <DocsGate><DatetimeFormatPage /></DocsGate>,
      },
      // Duration module
      {
        path: '/docs/functions/duration',
        element: <DocsGate><DurationModuleOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/functions/duration/years',
        element: <DocsGate><DurationYearsPage /></DocsGate>,
      },
      {
        path: '/docs/functions/duration/months',
        element: <DocsGate><DurationMonthsPage /></DocsGate>,
      },
      {
        path: '/docs/functions/duration/weeks',
        element: <DocsGate><DurationWeeksPage /></DocsGate>,
      },
      {
        path: '/docs/functions/duration/days',
        element: <DocsGate><DurationDaysPage /></DocsGate>,
      },
      {
        path: '/docs/functions/duration/hours',
        element: <DocsGate><DurationHoursPage /></DocsGate>,
      },
      {
        path: '/docs/functions/duration/minutes',
        element: <DocsGate><DurationMinutesPage /></DocsGate>,
      },
      {
        path: '/docs/functions/duration/seconds',
        element: <DocsGate><DurationSecondsPage /></DocsGate>,
      },
      {
        path: '/docs/functions/duration/millis',
        element: <DocsGate><DurationMillisPage /></DocsGate>,
      },
      {
        path: '/docs/functions/duration/get_months',
        element: <DocsGate><DurationGetMonthsPage /></DocsGate>,
      },
      {
        path: '/docs/functions/duration/get_days',
        element: <DocsGate><DurationGetDaysPage /></DocsGate>,
      },
      {
        path: '/docs/functions/duration/get_nanos',
        element: <DocsGate><DurationGetNanosPage /></DocsGate>,
      },
      {
        path: '/docs/functions/duration/add',
        element: <DocsGate><DurationAddPage /></DocsGate>,
      },
      {
        path: '/docs/functions/duration/subtract',
        element: <DocsGate><DurationSubtractPage /></DocsGate>,
      },
      {
        path: '/docs/functions/duration/negate',
        element: <DocsGate><DurationNegatePage /></DocsGate>,
      },
      {
        path: '/docs/functions/duration/scale',
        element: <DocsGate><DurationScalePage /></DocsGate>,
      },
      {
        path: '/docs/functions/duration/trunc',
        element: <DocsGate><DurationTruncPage /></DocsGate>,
      },
      {
        path: '/docs/functions/duration/format',
        element: <DocsGate><DurationFormatPage /></DocsGate>,
      },
      // Identity module
      {
        path: '/docs/functions/identity',
        element: <DocsGate><IdentityModuleOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/functions/identity/id',
        element: <DocsGate><IdentityIdPage /></DocsGate>,
      },
      // Is module
      {
        path: '/docs/functions/is',
        element: <DocsGate><IsModuleOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/functions/is/some',
        element: <DocsGate><IsSomePage /></DocsGate>,
      },
      {
        path: '/docs/functions/is/none',
        element: <DocsGate><IsNonePage /></DocsGate>,
      },
      {
        path: '/docs/functions/is/type',
        element: <DocsGate><IsTypePage /></DocsGate>,
      },
      {
        path: '/docs/functions/is/root',
        element: <DocsGate><IsRootPage /></DocsGate>,
      },
      {
        path: '/docs/functions/is/anonymous',
        element: <DocsGate><IsAnonymousPage /></DocsGate>,
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
      {
        path: '/docs/functions/math/acos',
        element: <DocsGate><MathAcosPage /></DocsGate>,
      },
      {
        path: '/docs/functions/math/asin',
        element: <DocsGate><MathAsinPage /></DocsGate>,
      },
      {
        path: '/docs/functions/math/atan',
        element: <DocsGate><MathAtanPage /></DocsGate>,
      },
      {
        path: '/docs/functions/math/atan2',
        element: <DocsGate><MathAtan2Page /></DocsGate>,
      },
      {
        path: '/docs/functions/math/clamp',
        element: <DocsGate><MathClampPage /></DocsGate>,
      },
      {
        path: '/docs/functions/math/cos',
        element: <DocsGate><MathCosPage /></DocsGate>,
      },
      {
        path: '/docs/functions/math/e',
        element: <DocsGate><MathEPage /></DocsGate>,
      },
      {
        path: '/docs/functions/math/exp',
        element: <DocsGate><MathExpPage /></DocsGate>,
      },
      {
        path: '/docs/functions/math/gcd',
        element: <DocsGate><MathGcdPage /></DocsGate>,
      },
      {
        path: '/docs/functions/math/lcm',
        element: <DocsGate><MathLcmPage /></DocsGate>,
      },
      {
        path: '/docs/functions/math/log',
        element: <DocsGate><MathLogPage /></DocsGate>,
      },
      {
        path: '/docs/functions/math/log10',
        element: <DocsGate><MathLog10Page /></DocsGate>,
      },
      {
        path: '/docs/functions/math/log2',
        element: <DocsGate><MathLog2Page /></DocsGate>,
      },
      {
        path: '/docs/functions/math/mod',
        element: <DocsGate><MathModPage /></DocsGate>,
      },
      {
        path: '/docs/functions/math/pi',
        element: <DocsGate><MathPiPage /></DocsGate>,
      },
      {
        path: '/docs/functions/math/sign',
        element: <DocsGate><MathSignPage /></DocsGate>,
      },
      {
        path: '/docs/functions/math/sin',
        element: <DocsGate><MathSinPage /></DocsGate>,
      },
      {
        path: '/docs/functions/math/sqrt',
        element: <DocsGate><MathSqrtPage /></DocsGate>,
      },
      {
        path: '/docs/functions/math/tan',
        element: <DocsGate><MathTanPage /></DocsGate>,
      },
      {
        path: '/docs/functions/math/truncate',
        element: <DocsGate><MathTruncatePage /></DocsGate>,
      },
      // Meta module
      {
        path: '/docs/functions/meta',
        element: <DocsGate><MetaModuleOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/functions/meta/type',
        element: <DocsGate><MetaTypePage /></DocsGate>,
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
        path: '/docs/functions/text/ascii',
        element: <DocsGate><TextAsciiPage /></DocsGate>,
      },
      {
        path: '/docs/functions/text/char',
        element: <DocsGate><TextCharPage /></DocsGate>,
      },
      {
        path: '/docs/functions/text/contains',
        element: <DocsGate><TextContainsPage /></DocsGate>,
      },
      {
        path: '/docs/functions/text/count',
        element: <DocsGate><TextCountPage /></DocsGate>,
      },
      {
        path: '/docs/functions/text/ends_with',
        element: <DocsGate><TextEndsWithPage /></DocsGate>,
      },
      {
        path: '/docs/functions/text/index_of',
        element: <DocsGate><TextIndexOfPage /></DocsGate>,
      },
      {
        path: '/docs/functions/text/pad_left',
        element: <DocsGate><TextPadLeftPage /></DocsGate>,
      },
      {
        path: '/docs/functions/text/pad_right',
        element: <DocsGate><TextPadRightPage /></DocsGate>,
      },
      {
        path: '/docs/functions/text/repeat',
        element: <DocsGate><TextRepeatPage /></DocsGate>,
      },
      {
        path: '/docs/functions/text/replace',
        element: <DocsGate><TextReplacePage /></DocsGate>,
      },
      {
        path: '/docs/functions/text/reverse',
        element: <DocsGate><TextReversePage /></DocsGate>,
      },
      {
        path: '/docs/functions/text/starts_with',
        element: <DocsGate><TextStartsWithPage /></DocsGate>,
      },
      {
        path: '/docs/functions/text/trim_end',
        element: <DocsGate><TextTrimEndPage /></DocsGate>,
      },
      {
        path: '/docs/functions/text/trim_start',
        element: <DocsGate><TextTrimStartPage /></DocsGate>,
      },
      {
        path: '/docs/functions/text/format_bytes',
        element: <DocsGate><TextFormatBytesPage /></DocsGate>,
      },
      {
        path: '/docs/functions/text/format_bytes_si',
        element: <DocsGate><TextFormatBytesSiPage /></DocsGate>,
      },
      // Time module
      {
        path: '/docs/functions/time',
        element: <DocsGate><TimeModuleOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/functions/time/hour',
        element: <DocsGate><TimeHourPage /></DocsGate>,
      },
      {
        path: '/docs/functions/time/minute',
        element: <DocsGate><TimeMinutePage /></DocsGate>,
      },
      {
        path: '/docs/functions/time/second',
        element: <DocsGate><TimeSecondPage /></DocsGate>,
      },
      {
        path: '/docs/functions/time/nanosecond',
        element: <DocsGate><TimeNanosecondPage /></DocsGate>,
      },
      {
        path: '/docs/functions/time/new',
        element: <DocsGate><TimeNewPage /></DocsGate>,
      },
      {
        path: '/docs/functions/time/now',
        element: <DocsGate><TimeNowPage /></DocsGate>,
      },
      {
        path: '/docs/functions/time/add',
        element: <DocsGate><TimeAddPage /></DocsGate>,
      },
      {
        path: '/docs/functions/time/subtract',
        element: <DocsGate><TimeSubtractPage /></DocsGate>,
      },
      {
        path: '/docs/functions/time/diff',
        element: <DocsGate><TimeDiffPage /></DocsGate>,
      },
      {
        path: '/docs/functions/time/trunc',
        element: <DocsGate><TimeTruncPage /></DocsGate>,
      },
      {
        path: '/docs/functions/time/age',
        element: <DocsGate><TimeAgePage /></DocsGate>,
      },
      {
        path: '/docs/functions/time/format',
        element: <DocsGate><TimeFormatPage /></DocsGate>,
      },
      {
        path: '/examples',
        element: <ExamplesPage />,
      },
      {
        path: '/tour',
        element: <TourPage />,
      },
      {
        path: '/blog',
        element: <BlogListingPage />,
      },
      {
        path: '/blog/:slug',
        element: <BlogPostPage />,
      },
      {
        path: '/playground',
        element: <PlaygroundPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
