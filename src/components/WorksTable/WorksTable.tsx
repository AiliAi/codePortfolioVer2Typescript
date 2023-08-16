import './works-table.scss';
import dataFetch from '../../hooks/DataFetch/DataFetch';
import WorksRow from '../WorksRow/WorksRow';
import React from 'react';

const WorksTable= (): JSX.Element => {
  const url = '/data/works.json';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const worksData: any = dataFetch(url);
  /**
   * Goes trough works.json data
   */
  return (
    <div className="works">
      <h2>WORKS</h2>
      <div className="works-container">
        {worksData && worksData?.data.length > 0
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ? worksData?.data.map((works: any, index: number) => (
              <WorksRow key={works.title + index} works={works} index={index} />
            ))
          : 'No cards'}
      </div>
    </div>
  );
};

export default WorksTable;