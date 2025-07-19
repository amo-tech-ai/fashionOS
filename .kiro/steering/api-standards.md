---
inclusion: fileMatch
fileMatchPattern: "**/api/**/*.ts"
---

# API Route Standards

## File Naming
- **Use `route.ts`** under each REST folder
- Example: `app/api/events/route.ts`
- Follow Next.js App Router conventions

## Response Format
```ts
interface ApiResponse<T> {
  data?: T;
  error?: { message: string; code?: number };
  success: boolean;
}

// Success response
return NextResponse.json({
  data: result,
  success: true
});

// Error response
return NextResponse.json({
  error: { message: 'Resource not found', code: 404 },
  success: false
}, { status: 404 });
```

## Error Handling
- **Use NextResponse.json()** for consistent responses
- Log exceptions server-side with proper context
- Return sanitized error messages to clients
- Never expose internal system details

## Authentication
- **Validate Supabase JWT** via middleware
- Return 401 for unauthorized requests
- Return 403 for forbidden actions
- Use Row Level Security (RLS) in database

## HTTP Methods
```ts
// GET /api/events
export async function GET(request: Request) {}

// POST /api/events  
export async function POST(request: Request) {}

// PUT /api/events/[id]
export async function PUT(request: Request, { params }: { params: { id: string } }) {}

// DELETE /api/events/[id]
export async function DELETE(request: Request, { params }: { params: { id: string } }) {}
```