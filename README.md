# Beep Admin

## Prerequisites

```
node 22.21+
```


## Project Architecture

The project follows a modern and modular architecture to facilitate maintainability and scalability.

```
src/
├── app/                          # Global app configuration
│   ├── providers/                # All React providers
│   │   ├── ThemeProvider.tsx     # Theme context
│   │   └── AuthProvider.tsx     
│   ├── styles/
│   │   ├── globals.css           # Global styles + Tailwind
│   │   └── themes.css            # CSS variables for themes
│   └── App.tsx                   # Main entry point
│
├── features/                     # Features by business domain
# Each feature has its own folder with components, hooks, types, and utils  
│   ├── auth/
│   │   ├── components/           # Auth-specific components
│   │   ├── hooks/                # Auth business hooks
│   │   ├── types/                # TypeScript types
│   │   └── utils/                # Auth utilities
│   ├── dashboard/
│   └── users/
│
├── shared/                       # Shared code between features
│   ├── components/               # Reusable components
│   │   ├── ui/                   # Shadcn components
│   │   ├── layout/               # Header, Sidebar, Footer
│   │   └── common/               # Other shared components
│   ├── hooks/                    # Reusable hooks
│   │   ├── useMediaQuery.ts
│   │   ├── useDebounce.ts
│   │   └── useLocalStorage.ts
│   ├── lib/                      # External libs configuration
│   │   ├── api.ts                # Configured Axios/Fetch
│   │   └── utils.ts              # cn() and utilities
│   ├── queries/                  # TanStack Query configurations
│   │   └── auth/                 # Authentication queries
│   │       ├── auth.api.ts       # Auth API functions
│   │       ├── auth.queries.ts   # TanStack Query hooks
│   │       └── auth.types.ts     # Auth query types
│   ├── types/                    # Global types
│   │   └── common.types.ts
│   └── constants/                # Global constants
│       ├── routes.ts
│       └── api-endpoints.ts
│
├── routes/                       # TanStack Router routes
│   ├── __root.tsx                # Root layout
│   ├── index.tsx                 # Home page
│   ├── auth/
│   │   ├── login.tsx
│   │   └── register.tsx
│   └── dashboard/
│       └── index.tsx
│
├── assets/                       # Static assets
│   ├── images/
│   └── icons/
│
├── main.tsx                      # Vite entry point
└── vite-env.d.ts
public/
├── locales/                      # Translation files
│   ├── en.json                   # English translations
│   └── fr.json                   # French translations
└── vite.svg                      # Vite logo
```

### Architecture Principles

- **Separation by business domain**: Each feature is isolated in its own folder with its components, hooks, and API logic
- **Centralized shared code**: Reusable elements are in `shared/` to avoid duplication
- **Centralized configuration**: All providers and global configuration are in `app/`
- **File-based routing**: TanStack Router with an intuitive file structure
- **Internationalization**: Multi-language support with translation files organized by language
- **Query layer**: TanStack Query configurations organized by domain in `shared/queries/`

> **Note**: Some files and folders shown in the architecture tree do not exist yet. This structure is provided as a guide for the intended project organization.

---

## Code Formatting with Prettier

This project uses **Prettier** to maintain consistent code formatting across the codebase.

### Configuration

The Prettier configuration is located in the `.prettierrc` file at the root of the project.

### Setup in VS Code

To automatically format your code on save:

1. Install the **Prettier - Code formatter** extension in VS Code
2. Set Prettier as your default formatter:
   - Open VS Code Settings (Ctrl+, or Cmd+,)
   - Search for "Default Formatter"
   - Select **Prettier - Code formatter** from the dropdown
3. Enable "Format On Save" in VS Code settings

### Format Command

You can manually format the entire codebase by running:

```bash
pnpm run format
```

This command will format all TypeScript, JavaScript, JSON, and CSS files in the `src/` directory according to the rules defined in `.prettierrc`.

---

## Environment Variables

Copy the `.env.example` file to `.env` and configure the following variables:

| Variable | Description                                | Example |
|----------|--------------------------------------------|---------|
| `VITE_KEYCLOAK_CLIENT_ID` | Keycloak client ID                         | `frontend` |
| `VITE_KEYCLOAK_AUTHORITY` | Keycloak realm URL                         | `http://localhost:8080/realms/myrealm` |
| `VITE_USER_SERVICE_URL` | User service API URL                       | `http://localhost:3000` |
| `VITE_COMMUNITY_SERVICE_URL` | Community service API URL                       | `http://localhost:3003` |
| `VITE_REAL_TIME_URL` | Real-time service URL for WebRTC signaling | `http://localhost:4000` |
| `VITE_WEBRTC_BASE=http://localhost:8080` | Base URL for WebRTC media server           | `http://localhost:8080` |

---

## Getting Started

### Development

1. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

The admin app will be available at `http://localhost:5173`.

---

## Build and Run with Docker

To build and run the Beep admin application using Docker, follow these steps:
1. **Build the Docker Image**
   Open a terminal in the root directory of the project (where the `Dockerfile` is located) and run the following command to build the Docker image:
   ```bash
   docker build -t beep-admin .
   ```

2. **Run the Docker Container**
    After the image is built, you can run a container using the following command:
    ```bash
   docker run -d --rm -p 8080:8080 beep-admin
    ```
---

## Adding new shadcn components

Use the following command to add components in order to import it with the right file naming convention:

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
