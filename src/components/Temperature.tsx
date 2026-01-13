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
        <p className="text-4xl text-red-500">Error</p>
      </div>
    );
  }

  const temperature = roomData.length > 0 ? roomData[0].temperature : undefined;

  return (
    <div className="flex items-center justify-center h-full">
      {typeof temperature === 'number' ? (
        <h2 className="text-8xl font-bold">{temperature.toFixed(1)}°C</h2>
      ) : (
        <p className="text-4xl">No data</p>
      )}
    </div>
  );
};

export default Temperature;
