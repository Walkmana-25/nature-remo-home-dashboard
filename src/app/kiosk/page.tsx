'use client';

import type { NextPage } from 'next';
import Clock from '@/components/Clock';
import Temperature from '@/components/Temperature';

const KioskPage: NextPage = () => {
  return (
    <div className="flex h-screen portrait:flex-col landscape:flex-row">
      {/* Clock: 2/3 in landscape, 2/3 in portrait */}
      <div className="portrait:h-2/3 portrait:w-full landscape:w-2/3 landscape:h-full bg-gray-800 text-white">
        <Clock size="large" />
      </div>
      {/* Temperature: 1/3 in landscape, 1/3 in portrait */}
      <div className="portrait:h-1/3 portrait:w-full landscape:w-1/3 landscape:h-full bg-gray-700 text-white">
        <Temperature />
      </div>
    </div>
  );
};

export default KioskPage;
