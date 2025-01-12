import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Layout } from './components/shared/Layout';
import { Dashboard } from './pages/Dashboard';
import { Products } from './pages/Products';
import { OrderLists } from './pages/OrderLists';
import { NotFound } from './pages/NotFound';
import { Pages } from './pages/Pages';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/order-lists" element={<OrderLists />} />
            <Route path="/pages" element={<Pages />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

