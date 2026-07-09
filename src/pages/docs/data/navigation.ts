export interface NavItem {
  id: string;
  label: string;
  href?: string;
  children?: NavItem[];
  published?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
  defaultOpen?: boolean;
}

export function filterPublished(items: NavItem[]): NavItem[] {
  return items
    .filter((item) => item.published === true)
    .map((item) => {
      if (!item.children) return item;
      const children = filterPublished(item.children);
      return children.length > 0 ? { ...item, children } : null;
    })
    .filter((item): item is NavItem => item !== null);
}

export function getPublishedPaths(sections: NavSection[]): Set<string> {
  const paths = new Set<string>();
  function collect(items: NavItem[]) {
    for (const item of items) {
      if (item.published === true && item.href) paths.add(item.href);
      if (item.children) collect(item.children);
    }
  }
  sections.forEach((s) => collect(s.items));
  return paths;
}

/**
 * Returns a flat, ordered list of all published leaf pages for prev/next navigation.
 */
export function getOrderedPages(sections: NavSection[]): { label: string; href: string }[] {
  const pages: { label: string; href: string }[] = [];
  function collect(items: NavItem[]) {
    for (const item of items) {
      if (item.published === true && item.href) {
        pages.push({ label: item.label, href: item.href });
      }
      if (item.children) collect(item.children);
    }
  }
  sections.forEach((s) => collect(s.items));
  return pages;
}

export const navSections: NavSection[] = [
  {
    title: 'Getting Started',
    items: [
      { id: 'overview', label: 'Introduction', href: '/docs', published: true },
      { id: 'quick-start', label: 'Quickstart', href: '/docs/quick-start', published: true },
      { id: 'installation', label: 'Installation', href: '/docs/installation' },
      { id: 'connect', label: 'Connect', href: '/docs/connect' },
    ],
  },
  {
    title: 'Concepts',
    items: [
      { id: 'concepts-overview', label: 'Application State Database', href: '/docs/concepts', published: true },
      {
        id: 'concepts-data-model',
        label: 'Data Model',
        href: '/docs/concepts/data-model',
        published: true,
        children: [
          { id: 'data-model-namespaces', label: 'Namespaces', href: '/docs/concepts/data-model/namespaces', published: true },
          { id: 'data-model-tables', label: 'Tables', href: '/docs/concepts/data-model/tables', published: true },
          { id: 'data-model-views', label: 'Views', href: '/docs/concepts/data-model/views' },
          { id: 'data-model-ring-buffers', label: 'Ring Buffers', href: '/docs/concepts/data-model/ring-buffers' },
          { id: 'data-model-series', label: 'Series', href: '/docs/concepts/data-model/series' },
          { id: 'data-model-dictionaries', label: 'Dictionaries', href: '/docs/concepts/data-model/dictionaries' },
          { id: 'data-model-policies', label: 'Policies', href: '/docs/concepts/data-model/policies' },
          { id: 'data-model-subscriptions', label: 'Subscriptions', href: '/docs/concepts/data-model/subscriptions' },
          { id: 'data-model-enums', label: 'Enums', href: '/docs/concepts/data-model/enums' },
          { id: 'data-model-tags', label: 'Tags', href: '/docs/concepts/data-model/tags' },
          { id: 'data-model-events', label: 'Events', href: '/docs/concepts/data-model/events' },
          { id: 'data-model-handlers', label: 'Handlers', href: '/docs/concepts/data-model/handlers' },
          { id: 'data-model-procedures', label: 'Procedures', href: '/docs/concepts/data-model/procedures' },
          { id: 'data-model-sequences', label: 'Sequences', href: '/docs/concepts/data-model/sequences' },
        ],
      },
      { id: 'concepts-transactions', label: 'Transactions', href: '/docs/concepts/transactions' },
      { id: 'concepts-none', label: 'Working with none', href: '/docs/concepts/none' },
      { id: 'concepts-data-types', label: 'Data Types', href: '/docs/concepts/data-types' },
      { id: 'concepts-execution', label: 'How Queries Execute', href: '/docs/concepts/execution' },
      { id: 'concepts-ttl', label: 'TTL & Row Settings', href: '/docs/concepts/ttl' },
      { id: 'concepts-durability', label: 'Durability & Storage', href: '/docs/concepts/durability' },
    ],
  },
  {
    title: 'RQL',
    items: [
      { id: 'rql-five-minutes', label: 'RQL in Five Minutes', href: '/docs/rql', published: true },
      { id: 'rql-for-sql-users', label: 'RQL for SQL Users', href: '/docs/rql/for-sql-users', published: true },
      {
        id: 'rql-expressions',
        label: 'Expressions',
        children: [
          { id: 'expressions-overview', label: 'Overview', href: '/docs/rql/expressions' },
          { id: 'expressions-operators', label: 'Operators', href: '/docs/rql/expressions/operators' },
          { id: 'expressions-literals', label: 'Literals', href: '/docs/rql/expressions/literals' },
        ],
      },
      {
        id: 'rql-transforms',
        label: 'Pipeline Operators',
        children: [
          { id: 'transforms-overview', label: 'Overview', href: '/docs/rql/transforms' },
          { id: 'transforms-from', label: 'from', href: '/docs/rql/transforms/from' },
          { id: 'transforms-filter', label: 'filter', href: '/docs/rql/transforms/filter' },
          { id: 'transforms-map', label: 'map', href: '/docs/rql/transforms/map' },
          { id: 'transforms-extend', label: 'extend', href: '/docs/rql/transforms/extend' },
          { id: 'transforms-aggregate', label: 'aggregate', href: '/docs/rql/transforms/aggregate' },
          { id: 'transforms-sort', label: 'sort', href: '/docs/rql/transforms/sort' },
          { id: 'transforms-distinct', label: 'distinct', href: '/docs/rql/transforms/distinct' },
          { id: 'transforms-take', label: 'take', href: '/docs/rql/transforms/take' },
          { id: 'transforms-join', label: 'join', href: '/docs/rql/transforms/join' },
          { id: 'transforms-window', label: 'window', href: '/docs/rql/transforms/window' },
          { id: 'transforms-apply', label: 'apply', href: '/docs/rql/transforms/apply' },
          { id: 'transforms-cast', label: 'cast', href: '/docs/rql/transforms/cast' },
          { id: 'transforms-with', label: 'with', href: '/docs/rql/transforms/with' },
        ],
      },
      {
        id: 'rql-writing-data',
        label: 'Writing Data',
        children: [
          { id: 'dml-insert', label: 'insert', href: '/docs/scripting/dml/insert' },
          { id: 'dml-update', label: 'update', href: '/docs/scripting/dml/update' },
          { id: 'dml-delete', label: 'delete', href: '/docs/scripting/dml/delete' },
          { id: 'dml-patch', label: 'patch', href: '/docs/rql/transforms/patch' },
        ],
      },
      {
        id: 'rql-schema',
        label: 'Defining Schema',
        children: [
          { id: 'schema-namespaces', label: 'Namespaces', href: '/docs/scripting/schema/namespaces' },
          { id: 'schema-tables', label: 'Tables', href: '/docs/scripting/schema/tables' },
          { id: 'schema-enums', label: 'Enums', href: '/docs/scripting/schema/enums' },
          { id: 'schema-dictionaries', label: 'Dictionaries', href: '/docs/scripting/schema/dictionaries' },
          { id: 'schema-indexes', label: 'Indexes', href: '/docs/scripting/schema/indexes' },
          { id: 'schema-ringbuffers', label: 'Ringbuffers', href: '/docs/scripting/storage/ringbuffers' },
          { id: 'schema-series', label: 'Series', href: '/docs/scripting/storage/series' },
          { id: 'schema-views', label: 'Views', href: '/docs/scripting/views' },
          { id: 'schema-views-deferred', label: 'Deferred Views', href: '/docs/scripting/views/deferred' },
          { id: 'schema-views-transactional', label: 'Transactional Views', href: '/docs/scripting/views/transactional' },
          { id: 'schema-subscriptions', label: 'Subscriptions', href: '/docs/scripting/subscriptions' },
          { id: 'schema-drop', label: 'Drop & Cleanup', href: '/docs/scripting/schema/drop' },
        ],
      },
      {
        id: 'rql-scripting',
        label: 'Scripting',
        children: [
          { id: 'scripting-overview', label: 'Overview', href: '/docs/scripting' },
          { id: 'scripting-control-flow', label: 'Variables & Control Flow', href: '/docs/rql/control-flow' },
          { id: 'scripting-match', label: 'Match', href: '/docs/rql/transforms/match' },
          { id: 'scripting-testing', label: 'Testing', href: '/docs/scripting/testing' },
          { id: 'scripting-migrations', label: 'Migrations', href: '/docs/scripting/migrations' },
        ],
      },
    ],
  },
  {
    title: 'Routines',
    items: [
      { id: 'routines-overview', label: 'Overview', href: '/docs/routines' },
      {
        id: 'routines-functions',
        label: 'Functions',
        children: [
          { id: 'functions-overview', label: 'Overview', href: '/docs/functions' },
          { id: 'functions-arithmetic-policies', label: 'Arithmetic Policies', href: '/docs/functions/arithmetic-policies' },
          {
            id: 'functions-blob',
            label: 'blob',
            href: '/docs/functions/blob',
            children: [
              { id: 'functions-blob-b58', label: 'b58', href: '/docs/functions/blob/b58' },
              { id: 'functions-blob-b64', label: 'b64', href: '/docs/functions/blob/b64' },
              { id: 'functions-blob-b64url', label: 'b64url', href: '/docs/functions/blob/b64url' },
              { id: 'functions-blob-hex', label: 'hex', href: '/docs/functions/blob/hex' },
              { id: 'functions-blob-utf8', label: 'utf8', href: '/docs/functions/blob/utf8' },
            ],
          },
          {
            id: 'functions-clock',
            label: 'clock',
            href: '/docs/functions/clock',
            children: [
              { id: 'functions-clock-advance', label: 'advance', href: '/docs/functions/clock/advance' },
              { id: 'functions-clock-now', label: 'now', href: '/docs/functions/clock/now' },
              { id: 'functions-clock-set', label: 'set', href: '/docs/functions/clock/set' },
            ],
          },
          {
            id: 'functions-date',
            label: 'date',
            href: '/docs/functions/date',
            children: [
              { id: 'functions-date-add', label: 'add', href: '/docs/functions/date/add' },
              { id: 'functions-date-age', label: 'age', href: '/docs/functions/date/age' },
              { id: 'functions-date-day', label: 'day', href: '/docs/functions/date/day' },
              { id: 'functions-date-day_of_week', label: 'day_of_week', href: '/docs/functions/date/day_of_week' },
              { id: 'functions-date-day_of_year', label: 'day_of_year', href: '/docs/functions/date/day_of_year' },
              { id: 'functions-date-days_in_month', label: 'days_in_month', href: '/docs/functions/date/days_in_month' },
              { id: 'functions-date-diff', label: 'diff', href: '/docs/functions/date/diff' },
              { id: 'functions-date-end_of_month', label: 'end_of_month', href: '/docs/functions/date/end_of_month' },
              { id: 'functions-date-format', label: 'format', href: '/docs/functions/date/format' },
              { id: 'functions-date-is_leap_year', label: 'is_leap_year', href: '/docs/functions/date/is_leap_year' },
              { id: 'functions-date-month', label: 'month', href: '/docs/functions/date/month' },
              { id: 'functions-date-new', label: 'new', href: '/docs/functions/date/new' },
              { id: 'functions-date-now', label: 'now', href: '/docs/functions/date/now' },
              { id: 'functions-date-quarter', label: 'quarter', href: '/docs/functions/date/quarter' },
              { id: 'functions-date-start_of_month', label: 'start_of_month', href: '/docs/functions/date/start_of_month' },
              { id: 'functions-date-start_of_year', label: 'start_of_year', href: '/docs/functions/date/start_of_year' },
              { id: 'functions-date-subtract', label: 'subtract', href: '/docs/functions/date/subtract' },
              { id: 'functions-date-trunc', label: 'trunc', href: '/docs/functions/date/trunc' },
              { id: 'functions-date-week', label: 'week', href: '/docs/functions/date/week' },
              { id: 'functions-date-year', label: 'year', href: '/docs/functions/date/year' },
            ],
          },
          {
            id: 'functions-datetime',
            label: 'datetime',
            href: '/docs/functions/datetime',
            children: [
              { id: 'functions-datetime-add', label: 'add', href: '/docs/functions/datetime/add' },
              { id: 'functions-datetime-age', label: 'age', href: '/docs/functions/datetime/age' },
              { id: 'functions-datetime-date', label: 'date', href: '/docs/functions/datetime/date' },
              { id: 'functions-datetime-day', label: 'day', href: '/docs/functions/datetime/day' },
              { id: 'functions-datetime-day_of_week', label: 'day_of_week', href: '/docs/functions/datetime/day_of_week' },
              { id: 'functions-datetime-day_of_year', label: 'day_of_year', href: '/docs/functions/datetime/day_of_year' },
              { id: 'functions-datetime-diff', label: 'diff', href: '/docs/functions/datetime/diff' },
              { id: 'functions-datetime-epoch', label: 'epoch', href: '/docs/functions/datetime/epoch' },
              { id: 'functions-datetime-epoch_millis', label: 'epoch_millis', href: '/docs/functions/datetime/epoch_millis' },
              { id: 'functions-datetime-format', label: 'format', href: '/docs/functions/datetime/format' },
              { id: 'functions-datetime-from_epoch', label: 'from_epoch', href: '/docs/functions/datetime/from_epoch' },
              { id: 'functions-datetime-from_epoch_millis', label: 'from_epoch_millis', href: '/docs/functions/datetime/from_epoch_millis' },
              { id: 'functions-datetime-hour', label: 'hour', href: '/docs/functions/datetime/hour' },
              { id: 'functions-datetime-minute', label: 'minute', href: '/docs/functions/datetime/minute' },
              { id: 'functions-datetime-month', label: 'month', href: '/docs/functions/datetime/month' },
              { id: 'functions-datetime-nanosecond', label: 'nanosecond', href: '/docs/functions/datetime/nanosecond' },
              { id: 'functions-datetime-new', label: 'new', href: '/docs/functions/datetime/new' },
              { id: 'functions-datetime-now', label: 'now', href: '/docs/functions/datetime/now' },
              { id: 'functions-datetime-quarter', label: 'quarter', href: '/docs/functions/datetime/quarter' },
              { id: 'functions-datetime-second', label: 'second', href: '/docs/functions/datetime/second' },
              { id: 'functions-datetime-subtract', label: 'subtract', href: '/docs/functions/datetime/subtract' },
              { id: 'functions-datetime-time', label: 'time', href: '/docs/functions/datetime/time' },
              { id: 'functions-datetime-trunc', label: 'trunc', href: '/docs/functions/datetime/trunc' },
              { id: 'functions-datetime-week', label: 'week', href: '/docs/functions/datetime/week' },
              { id: 'functions-datetime-year', label: 'year', href: '/docs/functions/datetime/year' },
            ],
          },
          {
            id: 'functions-duration',
            label: 'duration',
            href: '/docs/functions/duration',
            children: [
              { id: 'functions-duration-add', label: 'add', href: '/docs/functions/duration/add' },
              { id: 'functions-duration-days', label: 'days', href: '/docs/functions/duration/days' },
              { id: 'functions-duration-format', label: 'format', href: '/docs/functions/duration/format' },
              { id: 'functions-duration-get_days', label: 'get_days', href: '/docs/functions/duration/get_days' },
              { id: 'functions-duration-get_months', label: 'get_months', href: '/docs/functions/duration/get_months' },
              { id: 'functions-duration-get_nanos', label: 'get_nanos', href: '/docs/functions/duration/get_nanos' },
              { id: 'functions-duration-hours', label: 'hours', href: '/docs/functions/duration/hours' },
              { id: 'functions-duration-millis', label: 'millis', href: '/docs/functions/duration/millis' },
              { id: 'functions-duration-minutes', label: 'minutes', href: '/docs/functions/duration/minutes' },
              { id: 'functions-duration-months', label: 'months', href: '/docs/functions/duration/months' },
              { id: 'functions-duration-negate', label: 'negate', href: '/docs/functions/duration/negate' },
              { id: 'functions-duration-scale', label: 'scale', href: '/docs/functions/duration/scale' },
              { id: 'functions-duration-seconds', label: 'seconds', href: '/docs/functions/duration/seconds' },
              { id: 'functions-duration-subtract', label: 'subtract', href: '/docs/functions/duration/subtract' },
              { id: 'functions-duration-trunc', label: 'trunc', href: '/docs/functions/duration/trunc' },
              { id: 'functions-duration-weeks', label: 'weeks', href: '/docs/functions/duration/weeks' },
              { id: 'functions-duration-years', label: 'years', href: '/docs/functions/duration/years' },
            ],
          },
          {
            id: 'functions-identity',
            label: 'identity',
            href: '/docs/functions/identity',
            children: [
              { id: 'functions-identity-id', label: 'id', href: '/docs/functions/identity/id' },
            ],
          },
          {
            id: 'functions-is',
            label: 'is',
            href: '/docs/functions/is',
            children: [
              { id: 'functions-is-anonymous', label: 'anonymous', href: '/docs/functions/is/anonymous' },
              { id: 'functions-is-none', label: 'none', href: '/docs/functions/is/none' },
              { id: 'functions-is-root', label: 'root', href: '/docs/functions/is/root' },
              { id: 'functions-is-some', label: 'some', href: '/docs/functions/is/some' },
              { id: 'functions-is-type', label: 'type', href: '/docs/functions/is/type' },
            ],
          },
          {
            id: 'functions-json',
            label: 'json',
            href: '/docs/functions/json',
            children: [
              { id: 'functions-json-array', label: 'array', href: '/docs/functions/json/array' },
              { id: 'functions-json-object', label: 'object', href: '/docs/functions/json/object' },
              { id: 'functions-json-serialize', label: 'serialize', href: '/docs/functions/json/serialize' },
              { id: 'functions-json-pretty', label: 'pretty', href: '/docs/functions/json/pretty' },
            ],
          },
          {
            id: 'functions-math',
            label: 'math',
            href: '/docs/functions/math',
            children: [
              { id: 'functions-math-abs', label: 'abs', href: '/docs/functions/math/abs' },
              { id: 'functions-math-acos', label: 'acos', href: '/docs/functions/math/acos' },
              { id: 'functions-math-asin', label: 'asin', href: '/docs/functions/math/asin' },
              { id: 'functions-math-atan', label: 'atan', href: '/docs/functions/math/atan' },
              { id: 'functions-math-atan2', label: 'atan2', href: '/docs/functions/math/atan2' },
              { id: 'functions-math-avg', label: 'avg', href: '/docs/functions/math/avg' },
              { id: 'functions-math-ceil', label: 'ceil', href: '/docs/functions/math/ceil' },
              { id: 'functions-math-clamp', label: 'clamp', href: '/docs/functions/math/clamp' },
              { id: 'functions-math-cos', label: 'cos', href: '/docs/functions/math/cos' },
              { id: 'functions-math-e', label: 'e', href: '/docs/functions/math/e' },
              { id: 'functions-math-exp', label: 'exp', href: '/docs/functions/math/exp' },
              { id: 'functions-math-floor', label: 'floor', href: '/docs/functions/math/floor' },
              { id: 'functions-math-gcd', label: 'gcd', href: '/docs/functions/math/gcd' },
              { id: 'functions-math-lcm', label: 'lcm', href: '/docs/functions/math/lcm' },
              { id: 'functions-math-log', label: 'log', href: '/docs/functions/math/log' },
              { id: 'functions-math-log10', label: 'log10', href: '/docs/functions/math/log10' },
              { id: 'functions-math-log2', label: 'log2', href: '/docs/functions/math/log2' },
              { id: 'functions-math-max', label: 'max', href: '/docs/functions/math/max' },
              { id: 'functions-math-min', label: 'min', href: '/docs/functions/math/min' },
              { id: 'functions-math-mod', label: 'mod', href: '/docs/functions/math/mod' },
              { id: 'functions-math-pi', label: 'pi', href: '/docs/functions/math/pi' },
              { id: 'functions-math-power', label: 'power', href: '/docs/functions/math/power' },
              { id: 'functions-math-round', label: 'round', href: '/docs/functions/math/round' },
              { id: 'functions-math-sign', label: 'sign', href: '/docs/functions/math/sign' },
              { id: 'functions-math-sin', label: 'sin', href: '/docs/functions/math/sin' },
              { id: 'functions-math-sqrt', label: 'sqrt', href: '/docs/functions/math/sqrt' },
              { id: 'functions-math-sum', label: 'sum', href: '/docs/functions/math/sum' },
              { id: 'functions-math-tan', label: 'tan', href: '/docs/functions/math/tan' },
              { id: 'functions-math-truncate', label: 'truncate', href: '/docs/functions/math/truncate' },
            ],
          },
          {
            id: 'functions-meta',
            label: 'meta',
            href: '/docs/functions/meta',
            children: [
              { id: 'functions-meta-type', label: 'type', href: '/docs/functions/meta/type' },
            ],
          },
          {
            id: 'functions-text',
            label: 'text',
            href: '/docs/functions/text',
            children: [
              { id: 'functions-text-ascii', label: 'ascii', href: '/docs/functions/text/ascii' },
              { id: 'functions-text-char', label: 'char', href: '/docs/functions/text/char' },
              { id: 'functions-text-concat', label: 'concat', href: '/docs/functions/text/concat' },
              { id: 'functions-text-contains', label: 'contains', href: '/docs/functions/text/contains' },
              { id: 'functions-text-count', label: 'count', href: '/docs/functions/text/count' },
              { id: 'functions-text-ends_with', label: 'ends_with', href: '/docs/functions/text/ends_with' },
              { id: 'functions-text-format_bytes', label: 'format_bytes', href: '/docs/functions/text/format_bytes' },
              { id: 'functions-text-format_bytes_si', label: 'format_bytes_si', href: '/docs/functions/text/format_bytes_si' },
              { id: 'functions-text-index_of', label: 'index_of', href: '/docs/functions/text/index_of' },
              { id: 'functions-text-length', label: 'length', href: '/docs/functions/text/length' },
              { id: 'functions-text-lower', label: 'lower', href: '/docs/functions/text/lower' },
              { id: 'functions-text-pad_left', label: 'pad_left', href: '/docs/functions/text/pad_left' },
              { id: 'functions-text-pad_right', label: 'pad_right', href: '/docs/functions/text/pad_right' },
              { id: 'functions-text-repeat', label: 'repeat', href: '/docs/functions/text/repeat' },
              { id: 'functions-text-replace', label: 'replace', href: '/docs/functions/text/replace' },
              { id: 'functions-text-reverse', label: 'reverse', href: '/docs/functions/text/reverse' },
              { id: 'functions-text-starts_with', label: 'starts_with', href: '/docs/functions/text/starts_with' },
              { id: 'functions-text-substring', label: 'substring', href: '/docs/functions/text/substring' },
              { id: 'functions-text-trim', label: 'trim', href: '/docs/functions/text/trim' },
              { id: 'functions-text-trim_end', label: 'trim_end', href: '/docs/functions/text/trim_end' },
              { id: 'functions-text-trim_start', label: 'trim_start', href: '/docs/functions/text/trim_start' },
              { id: 'functions-text-upper', label: 'upper', href: '/docs/functions/text/upper' },
            ],
          },
          {
            id: 'functions-time',
            label: 'time',
            href: '/docs/functions/time',
            children: [
              { id: 'functions-time-add', label: 'add', href: '/docs/functions/time/add' },
              { id: 'functions-time-age', label: 'age', href: '/docs/functions/time/age' },
              { id: 'functions-time-diff', label: 'diff', href: '/docs/functions/time/diff' },
              { id: 'functions-time-format', label: 'format', href: '/docs/functions/time/format' },
              { id: 'functions-time-hour', label: 'hour', href: '/docs/functions/time/hour' },
              { id: 'functions-time-minute', label: 'minute', href: '/docs/functions/time/minute' },
              { id: 'functions-time-nanosecond', label: 'nanosecond', href: '/docs/functions/time/nanosecond' },
              { id: 'functions-time-new', label: 'new', href: '/docs/functions/time/new' },
              { id: 'functions-time-now', label: 'now', href: '/docs/functions/time/now' },
              { id: 'functions-time-second', label: 'second', href: '/docs/functions/time/second' },
              { id: 'functions-time-subtract', label: 'subtract', href: '/docs/functions/time/subtract' },
              { id: 'functions-time-trunc', label: 'trunc', href: '/docs/functions/time/trunc' },
            ],
          },
        ],
      },
      {
        id: 'routines-procedures',
        label: 'Procedures',
        children: [
          { id: 'procedures-overview', label: 'Overview', href: '/docs/scripting/procedures' },
          { id: 'procedures-control-flow', label: 'Parameters & Control Flow', href: '/docs/scripting/procedures/control-flow' },
        ],
      },
    ],
  },
  {
    title: 'Clients',
    items: [
      { id: 'clients-overview', label: 'Overview', href: '/docs/clients' },
      { id: 'clients-rust-embedded', label: 'Rust (Embedded)', href: '/docs/clients/rust-embedded' },
      { id: 'clients-rust', label: 'Rust (Client)', href: '/docs/clients/rust' },
      { id: 'clients-typescript', label: 'TypeScript / JavaScript', href: '/docs/clients/typescript' },
      { id: 'clients-python', label: 'Python', href: '/docs/clients/python' },
      { id: 'clients-wire-formats', label: 'Wire Formats', href: '/docs/clients/wire-formats' },
    ],
  },
  {
    title: 'Guides',
    items: [
      { id: 'guides-model-state', label: 'Model Application State', href: '/docs/guides/model-application-state' },
      { id: 'guides-incremental-views', label: 'Build Incremental Views', href: '/docs/guides/incremental-views' },
      { id: 'guides-windowed-aggregation', label: 'Windowed Aggregation', href: '/docs/guides/windowed-aggregation' },
      { id: 'guides-ttl', label: 'Expire Data with TTL', href: '/docs/guides/expire-with-ttl' },
      { id: 'guides-import-export', label: 'Import & Export Data', href: '/docs/guides/import-export' },
    ],
  },
  {
    title: 'Operate',
    items: [
      { id: 'operate-server', label: 'Run the Server', href: '/docs/operate/server' },
      { id: 'operate-configuration', label: 'Storage & Configuration', href: '/docs/operate/configuration' },
      { id: 'operate-observability', label: 'Metrics & Observability', href: '/docs/operate/observability' },
      { id: 'operate-access-control', label: 'Access Control', href: '/docs/scripting/access-control' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { id: 'resources-roadmap', label: 'Roadmap & Experimental', href: '/docs/resources/roadmap' },
      { id: 'resources-caveats', label: 'Caveats & Limitations', href: '/docs/resources/caveats' },
      { id: 'resources-faq', label: 'Troubleshooting & FAQ', href: '/docs/resources/faq' },
      { id: 'resources-ai-agents', label: 'For AI Agents', href: '/docs/resources/ai-agents' },
    ],
  },
];
