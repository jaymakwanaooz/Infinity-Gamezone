"use server";

import { revalidatePath } from "next/cache";

// Mock database in-memory for the current session (resets on server restart)
let MOCK_USERS = [
  { id: "U-1001", name: "Alex Mercer", email: "alex.mercer@gmail.com", isOnline: true, lastActive: new Date(), isBlocked: false, role: "User" },
  { id: "U-1002", name: "Jane Doe", email: "j.doe88@hotmail.com", isOnline: false, lastActive: new Date(Date.now() - 7200000), isBlocked: false, role: "User" },
  { id: "U-1003", name: "ToxicSlayer", email: "tslayerx@yahoo.com", isOnline: true, lastActive: new Date(Date.now() - 300000), isBlocked: true, role: "User" },
  { id: "U-1004", name: "Admin", email: "admin@infinitygz.com", isOnline: true, lastActive: new Date(), isBlocked: false, role: "Admin" },
  { id: "U-1005", name: "GhostRider", email: "grider@neon.net", isOnline: false, lastActive: new Date(Date.now() - 86400000), isBlocked: false, role: "User" },
];

export async function getUsers() {
  try {
    // Simulate slight network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, data: [...MOCK_USERS] };
  } catch (error) {
    return { success: false, error: "Failed to fetch users" };
  }
}

export async function toggleUserBlock(userId: string) {
  try {
    MOCK_USERS = MOCK_USERS.map(u => 
      u.id === userId ? { ...u, isBlocked: !u.isBlocked } : u
    );
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to toggle user block" };
  }
}

export async function trackUserActivity(username: string) {
    try {
        MOCK_USERS = MOCK_USERS.map(u => 
            u.name === username ? { ...u, lastActive: new Date(), isOnline: true } : u
        );
        return { success: true };
    } catch (error) {
        return { success: false };
    }
}

export async function setUserOffline(username: string) {
    try {
        MOCK_USERS = MOCK_USERS.map(u => 
            u.name === username ? { ...u, isOnline: false } : u
        );
        return { success: true };
    } catch (error) {
        return { success: false };
    }
}
