define(['joint'], function (joint) {

	joint.shapes.uawc = {};

	joint.shapes.uawc.Entity = joint.dia.Element.extend({
		markup: '<g class="rotatable"><g class="scalable"><polygon class="outer"/><polygon class="inner"/></g><text class="title" /><text class="descr" /></g>',

		defaults: joint.util.deepSupplement({
			type: 'uawc.Entity',
			size: {
				width: 150,
				height: 60
			},
			attrs: {
				'.outer': {
					fill: '#2ECC71',
					stroke: '#27AE60',
					'stroke-width': 2,
					points: '100,0 100,60 0,60 0,0'
				},
				'.inner': {
					fill: '#2ECC71',
					stroke: '#27AE60',
					'stroke-width': 2,
					points: '94,5 94,55 6,55 6,5'
				},
				'text.title': {
					text: 'New Entity',
					'font-family': 'Arial',
					'font-size': 16,
					ref: '.outer',
					'ref-x': .5,
					'ref-y': .3,
					'x-alignment': 'middle',
					'y-alignment': 'middle'
				},
				'text.descr': {
					text: 'Description',
					'font-family': 'Arial',
					'font-size': 9,
					ref: '.outer',
					'ref-x': .5,
					'ref-y': .7,
					'x-alignment': 'middle',
					'y-alignment': 'middle'
				}
			}

		}, joint.dia.Element.prototype.defaults)
	});

	joint.shapes.uawc.Group = joint.shapes.uawc.Entity.extend({
		defaults: joint.util.deepSupplement({
			type: 'uawc.Group',
			size: {
				width: 400,
				height: 300
			},
			attrs: {
				'text.title': {
					text: 'Group',
					'ref-y': 10
				},
				'text.descr': {
					text: 'Description',
					'ref-y': 20
				}
			}

		}, joint.shapes.uawc.Entity.prototype.defaults)
	});


	joint.shapes.uawc.StartEntity = joint.shapes.uawc.Entity.extend({
		defaults: joint.util.deepSupplement({
			type: 'uawc.StartEntity',

			attrs: {
				'text.title': {
					text: 'StartEntity'
				}
			}
		}, joint.shapes.uawc.Entity.prototype.defaults)
	});
});