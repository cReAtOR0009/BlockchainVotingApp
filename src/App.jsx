

import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromChildren,
} from "react-router-dom";
import "./App.css"
import CreateElection from "./components/CreateElection.jsx";
import ElectionList from './components/Elections'
import ElectionDetails from "./components/ElectionDetails.jsx";
import Layouts from "./Layout/Layout.jsx";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromChildren(<Route path="/" element={<Layouts />}>
      <Route index element={<ElectionList />} />
      <Route path="elections" element={<ElectionList />}/>
      <Route path="elections/:electionId" element={<ElectionDetails />} />
      <Route path="create_election" element={<CreateElection />}/>
    </Route>)
  );
  return <RouterProvider router={router} />;
};

export default App; 
