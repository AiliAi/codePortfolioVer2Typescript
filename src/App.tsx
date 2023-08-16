
import './App.css';
import './App.scss';
import {useState, useEffect} from 'react';
import {scroller} from 'react-scroll';
import Navigation from './components/Navigation/Navigation';
import CanvasP5 from './components/Canvas/Canvas';
import About from './components/About/About';
import WorksTable from './components/WorksTable/WorksTable';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import ButtonUp from './components/ButtonUp/ButtonUp';

function App() {
  document.title = 'Portfolio';

  const [loading, setLoading] = useState(true);

  const scrollToSection = () => {
    scroller.scrollTo('about', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  /**
   * To give time for canvas to load
   *
   * @return {number} time
   */
  function fakeRequest(): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(() => resolve(), 100));
  }

  useEffect(() => {
    /**
     * When canvas is loading, shows just purple color
     */
    fakeRequest().then(() => {
      const el = document.querySelector('.no-canvas');
      if (el) {
        setLoading(!loading);
      }
    });
  }, [loading]);

  /**
   * Scrolles page to the top when page is refreshed
   */
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    } else {
      window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      };
    }
  }, []);

  return (
    <div className="App">
      <Navigation />
      <header>
        {!loading ? <CanvasP5 /> : <div className="no-canvas"></div>}
        <div className="over">
          <h1 style={{fontFamily: 'MuseoModerno'}}>
            WELCOME TO
            <br />
            AILI PRIIMANN&apos;S
            <br />
            PORTFOLIO
            <br />
          </h1>
          <button onClick={scrollToSection} className="round-button">
            <div className="button-text">ENTER</div>
          </button>
        </div>
      </header>
      <main>
        <About />
        <WorksTable />
        <Contact />
      </main>
      <footer>
        <Footer />
      </footer>
      <ButtonUp />
    </div>
  );
}

export default App;
