import './works-card-text.scss';
import React from 'react';
import EnterLeftSection from '../EnterLeftSection/EnterLeftSection';
import EnterRightSection from '../EnterRightSection/EnterRightSection';

interface Works {
  title: string;
  content: string;
  linkName: string;
  link: string;
}

interface WorksRowProps {
  works: Works;
  index: number;
}

const WorksRow: React.FC<WorksRowProps> = ({ works, index }) => {
  /**
   * Goes trough works.json data
   */
  const worksTitle = works.title;
  const worksContent = works.content;
  const worksLinkName = works.linkName;
  const worksLink = works.link;

  /**
   * if json text contains "/", splits from "/" and adds empty row
   */
  const worksContentElement : JSX.Element[] = worksContent.split('/').map((step: string) => (
    <div key={index + Math.random()}>
      {' '}
      <br />
      {step}
    </div>
  ));

  /**
   * @return {boolean}
   * adds different layout pattern to the work-cards: layout1 or layout2
   */
  return (
    <div className="works-card">
      <div className="works-inside">
        {index % 2 === 0 ? (
          <EnterRightSection key={'EnterRightSection' + index}>
            <h3>{worksTitle}</h3>
          </EnterRightSection>
        ) : (
          <EnterLeftSection key={'EnterLeftSection' + index}>
            <h3>{worksTitle}</h3>
          </EnterLeftSection>
        )}
        <div className="paragraph">{worksContentElement}</div>
        {worksLink && (
          <a
            href={worksLink}
            rel="noreferrer"
            target="_blank"
            className="paragraph"
          >
            {worksLinkName}
          </a>
        )}
      </div>
    </div>
  );
};

export default WorksRow;