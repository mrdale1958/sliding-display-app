// Frame 7
log.i("loading WallEpisodes");
var wallWidth = 24904; 
//trace("config width " + GlobalParams.m_WallWidth);
var introOutroWidth = 0;
var realEpisodes = 74;
var endBuffer = 40;
var episodeWidth = ((wallWidth - 3*introOutroWidth) /realEpisodes); //-endBuffer;

function lowBound(episodeNumber) {
	return (episodeNumber - 2) * episodeWidth;
}
function highBound(episodeNumber) {
	return (episodeNumber + 1) * episodeWidth;
}

var pitch = (wallWidth - 2* endBuffer)/10;
var leftEnd = 0;
var rightEnd = 4 * (episodeWidth + endBuffer);
trace("left " + leftEnd + " right " + rightEnd)
//episodes.push(new WallEpisode("BGFull.swf", 1, wallWidth, 300));
episodes.push(new WallEpisode("BGLeft.swf", 1, wallWidth, 300));
//episodes.push(new WallEpisode("BGCenter.swf", 17600, 35200, 300));
//episodes.push(new WallEpisode("BGBlue.swf", 35200, wallWidth, 300));
episodes.push(new WallEpisode("left-section1.swf", leftEnd, rightEnd, 300));
leftEnd = rightEnd - 4 * endBuffer;
rightEnd = leftEnd + 6 * (episodeWidth + endBuffer);
trace("left " + leftEnd + " right " + rightEnd)
episodes.push(new WallEpisode("left-section2.swf", leftEnd, rightEnd, 300));
leftEnd = rightEnd - 6 * endBuffer;
rightEnd = leftEnd + 5 * (episodeWidth + endBuffer);
trace("left " + leftEnd + " right " + rightEnd)
episodes.push(new WallEpisode("left-section3.swf", leftEnd, rightEnd, 300));
leftEnd = rightEnd - 5 * endBuffer;
rightEnd = leftEnd + 5 * (episodeWidth + endBuffer);
trace("left " + leftEnd + " right " + rightEnd)
episodes.push(new WallEpisode("left-section4.swf", leftEnd, rightEnd, 300));
leftEnd = rightEnd - 5 * endBuffer;
rightEnd = leftEnd + 3 * (episodeWidth + endBuffer);
trace("left " + leftEnd + " right " + rightEnd)
episodes.push(new WallEpisode("left-section5.swf", leftEnd, rightEnd, 300));
leftEnd = rightEnd - 3 * endBuffer;
rightEnd = leftEnd + 4 * (episodeWidth + endBuffer);
trace("left " + leftEnd + " right " + rightEnd)
episodes.push(new WallEpisode("left-section6.swf", leftEnd, rightEnd, 300));
leftEnd = rightEnd - 4 * endBuffer;
rightEnd = leftEnd + 4 * (episodeWidth + endBuffer);


trace("left " + leftEnd + " right " + rightEnd)
episodes.push(new WallEpisode("right-section1.swf", leftEnd, rightEnd, 300));
leftEnd = rightEnd - 4 * endBuffer;
rightEnd = leftEnd + 5 * (episodeWidth + endBuffer);
trace("left " + leftEnd + " right " + rightEnd)
episodes.push(new WallEpisode("right-section2.swf", leftEnd, rightEnd, 300));
leftEnd = rightEnd - 5 * endBuffer;
rightEnd = leftEnd + 5 * (episodeWidth + endBuffer);
trace("left " + leftEnd + " right " + rightEnd)
episodes.push(new WallEpisode("right-section3.swf", leftEnd, rightEnd, 300));
leftEnd = rightEnd - 5 * endBuffer;
rightEnd = leftEnd + 5 * (episodeWidth + endBuffer);
trace("left " + leftEnd + " right " + rightEnd)
episodes.push(new WallEpisode("right-section4.swf", leftEnd, rightEnd, 300));
leftEnd = rightEnd - 5 * endBuffer;
rightEnd = leftEnd + 5 * (episodeWidth + endBuffer);
trace("left " + leftEnd + " right " + rightEnd)
episodes.push(new WallEpisode("right-section5.swf", leftEnd, rightEnd, 300));
leftEnd = rightEnd - 5 * endBuffer;
rightEnd = leftEnd + 5 * (episodeWidth + endBuffer);
trace("left " + leftEnd + " right " + rightEnd)
episodes.push(new WallEpisode("right-section6.swf", leftEnd, rightEnd, 300));
leftEnd = rightEnd - 5 * endBuffer;
rightEnd = leftEnd + 3 * (episodeWidth + endBuffer);
trace("left " + leftEnd + " right " + rightEnd)
episodes.push(new WallEpisode("right-section7.swf", leftEnd, rightEnd, 300));
leftEnd = rightEnd - 3 * endBuffer;
rightEnd = leftEnd + 4 * (episodeWidth + endBuffer);
trace("left " + leftEnd + " right " + rightEnd)
episodes.push(new WallEpisode("right-section8.swf", leftEnd, rightEnd, 300));
leftEnd = rightEnd - 4 * endBuffer;
rightEnd = leftEnd + 4 * (episodeWidth + endBuffer);
trace("left " + leftEnd + " right " + rightEnd)
episodes.push(new WallEpisode("right-section9.swf", leftEnd, rightEnd, 300));
leftEnd = rightEnd - 4 * endBuffer;
rightEnd = wallWidth ;
trace("left " + leftEnd + " right " + rightEnd)
episodes.push(new WallEpisode("right-section10.swf", leftEnd, rightEnd, 300));

for (var episode in episodes) {
	SWFHolder.addChild(episodes[episode]);
}

var autoPlayTimer = new Timer(10);
autoPlayTimer.addEventListener(TimerEvent.TIMER, moveRight);

function moveRight(ev) {
	fakeSensor++;
	frameMover(fakeSensor);
}

var waitTenSeconds = new Timer(10000,1);
waitTenSeconds.addEventListener(TimerEvent.TIMER, startMover);

function startMover(ev) {
	autoPlayTimer.start();
}
//waitTenSeconds.start();
frameMover(1);
																	  