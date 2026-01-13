import type { NextPage } from 'next';
import Clock from '@/components/Clock';
import Temperature from '@/components/Temperature';

const KioskPage: NextPage = () => {
  return (
    <div className="flex h-screen">
      {/* 2/3 for Clock */}
      <div className="w-2/3 bg-gray-800 text-white">
        <Clock size="large" />
      </div>
      {/* 1/3 for Temperature */}
      <div className="w-1/3 bg-gray-700 text-white">
        <Temperature />
      </div>
    </div>
  );
};

export default KioskPage;
