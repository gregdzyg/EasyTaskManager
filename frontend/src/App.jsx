import { Route, Routes } from "react-router-dom";
import Layout from './components/Layout.jsx';
import New from './pages/New.jsx';
import Home from './pages/Home.jsx';
import Tasks from './pages/Tasks.jsx';
import Edit from './pages/Edit.jsx';


function App(){

  return(
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />  
        <Route path="tasks">
          <Route index element={<Tasks />} />
          <Route path="edit/:id" element={<Edit />} />
        </Route>
        <Route path="new" element={<New />} />
      </Route>
    </Routes>
  );

}

export default App;
