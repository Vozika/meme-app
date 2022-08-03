import './App.css';
import Header from './components/Header';
import Meme from './components/Meme';
import Footer from './components/Footer';

function App() {
  
  return (
    <div className="p-3 bg-light w-100">
      <Header />
      <Meme />
      <Footer />
    </div>
  );

}

export default App;
