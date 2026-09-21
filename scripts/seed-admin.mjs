import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";

// Load environment variables from .env.local safely
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "../.env.local");

const envVars = {};
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const idx = trimmed.indexOf("=");
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim();
        envVars[key] = val;
      }
    }
  }
}

const firebaseConfig = {
  apiKey: envVars.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyD1fS4Y9zyYr0k-gHl71NeGfQTq68hQBPw",
  authDomain: envVars.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "phyteam-7c045.firebaseapp.com",
  projectId: envVars.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "phyteam-7c045",
  storageBucket: envVars.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "phyteam-7c045.firebasestorage.app",
  messagingSenderId: envVars.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "523698509654",
  appId: envVars.NEXT_PUBLIC_FIREBASE_APP_ID || process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:523698509654:web:db85b64c27fabb9095e8f7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const ADMIN_EMAIL = envVars.NEXT_PUBLIC_ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL;
const ADMIN_PASS = envVars.NEXT_PUBLIC_ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

async function seed() {
  console.log("=================================================");
  console.log("  PHYTEAM FIREBASE ADMIN SEEDING UTILITY");
  console.log("=================================================");
  
  if (!ADMIN_EMAIL || !ADMIN_PASS) {
    console.error("✗ Error: Missing admin credentials.");
    console.error("  Please ensure NEXT_PUBLIC_ADMIN_EMAIL and NEXT_PUBLIC_ADMIN_PASSWORD are set in .env.local\n");
    process.exit(1);
  }

  console.log(`Target Email:     ${ADMIN_EMAIL}`);
  console.log("Target Password:  [PROTECTED]");
  console.log(`Firebase Project: ${firebaseConfig.projectId}\n`);

  let authSuccess = false;
  let firestoreSuccess = false;
  let userUid = null;

  // 1. Firebase Authentication
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASS);
    userUid = userCredential.user.uid;
    authSuccess = true;
    console.log("✓ SUCCESS: Admin account created in Firebase Authentication!");
    console.log(`  User UID: ${userUid}`);
  } catch (err) {
    if (err.code === "auth/email-already-in-use") {
      console.log("ℹ Admin email already exists in Firebase Auth. Verifying credentials...");
      try {
        const cred = await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASS);
        userUid = cred.user.uid;
        authSuccess = true;
        console.log("✓ SUCCESS: Verified existing admin credentials in Firebase Auth!");
        console.log(`  User UID: ${userUid}`);
      } catch (loginErr) {
        console.error("✗ Failed to log in with existing user:", loginErr.message);
      }
    } else if (err.code === "auth/operation-not-allowed") {
      console.log("⚠️  NOTICE: 'Email/Password' provider is not enabled yet in your Firebase project.");
      console.log("   To enable in 10 seconds:");
      console.log(`   1. Open: https://console.firebase.google.com/project/${firebaseConfig.projectId}/authentication/providers`);
      console.log("   2. Click 'Email/Password' -> Toggle 'Enable' -> Click 'Save'");
      console.log("   3. Re-run: node scripts/seed-admin.mjs\n");
    } else {
      console.error("✗ Firebase Auth error:", err.code, err.message);
    }
  }

  // 2. Firestore "admins" record
  try {
    const adminDocId = userUid || "admin_super";
    await setDoc(doc(db, "admins", adminDocId), {
      email: ADMIN_EMAIL,
      role: "super_admin",
      status: "active",
      seededAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    firestoreSuccess = true;
    console.log("✓ SUCCESS: Admin document seeded into Firestore 'admins' collection!");
  } catch (dbErr) {
    if (dbErr.message && dbErr.message.includes("PERMISSION_DENIED")) {
      console.log("⚠️  NOTICE: Firestore rules currently restrict public writes.");
      console.log("   To allow reads/writes for testing:");
      console.log(`   1. Open: https://console.firebase.google.com/project/${firebaseConfig.projectId}/firestore/rules`);
      console.log("   2. Update rules to allow read, write: if true;");
      console.log("   3. Click 'Publish'\n");
    } else {
      console.warn("Firestore notice:", dbErr.message);
    }
  }

  console.log("-------------------------------------------------");
  console.log("SUMMARY:");
  console.log(`- Firebase Auth:      ${authSuccess ? "ACTIVE" : "PENDING (Enable Email/Password in console)"}`);
  console.log(`- Firestore Record:   ${firestoreSuccess ? "ACTIVE" : "PENDING (Update rules in console)"}`);
  console.log("- Web Admin Portal:   READY AT http://localhost:3000/admin");
  console.log("=================================================\n");
  process.exit(0);
}

seed();
