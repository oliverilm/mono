# Typed Fastify Routes with Zod Validation

This utility provides a fluent API for creating strongly typed Fastify routes with automatic Zod schema validation. When validation fails, it automatically returns a 400 error with detailed validation information.

## Features

- **Strongly typed request objects** - TypeScript knows the exact shape of `request.body`, `request.params`, and `request.query`
- **Automatic validation** - Zod schemas are automatically applied and validated
- **Error handling** - Validation errors are automatically caught and returned as 400 responses
- **Fluent API** - Chain validation methods for a clean, readable syntax

## Basic Usage

```typescript
import { createTypedFastify } from 'src/app/utils/fastify-typed';
import { loginCredentialSchema } from '@monorepo/utils';

export default function (fastify: FastifyInstance) {
	const typedFastify = createTypedFastify(fastify);

	// Body validation only
	typedFastify.body(loginCredentialSchema).post('/login', (request) => {
		// request.body is strongly typed as { email: string; password: string }
		return UserService.login(request.body);
	});
}
```

## Available Methods

### Body Validation

```typescript
// POST with body validation
typedFastify.body(schema).post('/path', (request) => {
	// request.body is typed according to the schema
});

// PUT with body validation
typedFastify.body(schema).put('/path', (request) => {
	// request.body is typed according to the schema
});

// PATCH with body validation
typedFastify.body(schema).patch('/path', (request) => {
	// request.body is typed according to the schema
});
```

### Params Validation

```typescript
// GET with params validation
typedFastify.params(userIdSchema).get('/user/:userId', (request) => {
	// request.params is typed as { userId: string }
});

// PUT with params validation
typedFastify.params(userIdSchema).put('/user/:userId', (request) => {
	// request.params is typed as { userId: string }
});

// DELETE with params validation
typedFastify.params(userIdSchema).delete('/user/:userId', (request) => {
	// request.params is typed as { userId: string }
});
```

### Query Validation

```typescript
// GET with query validation
typedFastify.query(skipTakeSchema).get('/users', (request) => {
	// request.query is typed as { skip?: string | number; take?: string | number }
});
```

## Error Handling

When Zod validation fails, the API automatically returns a 400 response with detailed error information:

```json
{
	"error": "Validation Error",
	"message": "Invalid request data",
	"details": [
		{
			"field": "email",
			"message": "Invalid email",
			"code": "invalid_string"
		}
	]
}
```

## Migration from Existing Code

### Before (using withBody helper)

```typescript
import { withBody } from 'src/app/utils/route-helper';

export default function (fastify: FastifyInstance) {
	fastify.post(
		'/login',
		withBody(loginCredentialSchema, (request) =>
			UserService.login(request.body),
		),
	);
}
```

### After (using typed routes)

```typescript
import { createTypedFastify } from 'src/app/utils/fastify-typed';

export default function (fastify: FastifyInstance) {
	const typedFastify = createTypedFastify(fastify);
	
	typedFastify.body(loginCredentialSchema).post('/login', (request) => {
		// request.body is strongly typed and validated
		return UserService.login(request.body);
	});
}
```

## Complete Example

```typescript
import { loginCredentialSchema, userIdSchema, skipTakeSchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { createTypedFastify } from 'src/app/utils/fastify-typed';
import { UserService } from 'src/app/services/user';

export default function (fastify: FastifyInstance) {
	const typedFastify = createTypedFastify(fastify);

	// Login endpoint with body validation
	typedFastify.body(loginCredentialSchema).post('/login', (request) => {
		// request.body: { email: string; password: string }
		return UserService.login(request.body);
	});

	// Get user by ID with params validation
	typedFastify.params(userIdSchema).get('/user/:userId', (request) => {
		// request.params: { userId: string }
		return UserService.getUserById(request.params.userId);
	});

	// Get users with query validation
	typedFastify.query(skipTakeSchema).get('/users', (request) => {
		// request.query: { skip?: string | number; take?: string | number }
		return UserService.getUsers({
			skip: request.query.skip ? Number(request.query.skip) : 0,
			take: request.query.take ? Number(request.query.take) : 10
		});
	});

	// Update user with body validation
	typedFastify.body(loginCredentialSchema).put('/user/profile', (request) => {
		// request.body: { email: string; password: string }
		return UserService.updateProfile(request.body);
	});

	// Delete user with params validation
	typedFastify.params(userIdSchema).delete('/user/:userId', (request) => {
		// request.params: { userId: string }
		return UserService.deleteUser(request.params.userId);
	});
}
```

## Type Safety

The API provides full TypeScript type safety:

- `request.body` is typed according to your Zod schema
- `request.params` is typed according to your Zod schema  
- `request.query` is typed according to your Zod schema
- All validation happens automatically before your handler is called
- Compile-time type checking ensures you use the correct types

## Benefits

1. **Type Safety** - Full TypeScript support with inferred types
2. **Automatic Validation** - No need to manually parse and validate
3. **Error Handling** - Consistent error responses for validation failures
4. **Clean API** - Fluent, readable syntax
5. **Migration Friendly** - Easy to migrate from existing `withBody`/`withParams`/`withQuery` helpers
