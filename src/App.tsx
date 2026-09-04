import { Routes, Route, Navigate } from 'react-router-dom'
import WebsitePage from './pages/WebsitePage'
import DashboardPage from './pages/DashboardPage'
import AccountPage from './pages/AccountPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<WebsitePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
