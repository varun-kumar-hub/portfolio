import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
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
 * Fetch current portfolio view count from Firestore (portfolio/stats)
 */
export async function getPortfolioViews(): Promise<number | null> {
  try {
    const docRef = doc(db, STATS_COLLECTION, STATS_DOC);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      const data = snap.data() as PortfolioStats;
      return typeof data.views === "number" ? data.views : 0;
    } else {
      // Document doesn't exist yet, initialize it
      await setDoc(docRef, { views: 1, updatedAt: serverTimestamp() }, { merge: true });
      return 1;
    }
  } catch (error) {
    console.warn("Firestore getPortfolioViews notice:", error);
    return null;
  }
}

/**
 * Atomically increment portfolio view count by 1 in Firestore (portfolio/stats)
 * Enforces one view per browser session using sessionStorage.
 */
export async function recordPortfolioView(): Promise<number | null> {
  if (typeof window === "undefined") return null;

  const SESSION_KEY = "portfolio_view_recorded";
  const hasRecorded = sessionStorage.getItem(SESSION_KEY);

  const docRef = doc(db, STATS_COLLECTION, STATS_DOC);

  try {
    if (!hasRecorded) {
      // Mark session first to prevent duplicate triggering
      sessionStorage.setItem(SESSION_KEY, "true");

      const snap = await getDoc(docRef);

      if (snap.exists()) {
        await updateDoc(docRef, {
          views: increment(1),
          updatedAt: serverTimestamp(),
        });
        const updatedSnap = await getDoc(docRef);
        const data = updatedSnap.data() as PortfolioStats;
        return typeof data.views === "number" ? data.views : null;
      } else {
        await setDoc(
          docRef,
          { views: 1, updatedAt: serverTimestamp() },
          { merge: true }
        );
        return 1;
      }
    } else {
      // Already recorded in this session, return current count without incrementing
      return await getPortfolioViews();
    }
  } catch (error) {
    console.warn("Firestore recordPortfolioView notice:", error);
    // If network or permission error occurred, attempt silent fallback fetch
    return await getPortfolioViews();
  }
}
