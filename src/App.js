import logo from './logo.svg';
import './App.css';
import MainPage from './components/MainPage';
import { Routes, Route, Link , Navigate} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
         <Route path='/Tic-Tac-Toe-ultimate/' element={<MainPage />}/>
         <Route path='*' element={<Navigate to="/Tic-Tac-Toe-ultimate/" replace={true} />}/>
      </Routes>
    </div>
  );
}

export default App;
