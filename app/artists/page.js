'use client';

import { useEffect, useState } from 'react';
import ArtistCard from '@/components/ArtistCard';

export default function ArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/artists');
        if (!response.ok) {
          throw new Error('Failed to fetch artists');
        }
        const data = await response.json();
        const artistsArray = Array.isArray(data.value) ? data.value : Array.isArray(data) ? data : [];
        setArtists(artistsArray);
      } catch (err) {
        console.error('Error fetching artists:', err);
        setError(err?.message || 'Unable to load artists');
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-slate-900">Artists</h1>
        <p className="text-lg text-slate-600">Discover talented artists and performers</p>

        {loading && <p className="text-center text-slate-600 mt-8">Loading artists...</p>}
        {error && <p className="text-center text-red-600 mt-8">Error: {error}</p>}

        {!loading && !error && (
          <div className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {artists.map((artist, index) => (
                <ArtistCard key={`${artist.name}-${index}`} artistData={artist} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
