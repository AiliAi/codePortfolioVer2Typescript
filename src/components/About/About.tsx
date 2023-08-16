import './about.scss';
import dataFetch from '../../hooks/DataFetch/DataFetch';
import AboutCard from '../AboutCard/AboutCard';

const About = (): JSX.Element => {
  const url= '/data/about.json';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const aboutData: any = dataFetch(url);
  return (
    <div className="about cards-container">
      {aboutData && aboutData?.data.length > 0
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ? aboutData?.data.map((about: any, index: number) => (
            <AboutCard key={about.title} about={about} index={index} />
          ))
        : 'No cards'}
    </div>
  );
};

export default About;