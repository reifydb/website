---
sidebar_position: 2
---

# Data Types

ReifyDB supports a comprehensive set of data types to handle various kinds of data efficiently.

## Numeric Types

### Integer Types
- **INTEGER**: 32-bit signed integer (-2,147,483,648 to 2,147,483,647)
- **BIGINT**: 64-bit signed integer
- **SMALLINT**: 16-bit signed integer (-32,768 to 32,767)
- **TINYINT**: 8-bit signed integer (-128 to 127)

### Floating-Point Types
- **REAL**: 32-bit floating point
- **DOUBLE**: 64-bit floating point
- **DECIMAL(p,s)**: Fixed-point decimal with precision p and scale s

## String Types

- **TEXT**: Variable-length character string
- **VARCHAR(n)**: Variable-length string with maximum length n
- **CHAR(n)**: Fixed-length string of length n

## Date and Time Types

- **DATE**: Calendar date (year, month, day)
- **TIME**: Time of day (hour, minute, second, microsecond)
- **TIMESTAMP**: Date and time with timezone
- **INTERVAL**: Time interval

## Boolean Type

- **BOOLEAN**: True or false value

## Binary Types

- **BLOB**: Binary large object
- **BYTEA**: Variable-length binary string

## JSON Types

- **JSON**: JSON text storage
- **JSONB**: Binary JSON storage (more efficient)

## Array Types

ReifyDB supports arrays of any base type:
```sql
CREATE TABLE example (
  tags TEXT[],
  scores INTEGER[]
);
```

## Type Casting

You can cast between compatible types using the `CAST` function or `::` operator:

```sql
SELECT CAST('123' AS INTEGER);
SELECT '123'::INTEGER;
```

## NULL Values

All data types can store NULL values unless explicitly constrained with `NOT NULL`.