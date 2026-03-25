import admin from "firebase-admin";
import path from "path";

if (!admin.apps.length) {
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

  if (serviceAccountPath) {
    const resolvedPath = path.isAbsolute(serviceAccountPath)
      ? serviceAccountPath
      : path.join(process.cwd(), serviceAccountPath);

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const serviceAccount = require(resolvedPath);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  }
}

const db = admin.firestore();

export { db };
