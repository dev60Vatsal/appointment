# Resource Scheduler - Salon Appointment Calendar

A comprehensive Angular-based resource scheduler for salon appointment management, built from scratch without specialized calendar libraries.

## Features

### ✅ Core Functionality
- **Day View Scheduler**: Displays appointments for multiple salon professionals
- **Minute-Level Precision**: Appointments can start/end at any specific minute (e.g., 9:03-9:13)
- **Current Time Indicator**: Real-time red line showing current time position
- **Resource Management**: Multiple professionals with individual columns
- **Appointment Types**: Distinguishes between booked appointments and unavailable blocks
- **Responsive Design**: Works on desktop and mobile devices

### ✅ Technical Implementation
- **Built from Scratch**: No specialized scheduling libraries used
- **Configurable**: Easy to adjust start/end hours and time slot durations
- **Performance Optimized**: Efficient minute-level calculations
- **Modular Architecture**: Separate components for different scheduler elements

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd appointment

# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:4200`

## Architecture Overview

### Components Structure
```
src/app/components/
├── resource-scheduler/          # Main scheduler container
│   ├── resource-scheduler.component.ts
│   ├── resource-scheduler.component.html
│   └── resource-scheduler.component.scss
├── day-view/                   # Legacy component (replaced)
├── time-column/                # Time axis component
├── resource-column/            # Resource column component
└── appointment-block/          # Individual appointment component
```

### Key Features

#### 1. Minute-Level Precision
The scheduler accurately positions appointments based on their exact start and end times:
```typescript
getAppointmentTop(appointment: Appointment): number {
  const start = new Date(appointment.start);
  const startMins = (start.getHours() - this.startHour) * 60 + start.getMinutes();
  return startMins * 2; // 2px per minute
}
```

#### 2. Current Time Indicator
Real-time red line that updates every minute:
```typescript
updateCurrentTime(): void {
  this.currentTime = new Date();
  const currentHour = this.currentTime.getHours();
  const currentMinute = this.currentTime.getMinutes();
  
  if (currentHour >= this.startHour && currentHour < this.endHour) {
    const totalMinutes = (currentHour - this.startHour) * 60 + currentMinute;
    this.currentTimeTop = totalMinutes * 2;
  }
}
```

#### 3. Configuration
Easy to configure time ranges and slot durations:
```typescript
// Configuration
startHour = 9;
endHour = 18;
slotDuration = 15; // minutes
```

## Data Structure

### Resource Interface
```typescript
export interface Resource {
  id: number;
  name: string;
  avatar?: string;
}
```

### Appointment Interface
```typescript
export interface Appointment {
  id: number;
  resourceId: number;
  start: string;
  end: string;
  title: string;
  clientName?: string;
  type: 'appointment' | 'unavailable';
  status?: 'confirmed' | 'no-show' | 'cancelled';
  color?: string;
}
```

## Design Implementation

### Layout Structure
1. **Header**: Navigation with date selector and view options
2. **Time Column**: Vertical time axis with 15-minute intervals
3. **Resource Columns**: Individual columns for each professional
4. **Appointment Blocks**: Positioned precisely based on start/end times
5. **Current Time Indicator**: Red line with time label

### Styling Approach
- **Modern UI**: Clean, professional design matching reference images
- **Responsive**: Adapts to different screen sizes
- **Accessibility**: Proper contrast and readable fonts
- **Performance**: Efficient CSS with minimal reflows

## Technical Decisions

### Why Built from Scratch?
- **Learning Opportunity**: Demonstrates understanding of scheduling logic
- **Customization**: Full control over features and styling
- **Performance**: No unnecessary dependencies
- **Requirements**: Assessment specifically requested no specialized libraries

### Performance Considerations
- **Efficient Calculations**: Pre-calculated positions to avoid runtime computation
- **Minimal Re-renders**: Angular change detection optimized
- **CSS Grid**: Hardware-accelerated positioning
- **Memory Management**: Proper cleanup of intervals and subscriptions

## Future Enhancements

### Optional Features (Not Required)
- **Drag & Drop**: Move appointments between time slots
- **Day Navigation**: Previous/next day buttons
- **Tooltips**: Hover for appointment details
- **Week/Month Views**: Extended calendar functionality
- **Real-time Updates**: WebSocket integration for live data

## Testing

### Manual Testing Checklist
- [ ] Appointments display at correct times
- [ ] Current time indicator updates every minute
- [ ] Responsive design works on mobile
- [ ] Appointment blocks show correct duration
- [ ] Navigation buttons are functional
- [ ] Time slots display correctly

### Performance Testing
- [ ] Smooth scrolling with multiple resources
- [ ] Fast rendering of 8+ hour schedule
- [ ] Efficient memory usage
- [ ] No lag with current time updates

## Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development Notes

### Key Implementation Details
1. **Time Calculations**: All time-based positioning uses 2px per minute scale
2. **Date Handling**: Uses ISO string format for consistency
3. **Component Communication**: Parent-child data flow for appointments
4. **CSS Positioning**: Absolute positioning for precise appointment placement

### Code Quality
- **TypeScript**: Full type safety
- **Angular Best Practices**: Proper component lifecycle management
- **Clean Code**: Readable and maintainable structure
- **Error Handling**: Graceful handling of invalid data

## License
This project is created for technical assessment purposes.
