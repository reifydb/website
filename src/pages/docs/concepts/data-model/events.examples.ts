import type { CodeExample } from '@/lib/examples/types';

export const dmEventsCreateExample: CodeExample = {
    id: 'dm-events-create',
    title: 'Declare an Event Type',
    code: `create namespace dm_evt;
create event dm_evt::order_event {
  OrderPlaced { id: int4, note: utf8 },
  OrderShipped { id: int4 }
}`,
    expected: `id    | namespace | event       | created
------+-----------+-------------+--------
16416 | dm_evt    | order_event | true`,
  };

export const dmEventsUnhandledExample: CodeExample = {
    id: 'dm-events-unhandled',
    title: 'Dispatch with No Handlers',
    code: `dispatch dm_evt::order_event::OrderPlaced { id: 1, note: "first" }`,
    expected: `handlers_fired
--------------
0`,
  };

export const dmEventsHandlerExample: CodeExample = {
    id: 'dm-events-handler',
    title: 'Bind a Handler to One Variant',
    code: `create table dm_evt::audit { order_id: int4, note: utf8 };
create handler dm_evt::on_placed on dm_evt::order_event::OrderPlaced {
  insert dm_evt::audit [{ order_id: event_id, note: event_note }]
}`,
    expected: `namespace | handler   | created
----------+-----------+--------
dm_evt    | on_placed | true`,
  };

export const dmEventsDispatchExample: CodeExample = {
    id: 'dm-events-dispatch',
    title: 'Dispatch Runs the Handler',
    code: `dispatch dm_evt::order_event::OrderPlaced { id: 42, note: "express" }`,
    expected: `handlers_fired
--------------
1`,
  };

export const dmEventsEffectExample: CodeExample = {
    id: 'dm-events-effect',
    title: 'The Handler Already Wrote Its Row',
    code: `from dm_evt::audit`,
    expected: `order_id | note
---------+--------
42       | express`,
  };

export const dmEventsPayloadExprExample: CodeExample = {
    id: 'dm-events-payload-expr',
    title: 'Payload Fields Are Expressions',
    code: `let $n = 5;
dispatch dm_evt::order_event::OrderPlaced { id: $n * 6, note: "batch " + "b" };
from dm_evt::audit filter { order_id == 30 }`,
    expected: `order_id | note
---------+--------
30       | batch b`,
  };

export const dmEventsMissingFieldExample: CodeExample = {
    id: 'dm-events-missing-field',
    title: 'A Missing Payload Field Is Rejected',
    description: 'note is not optional, so the dispatch fails with CONSTRAINT_007.',
    code: `dispatch dm_evt::order_event::OrderPlaced { id: 2 }`,
    expectsError: true,
  };

export const dmEventsWrongTypeExample: CodeExample = {
    id: 'dm-events-wrong-type',
    title: 'A Payload Field of the Wrong Type Is Rejected',
    description: 'id is int4; a string that cannot be cast fails with CAST_002.',
    code: `dispatch dm_evt::order_event::OrderPlaced { id: "forty-two", note: "n" }`,
    expectsError: true,
  };

export const dmEventsEmptyVariantExample: CodeExample = {
    id: 'dm-events-empty-variant',
    title: 'A Variant Without Payload',
    code: `create event dm_evt::signals { Ping { } };
create handler dm_evt::on_ping on dm_evt::signals::Ping {
  insert dm_evt::audit [{ order_id: 0, note: "ping" }]
};
dispatch dm_evt::signals::Ping { }`,
    expected: `handlers_fired
--------------
1`,
  };

export const dmEventsRollbackSetupExample: CodeExample = {
    id: 'dm-events-rollback-setup',
    title: 'Two Handlers, One of Them Broken',
    code: `create handler dm_evt::ship_ok on dm_evt::order_event::OrderShipped {
  insert dm_evt::audit [{ order_id: event_id, note: "shipped" }]
};
create handler dm_evt::ship_broken on dm_evt::order_event::OrderShipped {
  insert dm_evt::no_such_table [{ order_id: event_id }]
}`,
    expected: `namespace | handler     | created
----------+-------------+--------
dm_evt    | ship_broken | true`,
  };

export const dmEventsRollbackDispatchExample: CodeExample = {
    id: 'dm-events-rollback-dispatch',
    title: 'One Failing Handler Fails the Dispatch',
    description: 'The broken handler hits CA_004; the whole request, including ship_ok\'s insert, rolls back.',
    code: `dispatch dm_evt::order_event::OrderShipped { id: 100 }`,
    expectsError: true,
  };

export const dmEventsRollbackCheckExample: CodeExample = {
    id: 'dm-events-rollback-check',
    title: 'Nothing Was Written',
    code: `from dm_evt::audit filter { order_id == 100 }`,
    expected: `(empty)`,
  };

export const dmEventsCatalogExample: CodeExample = {
    id: 'dm-events-catalog',
    title: 'Events and Handlers in the System Catalog',
    code: `from system::handlers map { name, on_variant_tag } sort { name: asc }`,
    expected: `name        | on_variant_tag
------------+---------------
on_ping     | 0
on_placed   | 0
ship_broken | 1
ship_ok     | 1`,
  };

export const dmEventsNoDropExample: CodeExample = {
    id: 'dm-events-no-drop',
    title: 'There Is No drop event',
    description: 'The grammar has no drop form for events; the statement fails with AST_005.',
    code: `drop event dm_evt::signals`,
    expectsError: true,
  };

export const dataModelEventsExamples: CodeExample[] = [
  dmEventsCreateExample,
  dmEventsUnhandledExample,
  dmEventsHandlerExample,
  dmEventsDispatchExample,
  dmEventsEffectExample,
  dmEventsPayloadExprExample,
  dmEventsMissingFieldExample,
  dmEventsWrongTypeExample,
  dmEventsEmptyVariantExample,
  dmEventsRollbackSetupExample,
  dmEventsRollbackDispatchExample,
  dmEventsRollbackCheckExample,
  dmEventsCatalogExample,
  dmEventsNoDropExample,
];
