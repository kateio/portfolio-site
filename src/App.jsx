import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home/Home'
import CaseDetail from './pages/CaseDetail/CaseDetail'
import Nav from './components/Nav/Nav'
import LanguageProvider from './i18n/LanguageProvider'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
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
