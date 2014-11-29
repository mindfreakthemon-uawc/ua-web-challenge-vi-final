define(['jquery', 'joint', 'shapes'], function ($, joint) {
	var exports,
		saveTimeout,
		uawc = joint.shapes.uawc,
		graph = new joint.dia.Graph(),
		$el = $('#paper'),
		paper = new joint.dia.Paper({
			el: $el,
			width: '100%',
			height: 600,
			gridSize: 1,
			model: graph
		});

	exports = {
		$el: $el,
		graph: graph,
		paper: paper,
		start: start
	};

	// saving after 1 sec of inactivity
	graph.on('change add remove', function () {
		clearTimeout(saveTimeout);
		saveTimeout = setTimeout(save, 500);
	});

	paper.on('cell:pointerdown', function (cellView) {
		if (cellView.model instanceof uawc.Group) {
			cellView.model.toBack();
		} else {
			cellView.model.toFront();
		}
	});

	function start() {
		var el = new joint.shapes.uawc.StartEntity({
			position: {
				x: paper.svg.clientWidth / 2,
				y: paper.svg.clientHeight / 2
			}
		});

		// start entity is used for generator
		// to point where to start
		exports.startEntity = el;

		graph.addCell(el);
	}

	function save() {
		var json = graph.toJSON();

		localStorage.setItem('graphTemp', JSON.stringify(json));
	}

	var saved = localStorage.getItem('graphTemp'),
		unloaded = true,
		json;

	if (saved) {
		try {
			json = JSON.parse(saved);
			graph.fromJSON(json);

			graph.get('cells')
				.find(function (cell) {
					if (cell instanceof joint.shapes.uawc.StartEntity) {
						exports.startEntity = cell;
					}

					// loading embed state
					if (cell.prop('parent')) {
						V(paper.findViewByModel(cell).el).addClass('embedded');
					}
				});

			unloaded = false;
		} catch (e) {
			console.log('could not load from LS');
		}
	}

	if (unloaded) {
		start();
	}

	return exports;
});