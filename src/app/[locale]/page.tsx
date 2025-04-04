'use client';

import React, { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

// Client component with internationalization using useTranslations from next-intl
export default function Page({ params }: { params: { locale: string } }) {
  // Unwrap params using React.use() and extract locale
  const unwrappedParams = params instanceof Promise ? use(params) : params;
  const { locale } = unwrappedParams;
  
  // Use the useTranslations hook to get translations
  const t = useTranslations('boilerplate');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="absolute top-4 right-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">{t('language')}:</span>
          <div className="flex space-x-1">
            <Link 
              href="/en" 
              className={`px-2 py-1 text-sm rounded ${locale === 'en' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
            >
              EN
            </Link>
          </div>
        </div>
      </div>
      
      <main className="flex flex-col items-center max-w-md w-full">
        {/* Next.js Logo */}
        <Image
          className="dark:invert mb-8"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        {/* Simple Card */}
        <Card className="w-full">
          <CardContent className="pt-6 text-center">
            <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>
            <p className="text-muted-foreground mb-6">{t('description')}</p>
          </CardContent>
          <CardFooter className="flex justify-center pb-6">
            <Button size="lg">{t('getStarted')}</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
