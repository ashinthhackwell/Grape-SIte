import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DemoSection from './components/DemoSection';
import Mission from './components/Mission';
import Advantages from './components/Advantages';
import BuiltFor from './components/BuiltFor';
import Founders from './components/Founders';
import OrganizationSize from './components/OrganizationSize';
import FinalDownload from './components/FinalDownload';
import Footer from './components/Footer';
import Help from './components/Help';

const Home = () => (
  <>
    <Hero />
    <DemoSection />
    <Mission />
    <Advantages />
    <BuiltFor />
    <Founders />
    <OrganizationSize />
    <FinalDownload />
  </>
);

function App() {
  return (
    <Router>
      <div className="relative w-full min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/help" element={<Help />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
