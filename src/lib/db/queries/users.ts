import { eq } from "drizzle-orm";
import { db } from "..";
import { users } from '../schema';

export async function createUser(name: string) {
    if (await getUserByName(name)) {
        throw new Error("User already exist");
    }
    const [result] = await db.insert(users).values({ name: name}).returning();
    return result;
}

export async function getUserByName(name: string) {
    const result = await db.query.users.findFirst({
        where: (fields) => eq(fields.name, name)
    });
    console.log("IN getUserByName", name, result);
    
    return result;
}

export async function resetDatabase() {
    const result = await db.delete(users);
    return result;
}
