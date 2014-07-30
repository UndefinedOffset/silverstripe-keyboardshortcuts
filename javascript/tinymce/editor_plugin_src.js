(function() {
    // Load plugin specific language pack
    tinymce.PluginManager.requireLangPack('sskeyboardshortcuts');

    tinymce.create('tinymce.plugins.ssKeyboardShortcuts', {
        init: function(ed, url) {
            ed.addShortcut('ctrl+shift+k', ed.getLang('sskeyboardshortcuts.insertlink', 0), 'sslink'); //Insert a link
            
            ed.addShortcut('alt+shift+k', ed.getLang('sskeyboardshortcuts.unlink', 0), 'unlink'); //Unlink
            
            ed.addShortcut('ctrl+shift+m', ed.getLang('sskeyboardshortcuts.insertmedia', 0), 'ssmedia'); //Insert Media
            
            ed.addShortcut('ctrl+shift+l', ed.getLang('sskeyboardshortcuts.insertbullets', 0), 'InsertUnorderedList'); //Insert or Remove Bulleted List
            
            ed.addShortcut('ctrl+l', ed.getLang('sskeyboardshortcuts.insertnumbers', 0), 'InsertOrderedList'); //Insert or Remove Numbered List
        },
        getInfo: function() {
            return {
                longname: ed.getLang('sskeyboardshortcuts.longdesc', 0),
                author: 'UndefinedOffset',
                authorurl: 'http://www.edchipman.ca',
                infourl: 'https://github.com/UndefinedOffset/silverstripe-keyboardshortcuts',
                version: "1.0"
            };
        }
    });

    // Register plugin
    tinymce.PluginManager.add('sskeyboardshortcuts', tinymce.plugins.ssKeyboardShortcuts);
})();