// class SensorQueryObject extends EventDispatcher{
	// vars
		 var position = 0;
		 var m_XML;
		 var m_returnNode;
		 var m_theSocket;
		 var m_loopInterval;
		 var loopTimer;
		 var m_hostname;
		 var m_port;
		 var intervalID;
		 var m_MaxClicks = 36000;
		 var m_ShockPadWidth = 700;
		 const PARAM_UPDATE = "widthUpdate";
		 const PAD_UPDATE = "padUpdate";
		
		
	
		 function SensorQueryObject(hostname, port, loopInterval) {
			m_XML = new XML();
			var thisObj = this;
			position = 2;
			m_loopInterval = loopInterval;
			loopTimer = new Timer(m_loopInterval, 0);
			m_hostname = hostname;
			m_port = port;
			m_returnNode = new XMLNode(XMLNodeType.ELEMENT_NODE,"thenode");
			m_theSocket = new XMLSocket();
			configureListeners(m_theSocket);
			
		}
	
		  function configureListeners(dispatcher) {
            dispatcher.addEventListener(Event.CLOSE, closeHandler);
            dispatcher.addEventListener(Event.CONNECT, connectHandler);
            dispatcher.addEventListener(DataEvent.DATA, dataHandler);
            dispatcher.addEventListener(IOErrorEvent.IO_ERROR, ioErrorHandler);
            dispatcher.addEventListener(ProgressEvent.PROGRESS, progressHandler);
            dispatcher.addEventListener(SecurityErrorEvent.SECURITY_ERROR, securityErrorHandler);
        }
		 function closeHandler(event){
            trace("sensor closeHandler: " + event);
			loopTimer.stop();
        }

         function connectHandler(event) {
            trace("sensorconnectHandler: " + event);
			sendData("serialopen");
			loopTimer.addEventListener(TimerEvent.TIMER, GetSensorData);
			loopTimer.start();
        }

         function dataHandler(event) {
            trace("sensordataHandler: " + event);
 			//var ev:SensorEvent = new SensorEvent(SensorQueryObject.ACTION);
				//ev.SensorMessage = event.data;
				if (event.data.indexOf("MaxClicks:") == 0) {
					m_MaxClicks=Number(event.data.split(":")[1]);
					dispatchEvent(new DataEvent(SensorQueryObject.PARAM_UPDATE,false,false,String(m_MaxClicks)));
				} else if (event.data.indexOf("ShockPadWidth:") == 0) {
					m_ShockPadWidth=Number(event.data.split(":")[1]);
					dispatchEvent(new DataEvent(SensorQueryObject.PAD_UPDATE,false,false,String(m_ShockPadWidth)));
				} else if (event.data.indexOf("Welcome to the") == 0) {
					return;
				} else {
					dispatchEvent(event);
				}
	       }

         function ioErrorHandler(event) {
            trace("sensorioErrorHandler: " + event);
        }

         function progressHandler(event) {
            trace("sensorprogressHandler loaded:" + event.bytesLoaded + " total: " + event.bytesTotal);
        }

         function securityErrorHandler(event) {
            trace("sensorsecurityErrorHandler: " + event);
        }

		 function doAction() {
		}
	
		 function GetPosition(){
			//trace("returning " + position);
			return position;
		}
		
		
		 function StartSensing() {
			trace("opening sensor socket " + m_hostname + " " + m_port);
			m_theSocket.connect(m_hostname, m_port);
			
			
		}
		
		 function StopSensing() {
			sendData("closeserial");
			//sendData("close");
		}
		
		 function GetSensorData(e) {
			//trace("requesting data " + e);
			sendData("get");
		}
	
		 function sendData(dataString) {
			m_returnNode.attributes.myData = dataString;
			//m_XML.appendChild(m_returnNode);
			//trace(myXML);
			m_theSocket.send('"' + dataString+'"\n');
		}
	//}
	