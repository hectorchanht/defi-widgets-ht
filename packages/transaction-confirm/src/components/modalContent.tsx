import React from 'react';
import {
  Loading3QuartersOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined
} from '@ant-design/icons';
import classNames from 'classnames';
import styles from '../assets/css/transaction.scss';

interface CustomObjType {
  title?: string;
  wait_confirm?: string;
  lang?: string;
  confirm_wallet?: string;
  submitted?: string;
  view_on_tronscan?: string;
  cancelled?: string;
}

const modalContent = (
  stepInfo = { step: 0, txId: '' },
  customObj: CustomObjType = {},
  {
    intl = {
      transaction: 'Transaction',
      waiting: 'Waiting for your confirmation',
      confirm: 'Please confirm in your wallet',
      submited: 'Transaction Submitted',
      tronscan: 'View on TRONSCAN',
      cancelled: 'Transaction Cancelled',
    },
    tronscanLink = 'https://nile.tronscan.io/#'
  } = {}
) => {
  // const { stepInfo, customObj } = this.props;
  const { step, txId } = stepInfo;

  if (!step) return;

  return (
    <div className={styles.transModalContainer}>
      <div className={styles.transModalMask}></div>
      <div className={styles.transContent}>
        <div className={styles.transBody}>
          <div className={styles.transTitle}>
            {customObj?.title ? customObj?.title : intl.transaction}
          </div>
          {step == 1 ? (
            <React.Fragment>
              <div className={styles.loading}>
                <Loading3QuartersOutlined
                  style={{
                    fontSize: '60px',
                    display: 'flex',
                    margin: '20px 0',
                  }}
                />
              </div>
              <div className="trans-modal-status trans-modal-wait-confirm">
                {customObj.wait_confirm ? customObj.wait_confirm : intl.waiting}
              </div>
              <div className="trans-modal-tips trans-modal-wait-confirm-tips">
                {customObj.confirm_wallet
                  ? customObj.confirm_wallet
                  : intl.confirm}
              </div>
            </React.Fragment>
          ) : step == 2 ? (
            <React.Fragment>
              <div className={styles.modalIcon}>
                <CheckCircleOutlined
                  style={{ fontSize: '80px', color: '#1bc378' }}
                ></CheckCircleOutlined>
              </div>
              <div className="trans-modal-status trans-modal-submit">
                {customObj.submitted ? customObj.submitted : intl.submited}
              </div>
              {txId && (
                <div className="trans-modal-tips trans-modal-submit-tips">
                  <a
                    className="typo-text-link"
                    href={`${tronscanLink}/transaction/${txId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {customObj.view_on_tronscan
                      ? customObj.view_on_tronscan
                      : intl.tronscan}
                  </a>
                </div>
              )}
            </React.Fragment>
          ) : step == 3 ? (
            <React.Fragment>
              <div className={styles.modalIcon}>
                <CloseCircleOutlined
                  style={{ fontSize: '80px', color: '#d84b79' }}
                ></CloseCircleOutlined>
              </div>
              <div className="trans-modal-status trans-modal-cancel">
                {customObj.cancelled ? customObj.cancelled : intl.cancelled}
              </div>
            </React.Fragment>
          ) : (
            <></>
          )}
          <div className={classNames(styles.modalClose, 'modal-close')}>
            <CloseOutlined />
          </div>
        </div>
      </div>
    </div>
  )
}

export default modalContent;