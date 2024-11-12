import React, { useState } from "react";
import { RenderManagerContext } from "../context/RenderManagerContext";

type RenderManagerProviderProps = {
    children: React.ReactNode;
};

const RenderManagerProvider = ({ children }: RenderManagerProviderProps) => {
    const [darkMode, setDarkMode] = useState(false);
    const [isListRendered, setIsListRendered] = useState(false);
    return (
        <RenderManagerContext.Provider value={{ darkMode, setDarkMode, isListRendered, setIsListRendered }}>
            {children}
        </RenderManagerContext.Provider>
    );
};

export default RenderManagerProvider;
