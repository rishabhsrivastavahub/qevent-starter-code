import EventCard from '@/components/EventCard';

async function getEvent(eventId) {
  const response = await fetch(`https://qevent-backend.labs.crio.do/events/${eventId}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch event details');
  }

  return response.json();
}

export default async function EventDetailsPage({ params }) {
  const event = await getEvent(params.eventId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="relative h-96">
          <img
            src={event.image}
            alt={event.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <p className="uppercase tracking-[0.25em] text-sm text-amber-300">{event.location}</p>
            <h1 className="text-4xl font-bold mt-2">{event.name}</h1>
            <p className="mt-2 text-sm text-slate-200">
              {new Date(event.date).toDateString()} | {event.time}
            </p>
          </div>
        </div>

        <div className="p-8 lg:p-12">
          <div className="flex flex-wrap gap-3 mb-6">
            {event.tags?.map((tag) => (
              <span key={tag} className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                #{tag}
              </span>
            ))}
          </div>

          <div className="grid gap-10 lg:grid-cols-[2fr_1fr] items-start">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">About this event</h2>
              <p className="text-slate-700 leading-7">{event.description || 'No event description available.'}</p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Artist</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{event.artist}</p>
              </div>

              <div className="mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Location</p>
                <p className="mt-2 text-slate-700">{event.location}</p>
              </div>

              <div className="mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Date & Time</p>
                <p className="mt-2 text-slate-700">{new Date(event.date).toDateString()}</p>
                <p className="text-slate-700">{event.time}</p>
              </div>

              <div className="mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Price</p>
                <p className="mt-2 text-xl font-bold text-slate-900">
                  {(event.price || 0) > 0 ? `$ ${event.price.toLocaleString()}` : 'FREE'}
                </p>
              </div>

              <button className="w-full rounded-full bg-gradient-to-r from-orange-500 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90">
                Buy Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
