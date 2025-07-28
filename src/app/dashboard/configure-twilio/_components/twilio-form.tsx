'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { saveTwilioCredentials } from '../_actions/save-credentials';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  accountSid: z.string().min(1, { message: 'Twilio Account SID is required.' }),
  authToken: z.string().min(1, { message: 'Twilio Auth Token is required.' }),
  phoneNumber: z.string().min(1, { message: 'Twilio Phone Number is required.' }),
});

export function TwilioForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountSid: '',
      authToken: '',
      phoneNumber: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    
    const result = await saveTwilioCredentials(values);

    setLoading(false);
    
    if (result.success) {
      toast({
        title: "Credentials Saved",
        description: "Your Twilio credentials have been saved successfully.",
      });
      form.reset();
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
        <FormField
          control={form.control}
          name="accountSid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twilio Account SID</FormLabel>
              <FormControl>
                <Input placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="authToken"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twilio Auth Token</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Your Twilio auth token" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twilio Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+14155238886" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Credentials
        </Button>
      </form>
    </Form>
  );
}
