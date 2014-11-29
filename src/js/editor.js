define(['jquery', 'canvasi', 'mode'], function ($, canvasi, mode) {
	var $editor = $('#editor'),
		$editorForm = $('#editor-form'),
		$clear = $('#clear'),
		$title = $('#title'),
		$descr = $('#descr');

	var editableCellView = null;

	$editor.on('click', '.close, .remove', close);
	$editor.on('click', '.remove', remove);

	$editorForm.on('submit', function (e) {
		e.preventDefault();

		editableCellView.model.attr('text.title/text', $title.val());
		editableCellView.model.attr('text.descr/text', $descr.val());
	});

	$clear.on('click', function () {
		canvasi.graph.clear();

		canvasi.start();
	});

	function close() {
		// should've use vanilla here..
		$editor.removeClass('shown');
	}

	function remove() {
		if (editableCellView.model instanceof joint.shapes.uawc.StartEntity) {
			alert('Cant remove stating cell');
			return;
		}

		editableCellView.model.remove();
	}

	function edit(cellView) {
		if (!(cellView.model instanceof joint.shapes.uawc.Entity)) {
			return;
		}

		$editor.addClass('shown');

		editableCellView = cellView;

		$title.val(cellView.model.attr('text.title/text') || '');
		$descr.val(cellView.model.attr('text.descr/text') || '');
	}

	canvasi.paper.on('blank:pointerclick', close);
	canvasi.paper.on('cell:pointerclick', edit);
	canvasi.paper.on('cell:pointerdltclick', remove);

	mode.change.add(function () {
		var editMode = mode.mode === 'edit';

		canvasi.paper.off('cell:pointerclick', edit);

		if (editMode) {
			canvasi.paper.on('cell:pointerclick', edit);
		}

		close();
	});
});