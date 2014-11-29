define(['jquery', 'canvasi'], function ($, canvasi) {
	var $generate = $('#generate'),
		graph = canvasi.graph;

	function processEntity(entity, index, cache) {
		if (cache.indexOf(entity.id) > -1) {
			return '';
		}

		var text = '';

		text += index + '. ';
		text += entity.attr('text.title/text');
		text += ' --- ';
		text += entity.attr('text.descr/text');
		text += '\n';

		cache.push(entity.id);

		graph.getConnectedLinks(entity, { outbound: true })
			.forEach(function (link) {
				var neighbor = graph.getCell(link.prop('target/id')),
					returns = processEntity(neighbor, ++index, cache);

				if (returns) {
					text += returns;
				} else {
					index--;
				}
			});

		return text;
	}

	$generate.on('click', function () {
		var a,
			out = '';

		out += processEntity(canvasi.startEntity, 1, []);

		a = document.createElement('a');
		a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(out);
		a.download = 'output.txt';
		a.click();
	});
});