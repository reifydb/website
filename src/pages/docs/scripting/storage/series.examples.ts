import type { CodeExample } from '@/lib/examples/types';

export const scriptingStorageSeriesExamples: CodeExample[] = [
{
    id: 'scripting-create-series',
    title: 'Create Series',
    category: 'scripting',
    code: `CREATE NAMESPACE st_sr;
CREATE TAG st_sr::source {
  Sensor { location: utf8 }
};
CREATE SERIES st_sr::metrics {
  value: float8
} WITH { tag: st_sr::source, precision: microsecond }`,
  },
];
