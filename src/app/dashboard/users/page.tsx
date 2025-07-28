import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UsersTable } from './_components/users-table';
import clientPromise from '@/lib/db';
import type { User } from '@/lib/types';

async function getUsers(): Promise<User[]> {
  const client = await clientPromise;
  const db = client.db();
  const users = await db.collection<User>('users').find({}).toArray();
  // Convert ObjectId to string for serialization
  return users.map(user => ({ ...user, id: user._id?.toString() ?? user.id, _id: undefined }));
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">User Management</CardTitle>
        <CardDescription className="font-body">
          View and manage all registered users in the system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UsersTable data={users} />
      </CardContent>
    </Card>
  );
}
