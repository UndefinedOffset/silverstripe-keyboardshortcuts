<?php
class KeyboardShortcuts extends Extension {
    public function onAfterInit() {
        Requirements::javascript(KEYBOARD_SHORTCUTS_BASE.'/thirdparty/mousetrap/mousetrap.min.js');
        Requirements::javascript(KEYBOARD_SHORTCUTS_BASE.'/thirdparty/mousetrap/plugins/mousetrap-global-bind.min.js');
        Requirements::javascript(KEYBOARD_SHORTCUTS_BASE.'/javascript/KeyboardShortcuts.js');
    }
}
?>