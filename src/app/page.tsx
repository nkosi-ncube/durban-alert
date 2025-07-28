import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ShieldAlert, Languages, MessageSquareText } from 'lucide-react';
import { Logo } from '@/components/logo';

//hdhdh
export default function Home() {
  const features = [
    {
      icon: <ShieldAlert className="h-10 w-10 text-primary" />,
      title: 'Timely Flood Alerts',
      description: 'Receive instant WhatsApp notifications when there is a high risk of flooding in your area.',
    },
    {
      icon: <MessageSquareText className="h-10 w-10 text-primary" />,
      title: 'Weekly Weather Updates',
      description: 'Get a summary of the upcoming week’s weather to plan ahead, tailored to your location.',
    },
    {
      icon: <Languages className="h-10 w-10 text-primary" />,
      title: 'Multi-language Support',
      description: 'Our alerts are available in English, Zulu, and Afrikaans to serve our diverse communities.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Logo />
        <Button asChild>
          <Link href="/dashboard">Admin Dashboard</Link>
        </Button>
      </header>

      <main className="flex-grow">
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">
              Stay Ahead of the Floods
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground font-body">
              Durban Alert sends free, real-time flood warnings and weather updates directly to your WhatsApp.
            </p>
            <div className="mt-8 flex justify-center">
              <Card className="max-w-md bg-card shadow-lg">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Subscribe for Free</CardTitle>
                </CardHeader>
                <CardContent className="text-left space-y-4">
                  <p className="font-body">To join the sandbox, send <span className="font-bold text-primary">"join fire-meant"</span> to our WhatsApp number. After that, send <span className="font-bold text-primary">"Hi"</span> to begin registration.</p>
                  <div className="text-center p-4 bg-accent/20 border border-dashed rounded-lg">
                    <p className="text-2xl font-bold tracking-wider font-mono text-primary">+1 415 523 8886</p>
                  </div>
                  <p className="text-sm text-muted-foreground font-body">Save this number to your contacts to ensure you receive our alerts.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">
                Protecting Our Community, Together
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground font-body">
                We provide the information you need to keep your family and property safe.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                      {feature.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-xl font-headline font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-muted-foreground font-body">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">How It Works</h2>
            <div className="mt-12 max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-left">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold text-xl">1</div>
                <div>
                  <h3 className="text-lg font-semibold font-headline">Join Sandbox</h3>
                  <p className="mt-1 text-muted-foreground font-body">Send "join fire-meant" on WhatsApp to enter the sandbox.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold text-xl">2</div>
                <div>
                  <h3 className="text-lg font-semibold font-headline">Register</h3>
                  <p className="mt-1 text-muted-foreground font-body">Then send "Hi" to start the simple, guided registration and share your preferences.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold text-xl">3</div>
                <div>
                  <h3 className="text-lg font-semibold font-headline">Stay Safe</h3>
                  <p className="mt-1 text-muted-foreground font-body">Get alerts and updates directly in your WhatsApp chat.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
          <p className="font-body">&copy; {new Date().getFullYear()} Durban Alert. A community safety initiative.</p>
        </div>
      </footer>
    </div>
  );
}
