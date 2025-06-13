'use client';

import { useMissionContext } from '@/app/context/MissionContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';

export default function AnalyticsPage() {
  const { missions } = useMissionContext();

  // Calculate statistics
  const totalMissions = missions.length;
  const completedMissions = missions.filter(m => m.status === 'completed').length;
  const inProgressMissions = missions.filter(m => m.status === 'in-progress').length;
  const pendingMissions = missions.filter(m => m.status === 'pending').length;
  const successRate = totalMissions > 0 ? (completedMissions / totalMissions) * 100 : 0;

  // Calculate total flight hours (mock calculation based on mission duration)
  const totalFlightHours = missions.reduce((total, mission) => {
    if (mission.status === 'completed' && mission.updatedAt) {
      const start = new Date(mission.startTime).getTime();
      const end = new Date(mission.updatedAt).getTime();
      const hours = (end - start) / (1000 * 60 * 60);
      return total + hours;
    }
    return total;
  }, 0);

  // Prepare data for the bar chart
  const chartData = [
    { name: 'Completed', value: completedMissions, color: '#10B981' },
    { name: 'In Progress', value: inProgressMissions, color: '#3B82F6' },
    { name: 'Pending', value: pendingMissions, color: '#F59E0B' },
  ];

  // Function to determine continent based on coordinates
  const getContinent = (lat: number, lng: number) => {
    if (lat >= 0 && lat <= 90 && lng >= -180 && lng <= 180) {
      if (lat >= 60) return 'North America';
      if (lat >= 0 && lat < 60) {
        if (lng >= -180 && lng < -30) return 'North America';
        if (lng >= -30 && lng < 60) return 'Europe';
        if (lng >= 60 && lng < 180) return 'Asia';
      }
    }
    if (lat < 0 && lat >= -90 && lng >= -180 && lng <= 180) {
      if (lat <= -60) return 'Antarctica';
      if (lat < 0 && lat > -60) {
        if (lng >= -180 && lng < -30) return 'South America';
        if (lng >= -30 && lng < 60) return 'Africa';
        if (lng >= 60 && lng < 180) return 'Australia';
      }
    }
    return 'Unknown';
  };

  // Prepare data for the pie chart
  const continentData = missions.reduce((acc: { name: string; value: number }[], mission) => {
    const continent = getContinent(mission.latitude, mission.longitude);
    const existing = acc.find(item => item.name === continent);
    if (existing) {
      existing.value++;
    } else {
      acc.push({ name: continent, value: 1 });
    }
    return acc;
  }, []);

  // Get recent activity
  const recentActivity = missions
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 2)
    .map(mission => ({
      type: mission.status === 'completed' ? 'mission_completed' : 'mission_created',
      mission: mission.name,
      timestamp: mission.updatedAt,
    }));

  // Custom tooltip for bar chart
  interface TooltipProps {
    active?: boolean;
    payload?: Array<{
      value: number;
      name: string;
    }>;
    label?: string;
  }

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-2 border border-gray-700 rounded shadow-lg">
          <p className="text-gray-200">{`${label}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for pie chart
  const PieTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-2 border border-gray-700 rounded shadow-lg">
          <p className="text-gray-200">{`${payload[0].name}: ${payload[0].value} missions`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold mb-6 text-white">Analytics</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Flight Statistics */}
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
          <h2 className="font-semibold mb-4 text-gray-300">Flight Statistics</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-400">Total Flight Hours</span>
                <span className="text-sm font-medium text-gray-200">{totalFlightHours.toFixed(1)} hrs</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-400">Successful Missions</span>
                <span className="text-sm font-medium text-gray-200">{successRate.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${successRate}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
          <h2 className="font-semibold mb-4 text-gray-300">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${activity.type === 'mission_completed' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                <div>
                  <p className="text-sm font-medium text-gray-200">
                    {activity.type === 'mission_completed' ? 'Mission Completed' : 'New Mission Created'}
                  </p>
                  <p className="text-xs text-gray-400">{activity.mission}</p>
                </div>
                <span className="text-xs text-gray-400 ml-auto">
                  {new Date(activity.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Status Chart */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
          <h2 className="font-semibold mb-4 text-gray-300">Mission Status Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(55, 65, 81, 0.3)' }} />
                <Bar 
                  dataKey="value" 
                  radius={[4, 4, 0, 0]}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      fillOpacity={1}
                      stroke={entry.color}
                      strokeOpacity={0.5}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Drone Distribution by Continent */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
          <h2 className="font-semibold mb-4 text-gray-300">Drone Distribution by Continent</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={continentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}  ${(percent * 100).toFixed(0)}%`}
                  stroke="none"
                >
                  {continentData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`hsl(${index * 45}, 70%, 50%)`}
                    />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
                <Legend 
                  formatter={(value) => <span className="text-gray-300 mr-2">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
} 