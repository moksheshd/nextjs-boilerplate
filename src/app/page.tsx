import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { createComponentLogger } from '@/lib/log-utils';

// Create a component-specific logger
const logger = createComponentLogger('HomePage');

export default function Home() {
  // Log that the component is rendering
  logger.info('Home page component rendering');
  // Example of a function that would use logging
  const handleSubmit = () => {
    logger.info('Form submitted');
    // Additional logic would go here
  };

  // Log a debug message
  logger.debug('Rendering Home component with default props');

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Welcome to shadcn UI</CardTitle>
            <CardDescription>
              High-quality components built with Radix UI and Tailwind CSS
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <Input placeholder="Enter your name" />
              <div className="flex gap-2">
                <Button>Default Button</Button>
                <Button variant="outline">Outline</Button>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => logger.debug('Cancel button clicked')}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </CardFooter>
        </Card>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Button asChild>
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="dark:invert"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              shadcn UI Docs
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Next.js Docs
            </a>
          </Button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
