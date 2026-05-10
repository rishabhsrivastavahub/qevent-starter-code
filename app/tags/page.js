'use client';

import { useEffect, useState } from 'react';
import Tag from '@/components/Tag';

export default function TagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/tags');
        if (!response.ok) {
          throw new Error('Failed to fetch tags');
        }
        const data = await response.json();
        const tagsArray = Array.isArray(data.value)
          ? data.value
          : Array.isArray(data)
          ? data
          : [];
        setTags(tagsArray);
      } catch (err) {
        console.error('Error fetching tags:', err);
        setError(err?.message || 'Unable to load tags');
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-slate-900">Tags</h1>
        <p className="text-lg text-slate-600">Explore event categories and topics</p>

        {loading && <p className="text-center text-slate-600 mt-8">Loading tags...</p>}
        {error && <p className="text-center text-red-600 mt-8">Error: {error}</p>}

        {!loading && !error && (
          <div className="mt-8">
            <p className="text-slate-600 mb-4">Total Tags: {tags.length}</p>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <Tag key={tag.id || tag.name} text={tag.name} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
