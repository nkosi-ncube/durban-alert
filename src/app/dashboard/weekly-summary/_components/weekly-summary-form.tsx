'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateWeeklySummary, type GenerateWeeklySummaryOutput } from '@/ai/flows/generate-weekly-summary';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CalendarRange, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const formSchema = z.object({
  area: z.string().min(2, { message: 'Area is required.' }),
  language: z.enum(['en', 'zu', 'af']),
  userProfession: z.string().min(2, { message: 'Profession is required.' }),
});

export function WeeklySummaryForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateWeeklySummaryOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      area: 'Umlazi',
      language: 'zu',
      userProfession: 'Taxi Driver',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await generateWeeklySummary(values);
      setResult(response);
    } catch (e) {
      setError('An error occurred while generating the summary. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area in Durban</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Umlazi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="zu">Zulu</SelectItem>
                      <SelectItem value="af">Afrikaans</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userProfession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Profession</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Taxi Driver" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Summary
            </Button>
          </form>
        </Form>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              WhatsApp Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-secondary/30 p-4 rounded-lg space-y-4">
               <div className="flex items-start gap-3">
                 <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                    <AvatarFallback>TZ</AvatarFallback>
                </Avatar>
                <div className="bg-background rounded-lg p-3 w-fit max-w-sm shadow-md">
                {loading ? (
                    <div className="flex items-center justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : result ? (
                    <p className="whitespace-pre-wrap font-body">{result.summary}</p>
                ) : (
                    <p className="text-muted-foreground font-body">
                        Generated summary will appear here.
                    </p>
                )}
                </div>
               </div>
            </div>
             {error && <p className="mt-4 text-destructive">{error}</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
