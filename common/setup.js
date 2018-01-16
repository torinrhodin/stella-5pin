(function(global) {
  
  // Creating our presentation and global namespace "app"
  // debug();
  global.app = new Presentation({
    type:'json',
    globalElements:[
    	'medradLogo',
    	'smartpackLogo',
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
	app.flyoutMenu = new FlyoutMenu({
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
				title: "Our offering",
				idName: "link2",
				labelName: "lab2",
				goTo: "stellant_app.offerings_navigation.our_offerings"
			},
			{
				title: "MEDRAD<sup>&reg;</sup><br>Stellant CT<br>Injection<br>System",
				idName: "link3",
				labelName: "lab3",
				parentGoTo: "stellant_app.medrad_navigation.medrad",
				isParent: true,
				subLinks: [
					[
						{
							title: "Contrast media",
							thumb: "content/img/contrast.jpg",
							goTo: "stellant_app.medrad_navigation.medrad"
						},
						{
							title: "Consumables",
							thumb: "content/img/consumables.jpg",
							goTo: "stellant_app.medrad_navigation.medrad"
						}
					],
					[]
				]
			},
			{
				title: "SmartPACK+",
				idName: "link4",
				labelName: "lab4",
				parentGoTo: "stellant_app.smartpack_intro.smartpack",
				isParent: true,
				subLinks: [
					[
						{
							title: "Reliability",
							thumb: "content/img/reliability.jpg",
							goTo: "stellant_app.reliability_pillar.reliability"
						},
						{
							title: "Technology",
							thumb: "content/img/technology.jpg",
							goTo: "stellant_app.technology_pillar.technology"
						},
						{
							title: "Access",
							thumb: "content/img/access.jpg",
							goTo: "stellant_app.capital_access_program_slide.capital_access_program"
						}
					],
					[
						{
							title: "Scanner connectivity",
							thumb: "content/img/scanner.jpg",
							goTo: "stellant_app.scanner_intro.scanner_connectivity_intro"
						},
						{
							title: "Automated<br>Documentation",
							thumb: "content/img/automated.jpg",
							goTo: "stellant_app.automated_documentation_intro.automated_documentation"
						},
						{
							title: "Personalized Protocols",
							thumb: "content/img/automated.jpg",
							goTo: "stellant_app.personalized_protocols_slide.personalized_protocols"
						},
						{
							title: "Data-driven insights",
							thumb: "content/img/data.jpg",
							goTo: "stellant_app.data_driven_insights_slide.data_driven_insights"
						}
					]
				]
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

  // Popups
	app.popup = new Popup({
		attachTo: 'stellant_app'
	});

	// Loader
	app.loader = new Loader({ delay : 1000 , type : 'bar' });

	// Analytics
	app.analytics.init({ version: '0.1' });

  // Initialize presentation
  app.init();

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