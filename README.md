# Resource Scheduler (Day View)

A professional salon appointment scheduler built in Angular that displays a time-based daily schedule for multiple salon professionals (resources). This application demonstrates minute-level precision for appointment scheduling without relying on specialized calendar libraries.

## Features

### ✅ **Core Functionality**
- **Time Column**: Vertical list of hours (9 AM - 5 PM) with 15-minute sub-time slots
- **Resource Columns**: Separate columns for each salon professional
- **Minute-Level Precision**: Appointments can start/end at any specific minute (e.g., 9:03–9:13)
- **Current Time Indicator**: Red line showing current time with real-time updates
- **Visual Distinction**: Different styling for booked appointments vs. unavailable blocks
- **Responsive Layout**: Horizontal scrolling for multiple resources

### ✅ **Technical Implementation**
- **Built from Scratch**: No specialized scheduling libraries used
- **Configurable**: Easy to adjust start/end hours and time slot duration
- **Real-time Updates**: Current time indicator updates every minute
- **Performance Optimized**: Efficient calculations for minute-level positioning
- **Modular Architecture**: Separate components for time column, resource columns, and appointments

## Quick Start

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm or yarn

### Installation & Running

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Open Application**
   Navigate to `http://localhost:4200` in your browser

## Technical Architecture

### Component Structure
```
app/
├── components/
│   ├── day-view/           # Main container component
│   ├── time-column/        # Left-side time display
│   ├── resource-column/    # Individual resource columns
│   └── appointment-block/  # Individual appointment blocks
└── modals/
    └── modal.ts           # TypeScript interfaces
```

### Key Components

#### DayViewComponent
- **Purpose**: Main container that holds all scheduler data and logic
- **Features**: 
  - Current time tracking with real-time updates
  - Configuration management (start/end hours, slot duration)
  - Resource and appointment data management

#### TimeColumnComponent
- **Purpose**: Displays time slots on the left side
- **Features**:
  - Configurable time range (9 AM - 5 PM)
  - Adjustable slot duration (15-minute intervals)
  - Proper height calculations for alignment

#### ResourceColumnComponent
- **Purpose**: Individual columns for each salon professional
- **Features**:
  - Grid lines for visual reference
  - Proper height calculations
  - Appointment positioning

#### AppointmentBlockComponent
- **Purpose**: Individual appointment blocks
- **Features**:
  - Minute-level positioning (2px per minute)
  - Visual distinction between appointment types
  - Responsive styling

### Data Structures

```typescript
interface Resource {
  id: number;
  name: string;
}

interface Appointment {
  id: number;
  resourceId: number;
  start: string;  // ISO datetime string
  end: string;    // ISO datetime string
  type: 'appointment' | 'unavailable';
  title?: string;
}
```

## Scheduling Logic

### Minute-Level Precision
The application uses a 2px-per-minute scale for precise positioning:
- Each minute = 2 pixels vertically
- 1 hour = 120 pixels
- 8-hour day = 960 pixels

### Current Time Calculation
```typescript
const totalMinutes = (currentHour - startHour) * 60 + currentMinute;
const topPosition = totalMinutes * 2; // 2px per minute
```

### Appointment Positioning
```typescript
const startMins = (start.getHours() - startHour) * 60 + start.getMinutes();
const durationMins = (end.getTime() - start.getTime()) / 60000;
const top = startMins * 2;
const height = durationMins * 2;
```

## Configuration

### Easy Customization
The scheduler is highly configurable through the `DayViewComponent`:

```typescript
startHour = 9;        // Start time (9 AM)
endHour = 17;         // End time (5 PM)
slotDuration = 15;    // Time slot duration in minutes
```

### Adding Resources
```typescript
resources: Resource[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];
```

### Adding Appointments
```typescript
appointments: Appointment[] = [
  {
    id: 1,
    resourceId: 1,
    start: '2025-07-24T09:03',
    end: '2025-07-24T09:13',
    type: 'appointment',
    title: 'Haircut'
  }
];
```

## Design Choices

### Visual Design
- **Color Scheme**: Material Design colors for consistency
- **Typography**: Segoe UI for readability
- **Layout**: Flexbox for responsive design
- **Shadows**: Subtle shadows for depth

### Performance Considerations
- **Efficient Calculations**: Minimal DOM manipulation
- **Real-time Updates**: Optimized interval-based updates
- **Memory Management**: Proper cleanup of intervals

### Accessibility
- **Semantic HTML**: Proper heading structure
- **Color Contrast**: High contrast for readability
- **Responsive Design**: Works on different screen sizes

## Future Enhancements

### Optional Features (Not Required)
- **Drag & Drop**: Move appointments by dragging
- **Day Navigation**: Previous/next day buttons
- **Tooltips**: Hover for appointment details
- **Tests**: Unit and integration tests
- **API Integration**: Real data fetching
- **Print View**: Printable schedule format

## Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development Notes

### Build Commands
```bash
npm start          # Development server
npm run build      # Production build
npm test           # Run tests
```

### Project Structure
- **Angular 17**: Latest version with modern features
- **TypeScript**: Strong typing for better development experience
- **SCSS**: Advanced styling capabilities
- **No External Dependencies**: Built entirely from scratch

## License
This project is created for technical assessment purposes.
