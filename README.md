# Beep Admin Panel

Administration dashboard for the Beep infrastructure, built with React, TypeScript, and modern web technologies.

## Overview

This administration panel provides a centralized interface for platform administrators to monitor activity, manage users and servers, and ensure moderation and platform stability.

The admin panel gives administrators:
- A global view of the platform's activity and health
- Powerful moderation tools for managing users and servers
- Clear analytics to support decision-making
- Tools to maintain a safe and healthy environment for users

### Tech Stack

- **Frontend:** React 19 + TypeScript
- **UI Library:** [shadcn/ui](https://ui.shadcn.com/) with Radix UI primitives
- **Styling:** Tailwind CSS 4
- **Routing:** TanStack Router
- **i18n:** i18next (English, French)
- **Backend Services:** Rust microservices (User, Community, Message services)

### Design Reference

[Figma Design - Admin Panel](https://www.figma.com/design/hGpo303WejufsrnNubzt7z/Admin-Pannel?node-id=1-2&t=1irSBPVTZH64UDpq-1)

## Prerequisites

- **Node.js** 22.21+
- **pnpm** 9.0+ (package manager)

## Quick Start

### Development

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   pnpm dev
   ```

   The admin panel will be available at **http://localhost:5173**

### Building

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```text
src/
├── app/                          # Global app configuration
│   ├── providers/                # React providers
│   │   ├── ThemeProvider.tsx     # Light/Dark theme context
│   │   └── SidebarContentProvider.tsx
│   └── styles/
│       ├── globals.css           # Global styles + Tailwind
│       └── themes.css            # CSS variables for themes
│
├── routes/                       # TanStack Router (file-based routing)
│   ├── __root.tsx                # Root layout with sidebar
│   ├── index.tsx                 # Dashboard page
│   └── users.tsx                 # Users management page
│
├── shared/                       # Shared code
│   ├── components/
│   │   ├── ui/                   # Shadcn UI components
│   │   │   ├── Avatar.tsx
│   │   │   ├── DropdownMenu.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── ...
│   │   └── SidebarSettingsMenu.tsx
│   ├── lib/
│   │   ├── api.ts                # API client configuration
│   │   └── utils.ts              # Utilities
│   ├── types/
│   │   └── index.ts              # Global types
│   └── constants/
│       └── index.ts              # Global constants
│
├── assets/                       # Static assets
├── i18n.ts                       # i18n configuration
├── main.tsx                      # Vite entry point
└── vite-env.d.ts
│
public/
├── locales/                      # Translation files
│   ├── en.json                   # English translations
│   └── fr.json                   # French translations
```

## Core Features

### Dashboard Overview

The dashboard provides a high-level overview of the platform's activity and health.

**Key Metrics:**
- **Users**: Total count, active users, and growth over time (User Service)
- **Servers**: Total number of communities (Community Service)
- **Messages**: Message volume by period (Message Service)
- **System Health**: Service status, API response times, and scaling information

### User Management

#### User Directory
Browse and search registered users with advanced filtering.

**Features:**
- Search by:
  - Username
  - Email
  - User ID
- Paginated user list
- Display information:
  - Username
  - Email
  - Account status
  - Registration date

#### User Profile View
Detailed view of a specific user with all account information.

**Information:**
- User ID (UUID)
- Username and email
- Account creation date
- Account status (active, banned, suspended)
- Associated servers

#### User Actions
- Ban a user
- Reactivate an account
- Delete an account
- Reset user password
- Bulk actions (ban/suspend multiple users)

### Server Management

#### Server Directory
Manage all servers (communities) on the platform.

**Features:**
- Search by:
  - Server name
  - Server ID
  - Administrator
- Display:
  - Server name
  - Administrator
  - Member count
  - Creation date

#### Server Detail View
Comprehensive server information.

**Information:**
- Server name and ID
- Administrator details
- Member count
- Creation date
- Text and voice channels
- Members list
- Roles configuration

#### Server Actions
- Delete a server
- Temporarily disable/reactivate a server
- Create/delete channels
- Remove members
- Modify server roles
- Change server administrator

### Moderation

#### Moderation Overview
Track and manage platform moderation.

**Lists:**
- Banned users
- Disabled servers

#### Moderation Actions
- Unban users
- Reactivate servers
- Review moderation logs

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Keycloak Authentication
VITE_KEYCLOAK_CLIENT_ID=admin
VITE_KEYCLOAK_AUTHORITY=http://localhost:8080/realms/myrealm

# Microservices URLs
VITE_USER_SERVICE_URL=http://localhost:3000
VITE_COMMUNITY_SERVICE_URL=http://localhost:3003
```

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_KEYCLOAK_CLIENT_ID` | Keycloak client ID for admin | `admin` |
| `VITE_KEYCLOAK_AUTHORITY` | Keycloak realm URL | `http://localhost:8080/realms/myrealm` |
| `VITE_USER_SERVICE_URL` | User service API URL | `http://localhost:3000` |
| `VITE_COMMUNITY_SERVICE_URL` | Community service API URL | `http://localhost:3003` |

---

## Code Style

### Prettier

This project uses **Prettier** for consistent code formatting.

**Auto-format on save in VS Code:**
1. Install the [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension
2. Set as default formatter (VS Code Settings → Default Formatter → Prettier)
3. Enable "Format On Save"

**Manual formatting:**
```bash
pnpm run format
```

### Shadcn Components

Add new shadcn UI components with:

```bash
pnpm add-component <component-name>
```

---

## Technologies

- **React** 19.2.3 - UI library
- **TypeScript** 5.9 - Type safety
- **TanStack Router** 1.153 - File-based routing
- **Tailwind CSS** 4.1 - Styling
- **Shadcn/UI** - Component library
- **Radix UI** - Accessible components
- **i18next** - Internationalization
- **Vite** - Build tool and dev server

---

## Docker

### Build and Run

```bash
# Build the Docker image
docker build -t beep-admin .

# Run the container
docker run -d --rm -p 8080:8080 beep-admin
```

The admin panel will be available at **http://localhost:8080**

---

## Contributing

1. Create feature branches from `main`
2. Follow the existing code structure
3. Format code with Prettier before committing
4. Use conventional commit messages (feat:, fix:, style:, etc.)

---

## License

See LICENSE file in the repository root.
