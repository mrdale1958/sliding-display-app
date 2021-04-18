	// These numbers are for low res sensor
		const m_trolleyAddress = "localhost";
		const m_trolleyPort = 7000;
		const m_IdleTimeout = 60000;
		const m_wallWidth = 17700;
		const m_screenWidth = 1000;
		const wrongAnswerTimeout = 10000;
		const rightAnswerTimeout = 10000;
		const startPadWidth = 400;
		const PITimeout = 5000;
		const PIReleaseFrame = 35000;
		const debugging = true;
		const PointOfNoReturn = 4000;
		// private stuff
		const xmlFile = "wallConfig.xml";
		var m_colormaps;
		var globalParameters = new Object();
	
		function GlobalParams() {
			trace("loading globals");
		}
		function parseXMLFile() {
			var loader = new URLLoader();
			configureListeners(loader);
			var request = new URLRequest(xmlFile);
			try {
				loader.load(request);
			} catch (error) {
				log.e("Unable to load requested document.", error);
			}
		}
		function configureListeners(dispatcher) {
			dispatcher.addEventListener(Event.COMPLETE, completeHandler);
			dispatcher.addEventListener(Event.OPEN, openHandler);
			dispatcher.addEventListener(ProgressEvent.PROGRESS, progressHandler);
			dispatcher.addEventListener(SecurityErrorEvent.SECURITY_ERROR, securityErrorHandler);
			dispatcher.addEventListener(HTTPStatusEvent.HTTP_STATUS, httpStatusHandler);
			dispatcher.addEventListener(IOErrorEvent.IO_ERROR, ioErrorHandler);
		}
		function completeHandler(event){
			var loader = URLLoader(event.target);
			log.i("completeHandler: " + loader.dataFormat + "\n" + loader.data);
			var tree = new XML(event.target.data);
			parseXML(tree);
		}
		function openHandler(event) {
			log.i("openHandler: " + event);
		}
		function progressHandler(event) {
			log.i("progressHandler loaded:" + event.bytesLoaded + " total: " + event.bytesTotal);
		}
		function securityErrorHandler(event) {
			log.e("securityErrorHandler: " + event);
		}
		function httpStatusHandler(event) {
			log.i("httpStatusHandler: " + event);
		}
		function ioErrorHandler(event) {
			log.e("ioErrorHandler: " + event);
		}
		function parseXML(XMLObj) {
			var curNode; //:XMLNode;
			log.i("parsing " + XMLObj.localName);
			for  eli in XMLObj.children() {
				trace(eli.localName() + " : " + eli.attribute("name") + " " + eli.attribute("value"))
				;
				switch (eli.localName()) {
					case "configvar" :
						//globalParameters.append({curNode.attributes.name.valueOf():curNode.attributes.value});
						GlobalParams[eli.attribute("name")] = eli.attribute("value");
						trace(GlobalParams[eli.attribute("name")]+" "+eli.attribute("value"));
						break;
					case "configvarboolean" :
						GlobalParams[eli.attribute("name")] = Boolean(eli.attribute("value"));
						//globalParameters.append({curNode.attributes.name, Boolean(Number(curNode.attributes.value))});
						trace("configvarboolean GlobalParams."+eli.attribute("name")+" "+GlobalParams[eli.attribute("name")]);
						break;
					case "configvarnumber" :
						GlobalParams[eli.attribute("name")] = Number(eli.attribute("value"));
						//globalParameters.append({curNode.attributes.name, Number(curNode.attributes.value)});
						trace("configvarnumber " + GlobalParams[eli.attribute("name")] + " GlobalParams."+eli.attribute("name")+" "+Number(eli.attribute("value")));
						break;
					default :
						break;
				}
			
			}
		}
	}