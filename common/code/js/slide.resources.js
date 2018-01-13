document.addEventListener('presentationInit', function() {
	app.openPDF = function ( ev ) {
//    console.log(ev.target.parentNode.getAttribute('data-pdf') + " target");
    console.log(ev.target.getAttribute('data-pdf') + " ev");

		var pdf = ev.target.getAttribute('data-pdf');
		if ( pdf.indexOf ( '.pdf' ) != -1 ) {
			console.log ( 'PDF ' + pdf + ' clicked');

			ag.openPDF (pdf);
			ag.submit.reference(pdf,pdf);
		} else {
			console.log ( pdf + ' clicked. will not attempt to openPDF' );
		}
		

	};

  app.sendMail = function( ev ) {
		var email = ev.target.getAttribute('data-email');
		var emailAttachment = ev.target.getAttribute('data-attachment');
		
		if ( email.indexOf ( '.email' ) != -1 ) {
			console.log ( 'PDF ' + email + ' clicked');

			ag.sendMail ('',email,'',[emailAttachment]);
		} else {
			console.log ( email + ' clicked. will not attempt to openPDF' );
		}
    
  }

	var slide = app.slide.resources = {
		elements: {			
			r1 : '#pdf-1',
			r2 : '#pdf-2',
			r3 : '#pdf-3',
			r4 : '#pdf-4',
			r5 : '#pdf-5',
			r6 : '#pdf-6',
			r7 : '#pdf-7',
			r8 : '#pdf-8',
			r9 : '#pdf-9',
			r10 : '#email-1',
			r11 : '#email-2',
			r12 : '#email-3',
			r13 : '#email-4',
			r14 : '#email-5',
			r15 : '#email-6',
			r16 : '#email-7',
			r17 : '#email-8',
			r18 : '#email-9',
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
			app.addEvent ( app.tap.tap , app.openPDF , slide.element.r8 );
			app.addEvent ( app.tap.tap , app.openPDF , slide.element.r9 );
			app.addEvent ( app.tap.tap , app.sendMail , slide.element.r10 );
			app.addEvent ( app.tap.tap , app.sendMail , slide.element.r11 );
			app.addEvent ( app.tap.tap , app.sendMail , slide.element.r12 );
			app.addEvent ( app.tap.tap , app.sendMail , slide.element.r13 );
			app.addEvent ( app.tap.tap , app.sendMail , slide.element.r14 );
			app.addEvent ( app.tap.tap , app.sendMail , slide.element.r15 );
			app.addEvent ( app.tap.tap , app.sendMail , slide.element.r16 );
			app.addEvent ( app.tap.tap , app.sendMail , slide.element.r17 );
			app.addEvent ( app.tap.tap , app.sendMail , slide.element.r18 );
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
