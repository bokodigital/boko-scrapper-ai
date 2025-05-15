import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './context/PrivateRoute';
import AuthenticatedUserRoute from './context/AuthenticatedUser';
import Hompage from './pages/Hompage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ErrorPagee from './pages/ErrorPagee';
import ForgotPassword1 from './pages/ForgotPassword1';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import ProductResearch from './pages/product-research';
import CustomUrlResearch from './pages/customUrlResearch';
import ResultsPageForProduct from './pages/ResultsPage1';
import AiPromptPage from './pages/AiPromptPage';
import FaqsPage from './pages/FaqsPage';
import PricingPage from './pages/PricingPage';
import FeaturesPage from './pages/FeaturesPage';
import SolutionsPage from './pages/SolutionsPage';
import TermsPage from './pages/PrivacyTermsPage';
import ProfilePage from './pages/ProfilePage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Hompage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<AuthenticatedUserRoute><SignupPage /></AuthenticatedUserRoute>} />
      {/* forgot password */}
      <Route path="/forgot-password" element={<AuthenticatedUserRoute><ForgotPassword1 /></AuthenticatedUserRoute>} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      {/* authenticate route access */}
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/product-research/:directoryId" element={<PrivateRoute><ProductResearch /></PrivateRoute>} />
      <Route path="/custom-url-scrape" element={<PrivateRoute><CustomUrlResearch /></PrivateRoute>} />
      <Route path="/product-research/results/:searchId" element={<PrivateRoute><ResultsPageForProduct /></PrivateRoute>} />
      <Route path="/custom-url/ai-prompt/:id" element={<PrivateRoute><AiPromptPage /></PrivateRoute>} />
      <Route path="/faqs" element={<FaqsPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/solutions" element={<FeaturesPage />} />
      <Route path="/features" element={<SolutionsPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      <Route path='*' element={<ErrorPagee />} />
    </Routes>
  );
};

export default AppRoutes; 