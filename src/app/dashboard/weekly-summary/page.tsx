import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WeeklySummaryForm } from './_components/weekly-summary-form';

export default function WeeklySummaryPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Generate Weekly Summary</CardTitle>
          <CardDescription className="font-body">
            Create a personalized weekly weather summary for a specific area, language, and user profession.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WeeklySummaryForm />
        </CardContent>
      </Card>
    </div>
  );
}
