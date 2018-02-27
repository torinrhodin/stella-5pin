(function(global) {
  
  // Creating our presentation and global namespace "app"
  // debug();
  global.app = new Presentation({
    type:'json',
    globalElements:[
    	'medradLogo'
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
							goTo: "stellant_app.medrad_navigation.medrad",
							popupLink: "injections"
						},
						{
							title: "Consumables",
							thumb: "content/img/consumables.jpg",
							goTo: "stellant_app.medrad_navigation.medrad",
							popupLink: "consumables"
						}
					],
					[]
				]
			},
			{
				title: "EasiPak",
				idName: "link4",
				labelName: "lab4",
				parentGoTo: "stellant_app.smartpack_collection.smartpack",
				isParent: true,
				subLinks: [
					[
						{
							title: "Reliability",
							thumb: "content/img/reliability.jpg",
							goTo: "stellant_app.smartpack_collection.reliability"
						},
						{
							title: "Technology",
							thumb: "content/img/technology.jpg",
							goTo: "stellant_app.smartpack_collection.technological_deployments"
						},
						{
							title: "Access",
							thumb: "content/img/access.jpg",
							goTo: "stellant_app.smartpack_collection.capital_access_program"
						}
					],
					[
						{
							title: "Scanner connectivity",
							thumb: "content/img/scanner.jpg",
							goTo: "stellant_app.smartpack_collection.scanner_connectivity_intro"
						},
						{
							title: "Automated<br>documentation",
							thumb: "content/img/automated.jpg",
							goTo: "stellant_app.smartpack_collection.automated_documentation"
						},
						{
							title: "Personalized protocols",
							thumb: "content/img/automated.jpg",
							goTo: "stellant_app.smartpack_collection.personalized_protocols"
						},
						{
							title: "Data-driven insights",
							thumb: "content/img/data.jpg",
							goTo: "stellant_app.smartpack_collection.data_driven_insights"
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
			{
				title: "Tools",
				idName: "link7",
				labelName: "lab7",
				goTo: "stellant_app.tools_slide.tools"
			}
	  ]
	});

	// Main Menu (Bayer Logo)
	app.menu = new Menu({
		attachTo: 'stellant_app',
	  headerLinks: [
			{ title:"", goTo:"stellant_app.home.introduction" }
	  ],
	  footerLinks: [
		  { title:"", goTo:"stellant_app.smartpack_collection.smartpack" }
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