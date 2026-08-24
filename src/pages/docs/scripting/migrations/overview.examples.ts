import type { CodeExample } from '@/lib/examples/types';

export const migRegisterExample: CodeExample = {
    id: 'mig-register',
    title: 'Register a Migration',
    code: `create migration '001_shop_schema' {
  create namespace shop;
  create table shop::products { id: int4, name: utf8, price: float8 }
}`,
    expected: `migration       | created
----------------+--------
001_shop_schema | true`,
  };

export const migPendingExample: CodeExample = {
    id: 'mig-pending',
    title: 'Registered Means Pending, Not Applied',
    code: `from system::migrations map { name, action }`,
    expected: `name            | action
----------------+--------
001_shop_schema | Pending`,
  };

export const migApplyExample: CodeExample = {
    id: 'mig-apply',
    title: 'Apply Pending Migrations',
    code: `migrate`,
    expected: `migrations_applied
------------------
1`,
  };

export const migAppliedExample: CodeExample = {
    id: 'mig-applied',
    title: 'The Body Ran and the Status Changed',
    code: `from system::migrations map { name, action }`,
    expected: `name            | action
----------------+--------
001_shop_schema | Applied`,
  };

export const migNoopExample: CodeExample = {
    id: 'mig-noop',
    title: 'Running migrate Again Does Nothing',
    code: `migrate`,
    expected: `migrations_applied
------------------
0`,
  };

export const migRegisterMoreExample: CodeExample = {
    id: 'mig-register-more',
    title: 'Register Two More, One with a Rollback Body',
    code: `create migration '002_shop_seed' {
  insert shop::products [
    { id: 1, name: "Widget", price: 9.99 },
    { id: 2, name: "Gadget", price: 24.5 }
  ]
};
create migration '003_shop_orders' {
  create table shop::orders { id: int4, product_id: int4, qty: int4 }
} rollback {
  drop table shop::orders
}`,
    expected: `migration       | created
----------------+--------
003_shop_orders | true`,
  };

export const migToTargetExample: CodeExample = {
    id: 'mig-to-target',
    title: 'Apply Up To a Target',
    code: `migrate to '002_shop_seed'`,
    expected: `migrations_applied
------------------
1`,
  };

export const migTargetStatusExample: CodeExample = {
    id: 'mig-target-status',
    title: 'Everything After the Target Stays Pending',
    code: `from system::migrations map { name, action }`,
    expected: `name            | action
----------------+--------
003_shop_orders | Pending
002_shop_seed   | Applied
001_shop_schema | Applied`,
  };

export const migApplyRestExample: CodeExample = {
    id: 'mig-apply-rest',
    title: 'Apply the Rest',
    code: `migrate`,
    expected: `migrations_applied
------------------
1`,
  };

export const migRollbackExample: CodeExample = {
    id: 'mig-rollback',
    title: 'Roll Back the Last Applied Migration',
    code: `rollback migration`,
    expected: `migrations_rolled_back
----------------------
1`,
  };

export const migRollbackStatusExample: CodeExample = {
    id: 'mig-rollback-status',
    title: 'A Rolled-Back Migration Is Pending Again',
    code: `from system::migrations map { name, action }`,
    expected: `name            | action
----------------+---------
003_shop_orders | Rollback
002_shop_seed   | Applied
001_shop_schema | Applied`,
  };

export const migReapplyExample: CodeExample = {
    id: 'mig-reapply',
    title: 'migrate Re-Applies It',
    code: `migrate`,
    expected: `migrations_applied
------------------
1`,
  };

export const migApplyNoRollbackExample: CodeExample = {
    id: 'mig-apply-no-rollback',
    title: 'Apply a Migration That Has No Rollback Body',
    code: `create migration '004_shop_discounts' {
  alter table shop::products add column discount: Option(float8)
};
migrate`,
    expected: `migrations_applied
------------------
1`,
  };

export const migNoRollbackBodyExample: CodeExample = {
    id: 'mig-no-rollback-body',
    title: 'It Cannot Be Rolled Back',
    description: 'Only migrations that declared a rollback block can be reverted; the engine refuses with CA_048.',
    code: `rollback migration`,
    expectsError: true,
  };

export const migRollbackFailedStatusExample: CodeExample = {
    id: 'mig-rollback-failed-status',
    title: 'The Failed Request Changed Nothing',
    code: `from system::migrations map { name, action }`,
    expected: `name               | action
-------------------+--------
004_shop_discounts | Applied
003_shop_orders    | Applied
002_shop_seed      | Applied
001_shop_schema    | Applied`,
  };

export const migIdempotentExample: CodeExample = {
    id: 'mig-idempotent',
    title: 'Re-Registering the Same Body Is a No-Op',
    code: `create migration '001_shop_schema' {
  create namespace shop;
  create table shop::products { id: int4, name: utf8, price: float8 }
}`,
    expected: `migration       | created
----------------+--------
001_shop_schema | true`,
  };

export const migImmutableExample: CodeExample = {
    id: 'mig-immutable',
    title: 'A Different Body Under the Same Name Is Rejected',
    description: 'The registered hash covers body and rollback; any change under an existing name fails with CA_049.',
    code: `create migration '001_shop_schema' {
  create namespace shop_v2
}`,
    expectsError: true,
  };

export const migFailingRegisterExample: CodeExample = {
    id: 'mig-failing-register',
    title: 'Register a Migration Whose Body Will Fail',
    code: `create namespace shop_dup;
create migration '005_shop_dup' {
  create namespace shop_dup
}`,
    expected: `migration    | created
-------------+--------
005_shop_dup | true`,
  };

export const migFailingApplyExample: CodeExample = {
    id: 'mig-failing-apply',
    title: 'migrate Fails and Rolls Back',
    description: 'The body hits CA_001 (namespace already exists), so the whole migrate request fails.',
    code: `migrate`,
    expectsError: true,
  };

export const migFailingStatusExample: CodeExample = {
    id: 'mig-failing-status',
    title: 'The Migration Stays Pending',
    code: `from system::migrations filter { name == "005_shop_dup" } map { name, action }`,
    expected: `name         | action
-------------+--------
005_shop_dup | Pending`,
  };

export const scriptingMigrationsOverviewExamples: CodeExample[] = [
  migRegisterExample,
  migPendingExample,
  migApplyExample,
  migAppliedExample,
  migNoopExample,
  migRegisterMoreExample,
  migToTargetExample,
  migTargetStatusExample,
  migApplyRestExample,
  migRollbackExample,
  migRollbackStatusExample,
  migReapplyExample,
  migApplyNoRollbackExample,
  migNoRollbackBodyExample,
  migRollbackFailedStatusExample,
  migIdempotentExample,
  migImmutableExample,
  migFailingRegisterExample,
  migFailingApplyExample,
  migFailingStatusExample,
];
