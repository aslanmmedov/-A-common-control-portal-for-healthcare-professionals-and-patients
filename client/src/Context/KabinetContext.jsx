import React, { createContext, useState } from 'react'

export const KabinetContext = createContext(null);

const KabinetProvider = ({children}) => {
        const handleOpen = () => setOpen(true);
        const [open, setOpen] = useState(false);
        const handleClose = () => setOpen(false);
  return (
    <>
        <KabinetContext.Provider value={{ handleOpen, handleClose, open, setOpen }}>
            {children}
        </KabinetContext.Provider> 
    </>
  )
}

export default KabinetProvider