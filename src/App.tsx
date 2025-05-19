import React, { useState, RefObject } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import CharacterTable from './components/CharacterTable';
import Stories from './components/Stories';
import PuzzleBoard from './components/Puzzleboard';
import { usePopper } from 'react-popper';
import Diploma from './components/Diploma';
import Test from './components/test';

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  
  const popper = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  const { styles, attributes } = popper;

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const [activeRoute, setActiveRoute] = useState<string>('/');

  const handleRouteChange = (route: string) => {
    setActiveRoute(route);
  };

  const linkStyle: React.CSSProperties = {  
    display: 'block',
    padding: '2px',
    textDecoration: 'none',
    color: 'black',
    backgroundColor: '#7cc5d9', 
    borderRadius: '2px',
    marginBottom: '2px',
  };

  return (
    <Router>
      <div style={{ display: 'flex', backgroundColor: '#7cc5d9' }}>
        <div style={{ width: '24%' }}>
          <button ref={setReferenceElement} onClick={toggleOpen}>
            Меню
          </button>
          {isOpen && (
            <div
              ref={setPopperElement}
              style={{ ...styles.popper, backgroundColor: '#7cc5d9' }} 
              {...attributes.popper}
            >
              <nav style={{ display: 'flex', flexDirection: 'column' }}>
                <Link to="/" onClick={() => handleRouteChange('/')} style={linkStyle}>Персонажи</Link>
                <Link to="/stories" onClick={() => handleRouteChange('/stories')} style={linkStyle}>Истории</Link>
                <Link to="/test" onClick={() => handleRouteChange('/test')} style={linkStyle}>Тест</Link>
                <Link to="/puzzle" onClick={() => handleRouteChange('/puzzle')} style={linkStyle}>Пазлы</Link>
              </nav>
            </div>
          )}
        </div>
        <div style={{ flex: 1, padding: '10px', backgroundColor: '#88dded' }}>
          <Routes>
            <Route path="/" element={<CharacterTable />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/test" element={<Test />} />
            <Route path="/puzzle" element={<PuzzleBoard />} />
            <Route path="/diploma" element={<Diploma />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
