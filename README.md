
# Durban Alert: AI-Powered Flood Warning System

Durban Alert is a web application designed to provide timely and accurate flood warnings to the residents of Durban, South Africa, directly through WhatsApp. It leverages AI to analyze weather data, assess flood risks, and deliver personalized alerts in multiple languages.

## Features

- **WhatsApp Integration**: Users can register and receive alerts directly on WhatsApp, powered by Twilio.
- **AI-Powered Risk Analysis**: Utilizes Genkit and Google's Gemini models to analyze weather patterns and assess real-time flood risks for specific areas within Durban.
- **Automated User Registration**: A conversational AI agent handles user registration via a guided WhatsApp conversation.
- **Personalized Weekly Summaries**: Delivers weekly weather summaries tailored to the user's location, language, and profession.
- **Multi-language Support**: Alerts and communications are available in English, Zulu, and Afrikaans.
- **Admin Dashboard**: A comprehensive dashboard for administrators to monitor users, view alert logs, perform risk analysis, and configure the system.
- **Secure Credential Management**: Twilio credentials and other sensitive data are stored securely in a MongoDB database.

## Tech Stack

- **Framework**: Next.js (with App Router)
- **Generative AI**: Google AI - Genkit (with Gemini models)
- **UI**: React, ShadCN UI, Tailwind CSS
- **Database**: MongoDB
- **Messaging**: Twilio WhatsApp API
- **Styling**: Tailwind CSS
- **Deployment**: Firebase App Hosting

## Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/)
- A [MongoDB](https://www.mongodb.com/) account and a connection string.
- A [Twilio](https://www.twilio.com/) account with a WhatsApp-enabled phone number.

### Installation & Configuration

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your MongoDB connection string:
    ```
    MONGO_URI="your_mongodb_connection_string"
    ```

4.  **Configure Twilio Credentials:**
    - Run the application (`npm run dev`).
    - Navigate to the **Configure Twilio** page in the dashboard (`/dashboard/configure-twilio`).
    - Enter your **Twilio Account SID**, **Auth Token**, and **Twilio Phone Number**.
    - Save the credentials. They will be stored securely in your MongoDB database.

## Running the Application

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:9002`.

2.  **Configure the Twilio Webhook:**
    - In your Twilio account dashboard, find your WhatsApp-enabled phone number.
    - Under the "Messaging" section, configure the webhook for when a message comes in.
    - Set the URL to `https://<your-publicly-accessible-app-url>/api/whatsapp`. **Note**: For local testing, you will need to use a tool like [ngrok](https://ngrok.com/) to expose your local server to the internet.
    - Set the HTTP method to `POST`.

3.  **Test the WhatsApp Flow:**
    - Follow the instructions on the application's homepage to join the Twilio sandbox: Send `"join fire-meant"` to your Twilio WhatsApp number.
    - Once you've joined, send `"Hi"` to begin the registration process.

## Project Structure

- `src/app/`: Contains the Next.js pages and layouts for the application.
- `src/ai/flows/`: Genkit AI flows that define the core logic for risk analysis, weekly summaries, and the WhatsApp conversation agent.
- `src/components/`: Reusable React components, including UI components from ShadCN.
- `src/services/`: Modules for interacting with external services like MongoDB and Twilio.
- `src/lib/`: Utility functions, type definitions, and the database connection setup.
