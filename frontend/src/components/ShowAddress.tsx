// ShowAddressComponent.tsx
import React from 'react';
import { useContractContext } from './ContractContext';

const ShowAddressComponent: React.FC = () => {
  const { contracts } = useContractContext();

  return (
    <div style={{
      width: '800px',
      height: '400px',
      margin: 'auto',
      padding: '20px',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      <h2>Contract Information</h2>
      {contracts.length > 0 ? (
        <table style={{ width: '100%', tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th style={{ width: '30%', padding: '8px', borderRight: '2px solid #ccc', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Address</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract, index) => (
              <tr key={index}>
                <td style={{width: '30%', padding: '8px', borderRight: '2px solid #ccc', textAlign: 'left' }}>{contract.name}</td>
                <td style={{ padding: '8px', textAlign: 'left' }}>{contract.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No contracts deployed yet</p>
      )}
    </div>
  );
};

export default ShowAddressComponent;
