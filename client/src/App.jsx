import { Routes, Route } from 'react-router-dom'
import { ContactProvider } from './context/ContactContext'
import Home from './pages/Home'
import ThankYou from './pages/ThankYou'
import ContactModal from './components/ContactModal'
import Cursor from './components/Cursor'

export default function App() {
  return (
    <ContactProvider>
      <Cursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/obrigado" element={<ThankYou />} />
      </Routes>
      <ContactModal />
    </ContactProvider>
  )
}
