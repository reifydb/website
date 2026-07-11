/**
 * Code Examples Registry
 *
 * Examples live next to the docs page that renders them
 * (`<page>.examples.ts`, verified by `<page>.test.ts`).
 * This barrel aggregates them so a page can render an example owned by another page.
 */

export * from './types';
import type { CodeExample } from './types';

export { architectureTypesExamples } from '@/pages/docs/architecture/types.examples';
export { architectureVolcanoExamples } from '@/pages/docs/architecture/volcano.examples';
export { conceptsNoneExamples } from '@/pages/docs/concepts/none.examples';
export { conceptsOverviewExamples } from '@/pages/docs/concepts/overview.examples';
export { conceptsTransactionsExamples } from '@/pages/docs/concepts/transactions.examples';
export { conceptsTtlExamples } from '@/pages/docs/concepts/ttl.examples';
export { dataModelDictionariesExamples } from '@/pages/docs/concepts/data-model/dictionaries.examples';
export { dataModelEnumsExamples } from '@/pages/docs/concepts/data-model/enums.examples';
export { dataModelEventsExamples } from '@/pages/docs/concepts/data-model/events.examples';
export { dataModelHandlersExamples } from '@/pages/docs/concepts/data-model/handlers.examples';
export { dataModelNamespacesExamples } from '@/pages/docs/concepts/data-model/namespaces.examples';
export { dataModelPoliciesExamples } from '@/pages/docs/concepts/data-model/policies.examples';
export { dataModelProceduresExamples } from '@/pages/docs/concepts/data-model/procedures.examples';
export { dataModelRingBuffersExamples } from '@/pages/docs/concepts/data-model/ring-buffers.examples';
export { dataModelSequencesExamples } from '@/pages/docs/concepts/data-model/sequences.examples';
export { dataModelSeriesExamples } from '@/pages/docs/concepts/data-model/series.examples';
export { dataModelSubscriptionsExamples } from '@/pages/docs/concepts/data-model/subscriptions.examples';
export { dataModelTablesExamples } from '@/pages/docs/concepts/data-model/tables.examples';
export { dataModelTagsExamples } from '@/pages/docs/concepts/data-model/tags.examples';
export { dataModelViewsExamples } from '@/pages/docs/concepts/data-model/views.examples';
export { functionsArithmeticPoliciesExamples } from '@/pages/docs/functions/arithmetic-policies.examples';
export { functionsBlobB58Examples } from '@/pages/docs/functions/blob/b58.examples';
export { functionsBlobB64Examples } from '@/pages/docs/functions/blob/b64.examples';
export { functionsBlobB64urlExamples } from '@/pages/docs/functions/blob/b64url.examples';
export { functionsBlobHexExamples } from '@/pages/docs/functions/blob/hex.examples';
export { functionsBlobUtf8Examples } from '@/pages/docs/functions/blob/utf8.examples';
export { functionsDateAddExamples } from '@/pages/docs/functions/date/add.examples';
export { functionsDateAgeExamples } from '@/pages/docs/functions/date/age.examples';
export { functionsDateDayExamples } from '@/pages/docs/functions/date/day.examples';
export { functionsDateDayOfWeekExamples } from '@/pages/docs/functions/date/day_of_week.examples';
export { functionsDateDayOfYearExamples } from '@/pages/docs/functions/date/day_of_year.examples';
export { functionsDateDaysInMonthExamples } from '@/pages/docs/functions/date/days_in_month.examples';
export { functionsDateDiffExamples } from '@/pages/docs/functions/date/diff.examples';
export { functionsDateEndOfMonthExamples } from '@/pages/docs/functions/date/end_of_month.examples';
export { functionsDateFormatExamples } from '@/pages/docs/functions/date/format.examples';
export { functionsDateExamples } from '@/pages/docs/functions/date/index.examples';
export { functionsDateIsLeapYearExamples } from '@/pages/docs/functions/date/is_leap_year.examples';
export { functionsDateMonthExamples } from '@/pages/docs/functions/date/month.examples';
export { functionsDateNewExamples } from '@/pages/docs/functions/date/new.examples';
export { functionsDateNowExamples } from '@/pages/docs/functions/date/now.examples';
export { functionsDateQuarterExamples } from '@/pages/docs/functions/date/quarter.examples';
export { functionsDateStartOfMonthExamples } from '@/pages/docs/functions/date/start_of_month.examples';
export { functionsDateStartOfYearExamples } from '@/pages/docs/functions/date/start_of_year.examples';
export { functionsDateSubtractExamples } from '@/pages/docs/functions/date/subtract.examples';
export { functionsDateTruncExamples } from '@/pages/docs/functions/date/trunc.examples';
export { functionsDateWeekExamples } from '@/pages/docs/functions/date/week.examples';
export { functionsDateYearExamples } from '@/pages/docs/functions/date/year.examples';
export { functionsDatetimeAddExamples } from '@/pages/docs/functions/datetime/add.examples';
export { functionsDatetimeAgeExamples } from '@/pages/docs/functions/datetime/age.examples';
export { functionsDatetimeDateExamples } from '@/pages/docs/functions/datetime/date.examples';
export { functionsDatetimeDayExamples } from '@/pages/docs/functions/datetime/day.examples';
export { functionsDatetimeDayOfWeekExamples } from '@/pages/docs/functions/datetime/day_of_week.examples';
export { functionsDatetimeDayOfYearExamples } from '@/pages/docs/functions/datetime/day_of_year.examples';
export { functionsDatetimeDiffExamples } from '@/pages/docs/functions/datetime/diff.examples';
export { functionsDatetimeEpochExamples } from '@/pages/docs/functions/datetime/epoch.examples';
export { functionsDatetimeEpochMillisExamples } from '@/pages/docs/functions/datetime/epoch_millis.examples';
export { functionsDatetimeFormatExamples } from '@/pages/docs/functions/datetime/format.examples';
export { functionsDatetimeFromEpochExamples } from '@/pages/docs/functions/datetime/from_epoch.examples';
export { functionsDatetimeFromEpochMillisExamples } from '@/pages/docs/functions/datetime/from_epoch_millis.examples';
export { functionsDatetimeHourExamples } from '@/pages/docs/functions/datetime/hour.examples';
export { functionsDatetimeMinuteExamples } from '@/pages/docs/functions/datetime/minute.examples';
export { functionsDatetimeMonthExamples } from '@/pages/docs/functions/datetime/month.examples';
export { functionsDatetimeNanosecondExamples } from '@/pages/docs/functions/datetime/nanosecond.examples';
export { functionsDatetimeNewExamples } from '@/pages/docs/functions/datetime/new.examples';
export { functionsDatetimeNowExamples } from '@/pages/docs/functions/datetime/now.examples';
export { functionsDatetimeQuarterExamples } from '@/pages/docs/functions/datetime/quarter.examples';
export { functionsDatetimeSecondExamples } from '@/pages/docs/functions/datetime/second.examples';
export { functionsDatetimeSubtractExamples } from '@/pages/docs/functions/datetime/subtract.examples';
export { functionsDatetimeTimeExamples } from '@/pages/docs/functions/datetime/time.examples';
export { functionsDatetimeTruncExamples } from '@/pages/docs/functions/datetime/trunc.examples';
export { functionsDatetimeWeekExamples } from '@/pages/docs/functions/datetime/week.examples';
export { functionsDatetimeYearExamples } from '@/pages/docs/functions/datetime/year.examples';
export { functionsDurationAddExamples } from '@/pages/docs/functions/duration/add.examples';
export { functionsDurationDaysExamples } from '@/pages/docs/functions/duration/days.examples';
export { functionsDurationFormatExamples } from '@/pages/docs/functions/duration/format.examples';
export { functionsDurationGetDaysExamples } from '@/pages/docs/functions/duration/get_days.examples';
export { functionsDurationGetMonthsExamples } from '@/pages/docs/functions/duration/get_months.examples';
export { functionsDurationGetNanosExamples } from '@/pages/docs/functions/duration/get_nanos.examples';
export { functionsDurationHoursExamples } from '@/pages/docs/functions/duration/hours.examples';
export { functionsDurationMillisExamples } from '@/pages/docs/functions/duration/millis.examples';
export { functionsDurationMinutesExamples } from '@/pages/docs/functions/duration/minutes.examples';
export { functionsDurationMonthsExamples } from '@/pages/docs/functions/duration/months.examples';
export { functionsDurationNegateExamples } from '@/pages/docs/functions/duration/negate.examples';
export { functionsDurationScaleExamples } from '@/pages/docs/functions/duration/scale.examples';
export { functionsDurationSecondsExamples } from '@/pages/docs/functions/duration/seconds.examples';
export { functionsDurationSubtractExamples } from '@/pages/docs/functions/duration/subtract.examples';
export { functionsDurationTruncExamples } from '@/pages/docs/functions/duration/trunc.examples';
export { functionsDurationWeeksExamples } from '@/pages/docs/functions/duration/weeks.examples';
export { functionsDurationYearsExamples } from '@/pages/docs/functions/duration/years.examples';
export { functionsIdentityIdExamples } from '@/pages/docs/functions/identity/id.examples';
export { functionsIsAnonymousExamples } from '@/pages/docs/functions/is/anonymous.examples';
export { functionsIsNoneExamples } from '@/pages/docs/functions/is/none.examples';
export { functionsIsRootExamples } from '@/pages/docs/functions/is/root.examples';
export { functionsIsSomeExamples } from '@/pages/docs/functions/is/some.examples';
export { functionsIsTypeExamples } from '@/pages/docs/functions/is/type.examples';
export { functionsJsonArrayExamples } from '@/pages/docs/functions/json/array.examples';
export { functionsJsonExamples } from '@/pages/docs/functions/json/index.examples';
export { functionsJsonObjectExamples } from '@/pages/docs/functions/json/object.examples';
export { functionsJsonPrettyExamples } from '@/pages/docs/functions/json/pretty.examples';
export { functionsJsonSerializeExamples } from '@/pages/docs/functions/json/serialize.examples';
export { functionsMathAbsExamples } from '@/pages/docs/functions/math/abs.examples';
export { functionsMathAcosExamples } from '@/pages/docs/functions/math/acos.examples';
export { functionsMathAsinExamples } from '@/pages/docs/functions/math/asin.examples';
export { functionsMathAtanExamples } from '@/pages/docs/functions/math/atan.examples';
export { functionsMathAtan2Examples } from '@/pages/docs/functions/math/atan2.examples';
export { functionsMathAvgExamples } from '@/pages/docs/functions/math/avg.examples';
export { functionsMathCeilExamples } from '@/pages/docs/functions/math/ceil.examples';
export { functionsMathClampExamples } from '@/pages/docs/functions/math/clamp.examples';
export { functionsMathCosExamples } from '@/pages/docs/functions/math/cos.examples';
export { functionsMathEExamples } from '@/pages/docs/functions/math/e.examples';
export { functionsMathExpExamples } from '@/pages/docs/functions/math/exp.examples';
export { functionsMathFloorExamples } from '@/pages/docs/functions/math/floor.examples';
export { functionsMathGcdExamples } from '@/pages/docs/functions/math/gcd.examples';
export { functionsMathExamples } from '@/pages/docs/functions/math/index.examples';
export { functionsMathLcmExamples } from '@/pages/docs/functions/math/lcm.examples';
export { functionsMathLogExamples } from '@/pages/docs/functions/math/log.examples';
export { functionsMathLog10Examples } from '@/pages/docs/functions/math/log10.examples';
export { functionsMathLog2Examples } from '@/pages/docs/functions/math/log2.examples';
export { functionsMathMaxExamples } from '@/pages/docs/functions/math/max.examples';
export { functionsMathMinExamples } from '@/pages/docs/functions/math/min.examples';
export { functionsMathModExamples } from '@/pages/docs/functions/math/mod.examples';
export { functionsMathPiExamples } from '@/pages/docs/functions/math/pi.examples';
export { functionsMathPowerExamples } from '@/pages/docs/functions/math/power.examples';
export { functionsMathRoundExamples } from '@/pages/docs/functions/math/round.examples';
export { functionsMathSignExamples } from '@/pages/docs/functions/math/sign.examples';
export { functionsMathSinExamples } from '@/pages/docs/functions/math/sin.examples';
export { functionsMathSqrtExamples } from '@/pages/docs/functions/math/sqrt.examples';
export { functionsMathSumExamples } from '@/pages/docs/functions/math/sum.examples';
export { functionsMathTanExamples } from '@/pages/docs/functions/math/tan.examples';
export { functionsMathTruncateExamples } from '@/pages/docs/functions/math/truncate.examples';
export { functionsMetaTypeExamples } from '@/pages/docs/functions/meta/type.examples';
export { functionsTextAsciiExamples } from '@/pages/docs/functions/text/ascii.examples';
export { functionsTextCharExamples } from '@/pages/docs/functions/text/char.examples';
export { functionsTextConcatExamples } from '@/pages/docs/functions/text/concat.examples';
export { functionsTextContainsExamples } from '@/pages/docs/functions/text/contains.examples';
export { functionsTextCountExamples } from '@/pages/docs/functions/text/count.examples';
export { functionsTextEndsWithExamples } from '@/pages/docs/functions/text/ends_with.examples';
export { functionsTextFormatBytesExamples } from '@/pages/docs/functions/text/format_bytes.examples';
export { functionsTextFormatBytesSiExamples } from '@/pages/docs/functions/text/format_bytes_si.examples';
export { functionsTextExamples } from '@/pages/docs/functions/text/index.examples';
export { functionsTextIndexOfExamples } from '@/pages/docs/functions/text/index_of.examples';
export { functionsTextLengthExamples } from '@/pages/docs/functions/text/length.examples';
export { functionsTextLowerExamples } from '@/pages/docs/functions/text/lower.examples';
export { functionsTextPadLeftExamples } from '@/pages/docs/functions/text/pad_left.examples';
export { functionsTextPadRightExamples } from '@/pages/docs/functions/text/pad_right.examples';
export { functionsTextRepeatExamples } from '@/pages/docs/functions/text/repeat.examples';
export { functionsTextReplaceExamples } from '@/pages/docs/functions/text/replace.examples';
export { functionsTextReverseExamples } from '@/pages/docs/functions/text/reverse.examples';
export { functionsTextStartsWithExamples } from '@/pages/docs/functions/text/starts_with.examples';
export { functionsTextSubstringExamples } from '@/pages/docs/functions/text/substring.examples';
export { functionsTextTrimExamples } from '@/pages/docs/functions/text/trim.examples';
export { functionsTextTrimEndExamples } from '@/pages/docs/functions/text/trim_end.examples';
export { functionsTextTrimStartExamples } from '@/pages/docs/functions/text/trim_start.examples';
export { functionsTextUpperExamples } from '@/pages/docs/functions/text/upper.examples';
export { guidesModelApplicationStateExamples } from '@/pages/docs/guides/model-application-state.examples';
export { guidesQuickStartExamples } from '@/pages/docs/guides/quick-start.examples';
export { rqlControlFlowClosuresExamples } from '@/pages/docs/rql/control-flow/closures.examples';
export { rqlControlFlowConditionalsExamples } from '@/pages/docs/rql/control-flow/conditionals.examples';
export { rqlControlFlowForExamples } from '@/pages/docs/rql/control-flow/for.examples';
export { rqlControlFlowLoopExamples } from '@/pages/docs/rql/control-flow/loop.examples';
export { rqlControlFlowMatchExamples } from '@/pages/docs/rql/control-flow/match.examples';
export { rqlControlFlowWhileExamples } from '@/pages/docs/rql/control-flow/while.examples';
export { rqlExpressionsExamples } from '@/pages/docs/rql/expressions.examples';
export { rqlFiveMinutesExamples } from '@/pages/docs/rql/five-minutes.examples';
export { rqlForSqlUsersExamples } from '@/pages/docs/rql/for-sql-users.examples';
export { rqlTransformsAggregateExamples } from '@/pages/docs/rql/transforms/aggregate.examples';
export { rqlTransformsDistinctExamples } from '@/pages/docs/rql/transforms/distinct.examples';
export { rqlTransformsExtendExamples } from '@/pages/docs/rql/transforms/extend.examples';
export { rqlTransformsFilterExamples } from '@/pages/docs/rql/transforms/filter.examples';
export { rqlTransformsJoinExamples } from '@/pages/docs/rql/transforms/join.examples';
export { rqlTransformsMapExamples } from '@/pages/docs/rql/transforms/map.examples';
export { rqlTransformsMatchExamples } from '@/pages/docs/rql/transforms/match.examples';
export { rqlTransformsPatchExamples } from '@/pages/docs/rql/transforms/patch.examples';
export { rqlTransformsSortExamples } from '@/pages/docs/rql/transforms/sort.examples';
export { rqlTransformsTakeExamples } from '@/pages/docs/rql/transforms/take.examples';
export { rqlTransformsWithExamples } from '@/pages/docs/rql/transforms/with.examples';
export { rqlTransformsExamples } from '@/pages/docs/rql/transforms.examples';
export { rqlVariablesExamples } from '@/pages/docs/rql/variables.examples';
export { routinesOverviewExamples } from '@/pages/docs/routines/overview.examples';
export { scriptingDmlDeleteExamples } from '@/pages/docs/scripting/dml/delete.examples';
export { scriptingDmlInsertExamples } from '@/pages/docs/scripting/dml/insert.examples';
export { scriptingDmlUpdateExamples } from '@/pages/docs/scripting/dml/update.examples';
export { scriptingMigrationsOverviewExamples } from '@/pages/docs/scripting/migrations/overview.examples';
export { scriptingOverviewExamples } from '@/pages/docs/scripting/overview.examples';
export { scriptingProceduresControlFlowExamples } from '@/pages/docs/scripting/procedures/control-flow.examples';
export { scriptingProceduresOverviewExamples } from '@/pages/docs/scripting/procedures/overview.examples';
export { scriptingSchemaDictionariesExamples } from '@/pages/docs/scripting/schema/dictionaries.examples';
export { scriptingSchemaDropExamples } from '@/pages/docs/scripting/schema/drop.examples';
export { scriptingSchemaEnumsExamples } from '@/pages/docs/scripting/schema/enums.examples';
export { scriptingSchemaNamespacesExamples } from '@/pages/docs/scripting/schema/namespaces.examples';
export { scriptingSchemaTablesExamples } from '@/pages/docs/scripting/schema/tables.examples';
export { scriptingStorageRingbuffersExamples } from '@/pages/docs/scripting/storage/ringbuffers.examples';
export { scriptingStorageSeriesExamples } from '@/pages/docs/scripting/storage/series.examples';
export { scriptingTestingOverviewExamples } from '@/pages/docs/scripting/testing/overview.examples';
export { scriptingViewsDeferredExamples } from '@/pages/docs/scripting/views/deferred.examples';
export { scriptingViewsOverviewExamples } from '@/pages/docs/scripting/views/overview.examples';
export { landingExamples } from '@/pages/landing/sections/code-example.examples';
export { heroExamples } from '@/pages/landing/sections/hero.examples';

import { architectureTypesExamples } from '@/pages/docs/architecture/types.examples';
import { architectureVolcanoExamples } from '@/pages/docs/architecture/volcano.examples';
import { conceptsNoneExamples } from '@/pages/docs/concepts/none.examples';
import { conceptsOverviewExamples } from '@/pages/docs/concepts/overview.examples';
import { conceptsTransactionsExamples } from '@/pages/docs/concepts/transactions.examples';
import { conceptsTtlExamples } from '@/pages/docs/concepts/ttl.examples';
import { dataModelDictionariesExamples } from '@/pages/docs/concepts/data-model/dictionaries.examples';
import { dataModelEnumsExamples } from '@/pages/docs/concepts/data-model/enums.examples';
import { dataModelEventsExamples } from '@/pages/docs/concepts/data-model/events.examples';
import { dataModelHandlersExamples } from '@/pages/docs/concepts/data-model/handlers.examples';
import { dataModelNamespacesExamples } from '@/pages/docs/concepts/data-model/namespaces.examples';
import { dataModelPoliciesExamples } from '@/pages/docs/concepts/data-model/policies.examples';
import { dataModelProceduresExamples } from '@/pages/docs/concepts/data-model/procedures.examples';
import { dataModelRingBuffersExamples } from '@/pages/docs/concepts/data-model/ring-buffers.examples';
import { dataModelSequencesExamples } from '@/pages/docs/concepts/data-model/sequences.examples';
import { dataModelSeriesExamples } from '@/pages/docs/concepts/data-model/series.examples';
import { dataModelSubscriptionsExamples } from '@/pages/docs/concepts/data-model/subscriptions.examples';
import { dataModelTablesExamples } from '@/pages/docs/concepts/data-model/tables.examples';
import { dataModelTagsExamples } from '@/pages/docs/concepts/data-model/tags.examples';
import { dataModelViewsExamples } from '@/pages/docs/concepts/data-model/views.examples';
import { functionsArithmeticPoliciesExamples } from '@/pages/docs/functions/arithmetic-policies.examples';
import { functionsBlobB58Examples } from '@/pages/docs/functions/blob/b58.examples';
import { functionsBlobB64Examples } from '@/pages/docs/functions/blob/b64.examples';
import { functionsBlobB64urlExamples } from '@/pages/docs/functions/blob/b64url.examples';
import { functionsBlobHexExamples } from '@/pages/docs/functions/blob/hex.examples';
import { functionsBlobUtf8Examples } from '@/pages/docs/functions/blob/utf8.examples';
import { functionsDateAddExamples } from '@/pages/docs/functions/date/add.examples';
import { functionsDateAgeExamples } from '@/pages/docs/functions/date/age.examples';
import { functionsDateDayExamples } from '@/pages/docs/functions/date/day.examples';
import { functionsDateDayOfWeekExamples } from '@/pages/docs/functions/date/day_of_week.examples';
import { functionsDateDayOfYearExamples } from '@/pages/docs/functions/date/day_of_year.examples';
import { functionsDateDaysInMonthExamples } from '@/pages/docs/functions/date/days_in_month.examples';
import { functionsDateDiffExamples } from '@/pages/docs/functions/date/diff.examples';
import { functionsDateEndOfMonthExamples } from '@/pages/docs/functions/date/end_of_month.examples';
import { functionsDateFormatExamples } from '@/pages/docs/functions/date/format.examples';
import { functionsDateExamples } from '@/pages/docs/functions/date/index.examples';
import { functionsDateIsLeapYearExamples } from '@/pages/docs/functions/date/is_leap_year.examples';
import { functionsDateMonthExamples } from '@/pages/docs/functions/date/month.examples';
import { functionsDateNewExamples } from '@/pages/docs/functions/date/new.examples';
import { functionsDateNowExamples } from '@/pages/docs/functions/date/now.examples';
import { functionsDateQuarterExamples } from '@/pages/docs/functions/date/quarter.examples';
import { functionsDateStartOfMonthExamples } from '@/pages/docs/functions/date/start_of_month.examples';
import { functionsDateStartOfYearExamples } from '@/pages/docs/functions/date/start_of_year.examples';
import { functionsDateSubtractExamples } from '@/pages/docs/functions/date/subtract.examples';
import { functionsDateTruncExamples } from '@/pages/docs/functions/date/trunc.examples';
import { functionsDateWeekExamples } from '@/pages/docs/functions/date/week.examples';
import { functionsDateYearExamples } from '@/pages/docs/functions/date/year.examples';
import { functionsDatetimeAddExamples } from '@/pages/docs/functions/datetime/add.examples';
import { functionsDatetimeAgeExamples } from '@/pages/docs/functions/datetime/age.examples';
import { functionsDatetimeDateExamples } from '@/pages/docs/functions/datetime/date.examples';
import { functionsDatetimeDayExamples } from '@/pages/docs/functions/datetime/day.examples';
import { functionsDatetimeDayOfWeekExamples } from '@/pages/docs/functions/datetime/day_of_week.examples';
import { functionsDatetimeDayOfYearExamples } from '@/pages/docs/functions/datetime/day_of_year.examples';
import { functionsDatetimeDiffExamples } from '@/pages/docs/functions/datetime/diff.examples';
import { functionsDatetimeEpochExamples } from '@/pages/docs/functions/datetime/epoch.examples';
import { functionsDatetimeEpochMillisExamples } from '@/pages/docs/functions/datetime/epoch_millis.examples';
import { functionsDatetimeFormatExamples } from '@/pages/docs/functions/datetime/format.examples';
import { functionsDatetimeFromEpochExamples } from '@/pages/docs/functions/datetime/from_epoch.examples';
import { functionsDatetimeFromEpochMillisExamples } from '@/pages/docs/functions/datetime/from_epoch_millis.examples';
import { functionsDatetimeHourExamples } from '@/pages/docs/functions/datetime/hour.examples';
import { functionsDatetimeMinuteExamples } from '@/pages/docs/functions/datetime/minute.examples';
import { functionsDatetimeMonthExamples } from '@/pages/docs/functions/datetime/month.examples';
import { functionsDatetimeNanosecondExamples } from '@/pages/docs/functions/datetime/nanosecond.examples';
import { functionsDatetimeNewExamples } from '@/pages/docs/functions/datetime/new.examples';
import { functionsDatetimeNowExamples } from '@/pages/docs/functions/datetime/now.examples';
import { functionsDatetimeQuarterExamples } from '@/pages/docs/functions/datetime/quarter.examples';
import { functionsDatetimeSecondExamples } from '@/pages/docs/functions/datetime/second.examples';
import { functionsDatetimeSubtractExamples } from '@/pages/docs/functions/datetime/subtract.examples';
import { functionsDatetimeTimeExamples } from '@/pages/docs/functions/datetime/time.examples';
import { functionsDatetimeTruncExamples } from '@/pages/docs/functions/datetime/trunc.examples';
import { functionsDatetimeWeekExamples } from '@/pages/docs/functions/datetime/week.examples';
import { functionsDatetimeYearExamples } from '@/pages/docs/functions/datetime/year.examples';
import { functionsDurationAddExamples } from '@/pages/docs/functions/duration/add.examples';
import { functionsDurationDaysExamples } from '@/pages/docs/functions/duration/days.examples';
import { functionsDurationFormatExamples } from '@/pages/docs/functions/duration/format.examples';
import { functionsDurationGetDaysExamples } from '@/pages/docs/functions/duration/get_days.examples';
import { functionsDurationGetMonthsExamples } from '@/pages/docs/functions/duration/get_months.examples';
import { functionsDurationGetNanosExamples } from '@/pages/docs/functions/duration/get_nanos.examples';
import { functionsDurationHoursExamples } from '@/pages/docs/functions/duration/hours.examples';
import { functionsDurationMillisExamples } from '@/pages/docs/functions/duration/millis.examples';
import { functionsDurationMinutesExamples } from '@/pages/docs/functions/duration/minutes.examples';
import { functionsDurationMonthsExamples } from '@/pages/docs/functions/duration/months.examples';
import { functionsDurationNegateExamples } from '@/pages/docs/functions/duration/negate.examples';
import { functionsDurationScaleExamples } from '@/pages/docs/functions/duration/scale.examples';
import { functionsDurationSecondsExamples } from '@/pages/docs/functions/duration/seconds.examples';
import { functionsDurationSubtractExamples } from '@/pages/docs/functions/duration/subtract.examples';
import { functionsDurationTruncExamples } from '@/pages/docs/functions/duration/trunc.examples';
import { functionsDurationWeeksExamples } from '@/pages/docs/functions/duration/weeks.examples';
import { functionsDurationYearsExamples } from '@/pages/docs/functions/duration/years.examples';
import { functionsIdentityIdExamples } from '@/pages/docs/functions/identity/id.examples';
import { functionsIsAnonymousExamples } from '@/pages/docs/functions/is/anonymous.examples';
import { functionsIsNoneExamples } from '@/pages/docs/functions/is/none.examples';
import { functionsIsRootExamples } from '@/pages/docs/functions/is/root.examples';
import { functionsIsSomeExamples } from '@/pages/docs/functions/is/some.examples';
import { functionsIsTypeExamples } from '@/pages/docs/functions/is/type.examples';
import { functionsJsonArrayExamples } from '@/pages/docs/functions/json/array.examples';
import { functionsJsonExamples } from '@/pages/docs/functions/json/index.examples';
import { functionsJsonObjectExamples } from '@/pages/docs/functions/json/object.examples';
import { functionsJsonPrettyExamples } from '@/pages/docs/functions/json/pretty.examples';
import { functionsJsonSerializeExamples } from '@/pages/docs/functions/json/serialize.examples';
import { functionsMathAbsExamples } from '@/pages/docs/functions/math/abs.examples';
import { functionsMathAcosExamples } from '@/pages/docs/functions/math/acos.examples';
import { functionsMathAsinExamples } from '@/pages/docs/functions/math/asin.examples';
import { functionsMathAtanExamples } from '@/pages/docs/functions/math/atan.examples';
import { functionsMathAtan2Examples } from '@/pages/docs/functions/math/atan2.examples';
import { functionsMathAvgExamples } from '@/pages/docs/functions/math/avg.examples';
import { functionsMathCeilExamples } from '@/pages/docs/functions/math/ceil.examples';
import { functionsMathClampExamples } from '@/pages/docs/functions/math/clamp.examples';
import { functionsMathCosExamples } from '@/pages/docs/functions/math/cos.examples';
import { functionsMathEExamples } from '@/pages/docs/functions/math/e.examples';
import { functionsMathExpExamples } from '@/pages/docs/functions/math/exp.examples';
import { functionsMathFloorExamples } from '@/pages/docs/functions/math/floor.examples';
import { functionsMathGcdExamples } from '@/pages/docs/functions/math/gcd.examples';
import { functionsMathExamples } from '@/pages/docs/functions/math/index.examples';
import { functionsMathLcmExamples } from '@/pages/docs/functions/math/lcm.examples';
import { functionsMathLogExamples } from '@/pages/docs/functions/math/log.examples';
import { functionsMathLog10Examples } from '@/pages/docs/functions/math/log10.examples';
import { functionsMathLog2Examples } from '@/pages/docs/functions/math/log2.examples';
import { functionsMathMaxExamples } from '@/pages/docs/functions/math/max.examples';
import { functionsMathMinExamples } from '@/pages/docs/functions/math/min.examples';
import { functionsMathModExamples } from '@/pages/docs/functions/math/mod.examples';
import { functionsMathPiExamples } from '@/pages/docs/functions/math/pi.examples';
import { functionsMathPowerExamples } from '@/pages/docs/functions/math/power.examples';
import { functionsMathRoundExamples } from '@/pages/docs/functions/math/round.examples';
import { functionsMathSignExamples } from '@/pages/docs/functions/math/sign.examples';
import { functionsMathSinExamples } from '@/pages/docs/functions/math/sin.examples';
import { functionsMathSqrtExamples } from '@/pages/docs/functions/math/sqrt.examples';
import { functionsMathSumExamples } from '@/pages/docs/functions/math/sum.examples';
import { functionsMathTanExamples } from '@/pages/docs/functions/math/tan.examples';
import { functionsMathTruncateExamples } from '@/pages/docs/functions/math/truncate.examples';
import { functionsMetaTypeExamples } from '@/pages/docs/functions/meta/type.examples';
import { functionsTextAsciiExamples } from '@/pages/docs/functions/text/ascii.examples';
import { functionsTextCharExamples } from '@/pages/docs/functions/text/char.examples';
import { functionsTextConcatExamples } from '@/pages/docs/functions/text/concat.examples';
import { functionsTextContainsExamples } from '@/pages/docs/functions/text/contains.examples';
import { functionsTextCountExamples } from '@/pages/docs/functions/text/count.examples';
import { functionsTextEndsWithExamples } from '@/pages/docs/functions/text/ends_with.examples';
import { functionsTextFormatBytesExamples } from '@/pages/docs/functions/text/format_bytes.examples';
import { functionsTextFormatBytesSiExamples } from '@/pages/docs/functions/text/format_bytes_si.examples';
import { functionsTextExamples } from '@/pages/docs/functions/text/index.examples';
import { functionsTextIndexOfExamples } from '@/pages/docs/functions/text/index_of.examples';
import { functionsTextLengthExamples } from '@/pages/docs/functions/text/length.examples';
import { functionsTextLowerExamples } from '@/pages/docs/functions/text/lower.examples';
import { functionsTextPadLeftExamples } from '@/pages/docs/functions/text/pad_left.examples';
import { functionsTextPadRightExamples } from '@/pages/docs/functions/text/pad_right.examples';
import { functionsTextRepeatExamples } from '@/pages/docs/functions/text/repeat.examples';
import { functionsTextReplaceExamples } from '@/pages/docs/functions/text/replace.examples';
import { functionsTextReverseExamples } from '@/pages/docs/functions/text/reverse.examples';
import { functionsTextStartsWithExamples } from '@/pages/docs/functions/text/starts_with.examples';
import { functionsTextSubstringExamples } from '@/pages/docs/functions/text/substring.examples';
import { functionsTextTrimExamples } from '@/pages/docs/functions/text/trim.examples';
import { functionsTextTrimEndExamples } from '@/pages/docs/functions/text/trim_end.examples';
import { functionsTextTrimStartExamples } from '@/pages/docs/functions/text/trim_start.examples';
import { functionsTextUpperExamples } from '@/pages/docs/functions/text/upper.examples';
import { guidesModelApplicationStateExamples } from '@/pages/docs/guides/model-application-state.examples';
import { guidesQuickStartExamples } from '@/pages/docs/guides/quick-start.examples';
import { rqlControlFlowClosuresExamples } from '@/pages/docs/rql/control-flow/closures.examples';
import { rqlControlFlowConditionalsExamples } from '@/pages/docs/rql/control-flow/conditionals.examples';
import { rqlControlFlowForExamples } from '@/pages/docs/rql/control-flow/for.examples';
import { rqlControlFlowLoopExamples } from '@/pages/docs/rql/control-flow/loop.examples';
import { rqlControlFlowMatchExamples } from '@/pages/docs/rql/control-flow/match.examples';
import { rqlControlFlowWhileExamples } from '@/pages/docs/rql/control-flow/while.examples';
import { rqlExpressionsExamples } from '@/pages/docs/rql/expressions.examples';
import { rqlFiveMinutesExamples } from '@/pages/docs/rql/five-minutes.examples';
import { rqlForSqlUsersExamples } from '@/pages/docs/rql/for-sql-users.examples';
import { rqlTransformsAggregateExamples } from '@/pages/docs/rql/transforms/aggregate.examples';
import { rqlTransformsDistinctExamples } from '@/pages/docs/rql/transforms/distinct.examples';
import { rqlTransformsExtendExamples } from '@/pages/docs/rql/transforms/extend.examples';
import { rqlTransformsFilterExamples } from '@/pages/docs/rql/transforms/filter.examples';
import { rqlTransformsJoinExamples } from '@/pages/docs/rql/transforms/join.examples';
import { rqlTransformsMapExamples } from '@/pages/docs/rql/transforms/map.examples';
import { rqlTransformsMatchExamples } from '@/pages/docs/rql/transforms/match.examples';
import { rqlTransformsPatchExamples } from '@/pages/docs/rql/transforms/patch.examples';
import { rqlTransformsSortExamples } from '@/pages/docs/rql/transforms/sort.examples';
import { rqlTransformsTakeExamples } from '@/pages/docs/rql/transforms/take.examples';
import { rqlTransformsWithExamples } from '@/pages/docs/rql/transforms/with.examples';
import { rqlTransformsExamples } from '@/pages/docs/rql/transforms.examples';
import { rqlVariablesExamples } from '@/pages/docs/rql/variables.examples';
import { routinesOverviewExamples } from '@/pages/docs/routines/overview.examples';
import { scriptingDmlDeleteExamples } from '@/pages/docs/scripting/dml/delete.examples';
import { scriptingDmlInsertExamples } from '@/pages/docs/scripting/dml/insert.examples';
import { scriptingDmlUpdateExamples } from '@/pages/docs/scripting/dml/update.examples';
import { scriptingMigrationsOverviewExamples } from '@/pages/docs/scripting/migrations/overview.examples';
import { scriptingOverviewExamples } from '@/pages/docs/scripting/overview.examples';
import { scriptingProceduresControlFlowExamples } from '@/pages/docs/scripting/procedures/control-flow.examples';
import { scriptingProceduresOverviewExamples } from '@/pages/docs/scripting/procedures/overview.examples';
import { scriptingSchemaDictionariesExamples } from '@/pages/docs/scripting/schema/dictionaries.examples';
import { scriptingSchemaDropExamples } from '@/pages/docs/scripting/schema/drop.examples';
import { scriptingSchemaEnumsExamples } from '@/pages/docs/scripting/schema/enums.examples';
import { scriptingSchemaNamespacesExamples } from '@/pages/docs/scripting/schema/namespaces.examples';
import { scriptingSchemaTablesExamples } from '@/pages/docs/scripting/schema/tables.examples';
import { scriptingStorageRingbuffersExamples } from '@/pages/docs/scripting/storage/ringbuffers.examples';
import { scriptingStorageSeriesExamples } from '@/pages/docs/scripting/storage/series.examples';
import { scriptingTestingOverviewExamples } from '@/pages/docs/scripting/testing/overview.examples';
import { scriptingViewsDeferredExamples } from '@/pages/docs/scripting/views/deferred.examples';
import { scriptingViewsOverviewExamples } from '@/pages/docs/scripting/views/overview.examples';
import { landingExamples } from '@/pages/landing/sections/code-example.examples';
import { heroExamples } from '@/pages/landing/sections/hero.examples';

/** Every example, used by getExampleById */
export const allExamples: CodeExample[] = [
  ...architectureTypesExamples,
  ...architectureVolcanoExamples,
  ...conceptsNoneExamples,
  ...conceptsOverviewExamples,
  ...conceptsTransactionsExamples,
  ...conceptsTtlExamples,
  ...dataModelDictionariesExamples,
  ...dataModelEnumsExamples,
  ...dataModelEventsExamples,
  ...dataModelHandlersExamples,
  ...dataModelNamespacesExamples,
  ...dataModelPoliciesExamples,
  ...dataModelProceduresExamples,
  ...dataModelRingBuffersExamples,
  ...dataModelSequencesExamples,
  ...dataModelSeriesExamples,
  ...dataModelSubscriptionsExamples,
  ...dataModelTablesExamples,
  ...dataModelTagsExamples,
  ...dataModelViewsExamples,
  ...functionsArithmeticPoliciesExamples,
  ...functionsBlobB58Examples,
  ...functionsBlobB64Examples,
  ...functionsBlobB64urlExamples,
  ...functionsBlobHexExamples,
  ...functionsBlobUtf8Examples,
  ...functionsDateAddExamples,
  ...functionsDateAgeExamples,
  ...functionsDateDayExamples,
  ...functionsDateDayOfWeekExamples,
  ...functionsDateDayOfYearExamples,
  ...functionsDateDaysInMonthExamples,
  ...functionsDateDiffExamples,
  ...functionsDateEndOfMonthExamples,
  ...functionsDateFormatExamples,
  ...functionsDateExamples,
  ...functionsDateIsLeapYearExamples,
  ...functionsDateMonthExamples,
  ...functionsDateNewExamples,
  ...functionsDateNowExamples,
  ...functionsDateQuarterExamples,
  ...functionsDateStartOfMonthExamples,
  ...functionsDateStartOfYearExamples,
  ...functionsDateSubtractExamples,
  ...functionsDateTruncExamples,
  ...functionsDateWeekExamples,
  ...functionsDateYearExamples,
  ...functionsDatetimeAddExamples,
  ...functionsDatetimeAgeExamples,
  ...functionsDatetimeDateExamples,
  ...functionsDatetimeDayExamples,
  ...functionsDatetimeDayOfWeekExamples,
  ...functionsDatetimeDayOfYearExamples,
  ...functionsDatetimeDiffExamples,
  ...functionsDatetimeEpochExamples,
  ...functionsDatetimeEpochMillisExamples,
  ...functionsDatetimeFormatExamples,
  ...functionsDatetimeFromEpochExamples,
  ...functionsDatetimeFromEpochMillisExamples,
  ...functionsDatetimeHourExamples,
  ...functionsDatetimeMinuteExamples,
  ...functionsDatetimeMonthExamples,
  ...functionsDatetimeNanosecondExamples,
  ...functionsDatetimeNewExamples,
  ...functionsDatetimeNowExamples,
  ...functionsDatetimeQuarterExamples,
  ...functionsDatetimeSecondExamples,
  ...functionsDatetimeSubtractExamples,
  ...functionsDatetimeTimeExamples,
  ...functionsDatetimeTruncExamples,
  ...functionsDatetimeWeekExamples,
  ...functionsDatetimeYearExamples,
  ...functionsDurationAddExamples,
  ...functionsDurationDaysExamples,
  ...functionsDurationFormatExamples,
  ...functionsDurationGetDaysExamples,
  ...functionsDurationGetMonthsExamples,
  ...functionsDurationGetNanosExamples,
  ...functionsDurationHoursExamples,
  ...functionsDurationMillisExamples,
  ...functionsDurationMinutesExamples,
  ...functionsDurationMonthsExamples,
  ...functionsDurationNegateExamples,
  ...functionsDurationScaleExamples,
  ...functionsDurationSecondsExamples,
  ...functionsDurationSubtractExamples,
  ...functionsDurationTruncExamples,
  ...functionsDurationWeeksExamples,
  ...functionsDurationYearsExamples,
  ...functionsIdentityIdExamples,
  ...functionsIsAnonymousExamples,
  ...functionsIsNoneExamples,
  ...functionsIsRootExamples,
  ...functionsIsSomeExamples,
  ...functionsIsTypeExamples,
  ...functionsJsonArrayExamples,
  ...functionsJsonExamples,
  ...functionsJsonObjectExamples,
  ...functionsJsonPrettyExamples,
  ...functionsJsonSerializeExamples,
  ...functionsMathAbsExamples,
  ...functionsMathAcosExamples,
  ...functionsMathAsinExamples,
  ...functionsMathAtanExamples,
  ...functionsMathAtan2Examples,
  ...functionsMathAvgExamples,
  ...functionsMathCeilExamples,
  ...functionsMathClampExamples,
  ...functionsMathCosExamples,
  ...functionsMathEExamples,
  ...functionsMathExpExamples,
  ...functionsMathFloorExamples,
  ...functionsMathGcdExamples,
  ...functionsMathExamples,
  ...functionsMathLcmExamples,
  ...functionsMathLogExamples,
  ...functionsMathLog10Examples,
  ...functionsMathLog2Examples,
  ...functionsMathMaxExamples,
  ...functionsMathMinExamples,
  ...functionsMathModExamples,
  ...functionsMathPiExamples,
  ...functionsMathPowerExamples,
  ...functionsMathRoundExamples,
  ...functionsMathSignExamples,
  ...functionsMathSinExamples,
  ...functionsMathSqrtExamples,
  ...functionsMathSumExamples,
  ...functionsMathTanExamples,
  ...functionsMathTruncateExamples,
  ...functionsMetaTypeExamples,
  ...functionsTextAsciiExamples,
  ...functionsTextCharExamples,
  ...functionsTextConcatExamples,
  ...functionsTextContainsExamples,
  ...functionsTextCountExamples,
  ...functionsTextEndsWithExamples,
  ...functionsTextFormatBytesExamples,
  ...functionsTextFormatBytesSiExamples,
  ...functionsTextExamples,
  ...functionsTextIndexOfExamples,
  ...functionsTextLengthExamples,
  ...functionsTextLowerExamples,
  ...functionsTextPadLeftExamples,
  ...functionsTextPadRightExamples,
  ...functionsTextRepeatExamples,
  ...functionsTextReplaceExamples,
  ...functionsTextReverseExamples,
  ...functionsTextStartsWithExamples,
  ...functionsTextSubstringExamples,
  ...functionsTextTrimExamples,
  ...functionsTextTrimEndExamples,
  ...functionsTextTrimStartExamples,
  ...functionsTextUpperExamples,
  ...guidesModelApplicationStateExamples,
  ...guidesQuickStartExamples,
  ...rqlControlFlowClosuresExamples,
  ...rqlControlFlowConditionalsExamples,
  ...rqlControlFlowForExamples,
  ...rqlControlFlowLoopExamples,
  ...rqlControlFlowMatchExamples,
  ...rqlControlFlowWhileExamples,
  ...rqlExpressionsExamples,
  ...rqlFiveMinutesExamples,
  ...rqlForSqlUsersExamples,
  ...rqlTransformsAggregateExamples,
  ...rqlTransformsDistinctExamples,
  ...rqlTransformsExtendExamples,
  ...rqlTransformsFilterExamples,
  ...rqlTransformsJoinExamples,
  ...rqlTransformsMapExamples,
  ...rqlTransformsMatchExamples,
  ...rqlTransformsPatchExamples,
  ...rqlTransformsSortExamples,
  ...rqlTransformsTakeExamples,
  ...rqlTransformsWithExamples,
  ...rqlTransformsExamples,
  ...rqlVariablesExamples,
  ...routinesOverviewExamples,
  ...scriptingDmlDeleteExamples,
  ...scriptingDmlInsertExamples,
  ...scriptingDmlUpdateExamples,
  ...scriptingMigrationsOverviewExamples,
  ...scriptingOverviewExamples,
  ...scriptingProceduresControlFlowExamples,
  ...scriptingProceduresOverviewExamples,
  ...scriptingSchemaDictionariesExamples,
  ...scriptingSchemaDropExamples,
  ...scriptingSchemaEnumsExamples,
  ...scriptingSchemaNamespacesExamples,
  ...scriptingSchemaTablesExamples,
  ...scriptingStorageRingbuffersExamples,
  ...scriptingStorageSeriesExamples,
  ...scriptingTestingOverviewExamples,
  ...scriptingViewsDeferredExamples,
  ...scriptingViewsOverviewExamples,
  ...landingExamples,
  ...heroExamples,
];

/** Get a single example by ID */
export function getExampleById(id: string): CodeExample | undefined {
  return allExamples.find((ex) => ex.id === id);
}
