// ContractContext.tsx
import React, { createContext, useState, useContext } from 'react';

interface ContractInfo {
  address: string;
  name: string;
}

interface ContextType {
  contracts: ContractInfo[];
  addContract: (contract: ContractInfo) => void;
}

const ContractContext = createContext<ContextType | undefined>(undefined);

export const useContractContext = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error('useContractContext must be used within a ContractProvider');
  }
  return context;
};

export const ContractProvider: React.FC = ({ children }) => {
  const [contracts, setContracts] = useState<ContractInfo[]>([]);

  const addContract = (contract: ContractInfo) => {
    setContracts([...contracts, contract]);
  };

  const contextValue: ContextType = {
    contracts,
    addContract,
  };

  return <ContractContext.Provider value={contextValue}>{children}</ContractContext.Provider>;
};
