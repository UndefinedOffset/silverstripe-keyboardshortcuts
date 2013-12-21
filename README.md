SilverStripe Keyboard Shortcuts
=================
Adds keyboard shortcuts for common tasks to SilverStripe 3.1 (ctrl/command+s for save anyone?).

## Requirements
* SilverStripe 3.1+

## Installation
* Download the module from here https://github.com/UndefinedOffset/silverstripe-keyboardshortcuts/archive/master.zip
* Extract the downloaded archive into your site root so that the destination folder is called keyboardshortcuts, opening the extracted folder should contain _config.php in the root along with other files/folders
* Run dev/build?flush=all to regenerate the manifest
 
If you prefer you may also install using composer:
```
composer require undefinedoffset/silverstripe-keyboardshortcuts
```

## Shortcuts:
These shortcuts are not guarenteed towork in all browsers on all operating systems, and what they do by default on your particualar browser/os is not guarenteed so take care. This module uses a slightly modified [Mousetrap by ccampbell](https://github.com/ccampbell/mousetrap) for it's keyboard event handling, modifications are to allow interfacing with TinyMCE.

#### Global
``ctrl+s``/``command+s`` Save/Save Draft


#### Pages only
``ctrl+shift+s``/``command+shift+s`` Save and Publish

``ctrl+n``/``command+n`` Add Page/Create Page

``ctrl+k``/``command+k`` Toggle between Draft/Published Preview [not saved]

``ctrl+m``/``command+m`` Toggle between preview modes (Split mode > Edit mode > Preview mode) saved in session

``ctrl+j``/``command+j`` Toggle between preview sizes (Auto > Desktop > Tablet > Mobile) saved in session