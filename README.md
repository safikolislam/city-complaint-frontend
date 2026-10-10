::: {align="center"}
# CityFix

### City Complaint & Service Request Platform

A modern web application for submitting civic complaints, tracking
service requests, and managing complaint resolution through role-based
dashboards.

**Built with Next.js App Router · TypeScript · Tailwind CSS ·
shadcn/ui**
:::

------------------------------------------------------------------------

## Overview

**CityFix** helps citizens report city-related issues and follow their
progress while authorized staff manage assignments and administrators
oversee the platform.

The frontend connects to the City Complaint backend API and is designed
around role-based access, responsive layouts, validated forms, and clear
loading and error states.

## Core Features

-   **Role-based access:** Citizen, Staff, and Admin experiences.
-   **Complaint management:** Submit and track complaints, view
    complaint details, and follow status updates.
-   **Staff workflow:** Support for officer/technician workflows and
    complaint assignment where enabled by the backend.
-   **Admin tools:** Administrative overview and complaint management
    features exposed by the API.
-   **API integration:** Connects to the deployed backend rather than
    relying on mock data for core workflows.
-   **Form validation:** Type-safe form handling and user-friendly
    validation feedback.
-   **Responsive UI:** Layouts designed for mobile, tablet, and desktop.
-   **User feedback:** Loading, empty, success, and error states for a
    clearer experience.
-   **Payment flow:** Frontend integration for the backend-supported
    payment provider, subject to the configured test credentials and
    available endpoints.

> Update this feature list to match the functionality that is actually
> implemented and deployed in your frontend before submitting.

## Tech Stack

  Area                 Technology
  -------------------- --------------------------------------------
  Framework            Next.js App Router
  Language             TypeScript
  Styling              Tailwind CSS
  UI Components        shadcn/ui
  API                  City Complaint REST API
  Forms & Validation   React Hook Form and Zod, where implemented
  Authentication       JWT-based backend authentication
  Notifications        Sonner, where implemented
  Deployment           Vercel

## Project Links

-   **Frontend Repository:** https://github.com/safikolislam/city-complaint-frontend
-   **Backend Repository:**
    https://github.com/safikolislam/city-complaint-backend
-   **Live Frontend:** 
-   **Live Backend API:**https://city-complaint-backend-seven.vercel.app/
  
-   **API Documentation / Postman:** https://documenter.getpostman.com/view/45368212/2sBYHNXPFp
-   **Demo Walkthrough Video:** `ADD_DEMO_VIDEO_URL`

## User Roles

  -----------------------------------------------------------------------
  Role                                Main purpose
  ----------------------------------- -----------------------------------
  **Citizen**                         Create complaints and track their
                                      own requests.

  **Staff**                           Handle assigned complaints and
                                      update their workflow status
                                      according to permissions.

  **Admin**                           Manage and oversee platform
                                      operations using authorized
                                      administrative features.
  -----------------------------------------------------------------------

Staff may have **Officer** and **Technician** positions. Available
actions depend on backend permissions and the features implemented in
the frontend.

## Getting Started

### Prerequisites

-   Node.js 20 or later
-   npm (or your preferred package manager)
-   Access to the City Complaint backend API

### 1. Clone the frontend repository

``` bash
git clone ADD_FRONTEND_GITHUB_URL
cd YOUR_FRONTEND_FOLDER
```

Replace the repository URL and folder name with your actual frontend
details.

### 2. Install dependencies

``` bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the frontend project root:

``` env
API_BASE_URL=https://city-complaint-backend-seven.vercel.app/api/v1
```

Use the exact environment variable name expected by your codebase. If
your app uses a different variable (for example,
`NEXT_PUBLIC_API_BASE_URL`), configure that name instead. Never commit
real secrets or personal credentials.

### 4. Run the development server

``` bash
npm run dev
```

Open <http://localhost:3000> in your browser.

### 5. Create a production build

``` bash
npm run build
npm run start
```

## Authentication & Demo Login

The application supports role-based authentication backed by the City
Complaint API.

For evaluation, configure dedicated demo accounts and make sure the
login flow works for each required role. If one-click demo login is
implemented, each button should authenticate using the matching demo
account and redirect to the correct dashboard.



## App Router & UI Notes

The frontend should use the Next.js App Router conventions consistently:

-   `layout.tsx` for shared application layout and providers.
-   `page.tsx` for route-level pages.
-   Server Components by default, with `"use client"` only where
    interactivity is required.
-   `loading.tsx` for data-fetching loading states.
-   `error.tsx` for route-segment error boundaries.
-   `not-found.tsx` for a custom 404 experience.
-   Middleware or the appropriate current Next.js routing mechanism for
    route protection, with authorization also enforced by the backend.
-   Role-aware navigation and UI that only displays actions permitted to
    the signed-in user.

## API Integration

The configured backend base URL is:

``` text
https://city-complaint-backend-seven.vercel.app/api/v1
```

The backend includes modules for authentication, users, complaints,
categories, administration, and payments. Exact endpoints, request
bodies, and response formats should follow the linked API documentation.

For production, ensure that:

-   API errors are handled gracefully.
-   Protected requests send authentication using the mechanism expected
    by the backend.
-   Filters, search, sorting, and pagination remain synchronized with
    the URL where applicable.
-   Secrets are stored in deployment environment variables, not in
    source code.
-   The deployed frontend's allowed origin is configured correctly on
    the backend.

## Payment Integration

The backend project supports a payment workflow. Configure the frontend
to use the actual provider and endpoints supported by the deployed
backend, and verify initiation, success, cancellation, and failure
scenarios using test credentials.

Do not describe a simulated payment flow as a real integration. Never
expose payment secret keys in frontend code or public environment
variables.

## Deployment

This project can be deployed to Vercel or another Next.js-compatible
hosting provider.

1.  Import the frontend repository into the hosting provider.
2.  Configure the required environment variables.
3.  Verify backend CORS settings allow the deployed frontend origin.
4.  Deploy and test login, role-specific routes, complaint workflows,
    and payment redirects.
5.  Add the live URL to the **Project Links** section above.



## Author

**Safikol Islam**
