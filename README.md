# Drone Survey System

This project is a web-based application designed to manage drone survey missions, visualize flight paths and survey areas on an interactive map, and potentially integrate with real-time drone data and analytics.

Application link - https://dronesurveysystem.netlify.app/dashboard

## Table of Contents

- [Features](#features)
- [Technical Stack](#technical-stack)
- [Project Structure](#project-structure)
- [Functionality & Implementation Details](#functionality--implementation-details)
  - [Mission Management](#mission-management)
  - [Interactive Map & Drawing Controls](#interactive-map--drawing-controls)
  - [Flight Path & Survey Area Configuration](#flight-path--survey-area-configuration)
  - [API Endpoints](#api-endpoints)
  - [Global Styles & Utilities](#global-styles--utilities)
  - [Analytics Dashboard](#analytics-dashboard)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)

## Features

- **Mission Management**: Create, view, and manage drone survey missions.
- **Interactive Map Visualization**: Display mission locations, configured flight paths, and survey areas on a Leaflet map.
- **Flight Path & Survey Area Drawing**: Utilize `leaflet-draw` controls to define and edit custom flight paths (polylines) and survey areas (polygons).
- **Comprehensive Analytics**: Visualize mission statistics, status distribution, and geographical insights through interactive charts.
- **Responsive Design**: Built with Tailwind CSS for a mobile-first and responsive user experience.
- **Mock Data Integration**: Uses mock data for initial development and demonstration of mission functionalities.
- **Modular and Commented Codebase**: Extensive JSDoc and inline comments for improved code understanding and maintainability, along with refactored components for better modularity.
- **API Integration (Planned/In Progress)**: Placeholder API routes for drone, mission, analytics, and websocket communication.

## Technical Stack

- **Next.js**: React framework for production.
- **React**: Frontend JavaScript library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **Leaflet**: Open-source JavaScript library for mobile-friendly interactive maps.
- **React-Leaflet**: React components for Leaflet maps.
- **Leaflet.Draw**: Plugin for Leaflet for drawing and editing shapes.
- **Recharts**: A composable charting library built on React components for building charts.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

## Project Structure

```
. (root)
├── public/
│   ├── images/         # Static assets like map markers
├── src/
│   ├── app/
│   │   ├── (dashboard)/ # Main application routes (e.g., missions, analytics, dashboard)
│   │   │   ├── missions/ 
│   │   │   │   ├── [id]/components/
│   │   │   │   │   ├── FlightPathConfig.tsx          # Deprecated, replaced by FlightConfigInputs
│   │   │   │   │   └── FlightConfigInputs.tsx    # Component for flight configuration inputs (NEW)
│   │   │   │   ├── [id]/page.tsx
│   │   │   │   ├── components/
│   │   │   │   │   ├── FilterPopup.tsx           # Component for mission filter popup (NEW)
│   │   │   │   │   ├── MissionCard.tsx
│   │   │   │   │   ├── MissionMap.tsx
│   │   │   │   │   └── NewMissionForm.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── analytics/
│   │   │   │   ├── components/
│   │   │   │   │   └── ChartTooltips.tsx         # Component for custom chart tooltips (NEW)
│   │   │   │   └── page.tsx
│   │   │   ├── dashboard/
│   │   │   │   ├── components/
│   │   │   │   │   └── MissionGlobe.tsx          # Dynamically imported Globe component
│   │   │   │   └── page.tsx
│   │   │   ├── fleet/page.tsx # Placeholder for fleet management
│   │   │   └── layout.tsx   # Dashboard layout with sidebar navigation
│   │   ├── context/
│   │   │   └── MissionContext.tsx # React Context for global mission state
│   │   ├── lib/            # Utility functions and mock data
│   │   │   ├── mockMissions.ts # Mock data for missions
│   │   │   ├── types.ts    # Global type definitions
│   │   │   └── utils.ts    # General utility functions (e.g., getStatusColor, getContinent)
│   │   ├── globals.css     # Global CSS styles (Tailwind imports)
│   │   ├── layout.tsx      # Root layout for the application
│   │   └── page.tsx        # Homepage (redirects to dashboard)
│   ├── types/
│   │   ├── FlightConfig.ts    # Type definitions for flight configuration
│   │   └── FlightPathConfig.ts # Type definitions for flight path components
├── next.config.js          # Next.js configuration
├── postcss.config.js       # PostCSS configuration (for Tailwind CSS)
├── tailwind.config.js      # Tailwind CSS configuration
├── package.json            # Project dependencies and scripts
├── package-lock.json
└── README.md
```

## Functionality & Implementation Details

### Mission Management

- **Overview**: Missions are the core entities, each representing a drone survey task.
- **Implementation**:
  - **Data**: Mission data is currently mock data defined in `src/app/lib/mockMissions.ts`. This file simulates a database by providing a list of mission objects, each with details like ID, name, location, and `flightConfig`. The `MissionContext.tsx` leverages this mock data for global state management and provides functions to `getMission`, `updateMission`, and `addMission`.
  - **Display**: Missions are listed and summarized using `src/app/(dashboard)/missions/components/MissionCard.tsx`. This component is concise and now includes extensive JSDoc and inline comments. The main missions page is `src/app/(dashboard)/missions/page.tsx`, which has been commented and refactored to use the new `FilterPopup` component.
  - **Creation**: New missions can be added using `src/app/(dashboard)/missions/components/NewMissionForm.tsx`. This form allows users to input mission details, which are then processed and added to the mock data via the `MissionContext`. This component has been extensively commented and its flight configuration inputs have been modularized into `FlightConfigInputs.tsx`.
  - **Context**: `src/app/context/MissionContext.tsx` is used for managing and sharing mission-related state across components. It now includes detailed JSDoc comments and improved type safety for the `flightConfig` property.

### Interactive Map & Drawing Controls

- **Overview**: The application features an interactive map where drone missions can be visualized, and flight paths/survey areas can be drawn and edited.
- **Implementation**:
  - **Map Component**: `src/app/(dashboard)/missions/components/MissionMap.tsx` is the primary component for rendering the Leaflet map. It has been thoroughly commented with JSDoc and inline explanations.
  - **Base Map**: It uses `react-leaflet` to integrate Leaflet, displaying OpenStreetMap tiles (`TileLayer`).
  - **Markers**: Mission locations are marked with custom SVG icons (`/images/green-pin.svg`).
  - **Drawing Functionality**: `leaflet-draw` is integrated within the `DrawingControls` sub-component of `MissionMap.tsx`. This enables users to draw `polygons` (for `surveyArea`) and `polylines` (for `flightPath`). The event handling logic within `DrawingControls` has been refactored into separate, well-commented functions for improved modularity.
  - **Editing Existing Configurations**: The `DrawingControls` component is initialized with existing `flightConfig` data from a mission, allowing previously saved survey areas and flight paths to be displayed and edited directly on the map. This is achieved by populating `leaflet-draw`'s `edit.featureGroup` with `L.polygon` and `L.polyline` layers based on the `flightConfig`.
  - **Event Handling**: Map drawing and editing events (`draw:created`, `draw:edited`, `draw:deleted`) are now handled by extracted, dedicated functions that update the `flightConfig` state in the parent component, making the logic clearer.

### Flight Path & Survey Area Configuration

- **Overview**: Each mission can have a defined flight path and a survey area, represented by geographic coordinates.
- **Implementation**:
  - **Type Definitions**: The structure of flight configuration data is defined in `src/types/FlightConfig.ts` and `src/types/FlightPathConfig.ts`. `FlightConfig` encompasses both `surveyArea` and `flightPath`, while `FlightPathConfig` specifically details the waypoints for the flight path. These types ensure strong type safety across the application.
  - **Data Representation**: `surveyArea` is an array of latitude/longitude points forming a polygon. `flightPath` is an array of waypoints (latitude, longitude, and altitude) forming a polyline.
  - **Rendering on Map**: `Polygon` and `Polyline` components from `react-leaflet` are used in `MissionMap.tsx` to render the `surveyArea` and `flightPath` data respectively, using `getSurveyAreaPositions()` and `getFlightPathPositions()` helper functions.
  - **Dedicated Inputs**: The input fields for configuring `Altitude`, `Image Overlap`, `Capture Frequency`, `Sensors`, and `Resolution` have been moved to a new, modular component: `src/app/(dashboard)/missions/[id]/components/FlightConfigInputs.tsx`. This component centralizes the flight configuration UI and logic.

### API Endpoints

- **Overview**: The project includes a `src/app/api` directory for Next.js API routes, hinting at planned backend integrations.
- **Implementation**:
  - `src/app/api/drones/route.ts`: Expected to handle operations related to drone management.
  - `src/app/api/missions/route.ts`: Likely for CRUD operations on mission data.
  - `src/app/api/analytics/route.ts`: For fetching or processing analytical data from drone operations.
  - `src/app/api/websocket/route.ts`: Suggests real-time communication capabilities, possibly for live drone telemetry or mission updates.
  - `src/app/lib/database.ts`: A placeholder file indicating where database connection and queries would be implemented.

### Global Styles & Utilities

- **Styling**: `src/app/globals.css` imports Tailwind CSS directives and any other global styles. Tailwind CSS configuration is in `tailwind.config.js` and `postcss.config.js`.
- **Utilities**: `src/app/lib/utils.ts` contains general-purpose utility functions like `cn` (for merging CSS classes) and `getStatusColor` (for status-based coloring). The `getContinent` function for geographical categorization has also been moved here, enhancing reusability and centralizing helper logic.

### Analytics Dashboard

- **Overview**: The analytics dashboard provides key insights into mission performance and distribution.
- **Implementation**:
  - **Dashboard Page**: `src/app/(dashboard)/analytics/page.tsx` is the main analytics page. It calculates various statistics like total missions, completion rates, and total flight hours.
  - **Charts**: Utilizes `Recharts` for visualizing data through interactive charts, including a Bar Chart for mission status distribution and a Pie Chart for drone distribution by continent.
  - **Modular Tooltips**: Custom tooltips for the charts (`CustomTooltip` and `PieTooltip`) have been extracted into `src/app/(dashboard)/analytics/components/ChartTooltips.tsx`, improving code organization and reusability for chart interactions.
  - **Recent Activity**: Displays a log of recent mission creations and completions, providing a quick overview of system activity.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd drone-survey-system
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Open your browser and navigate to `http://localhost:3000` (or the port indicated in your terminal).
