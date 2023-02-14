import './App.css';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import BasicView from './Views/BasicView';
import HomeView from './Views/HomeView';
import RegisterView from './Views/RegisterView';
import DisplayOneShow from './Components/DisplayOneShow';
import DisplayEpisodes from './Components/DisplayEpisodes';
import MyShows from './Components/Global/MyShows';

function App() {

  const token = localStorage.getItem("token");

  return (
    <div className="App bg-[#404040]">
      <BrowserRouter>
          <Routes>
                <Route path="/" element={<RegisterView />}/>
                <Route path="/" element={<BasicView />}>
                    <Route path="/" element={ !token ? <RegisterView /> : <Navigate to="/Home" />}/>
                    <Route path="/Home" element={ token  ? <HomeView /> : <Navigate to="/" />}/>
                    <Route path="/Mes-series" element={ token  ? <MyShows /> : <Navigate to="/" />}/>
                    <Route path="ShowDetails">
                      <Route path=":id" element={<DisplayOneShow />}/>
                  </Route>
                        <Route path="EpisodesDetails">
                          <Route path=":id" element={<DisplayEpisodes />}/> 
                  </Route>
              </Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
