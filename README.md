# Contactless
A simple chrome extension that adds the option to open a whatsapp chat with a highlighted number via a right-click-menu command, without the need to add said number as a new contact.

The extension is not yet available in the chrome web store, hopefully version 0.0.1 will be approved soon :)

# Installation for developers / testers / curious folk

Follow these steps:
* clone this repository (git clone https://github.com/egz01/Contactless.git)
* In Chrome, navigate to chrome://extensions/ (i.e., the extension manager)
* At the top right corner of the view, check the "Developer mode" knob
* Press "Load unpacked"
* select the Contactless directory
* if no errors occurred, the extension should be present in the Extensions menu.

# Functionallity overview

After installation, the extension will appear in the extension menu. Personally, I pinned it for ease of access.
The current icon (will probably be enhanced...):

![image](https://user-images.githubusercontent.com/12452166/164193895-07507f2b-32c1-4dc0-b7f6-c7ca9bc8e6b1.png)

on left clicking the icon, the following popup will appear:

![image](https://user-images.githubusercontent.com/12452166/164194284-bb29520d-53ab-42eb-a1a2-c74f04c6b80d.png)

BTW - feel free to suggest design ideas as this definitely isn't my strong suit :)

This is the configuartion panel of the extension:
* Use Dedicated App - will attemp to use the WhatsApp for Desktop app
* Prepare first message - define a text that will be ready to be sent when the new chat is opened
* Submit - Commits the changes in configuration

Messaging a number can be done in one of ways:
* Direct input:
  * Input "whatsapp" in the omnibox (i.e., the search box at the top of the browser window), and press Tab.
  * Input any number
  * Press Enter
  
  ![image](https://user-images.githubusercontent.com/12452166/164198819-e4700351-9843-49b0-9a69-1dfad94823ea.png)
  
* Text highlighting:
  * Locate a number you wish to message (e.g. in a facebook post or some marketplace ad)
  * highlight the number (some text on the sides shouldn't matter thanks to regex)
  * right click it and choose the context menu option: Message on WhatsApp

  ![image](https://user-images.githubusercontent.com/12452166/164202371-3e9921bf-0d4c-4a99-bdfb-dd994ea4b0c4.png)

Both options will result in the same conclusion, based on some preexisting conditions:
* if the Use Dedicated App option is checked:
  * A new tab will appear, either prompting you to allow chrome to open whatsapp, or simply opening whatsapp if it's been granted access already
  * once whatsapp for desktop is opened, it will statr the new chat with the predefined message (blank if none specified)
* otherwise:
  * if a whatsapp web tab already exists, it will be highlited and the new chat will be opened in it (with / without predefined text message)
  * if there isn't an existing whatsapp web tab, a new tab will be added to the current window, and the new chat will be opened in it (with / without predefined text message)
