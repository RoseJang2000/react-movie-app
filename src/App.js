import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Detail from './routes/Detail';
import Header from './components/Header';
import './styles.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/react-movie-app/" element={<Home />} />
          <Route path="/react-movie-app/movie/:id" element={<Detail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
