import type { CodeExample } from '@/lib/examples/types';

export const dmHandlersSetupExample: CodeExample = {
    id: 'dm-handlers-setup',
    title: 'An Event and the Tables Handlers Will Write',
    category: 'concept',
    code: `create namespace dm_h;
create table dm_h::audit { kind: utf8 };
create table dm_h::stats { total: int4 };
create event dm_h::order_event {
  OrderPlaced { id: int4, amount: int4 },
  OrderShipped { id: int4 }
}`,
  };

export const dmHandlersTwoExample: CodeExample = {
    id: 'dm-handlers-two',
    title: 'Several Handlers, One Variant',
    category: 'concept',
    code: `create handler dm_h::record_order on dm_h::order_event::OrderPlaced {
  insert dm_h::audit [{ kind: "placed" }]
};
create handler dm_h::track_revenue on dm_h::order_event::OrderPlaced {
  insert dm_h::stats [{ total: event_amount }]
};
dispatch dm_h::order_event::OrderPlaced { id: 1, amount: 250 }`,
    expected: `handlers_fired
--------------
2`,
  };

export const dmHandlersEffectsExample: CodeExample = {
    id: 'dm-handlers-effects',
    title: 'Each Handler Did Its Own Work',
    category: 'concept',
    code: `from dm_h::stats`,
    expected: `total
-----
250`,
  };

export const dmHandlersScriptedExample: CodeExample = {
    id: 'dm-handlers-scripted',
    title: 'Handler Bodies Are Scripts',
    category: 'concept',
    code: `create table dm_h::results { sum: int4 };
create event dm_h::evt { Compute };
create handler dm_h::on_compute on dm_h::evt::Compute {
  let $a = 10;
  let $b = 20;
  insert dm_h::results [{ sum: $a + $b }]
};
dispatch dm_h::evt::Compute { }`,
    expected: `handlers_fired
--------------
1`,
  };

export const dmHandlersScriptedEffectExample: CodeExample = {
    id: 'dm-handlers-scripted-effect',
    title: 'Read the Computed Result',
    category: 'concept',
    code: `from dm_h::results`,
    expected: `sum
---
30`,
  };

export const dmHandlersNestedExample: CodeExample = {
    id: 'dm-handlers-nested',
    title: 'Handlers Can Dispatch Further Events',
    category: 'concept',
    code: `create handler dm_h::on_shipped on dm_h::order_event::OrderShipped {
  insert dm_h::audit [{ kind: "shipped" }]
};
create handler dm_h::auto_ship on dm_h::order_event::OrderPlaced {
  dispatch dm_h::order_event::OrderShipped { id: event_id }
};
dispatch dm_h::order_event::OrderPlaced { id: 2, amount: 99 }`,
    expected: `handlers_fired
--------------
3`,
  };

export const dmHandlersNestedEffectsExample: CodeExample = {
    id: 'dm-handlers-nested-effects',
    title: 'The Whole Chain Committed Together',
    category: 'concept',
    code: `from dm_h::audit`,
    expected: `kind
-------
shipped
placed
placed`,
  };

export const dmHandlersDropExample: CodeExample = {
    id: 'dm-handlers-drop',
    title: 'Drop a Handler',
    category: 'concept',
    code: `drop handler dm_h::auto_ship`,
    expected: `namespace | handler   | dropped
----------+-----------+--------
dm_h      | auto_ship | true`,
  };

export const dmHandlersAfterDropExample: CodeExample = {
    id: 'dm-handlers-after-drop',
    title: 'Dispatch Reflects the Remaining Handlers',
    category: 'concept',
    code: `dispatch dm_h::order_event::OrderPlaced { id: 3, amount: 10 }`,
    expected: `handlers_fired
--------------
2`,
  };

export const dataModelHandlersExamples: CodeExample[] = [
  dmHandlersSetupExample,
  dmHandlersTwoExample,
  dmHandlersEffectsExample,
  dmHandlersScriptedExample,
  dmHandlersScriptedEffectExample,
  dmHandlersNestedExample,
  dmHandlersNestedEffectsExample,
  dmHandlersDropExample,
  dmHandlersAfterDropExample,
];
