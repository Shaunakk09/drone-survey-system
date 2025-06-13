'use client';

import { useEffect, useRef, useState } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { useMission } from '../../../context/MissionContext';
import { getStatusColor } from '../../../lib/utils';

interface MissionPoint {
  lat: number;
  lng: number;
  color: string;
  name: string;
  status: string;
  size: number;
  altitude: number;
  drone: string;
  description: string;
  id: string;
}

export default function MissionGlobe() {
  const globeRef = useRef<GlobeMethods>();
  const containerRef = useRef<HTMLDivElement>(null);
  const { missions } = useMission();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Convert missions to points for the globe
  const missionPoints: MissionPoint[] = missions.map(mission => ({
    lat: mission.latitude,
    lng: mission.longitude,
    color: getStatusColor(mission.status),
    name: mission.name,
    status: mission.status,
    size: 0.5,
    altitude: 0.1,
    drone: mission.drone,
    description: mission.description,
    id: mission.id
  }));

  useEffect(() => {
    if (globeRef.current) {
      // Auto-rotate
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    // Set initial dimensions and add resize listener
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[500px] bg-gray-900 rounded-lg overflow-hidden flex justify-center items-center">
      {dimensions.width > 0 && dimensions.height > 0 && (
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          pointsData={missionPoints}
          pointColor="color"
          pointAltitude="altitude"
          pointRadius="size"
          pointsMerge={true}
          width={dimensions.width}
          height={dimensions.height}
          labelsData={missionPoints}
          labelLat="lat"
          labelLng="lng"
          labelAltitude={0.1}
          labelDotRadius={0.5}
          labelSize={1.5}
          labelResolution={2}
          labelText="name"
          labelColor={() => 'white'}
          labelLabel={(obj: object) => {
            const point = obj as MissionPoint;
            return `
              <div class="bg-gray-800 p-4 rounded-lg shadow-lg min-w-[200px]">
                <div class="font-bold text-white text-lg mb-2">${point.name}</div>
                <div class="text-sm mb-2">
                  <span class="text-gray-400">Drone:</span>
                  <span class="text-white ml-2">${point.drone}</span>
                </div>
                <div class="text-sm mb-3">
                  <span class="text-gray-400">Status:</span>
                  <span class="ml-2" style="color: ${point.color}">${point.status}</span>
                </div>
                <button 
                  onclick="window.location.href='/missions/${point.id}'"
                  class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm transition-colors"
                >
                  View Details
                </button>
              </div>
            `;
          }}
          onLabelClick={(label) => {
            const point = label as MissionPoint;
            window.location.href = `/missions/${point.id}`;
          }}
        />
      )}
    </div>
  );
} 