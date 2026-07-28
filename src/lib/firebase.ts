import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
  FirestoreError,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase safely for Next.js SSR / Client
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);

const STATS_COLLECTION = "portfolio";
const STATS_DOC = "stats";

export interface PortfolioStats {
  views: number;
  updatedAt?: unknown;
}

/**
 * Fetch current portfolio view count from Firestore (portfolio/stats).
 * This never initializes or mutates the stats document.
 */
export async function getPortfolioViews(): Promise<number | null> {
  try {
    const docRef = doc(db, STATS_COLLECTION, STATS_DOC);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      const data = snap.data() as PortfolioStats;
      return typeof data.views === "number" ? data.views : 0;
    }
    return 0;
  } catch (error) {
    console.warn("Firestore getPortfolioViews notice:", error);
    return null;
  }
}

async function incrementPortfolioViews(): Promise<void> {
  const docRef = doc(db, STATS_COLLECTION, STATS_DOC);

  try {
    await updateDoc(docRef, {
      views: increment(1),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    const code = (error as FirestoreError | undefined)?.code;

    if (code !== "not-found") {
      throw error;
    }

    await setDoc(
      docRef,
      { views: 1, updatedAt: serverTimestamp() },
      { merge: true }
    );
  }
}

/**
 * Atomically records one completed intro entry in Firestore (portfolio/stats).
 * Every intentional intro completion increments the global counter once.
 */
export async function recordPortfolioIntroEntry(): Promise<number | null> {
  try {
    await incrementPortfolioViews();
    return await getPortfolioViews();
  } catch (error) {
    console.warn("Firestore recordPortfolioIntroEntry notice:", error);
    return await getPortfolioViews();
  }
}
