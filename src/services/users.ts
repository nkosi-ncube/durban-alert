// src/services/users.ts
'use server';

import clientPromise from '@/lib/db';
import type { User } from '@/lib/types';
import { Collection } from 'mongodb';

async function getUsersCollection(): Promise<Collection<User>> {
    const client = await clientPromise;
    const db = client.db();
    return db.collection<User>('users');
}

export async function findUserByPhone(phone: string): Promise<User | null> {
    const usersCollection = await getUsersCollection();
    return usersCollection.findOne({ phone });
}

export async function findOrCreateUser(phone: string): Promise<User> {
    let user = await findUserByPhone(phone);
    if (!user) {
        user = {
            phone,
            name: '',
            location: '',
            language: 'English',
            subscription: 'Emergency only',
            joined: '',
            registrationStep: 'started'
        };
        const usersCollection = await getUsersCollection();
        await usersCollection.insertOne(user);
    }
    // This is a bit of a hack to handle the ObjectId
    const { _id, ...userWithoutId } = user;
    return { ...userWithoutId, id: _id?.toString() };
}

export async function updateUser(phone: string, updates: Partial<User>): Promise<void> {
    const usersCollection = await getUsersCollection();
    await usersCollection.updateOne({ phone }, { $set: updates });
}
