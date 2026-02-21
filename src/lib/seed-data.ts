/**
 * Seed data for documentation examples.
 * This command is run automatically when the WASM database initializes.
 * All statements are combined with semicolons and executed as a single command.
 */

export const seedCommand = `
create namespace app;

create table app.users { id: int4, name: utf8, email: utf8, role: utf8, age: int4, status: utf8, active: bool, created_at: datetime, first_name: utf8, last_name: utf8, deleted_at: Option(datetime) };
INSERT app.users [
  { id: 1, name: "Alice", email: "alice@example.com", role: "admin", age: 30, status: "active", active: true, created_at: cast("2024-01-15T10:30:00", datetime), first_name: "Alice", last_name: "Smith", deleted_at: none },
  { id: 2, name: "Bob", email: "bob@example.com", role: "user", age: 25, status: "active", active: true, created_at: cast("2024-02-20T14:00:00", datetime), first_name: "Bob", last_name: "Jones", deleted_at: none },
  { id: 3, name: "Carol", email: "carol@example.com", role: "user", age: 35, status: "inactive", active: false, created_at: cast("2023-12-01T09:00:00", datetime), first_name: "Carol", last_name: "Wilson", deleted_at: cast("2024-06-01T00:00:00", datetime) },
  { id: 4, name: "David", email: "david@example.com", role: "admin", age: 28, status: "active", active: true, created_at: cast("2024-03-10T08:15:00", datetime), first_name: "David", last_name: "Brown", deleted_at: none },
  { id: 5, name: "Eve", email: "eve@example.com", role: "user", age: 32, status: "active", active: true, created_at: cast("2024-04-05T16:45:00", datetime), first_name: "Eve", last_name: "Davis", deleted_at: none }
];

create table app.orders { id: int4, total: float4, status: utf8, region: utf8, created_at: datetime, order_date: date };
INSERT app.orders [
  { id: 1, total: 150.50, status: "completed", region: "North", created_at: cast("2024-01-15T10:30:00", datetime), order_date: cast("2024-01-15", date) },
  { id: 2, total: 89.99, status: "pending", region: "South", created_at: cast("2024-02-20T14:00:00", datetime), order_date: cast("2024-02-20", date) },
  { id: 3, total: 245.00, status: "completed", region: "East", created_at: cast("2024-03-10T09:15:00", datetime), order_date: cast("2024-03-10", date) },
  { id: 4, total: 55.25, status: "completed", region: "West", created_at: cast("2024-04-05T11:30:00", datetime), order_date: cast("2024-04-05", date) },
  { id: 5, total: 320.75, status: "pending", region: "North", created_at: cast("2024-05-12T16:00:00", datetime), order_date: cast("2024-05-12", date) }
];

create table app.products { id: int4, name: utf8, sku: utf8, price: float4, category: utf8 };
INSERT app.products [
  { id: 1, name: "Widget", sku: "WGT-001", price: 29.99, category: "Electronics" },
  { id: 2, name: "Gadget", sku: "GDT-002", price: 49.99, category: "Electronics" },
  { id: 3, name: "Gizmo", sku: "GZM-003", price: 19.99, category: "Accessories" },
  { id: 4, name: "Doohickey", sku: "DHK-004", price: 99.99, category: "Hardware" },
  { id: 5, name: "Thingamajig", sku: "TMJ-005", price: 15.50, category: "Accessories" }
];

create table app.sales { id: int4, amount: float4, region: utf8, month: utf8 };
INSERT app.sales [
  { id: 1, amount: 1500.00, region: "North", month: "January" },
  { id: 2, amount: 2300.50, region: "South", month: "January" },
  { id: 3, amount: 1800.25, region: "East", month: "February" },
  { id: 4, amount: 2100.00, region: "West", month: "February" },
  { id: 5, amount: 1950.75, region: "North", month: "March" }
];

create table app.events { id: int4, created_at: datetime, timestamp: datetime };
INSERT app.events [
  { id: 1, created_at: cast("2024-01-15T10:30:00", datetime), timestamp: cast("2024-01-15T10:30:00", datetime) },
  { id: 2, created_at: cast("2024-02-20T14:00:00", datetime), timestamp: cast("2024-02-20T14:00:00", datetime) },
  { id: 3, created_at: cast("2024-03-10T09:15:00", datetime), timestamp: cast("2024-03-10T09:15:00", datetime) },
  { id: 4, created_at: cast("2024-04-05T16:45:00", datetime), timestamp: cast("2024-04-05T16:45:00", datetime) },
  { id: 5, created_at: cast("2024-05-12T08:00:00", datetime), timestamp: cast("2024-05-12T08:00:00", datetime) }
];

create table app.employees { id: int4, dept_id: int4, salary: float4 };
INSERT app.employees [
  { id: 1, dept_id: 1, salary: 75000.00 },
  { id: 2, dept_id: 1, salary: 82000.00 },
  { id: 3, dept_id: 2, salary: 65000.00 },
  { id: 4, dept_id: 2, salary: 71000.00 },
  { id: 5, dept_id: 3, salary: 90000.00 }
];

create table app.departments { id: int4, name: utf8 };
INSERT app.departments [
  { id: 1, name: "Engineering" },
  { id: 2, name: "Marketing" },
  { id: 3, name: "Sales" },
  { id: 4, name: "HR" }
];

create table app.subscriptions { id: int4, start_date: datetime };
INSERT app.subscriptions [
  { id: 1, start_date: cast("2024-01-01T00:00:00", datetime) },
  { id: 2, start_date: cast("2024-02-15T00:00:00", datetime) },
  { id: 3, start_date: cast("2024-03-20T00:00:00", datetime) },
  { id: 4, start_date: cast("2024-04-10T00:00:00", datetime) }
];

create table app.sessions { id: int4, start_time: datetime, end_time: datetime };
INSERT app.sessions [
  { id: 1, start_time: cast("2024-01-15T09:00:00", datetime), end_time: cast("2024-01-15T10:30:00", datetime) },
  { id: 2, start_time: cast("2024-01-15T11:00:00", datetime), end_time: cast("2024-01-15T12:00:00", datetime) },
  { id: 3, start_time: cast("2024-01-16T14:00:00", datetime), end_time: cast("2024-01-16T15:45:00", datetime) },
  { id: 4, start_time: cast("2024-01-17T08:30:00", datetime), end_time: cast("2024-01-17T09:15:00", datetime) }
];

create table app.logs { id: int4, timestamp: datetime };
INSERT app.logs [
  { id: 1, timestamp: cast("2024-01-15T10:30:45", datetime) },
  { id: 2, timestamp: cast("2024-01-15T10:31:22", datetime) },
  { id: 3, timestamp: cast("2024-01-15T10:32:01", datetime) },
  { id: 4, timestamp: cast("2024-01-15T10:33:18", datetime) }
];

create table app.tasks { id: int4, due_date: datetime };
INSERT app.tasks [
  { id: 1, due_date: cast("2024-02-01T17:00:00", datetime) },
  { id: 2, due_date: cast("2024-02-15T12:00:00", datetime) },
  { id: 3, due_date: cast("2024-03-01T09:00:00", datetime) },
  { id: 4, due_date: cast("2024-03-15T14:00:00", datetime) }
];

create table app.records { id: int4, created_at: datetime };
INSERT app.records [
  { id: 1, created_at: cast("2024-01-10T08:00:00", datetime) },
  { id: 2, created_at: cast("2024-01-20T09:30:00", datetime) },
  { id: 3, created_at: cast("2024-02-05T14:15:00", datetime) },
  { id: 4, created_at: cast("2024-02-25T16:45:00", datetime) }
];

create table app.requests { id: int4, timestamp: datetime };
INSERT app.requests [
  { id: 1, timestamp: cast("2024-01-15T10:30:00", datetime) },
  { id: 2, timestamp: cast("2024-01-15T10:30:05", datetime) },
  { id: 3, timestamp: cast("2024-01-15T10:30:10", datetime) },
  { id: 4, timestamp: cast("2024-01-15T10:30:15", datetime) }
];

create table app.posts { id: int4, content: utf8 };
INSERT app.posts [
  { id: 1, content: "Hello world! This is my first post." },
  { id: 2, content: "Learning RQL is fun and easy." },
  { id: 3, content: "Check out this amazing new feature!" },
  { id: 4, content: "Tips for better database design." }
];

create table app.articles { id: int4, body: utf8 };
INSERT app.articles [
  { id: 1, body: "Introduction to ReifyDB and its powerful features for modern applications." },
  { id: 2, body: "Advanced query techniques using RQL expressions and transforms." },
  { id: 3, body: "Best practices for data modeling in document databases." },
  { id: 4, body: "Performance optimization strategies for large datasets." }
];

create table app.usernames { id: int4, username: utf8 };
INSERT app.usernames [
  { id: 1, username: "alice_smith" },
  { id: 2, username: "bob_jones" },
  { id: 3, username: "carol_wilson" },
  { id: 4, username: "david_brown" }
];

create table app.comments { id: int4, text: utf8 };
INSERT app.comments [
  { id: 1, text: "Great article! Very helpful." },
  { id: 2, text: "Thanks for sharing this information." },
  { id: 3, text: "I have a question about the second point." },
  { id: 4, text: "This solved my problem perfectly." }
];

create table app.inputs { id: int4, value: utf8 };
INSERT app.inputs [
  { id: 1, value: "  hello world  " },
  { id: 2, value: "  test input  " },
  { id: 3, value: "trimmed" },
  { id: 4, value: "   spaces   " }
];

create table app.codes { id: int4, code: utf8 };
INSERT app.codes [
  { id: 1, code: "ABC123" },
  { id: 2, code: "def456" },
  { id: 3, code: "GHI789" },
  { id: 4, code: "jkl012" }
];

create table app.identifiers { id: int4, code: utf8 };
INSERT app.identifiers [
  { id: 1, code: "ID-001-A" },
  { id: 2, code: "ID-002-B" },
  { id: 3, code: "ID-003-C" },
  { id: 4, code: "ID-004-D" }
];

create table app.pages { id: int4, category: utf8, slug: utf8 };
INSERT app.pages [
  { id: 1, category: "blog", slug: "getting-started" },
  { id: 2, category: "docs", slug: "api-reference" },
  { id: 3, category: "blog", slug: "advanced-queries" },
  { id: 4, category: "docs", slug: "installation-guide" }
];

create table app.transactions { id: int4, amount: float4 };
INSERT app.transactions [
  { id: 1, amount: 150.50 },
  { id: 2, amount: -75.25 },
  { id: 3, amount: 200.00 },
  { id: 4, amount: -30.00 },
  { id: 5, amount: 500.75 }
];

create table app.balances { id: int4, balance: float4 };
INSERT app.balances [
  { id: 1, balance: 1250.50 },
  { id: 2, balance: 890.75 },
  { id: 3, balance: 3200.00 },
  { id: 4, balance: 45.25 }
];

create table app.measurements { id: int4, value: float4 };
INSERT app.measurements [
  { id: 1, value: 23.456 },
  { id: 2, value: 45.789 },
  { id: 3, value: 12.345 },
  { id: 4, value: 67.890 }
];

create table app.scores { id: int4, score: float4 };
INSERT app.scores [
  { id: 1, score: 85.5 },
  { id: 2, score: 92.0 },
  { id: 3, score: 78.25 },
  { id: 4, score: 88.75 },
  { id: 5, score: 95.0 }
];

create table app.resources { id: int4, usage_ratio: float4 };
INSERT app.resources [
  { id: 1, usage_ratio: 0.75 },
  { id: 2, usage_ratio: 0.45 },
  { id: 3, usage_ratio: 0.92 },
  { id: 4, usage_ratio: 0.33 }
];

create table app.numbers { id: int4, value: float4 };
INSERT app.numbers [
  { id: 1, value: 3.7 },
  { id: 2, value: 8.2 },
  { id: 3, value: 5.5 },
  { id: 4, value: 9.9 }
];

create table app.investments { id: int4, principal: float4, rate: float4, years: int4 };
INSERT app.investments [
  { id: 1, principal: 10000.00, rate: 0.05, years: 5 },
  { id: 2, principal: 5000.00, rate: 0.07, years: 3 },
  { id: 3, principal: 25000.00, rate: 0.04, years: 10 },
  { id: 4, principal: 15000.00, rate: 0.06, years: 7 }
];

create table app.prices { id: int4, price: float4 };
INSERT app.prices [
  { id: 1, price: 19.99 },
  { id: 2, price: 49.50 },
  { id: 3, price: 99.95 },
  { id: 4, price: 29.99 }
];

create table app.metrics { id: int4, value: float4 };
INSERT app.metrics [
  { id: 1, value: 125.5 },
  { id: 2, value: 230.75 },
  { id: 3, value: 89.25 },
  { id: 4, value: 312.00 }
];

create table app.data { id: int4, value: float4 };
INSERT app.data [
  { id: 1, value: 42.0 },
  { id: 2, value: 17.5 },
  { id: 3, value: 99.9 },
  { id: 4, value: 55.5 }
]
`;
