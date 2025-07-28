import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertsTable } from './_components/alerts-table';
import { mockAlerts } from '@/lib/data';

export default function AlertsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Alert Log</CardTitle>
        <CardDescription className="font-body">
          A log of all alerts sent through the system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AlertsTable data={mockAlerts} />
      </CardContent>
    </Card>
  );
}
