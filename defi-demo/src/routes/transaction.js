import { ContractInteract } from '@widgets/contract-interact';
import { addNewTransactionToList, openTransModal, startPendingTransactionCheck } from '@widgets/transaction-confirm';
import { TronWebConnector } from '@widgets/tronweb-connector';
import BigNumber from 'bignumber.js';
import React, { useEffect, useState } from 'react';
import '../App.scss';
import Menu from '../components/menu';
import { Spin } from 'antd';
const { sendTrx } = ContractInteract;

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

  const checkLoginStatus = async () => {
    const tronwebRes = await TronWebConnector.activate(false); // init tronweb without login
    console.log(tronwebRes);
    if (tronwebRes?.defaultAddress?.base58) {
      initUserInfo(tronwebRes.defaultAddress.base58);
    } else {
      resetDefaultAccount();
    }
  }

  useEffect(() => {
    if (window.tronWeb?.defaultAddress) {
      initUserInfo(window.tronWeb.defaultAddress.base58);
    }
    setAccountsChangedMsg('');
    setLoading(false);
    checkLoginStatus();
    addListener();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    TronWebConnector.on('accountsChanged', async res => {
      console.log(res);
      checkLoginStatus();
    })

    TronWebConnector.on('chainChanged', res => {
      console.log(res);
      setAccountsChangedMsg(`Current account fullNode is: ${res.data.node.fullNode}`);
    })

    TronWebConnector.on('disconnectWeb', res => {
      console.log(res);
      setAccountsChangedMsg(`disconnect website name: ${res.data.websiteName}`);
      resetDefaultAccount();
    })

    TronWebConnector.on('connectWeb', res => {
      console.log(res);
      setAccountsChangedMsg(`connect website name: ${res.data.websiteName}`);
    })
  };

  const sendTrxFunc = async () => {
    openTransModal({ step: 1 });

    const res = await sendTrx(
      'TBHHa5Z6WQ1cRcgUhdvqdW4f728f2fiJmF',
      1000000
    );

    if (res?.result) {
      const tx = res
      openTransModal({ step: 2, txId: tx.txid, customObj: {title: 'Send TRX success'}});
      addNewTransactionToList(tx, { title: 'Send 1 TRX to somewhere' });
      startPendingTransactionCheck(3000);
    } else {
      openTransModal({ step: 3, txId: '', customObj: {title: 'Send TRX failed'}});
    }
  }

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
            <div className='items'>
              <div className='item' onClick={() => sendTrxFunc()} >Send TRX</div>
            </div>
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
