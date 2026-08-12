import type { CodeExample } from '@/lib/examples/types';

export const dmEventsCreateExample: CodeExample = {
    id: 'dm-events-create',
    title: 'Declare an Event and a Handler',
    code: `create namespace dm_evt;
create table dm_evt::audit { order_id: int4 };
create event dm_evt::order_event { OrderPlaced { id: int4 } };
create handler dm_evt::on_placed on dm_evt::order_event::OrderPlaced {
  insert dm_evt::audit [{ order_id: event_id }]
}`,
  };

export const dmEventsDispatchExample: CodeExample = {
    id: 'dm-events-dispatch',
    title: 'Dispatch Runs Handlers in the Same Transaction',
    code: `dispatch dm_evt::order_event::OrderPlaced { id: 42 }`,
    expected: `handlers_fired
--------------
1`,
  };

export const dmEventsEffectExample: CodeExample = {
    id: 'dm-events-effect',
    title: 'The Handler Wrote to the Audit Table',
    code: `from dm_evt::audit`,
    expected: `order_id
--------
42`,
  };

export const dataModelEventsExamples: CodeExample[] = [
  dmEventsCreateExample,
  dmEventsDispatchExample,
  dmEventsEffectExample,
];
