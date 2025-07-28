'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { analyzeFloodRisk, type AnalyzeFloodRiskOutput } from '@/ai/flows/analyze-flood-risk';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, ShieldAlert, Siren, Info } from 'lucide-react';

const formSchema = z.object({
  area: z.string().min(2, { message: 'Area is required.' }),
  weatherData: z.string().min(10, { message: 'Weather data is required.' }),
});

export function RiskAnalysisForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeFloodRiskOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      area: '',
      weatherData: 'Rainfall: 85mm, Temp: 24°C, Humidity: 90%, Wind: 15km/h E',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await analyzeFloodRisk(values);
      setResult(response);
    } catch (e) {
      setError('An error occurred during analysis. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

    const getRiskBadgeVariant = (riskLevel?: AnalyzeFloodRiskOutput['floodRiskLevel']) => {
    switch (riskLevel) {
      case 'HIGH':
        return 'destructive';
      case 'MEDIUM':
        return 'secondary';
      case 'LOW':
        return 'default';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area in Durban</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Chatsworth" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weatherData"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weather Data</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter weather data including rainfall, temperature, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Analyze Risk
          </Button>
        </form>
      </Form>
      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="h-6 w-6 text-primary" />
              Analysis Result
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Flood Risk Level</h3>
              <Badge variant={getRiskBadgeVariant(result.floodRiskLevel)} className="text-base px-4 py-1">
                {result.floodRiskLevel}
              </Badge>
            </div>
             <div className="space-y-2">
                <h3 className="font-semibold text-lg flex items-center gap-2"><Info className="h-5 w-5"/>Explanation</h3>
                <p className="text-muted-foreground p-4 bg-secondary/50 rounded-md">{result.explanation}</p>
            </div>
             <div className="space-y-2">
                <h3 className="font-semibold text-lg flex items-center gap-2"><Siren className="h-5 w-5"/>Recommended Actions</h3>
                <p className="text-muted-foreground p-4 bg-secondary/50 rounded-md">{result.recommendedActions}</p>
            </div>
          </CardContent>
        </Card>
      )}
       {error && <p className="text-destructive">{error}</p>}
    </div>
  );
}
