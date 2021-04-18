
	 /* ...
	 * @author DefaultUser (Tools -> Custom Arguments...)
	 */
	 //class AutoLoadSWF extends RectangularSprite  
	//{
		 var Loader;
		 var urlReq;
		 var mc;
		 var loaded = false;
		 function AutoLoadSWF(width, height, filename) 
		{
			super(width,height);
			loader = new Loader();
			loader.contentLoaderInfo.addEventListener(Event.INIT, initListener);
			loader.contentLoaderInfo.addEventListener(IOErrorEvent.IO_ERROR, errorListener);
			urlReq = new URLRequest(filename);
			Log.i("autoloadbitmap trying to load " + filename + " as url " + urlReq.url);
			try {
				loader.load(urlReq);
			} catch (e) {
				Log.e("auto load failed " + filename + " " + e.message);
			}
			
			
		}
		
		 function initListener(e) {
			
			Log.i("autoloadswf: " + specifiedWidth + "," + specifiedHeight + " " + loader.content.width + "," + loader.content.height);
		//	loader.content.width *= specifiedHeight / loader.content.height;
		//	loader.content.height = specifiedHeight;
		//	if (loader.content.width > specifiedWidth) {
		//		loader.content.height *= specifiedWidth / loader.content.width;
		//		loader.content.width = specifiedWidth;
				
		//	}
			//this.width = loader.content.width;
			//this.height = loader.content.height;
			loaded = true;
			mc = MovieClip(loader.content);
			Log.i(e + "loaded " + urlReq.url + " " + loader.content.width + "," + loader.content.height);
			
			addChild(mc);
		}
		 function errorListener(e) {
			Log.e(e + " no loaded " + urlReq.url);
		}
		

	//}
