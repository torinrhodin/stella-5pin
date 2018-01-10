(function(global) {
  
  // Creating our presentation and global namespace "app"
  // debug();
  global.app = new Presentation({
    type:'json',
    globalElements:[
    	'medradLogo',
    	'smartpackLogo',
    	'study-design',
    	'study-design-background',
    	'close-study'
    ]
  });
 
	// Create global app.tap variable for desktop or mobile
	if (touchy.isTouch) {
    console.log("is touchy");
		app.tap = {
			tap : 'tap',
			start : 'touchstart',
			end : 'touchend'
		}
	} else {
    console.log("is not touchy");
		app.tap = {
			tap : 'click',
			start : 'mousedown',
			end : 'mouseup'
		}		
	}
  
  // Initiate modules
  // Custom Slide Nav (arrows and X)
	app.nav = new FlyoutMenu({
		attachTo: 'stellant_app',
		activeFor: ["introduction,offerings_navigation","medrad_slideshow","smartpack_navigation","reliability_pillar","technology_pillar","scanner_slides","automated_documentation_slides","personalized_protocols_slide","data_driven_insights_slide","capital_access_program_slide","summary_page_slide","resources_slide"],
	  links: [
	  	{
	  		title: "Home",
	  		idName: "link1",
	  		className: "first-link",
				labelName: "lab1",
				goTo: "stellant_app.home.introduction"
			},
			{
				title: "Our Offering",
				idName: "link2",
				labelName: "lab2",
				goTo: "stellant_app.offerings_navigation.our_offerings"
			},
			{
				title: "MEDRAD<br>Stellant CT<br>Injection<br>System",
				idName: "link3",
				labelName: "lab3",
			},
			{
				title: "SmartPACK+",
				idName: "link4",
				labelName: "lab4",
			},
			{
				title: "Summary",
				idName: "link5",
				labelName: "lab5",
				goTo: "stellant_app.summary_page_slide.summary_page"
			},
			{
				title: "Resources",
				idName: "link6",
				labelName: "lab6",
				goTo: "stellant_app.resources_slide.resources"
			},
	  ]
	});

	// Main Menu (Bayer Logo)
	app.menu = new Menu({
		attachTo: 'stellant_app',
	  links: [
			{ title:"", goTo:"stellant_app.home.introduction" }
	  ]
	});

	// Loader
	app.loader = new Loader({ delay : 1000 , type : 'bar' });

	// Analytics
	app.analytics.init({ version: '0.1' });

  // Initialize presentation
  app.init();

  // Popups:
  // Attach Close Study Design
	app.elements['close-study'].addEventListener("click", function(){
		app.elements['study-design'].style.display = "none";
		app.elements['study-design-background'].style.display = "none";
		app.nav.enableSwipe();
	});

})(window);

// Opening PDFs:
// Tests browser agent,
// If a desktop, replaces ag.openPDF()
// with a function to open the PDF in a new window.
(function() {	
	var me = navigator.userAgent;
	console.log(me + " is userAgent"); 
	
	if (me.indexOf ( 'iPad' ) == -1 ) {
		// document.getElementById('presentation').className += " desktop";  	
		ag.openPDF = function ( filename ) {
			window.open(filename, 'resizable,scrollbars');
		}
		
		submitToConsole = function ( category , label , value ) {
			console.log ( category + ' | ' + label + " | " + value);
		}
		
		submitCustomEvent = submitToConsole;
		
	}
	
})();