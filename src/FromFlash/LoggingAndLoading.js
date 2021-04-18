	 // UsageLogger {
	// vars
	 var user ;
	 var URL ="http://localhost:8001/cgi/logentry.py?eventType=";
	 function UsageLogger() {
	}
	
	 function logEvent(eventType, eventDatum0, eventDatum1=null,eventDatum2=null) {
		if (eventType == "abandonSession") {
			doLoad(URL + eventType);
		} else if (eventType == "episodeEntry") {
			doLoad(URL + eventType + "&episode=" + eventDatum0);
		} else if (eventType == "episodeExit") {
			doLoad(URL + eventType + "&episode=" + eventDatum0);
		} else if (eventType == "answer") {
			doLoad(URL + eventType + "&question=" + eventDatum0 + "&answer=" + eventDatum1);
		} 
		//_root.cardreaderDebug.text += "logging event: " + Date() + " " + eventType + eventDatum0 + eventDatum1 + eventDatum2;
		//trace("logging event: " + Date() + " " + eventType + eventDatum0 + eventDatum1 + eventDatum2);
	}
	
	 function doLoad(URL) {
		var localurl = new URLLoader();
		//localxml.ignoreWhite = true;
		//var thisobj = this;
		//_root.cardreaderDebug.text = "logEvent  " + URL;
		//localxml.onLoad = function(success) {
			//if (success) {
				//trace("logEvent onload ");
				//_root.cardreaderDebug.text="logEvent onload ";
			//}
		//};
		var request = new URLRequest(URL);
		localurl.load(request);
	}
	 function setUser(userName) {
		user = userName;
	}
	//}