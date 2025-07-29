export interface Resource {
    id: number;
    name: string;
  }

  export interface Appointment {
    id: number;
    resourceId: number;
    start: string; 
    end: string;  
    type: 'appointment' | 'unavailable';
    title?: string;
  }