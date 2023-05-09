import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import About from './components/pages/About';
import PageNOtFound from './components/pages/PageNOtFound';

function App() {
  return (
    <Router>
      <div className='flex flex-col justify-between h-screen'>
        <NavBar />
        <main className='conteiner mx-auto px-3 pb-12'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/notfound' element={<PageNOtFound />} />
            <Route path='/*' element={<PageNOtFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
