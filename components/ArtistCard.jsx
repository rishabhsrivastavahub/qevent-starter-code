"use client";

import { useRouter } from 'next/navigation';

const ArtistCard = ({ artistData }) => {
  const router = useRouter();

  const handleViewEvents = () => {
    router.push(`/events?artist=${encodeURIComponent(artistData.name)}`);
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm transition-shadow duration-300 hover:shadow-lg overflow-hidden">
      <div className="p-6 text-center">
        <img
          className="w-28 h-28 mx-auto rounded-full object-cover shadow-lg"
          src={artistData.image}
          alt={`${artistData.name} image`}
        />
        <p className="text-sm text-slate-500 mt-4">{artistData.location}</p>
        <h2 className="text-xl font-semibold text-slate-900 mt-2">{artistData.name}</h2>
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-600 font-bold mt-1">{artistData.artist}</p>
        <p className="text-sm text-slate-600 mt-4 leading-6">{artistData.description}</p>
        <button
          onClick={handleViewEvents}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90"
        >
          View Events
        </button>
      </div>
    </div>
  );
};

export default ArtistCard;
