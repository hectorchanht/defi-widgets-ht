import { useState, useEffect, useCallback } from 'react';
import '../App.scss';
import BigNumber from 'bignumber.js';

import { TronWebConnector } from '@widgets/tronweb-connector';
import { SignSteps } from '@widgets/sign-steps';
import { Spin } from 'antd';

import Menu from '../components/menu';

import SignStepsPopup from '../components/SignStepsPopup';
import { StepStatus } from '../components/SignStepsPopup/constants';
import { StepInfo } from '../components/SignStepsPopup/StepInfo';

const { executeContinuousSigns, continueCurrentSignSteps } = SignSteps;

function App() {
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [defaultAccountBalance, setDefaultAccountBalance] = useState('--');
  const [stepInfoArray, setStepInfoArray] = useState([]);
  const [shouldShowPopup, setShouldShowPopup] = useState(false);
  const [didFinishAllSteps, setDidFinishAllSteps] = useState(true);

  const [accountsChangedMsg, setAccountsChangedMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const MAX_UINT256 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

  const trxPrecision = 1e6;

  useEffect(() => {
    // @ts-ignore
    if (window.tronWeb?.defaultAddress) {
      // @ts-ignore
      initUserInfo(window.tronWeb.defaultAddress.base58);
      setInterval(() => {
        updateAccountBalance(window.tronWeb.defaultAddress.base58);
      }, 60000);
    }

    setAccountsChangedMsg('');
    setLoading(false);
    checkLoginStatus();
    addListener();

    setStepInfoArray([StepInfo('Approve'), StepInfo('Mint')]);
    setDidFinishAllSteps(true);
  }, []);

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

  const updateStatusAtStep = (stepNumber, status) => {
    var array = [...stepInfoArray];
    array[stepNumber-1].status = status;
    setStepInfoArray(array);
  };
  
  const startEventCallback = useCallback((stepNumber) => {
    console.log('signSteps Demo || Started step ' + stepNumber);
    updateStatusAtStep(stepNumber, StepStatus.Active);
  });
  const signedEventCallback = useCallback((stepNumber) => {
    console.log('signSteps Demo || Signed at step ' + stepNumber);
    updateStatusAtStep(stepNumber, StepStatus.Completed);
  });
  const errorEventCallback = useCallback((stepNumber, errorMsg) => {
    console.log('signSteps Demo || Error occurs at step ' + stepNumber + ' (' + errorMsg + ')');
    updateStatusAtStep(stepNumber, StepStatus.Error);
  });
  const completedAllStepsCallback = useCallback(() => {
    console.log('signSteps Demo || Finished all steps');
    setDidFinishAllSteps(true);
    removeSignStepsListeners();
  });

  const removeSignStepsListeners = () => {
    SignSteps.off('startAtStep', startEventCallback);
    SignSteps.off('signedAtStep', signedEventCallback);
    SignSteps.off('errorAtStep', errorEventCallback);
    SignSteps.off('completedAllSteps', completedAllStepsCallback);
  }
  const addSignStepsListeners = () => {
    SignSteps.on('startAtStep', startEventCallback);
    SignSteps.on('signedAtStep', signedEventCallback);
    SignSteps.on('errorAtStep', errorEventCallback);
    SignSteps.on('completedAllSteps', completedAllStepsCallback);
  }

  const continuousSign = async () => {
    setShouldShowPopup(true);

    if (didFinishAllSteps) {
      setDidFinishAllSteps(false);
      addSignStepsListeners();
      updateStatusAtStep(1, StepStatus.Pending);
      updateStatusAtStep(2, StepStatus.Pending);
      
      const params1 = {
        address: 'TLBaRhANQoJFTqre9Nf1mjuwNWjCJeYqUL', // usdj
        functionSelector: 'approve(address,uint256)',
        parameters: [
          { type: 'address', value: 'TSgZncDVzLq5SbEsCKAeviuG7nPKtJwRzU' },
          { type: 'uint256', value: MAX_UINT256 }
        ],
        options: {},
      }
      const params2 = {
        address: 'TSgZncDVzLq5SbEsCKAeviuG7nPKtJwRzU',
        functionSelector: 'mint(uint256)',
        parameters: [{ type: 'uint256', value: '100' }],
        options: {},
      }
      executeContinuousSigns([params1, params2]);
    }
  }

  const onClickStepRetry = () => {
    continueCurrentSignSteps();
  }

  const closePopup = () => {
    setShouldShowPopup(false);
    // console.log(stepInfoArray);
    // updateStatusAtStep(1, StepStatus.Active);
    // updateStatusAtStep(2, StepStatus.Pending);
  }

  return (
    <div className="App">
      <Menu />
      <section className='content sign-steps'>
        {defaultAccount ?
          <>
            <div className='info'>
              <div><span>Current account: </span>{defaultAccount}</div>
              <div><span>Current account balance: </span>{defaultAccountBalance.toString()} TRX</div>
            </div>

            <br />

            <div><span>Click the button below to mint token by signing multiple smart contracts.</span></div>
            <div className='items'>
              <div className='item' onClick={() => continuousSign()}>
                {didFinishAllSteps? 'Continuous Signature': 'Continue'}
              </div>
            </div>
          </>
          :
          <div className='items'>
            <div className='item' onClick={() => activate()}>Connect Wallet</div>
          </div>
        }
        <SignStepsPopup 
          shouldShowPopup={shouldShowPopup}
          stepInfoArray={stepInfoArray}
          onClickRetry={onClickStepRetry}
          onClosePopup={closePopup}
        />
        {accountsChangedMsg && <div className='msg' title={accountsChangedMsg}>Result message: {accountsChangedMsg}</div>}
        <Spin spinning={loading} />
      </section>
    </div>
  );
}

export default App;
