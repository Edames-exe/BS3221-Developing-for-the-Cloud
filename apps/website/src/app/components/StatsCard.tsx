// apps/website/src/app/components/StatsCard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Stats {
  activeWardens: number;
  areasCovered: number;
  coveragePercent: number;
}

interface Props {
  refreshFlag: number;
}

const StatsCard: React.FC<Props> = ({ refreshFlag }) => {
  const [stats, setStats] = useState<Stats>({
    activeWardens: 0,
    areasCovered: 0,
    coveragePercent: 0,
  });

  const fetchStats = async () => {
    try {
      const { data } = await axios.get<Stats>('/api/stats');
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats', err);
    }
  };

  // re-fetch on mount and whenever refreshFlag changes
  useEffect(() => {
    fetchStats();
  }, [refreshFlag]);

  return (
    <div className="card stats-card">
      <h2 className="title">Wardens on Site</h2>
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-value">{stats.activeWardens}</div>
          <div className="stat-label">Active Wardens</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{stats.areasCovered}</div>
          <div className="stat-label">Areas Covered</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{stats.coveragePercent}%</div>
          <div className="stat-label">Coverage</div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
