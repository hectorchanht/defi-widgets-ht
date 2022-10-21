tronweb-connector
=========================

------------------------------------------------------------------------------

tronweb-connector helps dapp to interact with the TRON network via the
TronLink Chrome extension. With tronweb-connector, dapp developers will
be able to:

-  request account information authorization on the dapp
-  retrieve the TronLink instance
-  listen to TronLink events

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

Request user authorization to dapp
==================================

Developer can connect TronLink wallet and request user authorization to
dapp using the async ``activate`` method

Response
~~~~~~~~

+-----------------------------------+-----------------------------------+
| Scenario                          | Response                          |
+===================================+===================================+
| TronLink not installed            | Error response object             |
+-----------------------------------+-----------------------------------+
| TronLink installed and the user   | TronLink instance                 |
| did not provide authorization     |                                   |
| before. Authorization box will be |                                   |
| shown and the user ACCEPTS the    |                                   |
| authorization request             |                                   |
+-----------------------------------+-----------------------------------+
| TronLink installed and the user   | Error response object             |
| did not provide authorization     |                                   |
| before. Authorization box will be |                                   |
| shown and the user REJECTS the    |                                   |
| authorization request             |                                   |
+-----------------------------------+-----------------------------------+
| TronLink installed and user       | TronLink instance                 |
| provided authorization before     |                                   |
+-----------------------------------+-----------------------------------+

Status
~~~~~~

=========== ========================
Status code Description
=========== ========================
4001        User refuse to authorize
4002        TronLink not installed
4003        Unknown error
4004        User not log in
200         TronLink installed
=========== ========================

Example
~~~~~~~

::

   const res = await TronwebConnector.activate();

   if (res?.defaultAddress?.base58) {
     initUserInfo(res.defaultAddress.base58);
   } else if (!res?.success && res?.errorCode && res?.msg) {
     console.log(`${res.msg}(${res.errorCode})`);
   } else {
     console.log(`Please install and log in to TronLink first`);
   }

------------------------------------------------------------------------------

Listen to TronLink events
=========================

Developer can listen to the TronLink events using the ``on`` method

Parameters
~~~~~~~~~~

======== =========================================== ========
Argument Description                                 Type
======== =========================================== ========
\_action Action name of the event to listen          String
cb       Call back function in response to the event Function
======== =========================================== ========

.. _response-1:

Response
~~~~~~~~

=========================================================== =========
Scenario                                                    Response
=========================================================== =========
Successfully added event listener to specified event action ``true``
Failed to add event listener                                ``false``
=========================================================== =========

Event action name
~~~~~~~~~~~~~~~~~

+-----------------------------------+-----------------------------------+
| Event action                      | Description                       |
+===================================+===================================+
| accountsChanged                   | when switching accounts           |
+-----------------------------------+-----------------------------------+
| chainChanged                      | when switching chains             |
+-----------------------------------+-----------------------------------+
| connectWeb                        | when the ``active connection``    |
|                                   | dapp is made in the plugin popup  |
|                                   | page                              |
+-----------------------------------+-----------------------------------+
| disconnectWeb                     | when the ``active reject`` dapp   |
|                                   | is in the plugin popup page       |
+-----------------------------------+-----------------------------------+

.. _example-1:

Example
~~~~~~~

::

   TronWebConnector.on('accountsChanged', res => {
     setDefaultAccount(res.data.address);
     if (res.data.address) {
       console.log(`Current account address is: ${res.data.address}`);
     } else {
       console.log(`Please log in to TronLink first`);
     }
   })

   TronWebConnector.on('chainChanged', res => {
     console.log(`Current account fullNode is: ${res.data.node.fullNode}`);
     updateAccountBalance();
   })

   TronWebConnector.on('disconnectWeb', res => {
     console.log(`disconnect website name: ${res.data.websiteName}`);
     resetDefaultAccount();
   })

   TronWebConnector.on('connectWeb', res => {
     console.log(`connect website name: ${res.data.websiteName}`);
   })
