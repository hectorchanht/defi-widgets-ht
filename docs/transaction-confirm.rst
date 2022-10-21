What is transaction-confirm
===========================

transaction-confirm helps dapp to handle the event of newly created
transactions. With transaction-confirm, dapp developers will be able to:

-  save and update transaction detail in browser’s local storage
-  display transaction confirm status on the transaction modal
-  display notification message if transaction’s status was changed

------------------------------------------------------------------------------

Get Started
===========

Installation
~~~~~~~~~~~~

-  ``npm i``

Run
~~~

-  ``npm run start``

Build
~~~~~

-  ``npm run build``

------------------------------------------------------------------------------

Display the transaction modal
=============================

Developer can display the transaction modal using the ``openTransModal``
method

Request Parameters
~~~~~~~~~~~~~~~~~~

========= ===================================== ======
Argument  Description                           Type
========= ===================================== ======
stepInfo  Display settings for the modal        object
customObj Additional configuration of the modal object
========= ===================================== ======

stepInfo object
~~~~~~~~~~~~~~~

+-----------------------+-----------------------+-----------------------+
| Argument              | Description           | Type                  |
+=======================+=======================+=======================+
| step                  | 1: Waiting for        | int                   |
|                       | customer response 2:  |                       |
|                       | Transaction accepted  |                       |
|                       | 3: Transaction        |                       |
|                       | rejected              |                       |
+-----------------------+-----------------------+-----------------------+
| txId                  | Transaction id of the | string                |
|                       | transaction(if any)   |                       |
+-----------------------+-----------------------+-----------------------+

customObj object
~~~~~~~~~~~~~~~~

+-----------------------+-----------------------+-----------------------+
| Argument              | Description           | Type                  |
+=======================+=======================+=======================+
| title                 | Modal title           | string                |
+-----------------------+-----------------------+-----------------------+
| lang                  | Language of modal     | string                |
|                       | content: en/zh        |                       |
+-----------------------+-----------------------+-----------------------+
| wait_confirm          | Custom message for    | string                |
|                       | the waiting for       |                       |
|                       | confirmation scenario |                       |
+-----------------------+-----------------------+-----------------------+
| confirm_wallet        | Custom message to ask | string                |
|                       | customer to confirm   |                       |
|                       | the transaction in    |                       |
|                       | the wallet            |                       |
+-----------------------+-----------------------+-----------------------+
| submitted             | Custom message for    | string                |
|                       | the transaction       |                       |
|                       | submitted scenario    |                       |
+-----------------------+-----------------------+-----------------------+
| view_on_tronscan      | Custom message for    | string                |
|                       | the tronscan link     |                       |
+-----------------------+-----------------------+-----------------------+
| cancelled             | Custom message for    | string                |
|                       | the transaction       |                       |
|                       | cancelled scenario    |                       |
+-----------------------+-----------------------+-----------------------+

Example
~~~~~~~

::

   openTransModal({step: 2, txId: 'xxxxxx'}, {title: 'Send TRX success'});

------------------------------------------------------------------------------

Add new transaction to the pending transaction list
===================================================

Developer can save a new transaction to the pending transaction list in
the browser’s local storage using ``addNewTransactionToList`` method

.. _request-parameters-1:

Request Parameters
~~~~~~~~~~~~~~~~~~

+-------------------------+-------------------------+------------------+
| Argument                | Description             | Type             |
+=========================+=========================+==================+
| tx                      | The transaction object  | string           |
|                         | returned from tronweb   |                  |
+-------------------------+-------------------------+------------------+
| customObj               | Custom data to be saved | any              |
|                         | with the transaction in |                  |
|                         | the pending transaciton |                  |
|                         | list                    |                  |
+-------------------------+-------------------------+------------------+
| saveAmount              | Maximum                 | number           |
+-------------------------+-------------------------+------------------+
| tronweb                 | Tronweb instance        | any              |
+-------------------------+-------------------------+------------------+

.. _example-1:

Example
~~~~~~~

::

   const tx = await sendTrx(
     'TBHHa5Z6WQ1cRcgUhdvqdW4f728f2fiJmF',
     1000000
   );

   addNewTransactionToList(tx.txid, {title: 'Send 1 TRX to somewhere'}, 10);

------------------------------------------------------------------------------

Update an existing transaction in the pending transaction list
==============================================================

Developer can update the content of an existing transaction stored in
the pending transaction list using ``updateTransactionInList`` method

.. _request-parameters-2:

Request Parameters
~~~~~~~~~~~~~~~~~~

======== ==================================== ======
Argument Description                          Type
======== ==================================== ======
record   The transaction object to be updated object
tronweb  Tronweb instance                     object
======== ==================================== ======

.. _example-2:

Example
~~~~~~~

::

   // Update transaction content
   transaction.showPending = false

   // And save to the pending transaction list
   updateTransactionInList(transaction)

------------------------------------------------------------------------------

Update transaction status and display notification message
==========================================================

Developer can update the status of an existing transaction and display
the notification message using ``logTransaction`` method

.. _request-parameters-3:

Request Parameters
~~~~~~~~~~~~~~~~~~

======== =========================================== ======
Argument Description                                 Type
======== =========================================== ======
record   Transaction object to be updated            object
status   New status: 1/2/3                           int
lang     Language of the notifaction message content string
======== =========================================== ======

.. _example-3:

Example
~~~~~~~

::

   logTransaction(transaction, 2)

------------------------------------------------------------------------------

Get transaction description content
===================================

Developer can get the transaction description dom object using the
``getDescription`` method

.. _request-parameters-4:

Request Parameters
~~~~~~~~~~~~~~~~~~

======== ========================================= ======
Argument Description                               Type
======== ========================================= ======
type     Transaction status value                  int
item     Transaction object                        object
text     The status text display on the dom object string
======== ========================================= ======

Response
~~~~~~~~

The dom object

::

   <div class="transaction_notify__nhkKG">
     <span>
       <a href="https://tronscan.io/#/transaction/xxxx" target="_blank">
         View on TRONSCAN
       </a>
       <a>
         Pending
       </a>
     </span>
     <span class="trans-btn-tip">
       Pending
     </span>
   </div>

.. _example-4:

Example
~~~~~~~

::

   getDescription(status, item, description)

------------------------------------------------------------------------------

Get transaction info
====================

Developer can get the latest status of a transaction using
``getTransactionInfo`` method This method uses
tronWeb.trx.getConfirmedTransaction

.. _request-parameters-5:

Request Parameters
~~~~~~~~~~~~~~~~~~

======== ================ ======
Argument Description      Type
======== ================ ======
txid     Transaction id   string
tronweb  Tronweb instance object
======== ================ ======

.. _response-1:

Response
~~~~~~~~

The promise of tronWeb.trx.getConfirmedTransaction response

.. _example-5:

Example
~~~~~~~

::

   getTransactionInfo(xxxxxx)
     .then(response => {
       console.log(response)
     })

------------------------------------------------------------------------------

Check the status of each pending transaction in the transaction list
====================================================================

``checkPendingTransaction`` will retrieve the pending transaction list
from the browser’s local storage, and use ``getTransactionInfo`` to
check the latest status of each pending transaction. If the status was
updated, call ``logTransaction`` to update and save the transaction.

.. _request-parameters-6:

Request Parameters
~~~~~~~~~~~~~~~~~~

======== ================ ======
Argument Description      Type
======== ================ ======
tronweb  Tronweb instance object
======== ================ ======

.. _example-6:

Example
~~~~~~~

::

   checkPendingTransactions()

------------------------------------------------------------------------------

Constantly check the status of each pending transactions
========================================================

Developer can start the job to constantly check the status of each
transaction in the pending transaction list using
``startPendingTransactionCheck`` call

.. _request-parameters-7:

Request Parameters
~~~~~~~~~~~~~~~~~~

+--------------+-------------------------------------------------------+--------+
| Argument     | Description                                           | Type   |
+==============+=======================================================+========+
| milliseconds | The interval of each ``checkPendingTransaction`` call | number |
+--------------+-------------------------------------------------------+--------+
| tronweb      | Tronweb instance                                      | object |
+--------------+-------------------------------------------------------+--------+

.. _example-7:

Example
~~~~~~~

::

   startPendingTransactionCheck(3000)
