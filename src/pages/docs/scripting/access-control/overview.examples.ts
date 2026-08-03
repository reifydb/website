import type { CodeExample } from '@/lib/examples/types';

export const createUserExample: CodeExample = {
  id: 'scripting-create-user',
  title: 'Create User',
  category: 'scripting',
  code: `create user alice`,
  expected: `identity | created
---------+--------
alice    | true`,
};

export const createRoleExample: CodeExample = {
  id: 'scripting-create-role',
  title: 'Create Role',
  category: 'scripting',
  code: `create role editors`,
  expected: `role    | created
--------+--------
editors | true`,
};

export const createPolicyExample: CodeExample = {
  id: 'scripting-create-policy',
  title: 'Create Policy',
  category: 'scripting',
  code: `create namespace ac;
create table ac::documents { id: int4, title: utf8, public: bool };

create table policy public_only on ac::documents {
  from: { filter { public == true } }
}`,
  expected: `policy      | created
------------+--------
public_only | true`,
};

export const grantRevokeExample: CodeExample = {
  id: 'scripting-grant-revoke',
  title: 'Grant and Revoke',
  category: 'scripting',
  code: `create role managers;
create user bob;
grant managers to bob;
revoke managers from bob`,
  expected: `role     | identity | revoked
---------+----------+--------
managers | bob      | true`,
};

export const accessControlOverviewExamples: CodeExample[] = [
  createUserExample,
  createRoleExample,
  createPolicyExample,
  grantRevokeExample,
];
