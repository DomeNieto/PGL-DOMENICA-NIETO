import { createContext } from "react";

type RenderManagerContext = {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
    isListRendered: boolean;
    setIsListRendered: (value: boolean) => void;
};

export const RenderManagerContext = createContext<RenderManagerContext>({
    darkMode: false,
    setDarkMode: () => { },
    isListRendered: false,
    setIsListRendered: () => { }
});