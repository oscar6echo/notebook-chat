
'use strict';


define([
	'require',
	'jquery',
	'base/js/namespace',
	'https://cdn.botframework.com/botframework-webchat/latest/botchat.js'
], function (
	requirejs,
	$,
	Jupyter,
	botchat
) {
	// define default config parameter values
	var params = {
		direct_line_secret: 'direct_line_secret',
		bot_id: 'bot_id',
	};

	// updates default params with any specified in the server's config
	var update_params = function () {
		var config = Jupyter.notebook.config;
		for (var key in params) {
			if (config.data.hasOwnProperty(key)) {
				params[key] = config.data[key];
			}
		}
	};


	var load_css = function (name) {
		var link = document.createElement('link');
		link.type = 'text/css';
		link.rel = 'stylesheet';
		link.href = requirejs.toUrl(name, 'css');
		document.head.appendChild(link);
	};

	// var load_js = function (name) {
	// 	var link = document.createElement('script');
	// 	link.type = 'text/javascript';
	// 	link.src = requirejs.toUrl(name, 'js');
	// 	document.body.appendChild(link);
	// };

	var load_dependencies = function () {
		load_css('./webchat.css');
		load_css('https://cdn.botframework.com/botframework-webchat/latest/botchat.css');
	};

	var enter_chat = function () {
		console.log('enter chat');
		Jupyter.keyboard_manager.disable();
	};

	var exit_chat = function () {
		console.log('exit chat');
		Jupyter.keyboard_manager.enable();
	};

	var say_hi = function () {
		// send first sentence empty to trigger bot first answer
		// TBD
	};

	var say_bye = function () {
		// send last good bye msg to properly terminate conversation
		// cleaner from bot end
		// TBD
	};

	
	var is_chat_opened = false;

	function toggle_webchat() {

		if (is_chat_opened) {

			say_bye();
			document.getElementById('webchat').remove();
			exit_chat();
			is_chat_opened = false;
			return;
		}

		var webchat = document.createElement('div');
		webchat.id = 'webchat';
		document.body.appendChild(webchat);

		botchat.App({
			directLine: { secret: params.direct_line_secret },
			bot: { id: params.bot_id },
			user: { id: null },
			// resize: 'detect'
		}, document.getElementById('webchat'));

		say_hi();
		enter_chat();
		is_chat_opened = true;
	}	


	var initialize = function () {

		console.log('init webchat');

		// update defaults
		update_params();

		// load webchat js & css
		load_dependencies();

		var action = {
			icon: 'fa-comment-o',
			help: 'Display Support Chat',
			help_index: 'zz',
			handler: toggle_webchat
		};
		var prefix = 'support_chat';
		var action_name = 'toggle';

		// define action
		var full_action_name = Jupyter.keyboard_manager.actions.register(action, action_name, prefix);
		// register action with toolbar
		Jupyter.toolbar.add_buttons_group([full_action_name]);


		// define keyboard shortcut
		var shortcuts = {};
		// shortcuts['TBD'] = full_action_name;
		// register keyboard shortcut with keyboard_manager
		Jupyter.notebook.keyboard_manager.command_shortcuts.add_shortcuts(shortcuts);
	};


	function load_ipython_extension() {
		return Jupyter.notebook.config.loaded.then(initialize);
	}

	return {
		load_ipython_extension: load_ipython_extension
	};
});
