---
sidebar_position: 1
---

# Query Optimization

Learn how to optimize your queries for maximum performance in ReifyDB.

## Understanding Query Plans

ReifyDB's query optimizer automatically analyzes your queries and chooses the most efficient execution plan. You can view the query plan using the `EXPLAIN` command:

```sql
EXPLAIN SELECT * FROM users WHERE email LIKE '%@example.com';
```

## Indexing Strategies

### Creating Indexes

Indexes are crucial for query performance. Create indexes on columns frequently used in WHERE, JOIN, and ORDER BY clauses:

```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_posts_user_id ON posts(user_id);
```

### Composite Indexes

For queries filtering on multiple columns, composite indexes can be more efficient:

```sql
CREATE INDEX idx_users_name_email ON users(name, email);
```

### Unique Indexes

Use unique indexes to enforce uniqueness and improve lookup performance:

```sql
CREATE UNIQUE INDEX idx_users_email_unique ON users(email);
```

## Query Optimization Tips

### 1. Use Specific Column Names

Instead of using `SELECT *`, specify only the columns you need:

```sql
-- Less efficient
SELECT * FROM users;

-- More efficient
SELECT id, name, email FROM users;
```

### 2. Optimize JOIN Operations

- Always join on indexed columns
- Use appropriate join types (INNER, LEFT, RIGHT)
- Filter data before joining when possible

```sql
-- Efficient join with indexed columns
SELECT u.name, COUNT(p.id) as post_count
FROM users u
INNER JOIN posts p ON u.id = p.user_id
WHERE p.published = true
GROUP BY u.id, u.name;
```

### 3. Use LIMIT for Large Result Sets

When you don't need all results, use LIMIT to reduce data transfer:

```sql
SELECT * FROM posts
ORDER BY created_at DESC
LIMIT 10;
```

### 4. Avoid Leading Wildcards

Leading wildcards in LIKE patterns prevent index usage:

```sql
-- Cannot use index
SELECT * FROM users WHERE email LIKE '%@example.com';

-- Can use index
SELECT * FROM users WHERE email LIKE 'john%';
```

### 5. Use EXISTS Instead of IN for Subqueries

For large subqueries, EXISTS is often more efficient:

```sql
-- Using EXISTS (more efficient for large datasets)
SELECT * FROM users u
WHERE EXISTS (
  SELECT 1 FROM posts p 
  WHERE p.user_id = u.id AND p.published = true
);
```

## Monitoring Performance

### Query Statistics

ReifyDB provides statistics about query performance:

```sql
-- View query statistics
SELECT * FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;
```

### Slow Query Log

Enable slow query logging to identify problematic queries:

```sql
SET log_min_duration_statement = 1000; -- Log queries taking > 1 second
```

## Caching Strategies

### Result Caching

ReifyDB automatically caches frequently accessed data. You can also use materialized views for complex queries:

```sql
CREATE MATERIALIZED VIEW user_post_counts AS
SELECT u.id, u.name, COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
GROUP BY u.id, u.name;

-- Refresh the materialized view
REFRESH MATERIALIZED VIEW user_post_counts;
```

## Best Practices

1. **Regular Maintenance**: Run `ANALYZE` regularly to update statistics
2. **Monitor Index Usage**: Check which indexes are being used
3. **Partition Large Tables**: Consider partitioning for very large tables
4. **Use Connection Pooling**: Reduce connection overhead
5. **Batch Operations**: Group multiple operations when possible

## Conclusion

Query optimization is an iterative process. Start with proper indexing, monitor your query performance, and adjust based on actual usage patterns.