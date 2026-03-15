import type { CodeExample } from '../index';

export const scriptingEventsExamples: CodeExample[] = [
  {
    id: 'scripting-create-event',
    title: 'Create Event',
    category: 'scripting',
    code: `CREATE NAMESPACE ev;
CREATE EVENT ev::order_event {
  OrderPlaced { order_id: int4 },
  OrderShipped { order_id: int4 }
}`,
  },
  {
    id: 'scripting-create-handler',
    title: 'Create Handler',
    category: 'scripting',
    code: `CREATE NAMESPACE ev_h;
CREATE TABLE ev_h::audit { kind: utf8 };
CREATE EVENT ev_h::order_event {
  OrderPlaced { order_id: int4 }
};
CREATE HANDLER ev_h::on_placed ON ev_h::order_event::OrderPlaced {
  INSERT ev_h::audit [{ kind: 'placed' }]
};
DISPATCH ev_h::order_event::OrderPlaced { order_id: 1 };
FROM ev_h::audit`,
    expected: `kind
------
placed`,
  },
  {
    id: 'scripting-dispatch-event',
    title: 'Dispatch Event',
    category: 'scripting',
    code: `CREATE NAMESPACE ev_dp;
CREATE TABLE ev_dp::log { action: utf8, item_id: int4 };
CREATE EVENT ev_dp::inventory {
  ItemAdded { item_id: int4 },
  ItemRemoved { item_id: int4 }
};
CREATE HANDLER ev_dp::on_add ON ev_dp::inventory::ItemAdded {
  INSERT ev_dp::log [{ action: 'added', item_id: $item_id }]
};
CREATE HANDLER ev_dp::on_remove ON ev_dp::inventory::ItemRemoved {
  INSERT ev_dp::log [{ action: 'removed', item_id: $item_id }]
};
DISPATCH ev_dp::inventory::ItemAdded { item_id: 42 };
DISPATCH ev_dp::inventory::ItemRemoved { item_id: 7 };
FROM ev_dp::log`,
    expected: `action  | item_id
--------+--------
added   | 42
removed | 7`,
  },
];
