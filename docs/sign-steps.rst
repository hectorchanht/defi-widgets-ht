.. _sign-steps:

==================
sign-steps
==================

sign-steps helps dapp to execute multiple contract signing steps via the
TronLink Chrome extension. With sign-steps, dapp developers will be able
to:

-  execute multiple contract signing steps
-  listen to contract signing and reject events

------------------------------------------------------------------------------

Get Started
===========

Installation
-----------------------------------

-  ``npm i``

Run
----------

-  ``npm run start``

Build
----------

-  ``npm run build``

------------------------------------------------------------------------------

executeContinuousSigns
=======================================

Execute multiple contract signing steps

Parameters
-----------------------------------

+-----------------------+-----------------------+-----------------------+
| Argument              | Description           | Type                  |
+=======================+=======================+=======================+
| params                | Array of parameters   | Array of param object |
|                       | for each contract     |                       |
|                       | signing step          |                       |
+-----------------------+-----------------------+-----------------------+

Example
---------------

::

   const params1 = {
     address: 'TLBaRhANQoJFTqre9Nf1mjuwNWjCJeYqUL',
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

------------------------------------------------------------------------------

continueCurrentSignSteps
==========================================

Continue the execution at the current step

.. _example-1:

Example
---------------

::

   continueCurrentSignSteps();

------------------------------------------------------------------------------

on
=================================

Listen to contract signing events

Parameters
-------------------------

======== =========================================== ========
Argument Description                                 Type
======== =========================================== ========
event    Name of the event to listen                 String
callback Call back function in response to the event Function
======== =========================================== ========

Event action name
---------------------------------------------

+-----------------------------------+-----------------------------------+
| Event                             | Description                       |
+===================================+===================================+
| startAtStep                       | Start to execute at this step     |
+-----------------------------------+-----------------------------------+
| signedAtStep                      | User signed the contract at this  |
|                                   | step                              |
+-----------------------------------+-----------------------------------+
| errorAtStep                       | Contract signing encounter error  |
|                                   | at this step                      |
+-----------------------------------+-----------------------------------+
| completedAllSteps                 | Completed all contract signing of |
|                                   | the current continuous signing    |
|                                   | execution                         |
+-----------------------------------+-----------------------------------+

.. _example-2:

Example
---------------

::

   SignSteps.on('startAtStep', (stepNumber) => {
     updateStatusAtStep(stepNumber, StepStatus.Active)
   })
   SignSteps.on('signedAtStep', (stepNumber) => {
     updateStatusAtStep(stepNumber, StepStatus.Completed)
   })
   SignSteps.on('errorAtStep', (stepNumber, errorMsg) => {
     updateStatusAtStep(stepNumber, StepStatus.Error)
   })
   SignSteps.on('completedAllSteps', () => {
     setDidFinishAllSteps(true)
     removeSignStepsListeners()
   })

------------------------------------------------------------------------------

off
===========================================

Remove the contract signing events listener

.. _parameters-1:

Parameters
-------------------------

======== =========================================== ========
Argument Description                                 Type
======== =========================================== ========
event    Name of the event to listen                 String
callback Call back function in response to the event Function
======== =========================================== ========

.. _example-3:

Example
---------------

::

   SignSteps.off('startAtStep', startEventCallback)
   SignSteps.off('signedAtStep', signedEventCallback)
   SignSteps.off('errorAtStep', errorEventCallback)
   SignSteps.off('completedAllSteps', completedAllStepsCallback)

------------------------------------------------------------------------------

getCurrentStepNumber
===========================

Get the current step number

Response
---------------

The step number of the existing continuous signature

.. _example-4:

Example
---------------

::

   getCurrentStepNumber()
