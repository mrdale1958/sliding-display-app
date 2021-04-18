   
   
	
	
	
	

	

  // RectangularSprite extends Sprite {

		//
		// The default warning timeout in millis
		//
		 const WARNING_TIMEOUT = 1000;

		//
		// Constants defining allowed glow modes
		//
		const  TOUCH_GLOW = 0;
		const  WARNING_GLOW = 1;

		//
		// Glow Colors
		//
		const TOUCH_GLOW_COLOR = 0x00FF00;
		const WARNING_GLOW_COLOR = 0xFF0000;

		//
		// Holds the width and height specified at construction time
		//
        var specifiedWidth;
        var specifiedHeight;

		//
		// The rotation angle from the center to the upper left (default) registration
		// point (cached to facilitate future rotation calcs)
		//
        var rotationAngleOffset;

		//
		// The diagonal distance from the center to the upper left (default) registration
		// point (cached to facilitate future rotation calcs)
        //
        var rotRadius;

		//
		// The touch point becomes a movement center and rotational axis
		//
		 var touchPoint;

		//
		// Timer used for warning glow timeouts
		//
		 var warningTimer;

		//
		// The glow filters to use for touches and warnings
		//
		 static var touchGlow = new GlowFilter(  TOUCH_GLOW_COLOR, 0.7, 8, 8, 4, 1, false, false );
		 static var warningGlow = new GlowFilter( WARNING_GLOW_COLOR, 0.7, 8, 8, 4, 1, false, false );

		//
		//
		//
		// RectangularSprite( w, h )
		// 		w - The width of the RectangularSprite in pixels
		//		h - The height of the RectangularSprite in pixels
		// Constructs a new rect and caches some values that will be useful
		// for rotations.
		//
         function RectangularSprite( w, h ) {
			super();
            specifiedWidth = w;
            specifiedHeight = h;
            rotationAngleOffset = Math.atan( w / h );
            rotRadius = Math.sqrt( ( specifiedWidth * specifiedWidth ) +
								   ( specifiedHeight * specifiedHeight ) ) / 2;
			touchPoint = getCenter();
			warningTimer = new Timer( WARNING_TIMEOUT );
			warningTimer.addEventListener( TimerEvent.TIMER, removeWarningGlow );
        }

		//
		// setTouchPoint( tp )
		// 		tp - The point in local RectangularSprite coordinates of the
		//				   new touchPoint movement center and rotational axis
		//
		 function setTouchPoint( tp ) {
			trace( "Setting touch point center is " + getCenter() );
			trace( "New touch point local coords " + tp );
			var center = getCenter();
			var localCenter = this.globalToLocal( center );
			var distance = Point.distance( tp, localCenter );
			var angle = Math.atan2( ( tp.y - localCenter.y ), ( tp.x - localCenter.x ) );
			var rotAngle = this.rotation * MathExtensions.DEGREES_TO_RADIANS;
			touchPoint = new Point( localCenter.x + distance * Math.cos( rotAngle + angle ),
			                        localCenter.y + distance * Math.sin( rotAngle + angle ) );
			trace( "NEW TOUCH POINT " + touchPoint );
			trace( "Set touch point center is " + getCenter() );
		}

		 function addGlow( glowType ) {
			this.filters = [];
			switch( glowType ) {
				case TOUCH_GLOW:
					this.filters = [ touchGlow ];
					break;
				case WARNING_GLOW:
					this.filters = [ warningGlow ];
					warningTimer.start();
					break;
			}
		}

		 function removeGlow() {
			this.filters = [];
		}

		 function removeWarningGlow( e ) {
			warningTimer.stop();
			removeGlow();
		}

		//
		// getTouchPoint()
		// Returns the current touch point
		//
		 function getTouchPoint() {
			return touchPoint;
		}

		//
		// getSpecifiedWidth()
		// Returns the width specified at construction time for the RectangularSprite
		// Note that this differs from the width obtained by consulting the
		// object's width property (which accounts for rotation and other AS3
		// weirdnesses).
		//
		 function getSpecifiedWidth() {
			return specifiedWidth;
		}

		//
		// getSpecifiedHeight()
		// Returns the height specified at construction time for the RectangularSprite
		// Note that this differs from the height obtained by consulting the
		// object's height property (which accounts for rotation and other AS3
		// weirdnesses).
		//
		 function getSpecifiedHeight() {
			return specifiedHeight;
		}

		//
		// getCurrentWidth()
		// Returns the width of the RectangularSprite specified at construction time times
		// its current x-scale factor.
		//
		 function getCurrentWidth() {
			return getSpecifiedWidth() * this.scaleX;
		}

		//
		// getCurrentHeight()
		// Returns the height of the RectangularSprite specified at construction time times
		// its current y-scale factor.
		//
		 function getCurrentHeight() {
			return getSpecifiedHeight() * this.scaleY;
		}

		//
		// scaleUniformlyAboutCenter( scaleFactor )
		// Scales the RectangularSprite's x and y-directions equally and
		// assures that the newly scaled RectangularSprite is centered at the same place as
		// before this call.
		//
		 function scaleUniformlyAboutCenter( scaleFactor ) {
			var center = getCenter();
			this.scaleX *= scaleFactor;
			this.scaleY *= scaleFactor;
			centerAt( center.x, center.y );
		}

		 function scaleUniformlyAboutCenterAbsolute( scaleFactor ) {
			var center = getCenter();
			this.scaleX = scaleFactor;
			this.scaleY = scaleFactor;
			centerAt( center.x, center.y );
		}

		//
		// getCenter()
		//	 Returns the current center point of the RectangularSprite in stage coordinates as a Point
		//
         function getCenter() {
            var xOffset = this.scaleX * rotRadius * Math.sin( rotationAngleOffset  -
                                                            ( this.rotation * MathExtensions.DEGREES_TO_RADIANS ) );
            var yOffset = this.scaleY * rotRadius * Math.cos( rotationAngleOffset -
                                                            ( this.rotation * MathExtensions.DEGREES_TO_RADIANS ) );
            var result = new Point( this.x + xOffset, this.y + yOffset );
            return result;
        }

		//
		// rotateAroundCenter( angleDegrees )
		//		angleDegrees - The angle to rotate in degrees
		//	Rotates the RectangularSprite about its center point by the specified rotation angle
		//
         function rotateAroundCenter( angleDegrees ) {
			// Works by moving the rect temporarily so its center is at the
			// corner registration point, then rotates, then translates
			// RectangularSprite back to center
            var center = getCenter();
			var m = this.transform.matrix;
			m.tx -= center.x;
			m.ty -= center.y;
			m.rotate( angleDegrees * MathExtensions.DEGREES_TO_RADIANS );
			m.tx += center.x;
			m.ty += center.y;
			this.transform.matrix = m;
        }

		 function rotateAroundTouchPoint( angleDegrees ) {
			var center = getCenter();
			var m = this.transform.matrix;
			m.tx -= ( this.x + touchPoint.x );
			m.ty -= ( this.y + touchPoint.y );
			m.rotate( angleDegrees * MathExtensions.DEGREES_TO_RADIANS );
			m.tx += ( this.x + touchPoint.x );
			m.ty += ( this.y + touchPoint.y );
			this.transform.matrix = m;
		}

		//
		// centerAt( centerX, centerY )
		//		centerX - The stage x-coord to move the RectangularSprite to
		//		centerY - THe stage y-coord to move the RectangularSprite to'
		//	Moves the RectangularSprite so that its center coincides with the specified
		//  center coordinates.
		//
         function centerAt( centerX, centerY ) {
			//trace( "CENTERING AT " + new Point( centerX, centerY ) );
            var center = getCenter();
            var xOffset = center.x - this.x;
            var yOffset = center.y - this.y;
            this.x = centerX - xOffset;
            this.y = centerY - yOffset;
        }

		//
		// centerAtTouchPoint( newX, newY )
		//		newX - The new x-coord of the object based on the touch point
		//      newY - THe new y-coord of the object based on the touch point
		// Moves the object so that the object's touch point is at the specified global coordinates
		//
		 function centerAtTouchPoint( newX, newY ) {
			// trace( "CENTER AT TOUCH POINT - (x,y), center(x,y), touchPoint(x,y), (newX, newY)" )
			// trace( new Point( this.x, this.y ) + ", " + getCenter() + ", " + getTouchPoint() + ", " + new Point( newX, newY ) );
			var center = getCenter();
			var localCenter = this.globalToLocal( center );
			// var tpToCenterDistance = Point.distance( touchPoint, localCenter );
			var offsets = touchPoint.subtract( localCenter );
			centerAt( newX - offsets.x,
			          newY - offsets.y );
		}

		//
		// rotateTowards( lookAtX, lookAtY )
		//		lookAtX - Stage x-coord to orient the top edge of the RectangularSprite to
		//		lookAtY - Stage y-coord to orient the top edge of the RectangularSprite to
		//	Rotates the RectangularSprite about its center so that the top edge is perpendicular
		//	to the line between the RectangularSprite's center coords and the specified look-at coords.
		//  The top edge of the RectangularSprite is the top edge defined when the RectangularSprite was constructed
		//  with a zero rotation angle.
		 function rotateTowards( lookAtX, lookAtY ) {
			var center = getCenter();
			var deltaX = lookAtX - center.x;
			var deltaY = lookAtY - center.y;

			// The angle from the center of the RectangularSprite to the look-at point
			var angle = Math.atan2( deltaY, deltaX );

			// We need to cancel out the current rotation, get perpendicular, and convert to degrees
			rotateAroundCenter( -this.rotation + 90 + ( angle * MathExtensions.RADIANS_TO_DEGREES ) );
		}

		 function rotateTouchPointTowards( lookAtX, lookAtY ) {
			var center = getCenter();
			var centerDeltaX = lookAtX - center.x;
			var centerDeltaY = lookAtY - center.y;
			var centerAngle = Math.atan2( centerDeltaY, centerDeltaX );
			var tpGlobal = this.localToGlobal( touchPoint );
			var tpDeltaX = lookAtX - tpGlobal.x;
			var tpDeltaY = lookAtY - tpGlobal.y;
			var tpAngle = Math.atan2( tpDeltaY, tpDeltaX );
			//trace( "ROTATE" );
			//trace( "Center angle" + ( centerAngle * MathExtensions.RADIANS_TO_DEGREES ) + ", tp angle " + ( tpAngle * MathExtensions.RADIANS_TO_DEGREES ) );
			rotateAroundTouchPoint( -this.rotation + 90 + ( ( centerAngle - ( centerAngle - tpAngle ) ) * MathExtensions.RADIANS_TO_DEGREES ) );
			// setTouchPoint( touchPoint );
		}

   // }	