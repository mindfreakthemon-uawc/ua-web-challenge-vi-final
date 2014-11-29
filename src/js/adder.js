define(['jquery', 'canvasi', 'mode', 'shapes'], function ($, canvasi, mode) {
	var uawc = joint.shapes.uawc;

	function element(elm, x, y) {
		var cell = new elm({
			position: {
				x: x,
				y: y
			}
		});

		canvasi.graph.addCell(cell);

		return cell;
	}

	function handler(e, x, y) {
		var el;

		switch (mode.mode) {
			case 'element':
				el = element(uawc.Entity, x, y);
				break;

			case 'group':
				el = element(uawc.Group, x, y);

				break;
		}
	}

	mode.change.add(function () {
		var editMode = mode.mode === 'element' || mode.mode === 'group';

		canvasi.paper.off('blank:pointerclick', handler);

		if (editMode) {
			canvasi.paper.on('blank:pointerclick', handler);
		}
	});
});