# Copilot Instructions for ADmyBRAND Insights Analytics Dashboard

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a modern analytics dashboard built with React, TypeScript, Vite, and Tailwind CSS. The project follows modern React patterns and focuses on creating beautiful, responsive UI components.

## Key Technologies
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **State Management**: React Context API for theme management

## Code Style Guidelines
- Use functional components with hooks
- Implement proper TypeScript types for all props and data
- Follow component composition patterns
- Use Tailwind CSS classes for styling
- Implement responsive design (mobile-first approach)
- Create reusable components in the `components` directory
- Use proper error boundaries and loading states

## Component Architecture
- **Layout Components**: Header, Sidebar, Main content area
- **Chart Components**: LineChart, BarChart, PieChart wrappers around Recharts
- **Data Components**: MetricCard, DataTable with sorting/filtering
- **UI Components**: Button, Card, Modal, etc.
- **Theme**: Dark/Light mode toggle with system preference detection

## Data Structure
- Mock analytics data for digital marketing metrics
- Revenue, user engagement, conversion rates, growth percentages
- Time-series data for charts
- Tabular data for data tables

## Best Practices
- Implement proper loading states and skeletons
- Add smooth animations and micro-interactions
- Ensure accessibility (ARIA labels, keyboard navigation)
- Optimize for performance (lazy loading, memoization)
- Follow modern React patterns (custom hooks, context)
