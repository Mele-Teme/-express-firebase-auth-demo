import admin, { ServiceAccount } from "firebase-admin";
import serviceAccount from "../../service-account.json" assert { type: "json" }; 
import { getApps } from "firebase-admin/app";

if (getApps().length === 0)
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  });

export default admin;
