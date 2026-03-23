"use server";

import { cookies } from "next/headers";
import { db } from "@/db";
import { users, sessions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  const testHash = scryptSync(password, salt, 64).toString("hex");
  return timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(testHash, "hex"));
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id")?.value;
  if (!sessionId) return null;

  const session = await db.select().from(sessions).where(eq(sessions.id, sessionId)).get();
  if (!session || new Date(session.expiresAt) < new Date()) {
    if (sessionId) {
      cookieStore.delete("session_id");
    }
    return null;
  }

  const user = await db.select().from(users).where(eq(users.id, session.userId)).get();
  return user || null;
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || !user.isAdmin) throw new Error("Admin access required");
  return user;
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user?.isAdmin;
}

export async function register(username: string, email: string, password: string) {
  const existing = await db.select().from(users).where(eq(users.email, email)).get();
  if (existing) return { error: "Email already registered" };

  const existingName = await db.select().from(users).where(eq(users.username, username)).get();
  if (existingName) return { error: "Username already taken" };

  const passwordHash = hashPassword(password);
  const avatar = username.slice(0, 2).toUpperCase();

  const result = await db.insert(users).values({ username, email, passwordHash, avatar }).returning();
  const user = result[0];

  const sessionId = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  await db.insert(sessions).values({ id: sessionId, userId: user.id, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set("session_id", sessionId, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 30 * 24 * 60 * 60 });

  return { success: true, user: { id: user.id, username: user.username, avatar: user.avatar } };
}

export async function login(email: string, password: string) {
  const user = await db.select().from(users).where(eq(users.email, email)).get();
  if (!user) return { error: "Invalid email or password" };

  if (!verifyPassword(password, user.passwordHash)) return { error: "Invalid email or password" };

  const sessionId = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  await db.insert(sessions).values({ id: sessionId, userId: user.id, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set("session_id", sessionId, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 30 * 24 * 60 * 60 });

  return { success: true, user: { id: user.id, username: user.username, avatar: user.avatar } };
}

export async function logout() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id")?.value;
  if (sessionId) {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
    cookieStore.delete("session_id");
  }
  return { success: true };
}
