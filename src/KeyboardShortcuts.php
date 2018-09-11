<?php
namespace UndefinedOffset\KeyboardShortcuts;

use SilverStripe\Core\Extension;
use SilverStripe\View\Requirements;


class KeyboardShortcuts extends Extension {
    public function onAfterInit() {
        Requirements::javascript('undefinedoffset/silverstripe-keyboardshortcuts:thirdparty/mousetrap/mousetrap.min.js');
        Requirements::javascript('undefinedoffset/silverstripe-keyboardshortcuts:thirdparty/mousetrap/plugins/mousetrap-global-bind.min.js');
        Requirements::javascript('undefinedoffset/silverstripe-keyboardshortcuts:javascript/KeyboardShortcuts.js');
    }
}
?>