import './works-row.scss';
import React from 'react';
import WorksCardImage from '../WorksCardImage/WorksCardImage';
import WorksCardText from '../WorksCardText/WorksCardText';

interface WorksRowProps {
  works: {
    title: string;
    content: string;
    image: string;
    linkToVideo: string;
    linkName: string;
    link: string;
  };
  index: number;
}

const WorksRow: React.FC<WorksRowProps> = ({ works, index }) => {
  /**
   * Goes trough works.json data
   */
  const worksTitle: string = works.title;

  /**
   * @return {boolean}
   * adds different layout pattern to the work-cards: layout1 or layout2
   */
  if (index % 2 === 0) {
    return (
      <div key={worksTitle} className="layout1">
        <WorksCardImage works={works} />
        <WorksCardText works={works} index={index} />
      </div>
    );
  } else {
    return (
      <div key={worksTitle} className="layout2">
        <WorksCardText works={works} index={index} />
        <WorksCardImage works={works} />
      </div>
    );
  }
};

export default WorksRow;