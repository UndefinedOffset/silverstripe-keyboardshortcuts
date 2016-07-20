(function($) {
    $.entwine('ss', function($) {
        $('.cms-edit-form').entwine({
            onadd: function() {
                this._super();
                
                var self=$(this);
                
                
                /***** Bind Keyboard Events *****/
                //Global Events
                Mousetrap.bindGlobal('mod+s', function(e) {return self._saveForm(e);}); //Save Draft/Save
                
                
                //CMS Page Edit Controller Only
                if($(this).hasClass('CMSPageEditController')) {
                    Mousetrap.bindGlobal('mod+shift+s', function(e) {return self._saveAndPublish(e);}); //Publish
                    Mousetrap.bindGlobal('mod+k', function(e) {return self._switchStage(e);}); //Preview Stage Switch
                    Mousetrap.bindGlobal('mod+m', function(e) {return self._switchPreviewMode(e);}); //Preview View Mode Switch
                    Mousetrap.bindGlobal('mod+j', function(e) {return self._switchPreviewSize(e);}); //Preview View Size Switch
                }
                
                
                //CMS Page Edit and CMS Add Page controllers only
                if($(this).hasClass('CMSPageEditController') || $(this).hasClass('CMSPageAddController')) {
                    Mousetrap.bindGlobal('mod+n', function(e) {return self._addPage(e);}); //Add Page
                }
            },
            onremove: function() {
                this._super();
                
                
                /***** Unbind Keyboard Events *****/
                Mousetrap.reset();
            },
            
            //---------- Handlers ----------//
            /**
             * Targets the save button in CMSMain, GridField and SiteConfig
             */
            _saveForm: function(e) {
                var button=$('#Form_EditForm_action_save, #Form_ItemEditForm_action_doSave, #Form_EditForm_action_save_siteconfig');
                if(button.length>0) {
                    button.click();
                    
                    return false;
                }
            },
            
            /**
             * Targets the publish button in CMSMain
             */
            _saveAndPublish: function(e) {
                var button=$('#Form_EditForm_action_publish');
                if(button.length>0) {
                    button.click();
                    
                    return false;
                }
            },
            
            /**
             * Targets the  Add New button in CMSMain
             */
            _addPage: function(e) {
                var button=$('.cms-page-add-button, #Form_AddForm_action_doAdd');
                if(button.length>0) {
                    button.click();
                    
                    return false;
                }
            },
            
            /**
             * Targets the preview stage controls in CMSMain
             */
            _switchStage: function(e) {
                var draftStage=$('.cms-preview .cms-preview-states input[data-name=StageLink]');
                var liveStage=$('.cms-preview .cms-preview-states input[data-name=LiveLink]');
                if(draftStage.length>0 && liveStage.length>0) {
                    if(draftStage.is(':checked')) {
                        //Current is stage, switch to live
                        jQuery('.cms-preview').entwine('ss.preview').changeState('LiveLink', false);
                    }else {
                        //Current is live, switch to stage
                        jQuery('.cms-preview').entwine('ss.preview').changeState('StageLink', false);
                    }
                    
                    return false;
                }
            },
            
            /**
             * Targets the preview mode controls in CMSMain
             */
            _switchPreviewMode: function(e) {
                var modeDropdown=$('.cms-preview .preview-mode-selector .preview-dropdown');
                if(modeDropdown.length>0) {
                    if(modeDropdown.val()=='split') {
                        window.console.log('test');
                        jQuery('.cms-preview').entwine('ss.preview').changeMode('content', true);
                    }else if(modeDropdown.val()=='content') {
                        jQuery('.cms-preview').entwine('ss.preview').changeMode('preview', true);
                    }else {
                        jQuery('.cms-preview').entwine('ss.preview').changeMode('split', true);
                    }
                    
                    return false;
                }
            },
            
            /**
             * Targets the preview size controls in CMSMain
             */
            _switchPreviewSize: function(e) {
                var sizeDropdown=$('.cms-preview .preview-size-selector .preview-dropdown');
                if(sizeDropdown.length>0) {
                    if(sizeDropdown.val()=='auto') {
                        jQuery('.cms-preview').entwine('ss.preview').changeSize('desktop', true);
                    }else if(sizeDropdown.val()=='desktop') {
                        jQuery('.cms-preview').entwine('ss.preview').changeSize('tablet', true);
                    }else if(sizeDropdown.val()=='tablet') {
                        jQuery('.cms-preview').entwine('ss.preview').changeSize('mobile', true);
                    }else {
                        jQuery('.cms-preview').entwine('ss.preview').changeSize('auto', true);
                    }
                    
                    return false;
                }
            }
        });
        
        
        $('.CMSPagesController').entwine({
            onmatch: function() {
                this._super();
                
                var self=$(this);
                
                
                /***** Bind Keyboard Events *****/
                Mousetrap.bindGlobal(['ctrl+n', 'command+n'], function(e) {return self._addPage(e);}); //Add Page
            },
            onunmatch: function() {
                this._super();
                
                
                /***** Unbind Keyboard Events *****/
                Mousetrap.reset();
            },
            
            //---------- Handlers ----------//
            /**
             * Targets the  Add New button in CMSMain
             */
            _addPage: function(e) {
                var button=$('.cms-page-add-button, #Form_AddForm_action_doAdd');
                if(button.length>0) {
                    button.click();
                    
                    return false;
                }
            }
        });
        
        
        //TinyMCE Binding
        $('textarea.htmleditor').entwine({
            MousetrapListeners: [],
            
            /**
             * Handles binding the event listeners to tinymce when the editor is initialized
             */
            oneditorinit: function() {
                this._super();
                
                var listeners=this.getMousetrapListeners();
                if(listeners.length>0) {
                    var editorBody=this.getEditor().getInstance().contentWindow.document.body;
                    
                    //Purge all keyboard shortcuts 
                    Mousetrap(editorBody).reset();
                    
                    //Remap all keyboard shortcuts
                    for(var i=0;i<listeners.length;++i) {
                        Mousetrap(editorBody).noTinyMCEBind(listeners[i].key, listeners[i].callback, listeners[i].action);
                    }
                }
            },
            
            /**
             * Caches the listener to bind to
             * @param {string} key Keyboard combination to bind to
             * @param {function} callback Callback function
             * @param {string} action Keyboard key action
             */
            bindMousetrap: function(key, callback, action) {
                var listeners=this.getMousetrapListeners();
                listeners.push({
                    'key': key,
                    'callback': callback,
                    'action': action
                });
                
                this.setMousetrapListeners(listeners);
                
                //Bind the listener if the editor's window is ready
                if(this.getEditor().getInstance().contentWindow) {
                    Mousetrap(this.getEditor().getInstance().contentWindow.document.body).noTinyMCEBind(key, callback, action);
                }
            }
        });
    });
})(jQuery);

(function(Mousetrap) {
    var _oldBind=Mousetrap.prototype.bind;
    
    Mousetrap.prototype.bind=function(keys, callback, action) {
        _oldBind.call(this, keys, callback, action);
        
        jQuery('textarea.htmleditor').entwine('ss').bindMousetrap(keys, callback, action);
    };
    
    Mousetrap.prototype.noTinyMCEBind=function(keys, callback, action) {
        _oldBind.call(this, keys, callback, action);
    };
    
    Mousetrap.init();
})(Mousetrap);