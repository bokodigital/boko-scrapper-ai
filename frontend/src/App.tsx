import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes.tsx';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppRoutes />
      </Router>
    </LanguageProvider>
  );
}

export default App;
