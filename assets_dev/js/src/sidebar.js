(function(){

	var sidebar = {

		init: function(){
			this._el = document.getElementById('js-sidebar-collapse-btn');
			if(!this._el) return;
			this._bindEvents();
		},

		_bindEvents: function(){
			this._el.addEventListener('click', function(){
				document.body.classList.toggle('sidebar--open');
			}, false);
		}

	};

	sidebar.init();

}());