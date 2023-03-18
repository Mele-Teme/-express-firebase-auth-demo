import admin from "firebase-admin";
import serviceAccount from "./service-account.json" assert { type: "json" };
import { getApps } from "firebase-admin/app";
if (getApps().length === 0)
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
export default admin;
//# sourceMappingURL=firebase-config.js.map