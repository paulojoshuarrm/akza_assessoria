import { createContext, useContext, useState } from 'react'

const ContactContext = createContext()

export function ContactProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  return (
    <ContactContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ContactContext.Provider>
  )
}

export const useContact = () => useContext(ContactContext)
