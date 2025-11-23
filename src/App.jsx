import DashBoard from './pages/dashboard/DashBoard.jsx';
import ViewStats from './pages/view-stats/ViewStats.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashBoard/>} />
        <Route path="/stats/:code" element={<ViewStats />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App