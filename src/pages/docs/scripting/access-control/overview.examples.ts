import type { CodeExample } from '@/lib/examples/types';

export const acCreateUserExample: CodeExample = {
    id: 'ac-create-user',
    title: 'Create an Identity',
    code: `create user alice`,
    expected: `identity | created
---------+--------
alice    | true`,
  };

export const acCreateUserDuplicateExample: CodeExample = {
    id: 'ac-create-user-duplicate',
    title: 'Identity Names Are Unique',
    description: 'Creating an identity that already exists fails with CA_040 instead of silently reusing it.',
    code: `create user alice`,
    expectsError: true,
  };

export const acDropUserIfExistsExample: CodeExample = {
    id: 'ac-drop-user-if-exists',
    title: 'Drop with if exists',
    code: `drop user if exists nobody`,
    expected: `identity | dropped
---------+--------
nobody   | false`,
  };

export const acCreateRoleExample: CodeExample = {
    id: 'ac-create-role',
    title: 'Create a Role',
    code: `create role editors`,
    expected: `role    | created
--------+--------
editors | true`,
  };

export const acGrantExample: CodeExample = {
    id: 'ac-grant',
    title: 'Grant a Role to Identities',
    code: `create user bob;
grant editors to alice;
grant editors to bob`,
    expected: `role    | identity | granted
--------+----------+--------
editors | bob      | true`,
  };

export const acRevokeExample: CodeExample = {
    id: 'ac-revoke',
    title: 'Revoke a Role',
    code: `revoke editors from bob`,
    expected: `role    | identity | revoked
--------+----------+--------
editors | bob      | true`,
  };

export const acGrantMissingRoleExample: CodeExample = {
    id: 'ac-grant-missing-role',
    title: 'Grants Need an Existing Role',
    description: 'Granting a role that was never created fails with CA_044; a missing identity fails with CA_043.',
    code: `grant reviewers to alice`,
    expectsError: true,
  };

export const acListIdentitiesExample: CodeExample = {
    id: 'ac-list-identities',
    title: 'Inspect Identities and Roles',
    code: `from system::identities map { name, enabled } sort { name: asc }`,
    expected: `name  | enabled
------+--------
alice | true
bob   | true
root  | true`,
  };

export const acAuthPasswordExample: CodeExample = {
    id: 'ac-auth-password',
    title: 'Attach a Password',
    code: `create authentication for alice { method: password; password: "alice-pass" }`,
    expected: `user  | method   | created
------+----------+--------
alice | password | true`,
  };

export const acAuthTokenExample: CodeExample = {
    id: 'ac-auth-token',
    title: 'Issue a Token',
    description: 'The token method generates the secret for you and returns it in the token column.',
    code: `create authentication for bob { method: token }`,
  };

export const acDropAuthExample: CodeExample = {
    id: 'ac-drop-auth',
    title: 'Remove a Credential',
    code: `drop authentication for bob { method: token }`,
    expected: `user | method | dropped
-----+--------+--------
bob  | token  | true`,
  };

export const acPolicySetupExample: CodeExample = {
    id: 'ac-policy-setup',
    title: 'A Table to Protect',
    code: `create namespace ac;
create table ac::documents { org: utf8, owner: utf8, title: utf8, public: bool };
insert ac::documents [
  { org: "acme", owner: "alice", title: "Roadmap", public: true },
  { org: "acme", owner: "bob", title: "Budget", public: false },
  { org: "globex", owner: "carol", title: "Launch", public: true }
]`,
    expected: `namespace | table     | inserted
----------+-----------+---------
ac        | documents | 3`,
  };

export const acPolicyReadFilterExample: CodeExample = {
    id: 'ac-policy-read-filter',
    title: 'A Read Policy That Filters Rows',
    code: `create table policy public_only on ac::documents {
  from: { filter { public == true } }
}`,
    expected: `policy      | created
------------+--------
public_only | true`,
  };

export const acPolicyReadMapExample: CodeExample = {
    id: 'ac-policy-read-map',
    title: 'A Read Policy That Hides Columns',
    code: `create table policy hide_owner on ac::documents {
  from: { map { org, title, public } }
}`,
    expected: `policy     | created
-----------+--------
hide_owner | true`,
  };

export const acPolicyWriteRequireExample: CodeExample = {
    id: 'ac-policy-write-require',
    title: 'Write Policies With require',
    code: `create table policy title_required on ac::documents {
  insert: { require { title != "" } },
  update: { require { title != "" } },
  delete: { require { false } }
}`,
    expected: `policy         | created
---------------+--------
title_required | true`,
  };

export const acPolicyNamespaceScopeExample: CodeExample = {
    id: 'ac-policy-namespace-scope',
    title: 'A Namespace-Wide Policy',
    code: `create table policy ac_readable on ac {
  from: { filter { true } }
}`,
    expected: `policy      | created
------------+--------
ac_readable | true`,
  };

export const acPolicyIdentityNameExample: CodeExample = {
    id: 'ac-policy-identity-name',
    title: 'Rows Owned by the Caller',
    code: `create table policy owner_only on ac::documents {
  from: { filter { owner == $identity.name } }
}`,
    expected: `policy     | created
-----------+--------
owner_only | true`,
  };

export const acPolicyIdentityRolesExample: CodeExample = {
    id: 'ac-policy-identity-roles',
    title: 'Gate a Write on a Role',
    code: `create table policy editors_update on ac::documents {
  update: { require { $identity.roles contains ["editors"] } }
}`,
    expected: `policy         | created
---------------+--------
editors_update | true`,
  };

export const acUserAttributeExample: CodeExample = {
    id: 'ac-user-attribute',
    title: 'Declare and Assign a User Attribute',
    code: `create user attribute org_id: utf8;
create user carol { org_id: "globex" };
alter user carol { org_id: "acme" }`,
    expected: `identity | altered
---------+--------
carol    | true`,
  };

export const acUserAttributeUndeclaredExample: CodeExample = {
    id: 'ac-user-attribute-undeclared',
    title: 'Attributes Must Be Declared First',
    description: 'Assigning a key that was never declared with create user attribute is rejected.',
    code: `create user dave { team: "core" }`,
    expectsError: true,
  };

export const acPolicyAttributeExample: CodeExample = {
    id: 'ac-policy-attribute',
    title: 'Tenant Isolation From an Attribute',
    code: `create table policy tenant_isolation on ac::documents {
  from: { filter { org == $identity.org_id } }
}`,
    expected: `policy           | created
-----------------+--------
tenant_isolation | true`,
  };

export const acListPoliciesExample: CodeExample = {
    id: 'ac-list-policies',
    title: 'Inspect Policies',
    code: `from system::policies
map { name, target_namespace, target_shape, enabled }
sort { name: asc }`,
    expected: `name             | target_namespace | target_shape | enabled
-----------------+------------------+--------------+--------
ac_readable      | ac               |              | true
editors_update   | ac               | documents    | true
hide_owner       | ac               | documents    | true
owner_only       | ac               | documents    | true
public_only      | ac               | documents    | true
tenant_isolation | ac               | documents    | true
title_required   | ac               | documents    | true`,
  };

export const acPolicyDisableExample: CodeExample = {
    id: 'ac-policy-disable',
    title: 'Disable a Policy',
    code: `alter table policy public_only disable`,
    expected: `policy      | altered
------------+--------
public_only | true`,
  };

export const acPolicyEnableExample: CodeExample = {
    id: 'ac-policy-enable',
    title: 'Enable It Again',
    code: `alter table policy public_only enable`,
    expected: `policy      | altered
------------+--------
public_only | true`,
  };

export const acPolicyDropExample: CodeExample = {
    id: 'ac-policy-drop',
    title: 'Drop a Policy',
    code: `drop table policy if exists legacy_rule;
drop table policy editors_update`,
    expected: `policy         | dropped
---------------+--------
editors_update | true`,
  };

export const acRootSeesAllExample: CodeExample = {
    id: 'ac-root-sees-all',
    title: 'The Playground Runs as root',
    code: `from ac::documents sort { title: asc }`,
    expected: `org    | owner | title   | public | #rownum
-------+-------+---------+--------+--------
acme   | bob   | Budget  | false  | 2
globex | carol | Launch  | true   | 3
acme   | alice | Roadmap | true   | 1`,
  };

export const acDropRoleAndUserExample: CodeExample = {
    id: 'ac-drop-role-and-user',
    title: 'Drop a Role and an Identity',
    code: `drop role editors;
drop user carol`,
    expected: `identity | dropped
---------+--------
carol    | true`,
  };

export const accessControlOverviewExamples: CodeExample[] = [
  acCreateUserExample,
  acCreateUserDuplicateExample,
  acDropUserIfExistsExample,
  acCreateRoleExample,
  acGrantExample,
  acRevokeExample,
  acGrantMissingRoleExample,
  acListIdentitiesExample,
  acAuthPasswordExample,
  acAuthTokenExample,
  acDropAuthExample,
  acPolicySetupExample,
  acPolicyReadFilterExample,
  acPolicyReadMapExample,
  acPolicyWriteRequireExample,
  acPolicyNamespaceScopeExample,
  acPolicyIdentityNameExample,
  acPolicyIdentityRolesExample,
  acUserAttributeExample,
  acUserAttributeUndeclaredExample,
  acPolicyAttributeExample,
  acListPoliciesExample,
  acPolicyDisableExample,
  acPolicyEnableExample,
  acPolicyDropExample,
  acRootSeesAllExample,
  acDropRoleAndUserExample,
];
