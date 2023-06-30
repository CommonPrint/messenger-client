import {Routes, Route} from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { NotFound } from './pages/NotFound';
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';


import { Main } from './components/Main';


function App() {
  return (
    <>
      <Main>
        <Routes>
          <Route path="/" element={
            <MainPage/>
          }/>
          <Route path="/register" element={<SignUp/>} />
          <Route path="/login" element={<SignIn/>} />
          <Route path="*" element={<NotFound/>} />  
        </Routes>
      </Main>
    </>
  );
}

export default App;
