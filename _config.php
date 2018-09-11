<?php
use SilverStripe\Core\Manifest\ModuleResourceLoader;
use SilverStripe\Forms\HTMLEditor\TinyMCEConfig;


TinyMCEConfig::get('cms')->enablePlugins(array('sskeyboardshortcuts'=>ModuleResourceLoader::resourceURL('undefinedoffset/silverstripe-keyboardshortcuts:javascript/tinymce/editor_plugin_src.js')));
?>