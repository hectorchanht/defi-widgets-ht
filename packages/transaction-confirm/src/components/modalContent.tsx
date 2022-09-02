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
  confirm_wallet?: string;
  submitted?: string;
  view_on_tronscan?: string;
  cancelled?: string;

  title2?: string;
  title3?: string;
  title4?: string;
}

const modalContent = (
  stepInfo = { step: 0, txId: '' },
  customObj: CustomObjType = {
    title: 'Transaction',
    wait_confirm: 'Waiting for your confirmation',
    confirm_wallet: 'Please confirm in your wallet',
    submitted: 'Transaction Submitted',
    view_on_tronscan: 'View on TRONSCAN',
    cancelled: 'Transaction Cancelled',
    title2: 'Transaction',
    title3: 'Transaction',
    title4: 'Transaction'
  },
  {
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
          {step == 1 ? (
            <React.Fragment>
              <div className={styles.transTitle}>
                {customObj.title4 || customObj.title}
              </div>
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
                {customObj.wait_confirm}
              </div>
              <div className="trans-modal-tips trans-modal-wait-confirm-tips">
                {customObj.confirm_wallet}
              </div>
            </React.Fragment>
          ) : step == 2 ? (
            <React.Fragment>
              <div className={styles.transTitle}>
                {customObj.title2}
              </div>
              <div className={styles.modalIcon}>
                <CheckCircleOutlined
                  style={{ fontSize: '80px', color: '#1bc378' }}
                ></CheckCircleOutlined>
              </div>
              <div className="trans-modal-status trans-modal-submit">
                {customObj.submitted}
              </div>
              {txId && (
                <div className="trans-modal-tips trans-modal-submit-tips">
                  <a
                    className="typo-text-link"
                    href={`${tronscanLink}/transaction/${txId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {customObj.view_on_tronscan}
                  </a>
                </div>
              )}
            </React.Fragment>
          ) : step == 3 ? (
            <React.Fragment>
              <div className={styles.transTitle}>
                {customObj.title3}
              </div>
              <div className={styles.modalIcon}>
                <CloseCircleOutlined
                  style={{ fontSize: '80px', color: '#d84b79' }}
                ></CloseCircleOutlined>
              </div>
              <div className="trans-modal-status trans-modal-cancel">
                {customObj.cancelled}
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