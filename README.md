# FinTrackPro

FinTrackPro is a financial software-as-a-service (SaaS) application designed to help users manage their financial transactions efficiently. It provides a robust API for handling transactions, accounts, and categories with secure authentication and validation.

## Features

- User authentication and authorization
- CRUD operations for transactions
- Bulk creation and deletion of transactions
- Date range filtering for transactions
- Integration with accounts and categories
- Secure and validated API endpoints

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Docker
- Kubernetes
- PostgreSQL database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/fintrackpro.git
   cd fintrackpro
   ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Set up environment variables:
   Create a .env.local file in the root directory and add the following variables:

    ```bash
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY>
    CLERK_SECRET_KEY=<CLERK_SECRET_KEY>
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    CLERK_PUBLISHABLE_KEY=<CLERK_PUBLISHABLE_KEY>
    DATABASE_URL=<DATABASE_URL>
    NEXT_PUBLIC_APP_URL=http://localhost:3000
    ```

### Running the Application Locally

  * To start the application locally, run:

      ```bash
      npm run dev
      # or
      yarn dev
      ```