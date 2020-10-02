/*

Author: Gerard O'Rourke
Date 30/09/2020

Version 1.01

    MIT License
 
    Copyright (c) 2020 Gerard O'Rourke
 
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
 
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
 
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

/* 
	A Mobile Agent CTI ports must be set up to support Max Number of Calls 2 and Busy Trigger 1.
	This means that you cannot receive a call when you are on a call (caller would get busy).
	Because of this we do not need to keep track of any specfic dialog (not that this would be particularly difficult, 
	but makes the app even simpler).
	
	When agent login, check if the agent is using mobile agent nailed up connection mode, if so - enable alert capablility.
	If you recieve a new dialog with a state "ALERTING" - start the alert audio notification.
	If the dialog is deleted or changes state - stop the audio notification.
*/


var finesse = finesse || {};
finesse.gadget = finesse.gadget || {};
finesse.container = finesse.container || {};
_clientLogger = finesse.cslogger.ClientLogger || {};  // for logging

/** @namespace */
finesse.modules = finesse.modules || {};
finesse.modules.MACallNotificationGadget = (function ($) {

    var _user;
	var audio = new Audio("../3rdpartygadget/files/MACallNotification/sounds/chirp1.mp3");
    audio.loop = true; 

    /**
     */
     _handleUserLoad = function (userevent) {
		_myMobileAgentMode = _user.getMobileAgentMode();
		_clientLogger.log("_handleUserLoad(): MobileAgentMode: " + _myMobileAgentMode);
		
		if(_myMobileAgentMode === "NAILED_CONNECTION"){
			_clientLogger.log("_handleUserLoad(): Mobile Agent Connected in 'NAILED_CONNECTION' mode. Audio Alert Enabled!");

			_clientLogger.log("_handleUserLoad(): Initate hook for Dialog Add and Delete");
			_dialogs = _user.getDialogs({
				onCollectionAdd : _handleDialogAdd,
				onCollectionDelete : _handleDialogDelete
		 });

			//_clientLogger.log("_handleUserLoad(): Initate hook for User Change"); // Only need Dialog Change.
            //_user.addHandler('change', _handleUserChange);
		}else{
		_clientLogger.log("_handleUserLoad(): The Agent is NOT a Mobile Agent in 'NAILED_CONNECTION' mode. Audio Alert NOT Enabled.");
		}
    },
       
     _handleDialogAdd = function(dialog) {
        _clientLogger.log ("_handleDialogAdd() - dialog.getId(): " + dialog.getId());
        _clientLogger.log ("_handleDialogAdd() - dialog.getState(): " + dialog.getState());
        // add a change handler to the dialog
        dialog.addHandler('change', _handleDialogChange);

		if(dialog.getState() === "ALERTING"){
			_clientLogger.log("_handleUserChange(): Dialog in ALERTING State - Initate Call Alert!");
			audio.load(); //Reloads Audio - so audio starts at the beginning and not from where it was last paused.
			audio.play(); 
			}		
	 },

    _handleDialogChange = function (dialog) {
        _clientLogger.log ("_handleDialogChange() - dialog.getId(): " + dialog.getId());
        _clientLogger.log ("_handleDialogChange() - dialog.getState(): " + dialog.getState());
        _clientLogger.log ("_handleDialogChange() - If alerting - Pause Alert.");
		audio.pause(); //Stop the Alert Ringing when State Changes
    },
	 
     _handleDialogDelete = function(dialog) {
        _clientLogger.log ("_handleDialogDelete() - dialog.getId(): " + dialog.getId());
        _clientLogger.log ("_handleDialogDelete() - If alerting - Pause Alert.");
		audio.pause(); //Stop the Alert Ringing when Dialog is Deleted (i.e. if Caller Hangs up before call is answered)
	 };	 


    /** @scope finesse.modules.CallRecordingGadget */
    return {
        /**
         * Performs all initialization for this gadget
         */
        init : function () {
            var _clientLogger = finesse.cslogger.ClientLogger;   // declare _clientLogger

            // Initiate the ClientLogs. The gadget id will be logged as a part of the message
            _clientLogger.init(gadgets.Hub, "MACallNotificationGadget", finesse.gadget.Config);
            _clientLogger.log ("init(): Initializing...");
                
            var cfg = finesse.gadget.Config;
            _util = finesse.utilities.Utilities;

            // Initiate the ClientServices and load the user object. ClientServices are
            // initialized with a reference to the current configuration.
            finesse.clientservices.ClientServices.init(cfg, false);
			
            _user = new finesse.restservices.User({
                id: finesse.gadget.Config.id, 
                onLoad : _handleUserLoad
            });

			gadgets.window.adjustHeight(0);
        }
    };
}(jQuery));