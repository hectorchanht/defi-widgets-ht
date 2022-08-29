import React, { useState, useEffect } from 'react';
import BigNumber from 'bignumber.js';
import { TronWebConnector } from '@widgets/tronweb-connector';
import Menu from '../components/menu';
import { Spin } from 'antd';

function App() {
  const [defaultAccount, setDefaultAccount] = useState('');
  const [defaultAccountBalance, setDefaultAccountBalance] = useState('--');
  const [accountsChangedMsg, setAccountsChangedMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const trxPrecision = 1e6;

  const initUserInfo = async (userAddress) => {
    setDefaultAccount(userAddress);
    updateAccountBalance(userAddress);
  };

  useEffect(() => {
    if (window.tronWeb?.defaultAddress) {
      initUserInfo(window.tronWeb.defaultAddress.base58);
    }
    setAccountsChangedMsg('');
    setLoading(false);
    TronWebConnector.activate(false); // init tronweb without login
    addListener();
  }, []);

  const resetDefaultAccount = () => {
    setDefaultAccount('');
    setDefaultAccountBalance('--');
  };

  const updateAccountBalance = async (userAddress) => {
    const accountInfo = await window.tronWeb.trx.getAccount(userAddress? userAddress: defaultAccount);
    if (accountInfo?.balance) {
      const accountBalance = new BigNumber(accountInfo.balance).div(trxPrecision);
      setDefaultAccountBalance(accountBalance);
    } else {
      setDefaultAccountBalance('--');
    }
  };

  const activate = async () => {
    setAccountsChangedMsg('');
    setLoading(true);
    const res = await TronWebConnector.activate();
    setLoading(false);
    if (res?.defaultAddress?.base58) {
      initUserInfo(res.defaultAddress.base58);
    } else if (!res?.success && res?.errorCode && res?.msg) {
      setAccountsChangedMsg(`${res.msg}(${res.errorCode})`);
    } else {
      setAccountsChangedMsg(`Please install and log in to TronLink first`);
    }
  };

  const addListener = () => {
    TronWebConnector.on('accountsChanged', res => {
      console.log(res);
      setDefaultAccount(res.data.address);
      if (res.data.address) {
        setAccountsChangedMsg(`Current account address is: ${res.data.address}`);
        updateAccountBalance();
      } else {
        setAccountsChangedMsg(`Please log in to TronLink first`);
      }
    })

    TronWebConnector.on('chainChanged', res => {
      console.log(res);
      setAccountsChangedMsg(`Current account fullNode is: ${res.data.node.fullNode}`);
      updateAccountBalance();
    })

    TronWebConnector.on('disconnectWeb', res => {
      console.log(res);
      setAccountsChangedMsg(`disconnect website name: ${res.data.websiteName}`);
      resetDefaultAccount();
    })

    TronWebConnector.on('connectWeb', res => {
      console.log(res);
      setAccountsChangedMsg(`connect website name: ${res.data.websiteName}`);
      updateAccountBalance();
    })

    TronWebConnector.on('setAccount', res => {
      console.log(res);
      if (!res.data.address) {
        setAccountsChangedMsg(`Please log in to TronLink first`);
        updateAccountBalance();
      }
    })
  };

  return (
    <div className="App">
      <Menu />
      <section className="content">
        {defaultAccount ?
          <>
            <div className='info'>
              <div><span>Current account: </span>{defaultAccount}</div>
              <div><span>Current account balance: </span>{defaultAccountBalance.toString()} TRX</div>
            </div>

            <div className='desc'>Such as accountsChanged, setAccount, setNode, disconnectWeb, connectWeb, setAccount</div>
          </>
          :
          <div className='items'>
            <div className='item' onClick={() => activate()}>Connect Wallet</div>
          </div>
        }
        {accountsChangedMsg && <div className='msg' title={accountsChangedMsg}>Result message: {accountsChangedMsg}</div>}
        <Spin spinning={loading} />
      </section>
    </div>
  );
}

export default App;
