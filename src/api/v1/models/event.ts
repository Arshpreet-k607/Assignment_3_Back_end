export interface Event {
  id: string;
  name: string;
  description?: string;
  date: string;
  location: string;
  capacity: number;
  category: string;
  status: string;
  isVirtual: boolean;
  organizerEmail: string;
  createdAt: string;
  updatedAt: string;
}

export type EventCreateInput = Omit<Event, "id" | "createdAt" | "updatedAt">;
export type EventUpdateInput = Partial<EventCreateInput>;
