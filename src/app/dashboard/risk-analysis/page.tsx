import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RiskAnalysisForm } from './_components/risk-analysis-form';

export default function RiskAnalysisPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Flood Risk Analysis</CardTitle>
          <CardDescription className="font-body">
            Use the AI agent to analyze flood risk based on weather data for a specific area in Durban.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RiskAnalysisForm />
        </CardContent>
      </Card>
    </div>
  );
}
