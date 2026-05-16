// 'use client';

// import { useState, useEffect,Suspense } from 'react';
// import { useSearchParams } from 'next/navigation';
// import EventCard from '@/components/EventCard';

// export default function EventsPage() {
//   const searchParams = useSearchParams();
//   const artistFilter = searchParams?.get('artist') || '';
//   const tagFilter = searchParams?.get('tag') || '';
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('/api/events');
//         if (!response.ok) {
//           throw new Error('Failed to fetch events');
//         }
//         const data = await response.json();
//         const eventsArray = Array.isArray(data.value)
//           ? data.value
//           : Array.isArray(data)
//           ? data
//           : [];
//         if (!eventsArray.length && data.error) {
//           throw new Error(data.error);
//         }

//         const filteredEvents = eventsArray.filter((event) => {
//           const matchesArtist = artistFilter
//             ? event.artist &&
//               event.artist.toLowerCase() === artistFilter.toLowerCase()
//             : true;

//           const matchesTag = tagFilter
//             ? event.tags &&
//               event.tags.some(
//                 (tag) => tag.toLowerCase() === tagFilter.toLowerCase()
//               )
//             : true;

//           return matchesArtist && matchesTag;
//         });

//         setEvents(filteredEvents);
//       } catch (err) {
//         console.error('Error fetching events:', err);
//         setError(err?.message || 'Failed to load events');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, [artistFilter, tagFilter]);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-8">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-4xl font-bold mb-4 text-slate-900">Events</h1>
//         <p className="text-lg text-slate-600">
//           {artistFilter && tagFilter
//             ? `Showing events for ${artistFilter} tagged ${tagFilter}`
//             : artistFilter
//             ? `Showing events for ${artistFilter}`
//             : tagFilter
//             ? `Showing events tagged ${tagFilter}`
//             : 'Browse and discover upcoming events'}
//         </p>
        
//         {loading && <p className="text-center text-slate-600 mt-8">Loading events...</p>}
        
//         {error && <p className="text-center text-red-600 mt-8">Error: {error}</p>}
        
//         {!loading && !error && (
//           <div>
//             <p className="text-slate-600 mb-4">Total Events: {events.length}</p>
//             {events.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
//                 {events.map((event) => (
//                   <EventCard key={event.id} eventData={event} />
//                 ))}
//               </div>
//             ) : (
//               <p className="text-center text-slate-600 mt-8">No events available</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default function EventsPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-8">
//       <Suspense fallback={<p className="text-center mt-8">Loading page...</p>}>
//         <EventsContent />
//       </Suspense>
//     </div>
//   );
// }

'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import EventCard from '@/components/EventCard';

// 1. This component handles the logic and uses useSearchParams
function EventsList() {
  const searchParams = useSearchParams();
  const artistFilter = searchParams?.get('artist') || '';
  const tagFilter = searchParams?.get('tag') || '';
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        const eventsArray = Array.isArray(data.value)
          ? data.value
          : Array.isArray(data)
          ? data
          : [];
        
        if (!eventsArray.length && data.error) {
          throw new Error(data.error);
        }

        const filteredEvents = eventsArray.filter((event) => {
          const matchesArtist = artistFilter
            ? event.artist?.toLowerCase() === artistFilter.toLowerCase()
            : true;

          const matchesTag = tagFilter
            ? event.tags?.some(
                (tag) => tag.toLowerCase() === tagFilter.toLowerCase()
              )
            : true;

          return matchesArtist && matchesTag;
        });

        setEvents(filteredEvents);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err?.message || 'Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [artistFilter, tagFilter]);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-slate-900">Events</h1>
      <p className="text-lg text-slate-600">
        {artistFilter && tagFilter
          ? `Showing events for ${artistFilter} tagged ${tagFilter}`
          : artistFilter
          ? `Showing events for ${artistFilter}`
          : tagFilter
          ? `Showing events tagged ${tagFilter}`
          : 'Browse and discover upcoming events'}
      </p>
      
      {loading && <p className="text-center text-slate-600 mt-8">Loading events...</p>}
      
      {error && <p className="text-center text-red-600 mt-8">Error: {error}</p>}
      
      {!loading && !error && (
        <div>
          <p className="text-slate-600 mb-4">Total Events: {events.length}</p>
          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {events.map((event) => (
                <EventCard key={event.id} eventData={event} />
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-600 mt-8">No events available</p>
          )}
        </div>
      )}
    </div>
  );
}

// 2. This is the main page that Vercel looks for
export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-8">
      <Suspense fallback={<p className="text-center mt-8 text-slate-600">Loading page...</p>}>
        <EventsList />
      </Suspense>
    </div>
  );
}