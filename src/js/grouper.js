define(['jquery', 'canvasi', 'mode', 'shapes'], function ($, canvasi, mode) {
	var uawc = joint.shapes.uawc;

	function group(el, group) {
		group.embed(el);

		V(canvasi.paper.findViewByModel(el).el).addClass('embedded');
	}

	function ungroup(el) {
		var parent,
			parentId = el.prop('parent');

		if (!parentId) {
			return;
		}

		parent = canvasi.graph.getCell(parentId);
		parent.unembed(el);

		V(canvasi.paper.findViewByModel(el).el).removeClass('embedded');
	}

	function handler(cellView, e, x, y) {
		if (!(cellView.model instanceof uawc.Entity)) {
			return;
		}

		var elementBelow = canvasi.graph.get('cells')
			.find(function (cell) {
				if (!(cell instanceof uawc.Group) || cell.id === cellView.model.id) {
					return false;
				}

				return cell.getBBox().containsPoint(g.point(x, y));
			});


		if (elementBelow) {
			group(cellView.model, elementBelow);
		} else {
			ungroup(cellView.model);
		}
	}

	mode.change.add(function () {
		var editMode = mode.mode === 'embed';

		canvasi.paper.off('cell:pointerup', handler);

		if (editMode) {
			canvasi.paper.on('cell:pointerup', handler);
		}
	});
});