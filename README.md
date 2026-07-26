# DTS-FMX

A resource hub for Data Science students at the Federal University of Technology, Minna, providing easy access to course materials, notes, and a collaborative study platform.

## Overview

DTS-FMX helps students find, download, and share lecture notes and course resources all in one place, while giving administrators a simple dashboard to manage materials and track activity. Instead of hunting through scattered folders or chat groups, students can browse courses, preview notes, and download what they need, right when they need it. Admins can upload new content, monitor usage with analytics, and keep the platform organized without any extra hassle.

## System Architecture

```mermaid
flowchart LR
  WebClient["Web Client (React)"]
  NextServer["Next.js API Server"]
  PostgreSQL[("PostgreSQL")]
  Cloudinary["Cloudinary Storage"]
  Clerk["Clerk Auth"]

  WebClient -- "HTTP/API" --> NextServer
  NextServer -- "Prisma" --> PostgreSQL
  NextServer -- "Upload/Delete" --> Cloudinary
  WebClient -- "Auth" --> Clerk
  NextServer -- "Verify" --> Clerk

  style WebClient fill:#1e1b4b,stroke:#6366f1,stroke-width:2px,color:#fff
  style NextServer fill:#2e1065,stroke:#8b5cf6,stroke-width:2px,color:#fff
  style PostgreSQL fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#fff
  style Cloudinary fill:#022c22,stroke:#10b981,stroke-width:2px,color:#fff
  style Clerk fill:#451a03,stroke:#f59e0b,stroke-width:2px,color:#fff
```

## Features

### Course & Resource Browser

Students can explore all available courses and view their associated notes. Each course page lists uploaded files with details like file type, size, and uploader. A global search bar makes it easy to find specific courses, notes, or even users (for admins).

```mermaid
sequenceDiagram
  actor Student
  participant WebClient
  participant API as Next.js API
  participant DB as PostgreSQL

  Student->>WebClient: Search "data mining"
  WebClient->>API: GET /api/search?q=data+mining
  API->>DB: Query courses & notes
  DB->>API: Matching results
  API->>WebClient: Courses + Notes JSON
  WebClient->>Student: Dropdown with results
  Student->>WebClient: Click course
  WebClient->>API: GET /api/courses/{slug}
  API->>DB: Fetch course + notes
  DB->>API: Course data
  API->>WebClient: Full course page
```

### Note Upload & File Management

Administrators can create new notes and upload files through a simple form. Files are validated on the client, securely uploaded to Cloudinary, and their metadata is stored in the database. The whole flow happens in one smooth transaction, so nothing ends up orphaned.

```mermaid
sequenceDiagram
  actor Admin
  participant WebClient
  participant CloudinarySvc as Cloudinary
  participant API as Next.js API
  participant DB as PostgreSQL

  Admin->>WebClient: Fill note form, select file
  WebClient->>WebClient: Validate file type & size
  Admin->>WebClient: Submit
  WebClient->>CloudinarySvc: Upload file (secure upload)
  CloudinarySvc->>WebClient: Return secure_url, public_id
  WebClient->>API: POST /api/admin/notes
  API->>API: Validate request body
  API->>DB: Insert note record
  DB->>API: Confirmation
  API->>WebClient: 201 Created
  WebClient->>Admin: Redirect to course page
```

### Admin Dashboard & Analytics

Admins get an at-a-glance overview with stats, storage usage, top courses by number of notes, and a recent activity feed. The activity feed groups events by date and shows who performed which action (e.g., "skidev101 created a course").

```mermaid
sequenceDiagram
  actor Admin
  participant WebClient
  participant API as Next.js API
  participant DB as PostgreSQL

  Admin->>WebClient: Open dashboard
  WebClient->>API: GET /api/admin/analytics
  API->>DB: Count courses, notes, users
  API->>DB: Top courses by notes
  DB->>API: Aggregated data
  API->>WebClient: Analytics JSON

  WebClient->>API: GET /api/admin/recent-activities
  API->>DB: Fetch activities (last 7 days)
  DB->>API: Activities with user info
  API->>WebClient: Grouped activities JSON
  WebClient->>Admin: Render dashboard widgets
```

## Installation

Clone the repository and install dependencies.

```bash
git clone git@github.com:skidev101/dts-fmx.git
cd dts-fmx
npm install
```

Set up your environment variables. Copy the example `.env.example` if available, or create a `.env` file with the following keys:

```
# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/dtsfmx?schema=public"
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=dtsfmx
POSTGRES_PORT=5432

# Cloudinary (file storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Clerk (authentication)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# Optional - UploadThing (legacy upload route)
UPLOADTHING_SECRET=sk_live_...
```

Start the PostgreSQL database with Docker:

```bash
docker compose up -d
```

Run the database migrations and (optionally) seed some test data:

```bash
npx prisma migrate dev
npm run seed   # inserts 25 fake users
```

## Usage

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access the app.

- The landing page shows a hero section with basic navigation.
- To access the dashboard, go to `/dashboard`. The app uses Clerk for authentication, but as configured, a mock user is granted admin access. In production, sign up or sign in through the Clerk UI at `/auth/login`.
- Admin users can create courses, upload notes, manage users, and view analytics from the dashboard.
- Students (non‑admin) see a simplified dashboard with recent downloads and latest notes.
- Browse all courses at `/resources/courses`. Click any course to see its notes, preview details, and download files (downloads are recorded).

## Technologies Used

| Technology | Purpose |
|------------|---------|
| [Next.js](https://nextjs.org/) | React framework, app router, API routes |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| [Prisma](https://www.prisma.io/) | PostgreSQL ORM |
| [PostgreSQL](https://www.postgresql.org/) | Relational database |
| [Cloudinary](https://cloudinary.com/) | File upload and storage |
| [Clerk](https://clerk.dev/) | Authentication and user management |
| [TanStack React Query](https://tanstack.com/query) | Server-state management and caching |
| [React Hook Form](https://react-hook-form.com/) | Form state management |
| [Zod](https://zod.dev/) | Schema validation |
| [Radix UI](https://www.radix-ui.com/) | Headless UI primitives |
| [Recharts](https://recharts.org/) | Charting library |
| [shadcn/ui](https://ui.shadcn.com/) | Component library and code distribution |
| [date-fns](https://date-fns.org/) | Date formatting |
| [Docker](https://www.docker.com/) | Containerized database |

## API Documentation

All API routes are located under `/api`. Unless noted, endpoints expect JSON bodies and return JSON responses.

### Admin Endpoints (require admin role)

#### GET /api/admin/analytics

**Description:** Returns total counts of courses, notes, users, and the top 5 courses sorted by note count.

**Response:**

```json
{
  "totals": {
    "totalCourses": 12,
    "totalNotes": 45,
    "totalUsers": 67
  },
  "topCoursesByNotes": [
    {
      "courseId": "cmi...",
      "code": "DTS301",
      "noteCount": 8
    }
  ]
}
```

#### GET /api/admin/recent-activities

**Description:** Fetches the last 5 activities from the past 7 days, grouped by date.

**Response:**

```json
{
  "groupedActivities": {
    "2025-04-11": [
      {
        "id": "act...",
        "type": "COURSE_CREATED",
        "entity": "course",
        "entityId": "cmi...",
        "createdAt": "2025-04-11T10:30:00Z",
        "user": {
          "id": "usr...",
          "username": "skidev101",
          "email": "skidev101@gmail.com"
        }
      }
    ]
  }
}
```

#### GET /api/admin/users?page=1&limit=10&role=ADMIN

**Description:** Paginated list of users. Optional `role` filter accepts `ADMIN`, `STUDENT`, or `ALL` (default).

**Response:**

```json
{
  "users": [
    {
      "id": "cmi...",
      "fullname": "Dev Monaski",
      "email": "skidev101@gmail.com",
      "username": "skidev101646",
      "role": "ADMIN",
      "avatarUrl": "",
      "createdAt": "2025-11-16T00:00:00.000Z"
    }
  ],
  "page": 1,
  "totalPages": 7,
  "totalUsers": 67
}
```

**Errors:**
- 404: User not found (admin lookup)
- 500: Internal server error

#### DELETE /api/admin/users/:id

**Description:** Deletes a user by ID.

**Response:**

```json
{}
```

**Errors:**
- 400: `userId` is required
- 404: User not found
- 500: Internal server error

#### POST /api/admin/courses

**Description:** Creates a new course (admin only). Validates the code is unique and generates a slug.

**Request:**

```json
{
  "title": "Introduction to Data Science",
  "description": "Fundamentals of data analysis",
  "code": "DTS121",
  "level": "L100"
}
```

**Response:**

```json
{
  "message": "new course created",
  "course": {
    "id": "cmi...",
    "title": "Introduction to Data Science",
    "slug": "dts121",
    "code": "DTS121",
    "level": "L100",
    "description": "Fundamentals of data analysis",
    "createdById": "usr..."
  }
}
```

**Errors:**
- 400: Validation error (title/code/level)
- 409: Course already exists
- 500: Internal server error

#### DELETE /api/admin/courses/:id

**Description:** Deletes a course, all its notes, and their associated files from Cloudinary.

**Response:**

```json
{
  "success": true,
  "message": "Course deleted successfully"
}
```

**Errors:**
- 400: `courseId` required
- 403: Forbidden (not admin)
- 500: Internal server error

#### POST /api/admin/notes

**Description:** Creates a new note for a course. Expects file metadata (URL, key, name, size, type) after a successful Cloudinary upload.

**Request:**

```json
{
  "title": "Lecture 1 - Overview",
  "description": "First lecture notes",
  "fileUrl": "https://res.cloudinary.com/.../notes/sample.pdf",
  "fileKey": "notes/sample",
  "fileName": "lecture1.pdf",
  "fileType": "pdf",
  "fileSize": 204800,
  "courseId": "cmi..."
}
```

**Response:**

```json
{
  "message": "new note created",
  "note": {
    "id": "nte...",
    "title": "Lecture 1 - Overview",
    ...
  }
}
```

**Errors:**
- 400: Validation error
- 403: Forbidden (not admin)
- 500: Internal server error

#### DELETE /api/admin/notes/:id

**Description:** Deletes a note and its file from Cloudinary.

**Response:**

```json
{
  "success": true
}
```

**Errors:**
- 400: `noteId` required
- 404: Note not found
- 500: Internal server error

### Public / General Endpoints

#### GET /api/courses

**Description:** Returns all courses (ordered by creation date), including basic info and the creating user's username.

**Response:**

```json
[
  {
    "id": "cmi...",
    "title": "Data Structures",
    "slug": "dts201",
    "code": "DTS201",
    "level": "L200",
    "description": "Algorithms and data structures",
    "createdAt": "2025-03-01T00:00:00.000Z",
    "notes": [],
    "createdBy": { "username": "admin_user" }
  }
]
```

#### GET /api/courses/:slug

**Description:** Fetches a single course by its slug along with its notes and the note uploaders.

**Response:**

```json
{
  "id": "cmi...",
  "title": "Data Structures",
  "slug": "dts201",
  "code": "DTS201",
  "level": "L200",
  "description": "...",
  "createdBy": { "username": "admin_user" },
  "notes": [
    {
      "id": "nte...",
      "title": "Stacks and Queues",
      "fileUrl": "https://...",
      "uploadedBy": { "username": "admin_user" }
    }
  ]
}
```

**Errors:**
- 400: `courseSlug` required
- 404: Course not found
- 500: Internal server error

#### GET /api/notes?cursor=&limit=10

**Description:** Cursor‑based paginated list of all notes.

**Response:**

```json
{
  "notes": [
    {
      "id": "nte...",
      "title": "My Note",
      ...
    }
  ],
  "nextCursor": "nte_xyz"
}
```

**Errors:**
- 500: Internal server error

#### GET /api/notes/:id

**Description:** Returns a course associated with the given ID. (Note: this route currently returns a course, not a single note.)

**Response:**

```json
{
  "course": {
    "id": "cmi...",
    "title": "...",
    ...
  }
}
```

**Errors:**
- 400: `courseId` required
- 500: Internal server error

#### GET /api/search?q=term

**Description:** Searches courses, notes, and (if admin) users by a query string.

**Response:**

```json
{
  "courses": [ { "id": "...", "title": "...", "type": "course" } ],
  "notes": [ { "id": "...", "title": "...", "type": "note" } ],
  "users": [ { "id": "...", "username": "..." } ]
}
```

**Errors:**
- 500: Internal server error

### User-specific Endpoints

#### GET /api/users/me

**Description:** Returns the current authenticated user (requires Clerk session or mock).

**Response:**

```json
{
  "id": "cmi...",
  "clerkId": "user_...",
  "fullname": "Dev Monaski",
  "email": "skidev101@gmail.com",
  "username": "skidev101646",
  "role": "ADMIN",
  "avatarUrl": "",
  "createdAt": "2025-11-16T00:00:00.000Z",
  "updatedAt": "2025-11-22T00:00:00.000Z"
}
```

**Errors:**
- 401: Unauthorized
- 500: Internal server error

#### PATCH /api/users/profile

**Description:** Updates the current user's full name, username, or avatar URL.

**Request:**

```json
{
  "fullname": "New Name",
  "username": "new_username",
  "avatarUrl": "https://..."
}
```

**Response:**

```json
{
  "id": "cmi...",
  "fullname": "New Name",
  "username": "new_username",
  "email": "skidev101@gmail.com",
  "role": "ADMIN",
  "avatarUrl": "https://...",
  "createdAt": "...",
  "updatedAt": "2025-04-12T..."
}
```

**Errors:**
- 400: Validation error or no fields provided
- 409: Username already taken
- 500: Internal server error

#### POST /api/users/me/notes/download

**Description:** Logs a note download and increments the download counter.

**Request:**

```json
{
  "noteId": "nte..."
}
```

**Response:**

```json
{
  "ok": true,
  "logId": "log..."
}
```

**Errors:**
- 404: User or note not found
- 500: Internal server error (may return `{"ok": true, "message": "already recorded"}` if duplicate)

#### GET /api/users/me/notes/download?cursor=&limit=10

**Description:** Cursor‑based fetch of the logged-in user's download history, with note details.

**Response:**

```json
{
  "items": [
    {
      "id": "log...",
      "createdAt": "2025-04-10T08:00:00.000Z",
      "note": {
        "id": "nte...",
        "title": "Intro Notes",
        "fileUrl": "https://...",
        "uploadedBy": { "username": "admin_user" },
        "course": { "code": "DTS101", "title": "Intro" }
      }
    }
  ],
  "nextCursor": "log_abc"
}
```

**Errors:**
- 404: User not found
- 500: Internal server error

### File Upload (Legacy)

#### POST /api/uploadthing

**Description:** UploadThing endpoint for file uploads. This route exists but the current note creation flow uses Cloudinary directly. Provided for backward compatibility.

**Response:** Depends on UploadThing configuration; typically returns file metadata on success.

## Contributing

Contributions are welcome! Feel free to fork the repository, create a new branch, and open a pull request. For major changes, please open an issue first to discuss your ideas.

## Author

- GitHub: [skidev101](https://github.com/skidev101)

## Badges

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![Clerk](https://img.shields.io/badge/Clerk-3232B4?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://dokugen.samueltuoyo.com)