import type { QueryDocumentSnapshot } from "firebase-admin/firestore";
import { db } from "../../../../config/firebaseConfig";
import { Event, EventCreateInput, EventUpdateInput } from "../models/event";

const collection = db.collection("events");

export const createEvent = async (payload: EventCreateInput): Promise<Event> => {
  const docRef = collection.doc();
  const now = new Date().toISOString();
  const data: Omit<Event, "id"> = {
    ...payload,
    createdAt: now,
    updatedAt: now,
  };

  await docRef.set(data);
  return { id: docRef.id, ...data };
};

export const getAllEvents = async (): Promise<Event[]> => {
  const snapshot = await collection.get();
  return snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
    id: doc.id,
    ...(doc.data() as Omit<Event, "id">),
  }));
};

export const getEventById = async (id: string): Promise<Event | null> => {
  const doc = await collection.doc(id).get();
  if (!doc.exists) {
    return null;
  }

  return {
    id: doc.id,
    ...(doc.data() as Omit<Event, "id">),
  };
};

export const updateEvent = async (
  id: string,
  payload: EventUpdateInput
): Promise<Event | null> => {
  const docRef = collection.doc(id);
  const snapshot = await docRef.get();
  if (!snapshot.exists) {
    return null;
  }

  const now = new Date().toISOString();
  const data = {
    ...payload,
    updatedAt: now,
  };

  await docRef.update(data);

  return {
    id,
    ...(snapshot.data() as Omit<Event, "id">),
    ...data,
  } as Event;
};

export const deleteEvent = async (id: string): Promise<boolean> => {
  const docRef = collection.doc(id);
  const snapshot = await docRef.get();
  if (!snapshot.exists) {
    return false;
  }

  await docRef.delete();
  return true;
};
