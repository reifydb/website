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
import { PitchPage } from '@/pages/pitch';
import { PlaygroundPage } from '@/pages/playground';
import { IoTFarmingPage } from '@/pages/use-cases/iot-farming';
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
  MapPage,
  ExtendPage,
  AggregatePage,
  DistinctPage,
  TakePage,
  JoinPage,
  MatchPage,
  PatchPage,
  OperatorsPage,
  ConditionalsPage,
  LiteralsPage,
  FieldAccessPage,
  PaginationPage,
  HierarchicalDataPage,
  TimeSeriesPage,
  TextSearchPage,
  DynamicQueriesPage,
  // Architecture
  ArchitectureOverviewPage,
  VolcanoPage,
  TypesPage,
  ArchitectureStorageEnginePage,
  IncrementalMaintenancePage,
  TransactionEnginePage,
  WireProtocolPage,
  // Scripting
  ScriptingOverviewPage,
  NamespacesPage,
  TablesPage,
  EnumsPage,
  DictionariesPage,
  DropPage,
  ConstraintsPage,
  IndexesPage,
  StorageTablesPage,
  RingbuffersPage,
  SeriesPage,
  DmlInsertPage,
  DmlUpdatePage,
  DmlDeletePage,
  UpsertPage,
  BatchOperationsPage,
  ViewsOverviewPage,
  DeferredViewsPage,
  TransactionalViewsPage,
  ProceduresOverviewPage,
  ControlFlowPage,
  EventsOverviewPage,
  HandlersPage,
  DispatchPage,
  TestingOverviewPage,
  MigrationsOverviewPage,
  SubscriptionsOverviewPage,
  AccessControlOverviewPage,
  // Tutorials
  FirstAppPage,
  LiveDashboardPage,
  RealTimeChatPage,
  TaskManagerPage,
  // Coming From
  ComingFromSqlPage,
  ComingFromMongoPage,
  ComingFromRedisPage,
  ComingFromFirebasePage,
  // Concepts
  ConceptsOverviewPage,
  DataModelPage,
  ConceptsNamespacesPage,
  MaterializedViewsPage,
  RealTimeSubscriptionsPage,
  StorageEnginesPage,
  ConsistencyModelPage,
  EmbeddedVsServerPage,
  // Guides
  GuidesOverviewPage,
  UsersAuthGuidePage,
  ECommerceGuidePage,
  IoTGuidePage,
  CmsGuidePage,
  MultiTenancyGuidePage,
  RelationshipsGuidePage,
  LiveQueriesGuidePage,
  ReactiveViewsGuidePage,
  EventSourcingGuidePage,
  NotificationsGuidePage,
  UnitTestingGuidePage,
  IntegrationTestingGuidePage,
  FixturesGuidePage,
  SoftDeletesGuidePage,
  AuditTrailGuidePage,
  StateMachinesGuidePage,
  CqrsGuidePage,
  ComputedFieldsGuidePage,
  DataVersioningGuidePage,
  // Client SDKs
  SdksOverviewPage,
  TsQuickStartPage,
  TsConnectionPage,
  TsQueriesPage,
  TsMutationsPage,
  TsSubscriptionsPage,
  TsTransactionsPage,
  TsTypeSafetyPage,
  TsErrorHandlingPage,
  TsApiReferencePage,
  RustQuickStartPage,
  RustEmbeddedPage,
  RustClientPage,
  RustApiReferencePage,
  PythonQuickStartPage,
  PythonConnectionPage,
  PythonQueriesPage,
  PythonApiReferencePage,
  GoQuickStartPage,
  GoConnectionPage,
  GoQueriesPage,
  GoApiReferencePage,
  // Security
  SecurityOverviewPage,
  AuthenticationPage,
  AuthorizationPage,
  RowLevelSecurityPage,
  EncryptionPage,
  AuditLoggingPage,
  TlsPage,
  // Operations
  StandalonePage,
  EmbeddedDeploymentPage,
  DockerPage,
  KubernetesPage,
  SystemdPage,
  BackupOverviewPage,
  SnapshotsPage,
  PointInTimePage,
  MonitoringOverviewPage,
  MetricsPage,
  LoggingPage,
  HealthChecksPage,
  UpgradesPage,
  ScalingPage,
  // Performance
  PerformanceOverviewPage,
  QueryOptimizationPage,
  IndexingStrategiesPage,
  ExplainPage,
  ViewTuningPage,
  MemoryManagementPage,
  BenchmarksPage,
  // Tools
  CliOverviewPage,
  CliCommandsPage,
  CliScriptingPage,
  ConsoleOverviewPage,
  QueryEditorPage,
  SchemaBrowserPage,
  ToolsPlaygroundPage,
  // Integrations
  IntegrationsOverviewPage,
  HttpApiOverviewPage,
  HttpApiAuthPage,
  HttpApiQueryPage,
  HttpApiMutationPage,
  HttpApiSubscriptionPage,
  HttpApiErrorsPage,
  WebhooksPage,
  CdcPage,
  ReactIntegrationPage,
  NextjsIntegrationPage,
  SvelteIntegrationPage,
  // Troubleshooting
  TroubleshootingOverviewPage,
  CommonErrorsPage,
  ConnectionIssuesPage,
  SlowQueriesPage,
  TransactionConflictsPage,
  ViewIssuesPage,
  FaqDocsPage,
  // Resources
  ChangelogPage,
  RoadmapPage,
  GlossaryPage,
  ContributingPage,
  CommunityPage,
  ReleaseNotesPage,
  // Functions
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
  // JSON module
  JsonModuleOverviewPage,
  JsonArrayPage,
  JsonObjectPage,
  JsonSerializePage,
  JsonPrettyPage,
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
      // ─── Getting Started ────────────────────────────────
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
      // Tutorials
      {
        path: '/docs/tutorials/first-app',
        element: <DocsGate><FirstAppPage /></DocsGate>,
      },
      {
        path: '/docs/tutorials/live-dashboard',
        element: <DocsGate><LiveDashboardPage /></DocsGate>,
      },
      {
        path: '/docs/tutorials/real-time-chat',
        element: <DocsGate><RealTimeChatPage /></DocsGate>,
      },
      {
        path: '/docs/tutorials/task-manager',
        element: <DocsGate><TaskManagerPage /></DocsGate>,
      },
      // Coming From
      {
        path: '/docs/coming-from/sql',
        element: <DocsGate><ComingFromSqlPage /></DocsGate>,
      },
      {
        path: '/docs/coming-from/mongodb',
        element: <DocsGate><ComingFromMongoPage /></DocsGate>,
      },
      {
        path: '/docs/coming-from/redis',
        element: <DocsGate><ComingFromRedisPage /></DocsGate>,
      },
      {
        path: '/docs/coming-from/firebase',
        element: <DocsGate><ComingFromFirebasePage /></DocsGate>,
      },
      // ─── Concepts ───────────────────────────────────────
      {
        path: '/docs/concepts',
        element: <DocsGate><ConceptsOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/concepts/data-model',
        element: <DocsGate><DataModelPage /></DocsGate>,
      },
      {
        path: '/docs/concepts/namespaces',
        element: <DocsGate><ConceptsNamespacesPage /></DocsGate>,
      },
      {
        path: '/docs/concepts/materialized-views',
        element: <DocsGate><MaterializedViewsPage /></DocsGate>,
      },
      {
        path: '/docs/concepts/real-time',
        element: <DocsGate><RealTimeSubscriptionsPage /></DocsGate>,
      },
      {
        path: '/docs/concepts/storage-engines',
        element: <DocsGate><StorageEnginesPage /></DocsGate>,
      },
      {
        path: '/docs/concepts/consistency',
        element: <DocsGate><ConsistencyModelPage /></DocsGate>,
      },
      {
        path: '/docs/concepts/embedded-vs-server',
        element: <DocsGate><EmbeddedVsServerPage /></DocsGate>,
      },
      // ─── RQL ────────────────────────────────────────────
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
        path: '/docs/rql/transforms/map',
        element: <DocsGate><MapPage /></DocsGate>,
      },
      {
        path: '/docs/rql/transforms/extend',
        element: <DocsGate><ExtendPage /></DocsGate>,
      },
      {
        path: '/docs/rql/transforms/aggregate',
        element: <DocsGate><AggregatePage /></DocsGate>,
      },
      {
        path: '/docs/rql/transforms/distinct',
        element: <DocsGate><DistinctPage /></DocsGate>,
      },
      {
        path: '/docs/rql/transforms/take',
        element: <DocsGate><TakePage /></DocsGate>,
      },
      {
        path: '/docs/rql/transforms/join',
        element: <DocsGate><JoinPage /></DocsGate>,
      },
      {
        path: '/docs/rql/transforms/match',
        element: <DocsGate><MatchPage /></DocsGate>,
      },
      {
        path: '/docs/rql/transforms/patch',
        element: <DocsGate><PatchPage /></DocsGate>,
      },
      {
        path: '/docs/rql/expressions/operators',
        element: <DocsGate><OperatorsPage /></DocsGate>,
      },
      {
        path: '/docs/rql/expressions/conditionals',
        element: <DocsGate><ConditionalsPage /></DocsGate>,
      },
      {
        path: '/docs/rql/expressions/literals',
        element: <DocsGate><LiteralsPage /></DocsGate>,
      },
      {
        path: '/docs/rql/expressions/field-access',
        element: <DocsGate><FieldAccessPage /></DocsGate>,
      },
      // RQL Patterns
      {
        path: '/docs/rql/patterns/pagination',
        element: <DocsGate><PaginationPage /></DocsGate>,
      },
      {
        path: '/docs/rql/patterns/hierarchical-data',
        element: <DocsGate><HierarchicalDataPage /></DocsGate>,
      },
      {
        path: '/docs/rql/patterns/time-series',
        element: <DocsGate><TimeSeriesPage /></DocsGate>,
      },
      {
        path: '/docs/rql/patterns/text-search',
        element: <DocsGate><TextSearchPage /></DocsGate>,
      },
      {
        path: '/docs/rql/patterns/dynamic-queries',
        element: <DocsGate><DynamicQueriesPage /></DocsGate>,
      },
      // ─── Scripting ──────────────────────────────────────
      {
        path: '/docs/scripting',
        element: <DocsGate><ScriptingOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/scripting/schema/namespaces',
        element: <DocsGate><NamespacesPage /></DocsGate>,
      },
      {
        path: '/docs/scripting/schema/tables',
        element: <DocsGate><TablesPage /></DocsGate>,
      },
      {
        path: '/docs/scripting/schema/enums',
        element: <DocsGate><EnumsPage /></DocsGate>,
      },
      {
        path: '/docs/scripting/schema/dictionaries',
        element: <DocsGate><DictionariesPage /></DocsGate>,
      },
      {
        path: '/docs/scripting/schema/drop',
        element: <DocsGate><DropPage /></DocsGate>,
      },
      {
        path: '/docs/scripting/schema/constraints',
        element: <DocsGate><ConstraintsPage /></DocsGate>,
      },
      {
        path: '/docs/scripting/schema/indexes',
        element: <DocsGate><IndexesPage /></DocsGate>,
      },
      {
        path: '/docs/scripting/storage/tables',
        element: <DocsGate><StorageTablesPage /></DocsGate>,
      },
      {
        path: '/docs/scripting/storage/ringbuffers',
        element: <DocsGate><RingbuffersPage /></DocsGate>,
      },
      {
        path: '/docs/scripting/storage/series',
        element: <DocsGate><SeriesPage /></DocsGate>,
      },
      {
        path: '/docs/scripting/dml/insert',
        element: <DocsGate><DmlInsertPage /></DocsGate>,
      },
      {
        path: '/docs/scripting/dml/update',
        element: <DocsGate><DmlUpdatePage /></DocsGate>,
      },
      {
        path: '/docs/scripting/dml/delete',
        element: <DocsGate><DmlDeletePage /></DocsGate>,
      },
      {
        path: '/docs/scripting/dml/upsert',
        element: <DocsGate><UpsertPage /></DocsGate>,
      },
      {
        path: '/docs/scripting/dml/batch',
        element: <DocsGate><BatchOperationsPage /></DocsGate>,
      },
      {
        path: '/docs/scripting/views',
        element: <DocsGate><ViewsOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/scripting/views/deferred',
        element: <DocsGate><DeferredViewsPage /></DocsGate>,
      },
      {
        path: '/docs/scripting/views/transactional',
        element: <DocsGate><TransactionalViewsPage /></DocsGate>,
      },
      {
        path: '/docs/scripting/procedures',
        element: <DocsGate><ProceduresOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/scripting/procedures/control-flow',
        element: <DocsGate><ControlFlowPage /></DocsGate>,
      },
      {
        path: '/docs/scripting/events',
        element: <DocsGate><EventsOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/scripting/events/handlers',
        element: <DocsGate><HandlersPage /></DocsGate>,
      },
      {
        path: '/docs/scripting/events/dispatch',
        element: <DocsGate><DispatchPage /></DocsGate>,
      },
      {
        path: '/docs/scripting/testing',
        element: <DocsGate><TestingOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/scripting/migrations',
        element: <DocsGate><MigrationsOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/scripting/subscriptions',
        element: <DocsGate><SubscriptionsOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/scripting/access-control',
        element: <DocsGate><AccessControlOverviewPage /></DocsGate>,
      },
      // ─── Guides ─────────────────────────────────────────
      {
        path: '/docs/guides',
        element: <DocsGate><GuidesOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/guides/modeling/users-auth',
        element: <DocsGate><UsersAuthGuidePage /></DocsGate>,
      },
      {
        path: '/docs/guides/modeling/e-commerce',
        element: <DocsGate><ECommerceGuidePage /></DocsGate>,
      },
      {
        path: '/docs/guides/modeling/iot',
        element: <DocsGate><IoTGuidePage /></DocsGate>,
      },
      {
        path: '/docs/guides/modeling/cms',
        element: <DocsGate><CmsGuidePage /></DocsGate>,
      },
      {
        path: '/docs/guides/modeling/multi-tenancy',
        element: <DocsGate><MultiTenancyGuidePage /></DocsGate>,
      },
      {
        path: '/docs/guides/modeling/relationships',
        element: <DocsGate><RelationshipsGuidePage /></DocsGate>,
      },
      {
        path: '/docs/guides/real-time/live-queries',
        element: <DocsGate><LiveQueriesGuidePage /></DocsGate>,
      },
      {
        path: '/docs/guides/real-time/reactive-views',
        element: <DocsGate><ReactiveViewsGuidePage /></DocsGate>,
      },
      {
        path: '/docs/guides/real-time/event-sourcing',
        element: <DocsGate><EventSourcingGuidePage /></DocsGate>,
      },
      {
        path: '/docs/guides/real-time/notifications',
        element: <DocsGate><NotificationsGuidePage /></DocsGate>,
      },
      {
        path: '/docs/guides/testing/unit-testing',
        element: <DocsGate><UnitTestingGuidePage /></DocsGate>,
      },
      {
        path: '/docs/guides/testing/integration-testing',
        element: <DocsGate><IntegrationTestingGuidePage /></DocsGate>,
      },
      {
        path: '/docs/guides/testing/fixtures',
        element: <DocsGate><FixturesGuidePage /></DocsGate>,
      },
      {
        path: '/docs/guides/patterns/soft-deletes',
        element: <DocsGate><SoftDeletesGuidePage /></DocsGate>,
      },
      {
        path: '/docs/guides/patterns/audit-trail',
        element: <DocsGate><AuditTrailGuidePage /></DocsGate>,
      },
      {
        path: '/docs/guides/patterns/state-machines',
        element: <DocsGate><StateMachinesGuidePage /></DocsGate>,
      },
      {
        path: '/docs/guides/patterns/cqrs',
        element: <DocsGate><CqrsGuidePage /></DocsGate>,
      },
      {
        path: '/docs/guides/patterns/computed-fields',
        element: <DocsGate><ComputedFieldsGuidePage /></DocsGate>,
      },
      {
        path: '/docs/guides/patterns/data-versioning',
        element: <DocsGate><DataVersioningGuidePage /></DocsGate>,
      },
      // ─── Client SDKs ───────────────────────────────────
      {
        path: '/docs/sdks',
        element: <DocsGate><SdksOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/sdks/typescript/quick-start',
        element: <DocsGate><TsQuickStartPage /></DocsGate>,
      },
      {
        path: '/docs/sdks/typescript/connection',
        element: <DocsGate><TsConnectionPage /></DocsGate>,
      },
      {
        path: '/docs/sdks/typescript/queries',
        element: <DocsGate><TsQueriesPage /></DocsGate>,
      },
      {
        path: '/docs/sdks/typescript/mutations',
        element: <DocsGate><TsMutationsPage /></DocsGate>,
      },
      {
        path: '/docs/sdks/typescript/subscriptions',
        element: <DocsGate><TsSubscriptionsPage /></DocsGate>,
      },
      {
        path: '/docs/sdks/typescript/transactions',
        element: <DocsGate><TsTransactionsPage /></DocsGate>,
      },
      {
        path: '/docs/sdks/typescript/type-safety',
        element: <DocsGate><TsTypeSafetyPage /></DocsGate>,
      },
      {
        path: '/docs/sdks/typescript/error-handling',
        element: <DocsGate><TsErrorHandlingPage /></DocsGate>,
      },
      {
        path: '/docs/sdks/typescript/api-reference',
        element: <DocsGate><TsApiReferencePage /></DocsGate>,
      },
      {
        path: '/docs/sdks/rust/quick-start',
        element: <DocsGate><RustQuickStartPage /></DocsGate>,
      },
      {
        path: '/docs/sdks/rust/embedded',
        element: <DocsGate><RustEmbeddedPage /></DocsGate>,
      },
      {
        path: '/docs/sdks/rust/client',
        element: <DocsGate><RustClientPage /></DocsGate>,
      },
      {
        path: '/docs/sdks/rust/api-reference',
        element: <DocsGate><RustApiReferencePage /></DocsGate>,
      },
      {
        path: '/docs/sdks/python/quick-start',
        element: <DocsGate><PythonQuickStartPage /></DocsGate>,
      },
      {
        path: '/docs/sdks/python/connection',
        element: <DocsGate><PythonConnectionPage /></DocsGate>,
      },
      {
        path: '/docs/sdks/python/queries',
        element: <DocsGate><PythonQueriesPage /></DocsGate>,
      },
      {
        path: '/docs/sdks/python/api-reference',
        element: <DocsGate><PythonApiReferencePage /></DocsGate>,
      },
      {
        path: '/docs/sdks/go/quick-start',
        element: <DocsGate><GoQuickStartPage /></DocsGate>,
      },
      {
        path: '/docs/sdks/go/connection',
        element: <DocsGate><GoConnectionPage /></DocsGate>,
      },
      {
        path: '/docs/sdks/go/queries',
        element: <DocsGate><GoQueriesPage /></DocsGate>,
      },
      {
        path: '/docs/sdks/go/api-reference',
        element: <DocsGate><GoApiReferencePage /></DocsGate>,
      },
      // ─── Architecture ──────────────────────────────────
      {
        path: '/docs/architecture',
        element: <DocsGate><ArchitectureOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/architecture/volcano',
        element: <DocsGate><VolcanoPage /></DocsGate>,
      },
      {
        path: '/docs/architecture/types',
        element: <DocsGate><TypesPage /></DocsGate>,
      },
      {
        path: '/docs/architecture/storage-engine',
        element: <DocsGate><ArchitectureStorageEnginePage /></DocsGate>,
      },
      {
        path: '/docs/architecture/incremental-maintenance',
        element: <DocsGate><IncrementalMaintenancePage /></DocsGate>,
      },
      {
        path: '/docs/architecture/transaction-engine',
        element: <DocsGate><TransactionEnginePage /></DocsGate>,
      },
      {
        path: '/docs/architecture/wire-protocol',
        element: <DocsGate><WireProtocolPage /></DocsGate>,
      },
      // ─── Security ──────────────────────────────────────
      {
        path: '/docs/security',
        element: <DocsGate><SecurityOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/security/authentication',
        element: <DocsGate><AuthenticationPage /></DocsGate>,
      },
      {
        path: '/docs/security/authorization',
        element: <DocsGate><AuthorizationPage /></DocsGate>,
      },
      {
        path: '/docs/security/row-level-security',
        element: <DocsGate><RowLevelSecurityPage /></DocsGate>,
      },
      {
        path: '/docs/security/encryption',
        element: <DocsGate><EncryptionPage /></DocsGate>,
      },
      {
        path: '/docs/security/audit-logging',
        element: <DocsGate><AuditLoggingPage /></DocsGate>,
      },
      {
        path: '/docs/security/tls',
        element: <DocsGate><TlsPage /></DocsGate>,
      },
      // ─── Operations ────────────────────────────────────
      {
        path: '/docs/operations/deployment/standalone',
        element: <DocsGate><StandalonePage /></DocsGate>,
      },
      {
        path: '/docs/operations/deployment/embedded',
        element: <DocsGate><EmbeddedDeploymentPage /></DocsGate>,
      },
      {
        path: '/docs/operations/deployment/docker',
        element: <DocsGate><DockerPage /></DocsGate>,
      },
      {
        path: '/docs/operations/deployment/kubernetes',
        element: <DocsGate><KubernetesPage /></DocsGate>,
      },
      {
        path: '/docs/operations/deployment/systemd',
        element: <DocsGate><SystemdPage /></DocsGate>,
      },
      {
        path: '/docs/operations/backup',
        element: <DocsGate><BackupOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/operations/backup/snapshots',
        element: <DocsGate><SnapshotsPage /></DocsGate>,
      },
      {
        path: '/docs/operations/backup/point-in-time',
        element: <DocsGate><PointInTimePage /></DocsGate>,
      },
      {
        path: '/docs/operations/monitoring',
        element: <DocsGate><MonitoringOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/operations/monitoring/metrics',
        element: <DocsGate><MetricsPage /></DocsGate>,
      },
      {
        path: '/docs/operations/monitoring/logging',
        element: <DocsGate><LoggingPage /></DocsGate>,
      },
      {
        path: '/docs/operations/monitoring/health-checks',
        element: <DocsGate><HealthChecksPage /></DocsGate>,
      },
      {
        path: '/docs/operations/upgrades',
        element: <DocsGate><UpgradesPage /></DocsGate>,
      },
      {
        path: '/docs/operations/scaling',
        element: <DocsGate><ScalingPage /></DocsGate>,
      },
      // ─── Performance ───────────────────────────────────
      {
        path: '/docs/performance',
        element: <DocsGate><PerformanceOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/performance/query-optimization',
        element: <DocsGate><QueryOptimizationPage /></DocsGate>,
      },
      {
        path: '/docs/performance/indexing',
        element: <DocsGate><IndexingStrategiesPage /></DocsGate>,
      },
      {
        path: '/docs/performance/explain',
        element: <DocsGate><ExplainPage /></DocsGate>,
      },
      {
        path: '/docs/performance/view-tuning',
        element: <DocsGate><ViewTuningPage /></DocsGate>,
      },
      {
        path: '/docs/performance/memory',
        element: <DocsGate><MemoryManagementPage /></DocsGate>,
      },
      {
        path: '/docs/performance/benchmarks',
        element: <DocsGate><BenchmarksPage /></DocsGate>,
      },
      // ─── Tools ─────────────────────────────────────────
      {
        path: '/docs/tools/cli',
        element: <DocsGate><CliOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/tools/cli/commands',
        element: <DocsGate><CliCommandsPage /></DocsGate>,
      },
      {
        path: '/docs/tools/cli/scripting',
        element: <DocsGate><CliScriptingPage /></DocsGate>,
      },
      {
        path: '/docs/tools/console',
        element: <DocsGate><ConsoleOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/tools/console/query-editor',
        element: <DocsGate><QueryEditorPage /></DocsGate>,
      },
      {
        path: '/docs/tools/console/schema-browser',
        element: <DocsGate><SchemaBrowserPage /></DocsGate>,
      },
      {
        path: '/docs/tools/playground',
        element: <DocsGate><ToolsPlaygroundPage /></DocsGate>,
      },
      // ─── Integrations ──────────────────────────────────
      {
        path: '/docs/integrations',
        element: <DocsGate><IntegrationsOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/integrations/http-api',
        element: <DocsGate><HttpApiOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/integrations/http-api/authentication',
        element: <DocsGate><HttpApiAuthPage /></DocsGate>,
      },
      {
        path: '/docs/integrations/http-api/query',
        element: <DocsGate><HttpApiQueryPage /></DocsGate>,
      },
      {
        path: '/docs/integrations/http-api/mutation',
        element: <DocsGate><HttpApiMutationPage /></DocsGate>,
      },
      {
        path: '/docs/integrations/http-api/subscription',
        element: <DocsGate><HttpApiSubscriptionPage /></DocsGate>,
      },
      {
        path: '/docs/integrations/http-api/errors',
        element: <DocsGate><HttpApiErrorsPage /></DocsGate>,
      },
      {
        path: '/docs/integrations/webhooks',
        element: <DocsGate><WebhooksPage /></DocsGate>,
      },
      {
        path: '/docs/integrations/cdc',
        element: <DocsGate><CdcPage /></DocsGate>,
      },
      {
        path: '/docs/integrations/frameworks/react',
        element: <DocsGate><ReactIntegrationPage /></DocsGate>,
      },
      {
        path: '/docs/integrations/frameworks/nextjs',
        element: <DocsGate><NextjsIntegrationPage /></DocsGate>,
      },
      {
        path: '/docs/integrations/frameworks/svelte',
        element: <DocsGate><SvelteIntegrationPage /></DocsGate>,
      },
      // ─── Functions (UNCHANGED) ─────────────────────────
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
      // JSON module
      {
        path: '/docs/functions/json',
        element: <DocsGate><JsonModuleOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/functions/json/array',
        element: <DocsGate><JsonArrayPage /></DocsGate>,
      },
      {
        path: '/docs/functions/json/object',
        element: <DocsGate><JsonObjectPage /></DocsGate>,
      },
      {
        path: '/docs/functions/json/serialize',
        element: <DocsGate><JsonSerializePage /></DocsGate>,
      },
      {
        path: '/docs/functions/json/pretty',
        element: <DocsGate><JsonPrettyPage /></DocsGate>,
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
      // ─── Troubleshooting ───────────────────────────────
      {
        path: '/docs/troubleshooting',
        element: <DocsGate><TroubleshootingOverviewPage /></DocsGate>,
      },
      {
        path: '/docs/troubleshooting/common-errors',
        element: <DocsGate><CommonErrorsPage /></DocsGate>,
      },
      {
        path: '/docs/troubleshooting/connection-issues',
        element: <DocsGate><ConnectionIssuesPage /></DocsGate>,
      },
      {
        path: '/docs/troubleshooting/slow-queries',
        element: <DocsGate><SlowQueriesPage /></DocsGate>,
      },
      {
        path: '/docs/troubleshooting/transaction-conflicts',
        element: <DocsGate><TransactionConflictsPage /></DocsGate>,
      },
      {
        path: '/docs/troubleshooting/view-issues',
        element: <DocsGate><ViewIssuesPage /></DocsGate>,
      },
      {
        path: '/docs/troubleshooting/faq',
        element: <DocsGate><FaqDocsPage /></DocsGate>,
      },
      // ─── Resources ─────────────────────────────────────
      {
        path: '/docs/resources/changelog',
        element: <DocsGate><ChangelogPage /></DocsGate>,
      },
      {
        path: '/docs/resources/roadmap',
        element: <DocsGate><RoadmapPage /></DocsGate>,
      },
      {
        path: '/docs/resources/glossary',
        element: <DocsGate><GlossaryPage /></DocsGate>,
      },
      {
        path: '/docs/resources/contributing',
        element: <DocsGate><ContributingPage /></DocsGate>,
      },
      {
        path: '/docs/resources/community',
        element: <DocsGate><CommunityPage /></DocsGate>,
      },
      {
        path: '/docs/resources/release-notes',
        element: <DocsGate><ReleaseNotesPage /></DocsGate>,
      },
      // ─── Non-docs pages ────────────────────────────────
      {
        path: '/examples',
        element: <ExamplesPage />,
      },
      {
        path: '/tour',
        element: <TourPage />,
      },
      {
        path: '/pitch',
        element: <PitchPage />,
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
        path: '/use-cases/iot-farming',
        element: <IoTFarmingPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
