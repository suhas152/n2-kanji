import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ChapterPage from './pages/ChapterPage';
import Dashboard from './pages/Dashboard';
import FlashcardsPage from './pages/FlashcardsPage';
import Progress from './pages/Progress';
import Review from './pages/Review';
import ReviewSession from './pages/ReviewSession';
import WeekDetail from './pages/WeekDetail';
import Weeks from './pages/Weeks';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/weeks" element={<Weeks />} />
          <Route path="/week/:weekId" element={<WeekDetail />} />
          <Route path="/chapter/:chapterId" element={<ChapterPage />} />
          <Route path="/chapter/:chapterId/flashcards" element={<FlashcardsPage />} />
          <Route path="/review" element={<Review />} />
          <Route path="/review/session" element={<ReviewSession />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </Layout>
    </Router>
  );
}
