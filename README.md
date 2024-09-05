# Real-Time Chart with PostgreSQL and WebSockets

## Overview

This project demonstrates how to create a real-time chart that updates dynamically based on changes to a PostgreSQL database. It integrates several technologies to achieve live data visualization:

- **PostgreSQL**: The database that stores the data.
- **WebSockets**: A communication protocol used to push updates from the server to the client in real-time.
- **Express**: A web server framework for Node.js that handles WebSocket connections and other server-side logic.
- **Chart.js**: A JavaScript library used for creating dynamic and interactive charts in the browser.
- **EJS**: A templating engine for rendering HTML on the server side.

## Concepts

### PostgreSQL Notifications

PostgreSQL supports notifications using the `LISTEN` and `NOTIFY` commands. This feature allows the database to send a notification when data changes, which can be used to trigger updates in real-time.

### WebSockets

WebSockets provide a full-duplex communication channel over a single, long-lived connection. This is ideal for real-time applications where data needs to be pushed from the server to the client without the overhead of HTTP requests.

### Chart.js

Chart.js is a powerful and flexible library for creating various types of charts. It is used here to visualize the data received from the server.

### Express

Express is a minimalist web framework for Node.js. It handles HTTP requests, WebSocket connections, and serves the EJS templates.

### EJS

EJS (Embedded JavaScript) is used to generate HTML dynamically on the server. It allows embedding JavaScript logic within HTML templates, making it suitable for rendering pages with dynamic content.

## How It Works

1. **Database Setup**: The PostgreSQL database is set up to send notifications when certain events occur, such as updates to the data.

2. **Server-Side Logic**: An Express server listens for these notifications and pushes the updated data to connected WebSocket clients.

3. **Client-Side Updates**: The client receives data through WebSockets and updates the chart in real-time using Chart.js.

4. **Real-Time Visualization**: As new data arrives, the chart on the client side is updated dynamically, reflecting the latest information from the database.

## Getting Started

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**:

   ```bash
   pnpm install
   ```

3. **Set Up the Database**: Ensure PostgreSQL is running and configured. Create the necessary tables and set up notification triggers.

4. **Start the Server**:

   ```bash
   node index.js
   ```

5. **Open the Application**: Navigate to `http://localhost:3000` in your web browser to view the real-time chart.
