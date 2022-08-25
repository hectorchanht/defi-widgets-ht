import { ContractInteract } from '@widgets/contract-interact';
import { addNewTransactionToList, openTransModal, startPendingTransactionCheck } from '@widgets/transaction-confirm';
import { TronWebConnector } from '@widgets/tronweb-connector';
import { Modal, Steps } from 'antd';
import BigNumber from 'bignumber.js';
import React, { useEffect, useState } from 'react';
import '../App.scss';
import Menu from '../components/menu';
const { trigger, sign, broadcast, send, sendTrx } = ContractInteract;
const { Step } = Steps;

const ContractExecutionFlowModal = ({ children, toggle }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  React.useEffect(() => {
    if (toggle) {
      setIsModalVisible(d => !d)
    }
  }, [toggle]);

  const showModal = () => setIsModalVisible(true);

  const handleCancel = () => setIsModalVisible(false);

  return <>
    <div className='items'>
      <div className='item' onClick={showModal} >Show Contract Execution Flow Modal</div>
    </div>
    <Modal
      style={{ top: '30%' }} title="Contract Execution Flow"
      visible={isModalVisible} footer={null} onCancel={handleCancel}>
      {children}
    </Modal>
  </>
}

function App() {
  const [defaultAccount, setDefaultAccount] = useState('');
  const [sendTrxStep, setSendTrxStep] = useState(0);
  const [defaultAccountBalance, setDefaultAccountBalance] = useState('--');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const trxPrecision = 1e6;

  useEffect(() => {
    if (window.tronWeb?.defaultAddress) {
      initUserInfo(window.tronWeb.defaultAddress.base58);
    }
  }, [])

  const initUserInfo = async (userAddress) => {
    setDefaultAccount(userAddress);
    const accountInfo = await window.tronWeb.trx.getAccount(userAddress);
    const accountBalance = new BigNumber(accountInfo.balance).div(trxPrecision);
    setDefaultAccountBalance(accountBalance);
    nextStep();
  };

  const nextStep = () => setSendTrxStep(s => s + 1);
  const backStep = (step = 1) => setSendTrxStep(step); // todo: back step if fail

  const activate = async () => {
    const res = await TronWebConnector.activate();
    if (res?.defaultAddress?.base58) {
      initUserInfo(res.defaultAddress.base58);
    }
  }

  const sendTrxFunc = async () => {
    setIsModalVisible(true)
    openTransModal({ step: 1 });
    nextStep();

    const res = await sendTrx(
      'TBHHa5Z6WQ1cRcgUhdvqdW4f728f2fiJmF',
      1000000
    );

    if (res?.result) {
      const tx = res
      openTransModal({ step: 2, txId: tx.txid }, { title: 'Send TRX success' });
      addNewTransactionToList(tx, { title: 'Send 1 TRX to somewhere' });
      startPendingTransactionCheck(3000);
      nextStep();
    } else {
      openTransModal({ step: 3 }, { title: 'Send TRX failed' });
      backStep();
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
        <br />

        {/*<ContractExecutionFlowModal toggle={isModalVisible}>*/}
        {/*  <Steps direction="vertical" current={sendTrxStep}>*/}
        {/*    <Step title="Connection" description="Connect the dapp with your wallet" />*/}
        {/*    <Step title="Initiation" description="Initiate the contract function by pressing 'Send TRX'" />*/}
        {/*    <Step title="Signing" description="Sign the function that you would like to execute" />*/}
        {/*    <Step title="Broadcast" description="Wait for the signed transaction being broadcast to all nodes" />*/}
        {/*    /!* <Step title="Synchronization" description="The transaction is getting confirmed on chain, Congrats" /> *!/*/}
        {/*  </Steps>*/}
        {/*</ContractExecutionFlowModal>*/}
      </section>
    </div>
  );
}

export default App;
