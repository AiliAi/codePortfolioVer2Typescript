import './about-card.scss';
import React from 'react';
import { BsDot } from 'react-icons/bs';
import { AiOutlineSmile } from 'react-icons/ai';
import { BiCodeAlt } from 'react-icons/bi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { AiOutlineStar } from 'react-icons/ai';
import Gradient from '../Gradient/Gradient';
import FadeInSection from '../FadeInSection/FadeInSection';
import { v4 as uuidv4 } from 'uuid';

interface AboutCardProps {
  about: {
    title: string;
    content: string;
    shape: string;
    linkName: string;
    link: string;
  };
  index: number;
}

const AboutCard: React.FC<AboutCardProps> = ({ about, index}) => {

  // icons object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shape : {[key: string]: any} = {
    aboutIcon: <AiOutlineInfoCircle className="icon" key={'aboutIcon'} />,
    me: <AiOutlineSmile className="icon" key={'me'} />,
    keywords: <BiCodeAlt className="icon" key={'keywords'} />,
    plans: <AiOutlineStar className="icon" key={'plans'} />,
  };

  /**
   * Goes trough about.json data
   */
  const aboutTitle = about.title;
  const aboutContent = about.content;
  const aboutShape = about.shape;
  const aboutLinkName = about.linkName;
  const aboutLink = about.link;

  let aboutContentElement: JSX.Element[];

  /**
   * Prints out right icon that corresponds with json data
   */
  const myShape = Object.keys(shape).map((key)=> {
    if (key === aboutShape) {
      return shape[key];
    }
  });

  /**
   * if json text contains "/", splits from "/" and adds dot or else add empty row
   */
  if (index === 2) {
    aboutContentElement = aboutContent.split('/').map((step: string, index: number) =>
      index === 0 ? (
        <div className="card-dots" key={aboutTitle + uuidv4()}>
          {step}
        </div>
      ) : (
        <div className="card-dots" key={aboutTitle + uuidv4()}>
          {' '}
          <BsDot className="icon-dot" />
          {step}
        </div>
      )
    );
  } else {
    aboutContentElement = aboutContent.split('/').map((step: string, index: number) =>
      index === 0 ? (
        <div key={aboutTitle + uuidv4()}>{step}</div>
      ) : (
        <div className="next-line" key={aboutTitle + uuidv4()}>
          {' '}
          <br />
          {step}
        </div>
      )
    );
  }

  return (
    <FadeInSection>
      <div className="header-container">
        <div className="icon-wrapper">
          {myShape}
          <Gradient />
        </div>
        <div id="title-wrapper">
          <h2 className="card-title">{aboutTitle}</h2>
        </div>
      </div>
      <div className="card-content paragraph">
        {aboutContentElement}
        {aboutLink && (
          <a
            href={aboutLink}
            className="git-link"
            rel="noreferrer"
            target="_blank"
          >
            {aboutLinkName}
          </a>
        )}
      </div>
    </FadeInSection>
  );
};

export default AboutCard;