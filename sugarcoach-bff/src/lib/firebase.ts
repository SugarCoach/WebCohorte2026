import { initializeApp, cert, getApps, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { env } from "../config/env.js";

function getFirebaseApp(): App {
  const existing = getApps();
  if (existing.length > 0) return existing[0]!;
  return initializeApp({
    credential: cert({
      projectId: env.FIREBASE_PROJECT_ID,
      clientEmail: env.FIREBASE_CLIENT_EMAIL,
      privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

const app = getFirebaseApp();
export const firebaseAuth = getAuth(app);

export interface AuthenticatedUser {
  uid: string;
  email?: string;
  role?: string;
}

/** Verifica un ID token de Firebase (enviado por el Portal o la app Kotlin). */
export async function verifyFirebaseToken(idToken: string): Promise<AuthenticatedUser> {
  const decoded = await firebaseAuth.verifyIdToken(idToken);
  return {
    uid: decoded.uid,
    email: decoded.email,
    role: (decoded as Record<string, unknown>).role as string | undefined,
  };
}
