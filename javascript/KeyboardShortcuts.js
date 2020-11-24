(function($) {
    $.entwine('ss', function($) {
        $('.cms-edit-form').entwine({
            onadd: function() {
                this._super();
                
                var self=$(this);
                
                
                /***** Bind Keyboard Events *****/
                //Global Events
                Mousetrap.bindGlobal('mod+s', function(e) {return self._saveForm(e);}); //Save Draft/Save
                
                // ModelAdmin search
                if($('button[name="showFilter"]').length){
                    Mousetrap.bindGlobal('mod+f', function(e) {return self._toggleSearch(e);}); //Search
                }
                
                //CMS Page Edit Controller Only
                if(self.hasClass('CMSPageEditController') || self.hasClass('CMSPageSettingsController')) {
                    Mousetrap.bindGlobal('mod+shift+s', function(e) {return self._saveAndPublish(e);}); //Publish
                    Mousetrap.bindGlobal('mod+k', function(e) {return self._switchStage(e);}); //Preview Stage Switch
                    Mousetrap.bindGlobal('mod+m', function(e) {return self._switchPreviewMode(e);}); //Preview View Mode Switch
                    Mousetrap.bindGlobal('mod+j', function(e) {return self._switchPreviewSize(e);}); //Preview View Size Switch
                }
                
                
                //CMS Page Edit and CMS Add Page controllers only
                if(self.hasClass('CMSPageEditController') || self.hasClass('CMSPageAddController')) {
                    Mousetrap.bindGlobal('mod+alt+n', function(e) {return self._addPage(e);}); //Add Page
                }
            },
            onremove: function() {
                this._super();
                
                
                /***** Unbind Keyboard Events *****/
                Mousetrap.reset();
            },
            
            //---------- Handlers ----------//
            /**
             * Targets the gridfield search button in ModelAdmin
             */
            _toggleSearch: function(e){
                if($('.grid.grid-field.show-filter').length){
                    $('.search-box__cancel').click();
                } else {
                    $('button[name="showFilter"]').click();
                    $('.search-box input[type="search"]').focus();
                }
                return false;
            },
            /**
             * Targets the save button in CMSMain, GridField and SiteConfig
             */
            _saveForm: function(e) {
                var button=$('#Form_EditForm_action_save, #Form_ItemEditForm_action_save, #Form_ItemEditForm_action_doSave, #Form_EditForm_action_save_siteconfig');
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
                var button=$('.cms-page-add-button, .cms-content-addpage-button, #Form_AddForm_action_doAdd');
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
            onadd: function() {
                this._super();
                
                var self=$(this);
                
                
                /***** Bind Keyboard Events *****/
                Mousetrap.bindGlobal('mod+alt+n', function(e) {return self._addPage(e);}); //Add Page
            },
            onremove: function() {
                this._super();
                
                
                /***** Unbind Keyboard Events *****/
                Mousetrap.reset();
            },
            
            //---------- Handlers ----------//
            /**
             * Targets the  Add New button in CMSMain
             */
            _addPage: function(e) {
                var button=$('.cms-page-add-button, .cms-content-addpage-button, #Form_AddForm_action_doAdd');
                if(button.length>0) {
                    button.click();
                    
                    return false;
                }
            }
        });
        
        
        $('.ModelAdmin').entwine({
            onadd: function() {
                this._super();
                
                var self=$(this);
                
                
                /***** Bind Keyboard Events *****/
                Mousetrap.bindGlobal('mod+alt+n', function(e) {return self._modelAdminNew(e);}); //ModelAdmin add new
            },
            onremove: function() {
                this._super();
                
                
                /***** Unbind Keyboard Events *****/
                Mousetrap.reset();
            },
            
            //---------- Handlers ----------//
            /**
             * Handles adding a new item in a model admin
             */
            _modelAdminNew: function(e) {
                var button=$('.cms-edit-form > fieldset > .ss-gridfield .ss-gridfield-buttonrow-before .new-link');
                if(button.length>0) {
                    button.click();
                    
                    return false;
                }
            }
        });
        
        
        $('.cms-content').entwine({
            onadd: function() {
                this._super();
                
                var self=$(this);
                
                
                /***** Bind Keyboard Events *****/
                //Bind search
                if($('.cms-content-header #filters-button').length>0) {
                    Mousetrap.bindGlobal('mod+f', function(e) {return self._toggleSearch(e);}); //Toggle the search panel
                }
                
                
                //Bind clear search filters for cms main as well as model admin
                if(self.hasClass('CMSPagesController') || self.hasClass('CMSPageEditController') || self.hasClass('CMSPageSettingsController') || self.hasClass('ModelAdmin')) {
                    Mousetrap.bindGlobal('mod+shift+f', function(e) {return self._clearSearchFilters(e);}); //Clear all search filters
                }
            },
            onremove: function() {
                this._super();
                
                
                /***** Unbind Keyboard Events *****/
                Mousetrap.reset();
            },
            
            //---------- Handlers ----------//
            /**
             * Toggles showing/hiding of the search
             */
            _toggleSearch: function(e) {
                var button=$('#filters-button');
                if(button.length>0) {
                    button.showHide();
                    
                    if(button.data('collapsed')==false) {
                        $('.cms-search-form').find('input:not(.action):visible:first').focus();
                    }else {
                        $('.cms-search-form').find('input:not(.action):visible:first').blur();
                    }
                    
                    return false;
                }
            },
            
            /**
             * Clears the search filters
             */
            _clearSearchFilters: function(e) {
                var button=$('.cms-tree-view-sidebar .cms-clear-filter');
                if(button.length>0) {
                    button.click();
                    
                    return false;
                }
                
                var button=$('.cms-search-form .btn-toolbar button[name=action_clear]');
                if(button.length>0) {
                    button.click();
                    
                    return false;
                }
            }
        });
        
        $('.AssetAdmin').entwine({
            onadd: function() {
                this._super();
                
                var self=$(this);
                
                Mousetrap.bindGlobal('mod+shift+s', function(e) {return self._saveAndPublish(e);}); //Publish
            },
            
            /**
             * Targets the publish button in CMSMain
             */
            _saveAndPublish: function(e) {
                var button=$('#Form_fileEditForm_action_publish');
                if(button.length>0) {
                    button.click();
                    
                    return false;
                }
            }
        });
        
        
        //TinyMCE Binding
        $('textarea.htmleditor[data-editor="tinyMCE"]').entwine({
            MousetrapListeners: {},
            BoundListeners: {},
            
            /**
             * Handles binding the event listeners to tinymce when the editor is initialized
             */
            editorinit: function() {
                var listeners=this.getMousetrapListeners();
                if(this.getEditor().getInstance().getWin()) {
                    var editorBody=this.getEditor().getInstance().getWin().document.body;
                    
                    //Purge all keyboard shortcuts 
                    Mousetrap(editorBody).reset();
                    
                    //Remap all keyboard shortcuts
                    var boundListeners={};
                    for(var key in listeners) {
                        var listener=listeners[key];
                        Mousetrap(editorBody).noTinyMCEBind(key, listener.callback, listener.action);
                        
                        boundListeners[key]=true;
                    }
                    
                    this.setBoundListeners(boundListeners);
                }
            },
            
            /**
             * Removes all tinymce listeners on remove of the editor
             */
            onremove: function() {
                if(this.getEditor() && this.getEditor().getInstance() && this.getEditor().getInstance().getWin()) {
                    var editorBody=this.getEditor().getInstance().getWin().document.body;
                    
                    //Purge all keyboard shortcuts 
                    Mousetrap(editorBody).reset();
                }
                
                //Reset the object of listeners
                this.setMousetrapListeners({});
                this.setBoundListeners({});
                
                this._super();
            },
            
            /**
             * Caches the listener to bind to
             * @param {string} key Keyboard combination to bind to
             * @param {function} callback Callback function
             * @param {string} action Keyboard key action
             */
            bindMousetrap: function(key, callback, action) {
                var listeners=this.getMousetrapListeners();
                listeners[key]={
                                'callback': callback,
                                'action': action
                            };
                
                this.setMousetrapListeners(listeners);
                
                
                //Bind the listener if the editor's window is ready and the keyboard shortcut is not already bound
                if(this.getEditor() && this.getEditor().getInstance() && this.getEditor().getInstance().getWin()) {
                    var editorBody=this.getEditor().getInstance().getWin().document.body;
                    var boundListeners=this.getBoundListeners();
                    
                    if(typeof boundListeners[key]=='undefined') {
                        Mousetrap(editorBody).noTinyMCEBind(key, callback, action);
                        
                        boundListeners[key]=true;
                        
                        this.setBoundListeners(boundListeners);
                    }
                }
            }
        });
    });
})(jQuery);

(function(Mousetrap) {
    var _oldBind=Mousetrap.prototype.bind;
    Mousetrap.prototype.bind=function(keys, callback, action) {
        _oldBind.call(this, keys, callback, action);
        
        var htmlEditors=jQuery('textarea.htmleditor[data-editor="tinyMCE"]');
        if(htmlEditors.length>0 && htmlEditors.entwine('ss').bindMousetrap) {
            htmlEditors.entwine('ss').bindMousetrap(keys, callback, action);
        }
    };
    
    Mousetrap.prototype.noTinyMCEBind=function(keys, callback, action) {
        _oldBind.call(this, keys, callback, action);
    };
    
    Mousetrap.init();
})(Mousetrap);
