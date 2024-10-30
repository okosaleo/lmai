import { db } from "@/server/db";

await db.user.create({
    data: {
        emailAddress: "okosaleo@gmail.com",
        firstName: "Leonard",
        lastName: "Okosa"
    }
})