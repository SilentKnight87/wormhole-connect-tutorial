'use client'
import { useState } from 'react';
import WormholeConnect, {
  WormholeConnectConfig,
} from '@wormhole-foundation/wormhole-connect';
import styles from './Home.module.css';

// Set up the configuration for the Wormhole Connect component for only testnet.
const config: WormholeConnectConfig = {
  env: 'testnet',
}

export default function Home() {
  const [showConnect, setShowConnect] = useState(false);


  const handleClick = () => {
    setShowConnect(!showConnect);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-center text-2xl font-bold py-4">Wormhole Connect Tutorial</h1>
      <button 
        className="px-4 py-2 bg-purple-900 text-white rounded mb-4"
        onClick={handleClick}
      >
        Step into the Wormhole
      </button>
      <div className={`${styles.wormholeConnect} ${showConnect ? '' : styles.hidden}`}>
        <WormholeConnect config={config}/>
      </div>
    </div>
  );
}