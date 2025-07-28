import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TwilioForm } from './_components/twilio-form';

export default function ConfigureTwilioPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Configure Twilio</CardTitle>
        <CardDescription className="font-body">
          Enter your Twilio credentials to connect your WhatsApp service.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TwilioForm />
      </CardContent>
    </Card>
  );
}
