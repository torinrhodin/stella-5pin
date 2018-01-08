document.addEventListener('presentationInit', function() {
	app.openPDF = function ( ev ) {
//    console.log(ev.target.parentNode.getAttribute('data-pdf') + " target");
    console.log(ev.target.parentNode.getAttribute('data-pdf') + " ev");

		var pdf = ev.target.parentNode.getAttribute('data-pdf');
		if ( pdf.indexOf ( '.pdf' ) != -1 ) {
			console.log ( 'PDF ' + pdf + ' clicked');

			ag.openPDF (pdf);
			ag.submit.reference(pdf,pdf);
		} else {
			console.log ( pdf + ' clicked. will not attempt to openPDF' );
		}
	};

	var slide = app.slide.resources = {
		elements: {			
			r1 : '#reference-1 .pdf-icon',
			r2 : '#reference-2 .pdf-icon',
			r3 : '#reference-3 .pdf-icon',
			r4 : '#reference-4 .pdf-icon',
			r5 : '#reference-5 .pdf-icon',
			r6 : '#reference-6 .pdf-icon',
			r7 : '#reference-7 .pdf-icon',
		},
		onEnter: function(ele) {      
			console.log('enter');

			// Attach Swipe Events
			document.addEventListener('swiperight', this._swipePrev);
			document.addEventListener('swipeleft', this._swipeNext);

			app.addEvent ( app.tap.tap , app.openPDF , slide.element.r1 );
			app.addEvent ( app.tap.tap , app.openPDF , slide.element.r2 );
			app.addEvent ( app.tap.tap , app.openPDF , slide.element.r3 );
			app.addEvent ( app.tap.tap , app.openPDF , slide.element.r4 );
			app.addEvent ( app.tap.tap , app.openPDF , slide.element.r5 );
			app.addEvent ( app.tap.tap , app.openPDF , slide.element.r6 );
			app.addEvent ( app.tap.tap , app.openPDF , slide.element.r7 );
		},
		onExit: function(ele) {
			console.log('exit');
			
			// Remove Swipe Event
			document.removeEventListener('swiperight', this._swipePrev);
		},
		_swipePrev: function() {
			app.collection.previous()
		}
	};  
}); 
