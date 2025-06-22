'use client';

import React from 'react';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';

interface GanttChartViewProps {
  items: Task[];
}

const GanttChartView: React.FC<GanttChartViewProps> = ({ items }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">📊 Dummy Gantt Chart</h2>
      <div style={{ height: 600 }}>
        <Gantt
          tasks={items}
          viewMode={ViewMode.Month}
          listCellWidth="155px"
          barFill={60}
        />
      </div>
    </div>
  );
};

export default GanttChartView;
