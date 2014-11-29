define(['joint', 'jquery', 'shapes'], function (joint, $) {
	var mode = $('#mode'),
		tools = {
			mode: 'edit',
			change: $.Callbacks()
		};

	mode.on('change', function (e) {
		tools.mode = e.target.value;
		tools.change.fire();
	});

	return tools;
});