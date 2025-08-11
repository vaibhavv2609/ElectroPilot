import { type User, type InsertUser, type Recommendation, type InsertRecommendation } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByPhone(phone: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getRecommendation(userId: string): Promise<Recommendation | undefined>;
  createRecommendation(recommendation: InsertRecommendation): Promise<Recommendation>;
  updateRecommendation(id: string, updates: Partial<Recommendation>): Promise<Recommendation | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private recommendations: Map<string, Recommendation>;

  constructor() {
    this.users = new Map();
    this.recommendations = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByPhone(phone: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.phone === phone,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getRecommendation(userId: string): Promise<Recommendation | undefined> {
    return Array.from(this.recommendations.values()).find(
      (rec) => rec.userId === userId
    );
  }

  async createRecommendation(insertRec: InsertRecommendation): Promise<Recommendation> {
    const id = randomUUID();
    const recommendation: Recommendation = {
      ...insertRec,
      id,
      createdAt: new Date()
    };
    this.recommendations.set(id, recommendation);
    return recommendation;
  }

  async updateRecommendation(id: string, updates: Partial<Recommendation>): Promise<Recommendation | undefined> {
    const existing = this.recommendations.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates };
    this.recommendations.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
