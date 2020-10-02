Author: Gerry O'Rourke
Date 27/09/2020
Version 1.0

==== Overview ====
The simple gadget can be hosted on the Finesse Servers.
It is used to give an Audio alert when a call arrives, via the Browser Desktop when connected in Mobile Agent Nailed Up Connection Mode
Since the Audio alert is played via the Browser - if using a citrix session it must have audio enabled (which usually seems to be the case!) and the agent PC's / Laptop must have audio / sound card enabled.

====Tested Browsers====
Chrome
Firefox
IE11

====Known Issues====
Agent Whisper Calls
The Ring alert  does not stop until after the whisper plays.
Dialog and user changes do not catch this when whisper starts to play.
Unsure if it is possible to catch the event for when whisper starts. Likely possible likely using catching popup changes - but then not supported on 11.6.

====Note====
F5 Refresh 
If an agent press F5 to reload the Finesse Desktop after they are logged in, they must click the Finesse desktop at least once before an alert can play.
If they do not, the first alert after a F5 refresh will not play.
This is a feature on certain browsers (e.g. Chrome) - to prevent annonying websites playing audio before any user interaction.

====How to Deploy====
Deploy as a hidden Gadget if using Finesse UCCE 12 or higher

Note - do not change the Folder Name of the App.
Or if If you do - you need to change the Sound File URL in the JS file.

1) Upload to Finesse server 3rdPartyGadget/files Folder
2) Add the following XML to the Agents Team's Finesse Desktop Latout between an existing Gadgets Element.


	<!-- Hidden Gadget for Mobile Agent Nailed Connection - Call Notification -->
	<gadget hidden="true">/3rdpartygadget/files/MACallNotification/MACallNotification.xml</gadget>


Note: This is a hidden gadget - so it can be located among other gadgets - and just won't be seen.

If using Finesse 11.X - it does not support hidden gadgets. the Size of the Gadget is minimised, so takes up minimum room - but you see its title (which can be hidden by editing XML file and setting to " ".
Locate it where you think best.

	<!-- Finesse 11.x does not support Hidden Gadget for -->
	<!-- Mobile Agent Nailed Connection - Call Notification -->
	<gadget>/3rdpartygadget/files/MACallNotification/MACallNotification.xml</gadget>



An EXAMPLE of adding the gadget to the existing the Agent History TAB
            <tab>
                <id>myHistory</id>
                <icon>history</icon>
                <label>finesse.container.tabs.agent.myHistoryLabel</label>
                <columns>
                    <column>
                        <!-- The following gadgets are used for viewing the call history and state history of an agent. -->
                        <gadgets>
			    <!-- Hidden Gadget for Mobile Agent Nailed Connection - Call Notification -->
			    <gadget hidden="true">/3rdpartygadget/files/MACallNotification/MACallNotification.xml</gadget>
                            <gadget>https://ucce-cuic-a.lab2.purplepi.ie:8444/cuic/gadget/LiveData/LiveDataGadget.jsp?gadgetHeight=280&viewId=5FA44C6F930C4A64A6775B21A17EED6A&filterId=agentTaskLog.id=CL%20teamName</gadget>
                            <gadget>https://ucce-cuic-a.lab2.purplepi.ie:8444/cuic/gadget/LiveData/LiveDataGadget.jsp?gadgetHeight=280&viewId=56BC5CCE8C37467EA4D4EFA8371258BC&filterId=agentStateLog.id=CL%20teamName</gadget>
                        </gadgets>
                    </column>
                </columns>
            </tab>


====Test Alert HTML====
https://<finesse-server>/3rdpartygadget/files/MACallNotification/test-alert.html

==== Reference ====
Reference on Managing 3rd Party Finesse Gadgets
https://www.cisco.com/c/en/us/td/docs/voice_ip_comm/cust_contact/contact_center/finesse/finesse_1161/Admin/guide/cfin_b_cisco-finesse-administration-guide-116/cfin_b_cisco-finesse-administration-guide-116_chapter_01011.pdf

==== License ====

    MIT License
 
    Copyright (c) 2020 Gerry O'Rourke
 
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
