<?php
define('KEYBOARD_SHORTCUTS_BASE', basename(dirname(__FILE__)));


HtmlEditorConfig::get('cms')->enablePlugins(array('sskeyboardshortcuts'=>'../../../'.KEYBOARD_SHORTCUTS_BASE.'/javascript/tinymce/editor_plugin_src.js'));
?>