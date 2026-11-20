import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home/Home'
import CaseDetail from './pages/CaseDetail/CaseDetail'
import Nav from './components/Nav/Nav'
import LanguageProvider from './i18n/LanguageProvider'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    // 'instant' overrides the global smooth scrolling, so a new page opens
    // at the top instead of visibly scrolling up from the previous position
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case/:id" element={<CaseDetail />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
