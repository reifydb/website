import type { CodeExample } from '../index';

export const scriptingAccessControlExamples: CodeExample[] = [
  {
    id: 'scripting-create-user',
    title: 'Create User',
    category: 'scripting',
    code: `CREATE USER alice`,
  },
  {
    id: 'scripting-create-role',
    title: 'Create Role',
    category: 'scripting',
    code: `CREATE ROLE editors`,
  },
  {
    id: 'scripting-create-policy',
    title: 'Create Policy',
    category: 'scripting',
    code: `CREATE NAMESPACE ac;
CREATE TABLE ac::documents { id: int4, title: utf8 };

CREATE TABLE POLICY read_only {
  read: { FILTER { true } }
}`,
  },
  {
    id: 'scripting-grant-revoke',
    title: 'Grant and Revoke',
    category: 'scripting',
    code: `CREATE ROLE managers;
CREATE USER bob;
GRANT managers TO bob;
REVOKE managers FROM bob`,
  },
];
