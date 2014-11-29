define(['jquery', 'canvasi', 'mode', 'shapes'], function ($, canvasi, mode) {
	var uawc = joint.shapes.uawc;

	function link(source, target) {
		var myLink = new joint.dia.Link({
			source: {
				id: source.id
			},
			target: {
				id: target.id
			},
			attrs: {
				'.marker-target': {
					d: 'M 10 0 L 0 5 L 10 10 z'
				}
			}
		});

		canvasi.graph.addCell(myLink);
	}

	function handler(cellView, e, x, y) {
		if (!(cellView.model instanceof uawc.Entity)) {
			return;
		}

		var elementBelow = canvasi.graph.get('cells')
			.find(function (cell) {
				if (cell instanceof joint.dia.Link || cell instanceof uawc.Group || cell.id === cellView.model.id) {
					return false;
				}

				return cell.getBBox().containsPoint(g.point(x, y));
			});


		if (elementBelow && !_.contains(canvasi.graph.getNeighbors(elementBelow), cellView.model)) {
			link(cellView.model, elementBelow);
		}
	}

	mode.change.add(function () {
		var editMode = mode.mode === 'link';

		canvasi.paper.off('cell:pointerup', handler);

		if (editMode) {
			canvasi.paper.on('cell:pointerup', handler);
		}
	});
});