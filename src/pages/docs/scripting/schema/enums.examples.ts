import type { CodeExample } from '@/lib/examples/types';

export const scriptingCreateEnumUnitExample: CodeExample = {
    id: 'scripting-create-enum-unit',
    title: 'Unit Enum',
    category: 'scripting',
    code: `CREATE NAMESPACE sc_eu;
CREATE ENUM sc_eu::color {
  Red,
  Green,
  Blue
}`,
  };

export const scriptingCreateEnumStructExample: CodeExample = {
    id: 'scripting-create-enum-struct',
    title: 'Struct Enum',
    category: 'scripting',
    code: `CREATE NAMESPACE sc_es;
CREATE ENUM sc_es::shape {
  Circle { radius: float8 },
  Rectangle { width: float8, height: float8 }
}`,
  };

export const scriptingSchemaEnumsExamples: CodeExample[] = [
  scriptingCreateEnumUnitExample,
  scriptingCreateEnumStructExample,
];
