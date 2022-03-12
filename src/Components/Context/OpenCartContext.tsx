import { createContext } from "react";

export const OpenCartContext = createContext({
  isOpen: false,
  onOpen: () => {}
});
