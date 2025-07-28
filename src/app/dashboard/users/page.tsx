import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UsersTable } from './_components/users-table';
import { mockUsers } from '@/lib/data';

export default function UsersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">User Management</CardTitle>
        <CardDescription className="font-body">
          View and manage all registered users in the system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UsersTable data={mockUsers} />
      </CardContent>
    </Card>
  );
}
