import type { CodeExample } from '@/lib/examples/types';

export const dataModelEventsExamples: CodeExample[] = [
{
    id: 'dm-events-create',
    title: 'Declare an Event and a Handler',
    category: 'concept',
    code: `create namespace dm_evt;
create table dm_evt::audit { order_id: int4 };
create event dm_evt::order_event { OrderPlaced { id: int4 } };
create handler dm_evt::on_placed on dm_evt::order_event::OrderPlaced {
  insert dm_evt::audit [{ order_id: event_id }]
}`,
  },
{
    id: 'dm-events-dispatch',
    title: 'Dispatch Runs Handlers in the Same Transaction',
    category: 'concept',
    code: `dispatch dm_evt::order_event::OrderPlaced { id: 42 }`,
    expected: `handlers_fired
--------------
1`,
  },
{
    id: 'dm-events-effect',
    title: 'The Handler Wrote to the Audit Table',
    category: 'concept',
    code: `from dm_evt::audit`,
    expected: `order_id
--------
42`,
  },
];
