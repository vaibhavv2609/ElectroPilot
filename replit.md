# VElectro - AI-Powered Electronics Recommendation Service

## Overview

VElectro is a full-stack web application that provides personalized electronics recommendations through AI-powered phone interviews. Users submit their contact information, receive an automated phone call with interview questions, and get customized product recommendations based on their responses. The system integrates multiple third-party services including Twilio for voice calls, OpenAI for transcription and AI recommendations, and Google Sheets for data logging.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React SPA**: Built with React, TypeScript, and Vite for fast development and builds
- **UI Framework**: shadcn/ui components with Radix UI primitives for consistent, accessible design
- **Styling**: Tailwind CSS with custom CSS variables for theming support
- **State Management**: TanStack Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

### Backend Architecture
- **Express.js Server**: RESTful API with TypeScript for type safety
- **Data Storage**: Dual storage approach - in-memory storage for development/testing and Drizzle ORM with PostgreSQL for production
- **Database Schema**: Users and recommendations tables with JSON fields for flexible product data storage
- **Voice Integration**: Twilio SDK for initiating calls, managing TwiML responses, and handling recording callbacks
- **AI Processing**: OpenAI integration for audio transcription (Whisper) and recommendation generation (GPT-4o)

### Data Storage Solutions
- **Primary Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Development Storage**: In-memory storage implementation for rapid development and testing
- **External Logging**: Google Sheets integration for additional data persistence and analytics
- **Schema Management**: Drizzle migrations for database versioning and schema evolution

### Authentication and Authorization
- **Session Management**: Express session middleware with PostgreSQL session store
- **Security**: Environment variable configuration for API keys and sensitive data
- **Input Validation**: Zod schemas for runtime type checking and data validation

### External Service Integrations
- **Twilio**: Voice calling service for automated customer interviews
  - Call initiation and management
  - TwiML generation for interactive voice responses
  - Audio recording and callback handling
- **OpenAI**: AI services for natural language processing
  - Whisper API for audio-to-text transcription
  - GPT-4o for intelligent product recommendation generation
- **Google Sheets API**: Data logging and backup storage
  - Service account authentication
  - Automated data appending for user submissions
- **Neon Database**: Serverless PostgreSQL hosting for production deployments

### Build and Development
- **Monorepo Structure**: Shared schema definitions between client and server
- **Development Tools**: Hot reload with Vite, TypeScript compilation, and ESBuild for production builds
- **Environment Configuration**: Flexible environment variable management for different deployment scenarios
- **Replit Integration**: Optimized for Replit development environment with specialized plugins and error handling

## External Dependencies

### Core Technologies
- **Database**: PostgreSQL via Neon serverless hosting
- **ORM**: Drizzle ORM with TypeScript support
- **Voice Services**: Twilio for phone calls and voice interaction
- **AI Services**: OpenAI (Whisper for transcription, GPT-4o for recommendations)
- **Data Logging**: Google Sheets API for analytics and backup

### Development and Build Tools
- **Frontend**: Vite, React, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js, ESBuild
- **UI Components**: shadcn/ui with Radix UI primitives
- **Validation**: Zod for schema validation
- **State Management**: TanStack Query for API state management

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`: Twilio service credentials
- `OPENAI_API_KEY`: OpenAI API access for AI services
- `GOOGLE_CREDENTIALS`, `GOOGLE_SHEET_ID`: Google Sheets API integration
- `BASE_URL`: Application base URL for webhook callbacks