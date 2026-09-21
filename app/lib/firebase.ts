import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

// Firebase configuration with environment variable override
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyD1fS4Y9zyYr0k-gHl71NeGfQTq68hQBPw",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "phyteam-7c045.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "phyteam-7c045",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "phyteam-7c045.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "523698509654",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:523698509654:web:db85b64c27fabb9095e8f7",
};

export const isFirebaseConfigured = (): boolean => {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
};

// Initialize Firebase safely (avoid multi-initialization during HMR)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = isFirebaseConfigured() ? getAuth(app) : null;
export const db = isFirebaseConfigured() ? getFirestore(app) : null;

export interface Lead {
  id: string;
  type: "contact_form" | "call_booking";
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message?: string;
  status: "new" | "contacted" | "in_progress" | "closed";
  createdAt?: string | Timestamp | Date | null;
  updatedAt?: string | Timestamp | Date | null;
}

// Local storage fallback for development / before keys are provided
const LOCAL_STORAGE_KEY = "phyteam_leads_cache";

const getLocalLeads = (): Lead[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveLocalLeads = (leads: Lead[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(leads));
  } catch {
    // Ignore storage quota errors
  }
};

/**
 * Submit a new lead inquiry from Contact Form or Book Call Modal
 */
export async function submitLead(
  leadData: Omit<Lead, "id" | "status" | "createdAt" | "updatedAt">
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    if (db && isFirebaseConfigured()) {
      const docRef = await addDoc(collection(db, "leads"), {
        ...leadData,
        status: "new",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return { success: true, id: docRef.id };
    } else {
      // Local fallback mode when Firebase credentials are still pending
      const newLead: Lead = {
        ...leadData,
        id: "lead_" + Date.now(),
        status: "new",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const existing = getLocalLeads();
      saveLocalLeads([newLead, ...existing]);
      // Trigger local storage event for same-tab updates
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("phyteam_local_leads_updated"));
      }
      return { success: true, id: newLead.id };
    }
  } catch (err: unknown) {
    console.error("Error submitting lead:", err);
    const message = err instanceof Error ? err.message : "Failed to submit lead";
    return { success: false, error: message };
  }
}

/**
 * Real-time subscription to leads collection
 */
export function subscribeToLeads(
  callback: (leads: Lead[]) => void
): () => void {
  if (db && isFirebaseConfigured()) {
    try {
      const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
      return onSnapshot(
        q,
        (snapshot) => {
          const leads: Lead[] = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              type: data.type || "contact_form",
              name: data.name || "Anonymous",
              email: data.email || "",
              phone: data.phone || "",
              company: data.company || "",
              service: data.service || "General Inquiry",
              message: data.message || "",
              status: data.status || "new",
              createdAt: data.createdAt ? (data.createdAt as Timestamp).toDate().toISOString() : new Date().toISOString(),
              updatedAt: data.updatedAt ? (data.updatedAt as Timestamp).toDate().toISOString() : null,
            };
          });
          callback(leads);
        },
        (error) => {
          console.warn("Firestore onSnapshot error:", error);
          callback(getLocalLeads());
        }
      );
    } catch (err) {
      console.warn("Failed to attach Firestore listener, falling back:", err);
    }
  }

  // Fallback: poll or listen to localStorage events
  const handleUpdate = () => callback(getLocalLeads());
  handleUpdate();

  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("phyteam_local_leads_updated", handleUpdate);
  }

  return () => {
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("phyteam_local_leads_updated", handleUpdate);
    }
  };
}

/**
 * Update the status of an existing lead
 */
export async function updateLeadStatus(
  leadId: string,
  status: Lead["status"]
): Promise<{ success: boolean; error?: string }> {
  try {
    if (db && isFirebaseConfigured()) {
      const docRef = doc(db, "leads", leadId);
      await updateDoc(docRef, {
        status,
        updatedAt: serverTimestamp(),
      });
      return { success: true };
    } else {
      const leads = getLocalLeads().map((l) =>
        l.id === leadId ? { ...l, status, updatedAt: new Date().toISOString() } : l
      );
      saveLocalLeads(leads);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("phyteam_local_leads_updated"));
      }
      return { success: true };
    }
  } catch (err: unknown) {
    console.error("Error updating lead status:", err);
    const message = err instanceof Error ? err.message : "Failed to update status";
    return { success: false, error: message };
  }
}

/**
 * Delete a lead
 */
export async function deleteLead(
  leadId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (db && isFirebaseConfigured()) {
      const docRef = doc(db, "leads", leadId);
      await deleteDoc(docRef);
      return { success: true };
    } else {
      const leads = getLocalLeads().filter((l) => l.id !== leadId);
      saveLocalLeads(leads);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("phyteam_local_leads_updated"));
      }
      return { success: true };
    }
  } catch (err: unknown) {
    console.error("Error deleting lead:", err);
    const message = err instanceof Error ? err.message : "Failed to delete lead";
    return { success: false, error: message };
  }
}
