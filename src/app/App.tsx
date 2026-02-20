import {
  useRoutes
} from 'react-router-dom';
import createAppRoutes from './config/routes';


function App() {
  const routes = useRoutes(createAppRoutes());
  return routes;
};

export default App;