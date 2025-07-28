import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertsTable } from './_components/alerts-table';
import clientPromise from '@/lib/db';
import type { Alert } from '@/lib/types';

async function getAlerts(): Promise<Alert[]> {
  const client = await clientPromise;
  const db = client.db();
  const alerts = await db.collection<Alert>('alerts').find({}).sort({ timestamp: -1 }).toArray();
  return alerts.map(alert => ({ ...alert, id: alert._id?.toString() ?? alert.id, _id: undefined }));
}


export default async function AlertsPage() {
  const alerts = await getAlerts();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Alert Log</CardTitle>
        <CardDescription className="font-body">
          A log of all alerts sent through the system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AlertsTable data={alerts} />
      </CardContent>
    </Card>
  );
}
