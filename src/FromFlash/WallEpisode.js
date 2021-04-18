 //class WallEpisode extends SikoObject
//	{
		 var filename;
		 var episode;//:AutoLoadSWF;
		 var minClick;
		 var maxClick;
		 var statusTF = new TextField();
		 var filenameTF = new TextField();
		
		 function WallEpisode(filename, minClick, maxClick, debugLabelPos) {
			Log.i("loading " + filename);
			episode = new AutoLoadSWF(1080, 1920, filename);
			this.filename = filename;
			this.minClick = minClick;
			this.maxClick = maxClick;
			this.addChild(episode);
			var format = new TextFormat("Arial", 24);
			statusTF.defaultTextFormat = format;
			statusTF.text = String(1);
			statusTF.background = true;
			statusTF.backgroundColor = 0xffffff;
			statusTF.y = debugLabelPos;
			statusTF.x = 10;
			statusTF.alpha = 0.75;
			//this.addChild(statusTF);
			filenameTF.defaultTextFormat = format;
			filenameTF.wordWrap = true;
			filenameTF.width = 150;
			filenameTF.height = 200;
			filenameTF.background = true;
			filenameTF.backgroundColor = 0xffffff;
			filenameTF.text = filename;
			filenameTF.y = debugLabelPos + 30;
			filenameTF.x = 10;
			filenameTF.alpha = 0.75;
			//this.addChild(filenameTF);
				statusTF.alpha = 0;
				filenameTF.alpha = 0;
			
		}
		
		function gotoClick(click) {
			Log.i(filename + " " + click); // + " " + episode + " " + episode.mc + " " + episode.mc.framesLoaded);
			if ((click >= this.minClick) && (click <= this.maxClick)) {
				this.alpha = 1;
				Log.i("wall move : " + filename + " " + click); // + " " + (2 + Math.floor((click - this.minClick) * episode.mc.framesLoaded / (this.maxClick - this.minClick))) + " " + episode.mc.framesLoaded);
				if (episode.mc !=null) {
					episode.mc.gotoAndStop(2 + Math.floor((click - this.minClick) * episode.mc.framesLoaded / (this.maxClick - this.minClick))); 
					statusTF.alpha = 1;
					filenameTF.alpha = 1;
				//Log.i("currentFrame");
					statusTF.text = String(episode.mc.currentFrame);
				//Log.i("currentFrame done");
				}
				
			} else {
				this.alpha = 0;
				statusTF.alpha = 0;
				filenameTF.alpha = 0;
				if (episode.mc != null) {
					episode.mc.gotoAndStop(1);
				}
			}
		}
	//}