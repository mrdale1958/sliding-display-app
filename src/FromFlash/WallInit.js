// Frame 1
stage.addEventListener(KeyboardEvent.KEY_UP,keyHandler);
//addEventListener(KeyboardEvent.KEY_DOWN,movedisplay);
Log.i ("added listener");

function movedisplay(ev) {
	Log.i (currentFrame + ev);
	if (ev.keyCode == Keyboard.LEFT) {
		gotoAndStop(currentFrame - 1);
	} else if (ev.keyCode == Keyboard.RIGHT) {
		gotoAndStop(currentFrame + 1);
	}
}
//stop();







var episodes = [];

var sensorwatcher = new SensorQueryObject(GlobalParams.m_trolleyAddress, GlobalParams.m_trolleyPort, 100);
sensorwatcher.StartSensing();
sensorwatcher.addEventListener(SensorQueryObject.PARAM_UPDATE,updateMaxClicks);
sensorwatcher.addEventListener(SensorQueryObject.PAD_UPDATE,updatePadWidth);
var globalParameters = new GlobalParams();
globalParameters.parseXMLFile();
var waitingForCardSwipe = true;
//import UsageLogger;

function updateMaxClicks(ev) {
	GlobalParams.m_wallWidth = Number(ev.data);
}

function updatePadWidth(ev) {
	GlobalParams.startPadWidth = Number(ev.data);
}


stage.displayState = StageDisplayState.FULL_SCREEN;
Mouse.hide();
var forceFrame = "";
var forceFrameLeft = "";
var forceFrameRight = "";
globals.data.YesChoices = new Array();
globals.data.RealFrame = 0;
function resetVars() {
globals.data.drawnOnceAlready = false;
globals.data.spunWheels = false;
globals.data.currentEpisode = -1;
globals.data.previousEpisode = -1;
globals.data.questionsAnswered4yn =  false;
globals.data.theAnswer1 = "";
globals.data.theAnswer2 = "";
globals.data.theAnswer3 = "";
globals.data.theAnswer4 = "";
globals.data.Q4YesAnswer = "";
globals.data.Q4NoAnswer = "";
globals.data.questionsAnswered1 = false;
globals.data.questionsAnswered2 = false;
globals.data.questionsAnswered3 = false;
globals.data.questionsAnswered4 = false;
globals.data.questionsAnswered5 = false;
forceFrame = "";
forceFrameLeft = "";
forceFrameRight = "";
globals.data.openFlag1 = false;
globals.data.openFlag2 = false;
globals.data.openFlag3 = false;
globals.data.openFlag4 = false;
globals.data.openFlag5 = false;
globals.data.fastFactSeen = false;
globals.data.fastFactSeen2 = false;
globals.data.fastFactSeen3 = false;
globals.data.fastFactSeen4 = false;
globals.data.fastFactSeen5 = false;
globals.data.yesSelections = new Array();
globals.data.NoSelections = new Array();
globals.data.Q4Y_done = false;
globals.data.pertussisSeen = false;
globals.data.yesSelectionsCount = 0;
}
resetVars();
//if (!GlobalParams.debugging) Mouse.hide();
//mystepper._visible = GlobalParams.debugging;
//leftB._visible = GlobalParams.debugging;
//stopB._visible = GlobalParams.debugging;
//rightB._visible = GlobalParams.debugging;
//cardreaderDebug._visible = GlobalParams.debugging;
//idleDebug._visible = GlobalParams.debugging;
var framesByName = {};
function populateFramesByName()  {
	for (var lbl = 0; lbl < currentScene.labels.length; lbl++ ) {
		framesByName[currentScene.labels[lbl].name] = currentScene.labels[lbl].frame;
		Log.i(currentScene.labels[lbl].name + ":"+framesByName[currentScene.labels[lbl].name]);
	}
}
populateFramesByName();


function goIdle(e){
	Log.i("going idle");
	//clearInterval(waitToReadItIdle);
	globals.data.started = "notyet";
	globals.data.theTest = "notest";
	waitingForCardSwipe = true;	
	userLog.logEvent("abandonSessionGoIdle", 0);
				//idleDebug.text = "in goIdle";

	gotoAndStop("idleScreen");
}

var myListener = new Object();
var mainIdleTimeout = new Timer(GlobalParams.m_IdleTimeout,1); 
mainIdleTimeout.addEventListener(TimerEvent.TIMER, goIdle);
mainIdleTimeout.start();
function releaseSplashScreen(){
	Log.i("getting started");
	//clearInterval(waitToReadItIdle)
	mainIdleTimeout.start();
	//clearInterval(waitToReadItAa);
	//clearInterval(waitToReadItA);
	//clearInterval(waitToReadItB);
	//clearInterval(waitToReadItC);
	//clearInterval(waitToReadItD);
	if ((globals.data.RealFrame<GlobalParams.startPadWidth)) {
		Log.i("getting started");
		waitingForCardSwipe = false;
		//Key.removeListener(myListener);
		//startscreen.x = 9999;
		globals.data.started = "yeahstarted";
		globals.data.theTest = "notest";
		globals.data.aFrame = -1;
		gotoAndStop("wallSession");
	} else {
			Log.i("not getting started" + globals.data.RealFrame + "." +GlobalParams.startPadWidth +".");
	}
}

myListener.onKeyDown = function () {
    Log.i ("You pressed a key.");
}
myListener.onKeyUp = function () {
    Log.i ("You released a key.");
	releaseSplashScreen();
}
//Key.addListener(myListener);
function notifyCardRead(ev) {
	var theMsg = ev.data;
	Log.i("got  new card:" + theMsg);
	//cardreaderDebug.text += "got  new card:" + theMsg;
	if (isNaN(Number(theMsg))) {
		Log.i("cardreaderDebug.text junk");
	} else {
		releaseSplashScreen();
	}
}
sensorwatcher.addEventListener(DataEvent.DATA,wallMove);
function wallMove(ev
	) {
	Log.i("wallMove " + ev.data);
	var theMsg = ev.data;
	if (globals.data.RealFrame == Number(theMsg)) return;
	globals.data.RealFrame = Number(theMsg);
		//Log.i("2wallMove " + ev.data);
//mystepper.text=theMsg;
	mainIdleTimeout.reset();
	if (!mainIdleTimeout.running) {
		mainIdleTimeout.start();
	}
	if ((Number(theMsg)<GlobalParams.m_wallWidth) && (Number(theMsg)>GlobalParams.startPadWidth)) {
		frameMover(theMsg);
	} 
	gotoAndStop("wallSession");
	
}


var userLog = new UsageLogger();
//stop();
//swiper.onRelease = function() {
	//globals.data.aFrame = -1;
	//gotoAndPlay(2);
//}
//Log.i("touchHere" + touchHere);
function mouseHandler(ev) {
	gotoAndStop("PI");
}
//stage.addEventListener(KeyboardEvent.KEY_DOWN, keyHandler);
function frameNumberFromLabel(label)  {
	var retVal = 1;
	if (!isNaN(framesByName[label])) retVal = framesByName[label];
	/*for (var lbl:Number = 0; lbl < currentScene.labels.length; lbl++ ) {
		//Log.i(lbl + " " + currentScene.labels[lbl].frame + " " + currentScene.labels[lbl].name + " " + label);
		if (currentScene.labels[lbl].name == label) {
			retVal = currentScene.labels[lbl].frame;
			return retVal;
		}
	}
*/	return retVal;
}

var fakeSensor = 0;

function keyHandler(ev){
	Log.i("keyHandler " + ev.keyCode + " fakeSensor " + fakeSensor);
	mainIdleTimeout.reset();
	if (!mainIdleTimeout.running) {
		mainIdleTimeout.start();
	}
	if (forceFrame != "") {
		gotoAndStop(forceFrame);
		forceFrame = "";
		return;
	}
	var theNextFrame = 1;
	if (ev.keyCode == 39) {
		if (forceFrameRight != "") {
			theNextFrame = frameNumberFromLabel(forceFrameRight);
			Log.i("force right " + forceFrameRight + " " + theNextFrame);
		} else if (forceFrame != "") {
			theNextFrame = frameNumberFromLabel(forceFrame);
			forceFrame = "";
		} else {
			theNextFrame = Math.min(currentFrame + 1, currentScene.numFrames);
		}
		forceFrameRight = "";
		forceFrameLeft = "";
		//gotoAndStop(theNextFrame);
		fakeSensor++;
		frameMover(fakeSensor);
		
	} else if (ev.keyCode == 37) {
		if (forceFrameLeft != "") {
			theNextFrame = frameNumberFromLabel(forceFrameLeft);
			forceFrameLeft = "";
		} else if (forceFrame != "") {
			theNextFrame = frameNumberFromLabel(forceFrame);
			forceFrame = "";
		} else {
			theNextFrame = Math.max(currentFrame - 1, 0);
		} 
		forceFrameRight = "";
			forceFrameLeft = "";
		// gotoAndStop(theNextFrame);
		fakeSensor--;
		frameMover(fakeSensor);
		
	} if (ev.keyCode == 38) {
		if (forceFrameRight != "") {
			theNextFrame = frameNumberFromLabel(forceFrameRight);
			Log.i("force right " + forceFrameRight + " " + theNextFrame);
		} else if (forceFrame != "") {
			theNextFrame = frameNumberFromLabel(forceFrame);
			forceFrame = "";
		} else {
			theNextFrame = Math.min(currentFrame + 1, currentScene.numFrames);
		}
		forceFrameRight = "";
		forceFrameLeft = "";
		//gotoAndStop(theNextFrame);
		fakeSensor += 25;
		frameMover(fakeSensor);
		
	} else if (ev.keyCode == 40) {
		if (forceFrameLeft != "") {
			theNextFrame = frameNumberFromLabel(forceFrameLeft);
			forceFrameLeft = "";
		} else if (forceFrame != "") {
			theNextFrame = frameNumberFromLabel(forceFrame);
			forceFrame = "";
		} else {
			theNextFrame = Math.max(currentFrame - 1, 0);
		} 
		forceFrameRight = "";
			forceFrameLeft = "";
		// gotoAndStop(theNextFrame);
		fakeSensor -= 25;
		frameMover(fakeSensor);
		
	} else if (ev.keyCode == 187) {stage.addEventListener(KeyboardEvent.KEY_UP, keyHandler);
		stage.addEventListener(KeyboardEvent.KEY_DOWN, keyHandler);
	} else if (ev.keyCode == 189) {stage.addEventListener(KeyboardEvent.KEY_DOWN, keyHandler);
		stage.addEventListener(KeyboardEvent.KEY_UP, keyHandler);
	} else if (ev.keyCode == 49) {gotoAndStop("Module1_1");
	} else if (ev.keyCode == 50) {gotoAndStop("Module2_1");
	} else if (ev.keyCode == 51) {gotoAndStop("Module3_1");
	} else if (ev.keyCode == 52) {gotoAndStop("Module4_1");
	} else if (ev.keyCode == 53) {gotoAndStop("Module5_1");
	} else if (ev.keyCode == 54) {Log.i("6");globals.data.theAnswer1="";globals.data.questionsAnswered1=false;gotoAndStop("theAnswers1"); //Q
	} else if (ev.keyCode == 55) {Log.i("7");globals.data.theAnswer2="";globals.data.questionsAnswered2=false;gotoAndStop("theAnswers2"); //W
	} else if (ev.keyCode == 56) {Log.i("8");globals.data.theAnswer3="";globals.data.questionsAnswered3=false;gotoAndStop("theAnswers3"); //E
	} else if (ev.keyCode == 57) {
		Log.i("9");
		globals.data.theAnswer4="";
		globals.data.Q4Y_done=false;
		globals.data.yesSelectionsCount=0;
		globals.data.questionsAnswered4=false;
		globals.data.yesSelections = new Array();
		globals.data.NoSelections = new Array();
		gotoAndStop("theAnswers4"); //R
		} else if (ev.keyCode == 48) {releaseSplashScreen();
//} else if (ev.keyCode == 84) {gotoAndStop("Module5_1"); //T
	} 
	gotoAndStop("wallSession");
}




// number stepper
var allActiveFrames = frameNumberFromLabel("lastFrame") - frameNumberFromLabel("startFrame"); //t1Length+t1e1Length+t2e2Length+t3e3Length+t4e4Length+t5e5Length;
var allFrames = GlobalParams.startPadWidth+allActiveFrames;

globals.data.previousEpisode = globals.data.currentEpisode;

Log.i("total number of frames"+allFrames);

//globals.data.started = "notyet";
globals.data.preFrame = 0;

var form = new Object();
form.change = function(eventObj) {
	Log.i("Value changed to "+eventObj.target.value);
	globals.data.masterFrame = eventObj.target.value;
	frameMover(globals.data.masterFrame);
};
//myStepper.addEventListener("change",form);
//startscreen.removeMovieClip();
function frameMover(rawFrame) {
	var previousEpisode;
	var frame;
	sensorLoc.text = String(rawFrame);
	Log.i(episodes.length + " moving to " + rawFrame);
	for (var episode in episodes) {
		Log.i("moving " + episode + " to " + rawFrame);
		episodes[episode].gotoClick(rawFrame);
	}
	//GreenStripes.x = -(rawFrame * (GreenStripes.width-1080) / 30000);
}
//stop();
