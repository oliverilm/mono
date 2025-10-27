# Prisma Pagination Abstraction

A reusable pagination abstraction for Prisma queries that returns data in a standardized `Page<T>` format.

## Features

- ✅ **Standardized Page Format** - Consistent pagination response structure
- ✅ **Type Safety** - Full TypeScript support with Prisma types
- ✅ **Flexible** - Works with any Prisma model
- ✅ **Easy to Use** - Simple API for common use cases
- ✅ **Performance** - Efficient counting and pagination

## Page Type

```typescript
type Page<T> = {
  items: T[];                    // The actual data items
  countOfTotalItems: number;    // Total number of items (not just current page)
  page: number;                  // Current page number (1-based)
  pageSize: number;             // Number of items per page
};
```

## Basic Usage

### 1. Using Pre-built Methods

```typescript
import { PrismaPagination, convertSkipTakeToPagination } from '../utils/prisma-pagination';

// In your route handler
export async function handler(request: RequestWithQuery<SkipTake>) {
  const skipTake = skipTakeSchema.parse(request.query);
  const pagination = convertSkipTakeToPagination(skipTake);

  // Get paginated competitions
  return PrismaPagination.findCompetitionsPaginated(
    {
      isArchived: false,
      isPublished: true,
    },
    pagination
  );
}
```

### 2. Using Generic Method

```typescript
// For any Prisma model with custom logic
return PrismaPagination.findManyPaginated(
  {
    findMany: (args) => prisma.user.findMany({
      ...args,
      orderBy: { createdAt: 'desc' },
      include: { profile: true },
    }),
    count: (args) => prisma.user.count(args),
  },
  {
    where: { isActive: true },
  },
  pagination
);
```

## Available Methods

### Pre-built Methods

- `PrismaPagination.findCompetitionsPaginated(where, pagination)`
- `PrismaPagination.findClubsPaginated(where, pagination)`
- `PrismaPagination.findUsersPaginated(where, pagination)`

### Generic Method

- `PrismaPagination.findManyPaginated(model, args, pagination)`

## Examples

### Competition List with Pagination

```typescript
// routes/public/competition/list.ts
export async function handler(request: RequestWithQuery<SkipTake>) {
  const skipTake = skipTakeSchema.parse(request.query);
  const pagination = convertSkipTakeToPagination(skipTake);

  return PrismaPagination.findCompetitionsPaginated(
    {
      isArchived: false,
      isPublished: true,
    },
    pagination
  );
}
```

### Club List with Custom Ordering

```typescript
// routes/public/club/list.ts
export async function handler(request: RequestWithQuery<SkipTake>) {
  const skipTake = skipTakeSchema.parse(request.query);
  const pagination = convertSkipTakeToPagination(skipTake);

  return PrismaPagination.findManyPaginated(
    {
      findMany: (args) => prisma.club.findMany({
        ...args,
        orderBy: { name: 'asc' },
        include: { members: true },
      }),
      count: (args) => prisma.club.count(args),
    },
    {
      where: { isActive: true },
    },
    pagination
  );
}
```

### User List with Complex Filtering

```typescript
// routes/admin/users.ts
export async function handler(request: RequestWithQuery<SkipTake>) {
  const skipTake = skipTakeSchema.parse(request.query);
  const pagination = convertSkipTakeToPagination(skipTake);

  return PrismaPagination.findUsersPaginated(
    {
      isActive: true,
      role: 'USER',
      createdAt: {
        gte: new Date('2024-01-01'),
      },
    },
    pagination
  );
}
```

## Response Format

All pagination methods return a standardized response:

```typescript
{
  items: [
    { id: 1, name: "Competition 1", ... },
    { id: 2, name: "Competition 2", ... },
    // ... more items
  ],
  countOfTotalItems: 150,  // Total items across all pages
  page: 1,                 // Current page (1-based)
  pageSize: 10             // Items per page
}
```

## Pagination Options

```typescript
interface PaginationOptions {
  skip?: number;    // Number of items to skip (default: 0)
  take?: number;    // Number of items to take (default: 10)
}
```

## Benefits

1. **Consistency** - All paginated endpoints return the same format
2. **Type Safety** - Full TypeScript support with Prisma types
3. **Performance** - Efficient counting and pagination
4. **Reusability** - Works with any Prisma model
5. **Maintainability** - Centralized pagination logic

## Migration from Manual Pagination

### Before (Manual)
```typescript
export async function handler(request: RequestWithQuery<SkipTake>) {
  const skipTake = skipTakeSchema.parse(request.query);
  const { skip, take } = convertSkipTake(skipTake);

  const items = await prisma.competition.findMany({
    where: { isArchived: false },
    skip,
    take,
  });

  const count = await prisma.competition.count({
    where: { isArchived: false },
  });

  return {
    items,
    countOfTotalItems: count,
    page: Math.floor(skip / take) + 1,
    pageSize: take,
  };
}
```

### After (Abstraction)
```typescript
export async function handler(request: RequestWithQuery<SkipTake>) {
  const skipTake = skipTakeSchema.parse(request.query);
  const pagination = convertSkipTakeToPagination(skipTake);

  return PrismaPagination.findCompetitionsPaginated(
    { isArchived: false },
    pagination
  );
}
```

This abstraction makes pagination consistent, type-safe, and easy to use across your entire application! 🚀

