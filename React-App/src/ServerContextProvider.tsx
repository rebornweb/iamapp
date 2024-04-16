import React, { createContext, useContext, ReactNode } from 'react';
import { SERVER_URL_MIIS, SERVER_URL_VIS } from './config';

type ServerContextType = {
  serverUrl: string;
};

const ServerContext = createContext<ServerContextType>({
  serverUrl: SERVER_URL_MIIS,
});

export const useServerContext = () => useContext(ServerContext);

type ServerContextProviderProps = {
  children: ReactNode; // Specify children prop type as ReactNode
};

const ServerContextProvider: React.FC<ServerContextProviderProps> = ({ children }) => {
  const serverUrl = SERVER_URL_MIIS;

  return (
    <ServerContext.Provider value={{ serverUrl }}>
      {children}
    </ServerContext.Provider>
  );
};

export default ServerContextProvider;
