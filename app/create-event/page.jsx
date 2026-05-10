'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CreateEventPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/events');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-lg text-slate-600">Checking authentication...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Create Event</h1>
        <p className="text-lg text-slate-600 mb-8">
          Use this page to create a new event. Only authenticated users can access it.
        </p>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-2xl font-semibold mb-4">Coming soon</h2>
          <p className="text-slate-700 leading-7">
            This page is protected and visible only after signing in. You can add your event creation form here.
          </p>
        </div>
      </div>
    </div>
  );
}
