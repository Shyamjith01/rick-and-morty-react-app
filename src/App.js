import logo from './logo.svg';
import './App.css';
import { useQuery, gql } from '@apollo/client';
import Header from './component/header/header';
import Characters from './component/Characters/Characters';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharacterDetail from './component/CharacterDetail/CharacterDetail';
import EpisodeList from './component/Episodelist/EpisodeList';
import EpisodeDetail from './component/EpisodeDetail/EpisodeDetail';


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path='/' element={<Characters />} />
        <Route path='/characters' element={<Characters />} />
        <Route path='/episode' element={<EpisodeList />} />
        <Route path='/character/:id' element={<CharacterDetail />} />
        <Route path='/episode/:id' element={<EpisodeDetail />} />
      </Routes>
    </div>
  );
}

export default App;
