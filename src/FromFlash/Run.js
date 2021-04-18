// emerge from idle
function run() {
	try {
		removeChild(idleEpisode);
		trace("removed idle child");
	} 
	catch (e) {
		Log.e("tried to remove idle child but it wasn't there");
	}
}			
