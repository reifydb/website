---
slug: migration-guide
title: Migrating from Other Databases to ReifyDB
authors: [dominique]
tags: [migration, database, guide]
image: /img/logo.png
description: On the other hand, we denounce with righteous indignation and dislike men who are so beguiled.
---

# Migrating from Other Databases to ReifyDB

On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue.

<!--truncate-->

## Pre-Migration Planning

And equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.

### Assessment Checklist

1. **Schema Analysis**: These cases are perfectly simple and easy to distinguish
2. **Data Volume**: In a free hour, when our power of choice is untrammelled
3. **Dependencies**: And when nothing prevents our being able to do
4. **Performance Requirements**: What we like best, every pleasure is to be welcomed

## Migration Strategies

Every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated.

### Big Bang Migration

And annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures.

```bash
# Export from source database
pg_dump source_db > source_backup.sql

# Transform schema
reifydb-migrate transform --input source_backup.sql --output reify_schema.sql

# Import to ReifyDB
reifydb-cli import --file reify_schema.sql
```

### Gradual Migration

Or else he endures pains to avoid worse pains. These cases are perfectly simple and easy to distinguish.

## Data Transformation

In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided.

### Schema Mapping

But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted.

```sql
-- Source schema (PostgreSQL)
CREATE TABLE customers (
  customer_id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255),
  created_date TIMESTAMP
);

-- Target schema (ReifyDB)
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Testing and Validation

The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.