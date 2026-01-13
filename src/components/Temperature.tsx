'use client';

import { useNatureRemoData } from '@/hooks/useNatureRemoData';

const Temperature = () => {
  const { roomData, isLoading, error } = useNatureRemoData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-4xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-4xl text-red-500">Failed to load temperature data</p>
      </div>
    );
  }

  const firstRoom = roomData.length > 0 ? roomData[0] : undefined;
  const temperature = typeof firstRoom?.temperature === 'number' ? firstRoom.temperature : undefined;
  const roomName = firstRoom && typeof (firstRoom as any).name === 'string'
    ? (firstRoom as any).name
    : roomData.length > 0
    ? 'Room 1'
    : undefined;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {typeof temperature === 'number' ? (
        <>
          {roomName && (
            <p className="text-2xl mb-2 text-gray-600">{roomName}</p>
          )}
          <h2 className="text-8xl font-bold">{temperature.toFixed(1)}°C</h2>
        </>
      ) : (
        <p className="text-4xl">No data</p>
      )}
    </div>
  );
};

export default Temperature;
