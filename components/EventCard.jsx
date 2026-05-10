"use client";

import Tag from "./Tag";
import Link from "next/link";

const EventCard = ({ eventData }) => {
  return (
    <div className="w-full h-fit bg-white rounded-lg overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link
        href={`/events/${eventData.id}`}
        className="block"
      >
        <div>
          <img
            className="w-full h-64 object-cover"
            src={eventData.image}
            alt={eventData.name}
          />
          <div className="p-4">
            <div className="flex gap-2 items-center mb-3 flex-wrap">
              {eventData.tags && eventData.tags.map((tag) => (
                <Tag text={tag} key={tag} />
              ))}
            </div>
            <p className="text-sm text-gray-600 mb-3">
              {new Date(eventData.date).toDateString()} | {eventData.time}
            </p>
            <p className="text-sm text-gray-700 mb-2">{eventData.location}</p>
            <h2 className="text-lg font-bold mb-4 text-gray-900">{eventData.name}</h2>
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-gray-800">{eventData.artist || 'N/A'}</h3>
              <h3 className="text-sm font-bold text-gray-900">
                {(eventData.price || 0) > 0
                  ? `$ ${(eventData.price || 0).toLocaleString()}`
                  : "FREE"}
              </h3>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
