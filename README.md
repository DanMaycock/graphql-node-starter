# Setup

Create a .env file containing the following environment variables:

-   APP_SECRET, the secret used for the json web tokens used by the application.
-   PRISMA_ENDPOINT (optional), the endpoint of the prisma server to use. If not included then Prisma will offer to configure one when first deployed.
-   PRISMA_SECRET, the secret to use for communicating with the prisma endpoint.

Deploy prisma via 'npm run prisma:deploy'

# Running the app

To run the app with nodemon with hot-reloading on code changes use 'npm run start:watch'

# Build the app

To build the app use 'npm run build'
