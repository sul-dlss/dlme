// openseadragon@5.0.1 downloaded from https://ga.jspm.io/npm:openseadragon@5.0.1/build/openseadragon/openseadragon.js

var e=typeof globalThis!=="undefined"?globalThis:typeof self!=="undefined"?self:global;var t={};
/**
 * All required and optional settings for instantiating a new instance of an OpenSeadragon image viewer.
 *
 * @typedef {Object} Options
 * @memberof OpenSeadragon
 *
 * @property {String} id
 *     Id of the element to append the viewer's container element to. If not provided, the 'element' property must be provided.
 *     If both the element and id properties are specified, the viewer is appended to the element provided in the element property.
 *
 * @property {Element} element
 *     The element to append the viewer's container element to. If not provided, the 'id' property must be provided.
 *     If both the element and id properties are specified, the viewer is appended to the element provided in the element property.
 *
 * @property {Array|String|Function|Object} [tileSources=null]
 *     Tile source(s) to open initially. This is a complex parameter; see
 *     {@link OpenSeadragon.Viewer#open} for details.
 *
 * @property {Number} [tabIndex=0]
 *     Tabbing order index to assign to the viewer element. Positive values are selected in increasing order. When tabIndex is 0
 *     source order is used. A negative value omits the viewer from the tabbing order.
 *
 * @property {Array} overlays Array of objects defining permanent overlays of
 *     the viewer. The overlays added via this option and later removed with
 *     {@link OpenSeadragon.Viewer#removeOverlay} will be added back when a new
 *     image is opened.
 *     To add overlays which can be definitively removed, one must use
 *     {@link OpenSeadragon.Viewer#addOverlay}
 *     If displaying a sequence of images, the overlays can be associated
 *     with a specific page by passing the overlays array to the page's
 *     tile source configuration.
 *     Expected properties:
 *     * x, y, (or px, py for pixel coordinates) to define the location.
 *     * width, height in point if using x,y or in pixels if using px,py. If width
 *       and height are specified, the overlay size is adjusted when zooming,
 *       otherwise the size stays the size of the content (or the size defined by CSS).
 *     * className to associate a class to the overlay
 *     * id to set the overlay element. If an element with this id already exists,
 *       it is reused, otherwise it is created. If not specified, a new element is
 *       created.
 *     * placement a string to define the relative position to the viewport.
 *       Only used if no width and height are specified. Default: 'TOP_LEFT'.
 *       See {@link OpenSeadragon.Placement} for possible values.
 *
 * @property {String} [xmlPath=null]
 *     <strong>DEPRECATED</strong>. A relative path to load a DZI file from the server.
 *     Prefer the newer Options.tileSources.
 *
 * @property {String} [prefixUrl='/images/']
 *     Prepends the prefixUrl to navImages paths, which is very useful
 *     since the default paths are rarely useful for production
 *     environments.
 *
 * @property {OpenSeadragon.NavImages} [navImages]
 *     An object with a property for each button or other built-in navigation
 *     control, eg the current 'zoomIn', 'zoomOut', 'home', and 'fullpage'.
 *     Each of those in turn provides an image path for each state of the button
 *     or navigation control, eg 'REST', 'GROUP', 'HOVER', 'PRESS'. Finally the
 *     image paths, by default assume there is a folder on the servers root path
 *     called '/images', eg '/images/zoomin_rest.png'.  If you need to adjust
 *     these paths, prefer setting the option.prefixUrl rather than overriding
 *     every image path directly through this setting.
 *
 * @property {Boolean} [debugMode=false]
 *     TODO: provide an in-screen panel providing event detail feedback.
 *
 * @property {String} [debugGridColor=['#437AB2', '#1B9E77', '#D95F02', '#7570B3', '#E7298A', '#66A61E', '#E6AB02', '#A6761D', '#666666']]
 *     The colors of grids in debug mode. Each tiled image's grid uses a consecutive color.
 *     If there are more tiled images than provided colors, the color vector is recycled.
 *
 * @property {Boolean} [silenceMultiImageWarnings=false]
 *     Silences warnings when calling viewport coordinate functions with multi-image.
 *     Useful when you're overlaying multiple images on top of one another.
 *
 * @property {Number} [blendTime=0]
 *     Specifies the duration of animation as higher or lower level tiles are
 *     replacing the existing tile.
 *
 * @property {Boolean} [alwaysBlend=false]
 *     Forces the tile to always blend.  By default the tiles skip blending
 *     when the blendTime is surpassed and the current animation frame would
 *     not complete the blend.
 *
 * @property {Boolean} [autoHideControls=true]
 *     If the user stops interacting with the viewport, fade the navigation
 *     controls.  Useful for presentation since the controls are by default
 *     floated on top of the image the user is viewing.
 *
 * @property {Boolean} [immediateRender=false]
 *     Render the best closest level first, ignoring the lowering levels which
 *     provide the effect of very blurry to sharp. It is recommended to change
 *     setting to true for mobile devices.
 *
 * @property {Number} [defaultZoomLevel=0]
 *     Zoom level to use when image is first opened or the home button is clicked.
 *     If 0, adjusts to fit viewer.
 *
 * @property {String|DrawerImplementation|Array} [drawer = ['webgl', 'canvas', 'html']]
 *     Which drawer to use. Valid strings are 'webgl', 'canvas', and 'html'. Valid drawer
 *     implementations are constructors of classes that extend OpenSeadragon.DrawerBase.
 *     An array of strings and/or constructors can be used to indicate the priority
 *     of different implementations, which will be tried in order based on browser support.
 *
 * @property {Object} drawerOptions
 *     Options to pass to the selected drawer implementation. For details
 *     please see {@link OpenSeadragon.DrawerOptions}.
 *
 * @property {Number} [opacity=1]
 *     Default proportional opacity of the tiled images (1=opaque, 0=hidden)
 *     Hidden images do not draw and only load when preloading is allowed.
 *
 * @property {Boolean} [preload=false]
 *     Default switch for loading hidden images (true loads, false blocks)
 *
 * @property {String} [compositeOperation=null]
 *     Valid values are 'source-over', 'source-atop', 'source-in', 'source-out',
 *     'destination-over', 'destination-atop', 'destination-in', 'destination-out',
 *     'lighter', 'difference', 'copy', 'xor', etc.
 *     For complete list of modes, please @see {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation/ globalCompositeOperation}
 *
 * @property {Boolean} [imageSmoothingEnabled=true]
 *     Image smoothing for rendering (only if the canvas or webgl drawer is used). Note: Ignored
 *     by some (especially older) browsers which do not support this canvas property.
 *     This property can be changed in {@link Viewer.DrawerBase.setImageSmoothingEnabled}.
 *
 * @property {String|CanvasGradient|CanvasPattern|Function} [placeholderFillStyle=null]
 *     Draws a colored rectangle behind the tile if it is not loaded yet.
 *     You can pass a CSS color value like "#FF8800".
 *     When passing a function the tiledImage and canvas context are available as argument which is useful when you draw a gradient or pattern.
 *
 * @property {Object} [subPixelRoundingForTransparency=null]
 *     Determines when subpixel rounding should be applied for tiles when rendering images that support transparency.
 *     This property is a subpixel rounding enum values dictionary [{@link BROWSERS}] --> {@link SUBPIXEL_ROUNDING_OCCURRENCES}.
 *     The key is a {@link BROWSERS} value, and the value is one of {@link SUBPIXEL_ROUNDING_OCCURRENCES},
 *     indicating, for a given browser, when to apply subpixel rounding.
 *     Key '*' is the fallback value for any browser not specified in the dictionary.
 *     This property has a simple mode, and one can set it directly to
 *     {@link SUBPIXEL_ROUNDING_OCCURRENCES.NEVER}, {@link SUBPIXEL_ROUNDING_OCCURRENCES.ONLY_AT_REST} or {@link SUBPIXEL_ROUNDING_OCCURRENCES.ALWAYS}
 *     in order to apply this rule for all browser. The values {@link SUBPIXEL_ROUNDING_OCCURRENCES.ALWAYS} would be equivalent to { '*', SUBPIXEL_ROUNDING_OCCURRENCES.ALWAYS }.
 *     The default is {@link SUBPIXEL_ROUNDING_OCCURRENCES.NEVER} for all browsers, for backward compatibility reason.
 *
 * @property {Number} [degrees=0]
 *     Initial rotation.
 *
 * @property {Boolean} [flipped=false]
 *     Initial flip state.
 *
 * @property {Boolean} [overlayPreserveContentDirection=true]
 *     When the viewport is flipped (by pressing 'f'), the overlay is flipped using ScaleX.
 *     Normally, this setting (default true) keeps the overlay's content readable by flipping it back.
 *     To make the content flip with the overlay, set overlayPreserveContentDirection to false.
 *
 * @property {Number} [minZoomLevel=null]
 *
 * @property {Number} [maxZoomLevel=null]
 *
 * @property {Boolean} [homeFillsViewer=false]
 *     Make the 'home' button fill the viewer and clip the image, instead
 *     of fitting the image to the viewer and letterboxing.
 *
 * @property {Boolean} [panHorizontal=true]
 *     Allow horizontal pan.
 *
 * @property {Boolean} [panVertical=true]
 *     Allow vertical pan.
 *
 * @property {Boolean} [constrainDuringPan=false]
 *
 * @property {Boolean} [wrapHorizontal=false]
 *     Set to true to force the image to wrap horizontally within the viewport.
 *     Useful for maps or images representing the surface of a sphere or cylinder.
 *
 * @property {Boolean} [wrapVertical=false]
 *     Set to true to force the image to wrap vertically within the viewport.
 *     Useful for maps or images representing the surface of a sphere or cylinder.
 *
 * @property {Number} [minZoomImageRatio=0.9]
 *     The minimum percentage ( expressed as a number between 0 and 1 ) of
 *     the viewport height or width at which the zoom out will be constrained.
 *     Setting it to 0, for example will allow you to zoom out infinity.
 *
 * @property {Number} [maxZoomPixelRatio=1.1]
 *     The maximum ratio to allow a zoom-in to affect the highest level pixel
 *     ratio. This can be set to Infinity to allow 'infinite' zooming into the
 *     image though it is less effective visually if the HTML5 Canvas is not
 *     available on the viewing device.
 *
 * @property {Number} [smoothTileEdgesMinZoom=1.1]
 *     A zoom percentage ( where 1 is 100% ) of the highest resolution level.
 *     When zoomed in beyond this value alternative compositing will be used to
 *     smooth out the edges between tiles. This will have a performance impact.
 *     Can be set to Infinity to turn it off.
 *     Note: This setting is ignored on iOS devices due to a known bug (See {@link https://github.com/openseadragon/openseadragon/issues/952})
 *
 * @property {Boolean} [iOSDevice=?]
 *     True if running on an iOS device, false otherwise.
 *     Used to disable certain features that behave differently on iOS devices.
 *
 * @property {Boolean} [autoResize=true]
 *     Set to false to prevent polling for viewer size changes. Useful for providing custom resize behavior.
 *
 * @property {Boolean} [preserveImageSizeOnResize=false]
 *     Set to true to have the image size preserved when the viewer is resized. This requires autoResize=true (default).
 *
 * @property {Number} [minScrollDeltaTime=50]
 *     Number of milliseconds between canvas-scroll events. This value helps normalize the rate of canvas-scroll
 *     events between different devices, causing the faster devices to slow down enough to make the zoom control
 *     more manageable.
 *
 * @property {Number} [rotationIncrement=90]
 *     The number of degrees to rotate right or left when the rotate buttons or keyboard shortcuts are activated.
 *
 * @property {Number} [maxTilesPerFrame=1]
 *     The number of tiles loaded per frame. As the frame rate of the client's machine is usually high (e.g., 50 fps),
 *     one tile per frame should be a good choice. However, for large screens or lower frame rates, the number of
 *     loaded tiles per frame can be adjusted here. Reasonable values might be 2 or 3 tiles per frame.
 *     (Note that the actual frame rate is given by the client's browser and machine).
 *
 * @property {Number} [pixelsPerWheelLine=40]
 *     For pixel-resolution scrolling devices, the number of pixels equal to one scroll line.
 *
 * @property {Number} [pixelsPerArrowPress=40]
 *     The number of pixels viewport moves when an arrow key is pressed.
 *
 * @property {Number} [visibilityRatio=0.5]
 *     The percentage ( as a number from 0 to 1 ) of the source image which
 *     must be kept within the viewport.  If the image is dragged beyond that
 *     limit, it will 'bounce' back until the minimum visibility ratio is
 *     achieved.  Setting this to 0 and wrapHorizontal ( or wrapVertical ) to
 *     true will provide the effect of an infinitely scrolling viewport.
 *
 * @property {Object} [viewportMargins={}]
 *     Pushes the "home" region in from the sides by the specified amounts.
 *     Possible subproperties (Numbers, in screen coordinates): left, top, right, bottom.
 *
 * @property {Number} [imageLoaderLimit=0]
 *     The maximum number of image requests to make concurrently. By default
 *     it is set to 0 allowing the browser to make the maximum number of
 *     image requests in parallel as allowed by the browsers policy.
 *
 * @property {Number} [clickTimeThreshold=300]
 *      The number of milliseconds within which a pointer down-up event combination
 *      will be treated as a click gesture.
 *
 * @property {Number} [clickDistThreshold=5]
 *      The maximum distance allowed between a pointer down event and a pointer up event
 *      to be treated as a click gesture.
 *
 * @property {Number} [dblClickTimeThreshold=300]
 *      The number of milliseconds within which two pointer down-up event combinations
 *      will be treated as a double-click gesture.
 *
 * @property {Number} [dblClickDistThreshold=20]
 *      The maximum distance allowed between two pointer click events
 *      to be treated as a double-click gesture.
 *
 * @property {Number} [springStiffness=6.5]
 *
 * @property {Number} [animationTime=1.2]
 *     Specifies the animation duration per each {@link OpenSeadragon.Spring}
 *     which occur when the image is dragged, zoomed or rotated.
 *
 * @property {OpenSeadragon.GestureSettings} [gestureSettingsMouse]
 *     Settings for gestures generated by a mouse pointer device. (See {@link OpenSeadragon.GestureSettings})
 * @property {Boolean} [gestureSettingsMouse.dragToPan=true] - Pan on drag gesture
 * @property {Boolean} [gestureSettingsMouse.scrollToZoom=true] - Zoom on scroll gesture
 * @property {Boolean} [gestureSettingsMouse.clickToZoom=true] - Zoom on click gesture
 * @property {Boolean} [gestureSettingsMouse.dblClickToZoom=false] - Zoom on double-click gesture. Note: If set to true
 *     then clickToZoom should be set to false to prevent multiple zooms.
 * @property {Boolean} [gestureSettingsMouse.dblClickDragToZoom=false] - Zoom on dragging through
 * double-click gesture ( single click and next click to drag).  Note: If set to true
 *     then clickToZoom should be set to false to prevent multiple zooms.
 * @property {Boolean} [gestureSettingsMouse.pinchToZoom=false] - Zoom on pinch gesture
 * @property {Boolean} [gestureSettingsMouse.zoomToRefPoint=true] - If zoomToRefPoint is true, the zoom is centered at the pointer position. Otherwise,
 *     the zoom is centered at the canvas center.
 * @property {Boolean} [gestureSettingsMouse.flickEnabled=false] - Enable flick gesture
 * @property {Number} [gestureSettingsMouse.flickMinSpeed=120] - If flickEnabled is true, the minimum speed to initiate a flick gesture (pixels-per-second)
 * @property {Number} [gestureSettingsMouse.flickMomentum=0.25] - If flickEnabled is true, the momentum factor for the flick gesture
 * @property {Boolean} [gestureSettingsMouse.pinchRotate=false] - If pinchRotate is true, the user will have the ability to rotate the image using their fingers.
 *
 * @property {OpenSeadragon.GestureSettings} [gestureSettingsTouch]
 *     Settings for gestures generated by a touch pointer device. (See {@link OpenSeadragon.GestureSettings})
 * @property {Boolean} [gestureSettingsTouch.dragToPan=true] - Pan on drag gesture
 * @property {Boolean} [gestureSettingsTouch.scrollToZoom=false] - Zoom on scroll gesture
 * @property {Boolean} [gestureSettingsTouch.clickToZoom=false] - Zoom on click gesture
 * @property {Boolean} [gestureSettingsTouch.dblClickToZoom=true] - Zoom on double-click gesture. Note: If set to true
 *     then clickToZoom should be set to false to prevent multiple zooms.
   * @property {Boolean} [gestureSettingsTouch.dblClickDragToZoom=true] - Zoom on dragging through
 * double-click gesture ( single click and next click to drag).  Note: If set to true
 *     then clickToZoom should be set to false to prevent multiple zooms.
  * @property {Boolean} [gestureSettingsTouch.pinchToZoom=true] - Zoom on pinch gesture
 * @property {Boolean} [gestureSettingsTouch.zoomToRefPoint=true] - If zoomToRefPoint is true, the zoom is centered at the pointer position. Otherwise,
 *     the zoom is centered at the canvas center.
 * @property {Boolean} [gestureSettingsTouch.flickEnabled=true] - Enable flick gesture
 * @property {Number} [gestureSettingsTouch.flickMinSpeed=120] - If flickEnabled is true, the minimum speed to initiate a flick gesture (pixels-per-second)
 * @property {Number} [gestureSettingsTouch.flickMomentum=0.25] - If flickEnabled is true, the momentum factor for the flick gesture
 * @property {Boolean} [gestureSettingsTouch.pinchRotate=false] - If pinchRotate is true, the user will have the ability to rotate the image using their fingers.
 *
 * @property {OpenSeadragon.GestureSettings} [gestureSettingsPen]
 *     Settings for gestures generated by a pen pointer device. (See {@link OpenSeadragon.GestureSettings})
 * @property {Boolean} [gestureSettingsPen.dragToPan=true] - Pan on drag gesture
 * @property {Boolean} [gestureSettingsPen.scrollToZoom=false] - Zoom on scroll gesture
 * @property {Boolean} [gestureSettingsPen.clickToZoom=true] - Zoom on click gesture
 * @property {Boolean} [gestureSettingsPen.dblClickToZoom=false] - Zoom on double-click gesture. Note: If set to true
 *     then clickToZoom should be set to false to prevent multiple zooms.
 * @property {Boolean} [gestureSettingsPen.pinchToZoom=false] - Zoom on pinch gesture
 * @property {Boolean} [gestureSettingsPen.zoomToRefPoint=true] - If zoomToRefPoint is true, the zoom is centered at the pointer position. Otherwise,
 *     the zoom is centered at the canvas center.
 * @property {Boolean} [gestureSettingsPen.flickEnabled=false] - Enable flick gesture
 * @property {Number} [gestureSettingsPen.flickMinSpeed=120] - If flickEnabled is true, the minimum speed to initiate a flick gesture (pixels-per-second)
 * @property {Number} [gestureSettingsPen.flickMomentum=0.25] - If flickEnabled is true, the momentum factor for the flick gesture
 * @property {Boolean} [gestureSettingsPen.pinchRotate=false] - If pinchRotate is true, the user will have the ability to rotate the image using their fingers.
 *
 * @property {OpenSeadragon.GestureSettings} [gestureSettingsUnknown]
 *     Settings for gestures generated by unknown pointer devices. (See {@link OpenSeadragon.GestureSettings})
 * @property {Boolean} [gestureSettingsUnknown.dragToPan=true] - Pan on drag gesture
 * @property {Boolean} [gestureSettingsUnknown.scrollToZoom=true] - Zoom on scroll gesture
 * @property {Boolean} [gestureSettingsUnknown.clickToZoom=false] - Zoom on click gesture
 * @property {Boolean} [gestureSettingsUnknown.dblClickToZoom=true] - Zoom on double-click gesture. Note: If set to true
 *     then clickToZoom should be set to false to prevent multiple zooms.
 * @property {Boolean} [gestureSettingsUnknown.dblClickDragToZoom=false] - Zoom on dragging through
 * double-click gesture ( single click and next click to drag).  Note: If set to true
 *     then clickToZoom should be set to false to prevent multiple zooms.
 * @property {Boolean} [gestureSettingsUnknown.pinchToZoom=true] - Zoom on pinch gesture
 * @property {Boolean} [gestureSettingsUnknown.zoomToRefPoint=true] - If zoomToRefPoint is true, the zoom is centered at the pointer position. Otherwise,
 *     the zoom is centered at the canvas center.
 * @property {Boolean} [gestureSettingsUnknown.flickEnabled=true] - Enable flick gesture
 * @property {Number} [gestureSettingsUnknown.flickMinSpeed=120] - If flickEnabled is true, the minimum speed to initiate a flick gesture (pixels-per-second)
 * @property {Number} [gestureSettingsUnknown.flickMomentum=0.25] - If flickEnabled is true, the momentum factor for the flick gesture
 * @property {Boolean} [gestureSettingsUnknown.pinchRotate=false] - If pinchRotate is true, the user will have the ability to rotate the image using their fingers.
 *
 * @property {Number} [zoomPerClick=2.0]
 *     The "zoom distance" per mouse click or touch tap. <em><strong>Note:</strong> Setting this to 1.0 effectively disables the click-to-zoom feature (also see gestureSettings[Mouse|Touch|Pen].clickToZoom/dblClickToZoom).</em>
 *
 * @property {Number} [zoomPerScroll=1.2]
 *     The "zoom distance" per mouse scroll or touch pinch. <em><strong>Note:</strong> Setting this to 1.0 effectively disables the mouse-wheel zoom feature (also see gestureSettings[Mouse|Touch|Pen].scrollToZoom}).</em>
 *
 * @property {Number} [zoomPerDblClickDrag=1.2]
 *     The "zoom distance" per double-click mouse drag. <em><strong>Note:</strong> Setting this to 1.0 effectively disables the double-click-drag-to-Zoom feature (also see gestureSettings[Mouse|Touch|Pen].dblClickDragToZoom).</em>
 *
 * @property {Number} [zoomPerSecond=1.0]
 *     Sets the zoom amount per second when zoomIn/zoomOut buttons are pressed and held.
 *     The value is a factor of the current zoom, so 1.0 (the default) disables zooming when the zoomIn/zoomOut buttons
 *     are held. Higher values will increase the rate of zoom when the zoomIn/zoomOut buttons are held. Note that values
 *     < 1.0 will reverse the operation of the zoomIn/zoomOut buttons (zoomIn button will decrease the zoom, zoomOut will
 *     increase the zoom).
 *
 * @property {Boolean} [showNavigator=false]
 *     Set to true to make the navigator minimap appear.
 *
 * @property {Element} [navigatorElement=null]
 *     The element to hold the navigator minimap.
 *     If an element is specified, the Id option (see navigatorId) is ignored.
 *     If no element nor ID is specified, a div element will be generated accordingly.
 *
 * @property {String} [navigatorId=navigator-GENERATED DATE]
 *     The ID of a div to hold the navigator minimap.
 *     If an ID is specified, the navigatorPosition, navigatorSizeRatio, navigatorMaintainSizeRatio, navigator[Top|Left|Height|Width] and navigatorAutoFade options will be ignored.
 *     If an ID is not specified, a div element will be generated and placed on top of the main image.
 *
 * @property {String} [navigatorPosition='TOP_RIGHT']
 *     Valid values are 'TOP_LEFT', 'TOP_RIGHT', 'BOTTOM_LEFT', 'BOTTOM_RIGHT', or 'ABSOLUTE'.<br>
 *     If 'ABSOLUTE' is specified, then navigator[Top|Left|Height|Width] determines the size and position of the navigator minimap in the viewer, and navigatorSizeRatio and navigatorMaintainSizeRatio are ignored.<br>
 *     For 'TOP_LEFT', 'TOP_RIGHT', 'BOTTOM_LEFT', and 'BOTTOM_RIGHT', the navigatorSizeRatio or navigator[Height|Width] values determine the size of the navigator minimap.
 *
 * @property {Number} [navigatorSizeRatio=0.2]
 *     Ratio of navigator size to viewer size. Ignored if navigator[Height|Width] are specified.
 *
 * @property {Boolean} [navigatorMaintainSizeRatio=false]
 *     If true, the navigator minimap is resized (using navigatorSizeRatio) when the viewer size changes.
 *
 * @property {Number|String} [navigatorTop=null]
 *     Specifies the location of the navigator minimap (see navigatorPosition).
 *
 * @property {Number|String} [navigatorLeft=null]
 *     Specifies the location of the navigator minimap (see navigatorPosition).
 *
 * @property {Number|String} [navigatorHeight=null]
 *     Specifies the size of the navigator minimap (see navigatorPosition).
 *     If specified, navigatorSizeRatio and navigatorMaintainSizeRatio are ignored.
 *
 * @property {Number|String} [navigatorWidth=null]
 *     Specifies the size of the navigator minimap (see navigatorPosition).
 *     If specified, navigatorSizeRatio and navigatorMaintainSizeRatio are ignored.
 *
 * @property {Boolean} [navigatorAutoResize=true]
 *     Set to false to prevent polling for navigator size changes. Useful for providing custom resize behavior.
 *     Setting to false can also improve performance when the navigator is configured to a fixed size.
 *
 * @property {Boolean} [navigatorAutoFade=true]
 *     If the user stops interacting with the viewport, fade the navigator minimap.
 *     Setting to false will make the navigator minimap always visible.
 *
 * @property {Boolean} [navigatorRotate=true]
 *     If true, the navigator will be rotated together with the viewer.
 *
 * @property {String} [navigatorBackground='#000']
 *     Specifies the background color of the navigator minimap
 *
 * @property {Number} [navigatorOpacity=0.8]
 *     Specifies the opacity of the navigator minimap.
 *
 * @property {String} [navigatorBorderColor='#555']
 *     Specifies the border color of the navigator minimap
 *
 * @property {String} [navigatorDisplayRegionColor='#900']
 *     Specifies the border color of the display region rectangle of the navigator minimap
 *
 * @property {Number} [controlsFadeDelay=2000]
 *     The number of milliseconds to wait once the user has stopped interacting
 *     with the interface before beginning to fade the controls. Assumes
 *     showNavigationControl and autoHideControls are both true.
 *
 * @property {Number} [controlsFadeLength=1500]
 *     The number of milliseconds to animate the controls fading out.
 *
 * @property {Number} [maxImageCacheCount=200]
 *     The max number of images we should keep in memory (per drawer).
 *
 * @property {Number} [timeout=30000]
 *     The max number of milliseconds that an image job may take to complete.
 *
 * @property {Number} [tileRetryMax=0]
 *     The max number of retries when a tile download fails. By default it's 0, so retries are disabled.
 *
 * @property {Number} [tileRetryDelay=2500]
 *     Milliseconds to wait after each tile retry if tileRetryMax is set.
 *
 * @property {Boolean} [useCanvas=true]
 *     Deprecated. Use the `drawer` option to specify preferred renderer.
 *
 * @property {Number} [minPixelRatio=0.5]
 *     The higher the minPixelRatio, the lower the quality of the image that
 *     is considered sufficient to stop rendering a given zoom level.  For
 *     example, if you are targeting mobile devices with less bandwidth you may
 *     try setting this to 1.5 or higher.
 *
 * @property {Boolean} [mouseNavEnabled=true]
 *     Is the user able to interact with the image via mouse or touch. Default
 *     interactions include draging the image in a plane, and zooming in toward
 *     and away from the image.
 *
 * @property {Boolean} [showNavigationControl=true]
 *     Set to false to prevent the appearance of the default navigation controls.<br>
 *     Note that if set to false, the customs buttons set by the options
 *     zoomInButton, zoomOutButton etc, are rendered inactive.
 *
 * @property {OpenSeadragon.ControlAnchor} [navigationControlAnchor=TOP_LEFT]
 *     Placement of the default navigation controls.
 *     To set the placement of the sequence controls, see the
 *     sequenceControlAnchor option.
 *
 * @property {Boolean} [showZoomControl=true]
 *     If true then + and - buttons to zoom in and out are displayed.<br>
 *     Note: {@link OpenSeadragon.Options.showNavigationControl} is overriding
 *     this setting when set to false.
 *
 * @property {Boolean} [showHomeControl=true]
 *     If true then the 'Go home' button is displayed to go back to the original
 *     zoom and pan.<br>
 *     Note: {@link OpenSeadragon.Options.showNavigationControl} is overriding
 *     this setting when set to false.
 *
 * @property {Boolean} [showFullPageControl=true]
 *     If true then the 'Toggle full page' button is displayed to switch
 *     between full page and normal mode.<br>
 *     Note: {@link OpenSeadragon.Options.showNavigationControl} is overriding
 *     this setting when set to false.
 *
 * @property {Boolean} [showRotationControl=false]
 *     If true then the rotate left/right controls will be displayed as part of the
 *     standard controls. This is also subject to the browser support for rotate
 *     (e.g. viewer.drawer.canRotate()).<br>
 *     Note: {@link OpenSeadragon.Options.showNavigationControl} is overriding
 *     this setting when set to false.
 *
 * @property {Boolean} [showFlipControl=false]
 *     If true then the flip controls will be displayed as part of the
 *     standard controls.
 *
 * @property {Boolean} [showSequenceControl=true]
 *     If sequenceMode is true, then provide buttons for navigating forward and
 *     backward through the images.
 *
 * @property {OpenSeadragon.ControlAnchor} [sequenceControlAnchor=TOP_LEFT]
 *     Placement of the default sequence controls.
 *
 * @property {Boolean} [navPrevNextWrap=false]
 *     If true then the 'previous' button will wrap to the last image when
 *     viewing the first image and the 'next' button will wrap to the first
 *     image when viewing the last image.
 *
 *@property {String|Element} zoomInButton
 *     Set the id or element of the custom 'Zoom in' button to use.
 *     This is useful to have a custom button anywhere in the web page.<br>
 *     To only change the button images, consider using
 *     {@link OpenSeadragon.Options.navImages}
 *
 * @property {String|Element} zoomOutButton
 *     Set the id or element of the custom 'Zoom out' button to use.
 *     This is useful to have a custom button anywhere in the web page.<br>
 *     To only change the button images, consider using
 *     {@link OpenSeadragon.Options.navImages}
 *
 * @property {String|Element} homeButton
 *     Set the id or element of the custom 'Go home' button to use.
 *     This is useful to have a custom button anywhere in the web page.<br>
 *     To only change the button images, consider using
 *     {@link OpenSeadragon.Options.navImages}
 *
 * @property {String|Element} fullPageButton
 *     Set the id or element of the custom 'Toggle full page' button to use.
 *     This is useful to have a custom button anywhere in the web page.<br>
 *     To only change the button images, consider using
 *     {@link OpenSeadragon.Options.navImages}
 *
 * @property {String|Element} rotateLeftButton
 *     Set the id or element of the custom 'Rotate left' button to use.
 *     This is useful to have a custom button anywhere in the web page.<br>
 *     To only change the button images, consider using
 *     {@link OpenSeadragon.Options.navImages}
 *
 * @property {String|Element} rotateRightButton
 *     Set the id or element of the custom 'Rotate right' button to use.
 *     This is useful to have a custom button anywhere in the web page.<br>
 *     To only change the button images, consider using
 *     {@link OpenSeadragon.Options.navImages}
 *
 * @property {String|Element} previousButton
 *     Set the id or element of the custom 'Previous page' button to use.
 *     This is useful to have a custom button anywhere in the web page.<br>
 *     To only change the button images, consider using
 *     {@link OpenSeadragon.Options.navImages}
 *
 * @property {String|Element} nextButton
 *     Set the id or element of the custom 'Next page' button to use.
 *     This is useful to have a custom button anywhere in the web page.<br>
 *     To only change the button images, consider using
 *     {@link OpenSeadragon.Options.navImages}
 *
 * @property {Boolean} [sequenceMode=false]
 *     Set to true to have the viewer treat your tilesources as a sequence of images to
 *     be opened one at a time rather than all at once.
 *
 * @property {Number} [initialPage=0]
 *     If sequenceMode is true, display this page initially.
 *
 * @property {Boolean} [preserveViewport=false]
 *     If sequenceMode is true, then normally navigating through each image resets the
 *     viewport to 'home' position.  If preserveViewport is set to true, then the viewport
 *     position is preserved when navigating between images in the sequence.
 *
 * @property {Boolean} [preserveOverlays=false]
 *     If sequenceMode is true, then normally navigating through each image
 *     resets the overlays.
 *     If preserveOverlays is set to true, then the overlays added with {@link OpenSeadragon.Viewer#addOverlay}
 *     are preserved when navigating between images in the sequence.
 *     Note: setting preserveOverlays overrides any overlays specified in the global
 *     "overlays" option for the Viewer. It's also not compatible with specifying
 *     per-tileSource overlays via the options, as those overlays will persist
 *     even after the tileSource is closed.
 *
 * @property {Boolean} [showReferenceStrip=false]
 *     If sequenceMode is true, then display a scrolling strip of image thumbnails for
 *     navigating through the images.
 *
 * @property {String} [referenceStripScroll='horizontal']
 *
 * @property {Element} [referenceStripElement=null]
 *
 * @property {Number} [referenceStripHeight=null]
 *
 * @property {Number} [referenceStripWidth=null]
 *
 * @property {String} [referenceStripPosition='BOTTOM_LEFT']
 *
 * @property {Number} [referenceStripSizeRatio=0.2]
 *
 * @property {Boolean} [collectionMode=false]
 *     Set to true to have the viewer arrange your TiledImages in a grid or line.
 *
 * @property {Number} [collectionRows=3]
 *     If collectionMode is true, specifies how many rows the grid should have. Use 1 to make a line.
 *     If collectionLayout is 'vertical', specifies how many columns instead.
 *
 * @property {Number} [collectionColumns=0]
 *     If collectionMode is true, specifies how many columns the grid should have. Use 1 to make a line.
 *     If collectionLayout is 'vertical', specifies how many rows instead. Ignored if collectionRows is not set to a falsy value.
 *
 * @property {String} [collectionLayout='horizontal']
 *     If collectionMode is true, specifies whether to arrange vertically or horizontally.
 *
 * @property {Number} [collectionTileSize=800]
 *     If collectionMode is true, specifies the size, in viewport coordinates, for each TiledImage to fit into.
 *     The TiledImage will be centered within a square of the specified size.
 *
 * @property {Number} [collectionTileMargin=80]
 *     If collectionMode is true, specifies the margin, in viewport coordinates, between each TiledImage.
 *
 * @property {String|Boolean} [crossOriginPolicy=false]
 *     Valid values are 'Anonymous', 'use-credentials', and false. If false, canvas requests will
 *     not use CORS, and the canvas will be tainted.
 *
 * @property {Boolean} [ajaxWithCredentials=false]
 *     Whether to set the withCredentials XHR flag for AJAX requests.
 *     Note that this can be overridden at the {@link OpenSeadragon.TileSource} level.
 *
 * @property {Boolean} [loadTilesWithAjax=false]
 *     Whether to load tile data using AJAX requests.
 *     Note that this can be overridden at the {@link OpenSeadragon.TileSource} level.
 *
 * @property {Object} [ajaxHeaders={}]
 *     A set of headers to include when making AJAX requests for tile sources or tiles.
 *
 * @property {Boolean} [splitHashDataForPost=false]
 *     Allows to treat _first_ hash ('#') symbol as a separator for POST data:
 *     URL to be opened by a {@link OpenSeadragon.TileSource} can thus look like: http://some.url#postdata=here.
 *     The whole URL is used to fetch image info metadata and it is then split to 'http://some.url' and
 *     'postdata=here'; post data is given to the {@link OpenSeadragon.TileSource} of the choice and can be further
 *     used within tile requests (see TileSource methods).
 *     NOTE: {@link OpenSeadragon.TileSource.prototype.configure} return value should contain the post data
 *     if you want to use it later - so that it is given to your constructor later.
 *     NOTE: usually, post data is expected to be ampersand-separated (just like GET parameters), and is NOT USED
 *     to fetch tile image data unless explicitly programmed, or if loadTilesWithAjax=false 4
 *     (but it is still used for the initial image info request).
 *     NOTE: passing POST data from URL by this feature only supports string values, however,
 *     TileSource can send any data using POST as long as the header is correct
 *     (@see OpenSeadragon.TileSource.prototype.getTilePostData)
 */
/**
 * Settings for gestures generated by a pointer device.
 *
 * @typedef {Object} GestureSettings
 * @memberof OpenSeadragon
 *
 * @property {Boolean} dragToPan
 *     Set to false to disable panning on drag gestures.
 *
 * @property {Boolean} scrollToZoom
 *     Set to false to disable zooming on scroll gestures.
 *
 * @property {Boolean} clickToZoom
 *     Set to false to disable zooming on click gestures.
 *
 * @property {Boolean} dblClickToZoom
 *     Set to false to disable zooming on double-click gestures. Note: If set to true
 *     then clickToZoom should be set to false to prevent multiple zooms.
 *
 * @property {Boolean} pinchToZoom
 *     Set to false to disable zooming on pinch gestures.
 *
 * @property {Boolean} flickEnabled
 *     Set to false to disable the kinetic panning effect (flick) at the end of a drag gesture.
 *
 * @property {Number} flickMinSpeed
 *     If flickEnabled is true, the minimum speed (in pixels-per-second) required to cause the kinetic panning effect (flick) at the end of a drag gesture.
 *
 * @property {Number} flickMomentum
 *     If flickEnabled is true, a constant multiplied by the velocity to determine the distance of the kinetic panning effect (flick) at the end of a drag gesture.
 *     A larger value will make the flick feel "lighter", while a smaller value will make the flick feel "heavier".
 *     Note: springStiffness and animationTime also affect the "spring" used to stop the flick animation.
 *
 */
/**
 * @typedef {Object} DrawerOptions
 * @memberof OpenSeadragon
 * @property {Object} webgl - options if the WebGLDrawer is used. No options are currently supported.
 * @property {Object} canvas - options if the CanvasDrawer is used. No options are currently supported.
 * @property {Object} html - options if the HTMLDrawer is used. No options are currently supported.
 * @property {Object} custom - options if a custom drawer is used. No options are currently supported.
 */
/**
  * The names for the image resources used for the image navigation buttons.
  *
  * @typedef {Object} NavImages
  * @memberof OpenSeadragon
  *
  * @property {Object} zoomIn - Images for the zoom-in button.
  * @property {String} zoomIn.REST
  * @property {String} zoomIn.GROUP
  * @property {String} zoomIn.HOVER
  * @property {String} zoomIn.DOWN
  *
  * @property {Object} zoomOut - Images for the zoom-out button.
  * @property {String} zoomOut.REST
  * @property {String} zoomOut.GROUP
  * @property {String} zoomOut.HOVER
  * @property {String} zoomOut.DOWN
  *
  * @property {Object} home - Images for the home button.
  * @property {String} home.REST
  * @property {String} home.GROUP
  * @property {String} home.HOVER
  * @property {String} home.DOWN
  *
  * @property {Object} fullpage - Images for the full-page button.
  * @property {String} fullpage.REST
  * @property {String} fullpage.GROUP
  * @property {String} fullpage.HOVER
  * @property {String} fullpage.DOWN
  *
  * @property {Object} rotateleft - Images for the rotate left button.
  * @property {String} rotateleft.REST
  * @property {String} rotateleft.GROUP
  * @property {String} rotateleft.HOVER
  * @property {String} rotateleft.DOWN
  *
  * @property {Object} rotateright - Images for the rotate right button.
  * @property {String} rotateright.REST
  * @property {String} rotateright.GROUP
  * @property {String} rotateright.HOVER
  * @property {String} rotateright.DOWN
  *
  * @property {Object} flip - Images for the flip button.
  * @property {String} flip.REST
  * @property {String} flip.GROUP
  * @property {String} flip.HOVER
  * @property {String} flip.DOWN
  *
  * @property {Object} previous - Images for the previous button.
  * @property {String} previous.REST
  * @property {String} previous.GROUP
  * @property {String} previous.HOVER
  * @property {String} previous.DOWN
  *
  * @property {Object} next - Images for the next button.
  * @property {String} next.REST
  * @property {String} next.GROUP
  * @property {String} next.HOVER
  * @property {String} next.DOWN
  *
  */function OpenSeadragon(e){return new OpenSeadragon.Viewer(e)}(function(e){e.version={versionStr:"5.0.1",major:parseInt("5",10),minor:parseInt("0",10),revision:parseInt("1",10)};var t={"[object Boolean]":"boolean","[object Number]":"number","[object String]":"string","[object Function]":"function","[object AsyncFunction]":"function","[object Promise]":"promise","[object Array]":"array","[object Date]":"date","[object RegExp]":"regexp","[object Object]":"object"},i=Object.prototype.toString,n=Object.prototype.hasOwnProperty;e.isFunction=function(t){return e.type(t)==="function"};e.isArray=Array.isArray||function(t){return e.type(t)==="array"};e.isWindow=function(e){return e&&typeof e==="object"&&"setInterval"in e};e.type=function(e){return e===null||e===void 0?String(e):t[i.call(e)]||"object"};e.isPlainObject=function(t){if(!t||OpenSeadragon.type(t)!=="object"||t.nodeType||e.isWindow(t))return false;if(t.constructor&&!n.call(t,"constructor")&&!n.call(t.constructor.prototype,"isPrototypeOf"))return false;var i;for(var r in t)i=r;return i===void 0||n.call(t,i)};e.isEmptyObject=function(e){for(var t in e)return false;return true};
/**
   * Shim around Object.freeze. Does nothing if Object.freeze is not supported.
   * @param {Object} obj The object to freeze.
   * @returns {Object} obj The frozen object.
   */e.freezeObject=function(t){Object.freeze?e.freezeObject=Object.freeze:e.freezeObject=function(e){return e};return e.freezeObject(t)};e.supportsCanvas=function(){var t=document.createElement("canvas");return!!(e.isFunction(t.getContext)&&t.getContext("2d"))}();
/**
   * Test whether the submitted canvas is tainted or not.
   * @argument {Canvas} canvas The canvas to test.
   * @returns {Boolean} True if the canvas is tainted.
   */e.isCanvasTainted=function(e){var t=false;try{e.getContext("2d").getImageData(0,0,1,1)}catch(e){t=true}return t};e.supportsAddEventListener=function(){return!!(document.documentElement.addEventListener&&document.addEventListener)}();e.supportsRemoveEventListener=function(){return!!(document.documentElement.removeEventListener&&document.removeEventListener)}();e.supportsEventListenerOptions=function(){var t=0;if(e.supportsAddEventListener)try{var i={get capture(){t++;return false},get once(){t++;return false},get passive(){t++;return false}};window.addEventListener("test",null,i);window.removeEventListener("test",null,i)}catch(e){t=0}return t>=3}();
/**
   * A ratio comparing the device screen's pixel density to the canvas's backing store pixel density,
   * clamped to a minimum of 1. Defaults to 1 if canvas isn't supported by the browser.
   * @function getCurrentPixelDensityRatio
   * @memberof OpenSeadragon
   * @returns {Number}
   */e.getCurrentPixelDensityRatio=function(){if(e.supportsCanvas){var t=document.createElement("canvas").getContext("2d");var i=window.devicePixelRatio||1;var n=t.webkitBackingStorePixelRatio||t.mozBackingStorePixelRatio||t.msBackingStorePixelRatio||t.oBackingStorePixelRatio||t.backingStorePixelRatio||1;return Math.max(i,1)/n}return 1};e.pixelDensityRatio=e.getCurrentPixelDensityRatio()})(OpenSeadragon);(function(t){t.extend=function(){var i,n,r,o,s,a,l=arguments[0]||{},h=arguments.length,u=false,c=1;if(typeof l==="boolean"){u=l;l=arguments[1]||{};c=2}typeof l==="object"||OpenSeadragon.isFunction(l)||(l={});if(h===c){l=this||e;--c}for(;c<h;c++){i=arguments[c];if(i!==null||i!==void 0)for(n in i){var d=Object.getOwnPropertyDescriptor(i,n);if(d!==void 0)if(d.get||d.set)Object.defineProperty(l,n,d);else{o=d.value;if(l!==o)if(u&&o&&(OpenSeadragon.isPlainObject(o)||(s=OpenSeadragon.isArray(o)))){r=l[n];if(s){s=false;a=r&&OpenSeadragon.isArray(r)?r:[]}else a=r&&OpenSeadragon.isPlainObject(r)?r:{};l[n]=OpenSeadragon.extend(u,a,o)}else o!==void 0&&(l[n]=o)}else t.console.warn('Could not copy inherited property "'+n+'".')}}return l};var isIOSDevice=function(){if(typeof navigator!=="object")return false;var e=navigator.userAgent;return typeof e==="string"&&(e.indexOf("iPhone")!==-1||e.indexOf("iPad")!==-1||e.indexOf("iPod")!==-1)};t.extend(t,{
/**
     * The default values for the optional settings documented at {@link OpenSeadragon.Options}.
     * @static
     * @type {Object}
     */
DEFAULT_SETTINGS:{xmlPath:null,tileSources:null,tileHost:null,initialPage:0,crossOriginPolicy:false,ajaxWithCredentials:false,loadTilesWithAjax:false,ajaxHeaders:{},splitHashDataForPost:false,panHorizontal:true,panVertical:true,constrainDuringPan:false,wrapHorizontal:false,wrapVertical:false,visibilityRatio:.5,minPixelRatio:.5,defaultZoomLevel:0,minZoomLevel:null,maxZoomLevel:null,homeFillsViewer:false,clickTimeThreshold:300,clickDistThreshold:5,dblClickTimeThreshold:300,dblClickDistThreshold:20,springStiffness:6.5,animationTime:1.2,gestureSettingsMouse:{dragToPan:true,scrollToZoom:true,clickToZoom:true,dblClickToZoom:false,dblClickDragToZoom:false,pinchToZoom:false,zoomToRefPoint:true,flickEnabled:false,flickMinSpeed:120,flickMomentum:.25,pinchRotate:false},gestureSettingsTouch:{dragToPan:true,scrollToZoom:false,clickToZoom:false,dblClickToZoom:true,dblClickDragToZoom:true,pinchToZoom:true,zoomToRefPoint:true,flickEnabled:true,flickMinSpeed:120,flickMomentum:.25,pinchRotate:false},gestureSettingsPen:{dragToPan:true,scrollToZoom:false,clickToZoom:true,dblClickToZoom:false,dblClickDragToZoom:false,pinchToZoom:false,zoomToRefPoint:true,flickEnabled:false,flickMinSpeed:120,flickMomentum:.25,pinchRotate:false},gestureSettingsUnknown:{dragToPan:true,scrollToZoom:false,clickToZoom:false,dblClickToZoom:true,dblClickDragToZoom:false,pinchToZoom:true,zoomToRefPoint:true,flickEnabled:true,flickMinSpeed:120,flickMomentum:.25,pinchRotate:false},zoomPerClick:2,zoomPerScroll:1.2,zoomPerDblClickDrag:1.2,zoomPerSecond:1,blendTime:0,alwaysBlend:false,autoHideControls:true,immediateRender:false,minZoomImageRatio:.9,maxZoomPixelRatio:1.1,smoothTileEdgesMinZoom:1.1,iOSDevice:isIOSDevice(),pixelsPerWheelLine:40,pixelsPerArrowPress:40,autoResize:true,preserveImageSizeOnResize:false,minScrollDeltaTime:50,rotationIncrement:90,maxTilesPerFrame:1,showSequenceControl:true,sequenceControlAnchor:null,preserveViewport:false,preserveOverlays:false,navPrevNextWrap:false,showNavigationControl:true,navigationControlAnchor:null,showZoomControl:true,showHomeControl:true,showFullPageControl:true,showRotationControl:false,showFlipControl:false,controlsFadeDelay:2e3,controlsFadeLength:1500,mouseNavEnabled:true,showNavigator:false,navigatorElement:null,navigatorId:null,navigatorPosition:null,navigatorSizeRatio:.2,navigatorMaintainSizeRatio:false,navigatorTop:null,navigatorLeft:null,navigatorHeight:null,navigatorWidth:null,navigatorAutoResize:true,navigatorAutoFade:true,navigatorRotate:true,navigatorBackground:"#000",navigatorOpacity:.8,navigatorBorderColor:"#555",navigatorDisplayRegionColor:"#900",degrees:0,flipped:false,overlayPreserveContentDirection:true,opacity:1,compositeOperation:null,drawer:["webgl","canvas","html"],drawerOptions:{webgl:{},canvas:{},html:{},custom:{}},preload:false,imageSmoothingEnabled:true,placeholderFillStyle:null,subPixelRoundingForTransparency:null,showReferenceStrip:false,referenceStripScroll:"horizontal",referenceStripElement:null,referenceStripHeight:null,referenceStripWidth:null,referenceStripPosition:"BOTTOM_LEFT",referenceStripSizeRatio:.2,collectionRows:3,collectionColumns:0,collectionLayout:"horizontal",collectionMode:false,collectionTileSize:800,collectionTileMargin:80,imageLoaderLimit:0,maxImageCacheCount:200,timeout:3e4,tileRetryMax:0,tileRetryDelay:2500,prefixUrl:"/images/",navImages:{zoomIn:{REST:"zoomin_rest.png",GROUP:"zoomin_grouphover.png",HOVER:"zoomin_hover.png",DOWN:"zoomin_pressed.png"},zoomOut:{REST:"zoomout_rest.png",GROUP:"zoomout_grouphover.png",HOVER:"zoomout_hover.png",DOWN:"zoomout_pressed.png"},home:{REST:"home_rest.png",GROUP:"home_grouphover.png",HOVER:"home_hover.png",DOWN:"home_pressed.png"},fullpage:{REST:"fullpage_rest.png",GROUP:"fullpage_grouphover.png",HOVER:"fullpage_hover.png",DOWN:"fullpage_pressed.png"},rotateleft:{REST:"rotateleft_rest.png",GROUP:"rotateleft_grouphover.png",HOVER:"rotateleft_hover.png",DOWN:"rotateleft_pressed.png"},rotateright:{REST:"rotateright_rest.png",GROUP:"rotateright_grouphover.png",HOVER:"rotateright_hover.png",DOWN:"rotateright_pressed.png"},flip:{REST:"flip_rest.png",GROUP:"flip_grouphover.png",HOVER:"flip_hover.png",DOWN:"flip_pressed.png"},previous:{REST:"previous_rest.png",GROUP:"previous_grouphover.png",HOVER:"previous_hover.png",DOWN:"previous_pressed.png"},next:{REST:"next_rest.png",GROUP:"next_grouphover.png",HOVER:"next_hover.png",DOWN:"next_pressed.png"}},debugMode:false,debugGridColor:["#437AB2","#1B9E77","#D95F02","#7570B3","#E7298A","#66A61E","#E6AB02","#A6761D","#666666"],silenceMultiImageWarnings:false},
/**
     * Returns a function which invokes the method as if it were a method belonging to the object.
     * @function
     * @param {Object} object
     * @param {Function} method
     * @returns {Function}
     */
delegate:function(e,t){return function(){var i=arguments;i===void 0&&(i=[]);return t.apply(e,i)}},
/**
     * An enumeration of Browser vendors.
     * @static
     * @type {Object}
     * @property {Number} UNKNOWN
     * @property {Number} IE
     * @property {Number} FIREFOX
     * @property {Number} SAFARI
     * @property {Number} CHROME
     * @property {Number} OPERA
     * @property {Number} EDGE
     * @property {Number} CHROMEEDGE
     */
BROWSERS:{UNKNOWN:0,IE:1,FIREFOX:2,SAFARI:3,CHROME:4,OPERA:5,EDGE:6,CHROMEEDGE:7},
/**
     * An enumeration of when subpixel rounding should occur.
     * @static
     * @type {Object}
     * @property {Number} NEVER Never apply subpixel rounding for transparency.
     * @property {Number} ONLY_AT_REST Do not apply subpixel rounding for transparency during animation (panning, zoom, rotation) and apply it once animation is over.
     * @property {Number} ALWAYS Apply subpixel rounding for transparency during animation and when animation is over.
     */
SUBPIXEL_ROUNDING_OCCURRENCES:{NEVER:0,ONLY_AT_REST:1,ALWAYS:2},
/**
     * Keep track of which {@link Viewer}s have been created.
     * - Key: {@link Element} to which a Viewer is attached.
     * - Value: {@link Viewer} of the element defined by the key.
     * @private
     * @static
     * @type {Object}
     */
_viewers:new Map,
/**
      * Returns the {@link Viewer} attached to a given DOM element. If there is
      * no viewer attached to the provided element, undefined is returned.
      * @function
      * @param {String|Element} element Accepts an id or element.
      * @returns {Viewer} The viewer attached to the given element, or undefined.
      */
getViewer:function(e){return t._viewers.get(this.getElement(e))},
/**
     * Returns a DOM Element for the given id or element.
     * @function
     * @param {String|Element} element Accepts an id or element.
     * @returns {Element} The element with the given id, null, or the element itself.
     */
getElement:function(e){typeof e==="string"&&(e=document.getElementById(e));return e},
/**
     * Determines the position of the upper-left corner of the element.
     * @function
     * @param {Element|String} element - the element we want the position for.
     * @returns {OpenSeadragon.Point} - the position of the upper left corner of the element.
     */
getElementPosition:function(e){var i,n,r=new t.Point;e=t.getElement(e);i=t.getElementStyle(e).position==="fixed";n=getOffsetParent(e,i);while(n){r.x+=e.offsetLeft;r.y+=e.offsetTop;i&&(r=r.plus(t.getPageScroll()));e=n;i=t.getElementStyle(e).position==="fixed";n=getOffsetParent(e,i)}return r},
/**
     * Determines the position of the upper-left corner of the element adjusted for current page and/or element scroll.
     * @function
     * @param {Element|String} element - the element we want the position for.
     * @returns {OpenSeadragon.Point} - the position of the upper left corner of the element adjusted for current page and/or element scroll.
     */
getElementOffset:function(e){e=t.getElement(e);var i,n,r=e&&e.ownerDocument,o={top:0,left:0};if(!r)return new t.Point;i=r.documentElement;typeof e.getBoundingClientRect!=="undefined"&&(o=e.getBoundingClientRect());n=r===r.window?r:r.nodeType===9&&(r.defaultView||r.parentWindow);return new t.Point(o.left+(n.pageXOffset||i.scrollLeft)-(i.clientLeft||0),o.top+(n.pageYOffset||i.scrollTop)-(i.clientTop||0))},
/**
     * Determines the height and width of the given element.
     * @function
     * @param {Element|String} element
     * @returns {OpenSeadragon.Point}
     */
getElementSize:function(e){e=t.getElement(e);return new t.Point(e.clientWidth,e.clientHeight)},
/**
     * Returns the CSSStyle object for the given element.
     * @function
     * @param {Element|String} element
     * @returns {CSSStyle}
     */
getElementStyle:document.documentElement.currentStyle?function(e){e=t.getElement(e);return e.currentStyle}:function(e){e=t.getElement(e);return window.getComputedStyle(e,"")},
/**
     * Returns the property with the correct vendor prefix appended.
     * @param {String} property the property name
     * @returns {String} the property with the correct prefix or null if not
     * supported.
     */
getCssPropertyWithVendorPrefix:function(e){var i={};t.getCssPropertyWithVendorPrefix=function(e){if(i[e]!==void 0)return i[e];var n=document.createElement("div").style;var r=null;if(n[e]!==void 0)r=e;else{var o=["Webkit","Moz","MS","O","webkit","moz","ms","o"];var s=t.capitalizeFirstLetter(e);for(var a=0;a<o.length;a++){var l=o[a]+s;if(n[l]!==void 0){r=l;break}}}i[e]=r;return r};return t.getCssPropertyWithVendorPrefix(e)},
/**
     * Capitalizes the first letter of a string
     * @param {String} string
     * @returns {String} The string with the first letter capitalized
     */
capitalizeFirstLetter:function(e){return e.charAt(0).toUpperCase()+e.slice(1)},
/**
     * Compute the modulo of a number but makes sure to always return
     * a positive value (also known as Euclidean modulo).
     * @param {Number} number the number to compute the modulo of
     * @param {Number} modulo the modulo
     * @returns {Number} the result of the modulo of number
     */
positiveModulo:function(e,t){var i=e%t;i<0&&(i+=t);return i},
/**
     * Determines if a point is within the bounding rectangle of the given element (hit-test).
     * @function
     * @param {Element|String} element
     * @param {OpenSeadragon.Point} point
     * @returns {Boolean}
     */
pointInElement:function(e,i){e=t.getElement(e);var n=t.getElementOffset(e),r=t.getElementSize(e);return i.x>=n.x&&i.x<n.x+r.x&&i.y<n.y+r.y&&i.y>=n.y},
/**
     * Gets the position of the mouse on the screen for a given event.
     * @function
     * @param {Event} [event]
     * @returns {OpenSeadragon.Point}
     */
getMousePosition:function(e){if(typeof e.pageX==="number")t.getMousePosition=function(e){var i=new t.Point;i.x=e.pageX;i.y=e.pageY;return i};else{if(typeof e.clientX!=="number")throw new Error("Unknown event mouse position, no known technique.");t.getMousePosition=function(e){var i=new t.Point;i.x=e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;i.y=e.clientY+document.body.scrollTop+document.documentElement.scrollTop;return i}}return t.getMousePosition(e)},
/**
     * Determines the page's current scroll position.
     * @function
     * @returns {OpenSeadragon.Point}
     */
getPageScroll:function(){var e=document.documentElement||{},i=document.body||{};if(typeof window.pageXOffset==="number")t.getPageScroll=function(){return new t.Point(window.pageXOffset,window.pageYOffset)};else if(i.scrollLeft||i.scrollTop)t.getPageScroll=function(){return new t.Point(document.body.scrollLeft,document.body.scrollTop)};else{if(!e.scrollLeft&&!e.scrollTop)return new t.Point(0,0);t.getPageScroll=function(){return new t.Point(document.documentElement.scrollLeft,document.documentElement.scrollTop)}}return t.getPageScroll()},
/**
     * Set the page scroll position.
     * @function
     * @returns {OpenSeadragon.Point}
     */
setPageScroll:function(e){if(typeof window.scrollTo!=="undefined")t.setPageScroll=function(e){window.scrollTo(e.x,e.y)};else{var i=t.getPageScroll();if(i.x===e.x&&i.y===e.y)return;document.body.scrollLeft=e.x;document.body.scrollTop=e.y;var n=t.getPageScroll();if(n.x!==i.x&&n.y!==i.y){t.setPageScroll=function(e){document.body.scrollLeft=e.x;document.body.scrollTop=e.y};return}document.documentElement.scrollLeft=e.x;document.documentElement.scrollTop=e.y;n=t.getPageScroll();if(n.x!==i.x&&n.y!==i.y){t.setPageScroll=function(e){document.documentElement.scrollLeft=e.x;document.documentElement.scrollTop=e.y};return}t.setPageScroll=function(e){}}t.setPageScroll(e)},
/**
     * Determines the size of the browsers window.
     * @function
     * @returns {OpenSeadragon.Point}
     */
getWindowSize:function(){var e=document.documentElement||{},i=document.body||{};if(typeof window.innerWidth==="number")t.getWindowSize=function(){return new t.Point(window.innerWidth,window.innerHeight)};else if(e.clientWidth||e.clientHeight)t.getWindowSize=function(){return new t.Point(document.documentElement.clientWidth,document.documentElement.clientHeight)};else{if(!i.clientWidth&&!i.clientHeight)throw new Error("Unknown window size, no known technique.");t.getWindowSize=function(){return new t.Point(document.body.clientWidth,document.body.clientHeight)}}return t.getWindowSize()},
/**
     * Wraps the given element in a nest of divs so that the element can
     * be easily centered using CSS tables
     * @function
     * @param {Element|String} element
     * @returns {Element} outermost wrapper element
     */
makeCenteredNode:function(e){e=t.getElement(e);var i=[t.makeNeutralElement("div"),t.makeNeutralElement("div"),t.makeNeutralElement("div")];t.extend(i[0].style,{display:"table",height:"100%",width:"100%"});t.extend(i[1].style,{display:"table-row"});t.extend(i[2].style,{display:"table-cell",verticalAlign:"middle",textAlign:"center"});i[0].appendChild(i[1]);i[1].appendChild(i[2]);i[2].appendChild(e);return i[0]},
/**
     * Creates an easily positionable element of the given type that therefor
     * serves as an excellent container element.
     * @function
     * @param {String} tagName
     * @returns {Element}
     */
makeNeutralElement:function(e){var t=document.createElement(e),i=t.style;i.background="transparent none";i.border="none";i.margin="0px";i.padding="0px";i.position="static";return t},now:function(){Date.now?t.now=Date.now:t.now=function(){return(new Date).getTime()};return t.now()},
/**
     * Ensures an image is loaded correctly to support alpha transparency.
     * @function
     * @param {String} src
     * @returns {Element}
     */
makeTransparentImage:function(e){var i=t.makeNeutralElement("img");i.src=e;return i},
/**
     * Sets the opacity of the specified element.
     * @function
     * @param {Element|String} element
     * @param {Number} opacity
     * @param {Boolean} [usesAlpha]
     */
setElementOpacity:function(e,i,n){var r,o;e=t.getElement(e);n&&!t.Browser.alpha&&(i=Math.round(i));if(t.Browser.opacity)e.style.opacity=i<1?i:"";else if(i<1){r=Math.round(100*i);o="alpha(opacity="+r+")";e.style.filter=o}else e.style.filter=""},
/**
     * Sets the specified element's touch-action style attribute to 'none'.
     * @function
     * @param {Element|String} element
     */
setElementTouchActionNone:function(e){e=t.getElement(e);typeof e.style.touchAction!=="undefined"?e.style.touchAction="none":typeof e.style.msTouchAction!=="undefined"&&(e.style.msTouchAction="none")},
/**
     * Sets the specified element's pointer-events style attribute to the passed value.
     * @function
     * @param {Element|String} element
     * @param {String} value
     */
setElementPointerEvents:function(e,i){e=t.getElement(e);typeof e.style!=="undefined"&&typeof e.style.pointerEvents!=="undefined"&&(e.style.pointerEvents=i)},
/**
     * Sets the specified element's pointer-events style attribute to 'none'.
     * @function
     * @param {Element|String} element
     */
setElementPointerEventsNone:function(e){t.setElementPointerEvents(e,"none")},
/**
     * Add the specified CSS class to the element if not present.
     * @function
     * @param {Element|String} element
     * @param {String} className
     */
addClass:function(e,i){e=t.getElement(e);e.className?(" "+e.className+" ").indexOf(" "+i+" ")===-1&&(e.className+=" "+i):e.className=i},
/**
     * Find the first index at which an element is found in an array or -1
     * if not present.
     *
     * Code taken and adapted from
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Compatibility
     *
     * @function
     * @param {Array} array The array from which to find the element
     * @param {Object} searchElement The element to find
     * @param {Number} [fromIndex=0] Index to start research.
     * @returns {Number} The index of the element in the array.
     */
indexOf:function(t,i,n){Array.prototype.indexOf?(this||e).indexOf=function(e,t,i){return e.indexOf(t,i)}:(this||e).indexOf=function(e,t,i){var n,r,o=i||0;if(!e)throw new TypeError;r=e.length;if(r===0||o>=r)return-1;o<0&&(o=r-Math.abs(o));for(n=o;n<r;n++)if(e[n]===t)return n;return-1};return this.indexOf(t,i,n)},
/**
     * Remove the specified CSS class from the element.
     * @function
     * @param {Element|String} element
     * @param {String} className
     */
removeClass:function(e,i){var n,r,o=[];e=t.getElement(e);n=e.className.split(/\s+/);for(r=0;r<n.length;r++)n[r]&&n[r]!==i&&o.push(n[r]);e.className=o.join(" ")},
/**
     * Convert passed addEventListener() options to boolean or options object,
     * depending on browser support.
     * @function
     * @param {Boolean|Object} [options] Boolean useCapture, or if [supportsEventListenerOptions]{@link OpenSeadragon.supportsEventListenerOptions}, can be an object
     * @param {Boolean} [options.capture]
     * @param {Boolean} [options.passive]
     * @param {Boolean} [options.once]
     * @returns {String} The protocol (http:, https:, file:, ftp: ...)
     */
normalizeEventListenerOptions:function(e){var i;i=typeof e!=="undefined"?typeof e==="boolean"?t.supportsEventListenerOptions?{capture:e}:e:t.supportsEventListenerOptions?e:typeof e.capture!=="undefined"&&e.capture:!!t.supportsEventListenerOptions&&{capture:false};return i},
/**
     * Adds an event listener for the given element, eventName and handler.
     * @function
     * @param {Element|String} element
     * @param {String} eventName
     * @param {Function} handler
     * @param {Boolean|Object} [options] Boolean useCapture, or if [supportsEventListenerOptions]{@link OpenSeadragon.supportsEventListenerOptions}, can be an object
     * @param {Boolean} [options.capture]
     * @param {Boolean} [options.passive]
     * @param {Boolean} [options.once]
     */
addEvent:function(){if(t.supportsAddEventListener)return function(e,i,n,r){r=t.normalizeEventListenerOptions(r);e=t.getElement(e);e.addEventListener(i,n,r)};if(document.documentElement.attachEvent&&document.attachEvent)return function(e,i,n){e=t.getElement(e);e.attachEvent("on"+i,n)};throw new Error("No known event model.")}(),
/**
     * Remove a given event listener for the given element, event type and
     * handler.
     * @function
     * @param {Element|String} element
     * @param {String} eventName
     * @param {Function} handler
     * @param {Boolean|Object} [options] Boolean useCapture, or if [supportsEventListenerOptions]{@link OpenSeadragon.supportsEventListenerOptions}, can be an object
     * @param {Boolean} [options.capture]
     */
removeEvent:function(){if(t.supportsRemoveEventListener)return function(e,i,n,r){r=t.normalizeEventListenerOptions(r);e=t.getElement(e);e.removeEventListener(i,n,r)};if(document.documentElement.detachEvent&&document.detachEvent)return function(e,i,n){e=t.getElement(e);e.detachEvent("on"+i,n)};throw new Error("No known event model.")}(),
/**
     * Cancels the default browser behavior had the event propagated all
     * the way up the DOM to the window object.
     * @function
     * @param {Event} [event]
     */
cancelEvent:function(e){e.preventDefault()},
/**
     * Returns true if {@link OpenSeadragon.cancelEvent|cancelEvent} has been called on
     * the event, otherwise returns false.
     * @function
     * @param {Event} [event]
     */
eventIsCanceled:function(e){return e.defaultPrevented},
/**
     * Stops the propagation of the event through the DOM in the capturing and bubbling phases.
     * @function
     * @param {Event} [event]
     */
stopEvent:function(e){e.stopPropagation()},createCallback:function(e,t){console.error("The createCallback function is deprecated and will be removed in future versions. Please use alternativeFunction instead.");var i,n=[];for(i=2;i<arguments.length;i++)n.push(arguments[i]);return function(){var i,r=n.concat([]);for(i=0;i<arguments.length;i++)r.push(arguments[i]);return t.apply(e,r)}},
/**
     * Retrieves the value of a url parameter from the window.location string.
     * @function
     * @param {String} key
     * @returns {String} The value of the url parameter or null if no param matches.
     */
getUrlParameter:function(e){var t=n[e];return t||null},
/**
     * Retrieves the protocol used by the url. The url can either be absolute
     * or relative.
     * @function
     * @private
     * @param {String} url The url to retrieve the protocol from.
     * @returns {String} The protocol (http:, https:, file:, ftp: ...)
     */
getUrlProtocol:function(e){var t=e.match(/^([a-z]+:)\/\//i);return t===null?window.location.protocol:t[1].toLowerCase()},
/**
     * Create an XHR object
     * @private
     * @param {type} [local] Deprecated. Ignored (IE/ActiveXObject file protocol no longer supported).
     * @returns {XMLHttpRequest}
     */
createAjaxRequest:function(){if(window.XMLHttpRequest){t.createAjaxRequest=function(){return new XMLHttpRequest};return new XMLHttpRequest}throw new Error("Browser doesn't support XMLHttpRequest.")},
/**
     * Makes an AJAX request.
     * @param {Object} options
     * @param {String} options.url - the url to request
     * @param {Function} options.success - a function to call on a successful response
     * @param {Function} options.error - a function to call on when an error occurs
     * @param {Object} options.headers - headers to add to the AJAX request
     * @param {String} options.responseType - the response type of the AJAX request
     * @param {String} options.postData - HTTP POST data (usually but not necessarily in k=v&k2=v2... form,
     *      see TileSource::getPostData), GET method used if null
     * @param {Boolean} [options.withCredentials=false] - whether to set the XHR's withCredentials
     * @throws {Error}
     * @returns {XMLHttpRequest}
     */
makeAjaxRequest:function(e,i,n){var r;var o;var s;var a;if(t.isPlainObject(e)){i=e.success;n=e.error;r=e.withCredentials;o=e.headers;s=e.responseType||null;a=e.postData||null;e=e.url}var l=t.getUrlProtocol(e);var h=t.createAjaxRequest();if(!t.isFunction(i))throw new Error("makeAjaxRequest requires a success callback");h.onreadystatechange=function(){if(h.readyState===4){h.onreadystatechange=function(){};h.status>=200&&h.status<300||h.status===0&&l!=="http:"&&l!=="https:"?i(h):t.isFunction(n)?n(h):t.console.error("AJAX request returned %d: %s",h.status,e)}};var u=a?"POST":"GET";try{h.open(u,e,true);s&&(h.responseType=s);if(o)for(var c in o)Object.prototype.hasOwnProperty.call(o,c)&&o[c]&&h.setRequestHeader(c,o[c]);r&&(h.withCredentials=true);h.send(a)}catch(e){t.console.error("%s while making AJAX request: %s",e.name,e.message);h.onreadystatechange=function(){};t.isFunction(n)&&n(h,e)}return h},
/**
     * Taken from jQuery 1.6.1
     * @function
     * @param {Object} options
     * @param {String} options.url
     * @param {Function} options.callback
     * @param {String} [options.param='callback'] The name of the url parameter
     *      to request the jsonp provider with.
     * @param {String} [options.callbackName=] The name of the callback to
     *      request the jsonp provider with.
     */
jsonp:function(e){var i,n=e.url,r=document.head||document.getElementsByTagName("head")[0]||document.documentElement,o=e.callbackName||"openseadragon"+t.now(),s=window[o],a="$1"+o+"$2",l=e.param||"callback",h=e.callback;n=n.replace(/(=)\?(&|$)|\?\?/i,a);n+=(/\?/.test(n)?"&":"?")+l+"="+o;window[o]=function(e){if(s)window[o]=s;else try{delete window[o]}catch(e){}h&&t.isFunction(h)&&h(e)};i=document.createElement("script");void 0===e.async&&false===e.async||(i.async="async");e.scriptCharset&&(i.charset=e.scriptCharset);i.src=n;i.onload=i.onreadystatechange=function(e,t){if(t||!i.readyState||/loaded|complete/.test(i.readyState)){i.onload=i.onreadystatechange=null;r&&i.parentNode&&r.removeChild(i);i=void 0}};r.insertBefore(i,r.firstChild)},
/**
     * Fully deprecated. Will throw an error.
     * @function
     * @deprecated use {@link OpenSeadragon.Viewer#open}
     */
createFromDZI:function(){throw"OpenSeadragon.createFromDZI is deprecated, use Viewer.open."},
/**
     * Parses an XML string into a DOM Document.
     * @function
     * @param {String} string
     * @returns {Document}
     */
parseXml:function(e){if(!window.DOMParser)throw new Error("Browser doesn't support XML DOM.");t.parseXml=function(e){var t,i=null;t=new DOMParser;i=t.parseFromString(e,"text/xml");return i};return t.parseXml(e)},
/**
     * Parses a JSON string into a Javascript object.
     * @function
     * @param {String} string
     * @returns {Object}
     */
parseJSON:function(e){t.parseJSON=window.JSON.parse;return t.parseJSON(e)},
/**
     * Reports whether the image format is supported for tiling in this
     * version.
     * @function
     * @param {String} [extension]
     * @returns {Boolean}
     */
imageFormatSupported:function(e){e=e||"";return!!i[e.toLowerCase()]},
/**
     * Updates supported image formats with user-specified values.
     * Preexisting formats that are not being updated are left unchanged.
     * By default, the defined formats are
     * <pre><code>{
     *      avif: true,
     *      bmp:  false,
     *      jpeg: true,
     *      jpg:  true,
     *      png:  true,
     *      tif:  false,
     *      wdp:  false,
     *      webp: true
     * }
     * </code></pre>
     * @function
     * @example
     * // sets bmp as supported and png as unsupported
     * setImageFormatsSupported({bmp: true, png: false});
     * @param {Object} formats An object containing format extensions as
     * keys and booleans as values.
     */
setImageFormatsSupported:function(e){t.extend(i,e)}});var nullfunction=function(e){};t.console=window.console||{log:nullfunction,debug:nullfunction,info:nullfunction,warn:nullfunction,error:nullfunction,assert:nullfunction};
/**
   * The current browser vendor, version, and related information regarding detected features.
   * @member {Object} Browser
   * @memberof OpenSeadragon
   * @static
   * @type {Object}
   * @property {OpenSeadragon.BROWSERS} vendor - One of the {@link OpenSeadragon.BROWSERS} enumeration values.
   * @property {Number} version
   * @property {Boolean} alpha - Does the browser support image alpha transparency.
   */t.Browser={vendor:t.BROWSERS.UNKNOWN,version:0,alpha:true};var i={avif:true,bmp:false,jpeg:true,jpg:true,png:true,tif:false,wdp:false,webp:true},n={};(function(){var e,i=navigator.appVersion,r=navigator.userAgent;switch(navigator.appName){case"Microsoft Internet Explorer":if(!!window.attachEvent&&!!window.ActiveXObject){t.Browser.vendor=t.BROWSERS.IE;t.Browser.version=parseFloat(r.substring(r.indexOf("MSIE")+5,r.indexOf(";",r.indexOf("MSIE"))))}break;case"Netscape":if(window.addEventListener)if(r.indexOf("Edge")>=0){t.Browser.vendor=t.BROWSERS.EDGE;t.Browser.version=parseFloat(r.substring(r.indexOf("Edge")+5))}else if(r.indexOf("Edg")>=0){t.Browser.vendor=t.BROWSERS.CHROMEEDGE;t.Browser.version=parseFloat(r.substring(r.indexOf("Edg")+4))}else if(r.indexOf("Firefox")>=0){t.Browser.vendor=t.BROWSERS.FIREFOX;t.Browser.version=parseFloat(r.substring(r.indexOf("Firefox")+8))}else if(r.indexOf("Safari")>=0){t.Browser.vendor=r.indexOf("Chrome")>=0?t.BROWSERS.CHROME:t.BROWSERS.SAFARI;t.Browser.version=parseFloat(r.substring(r.substring(0,r.indexOf("Safari")).lastIndexOf("/")+1,r.indexOf("Safari")))}else{e=new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})");if(e.exec(r)!==null){t.Browser.vendor=t.BROWSERS.IE;t.Browser.version=parseFloat(RegExp.$1)}}break;case"Opera":t.Browser.vendor=t.BROWSERS.OPERA;t.Browser.version=parseFloat(i);break}var o,s,a,l=window.location.search.substring(1),h=l.split("&");for(a=0;a<h.length;a++){o=h[a];s=o.indexOf("=");if(s>0){var u=o.substring(0,s),c=o.substring(s+1);try{n[u]=decodeURIComponent(c)}catch(e){t.console.error("Ignoring malformed URL parameter: %s=%s",u,c)}}}t.Browser.alpha=!(t.Browser.vendor===t.BROWSERS.CHROME&&t.Browser.version<2);t.Browser.opacity=true;t.Browser.vendor===t.BROWSERS.IE&&t.console.error("Internet Explorer is not supported by OpenSeadragon")})();(function(e){var i=e.requestAnimationFrame||e.mozRequestAnimationFrame||e.webkitRequestAnimationFrame||e.msRequestAnimationFrame;var n=e.cancelAnimationFrame||e.mozCancelAnimationFrame||e.webkitCancelAnimationFrame||e.msCancelAnimationFrame;if(i&&n){t.requestAnimationFrame=function(){return i.apply(e,arguments)};t.cancelAnimationFrame=function(){return n.apply(e,arguments)}}else{var r,o=[],s=[],a=0;t.requestAnimationFrame=function(e){o.push([++a,e]);r||(r=setInterval((function(){if(o.length){var e=t.now();var i=s;s=o;o=i;while(s.length)s.shift()[1](e)}else{clearInterval(r);r=void 0}}),20));return a};t.cancelAnimationFrame=function(e){var t,i;for(t=0,i=o.length;t<i;t+=1)if(o[t][0]===e){o.splice(t,1);return}for(t=0,i=s.length;t<i;t+=1)if(s[t][0]===e){s.splice(t,1);return}}}})(window);
/**
   * @private
   * @inner
   * @function
   * @param {Element} element
   * @param {Boolean} [isFixed]
   * @returns {Element}
   */function getOffsetParent(e,t){return t&&e!==document.body?document.body:e.offsetParent}})(OpenSeadragon);(function(e,i){t?t=i():e.OpenSeadragon=i()})(t,(function(){return OpenSeadragon}));(function(e){
/**
   *
   *
   * @class Mat3
   * @classdesc A left-to-right matrix representation, useful for affine transforms for
   * positioning tiles for drawing
   *
   * @memberof OpenSeadragon
   *
   * @param {Array} [values] - Initial values for the matrix
   *
   **/
class Mat3{constructor(e){e||(e=[0,0,0,0,0,0,0,0,0]);this.values=e}
/**
     * @function makeIdentity
     * @memberof OpenSeadragon.Mat3
     * @static
     * @returns {OpenSeadragon.Mat3} an identity matrix
     */static makeIdentity(){return new Mat3([1,0,0,0,1,0,0,0,1])}
/**
     * @function makeTranslation
     * @memberof OpenSeadragon.Mat3
     * @static
     * @param {Number} tx The x value of the translation
     * @param {Number} ty The y value of the translation
     * @returns {OpenSeadragon.Mat3} A translation matrix
     */static makeTranslation(e,t){return new Mat3([1,0,0,0,1,0,e,t,1])}
/**
     * @function makeRotation
     * @memberof OpenSeadragon.Mat3
     * @static
     * @param {Number} angleInRadians The desired rotation angle, in radians
     * @returns {OpenSeadragon.Mat3} A rotation matrix
     */static makeRotation(e){var t=Math.cos(e);var i=Math.sin(e);return new Mat3([t,-i,0,i,t,0,0,0,1])}
/**
     * @function makeScaling
     * @memberof OpenSeadragon.Mat3
     * @static
     * @param {Number} sx The x value of the scaling
     * @param {Number} sy The y value of the scaling
     * @returns {OpenSeadragon.Mat3} A scaling matrix
     */static makeScaling(e,t){return new Mat3([e,0,0,0,t,0,0,0,1])}
/**
     * @alias multiply
     * @memberof! OpenSeadragon.Mat3
     * @param {OpenSeadragon.Mat3} other the matrix to multiply with
     * @returns {OpenSeadragon.Mat3} The result of matrix multiplication
     */multiply(e){let t=this.values;let i=e.values;var n=t[0];var r=t[1];var o=t[2];var s=t[3];var a=t[4];var l=t[5];var h=t[6];var u=t[7];var c=t[8];var d=i[0];var p=i[1];var g=i[2];var v=i[3];var m=i[4];var f=i[5];var y=i[6];var w=i[7];var T=i[8];return new Mat3([d*n+p*s+g*h,d*r+p*a+g*u,d*o+p*l+g*c,v*n+m*s+f*h,v*r+m*a+f*u,v*o+m*l+f*c,y*n+w*s+T*h,y*r+w*a+T*u,y*o+w*l+T*c])}}e.Mat3=Mat3})(OpenSeadragon);(function(e){
/**
   * Determine native full screen support we can get from the browser.
   * @member fullScreenApi
   * @memberof OpenSeadragon
   * @type {object}
   * @property {Boolean} supportsFullScreen Return true if full screen API is supported.
   * @property {Function} isFullScreen Return true if currently in full screen mode.
   * @property {Function} getFullScreenElement Return the element currently in full screen mode.
   * @property {Function} requestFullScreen Make a request to go in full screen mode.
   * @property {Function} exitFullScreen Make a request to exit full screen mode.
   * @property {Function} cancelFullScreen Deprecated, use exitFullScreen instead.
   * @property {String} fullScreenEventName Event fired when the full screen mode change.
   * @property {String} fullScreenErrorEventName Event fired when a request to go
   * in full screen mode failed.
   */
var t={supportsFullScreen:false,isFullScreen:function(){return false},getFullScreenElement:function(){return null},requestFullScreen:function(){},exitFullScreen:function(){},cancelFullScreen:function(){},fullScreenEventName:"",fullScreenErrorEventName:""};if(document.exitFullscreen){t.supportsFullScreen=true;t.getFullScreenElement=function(){return document.fullscreenElement};t.requestFullScreen=function(t){return t.requestFullscreen().catch((function(t){e.console.error("Fullscreen request failed: ",t)}))};t.exitFullScreen=function(){document.exitFullscreen().catch((function(t){e.console.error("Error while exiting fullscreen: ",t)}))};t.fullScreenEventName="fullscreenchange";t.fullScreenErrorEventName="fullscreenerror"}else if(document.msExitFullscreen){t.supportsFullScreen=true;t.getFullScreenElement=function(){return document.msFullscreenElement};t.requestFullScreen=function(e){return e.msRequestFullscreen()};t.exitFullScreen=function(){document.msExitFullscreen()};t.fullScreenEventName="MSFullscreenChange";t.fullScreenErrorEventName="MSFullscreenError"}else if(document.webkitExitFullscreen){t.supportsFullScreen=true;t.getFullScreenElement=function(){return document.webkitFullscreenElement};t.requestFullScreen=function(e){return e.webkitRequestFullscreen()};t.exitFullScreen=function(){document.webkitExitFullscreen()};t.fullScreenEventName="webkitfullscreenchange";t.fullScreenErrorEventName="webkitfullscreenerror"}else if(document.webkitCancelFullScreen){t.supportsFullScreen=true;t.getFullScreenElement=function(){return document.webkitCurrentFullScreenElement};t.requestFullScreen=function(e){return e.webkitRequestFullScreen()};t.exitFullScreen=function(){document.webkitCancelFullScreen()};t.fullScreenEventName="webkitfullscreenchange";t.fullScreenErrorEventName="webkitfullscreenerror"}else if(document.mozCancelFullScreen){t.supportsFullScreen=true;t.getFullScreenElement=function(){return document.mozFullScreenElement};t.requestFullScreen=function(e){return e.mozRequestFullScreen()};t.exitFullScreen=function(){document.mozCancelFullScreen()};t.fullScreenEventName="mozfullscreenchange";t.fullScreenErrorEventName="mozfullscreenerror"}t.isFullScreen=function(){return t.getFullScreenElement()!==null};t.cancelFullScreen=function(){e.console.error("cancelFullScreen is deprecated. Use exitFullScreen instead.");t.exitFullScreen()};e.extend(e,t)})(OpenSeadragon);(function(t){
/**
   * Event handler method signature used by all OpenSeadragon events.
   *
   * @callback EventHandler
   * @memberof OpenSeadragon
   * @param {Object} event - See individual events for event-specific properties.
   */
t.EventSource=function(){(this||e).events={};(this||e)._rejectedEventList={}};t.EventSource.prototype={
/**
     * Add an event handler to be triggered only once (or a given number of times)
     * for a given event. It is not removable with removeHandler().
     * @function
     * @param {String} eventName - Name of event to register.
     * @param {OpenSeadragon.EventHandler} handler - Function to call when event
     * is triggered.
     * @param {Object} [userData=null] - Arbitrary object to be passed unchanged
     * to the handler.
     * @param {Number} [times=1] - The number of times to handle the event
     * before removing it.
     * @param {Number} [priority=0] - Handler priority. By default, all priorities are 0. Higher number = priority.
     * @returns {Boolean} - True if the handler was added, false if it was rejected
     */
addOnceHandler:function(t,i,n,r,o){var s=this||e;r=r||1;var a=0;var onceHandler=function(e){a++;a===r&&s.removeHandler(t,onceHandler);return i(e)};return this.addHandler(t,onceHandler,n,o)},
/**
     * Add an event handler for a given event.
     * @function
     * @param {String} eventName - Name of event to register.
     * @param {OpenSeadragon.EventHandler} handler - Function to call when event is triggered.
     * @param {Object} [userData=null] - Arbitrary object to be passed unchanged to the handler.
     * @param {Number} [priority=0] - Handler priority. By default, all priorities are 0. Higher number = priority.
     * @returns {Boolean} - True if the handler was added, false if it was rejected
     */
addHandler:function(i,n,r,o){if(Object.prototype.hasOwnProperty.call((this||e)._rejectedEventList,i)){t.console.error(`Error adding handler for ${i}. ${(this||e)._rejectedEventList[i]}`);return false}var s=(this||e).events[i];s||((this||e).events[i]=s=[]);if(n&&t.isFunction(n)){var a=s.length,l={handler:n,userData:r||null,priority:o||0};s[a]=l;while(a>0&&s[a-1].priority<s[a].priority){s[a]=s[a-1];s[a-1]=l;a--}}return true},
/**
     * Remove a specific event handler for a given event.
     * @function
     * @param {String} eventName - Name of event for which the handler is to be removed.
     * @param {OpenSeadragon.EventHandler} handler - Function to be removed.
     */
removeHandler:function(i,n){var r,o=(this||e).events[i],s=[];if(o&&t.isArray(o)){for(r=0;r<o.length;r++)o[r].handler!==n&&s.push(o[r]);(this||e).events[i]=s}},
/**
     * Get the amount of handlers registered for a given event.
     * @param {String} eventName - Name of event to inspect.
     * @returns {number} amount of events
     */
numberOfHandlers:function(t){var i=(this||e).events[t];return i?i.length:0},
/**
     * Remove all event handlers for a given event type. If no type is given all
     * event handlers for every event type are removed.
     * @function
     * @param {String} eventName - Name of event for which all handlers are to be removed.
     */
removeAllHandlers:function(t){if(t)(this||e).events[t]=[];else for(var i in(this||e).events)(this||e).events[i]=[]},
/**
     * Get a function which iterates the list of all handlers registered for a given event, calling the handler for each.
     * @function
     * @param {String} eventName - Name of event to get handlers for.
     */
getHandler:function(t){var i=(this||e).events[t];if(!i||!i.length)return null;i=i.length===1?[i[0]]:Array.apply(null,i);return function(e,t){var n,r=i.length;for(n=0;n<r;n++)if(i[n]){t.eventSource=e;t.userData=i[n].userData;i[n].handler(t)}}},
/**
     * Trigger an event, optionally passing additional information.
     * @function
     * @param {String} eventName - Name of event to register.
     * @param {Object} eventArgs - Event-specific data.
     * @returns {Boolean} True if the event was fired, false if it was rejected because of rejectEventHandler(eventName)
     */
raiseEvent:function(i,n){if(Object.prototype.hasOwnProperty.call((this||e)._rejectedEventList,i)){t.console.error(`Error adding handler for ${i}. ${(this||e)._rejectedEventList[i]}`);return false}var r=this.getHandler(i);r&&r(this||e,n||{});return true},
/**
     * Set an event name as being disabled, and provide an optional error message
     * to be printed to the console
     * @param {String} eventName - Name of the event
     * @param {String} [errorMessage] - Optional string to print to the console
     * @private
     */
rejectEventHandler(t,i=""){(this||e)._rejectedEventList[t]=i},
/**
     * Explicitly allow an event handler to be added for this event type, undoing
     * the effects of rejectEventHandler
     * @param {String} eventName - Name of the event
     * @private
     */
allowEventHandler(t){delete(this||e)._rejectedEventList[t]}}})(OpenSeadragon);(function(t){var i=[];var n={};
/**
   * @class MouseTracker
   * @classdesc Provides simplified handling of common pointer device (mouse, touch, pen, etc.) gestures
   *            and keyboard events on a specified element.
   * @memberof OpenSeadragon
   * @param {Object} options
   *      Allows configurable properties to be entirely specified by passing
   *      an options object to the constructor.  The constructor also supports
   *      the original positional arguments 'element', 'clickTimeThreshold',
   *      and 'clickDistThreshold' in that order.
   * @param {Element|String} options.element
   *      A reference to an element or an element id for which the pointer/key
   *      events will be monitored.
   * @param {Boolean} [options.startDisabled=false]
   *      If true, event tracking on the element will not start until
   *      {@link OpenSeadragon.MouseTracker.setTracking|setTracking} is called.
   * @param {Number} [options.clickTimeThreshold=300]
   *      The number of milliseconds within which a pointer down-up event combination
   *      will be treated as a click gesture.
   * @param {Number} [options.clickDistThreshold=5]
   *      The maximum distance allowed between a pointer down event and a pointer up event
   *      to be treated as a click gesture.
   * @param {Number} [options.dblClickTimeThreshold=300]
   *      The number of milliseconds within which two pointer down-up event combinations
   *      will be treated as a double-click gesture.
   * @param {Number} [options.dblClickDistThreshold=20]
   *      The maximum distance allowed between two pointer click events
   *      to be treated as a click gesture.
   * @param {Number} [options.stopDelay=50]
   *      The number of milliseconds without pointer move before the stop
   *      event is fired.
   * @param {OpenSeadragon.EventHandler} [options.preProcessEventHandler=null]
   *      An optional handler for controlling DOM event propagation and processing.
   * @param {OpenSeadragon.EventHandler} [options.contextMenuHandler=null]
   *      An optional handler for contextmenu.
   * @param {OpenSeadragon.EventHandler} [options.enterHandler=null]
   *      An optional handler for pointer enter.
   * @param {OpenSeadragon.EventHandler} [options.leaveHandler=null]
   *      An optional handler for pointer leave.
   * @param {OpenSeadragon.EventHandler} [options.exitHandler=null]
   *      An optional handler for pointer leave. <span style="color:red;">Deprecated. Use leaveHandler instead.</span>
   * @param {OpenSeadragon.EventHandler} [options.overHandler=null]
   *      An optional handler for pointer over.
   * @param {OpenSeadragon.EventHandler} [options.outHandler=null]
   *      An optional handler for pointer out.
   * @param {OpenSeadragon.EventHandler} [options.pressHandler=null]
   *      An optional handler for pointer press.
   * @param {OpenSeadragon.EventHandler} [options.nonPrimaryPressHandler=null]
   *      An optional handler for pointer non-primary button press.
   * @param {OpenSeadragon.EventHandler} [options.releaseHandler=null]
   *      An optional handler for pointer release.
   * @param {OpenSeadragon.EventHandler} [options.nonPrimaryReleaseHandler=null]
   *      An optional handler for pointer non-primary button release.
   * @param {OpenSeadragon.EventHandler} [options.moveHandler=null]
   *      An optional handler for pointer move.
   * @param {OpenSeadragon.EventHandler} [options.scrollHandler=null]
   *      An optional handler for mouse wheel scroll.
   * @param {OpenSeadragon.EventHandler} [options.clickHandler=null]
   *      An optional handler for pointer click.
   * @param {OpenSeadragon.EventHandler} [options.dblClickHandler=null]
   *      An optional handler for pointer double-click.
   * @param {OpenSeadragon.EventHandler} [options.dragHandler=null]
   *      An optional handler for the drag gesture.
   * @param {OpenSeadragon.EventHandler} [options.dragEndHandler=null]
   *      An optional handler for after a drag gesture.
   * @param {OpenSeadragon.EventHandler} [options.pinchHandler=null]
   *      An optional handler for the pinch gesture.
   * @param {OpenSeadragon.EventHandler} [options.keyDownHandler=null]
   *      An optional handler for keydown.
   * @param {OpenSeadragon.EventHandler} [options.keyUpHandler=null]
   *      An optional handler for keyup.
   * @param {OpenSeadragon.EventHandler} [options.keyHandler=null]
   *      An optional handler for keypress.
   * @param {OpenSeadragon.EventHandler} [options.focusHandler=null]
   *      An optional handler for focus.
   * @param {OpenSeadragon.EventHandler} [options.blurHandler=null]
   *      An optional handler for blur.
   * @param {Object} [options.userData=null]
   *      Arbitrary object to be passed unchanged to any attached handler methods.
   */t.MouseTracker=function(r){i.push(this||e);var o=arguments;t.isPlainObject(r)||(r={element:o[0],clickTimeThreshold:o[1],clickDistThreshold:o[2]});(this||e).hash=Math.random();(this||e).element=t.getElement(r.element);(this||e).clickTimeThreshold=r.clickTimeThreshold||t.DEFAULT_SETTINGS.clickTimeThreshold;(this||e).clickDistThreshold=r.clickDistThreshold||t.DEFAULT_SETTINGS.clickDistThreshold;(this||e).dblClickTimeThreshold=r.dblClickTimeThreshold||t.DEFAULT_SETTINGS.dblClickTimeThreshold;(this||e).dblClickDistThreshold=r.dblClickDistThreshold||t.DEFAULT_SETTINGS.dblClickDistThreshold;(this||e).userData=r.userData||null;(this||e).stopDelay=r.stopDelay||50;(this||e).preProcessEventHandler=r.preProcessEventHandler||null;(this||e).contextMenuHandler=r.contextMenuHandler||null;(this||e).enterHandler=r.enterHandler||null;(this||e).leaveHandler=r.leaveHandler||null;(this||e).exitHandler=r.exitHandler||null;(this||e).overHandler=r.overHandler||null;(this||e).outHandler=r.outHandler||null;(this||e).pressHandler=r.pressHandler||null;(this||e).nonPrimaryPressHandler=r.nonPrimaryPressHandler||null;(this||e).releaseHandler=r.releaseHandler||null;(this||e).nonPrimaryReleaseHandler=r.nonPrimaryReleaseHandler||null;(this||e).moveHandler=r.moveHandler||null;(this||e).scrollHandler=r.scrollHandler||null;(this||e).clickHandler=r.clickHandler||null;(this||e).dblClickHandler=r.dblClickHandler||null;(this||e).dragHandler=r.dragHandler||null;(this||e).dragEndHandler=r.dragEndHandler||null;(this||e).pinchHandler=r.pinchHandler||null;(this||e).stopHandler=r.stopHandler||null;(this||e).keyDownHandler=r.keyDownHandler||null;(this||e).keyUpHandler=r.keyUpHandler||null;(this||e).keyHandler=r.keyHandler||null;(this||e).focusHandler=r.focusHandler||null;(this||e).blurHandler=r.blurHandler||null;var s=this||e;n[(this||e).hash]={click:function(e){onClick(s,e)},dblclick:function(e){onDblClick(s,e)},keydown:function(e){onKeyDown(s,e)},keyup:function(e){onKeyUp(s,e)},keypress:function(e){onKeyPress(s,e)},focus:function(e){onFocus(s,e)},blur:function(e){onBlur(s,e)},contextmenu:function(e){onContextMenu(s,e)},wheel:function(e){onWheel(s,e)},mousewheel:function(e){onMouseWheel(s,e)},DOMMouseScroll:function(e){onMouseWheel(s,e)},MozMousePixelScroll:function(e){onMouseWheel(s,e)},losecapture:function(e){onLoseCapture(s,e)},mouseenter:function(e){onPointerEnter(s,e)},mouseleave:function(e){onPointerLeave(s,e)},mouseover:function(e){onPointerOver(s,e)},mouseout:function(e){onPointerOut(s,e)},mousedown:function(e){onPointerDown(s,e)},mouseup:function(e){onPointerUp(s,e)},mousemove:function(e){onPointerMove(s,e)},touchstart:function(e){onTouchStart(s,e)},touchend:function(e){onTouchEnd(s,e)},touchmove:function(e){onTouchMove(s,e)},touchcancel:function(e){onTouchCancel(s,e)},gesturestart:function(e){onGestureStart(s,e)},gesturechange:function(e){onGestureChange(s,e)},gotpointercapture:function(e){onGotPointerCapture(s,e)},lostpointercapture:function(e){onLostPointerCapture(s,e)},pointerenter:function(e){onPointerEnter(s,e)},pointerleave:function(e){onPointerLeave(s,e)},pointerover:function(e){onPointerOver(s,e)},pointerout:function(e){onPointerOut(s,e)},pointerdown:function(e){onPointerDown(s,e)},pointerup:function(e){onPointerUp(s,e)},pointermove:function(e){onPointerMove(s,e)},pointercancel:function(e){onPointerCancel(s,e)},pointerupcaptured:function(e){onPointerUpCaptured(s,e)},pointermovecaptured:function(e){onPointerMoveCaptured(s,e)},tracking:false,activePointersLists:[],lastClickPos:null,dblClickTimeOut:null,pinchGPoints:[],lastPinchDist:0,currentPinchDist:0,lastPinchCenter:null,currentPinchCenter:null,sentDragEvent:false};(this||e).hasGestureHandlers=!!((this||e).pressHandler||(this||e).nonPrimaryPressHandler||(this||e).releaseHandler||(this||e).nonPrimaryReleaseHandler||(this||e).clickHandler||(this||e).dblClickHandler||(this||e).dragHandler||(this||e).dragEndHandler||(this||e).pinchHandler);(this||e).hasScrollHandler=!!(this||e).scrollHandler;t.MouseTracker.havePointerEvents&&t.setElementPointerEvents((this||e).element,"auto");(this||e).exitHandler&&t.console.error("MouseTracker.exitHandler is deprecated. Use MouseTracker.leaveHandler instead.");r.startDisabled||this.setTracking(true)};t.MouseTracker.prototype={destroy:function(){var t;stopTracking(this||e);(this||e).element=null;for(t=0;t<i.length;t++)if(i[t]===(this||e)){i.splice(t,1);break}n[(this||e).hash]=null;delete n[(this||e).hash]},
/**
     * Are we currently tracking events on this element.
     * @deprecated Just use this.tracking
     * @function
     * @returns {Boolean} Are we currently tracking events on this element.
     */
isTracking:function(){return n[(this||e).hash].tracking},
/**
     * Enable or disable whether or not we are tracking events on this element.
     * @function
     * @param {Boolean} track True to start tracking, false to stop tracking.
     * @returns {OpenSeadragon.MouseTracker} Chainable.
     */
setTracking:function(t){t?startTracking(this||e):stopTracking(this||e);return this||e},
/**
     * Returns the {@link OpenSeadragon.MouseTracker.GesturePointList|GesturePointList} for the given pointer device type,
     * creating and caching a new {@link OpenSeadragon.MouseTracker.GesturePointList|GesturePointList} if one doesn't already exist for the type.
     * @function
     * @param {String} type - The pointer device type: "mouse", "touch", "pen", etc.
     * @returns {OpenSeadragon.MouseTracker.GesturePointList}
     */
getActivePointersListByType:function(i){var r,o,s=n[(this||e).hash],a=s?s.activePointersLists.length:0;for(r=0;r<a;r++)if(s.activePointersLists[r].type===i)return s.activePointersLists[r];o=new t.MouseTracker.GesturePointList(i);s&&s.activePointersLists.push(o);return o},
/**
     * Returns the total number of pointers currently active on the tracked element.
     * @function
     * @returns {Number}
     */
getActivePointerCount:function(){var t,i=n[(this||e).hash],r=i.activePointersLists.length,o=0;for(t=0;t<r;t++)o+=i.activePointersLists[t].getLength();return o},
/**
     * Implement or assign implementation to these handlers during or after
     * calling the constructor.
     * @function
     * @param {OpenSeadragon.MouseTracker.EventProcessInfo} eventInfo
     */
preProcessEventHandler:function(){},
/**
     * Implement or assign implementation to these handlers during or after
     * calling the constructor.
     * @function
     * @param {Object} event
     * @param {OpenSeadragon.MouseTracker} event.eventSource
     *      A reference to the tracker instance.
     * @param {OpenSeadragon.Point} event.position
     *      The position of the event relative to the tracked element.
     * @param {Object} event.originalEvent
     *      The original event object.
     * @param {Boolean} event.preventDefault
     *      Set to true to prevent the default user-agent's handling of the contextmenu event.
     * @param {Object} event.userData
     *      Arbitrary user-defined object.
     */
contextMenuHandler:function(){},
/**
     * Implement or assign implementation to these handlers during or after
     * calling the constructor.
     * @function
     * @param {Object} event
     * @param {OpenSeadragon.MouseTracker} event.eventSource
     *      A reference to the tracker instance.
     * @param {String} event.pointerType
     *     "mouse", "touch", "pen", etc.
     * @param {OpenSeadragon.Point} event.position
     *      The position of the event relative to the tracked element.
     * @param {Number} event.buttons
     *      Current buttons pressed.
     *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
     * @param {Number} event.pointers
     *      Number of pointers (all types) active in the tracked element.
     * @param {Boolean} event.insideElementPressed
     *      True if the left mouse button is currently being pressed and was
     *      initiated inside the tracked element, otherwise false.
     * @param {Boolean} event.buttonDownAny
     *      Was the button down anywhere in the screen during the event. <span style="color:red;">Deprecated. Use buttons instead.</span>
     * @param {Boolean} event.isTouchEvent
     *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
     * @param {Object} event.originalEvent
     *      The original event object.
     * @param {Object} event.userData
     *      Arbitrary user-defined object.
     */
enterHandler:function(){},
/**
     * Implement or assign implementation to these handlers during or after
     * calling the constructor.
     * @function
     * @since v2.5.0
     * @param {Object} event
     * @param {OpenSeadragon.MouseTracker} event.eventSource
     *      A reference to the tracker instance.
     * @param {String} event.pointerType
     *     "mouse", "touch", "pen", etc.
     * @param {OpenSeadragon.Point} event.position
     *      The position of the event relative to the tracked element.
     * @param {Number} event.buttons
     *      Current buttons pressed.
     *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
     * @param {Number} event.pointers
     *      Number of pointers (all types) active in the tracked element.
     * @param {Boolean} event.insideElementPressed
     *      True if the left mouse button is currently being pressed and was
     *      initiated inside the tracked element, otherwise false.
     * @param {Boolean} event.buttonDownAny
     *      Was the button down anywhere in the screen during the event. <span style="color:red;">Deprecated. Use buttons instead.</span>
     * @param {Boolean} event.isTouchEvent
     *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
     * @param {Object} event.originalEvent
     *      The original event object.
     * @param {Object} event.userData
     *      Arbitrary user-defined object.
     */
leaveHandler:function(){},
/**
     * Implement or assign implementation to these handlers during or after
     * calling the constructor.
     * @function
     * @deprecated v2.5.0 Use leaveHandler instead
     * @param {Object} event
     * @param {OpenSeadragon.MouseTracker} event.eventSource
     *      A reference to the tracker instance.
     * @param {String} event.pointerType
     *     "mouse", "touch", "pen", etc.
     * @param {OpenSeadragon.Point} event.position
     *      The position of the event relative to the tracked element.
     * @param {Number} event.buttons
     *      Current buttons pressed.
     *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
     * @param {Number} event.pointers
     *      Number of pointers (all types) active in the tracked element.
     * @param {Boolean} event.insideElementPressed
     *      True if the left mouse button is currently being pressed and was
     *      initiated inside the tracked element, otherwise false.
     * @param {Boolean} event.buttonDownAny
     *      Was the button down anywhere in the screen during the event. <span style="color:red;">Deprecated. Use buttons instead.</span>
     * @param {Boolean} event.isTouchEvent
     *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
     * @param {Object} event.originalEvent
     *      The original event object.
     * @param {Object} event.userData
     *      Arbitrary user-defined object.
     */
exitHandler:function(){},
/**
     * Implement or assign implementation to these handlers during or after
     * calling the constructor.
     * @function
     * @since v2.5.0
     * @param {Object} event
     * @param {OpenSeadragon.MouseTracker} event.eventSource
     *      A reference to the tracker instance.
     * @param {String} event.pointerType
     *     "mouse", "touch", "pen", etc.
     * @param {OpenSeadragon.Point} event.position
     *      The position of the event relative to the tracked element.
     * @param {Number} event.buttons
     *      Current buttons pressed.
     *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
     * @param {Number} event.pointers
     *      Number of pointers (all types) active in the tracked element.
     * @param {Boolean} event.insideElementPressed
     *      True if the left mouse button is currently being pressed and was
     *      initiated inside the tracked element, otherwise false.
     * @param {Boolean} event.buttonDownAny
     *      Was the button down anywhere in the screen during the event. <span style="color:red;">Deprecated. Use buttons instead.</span>
     * @param {Boolean} event.isTouchEvent
     *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
     * @param {Object} event.originalEvent
     *      The original event object.
     * @param {Object} event.userData
     *      Arbitrary user-defined object.
     */
overHandler:function(){},
/**
     * Implement or assign implementation to these handlers during or after
     * calling the constructor.
     * @function
     * @since v2.5.0
     * @param {Object} event
     * @param {OpenSeadragon.MouseTracker} event.eventSource
     *      A reference to the tracker instance.
     * @param {String} event.pointerType
     *     "mouse", "touch", "pen", etc.
     * @param {OpenSeadragon.Point} event.position
     *      The position of the event relative to the tracked element.
     * @param {Number} event.buttons
     *      Current buttons pressed.
     *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
     * @param {Number} event.pointers
     *      Number of pointers (all types) active in the tracked element.
     * @param {Boolean} event.insideElementPressed
     *      True if the left mouse button is currently being pressed and was
     *      initiated inside the tracked element, otherwise false.
     * @param {Boolean} event.buttonDownAny
     *      Was the button down anywhere in the screen during the event. <span style="color:red;">Deprecated. Use buttons instead.</span>
     * @param {Boolean} event.isTouchEvent
     *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
     * @param {Object} event.originalEvent
     *      The original event object.
     * @param {Object} event.userData
     *      Arbitrary user-defined object.
     */
outHandler:function(){},
/**
     * Implement or assign implementation to these handlers during or after
     * calling the constructor.
     * @function
     * @param {Object} event
     * @param {OpenSeadragon.MouseTracker} event.eventSource
     *      A reference to the tracker instance.
     * @param {String} event.pointerType
     *     "mouse", "touch", "pen", etc.
     * @param {OpenSeadragon.Point} event.position
     *      The position of the event relative to the tracked element.
     * @param {Number} event.buttons
     *      Current buttons pressed.
     *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
     * @param {Boolean} event.isTouchEvent
     *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
     * @param {Object} event.originalEvent
     *      The original event object.
     * @param {Object} event.userData
     *      Arbitrary user-defined object.
     */
pressHandler:function(){},
/**
     * Implement or assign implementation to these handlers during or after
     * calling the constructor.
     * @function
     * @param {Object} event
     * @param {OpenSeadragon.MouseTracker} event.eventSource
     *      A reference to the tracker instance.
     * @param {String} event.pointerType
     *     "mouse", "touch", "pen", etc.
     * @param {OpenSeadragon.Point} event.position
     *      The position of the event relative to the tracked element.
     * @param {Number} event.button
     *      Button which caused the event.
     *      -1: none, 0: primary/left, 1: aux/middle, 2: secondary/right, 3: X1/back, 4: X2/forward, 5: pen eraser.
     * @param {Number} event.buttons
     *      Current buttons pressed.
     *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
     * @param {Boolean} event.isTouchEvent
     *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
     * @param {Object} event.originalEvent
     *      The original event object.
     * @param {Object} event.userData
     *      Arbitrary user-defined object.
     */
nonPrimaryPressHandler:function(){},
/**
     * Implement or assign implementation to these handlers during or after
     * calling the constructor.
     * @function
     * @param {Object} event
     * @param {OpenSeadragon.MouseTracker} event.eventSource
     *      A reference to the tracker instance.
     * @param {String} event.pointerType
     *     "mouse", "touch", "pen", etc.
     * @param {OpenSeadragon.Point} event.position
     *      The position of the event relative to the tracked element.
     * @param {Number} event.buttons
     *      Current buttons pressed.
     *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
     * @param {Boolean} event.insideElementPressed
     *      True if the left mouse button is currently being pressed and was
     *      initiated inside the tracked element, otherwise false.
     * @param {Boolean} event.insideElementReleased
     *      True if the cursor inside the tracked element when the button was released.
     * @param {Boolean} event.isTouchEvent
     *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
     * @param {Object} event.originalEvent
     *      The original event object.
     * @param {Object} event.userData
     *      Arbitrary user-defined object.
     */
releaseHandler:function(){},
/**
     * Implement or assign implementation to these handlers during or after
     * calling the constructor.
     * @function
     * @param {Object} event
     * @param {OpenSeadragon.MouseTracker} event.eventSource
     *      A reference to the tracker instance.
     * @param {String} event.pointerType
     *     "mouse", "touch", "pen", etc.
     * @param {OpenSeadragon.Point} event.position
     *      The position of the event relative to the tracked element.
     * @param {Number} event.button
     *      Button which caused the event.
     *      -1: none, 0: primary/left, 1: aux/middle, 2: secondary/right, 3: X1/back, 4: X2/forward, 5: pen eraser.
     * @param {Number} event.buttons
     *      Current buttons pressed.
     *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
     * @param {Boolean} event.isTouchEvent
     *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
     * @param {Object} event.originalEvent
     *      The original event object.
     * @param {Object} event.userData
     *      Arbitrary user-defined object.
     */
nonPrimaryReleaseHandler:function(){},
/**
     * Implement or assign implementation to these handlers during or after
     * calling the constructor.
     * @function
     * @param {Object} event
     * @param {OpenSeadragon.MouseTracker} event.eventSource
     *      A reference to the tracker instance.
     * @param {String} event.pointerType
     *     "mouse", "touch", "pen", etc.
     * @param {OpenSeadragon.Point} event.position
     *      The position of the event relative to the tracked element.
     * @param {Number} event.buttons
     *      Current buttons pressed.
     *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
     * @param {Boolean} event.isTouchEvent
     *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
     * @param {Object} event.originalEvent
     *      The original event object.
     * @param {Object} event.userData
     *      Arbitrary user-defined object.
     */
moveHandler:function(){},
/**
     * Implement or assign implementation to these handlers during or after
     * calling the constructor.
     * @function
     * @param {Object} event
     * @param {OpenSeadragon.MouseTracker} event.eventSource
     *      A reference to the tracker instance.
     * @param {String} event.pointerType
     *     "mouse", "touch", "pen", etc.
     * @param {OpenSeadragon.Point} event.position
     *      The position of the event relative to the tracked element.
     * @param {Number} event.scroll
     *      The scroll delta for the event.
     * @param {Boolean} event.shift
     *      True if the shift key was pressed during this event.
     * @param {Boolean} event.isTouchEvent
     *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead. Touch devices no longer generate scroll event.</span>
     * @param {Object} event.originalEvent
     *      The original event object.
     * @param {Boolean} event.preventDefault
     *      Set to true to prevent the default user-agent's handling of the wheel event.
     * @param {Object} event.userData
     *      Arbitrary user-defined object.
     */
scrollHandler:function(){},
/**
     * Implement or assign implementation to these handlers during or after
     * calling the constructor.
     * @function
     * @param {Object} event
     * @param {OpenSeadragon.MouseTracker} event.eventSource
     *      A reference to the tracker instance.
     * @param {String} event.pointerType
     *     "mouse", "touch", "pen", etc.
     * @param {OpenSeadragon.Point} event.position
     *      The position of the event relative to the tracked element.
     * @param {Boolean} event.quick
     *      True only if the clickDistThreshold and clickTimeThreshold are both passed. Useful for ignoring drag events.
     * @param {Boolean} event.shift
     *      True if the shift key was pressed during this event.
     * @param {Boolean} event.isTouchEvent
     *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
     * @param {Object} event.originalEvent
     *      The original event object.
     * @param {Element} event.originalTarget
     *      The DOM element clicked on.
     * @param {Object} event.userData
     *      Arbitrary user-defined object.
     */
clickHandler:function(){},
/**
     * Implement or assign implementation to these handlers during or after
     * calling the constructor.
     * @function
     * @param {Object} event
     * @param {OpenSeadragon.MouseTracker} event.eventSource
     *      A reference to the tracker instance.
     * @param {String} event.pointerType
     *     "mouse", "touch", "pen", etc.
     * @param {OpenSeadragon.Point} event.position
     *      The position of the event relative to the tracked element.
     * @param {Boolean} event.shift
     *      True if the shift key was pressed during this event.
     * @param {Boolean} event.isTouchEvent
     *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
     * @param {Object} event.originalEvent
     *      The original event object.
     * @param {Object} event.userData
     *      Arbitrary user-defined object.
     */
dblClickHandler:function(){},
/**
     * Implement or assign implementation to these handlers during or after
     * calling the constructor.
     * @function
     * @param {Object} event
     * @param {OpenSeadragon.MouseTracker} event.eventSource
     *      A reference to the tracker instance.
     * @param {String} event.pointerType
     *     "mouse", "touch", "pen", etc.
     * @param {OpenSeadragon.Point} event.position
     *      The position of the event relative to the tracked element.
     * @param {Number} event.buttons
     *      Current buttons pressed.
     *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
     * @param {OpenSeadragon.Point} event.delta
     *      The x,y components of the difference between the current position and the last drag event position.  Useful for ignoring or weighting the events.
     * @param {Number} event.speed
     *     Current computed speed, in pixels per second.
     * @param {Number} event.direction
     *     Current computed direction, expressed as an angle counterclockwise relative to the positive X axis (-pi to pi, in radians). Only valid if speed > 0.
     * @param {Boolean} event.shift
     *      True if the shift key was pressed during this event.
     * @param {Boolean} event.isTouchEvent
     *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
     * @param {Object} event.originalEvent
     *      The original event object.
     * @param {Object} event.userData
     *      Arbitrary user-defined object.
     */
dragHandler:function(){},
/**
     * Implement or assign implementation to these handlers during or after
     * calling the constructor.
     * @function
     * @param {Object} event
     * @param {OpenSeadragon.MouseTracker} event.eventSource
     *      A reference to the tracker instance.
     * @param {String} event.pointerType
     *     "mouse", "touch", "pen", etc.
     * @param {OpenSeadragon.Point} event.position
     *      The position of the event relative to the tracked element.
     * @param {Number} event.speed
     *     Speed at the end of a drag gesture, in pixels per second.
     * @param {Number} event.direction
     *     Direction at the end of a drag gesture, expressed as an angle counterclockwise relative to the positive X axis (-pi to pi, in radians). Only valid if speed > 0.
     * @param {Boolean} event.shift
     *      True if the shift key was pressed during this event.
     * @param {Boolean} event.isTouchEvent
     *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
     * @param {Object} event.originalEvent
     *      The original event object.
     * @param {Object} event.userData
     *      Arbitrary user-defined object.
     */
dragEndHandler:function(){},
/**
     * Implement or assign implementation to these handlers during or after
     * calling the constructor.
     * @function
     * @param {Object} event
     * @param {OpenSeadragon.MouseTracker} event.eventSource
     *      A reference to the tracker instance.
     * @param {String} event.pointerType
     *     "mouse", "touch", "pen", etc.
     * @param {Array.<OpenSeadragon.MouseTracker.GesturePoint>} event.gesturePoints
     *      Gesture points associated with the gesture. Velocity data can be found here.
     * @param {OpenSeadragon.Point} event.lastCenter
     *      The previous center point of the two pinch contact points relative to the tracked element.
     * @param {OpenSeadragon.Point} event.center
     *      The center point of the two pinch contact points relative to the tracked element.
     * @param {Number} event.lastDistance
     *      The previous distance between the two pinch contact points in CSS pixels.
     * @param {Number} event.distance
     *      The distance between the two pinch contact points in CSS pixels.
     * @param {Boolean} event.shift
     *      True if the shift key was pressed during this event.
     * @param {Object} event.originalEvent
     *      The original event object.
     * @param {Object} event.userData
     *      Arbitrary user-defined object.
     */
pinchHandler:function(){},
/**
     * Implement or assign implementation to these handlers during or after
     * calling the constructor.
     * @function
     * @param {Object} event
     * @param {OpenSeadragon.MouseTracker} event.eventSource
     *      A reference to the tracker instance.
     * @param {String} event.pointerType
     *     "mouse", "touch", "pen", etc.
     * @param {OpenSeadragon.Point} event.position
     *      The position of the event relative to the tracked element.
     * @param {Number} event.buttons
     *      Current buttons pressed.
     *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
     * @param {Boolean} event.isTouchEvent
     *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
     * @param {Object} event.originalEvent
     *      The original event object.
     * @param {Object} event.userData
     *      Arbitrary user-defined object.
     */
stopHandler:function(){},
/**
     * Implement or assign implementation to these handlers during or after
     * calling the constructor.
     * @function
     * @param {Object} event
     * @param {OpenSeadragon.MouseTracker} event.eventSource
     *      A reference to the tracker instance.
     * @param {Number} event.keyCode
     *      The key code that was pressed.
     * @param {Boolean} event.ctrl
     *      True if the ctrl key was pressed during this event.
     * @param {Boolean} event.shift
     *      True if the shift key was pressed during this event.
     * @param {Boolean} event.alt
     *      True if the alt key was pressed during this event.
     * @param {Boolean} event.meta
     *      True if the meta key was pressed during this event.
     * @param {Object} event.originalEvent
     *      The original event object.
     * @param {Boolean} event.preventDefault
     *      Set to true to prevent the default user-agent's handling of the keydown event.
     * @param {Object} event.userData
     *      Arbitrary user-defined object.
     */
keyDownHandler:function(){},
/**
     * Implement or assign implementation to these handlers during or after
     * calling the constructor.
     * @function
     * @param {Object} event
     * @param {OpenSeadragon.MouseTracker} event.eventSource
     *      A reference to the tracker instance.
     * @param {Number} event.keyCode
     *      The key code that was pressed.
     * @param {Boolean} event.ctrl
     *      True if the ctrl key was pressed during this event.
     * @param {Boolean} event.shift
     *      True if the shift key was pressed during this event.
     * @param {Boolean} event.alt
     *      True if the alt key was pressed during this event.
     * @param {Boolean} event.meta
     *      True if the meta key was pressed during this event.
     * @param {Object} event.originalEvent
     *      The original event object.
     * @param {Boolean} event.preventDefault
     *      Set to true to prevent the default user-agent's handling of the keyup event.
     * @param {Object} event.userData
     *      Arbitrary user-defined object.
     */
keyUpHandler:function(){},
/**
     * Implement or assign implementation to these handlers during or after
     * calling the constructor.
     * @function
     * @param {Object} event
     * @param {OpenSeadragon.MouseTracker} event.eventSource
     *      A reference to the tracker instance.
     * @param {Number} event.keyCode
     *      The key code that was pressed.
     * @param {Boolean} event.ctrl
     *      True if the ctrl key was pressed during this event.
     * @param {Boolean} event.shift
     *      True if the shift key was pressed during this event.
     * @param {Boolean} event.alt
     *      True if the alt key was pressed during this event.
     * @param {Boolean} event.meta
     *      True if the meta key was pressed during this event.
     * @param {Object} event.originalEvent
     *      The original event object.
     * @param {Boolean} event.preventDefault
     *      Set to true to prevent the default user-agent's handling of the keypress event.
     * @param {Object} event.userData
     *      Arbitrary user-defined object.
     */
keyHandler:function(){},
/**
     * Implement or assign implementation to these handlers during or after
     * calling the constructor.
     * @function
     * @param {Object} event
     * @param {OpenSeadragon.MouseTracker} event.eventSource
     *      A reference to the tracker instance.
     * @param {Object} event.originalEvent
     *      The original event object.
     * @param {Object} event.userData
     *      Arbitrary user-defined object.
     */
focusHandler:function(){},
/**
     * Implement or assign implementation to these handlers during or after
     * calling the constructor.
     * @function
     * @param {Object} event
     * @param {OpenSeadragon.MouseTracker} event.eventSource
     *      A reference to the tracker instance.
     * @param {Object} event.originalEvent
     *      The original event object.
     * @param {Object} event.userData
     *      Arbitrary user-defined object.
     */
blurHandler:function(){}};var r=function(){try{return window.self!==window.top}catch(e){return true}}();
/**
   * @function
   * @private
   * @inner
   * @returns {Boolean} True if the target supports DOM Level 2 event subscription methods, otherwise false.
   */function canAccessEvents(e){try{return e.addEventListener&&e.removeEventListener}catch(e){return false}}t.MouseTracker.gesturePointVelocityTracker=function(){var e=[],i=0,n=0;var _generateGuid=function(e,t){return e.hash.toString()+t.type+t.id.toString()};var _doTracking=function(){var i,r,o,s,a,l,h=e.length,u=t.now();s=u-n;n=u;for(i=0;i<h;i++){r=e[i];o=r.gPoint;o.direction=Math.atan2(o.currentPos.y-r.lastPos.y,o.currentPos.x-r.lastPos.x);a=r.lastPos.distanceTo(o.currentPos);r.lastPos=o.currentPos;l=1e3*a/(s+1);o.speed=.75*l+.25*o.speed}};var addPoint=function(r,o){var s=_generateGuid(r,o);e.push({guid:s,gPoint:o,lastPos:o.currentPos});if(e.length===1){n=t.now();i=window.setInterval(_doTracking,50)}};var removePoint=function(t,n){var r,o=_generateGuid(t,n),s=e.length;for(r=0;r<s;r++)if(e[r].guid===o){e.splice(r,1);s--;s===0&&window.clearInterval(i);break}};return{addPoint:addPoint,removePoint:removePoint}}();t.MouseTracker.captureElement=document;t.MouseTracker.wheelEventName="onwheel"in document.createElement("div")?"wheel":document.onmousewheel!==void 0?"mousewheel":"DOMMouseScroll";t.MouseTracker.subscribeEvents=["click","dblclick","keydown","keyup","keypress","focus","blur","contextmenu",t.MouseTracker.wheelEventName];t.MouseTracker.wheelEventName==="DOMMouseScroll"&&t.MouseTracker.subscribeEvents.push("MozMousePixelScroll");if(window.PointerEvent){t.MouseTracker.havePointerEvents=true;t.MouseTracker.subscribeEvents.push("pointerenter","pointerleave","pointerover","pointerout","pointerdown","pointerup","pointermove","pointercancel");t.MouseTracker.havePointerCapture=function(){var e=document.createElement("div");return t.isFunction(e.setPointerCapture)&&t.isFunction(e.releasePointerCapture)}();t.MouseTracker.havePointerCapture&&t.MouseTracker.subscribeEvents.push("gotpointercapture","lostpointercapture")}else{t.MouseTracker.havePointerEvents=false;t.MouseTracker.subscribeEvents.push("mouseenter","mouseleave","mouseover","mouseout","mousedown","mouseup","mousemove");t.MouseTracker.mousePointerId="legacy-mouse";t.MouseTracker.havePointerCapture=function(){var e=document.createElement("div");return t.isFunction(e.setCapture)&&t.isFunction(e.releaseCapture)}();t.MouseTracker.havePointerCapture&&t.MouseTracker.subscribeEvents.push("losecapture");"ontouchstart"in window&&t.MouseTracker.subscribeEvents.push("touchstart","touchend","touchmove","touchcancel");"ongesturestart"in window&&t.MouseTracker.subscribeEvents.push("gesturestart","gesturechange")}
/**
   * Used for the processing/disposition of DOM events (propagation, default handling, capture, etc.)
   *
   * @typedef {Object} EventProcessInfo
   * @memberof OpenSeadragon.MouseTracker
   * @since v2.5.0
   *
   * @property {OpenSeadragon.MouseTracker} eventSource
   *      A reference to the tracker instance.
   * @property {Object} originalEvent
   *      The original DOM event object.
   * @property {Number} eventPhase
   *      0 == NONE, 1 == CAPTURING_PHASE, 2 == AT_TARGET, 3 == BUBBLING_PHASE.
   * @property {String} eventType
   *     "keydown", "keyup", "keypress", "focus", "blur", "contextmenu", "gotpointercapture", "lostpointercapture", "pointerenter", "pointerleave", "pointerover", "pointerout", "pointerdown", "pointerup", "pointermove", "pointercancel", "wheel", "click", "dblclick".
   * @property {String} pointerType
   *     "mouse", "touch", "pen", etc.
   * @property {Boolean} isEmulated
   *      True if this is an emulated event. If true, originalEvent is either the event that caused
   *      the emulated event, a synthetic event object created with values from the actual DOM event,
   *      or null if no DOM event applies. Emulated events can occur on eventType "wheel" on legacy mouse-scroll
   *      event emitting user agents.
   * @property {Boolean} isStoppable
   *      True if propagation of the event (e.g. bubbling) can be stopped with stopPropagation/stopImmediatePropagation.
   * @property {Boolean} isCancelable
   *      True if the event's default handling by the browser can be prevented with preventDefault.
   * @property {Boolean} defaultPrevented
   *      True if the event's default handling has already been prevented by a descendent element.
   * @property {Boolean} preventDefault
   *      Set to true to prevent the event's default handling by the browser.
   * @property {Boolean} preventGesture
   *      Set to true to prevent this MouseTracker from generating a gesture from the event.
   *      Valid on eventType "pointerdown".
   * @property {Boolean} stopPropagation
   *      Set to true prevent the event from propagating to ancestor/descendent elements on capture/bubble phase.
   * @property {Boolean} shouldCapture
   *      (Internal Use) Set to true if the pointer should be captured (events (re)targeted to tracker element).
   * @property {Boolean} shouldReleaseCapture
   *      (Internal Use) Set to true if the captured pointer should be released.
   * @property {Object} userData
   *      Arbitrary user-defined object.
   */
/**
   * Represents a point of contact on the screen made by a mouse cursor, pen, touch, or other pointer device.
   *
   * @typedef {Object} GesturePoint
   * @memberof OpenSeadragon.MouseTracker
   *
   * @property {Number} id
   *     Identifier unique from all other active GesturePoints for a given pointer device.
   * @property {String} type
   *     The pointer device type: "mouse", "touch", "pen", etc.
   * @property {Boolean} captured
   *     True if events for the gesture point are captured to the tracked element.
   * @property {Boolean} isPrimary
   *     True if the gesture point is a master pointer amongst the set of active pointers for each pointer type. True for mouse and primary (first) touch/pen pointers.
   * @property {Boolean} insideElementPressed
   *     True if button pressed or contact point initiated inside the screen area of the tracked element.
   * @property {Boolean} insideElement
   *     True if pointer or contact point is currently inside the bounds of the tracked element.
   * @property {Number} speed
   *     Current computed speed, in pixels per second.
   * @property {Number} direction
   *     Current computed direction, expressed as an angle counterclockwise relative to the positive X axis (-pi to pi, in radians). Only valid if speed > 0.
   * @property {OpenSeadragon.Point} contactPos
   *     The initial pointer contact position, relative to the page including any scrolling. Only valid if the pointer has contact (pressed, touch contact, pen contact).
   * @property {Number} contactTime
   *     The initial pointer contact time, in milliseconds. Only valid if the pointer has contact (pressed, touch contact, pen contact).
   * @property {OpenSeadragon.Point} lastPos
   *     The last pointer position, relative to the page including any scrolling.
   * @property {Number} lastTime
   *     The last pointer contact time, in milliseconds.
   * @property {OpenSeadragon.Point} currentPos
   *     The current pointer position, relative to the page including any scrolling.
   * @property {Number} currentTime
   *     The current pointer contact time, in milliseconds.
   */
/**
   * @class GesturePointList
   * @classdesc Provides an abstraction for a set of active {@link OpenSeadragon.MouseTracker.GesturePoint|GesturePoint} objects for a given pointer device type.
   *            Active pointers are any pointer being tracked for this element which are in the hit-test area
   *            of the element (for hover-capable devices) and/or have contact or a button press initiated in the element.
   * @memberof OpenSeadragon.MouseTracker
   * @param {String} type - The pointer device type: "mouse", "touch", "pen", etc.
   */t.MouseTracker.GesturePointList=function(t){(this||e)._gPoints=[];(this||e).type=t;(this||e).buttons=0;(this||e).contacts=0;(this||e).clicks=0;(this||e).captureCount=0};t.MouseTracker.GesturePointList.prototype={
/**
     * @function
     * @returns {Number} Number of gesture points in the list.
     */
getLength:function(){return(this||e)._gPoints.length},
/**
     * @function
     * @returns {Array.<OpenSeadragon.MouseTracker.GesturePoint>} The list of gesture points in the list as an array (read-only).
     */
asArray:function(){return(this||e)._gPoints},
/**
     * @function
     * @param {OpenSeadragon.MouseTracker.GesturePoint} gesturePoint - A gesture point to add to the list.
     * @returns {Number} Number of gesture points in the list.
     */
add:function(t){return(this||e)._gPoints.push(t)},
/**
     * @function
     * @param {Number} id - The id of the gesture point to remove from the list.
     * @returns {Number} Number of gesture points in the list.
     */
removeById:function(t){var i,n=(this||e)._gPoints.length;for(i=0;i<n;i++)if((this||e)._gPoints[i].id===t){(this||e)._gPoints.splice(i,1);break}return(this||e)._gPoints.length},
/**
     * @function
     * @param {Number} index - The index of the gesture point to retrieve from the list.
     * @returns {OpenSeadragon.MouseTracker.GesturePoint|null} The gesture point at the given index, or null if not found.
     */
getByIndex:function(t){return t<(this||e)._gPoints.length?(this||e)._gPoints[t]:null},
/**
     * @function
     * @param {Number} id - The id of the gesture point to retrieve from the list.
     * @returns {OpenSeadragon.MouseTracker.GesturePoint|null} The gesture point with the given id, or null if not found.
     */
getById:function(t){var i,n=(this||e)._gPoints.length;for(i=0;i<n;i++)if((this||e)._gPoints[i].id===t)return(this||e)._gPoints[i];return null},
/**
     * @function
     * @returns {OpenSeadragon.MouseTracker.GesturePoint|null} The primary gesture point in the list, or null if not found.
     */
getPrimary:function(t){var i,n=(this||e)._gPoints.length;for(i=0;i<n;i++)if((this||e)._gPoints[i].isPrimary)return(this||e)._gPoints[i];return null},addContact:function(){++(this||e).contacts;if((this||e).contacts>1&&((this||e).type==="mouse"||(this||e).type==="pen")){t.console.warn("GesturePointList.addContact() Implausible contacts value");(this||e).contacts=1}},removeContact:function(){--(this||e).contacts;(this||e).contacts<0&&((this||e).contacts=0)}};function clearTrackedPointers(e){var t,i,r,o,s,a=n[e.hash],l=a.activePointersLists.length;for(t=0;t<l;t++){r=a.activePointersLists[t];if(r.getLength()>0){s=[];o=r.asArray();for(i=0;i<o.length;i++)s.push(o[i]);for(i=0;i<s.length;i++)stopTrackingPointer(e,r,s[i])}}for(t=0;t<l;t++)a.activePointersLists.pop();a.sentDragEvent=false}function startTracking(e){var i,r,o=n[e.hash];if(!o.tracking){for(r=0;r<t.MouseTracker.subscribeEvents.length;r++){i=t.MouseTracker.subscribeEvents[r];t.addEvent(e.element,i,o[i],i===t.MouseTracker.wheelEventName&&{passive:false,capture:false})}clearTrackedPointers(e);o.tracking=true}}function stopTracking(e){var i,r,o=n[e.hash];if(o.tracking){for(r=0;r<t.MouseTracker.subscribeEvents.length;r++){i=t.MouseTracker.subscribeEvents[r];t.removeEvent(e.element,i,o[i],false)}clearTrackedPointers(e);o.tracking=false}}function getCaptureEventParams(e,t){var i=n[e.hash];if(t==="pointerevent")return{upName:"pointerup",upHandler:i.pointerupcaptured,moveName:"pointermove",moveHandler:i.pointermovecaptured};if(t==="mouse")return{upName:"pointerup",upHandler:i.pointerupcaptured,moveName:"pointermove",moveHandler:i.pointermovecaptured};if(t==="touch")return{upName:"touchend",upHandler:i.touchendcaptured,moveName:"touchmove",moveHandler:i.touchmovecaptured};throw new Error("MouseTracker.getCaptureEventParams: Unknown pointer type.")}function capturePointer(e,i){var n;if(t.MouseTracker.havePointerCapture)if(t.MouseTracker.havePointerEvents)try{e.element.setPointerCapture(i.id)}catch(e){t.console.warn("setPointerCapture() called on invalid pointer ID");return}else e.element.setCapture(true);else{n=getCaptureEventParams(e,t.MouseTracker.havePointerEvents?"pointerevent":i.type);r&&canAccessEvents(window.top)&&t.addEvent(window.top,n.upName,n.upHandler,true);t.addEvent(t.MouseTracker.captureElement,n.upName,n.upHandler,true);t.addEvent(t.MouseTracker.captureElement,n.moveName,n.moveHandler,true)}updatePointerCaptured(e,i,true)}function releasePointer(e,i){var n;var o;var s;if(t.MouseTracker.havePointerCapture)if(t.MouseTracker.havePointerEvents){o=e.getActivePointersListByType(i.type);s=o.getById(i.id);if(!s||!s.captured)return;try{e.element.releasePointerCapture(i.id)}catch(e){}}else e.element.releaseCapture();else{n=getCaptureEventParams(e,t.MouseTracker.havePointerEvents?"pointerevent":i.type);r&&canAccessEvents(window.top)&&t.removeEvent(window.top,n.upName,n.upHandler,true);t.removeEvent(t.MouseTracker.captureElement,n.moveName,n.moveHandler,true);t.removeEvent(t.MouseTracker.captureElement,n.upName,n.upHandler,true)}updatePointerCaptured(e,i,false)}function getPointerId(e){return t.MouseTracker.havePointerEvents?e.pointerId:t.MouseTracker.mousePointerId}function getPointerType(e){return t.MouseTracker.havePointerEvents&&e.pointerType?e.pointerType:"mouse"}function getIsPrimary(e){return!t.MouseTracker.havePointerEvents||e.isPrimary}function getMouseAbsolute(e){return t.getMousePosition(e)}function getMouseRelative(e,t){return getPointRelativeToAbsolute(getMouseAbsolute(e),t)}function getPointRelativeToAbsolute(e,i){var n=t.getElementOffset(i);return e.minus(n)}function getCenterPoint(e,i){return new t.Point((e.x+i.x)/2,(e.y+i.y)/2)}function onClick(e,i){var n={originalEvent:i,eventType:"click",pointerType:"mouse",isEmulated:false};preProcessEvent(e,n);n.preventDefault&&!n.defaultPrevented&&t.cancelEvent(i);n.stopPropagation&&t.stopEvent(i)}function onDblClick(e,i){var n={originalEvent:i,eventType:"dblclick",pointerType:"mouse",isEmulated:false};preProcessEvent(e,n);n.preventDefault&&!n.defaultPrevented&&t.cancelEvent(i);n.stopPropagation&&t.stopEvent(i)}function onKeyDown(e,i){var n=null;var r={originalEvent:i,eventType:"keydown",pointerType:"",isEmulated:false};preProcessEvent(e,r);if(e.keyDownHandler&&!r.preventGesture&&!r.defaultPrevented){n={eventSource:e,keyCode:i.keyCode?i.keyCode:i.charCode,ctrl:i.ctrlKey,shift:i.shiftKey,alt:i.altKey,meta:i.metaKey,originalEvent:i,preventDefault:r.preventDefault||r.defaultPrevented,userData:e.userData};e.keyDownHandler(n)}(n&&n.preventDefault||r.preventDefault&&!r.defaultPrevented)&&t.cancelEvent(i);r.stopPropagation&&t.stopEvent(i)}function onKeyUp(e,i){var n=null;var r={originalEvent:i,eventType:"keyup",pointerType:"",isEmulated:false};preProcessEvent(e,r);if(e.keyUpHandler&&!r.preventGesture&&!r.defaultPrevented){n={eventSource:e,keyCode:i.keyCode?i.keyCode:i.charCode,ctrl:i.ctrlKey,shift:i.shiftKey,alt:i.altKey,meta:i.metaKey,originalEvent:i,preventDefault:r.preventDefault||r.defaultPrevented,userData:e.userData};e.keyUpHandler(n)}(n&&n.preventDefault||r.preventDefault&&!r.defaultPrevented)&&t.cancelEvent(i);r.stopPropagation&&t.stopEvent(i)}function onKeyPress(e,i){var n=null;var r={originalEvent:i,eventType:"keypress",pointerType:"",isEmulated:false};preProcessEvent(e,r);if(e.keyHandler&&!r.preventGesture&&!r.defaultPrevented){n={eventSource:e,keyCode:i.keyCode?i.keyCode:i.charCode,ctrl:i.ctrlKey,shift:i.shiftKey,alt:i.altKey,meta:i.metaKey,originalEvent:i,preventDefault:r.preventDefault||r.defaultPrevented,userData:e.userData};e.keyHandler(n)}(n&&n.preventDefault||r.preventDefault&&!r.defaultPrevented)&&t.cancelEvent(i);r.stopPropagation&&t.stopEvent(i)}function onFocus(e,t){var i={originalEvent:t,eventType:"focus",pointerType:"",isEmulated:false};preProcessEvent(e,i);e.focusHandler&&!i.preventGesture&&e.focusHandler({eventSource:e,originalEvent:t,userData:e.userData})}function onBlur(e,t){var i={originalEvent:t,eventType:"blur",pointerType:"",isEmulated:false};preProcessEvent(e,i);e.blurHandler&&!i.preventGesture&&e.blurHandler({eventSource:e,originalEvent:t,userData:e.userData})}function onContextMenu(e,i){var n=null;var r={originalEvent:i,eventType:"contextmenu",pointerType:"mouse",isEmulated:false};preProcessEvent(e,r);if(e.contextMenuHandler&&!r.preventGesture&&!r.defaultPrevented){n={eventSource:e,position:getPointRelativeToAbsolute(getMouseAbsolute(i),e.element),originalEvent:r.originalEvent,preventDefault:r.preventDefault||r.defaultPrevented,userData:e.userData};e.contextMenuHandler(n)}(n&&n.preventDefault||r.preventDefault&&!r.defaultPrevented)&&t.cancelEvent(i);r.stopPropagation&&t.stopEvent(i)}function onWheel(e,t){handleWheelEvent(e,t,t)}function onMouseWheel(e,i){var n={target:i.target||i.srcElement,type:"wheel",shiftKey:i.shiftKey||false,clientX:i.clientX,clientY:i.clientY,pageX:i.pageX?i.pageX:i.clientX,pageY:i.pageY?i.pageY:i.clientY,deltaMode:i.type==="MozMousePixelScroll"?0:1,deltaX:0,deltaZ:0};t.MouseTracker.wheelEventName==="mousewheel"?n.deltaY=-i.wheelDelta/t.DEFAULT_SETTINGS.pixelsPerWheelLine:n.deltaY=i.detail;handleWheelEvent(e,n,i)}function handleWheelEvent(e,i,n){var r,o=0;var s=null;o=i.deltaY?i.deltaY<0?1:-1:0;r={originalEvent:i,eventType:"wheel",pointerType:"mouse",isEmulated:i!==n};preProcessEvent(e,r);if(e.scrollHandler&&!r.preventGesture&&!r.defaultPrevented){s={eventSource:e,pointerType:"mouse",position:getMouseRelative(i,e.element),scroll:o,shift:i.shiftKey,isTouchEvent:false,originalEvent:n,preventDefault:r.preventDefault||r.defaultPrevented,userData:e.userData};e.scrollHandler(s)}r.stopPropagation&&t.stopEvent(n);(s&&s.preventDefault||r.preventDefault&&!r.defaultPrevented)&&t.cancelEvent(n)}function onLoseCapture(e,i){var n={id:t.MouseTracker.mousePointerId,type:"mouse"};var r={originalEvent:i,eventType:"lostpointercapture",pointerType:"mouse",isEmulated:false};preProcessEvent(e,r);i.target===e.element&&updatePointerCaptured(e,n,false);r.stopPropagation&&t.stopEvent(i)}function onTouchStart(e,i){var n,r,o,s=i.changedTouches.length,a=e.getActivePointersListByType("touch");n=t.now();a.getLength()>i.touches.length-s&&t.console.warn("Tracked touch contact count doesn't match event.touches.length");var l={originalEvent:i,eventType:"pointerdown",pointerType:"touch",isEmulated:false};preProcessEvent(e,l);for(r=0;r<s;r++){o={id:i.changedTouches[r].identifier,type:"touch",isPrimary:a.getLength()===0,currentPos:getMouseAbsolute(i.changedTouches[r]),currentTime:n};updatePointerEnter(e,l,o);updatePointerDown(e,l,o,0);updatePointerCaptured(e,o,true)}l.preventDefault&&!l.defaultPrevented&&t.cancelEvent(i);l.stopPropagation&&t.stopEvent(i)}function onTouchEnd(e,i){var n,r,o,s=i.changedTouches.length;n=t.now();var a={originalEvent:i,eventType:"pointerup",pointerType:"touch",isEmulated:false};preProcessEvent(e,a);for(r=0;r<s;r++){o={id:i.changedTouches[r].identifier,type:"touch",currentPos:getMouseAbsolute(i.changedTouches[r]),currentTime:n};updatePointerUp(e,a,o,0);updatePointerCaptured(e,o,false);updatePointerLeave(e,a,o)}a.preventDefault&&!a.defaultPrevented&&t.cancelEvent(i);a.stopPropagation&&t.stopEvent(i)}function onTouchMove(e,i){var n,r,o,s=i.changedTouches.length;n=t.now();var a={originalEvent:i,eventType:"pointermove",pointerType:"touch",isEmulated:false};preProcessEvent(e,a);for(r=0;r<s;r++){o={id:i.changedTouches[r].identifier,type:"touch",currentPos:getMouseAbsolute(i.changedTouches[r]),currentTime:n};updatePointerMove(e,a,o)}a.preventDefault&&!a.defaultPrevented&&t.cancelEvent(i);a.stopPropagation&&t.stopEvent(i)}function onTouchCancel(e,i){var n,r,o=i.changedTouches.length;var s={originalEvent:i,eventType:"pointercancel",pointerType:"touch",isEmulated:false};preProcessEvent(e,s);for(n=0;n<o;n++){r={id:i.changedTouches[n].identifier,type:"touch"};updatePointerCancel(e,s,r)}s.stopPropagation&&t.stopEvent(i)}function onGestureStart(e,i){t.eventIsCanceled(i)||i.preventDefault();return false}function onGestureChange(e,i){t.eventIsCanceled(i)||i.preventDefault();return false}function onGotPointerCapture(e,i){var n={originalEvent:i,eventType:"gotpointercapture",pointerType:getPointerType(i),isEmulated:false};preProcessEvent(e,n);i.target===e.element&&updatePointerCaptured(e,{id:i.pointerId,type:getPointerType(i)},true);n.stopPropagation&&t.stopEvent(i)}function onLostPointerCapture(e,i){var n={originalEvent:i,eventType:"lostpointercapture",pointerType:getPointerType(i),isEmulated:false};preProcessEvent(e,n);i.target===e.element&&updatePointerCaptured(e,{id:i.pointerId,type:getPointerType(i)},false);n.stopPropagation&&t.stopEvent(i)}function onPointerEnter(e,i){var n={id:getPointerId(i),type:getPointerType(i),isPrimary:getIsPrimary(i),currentPos:getMouseAbsolute(i),currentTime:t.now()};var r={originalEvent:i,eventType:"pointerenter",pointerType:n.type,isEmulated:false};preProcessEvent(e,r);updatePointerEnter(e,r,n)}function onPointerLeave(e,i){var n={id:getPointerId(i),type:getPointerType(i),isPrimary:getIsPrimary(i),currentPos:getMouseAbsolute(i),currentTime:t.now()};var r={originalEvent:i,eventType:"pointerleave",pointerType:n.type,isEmulated:false};preProcessEvent(e,r);updatePointerLeave(e,r,n)}function onPointerOver(e,i){var n={id:getPointerId(i),type:getPointerType(i),isPrimary:getIsPrimary(i),currentPos:getMouseAbsolute(i),currentTime:t.now()};var r={originalEvent:i,eventType:"pointerover",pointerType:n.type,isEmulated:false};preProcessEvent(e,r);updatePointerOver(e,r,n);r.preventDefault&&!r.defaultPrevented&&t.cancelEvent(i);r.stopPropagation&&t.stopEvent(i)}function onPointerOut(e,i){var n={id:getPointerId(i),type:getPointerType(i),isPrimary:getIsPrimary(i),currentPos:getMouseAbsolute(i),currentTime:t.now()};var r={originalEvent:i,eventType:"pointerout",pointerType:n.type,isEmulated:false};preProcessEvent(e,r);updatePointerOut(e,r,n);r.preventDefault&&!r.defaultPrevented&&t.cancelEvent(i);r.stopPropagation&&t.stopEvent(i)}function onPointerDown(e,i){var n={id:getPointerId(i),type:getPointerType(i),isPrimary:getIsPrimary(i),currentPos:getMouseAbsolute(i),currentTime:t.now()};var r=t.MouseTracker.havePointerEvents&&n.type==="touch";var o={originalEvent:i,eventType:"pointerdown",pointerType:n.type,isEmulated:false};preProcessEvent(e,o);updatePointerDown(e,o,n,i.button);o.preventDefault&&!o.defaultPrevented&&t.cancelEvent(i);o.stopPropagation&&t.stopEvent(i);o.shouldCapture&&(r?updatePointerCaptured(e,n,true):capturePointer(e,n))}function onPointerUp(e,t){handlePointerUp(e,t)}function onPointerUpCaptured(e,i){var n=e.getActivePointersListByType(getPointerType(i));n.getById(i.pointerId)&&handlePointerUp(e,i);t.stopEvent(i)}function handlePointerUp(e,i){var n;n={id:getPointerId(i),type:getPointerType(i),isPrimary:getIsPrimary(i),currentPos:getMouseAbsolute(i),currentTime:t.now()};var r={originalEvent:i,eventType:"pointerup",pointerType:n.type,isEmulated:false};preProcessEvent(e,r);updatePointerUp(e,r,n,i.button);r.preventDefault&&!r.defaultPrevented&&t.cancelEvent(i);r.stopPropagation&&t.stopEvent(i);r.shouldReleaseCapture&&(i.target===e.element?releasePointer(e,n):updatePointerCaptured(e,n,false))}function onPointerMove(e,t){handlePointerMove(e,t)}function onPointerMoveCaptured(e,i){var n=e.getActivePointersListByType(getPointerType(i));n.getById(i.pointerId)&&handlePointerMove(e,i);t.stopEvent(i)}function handlePointerMove(e,i){var n={id:getPointerId(i),type:getPointerType(i),isPrimary:getIsPrimary(i),currentPos:getMouseAbsolute(i),currentTime:t.now()};var r={originalEvent:i,eventType:"pointermove",pointerType:n.type,isEmulated:false};preProcessEvent(e,r);updatePointerMove(e,r,n);r.preventDefault&&!r.defaultPrevented&&t.cancelEvent(i);r.stopPropagation&&t.stopEvent(i)}function onPointerCancel(e,i){var n={id:i.pointerId,type:getPointerType(i)};var r={originalEvent:i,eventType:"pointercancel",pointerType:n.type,isEmulated:false};preProcessEvent(e,r);updatePointerCancel(e,r,n);r.stopPropagation&&t.stopEvent(i)}
/**
   * @function
   * @private
   * @inner
   * @param {OpenSeadragon.MouseTracker.GesturePointList} pointsList
   *     The GesturePointList to track the pointer in.
   * @param {OpenSeadragon.MouseTracker.GesturePoint} gPoint
   *      Gesture point to track.
   * @returns {Number} Number of gesture points in pointsList.
   */function startTrackingPointer(e,t){t.speed=0;t.direction=0;t.contactPos=t.currentPos;t.contactTime=t.currentTime;t.lastPos=t.currentPos;t.lastTime=t.currentTime;return e.add(t)}
/**
   * @function
   * @private
   * @inner
   * @param {OpenSeadragon.MouseTracker} tracker
   *     A reference to the MouseTracker instance.
   * @param {OpenSeadragon.MouseTracker.GesturePointList} pointsList
   *     The GesturePointList to stop tracking the pointer on.
   * @param {OpenSeadragon.MouseTracker.GesturePoint} gPoint
   *      Gesture point to stop tracking.
   * @returns {Number} Number of gesture points in pointsList.
   */function stopTrackingPointer(e,i,n){var r;var o=i.getById(n.id);if(o){if(o.captured){t.console.warn("stopTrackingPointer() called on captured pointer");releasePointer(e,o)}i.removeContact();r=i.removeById(n.id)}else r=i.getLength();return r}function getEventProcessDefaults(e,t){switch(t.eventType){case"pointermove":t.isStoppable=true;t.isCancelable=true;t.preventDefault=false;t.preventGesture=!e.hasGestureHandlers;t.stopPropagation=false;break;case"pointerover":case"pointerout":case"contextmenu":case"keydown":case"keyup":case"keypress":t.isStoppable=true;t.isCancelable=true;t.preventDefault=false;t.preventGesture=false;t.stopPropagation=false;break;case"pointerdown":t.isStoppable=true;t.isCancelable=true;t.preventDefault=false;t.preventGesture=!e.hasGestureHandlers;t.stopPropagation=false;break;case"pointerup":t.isStoppable=true;t.isCancelable=true;t.preventDefault=false;t.preventGesture=!e.hasGestureHandlers;t.stopPropagation=false;break;case"wheel":t.isStoppable=true;t.isCancelable=true;t.preventDefault=false;t.preventGesture=!e.hasScrollHandler;t.stopPropagation=false;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":t.isStoppable=true;t.isCancelable=false;t.preventDefault=false;t.preventGesture=false;t.stopPropagation=false;break;case"click":t.isStoppable=true;t.isCancelable=true;t.preventDefault=!!e.clickHandler;t.preventGesture=false;t.stopPropagation=false;break;case"dblclick":t.isStoppable=true;t.isCancelable=true;t.preventDefault=!!e.dblClickHandler;t.preventGesture=false;t.stopPropagation=false;break;case"focus":case"blur":case"pointerenter":case"pointerleave":default:t.isStoppable=false;t.isCancelable=false;t.preventDefault=false;t.preventGesture=false;t.stopPropagation=false;break}}
/**
   * Sets up for and calls preProcessEventHandler. Call with the following parameters -
   * this function will fill in the rest of the preProcessEventHandler event object
   * properties
   *
   * @function
   * @private
   * @inner
   * @param {OpenSeadragon.MouseTracker} tracker
   *     A reference to the MouseTracker instance.
   * @param {OpenSeadragon.MouseTracker.EventProcessInfo} eventInfo
   * @param {Object} eventInfo.originalEvent
   * @param {String} eventInfo.eventType
   * @param {String} eventInfo.pointerType
   * @param {Boolean} eventInfo.isEmulated
   */function preProcessEvent(e,i){i.eventSource=e;i.eventPhase=i.originalEvent&&typeof i.originalEvent.eventPhase!=="undefined"?i.originalEvent.eventPhase:0;i.defaultPrevented=t.eventIsCanceled(i.originalEvent);i.shouldCapture=false;i.shouldReleaseCapture=false;i.userData=e.userData;getEventProcessDefaults(e,i);e.preProcessEventHandler&&e.preProcessEventHandler(i)}
/**
   * Sets or resets the captured property on the tracked pointer matching the passed gPoint's id/type
   *
   * @function
   * @private
   * @inner
   * @param {OpenSeadragon.MouseTracker} tracker
   *     A reference to the MouseTracker instance.
   * @param {Object} gPoint
   *     An object with id and type properties describing the pointer to update.
   * @param {Boolean} isCaptured
   *      Value to set the captured property to.
   */function updatePointerCaptured(e,i,n){var r=e.getActivePointersListByType(i.type);var o=r.getById(i.id);if(o){if(n&&!o.captured){o.captured=true;r.captureCount++}else if(!n&&o.captured){o.captured=false;r.captureCount--;if(r.captureCount<0){r.captureCount=0;t.console.warn("updatePointerCaptured() - pointsList.captureCount went negative")}}}else t.console.warn("updatePointerCaptured() called on untracked pointer")}
/**
   * @function
   * @private
   * @inner
   * @param {OpenSeadragon.MouseTracker} tracker
   *     A reference to the MouseTracker instance.
   * @param {OpenSeadragon.MouseTracker.EventProcessInfo} eventInfo
   *     Processing info for originating DOM event.
   * @param {OpenSeadragon.MouseTracker.GesturePoint} gPoint
   *      Gesture point associated with the event.
   */function updatePointerEnter(e,t,i){var n,r=e.getActivePointersListByType(i.type);n=r.getById(i.id);if(n){n.insideElement=true;n.lastPos=n.currentPos;n.lastTime=n.currentTime;n.currentPos=i.currentPos;n.currentTime=i.currentTime;i=n}else{i.captured=false;i.insideElementPressed=false;i.insideElement=true;startTrackingPointer(r,i)}e.enterHandler&&e.enterHandler({eventSource:e,pointerType:i.type,position:getPointRelativeToAbsolute(i.currentPos,e.element),buttons:r.buttons,pointers:e.getActivePointerCount(),insideElementPressed:i.insideElementPressed,buttonDownAny:r.buttons!==0,isTouchEvent:i.type==="touch",originalEvent:t.originalEvent,userData:e.userData})}
/**
   * @function
   * @private
   * @inner
   * @param {OpenSeadragon.MouseTracker} tracker
   *     A reference to the MouseTracker instance.
   * @param {OpenSeadragon.MouseTracker.EventProcessInfo} eventInfo
   *     Processing info for originating DOM event.
   * @param {OpenSeadragon.MouseTracker.GesturePoint} gPoint
   *      Gesture point associated with the event.
   */function updatePointerLeave(e,t,i){var n,r,o=e.getActivePointersListByType(i.type);n=o.getById(i.id);if(n){if(n.captured){n.insideElement=false;n.lastPos=n.currentPos;n.lastTime=n.currentTime;n.currentPos=i.currentPos;n.currentTime=i.currentTime}else stopTrackingPointer(e,o,n);i=n}else{i.captured=false;i.insideElementPressed=false}if(e.leaveHandler||e.exitHandler){r={eventSource:e,pointerType:i.type,position:i.currentPos&&getPointRelativeToAbsolute(i.currentPos,e.element),buttons:o.buttons,pointers:e.getActivePointerCount(),insideElementPressed:i.insideElementPressed,buttonDownAny:o.buttons!==0,isTouchEvent:i.type==="touch",originalEvent:t.originalEvent,userData:e.userData};e.leaveHandler&&e.leaveHandler(r);e.exitHandler&&e.exitHandler(r)}}
/**
   * @function
   * @private
   * @inner
   * @param {OpenSeadragon.MouseTracker} tracker
   *     A reference to the MouseTracker instance.
   * @param {OpenSeadragon.MouseTracker.EventProcessInfo} eventInfo
   *     Processing info for originating DOM event.
   * @param {OpenSeadragon.MouseTracker.GesturePoint} gPoint
   *      Gesture point associated with the event.
   */function updatePointerOver(e,t,i){var n,r;n=e.getActivePointersListByType(i.type);r=n.getById(i.id);if(r)i=r;else{i.captured=false;i.insideElementPressed=false}e.overHandler&&e.overHandler({eventSource:e,pointerType:i.type,position:getPointRelativeToAbsolute(i.currentPos,e.element),buttons:n.buttons,pointers:e.getActivePointerCount(),insideElementPressed:i.insideElementPressed,buttonDownAny:n.buttons!==0,isTouchEvent:i.type==="touch",originalEvent:t.originalEvent,userData:e.userData})}
/**
   * @function
   * @private
   * @inner
   * @param {OpenSeadragon.MouseTracker} tracker
   *     A reference to the MouseTracker instance.
   * @param {OpenSeadragon.MouseTracker.EventProcessInfo} eventInfo
   *     Processing info for originating DOM event.
   * @param {OpenSeadragon.MouseTracker.GesturePoint} gPoint
   *      Gesture point associated with the event.
   */function updatePointerOut(e,t,i){var n,r;n=e.getActivePointersListByType(i.type);r=n.getById(i.id);if(r)i=r;else{i.captured=false;i.insideElementPressed=false}e.outHandler&&e.outHandler({eventSource:e,pointerType:i.type,position:i.currentPos&&getPointRelativeToAbsolute(i.currentPos,e.element),buttons:n.buttons,pointers:e.getActivePointerCount(),insideElementPressed:i.insideElementPressed,buttonDownAny:n.buttons!==0,isTouchEvent:i.type==="touch",originalEvent:t.originalEvent,userData:e.userData})}
/**
   * @function
   * @private
   * @inner
   * @param {OpenSeadragon.MouseTracker} tracker
   *     A reference to the MouseTracker instance.
   * @param {OpenSeadragon.MouseTracker.EventProcessInfo} eventInfo
   *     Processing info for originating DOM event.
   * @param {OpenSeadragon.MouseTracker.GesturePoint} gPoint
   *      Gesture point associated with the event.
   * @param {Number} buttonChanged
   *      The button involved in the event: -1: none, 0: primary/left, 1: aux/middle, 2: secondary/right, 3: X1/back, 4: X2/forward, 5: pen eraser.
   *      Note on chorded button presses (a button pressed when another button is already pressed): In the W3C Pointer Events model,
   *      only one pointerdown/pointerup event combo is fired. Chorded button state changes instead fire pointermove events.
   */function updatePointerDown(e,i,r,o){var s,a=n[e.hash],l=e.getActivePointersListByType(r.type);typeof i.originalEvent.buttons!=="undefined"?l.buttons=i.originalEvent.buttons:o===0?l.buttons|=1:o===1?l.buttons|=4:o===2?l.buttons|=2:o===3?l.buttons|=8:o===4?l.buttons|=16:o===5&&(l.buttons|=32);if(o===0){s=l.getById(r.id);if(s){s.insideElementPressed=true;s.insideElement=true;s.originalTarget=i.originalEvent.target;s.contactPos=r.currentPos;s.contactTime=r.currentTime;s.lastPos=s.currentPos;s.lastTime=s.currentTime;s.currentPos=r.currentPos;s.currentTime=r.currentTime;r=s}else{r.captured=false;r.insideElementPressed=true;r.insideElement=true;r.originalTarget=i.originalEvent.target;startTrackingPointer(l,r)}l.addContact();if(i.preventGesture||i.defaultPrevented){i.shouldCapture=false;i.shouldReleaseCapture=false}else{i.shouldCapture=true;i.shouldReleaseCapture=false;i.preventDefault=true;(e.dragHandler||e.dragEndHandler||e.pinchHandler)&&t.MouseTracker.gesturePointVelocityTracker.addPoint(e,r);if(l.contacts===1)e.pressHandler&&!i.preventGesture&&e.pressHandler({eventSource:e,pointerType:r.type,position:getPointRelativeToAbsolute(r.contactPos,e.element),buttons:l.buttons,isTouchEvent:r.type==="touch",originalEvent:i.originalEvent,userData:e.userData});else if(l.contacts===2&&e.pinchHandler&&r.type==="touch"){a.pinchGPoints=l.asArray();a.lastPinchDist=a.currentPinchDist=a.pinchGPoints[0].currentPos.distanceTo(a.pinchGPoints[1].currentPos);a.lastPinchCenter=a.currentPinchCenter=getCenterPoint(a.pinchGPoints[0].currentPos,a.pinchGPoints[1].currentPos)}}}else{i.shouldCapture=false;i.shouldReleaseCapture=false;if(e.nonPrimaryPressHandler&&!i.preventGesture&&!i.defaultPrevented){i.preventDefault=true;e.nonPrimaryPressHandler({eventSource:e,pointerType:r.type,position:getPointRelativeToAbsolute(r.currentPos,e.element),button:o,buttons:l.buttons,isTouchEvent:r.type==="touch",originalEvent:i.originalEvent,userData:e.userData})}}}
/**
   * @function
   * @private
   * @inner
   * @param {OpenSeadragon.MouseTracker} tracker
   *     A reference to the MouseTracker instance.
   * @param {OpenSeadragon.MouseTracker.EventProcessInfo} eventInfo
   *     Processing info for originating DOM event.
   * @param {OpenSeadragon.MouseTracker.GesturePoint} gPoint
   *      Gesture points associated with the event.
   * @param {Number} buttonChanged
   *      The button involved in the event: -1: none, 0: primary/left, 1: aux/middle, 2: secondary/right, 3: X1/back, 4: X2/forward, 5: pen eraser.
   *      Note on chorded button presses (a button pressed when another button is already pressed): In the W3C Pointer Events model,
   *      only one pointerdown/pointerup event combo is fired. Chorded button state changes instead fire pointermove events.
   */function updatePointerUp(e,i,r,o){var s,a,l,h,u=n[e.hash],c=e.getActivePointersListByType(r.type),d=false;typeof i.originalEvent.buttons!=="undefined"?c.buttons=i.originalEvent.buttons:o===0?c.buttons^=-2:o===1?c.buttons^=-5:o===2?c.buttons^=-3:o===3?c.buttons^=-9:o===4?c.buttons^=-17:o===5&&(c.buttons^=-33);i.shouldCapture=false;if(o===0){l=c.getById(r.id);if(l){c.removeContact();l.captured&&(d=true);l.lastPos=l.currentPos;l.lastTime=l.currentTime;l.currentPos=r.currentPos;l.currentTime=r.currentTime;l.insideElement||stopTrackingPointer(e,c,l);s=l.currentPos;a=l.currentTime}else{r.captured=false;r.insideElementPressed=false;r.insideElement=true;startTrackingPointer(c,r);l=r}if(!i.preventGesture&&!i.defaultPrevented)if(d){i.shouldReleaseCapture=true;i.preventDefault=true;(e.dragHandler||e.dragEndHandler||e.pinchHandler)&&t.MouseTracker.gesturePointVelocityTracker.removePoint(e,l);if(c.contacts===0){e.releaseHandler&&s&&e.releaseHandler({eventSource:e,pointerType:l.type,position:getPointRelativeToAbsolute(s,e.element),buttons:c.buttons,insideElementPressed:l.insideElementPressed,insideElementReleased:l.insideElement,isTouchEvent:l.type==="touch",originalEvent:i.originalEvent,userData:e.userData});e.dragEndHandler&&u.sentDragEvent&&e.dragEndHandler({eventSource:e,pointerType:l.type,position:getPointRelativeToAbsolute(l.currentPos,e.element),speed:l.speed,direction:l.direction,shift:i.originalEvent.shiftKey,isTouchEvent:l.type==="touch",originalEvent:i.originalEvent,userData:e.userData});u.sentDragEvent=false;if((e.clickHandler||e.dblClickHandler)&&l.insideElement){h=a-l.contactTime<=e.clickTimeThreshold&&l.contactPos.distanceTo(s)<=e.clickDistThreshold;e.clickHandler&&e.clickHandler({eventSource:e,pointerType:l.type,position:getPointRelativeToAbsolute(l.currentPos,e.element),quick:h,shift:i.originalEvent.shiftKey,isTouchEvent:l.type==="touch",originalEvent:i.originalEvent,originalTarget:l.originalTarget,userData:e.userData});if(e.dblClickHandler&&h){c.clicks++;if(c.clicks===1){u.lastClickPos=s;u.dblClickTimeOut=setTimeout((function(){c.clicks=0}),e.dblClickTimeThreshold)}else if(c.clicks===2){clearTimeout(u.dblClickTimeOut);c.clicks=0;u.lastClickPos.distanceTo(s)<=e.dblClickDistThreshold&&e.dblClickHandler({eventSource:e,pointerType:l.type,position:getPointRelativeToAbsolute(l.currentPos,e.element),shift:i.originalEvent.shiftKey,isTouchEvent:l.type==="touch",originalEvent:i.originalEvent,userData:e.userData});u.lastClickPos=null}}}}else if(c.contacts===2&&e.pinchHandler&&l.type==="touch"){u.pinchGPoints=c.asArray();u.lastPinchDist=u.currentPinchDist=u.pinchGPoints[0].currentPos.distanceTo(u.pinchGPoints[1].currentPos);u.lastPinchCenter=u.currentPinchCenter=getCenterPoint(u.pinchGPoints[0].currentPos,u.pinchGPoints[1].currentPos)}}else{i.shouldReleaseCapture=false;if(e.releaseHandler&&s){e.releaseHandler({eventSource:e,pointerType:l.type,position:getPointRelativeToAbsolute(s,e.element),buttons:c.buttons,insideElementPressed:l.insideElementPressed,insideElementReleased:l.insideElement,isTouchEvent:l.type==="touch",originalEvent:i.originalEvent,userData:e.userData});i.preventDefault=true}}}else{i.shouldReleaseCapture=false;if(e.nonPrimaryReleaseHandler&&!i.preventGesture&&!i.defaultPrevented){i.preventDefault=true;e.nonPrimaryReleaseHandler({eventSource:e,pointerType:r.type,position:getPointRelativeToAbsolute(r.currentPos,e.element),button:o,buttons:c.buttons,isTouchEvent:r.type==="touch",originalEvent:i.originalEvent,userData:e.userData})}}}
/**
   * Call when pointer(s) change coordinates, button state, pressure, tilt, or contact geometry (e.g. width and height)
   *
   * @function
   * @private
   * @inner
   * @param {OpenSeadragon.MouseTracker} tracker
   *     A reference to the MouseTracker instance.
   * @param {OpenSeadragon.MouseTracker.EventProcessInfo} eventInfo
   *     Processing info for originating DOM event.
   * @param {OpenSeadragon.MouseTracker.GesturePoint} gPoint
   *      Gesture points associated with the event.
   */function updatePointerMove(e,t,i){var r,o,s,a=n[e.hash],l=e.getActivePointersListByType(i.type);typeof t.originalEvent.buttons!=="undefined"&&(l.buttons=t.originalEvent.buttons);r=l.getById(i.id);if(r){r.lastPos=r.currentPos;r.lastTime=r.currentTime;r.currentPos=i.currentPos;r.currentTime=i.currentTime;t.shouldCapture=false;t.shouldReleaseCapture=false;if(e.stopHandler&&i.type==="mouse"){clearTimeout(e.stopTimeOut);e.stopTimeOut=setTimeout((function(){handlePointerStop(e,t.originalEvent,i.type)}),e.stopDelay)}if(l.contacts===0)e.moveHandler&&e.moveHandler({eventSource:e,pointerType:i.type,position:getPointRelativeToAbsolute(i.currentPos,e.element),buttons:l.buttons,isTouchEvent:i.type==="touch",originalEvent:t.originalEvent,userData:e.userData});else if(l.contacts===1){if(e.moveHandler){r=l.asArray()[0];e.moveHandler({eventSource:e,pointerType:r.type,position:getPointRelativeToAbsolute(r.currentPos,e.element),buttons:l.buttons,isTouchEvent:r.type==="touch",originalEvent:t.originalEvent,userData:e.userData})}if(e.dragHandler&&!t.preventGesture&&!t.defaultPrevented){r=l.asArray()[0];s=r.currentPos.minus(r.lastPos);e.dragHandler({eventSource:e,pointerType:r.type,position:getPointRelativeToAbsolute(r.currentPos,e.element),buttons:l.buttons,delta:s,speed:r.speed,direction:r.direction,shift:t.originalEvent.shiftKey,isTouchEvent:r.type==="touch",originalEvent:t.originalEvent,userData:e.userData});t.preventDefault=true;a.sentDragEvent=true}}else if(l.contacts===2){if(e.moveHandler){o=l.asArray();e.moveHandler({eventSource:e,pointerType:o[0].type,position:getPointRelativeToAbsolute(getCenterPoint(o[0].currentPos,o[1].currentPos),e.element),buttons:l.buttons,isTouchEvent:o[0].type==="touch",originalEvent:t.originalEvent,userData:e.userData})}if(e.pinchHandler&&i.type==="touch"&&!t.preventGesture&&!t.defaultPrevented){s=a.pinchGPoints[0].currentPos.distanceTo(a.pinchGPoints[1].currentPos);if(s!==a.currentPinchDist){a.lastPinchDist=a.currentPinchDist;a.currentPinchDist=s;a.lastPinchCenter=a.currentPinchCenter;a.currentPinchCenter=getCenterPoint(a.pinchGPoints[0].currentPos,a.pinchGPoints[1].currentPos);e.pinchHandler({eventSource:e,pointerType:"touch",gesturePoints:a.pinchGPoints,lastCenter:getPointRelativeToAbsolute(a.lastPinchCenter,e.element),center:getPointRelativeToAbsolute(a.currentPinchCenter,e.element),lastDistance:a.lastPinchDist,distance:a.currentPinchDist,shift:t.originalEvent.shiftKey,originalEvent:t.originalEvent,userData:e.userData});t.preventDefault=true}}}}}
/**
   * @function
   * @private
   * @inner
   * @param {OpenSeadragon.MouseTracker} tracker
   *     A reference to the MouseTracker instance.
   * @param {OpenSeadragon.MouseTracker.EventProcessInfo} eventInfo
   *     Processing info for originating DOM event.
   * @param {OpenSeadragon.MouseTracker.GesturePoint} gPoint
   *      Gesture points associated with the event.
   */function updatePointerCancel(e,t,i){var n,r=e.getActivePointersListByType(i.type);n=r.getById(i.id);n&&stopTrackingPointer(e,r,n)}function handlePointerStop(e,t,i){e.stopHandler&&e.stopHandler({eventSource:e,pointerType:i,position:getMouseRelative(t,e.element),buttons:e.getActivePointersListByType(i).buttons,isTouchEvent:i==="touch",originalEvent:t,userData:e.userData})}})(OpenSeadragon);(function(t){
/**
   * An enumeration of supported locations where controls can be anchored.
   * The anchoring is always relative to the container.
   * @member ControlAnchor
   * @memberof OpenSeadragon
   * @static
   * @type {Object}
   * @property {Number} NONE
   * @property {Number} TOP_LEFT
   * @property {Number} TOP_RIGHT
   * @property {Number} BOTTOM_LEFT
   * @property {Number} BOTTOM_RIGHT
   * @property {Number} ABSOLUTE
   */
t.ControlAnchor={NONE:0,TOP_LEFT:1,TOP_RIGHT:2,BOTTOM_RIGHT:3,BOTTOM_LEFT:4,ABSOLUTE:5};
/**
   * @class Control
   * @classdesc A Control represents any interface element which is meant to allow the user
   * to interact with the zoomable interface. Any control can be anchored to any
   * element.
   *
   * @memberof OpenSeadragon
   * @param {Element} element - the control element to be anchored in the container.
   * @param {Object } options - All required and optional settings for configuring a control element.
   * @param {OpenSeadragon.ControlAnchor} [options.anchor=OpenSeadragon.ControlAnchor.NONE] - the position of the control
   *  relative to the container.
   * @param {Boolean} [options.attachToViewer=true] - Whether the control should be added directly to the viewer, or
   *  directly to the container
   * @param {Boolean} [options.autoFade=true] - Whether the control should have the autofade behavior
   * @param {Element} container - the element to control will be anchored too.
   */t.Control=function(i,n,r){var o=i.parentNode;if(typeof n==="number"){t.console.error("Passing an anchor directly into the OpenSeadragon.Control constructor is deprecated; please use an options object instead.  Support for this deprecated variant is scheduled for removal in December 2013");n={anchor:n}}n.attachToViewer=typeof n.attachToViewer==="undefined"||n.attachToViewer;(this||e).autoFade=typeof n.autoFade==="undefined"||n.autoFade;(this||e).element=i;(this||e).anchor=n.anchor;(this||e).container=r;if((this||e).anchor===t.ControlAnchor.ABSOLUTE){(this||e).wrapper=t.makeNeutralElement("div");(this||e).wrapper.style.position="absolute";(this||e).wrapper.style.top=typeof n.top==="number"?n.top+"px":n.top;(this||e).wrapper.style.left=typeof n.left==="number"?n.left+"px":n.left;(this||e).wrapper.style.height=typeof n.height==="number"?n.height+"px":n.height;(this||e).wrapper.style.width=typeof n.width==="number"?n.width+"px":n.width;(this||e).wrapper.style.margin="0px";(this||e).wrapper.style.padding="0px";(this||e).element.style.position="relative";(this||e).element.style.top="0px";(this||e).element.style.left="0px";(this||e).element.style.height="100%";(this||e).element.style.width="100%"}else{(this||e).wrapper=t.makeNeutralElement("div");(this||e).wrapper.style.display="inline-block";(this||e).anchor===t.ControlAnchor.NONE&&((this||e).wrapper.style.width=(this||e).wrapper.style.height="100%")}(this||e).wrapper.appendChild((this||e).element);n.attachToViewer?(this||e).anchor===t.ControlAnchor.TOP_RIGHT||(this||e).anchor===t.ControlAnchor.BOTTOM_RIGHT?(this||e).container.insertBefore((this||e).wrapper,(this||e).container.firstChild):(this||e).container.appendChild((this||e).wrapper):o.appendChild((this||e).wrapper)};t.Control.prototype={destroy:function(){(this||e).wrapper.removeChild((this||e).element);(this||e).anchor!==t.ControlAnchor.NONE&&(this||e).container.removeChild((this||e).wrapper)},
/**
     * Determines if the control is currently visible.
     * @function
     * @returns {Boolean} true if currently visible, false otherwise.
     */
isVisible:function(){return(this||e).wrapper.style.display!=="none"},
/**
     * Toggles the visibility of the control.
     * @function
     * @param {Boolean} visible - true to make visible, false to hide.
     */
setVisible:function(i){(this||e).wrapper.style.display=i?(this||e).anchor===t.ControlAnchor.ABSOLUTE?"block":"inline-block":"none"},
/**
     * Sets the opacity level for the control.
     * @function
     * @param {Number} opactiy - a value between 1 and 0 inclusively.
     */
setOpacity:function(i){t.setElementOpacity((this||e).wrapper,i,true)}}})(OpenSeadragon);(function(t){t.ControlDock=function(i){var n,r,o=["topleft","topright","bottomright","bottomleft"];t.extend(true,this||e,{id:"controldock-"+t.now()+"-"+Math.floor(Math.random()*1e6),container:t.makeNeutralElement("div"),controls:[]},i);(this||e).container.onsubmit=function(){return false};if((this||e).element){(this||e).element=t.getElement((this||e).element);(this||e).element.appendChild((this||e).container);t.getElementStyle((this||e).element).position==="static"&&((this||e).element.style.position="relative");(this||e).container.style.width="100%";(this||e).container.style.height="100%"}for(r=0;r<o.length;r++){n=o[r];(this||e).controls[n]=t.makeNeutralElement("div");(this||e).controls[n].style.position="absolute";n.match("left")&&((this||e).controls[n].style.left="0px");n.match("right")&&((this||e).controls[n].style.right="0px");n.match("top")&&((this||e).controls[n].style.top="0px");n.match("bottom")&&((this||e).controls[n].style.bottom="0px")}(this||e).container.appendChild((this||e).controls.topleft);(this||e).container.appendChild((this||e).controls.topright);(this||e).container.appendChild((this||e).controls.bottomright);(this||e).container.appendChild((this||e).controls.bottomleft)};t.ControlDock.prototype={addControl:function(i,n){i=t.getElement(i);var r=null;if(!(getControlIndex(this||e,i)>=0)){switch(n.anchor){case t.ControlAnchor.TOP_RIGHT:r=(this||e).controls.topright;i.style.position="relative";i.style.paddingRight="0px";i.style.paddingTop="0px";break;case t.ControlAnchor.BOTTOM_RIGHT:r=(this||e).controls.bottomright;i.style.position="relative";i.style.paddingRight="0px";i.style.paddingBottom="0px";break;case t.ControlAnchor.BOTTOM_LEFT:r=(this||e).controls.bottomleft;i.style.position="relative";i.style.paddingLeft="0px";i.style.paddingBottom="0px";break;case t.ControlAnchor.TOP_LEFT:r=(this||e).controls.topleft;i.style.position="relative";i.style.paddingLeft="0px";i.style.paddingTop="0px";break;case t.ControlAnchor.ABSOLUTE:r=(this||e).container;i.style.margin="0px";i.style.padding="0px";break;default:case t.ControlAnchor.NONE:r=(this||e).container;i.style.margin="0px";i.style.padding="0px";break}(this||e).controls.push(new t.Control(i,n,r));i.style.display="inline-block"}},
/**
     * @function
     * @returns {OpenSeadragon.ControlDock} Chainable.
     */
removeControl:function(i){i=t.getElement(i);var n=getControlIndex(this||e,i);if(n>=0){(this||e).controls[n].destroy();(this||e).controls.splice(n,1)}return this||e},
/**
     * @function
     * @returns {OpenSeadragon.ControlDock} Chainable.
     */
clearControls:function(){while((this||e).controls.length>0)(this||e).controls.pop().destroy();return this||e},
/**
     * @function
     * @returns {Boolean}
     */
areControlsEnabled:function(){var t;for(t=(this||e).controls.length-1;t>=0;t--)if((this||e).controls[t].isVisible())return true;return false},
/**
     * @function
     * @returns {OpenSeadragon.ControlDock} Chainable.
     */
setControlsEnabled:function(t){var i;for(i=(this||e).controls.length-1;i>=0;i--)(this||e).controls[i].setVisible(t);return this||e}};function getControlIndex(e,t){var i,n=e.controls;for(i=n.length-1;i>=0;i--)if(n[i].element===t)return i;return-1}})(OpenSeadragon);(function(e){e.Placement=e.freezeObject({CENTER:0,TOP_LEFT:1,TOP:2,TOP_RIGHT:3,RIGHT:4,BOTTOM_RIGHT:5,BOTTOM:6,BOTTOM_LEFT:7,LEFT:8,properties:{0:{isLeft:false,isHorizontallyCentered:true,isRight:false,isTop:false,isVerticallyCentered:true,isBottom:false},1:{isLeft:true,isHorizontallyCentered:false,isRight:false,isTop:true,isVerticallyCentered:false,isBottom:false},2:{isLeft:false,isHorizontallyCentered:true,isRight:false,isTop:true,isVerticallyCentered:false,isBottom:false},3:{isLeft:false,isHorizontallyCentered:false,isRight:true,isTop:true,isVerticallyCentered:false,isBottom:false},4:{isLeft:false,isHorizontallyCentered:false,isRight:true,isTop:false,isVerticallyCentered:true,isBottom:false},5:{isLeft:false,isHorizontallyCentered:false,isRight:true,isTop:false,isVerticallyCentered:false,isBottom:true},6:{isLeft:false,isHorizontallyCentered:true,isRight:false,isTop:false,isVerticallyCentered:false,isBottom:true},7:{isLeft:true,isHorizontallyCentered:false,isRight:false,isTop:false,isVerticallyCentered:false,isBottom:true},8:{isLeft:true,isHorizontallyCentered:false,isRight:false,isTop:false,isVerticallyCentered:true,isBottom:false}}})})(OpenSeadragon);(function(t){var i={};var n=1;
/**
   *
   * The main point of entry into creating a zoomable image on the page.<br>
   * <br>
   * We have provided an idiomatic javascript constructor which takes
   * a single object, but still support the legacy positional arguments.<br>
   * <br>
   * The options below are given in order that they appeared in the constructor
   * as arguments and we translate a positional call into an idiomatic call.<br>
   * <br>
   * To create a viewer, you can use either of this methods:<br>
   * <ul>
   * <li><code>var viewer = new OpenSeadragon.Viewer(options);</code></li>
   * <li><code>var viewer = OpenSeadragon(options);</code></li>
   * </ul>
   * @class Viewer
   * @classdesc The main OpenSeadragon viewer class.
   *
   * @memberof OpenSeadragon
   * @extends OpenSeadragon.EventSource
   * @extends OpenSeadragon.ControlDock
   * @param {OpenSeadragon.Options} options - Viewer options.
   *
   **/t.Viewer=function(r){var o,s=arguments,a=this||e;t.isPlainObject(r)||(r={id:s[0],xmlPath:s.length>1?s[1]:void 0,prefixUrl:s.length>2?s[2]:void 0,controls:s.length>3?s[3]:void 0,overlays:s.length>4?s[4]:void 0});if(r.config){t.extend(true,r,r.config);delete r.config}let l=["useCanvas"];r.drawerOptions=Object.assign({},l.reduce(((e,t)=>{e[t]=r[t];delete r[t];return e}),{}),r.drawerOptions);t.extend(true,this||e,{id:r.id,hash:r.hash||n++,initialPage:0,element:null,container:null,canvas:null,overlays:[],overlaysContainer:null,previousBody:[],customControls:[],source:null,drawer:null,world:null,viewport:null,navigator:null,collectionViewport:null,collectionDrawer:null,navImages:null,buttonGroup:null,profiler:null},t.DEFAULT_SETTINGS,r);if(typeof(this||e).hash==="undefined")throw new Error("A hash must be defined, either by specifying options.id or options.hash.");typeof i[(this||e).hash]!=="undefined"&&t.console.warn("Hash "+(this||e).hash+" has already been used.");i[(this||e).hash]={fsBoundsDelta:new t.Point(1,1),prevContainerSize:null,animating:false,forceRedraw:false,needsResize:false,forceResize:false,mouseInside:false,group:null,zooming:false,zoomFactor:null,lastZoomTime:null,fullPage:false,onfullscreenchange:null,lastClickTime:null,draggingToZoom:false};(this||e)._sequenceIndex=0;(this||e)._firstOpen=true;(this||e)._updateRequestId=null;(this||e)._loadQueue=[];(this||e).currentOverlays=[];(this||e)._updatePixelDensityRatioBind=null;(this||e)._lastScrollTime=t.now();t.EventSource.call(this||e);this.addHandler("open-failed",(function(e){var i=t.getString("Errors.OpenFailed",e.eventSource,e.message);a._showMessage(i)}));t.ControlDock.call(this||e,r);(this||e).xmlPath&&((this||e).tileSources=[(this||e).xmlPath]);(this||e).element=(this||e).element||document.getElementById((this||e).id);(this||e).canvas=t.makeNeutralElement("div");(this||e).canvas.className="openseadragon-canvas";(function(e){e.width="100%";e.height="100%";e.overflow="hidden";e.position="absolute";e.top="0px";e.left="0px"})((this||e).canvas.style);t.setElementTouchActionNone((this||e).canvas);r.tabIndex!==""&&((this||e).canvas.tabIndex=r.tabIndex===void 0?0:r.tabIndex);(this||e).container.className="openseadragon-container";(function(e){e.width="100%";e.height="100%";e.position="relative";e.overflow="hidden";e.left="0px";e.top="0px";e.textAlign="left"})((this||e).container.style);t.setElementTouchActionNone((this||e).container);(this||e).container.insertBefore((this||e).canvas,(this||e).container.firstChild);(this||e).element.appendChild((this||e).container);(this||e).bodyWidth=document.body.style.width;(this||e).bodyHeight=document.body.style.height;(this||e).bodyOverflow=document.body.style.overflow;(this||e).docOverflow=document.documentElement.style.overflow;(this||e).innerTracker=new t.MouseTracker({userData:"Viewer.innerTracker",element:(this||e).canvas,startDisabled:!(this||e).mouseNavEnabled,clickTimeThreshold:(this||e).clickTimeThreshold,clickDistThreshold:(this||e).clickDistThreshold,dblClickTimeThreshold:(this||e).dblClickTimeThreshold,dblClickDistThreshold:(this||e).dblClickDistThreshold,contextMenuHandler:t.delegate(this||e,onCanvasContextMenu),keyDownHandler:t.delegate(this||e,onCanvasKeyDown),keyHandler:t.delegate(this||e,onCanvasKeyPress),clickHandler:t.delegate(this||e,onCanvasClick),dblClickHandler:t.delegate(this||e,onCanvasDblClick),dragHandler:t.delegate(this||e,onCanvasDrag),dragEndHandler:t.delegate(this||e,onCanvasDragEnd),enterHandler:t.delegate(this||e,onCanvasEnter),leaveHandler:t.delegate(this||e,onCanvasLeave),pressHandler:t.delegate(this||e,onCanvasPress),releaseHandler:t.delegate(this||e,onCanvasRelease),nonPrimaryPressHandler:t.delegate(this||e,onCanvasNonPrimaryPress),nonPrimaryReleaseHandler:t.delegate(this||e,onCanvasNonPrimaryRelease),scrollHandler:t.delegate(this||e,onCanvasScroll),pinchHandler:t.delegate(this||e,onCanvasPinch),focusHandler:t.delegate(this||e,onCanvasFocus),blurHandler:t.delegate(this||e,onCanvasBlur)});(this||e).outerTracker=new t.MouseTracker({userData:"Viewer.outerTracker",element:(this||e).container,startDisabled:!(this||e).mouseNavEnabled,clickTimeThreshold:(this||e).clickTimeThreshold,clickDistThreshold:(this||e).clickDistThreshold,dblClickTimeThreshold:(this||e).dblClickTimeThreshold,dblClickDistThreshold:(this||e).dblClickDistThreshold,enterHandler:t.delegate(this||e,onContainerEnter),leaveHandler:t.delegate(this||e,onContainerLeave)});(this||e).toolbar&&((this||e).toolbar=new t.ControlDock({element:(this||e).toolbar}));this.bindStandardControls();i[(this||e).hash].prevContainerSize=_getSafeElemSize((this||e).container);if(window.ResizeObserver){(this||e)._autoResizePolling=false;(this||e)._resizeObserver=new ResizeObserver((function(){i[a.hash].needsResize=true}));(this||e)._resizeObserver.observe((this||e).container,{})}else(this||e)._autoResizePolling=true;(this||e).world=new t.World({viewer:this||e});(this||e).world.addHandler("add-item",(function(e){a.source=a.world.getItemAt(0).source;i[a.hash].forceRedraw=true;a._updateRequestId||(a._updateRequestId=scheduleUpdate(a,updateMulti))}));(this||e).world.addHandler("remove-item",(function(e){a.world.getItemCount()?a.source=a.world.getItemAt(0).source:a.source=null;i[a.hash].forceRedraw=true}));(this||e).world.addHandler("metrics-change",(function(e){a.viewport&&a.viewport._setContentBounds(a.world.getHomeBounds(),a.world.getContentFactor())}));(this||e).world.addHandler("item-index-change",(function(e){a.source=a.world.getItemAt(0).source}));(this||e).viewport=new t.Viewport({containerSize:i[(this||e).hash].prevContainerSize,springStiffness:(this||e).springStiffness,animationTime:(this||e).animationTime,minZoomImageRatio:(this||e).minZoomImageRatio,maxZoomPixelRatio:(this||e).maxZoomPixelRatio,visibilityRatio:(this||e).visibilityRatio,wrapHorizontal:(this||e).wrapHorizontal,wrapVertical:(this||e).wrapVertical,defaultZoomLevel:(this||e).defaultZoomLevel,minZoomLevel:(this||e).minZoomLevel,maxZoomLevel:(this||e).maxZoomLevel,viewer:this||e,degrees:(this||e).degrees,flipped:(this||e).flipped,overlayPreserveContentDirection:(this||e).overlayPreserveContentDirection,navigatorRotate:(this||e).navigatorRotate,homeFillsViewer:(this||e).homeFillsViewer,margins:(this||e).viewportMargins,silenceMultiImageWarnings:(this||e).silenceMultiImageWarnings});(this||e).viewport._setContentBounds((this||e).world.getHomeBounds(),(this||e).world.getContentFactor());(this||e).imageLoader=new t.ImageLoader({jobLimit:(this||e).imageLoaderLimit,timeout:r.timeout,tileRetryMax:(this||e).tileRetryMax,tileRetryDelay:(this||e).tileRetryDelay});(this||e).tileCache=new t.TileCache({maxImageCacheCount:(this||e).maxImageCacheCount});if(Object.prototype.hasOwnProperty.call((this||e).drawerOptions,"useCanvas")){t.console.error('useCanvas is deprecated, use the "drawer" option to indicate preferred drawer(s)');(this||e).drawerOptions.useCanvas||((this||e).drawer=t.HTMLDrawer);delete(this||e).drawerOptions.useCanvas}let h=Array.isArray((this||e).drawer)?(this||e).drawer:[(this||e).drawer];if(h.length===0){h=[t.DEFAULT_SETTINGS.drawer].flat();t.console.warn("No valid drawers were selected. Using the default value.")}(this||e).drawer=null;for(const e of h){let t=this.requestDrawer(e,{mainDrawer:true,redrawImmediately:false});if(t)break}if(!(this||e).drawer){t.console.error("No drawer could be created!");throw"Error with creating the selected drawer(s)"}(this||e).drawer.setImageSmoothingEnabled((this||e).imageSmoothingEnabled);(this||e).overlaysContainer=t.makeNeutralElement("div");(this||e).canvas.appendChild((this||e).overlaysContainer);if(!(this||e).drawer.canRotate()){if((this||e).rotateLeft){o=(this||e).buttonGroup.buttons.indexOf((this||e).rotateLeft);(this||e).buttonGroup.buttons.splice(o,1);(this||e).buttonGroup.element.removeChild((this||e).rotateLeft.element)}if((this||e).rotateRight){o=(this||e).buttonGroup.buttons.indexOf((this||e).rotateRight);(this||e).buttonGroup.buttons.splice(o,1);(this||e).buttonGroup.element.removeChild((this||e).rotateRight.element)}}this._addUpdatePixelDensityRatioEvent();(this||e).showNavigator&&((this||e).navigator=new t.Navigator({element:(this||e).navigatorElement,id:(this||e).navigatorId,position:(this||e).navigatorPosition,sizeRatio:(this||e).navigatorSizeRatio,maintainSizeRatio:(this||e).navigatorMaintainSizeRatio,top:(this||e).navigatorTop,left:(this||e).navigatorLeft,width:(this||e).navigatorWidth,height:(this||e).navigatorHeight,autoResize:(this||e).navigatorAutoResize,autoFade:(this||e).navigatorAutoFade,prefixUrl:(this||e).prefixUrl,viewer:this||e,navigatorRotate:(this||e).navigatorRotate,background:(this||e).navigatorBackground,opacity:(this||e).navigatorOpacity,borderColor:(this||e).navigatorBorderColor,displayRegionColor:(this||e).navigatorDisplayRegionColor,crossOriginPolicy:(this||e).crossOriginPolicy,animationTime:(this||e).animationTime,drawer:(this||e).drawer.getType(),loadTilesWithAjax:(this||e).loadTilesWithAjax,ajaxHeaders:(this||e).ajaxHeaders,ajaxWithCredentials:(this||e).ajaxWithCredentials}));(this||e).sequenceMode&&this.bindSequenceControls();(this||e).tileSources&&this.open((this||e).tileSources);for(o=0;o<(this||e).customControls.length;o++)this.addControl((this||e).customControls[o].id,{anchor:(this||e).customControls[o].anchor});t.requestAnimationFrame((function(){beginControlsAutoHide(a)}));t._viewers.set((this||e).element,this||e)};t.extend(t.Viewer.prototype,t.EventSource.prototype,t.ControlDock.prototype,{
/**
     * @function
     * @returns {Boolean}
     */
isOpen:function(){return!!(this||e).world.getItemCount()},openDzi:function(e){t.console.error("[Viewer.openDzi] this function is deprecated; use Viewer.open() instead.");return this.open(e)},openTileSource:function(e){t.console.error("[Viewer.openTileSource] this function is deprecated; use Viewer.open() instead.");return this.open(e)},get buttons(){t.console.warn("Viewer.buttons is deprecated; Please use Viewer.buttonGroup");return(this||e).buttonGroup},
/**
     * Open tiled images into the viewer, closing any others.
     * To get the TiledImage instance created by open, add an event listener for
     * {@link OpenSeadragon.Viewer.html#.event:open}, which when fired can be used to get access
     * to the instance, i.e., viewer.world.getItemAt(0).
     * @function
     * @param {Array|String|Object|Function} tileSources - This can be a TiledImage
     * specifier, a TileSource specifier, or an array of either. A TiledImage specifier
     * is the same as the options parameter for {@link OpenSeadragon.Viewer#addTiledImage},
     * except for the index property; images are added in sequence.
     * A TileSource specifier is anything you could pass as the tileSource property
     * of the options parameter for {@link OpenSeadragon.Viewer#addTiledImage}.
     * @param {Number} initialPage - If sequenceMode is true, display this page initially
     * for the given tileSources. If specified, will overwrite the Viewer's existing initialPage property.
     * @returns {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:open
     * @fires OpenSeadragon.Viewer.event:open-failed
     */
open:function(i,n){var r=this||e;this.close();if(!i)return this||e;if((this||e).sequenceMode&&t.isArray(i)){if((this||e).referenceStrip){(this||e).referenceStrip.destroy();(this||e).referenceStrip=null}typeof n==="undefined"||isNaN(n)||((this||e).initialPage=n);(this||e).tileSources=i;(this||e)._sequenceIndex=Math.max(0,Math.min((this||e).tileSources.length-1,(this||e).initialPage));if((this||e).tileSources.length){this.open((this||e).tileSources[(this||e)._sequenceIndex]);(this||e).showReferenceStrip&&this.addReferenceStrip()}this._updateSequenceButtons((this||e)._sequenceIndex);return this||e}t.isArray(i)||(i=[i]);if(!i.length)return this||e;(this||e)._opening=true;var o=i.length;var s=0;var a=0;var l;var checkCompletion=function(){if(s+a===o)if(s){if(r._firstOpen||!r.preserveViewport){r.viewport.goHome(true);r.viewport.update()}r._firstOpen=false;var e=i[0];e.tileSource&&(e=e.tileSource);if(r.overlays&&!r.preserveOverlays)for(var t=0;t<r.overlays.length;t++)r.currentOverlays[t]=getOverlayObject(r,r.overlays[t]);r._drawOverlays();r._opening=false;
/**
             * Raised when the viewer has opened and loaded one or more TileSources.
             *
             * @event open
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
             * @property {OpenSeadragon.TileSource} source - The tile source that was opened.
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */r.raiseEvent("open",{source:e})}else{r._opening=false;
/**
             * Raised when an error occurs loading a TileSource.
             *
             * @event open-failed
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
             * @property {String} message - Information about what failed.
             * @property {String} source - The tile source that failed.
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */r.raiseEvent("open-failed",l)}};var doOne=function(e){t.isPlainObject(e)&&e.tileSource||(e={tileSource:e});if(e.index!==void 0){t.console.error("[Viewer.open] setting indexes here is not supported; use addTiledImage instead");delete e.index}e.collectionImmediately===void 0&&(e.collectionImmediately=true);var i=e.success;e.success=function(t){s++;if(e.tileSource.overlays)for(var n=0;n<e.tileSource.overlays.length;n++)r.addOverlay(e.tileSource.overlays[n]);i&&i(t);checkCompletion()};var n=e.error;e.error=function(e){a++;l||(l=e);n&&n(e);checkCompletion()};r.addTiledImage(e)};for(var h=0;h<i.length;h++)doOne(i[h]);return this||e},
/**
     * @function
     * @returns {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:close
     */
close:function(){if(!i[(this||e).hash])return this||e;(this||e)._opening=false;(this||e).navigator&&(this||e).navigator.close();if(!(this||e).preserveOverlays){this.clearOverlays();(this||e).overlaysContainer.innerHTML=""}i[(this||e).hash].animating=false;(this||e).world.removeAll();(this||e).imageLoader.clear();
/**
       * Raised when the viewer is closed (see {@link OpenSeadragon.Viewer#close}).
       *
       * @event close
       * @memberof OpenSeadragon.Viewer
       * @type {object}
       * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
       * @property {?Object} userData - Arbitrary subscriber-defined object.
       */this.raiseEvent("close");return this||e},destroy:function(){if(i[(this||e).hash]){
/**
       * Raised when the viewer is about to be destroyed (see {@link OpenSeadragon.Viewer#before-destroy}).
       *
       * @event before-destroy
       * @memberof OpenSeadragon.Viewer
       * @type {object}
       * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
       * @property {?Object} userData - Arbitrary subscriber-defined object.
       */
this.raiseEvent("before-destroy");this._removeUpdatePixelDensityRatioEvent();this.close();this.clearOverlays();(this||e).overlaysContainer.innerHTML="";(this||e)._resizeObserver&&(this||e)._resizeObserver.disconnect();if((this||e).referenceStrip){(this||e).referenceStrip.destroy();(this||e).referenceStrip=null}if((this||e)._updateRequestId!==null){t.cancelAnimationFrame((this||e)._updateRequestId);(this||e)._updateRequestId=null}(this||e).drawer&&(this||e).drawer.destroy();if((this||e).navigator){(this||e).navigator.destroy();i[(this||e).navigator.hash]=null;delete i[(this||e).navigator.hash];(this||e).navigator=null}if((this||e).buttonGroup)(this||e).buttonGroup.destroy();else if((this||e).customButtons)while((this||e).customButtons.length)(this||e).customButtons.pop().destroy();(this||e).paging&&(this||e).paging.destroy();if((this||e).element)while((this||e).element.firstChild)(this||e).element.removeChild((this||e).element.firstChild);(this||e).container.onsubmit=null;this.clearControls();(this||e).innerTracker&&(this||e).innerTracker.destroy();(this||e).outerTracker&&(this||e).outerTracker.destroy();i[(this||e).hash]=null;delete i[(this||e).hash];(this||e).canvas=null;(this||e).container=null;t._viewers.delete((this||e).element);(this||e).element=null;
/**
       * Raised when the viewer is destroyed (see {@link OpenSeadragon.Viewer#destroy}).
       *
       * @event destroy
       * @memberof OpenSeadragon.Viewer
       * @type {object}
       * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
       * @property {?Object} userData - Arbitrary subscriber-defined object.
       */this.raiseEvent("destroy");this.removeAllHandlers()}},
/**
     * Request a drawer for this viewer, as a supported string or drawer constructor.
     * @param {String | OpenSeadragon.DrawerBase} drawerCandidate The type of drawer to try to construct.
     * @param { Object } options
     * @param { Boolean } [options.mainDrawer] Whether to use this as the viewer's main drawer. Default = true.
     * @param { Boolean } [options.redrawImmediately] Whether to immediately draw a new frame. Only used if options.mainDrawer = true. Default = true.
     * @param { Object } [options.drawerOptions] Options for this drawer. Defaults to viewer.drawerOptions.
     * for this viewer type. See {@link OpenSeadragon.Options}.
     * @returns {Object | Boolean} The drawer that was created, or false if the requested drawer is not supported
     */
requestDrawer(i,n){const r={mainDrawer:true,redrawImmediately:true,drawerOptions:null};n=t.extend(true,r,n);const o=n.mainDrawer;const s=n.redrawImmediately;const a=n.drawerOptions;const l=(this||e).drawer;let h=null;if(i&&i.prototype instanceof t.DrawerBase){h=i;i="custom"}else typeof i==="string"&&(h=t.determineDrawer(i));h||t.console.warn("Unsupported drawer! Drawer must be an existing string type, or a class that extends OpenSeadragon.DrawerBase.");if(h&&h.isSupported()){l&&o&&l.destroy();const t=new h({viewer:this||e,viewport:(this||e).viewport,element:(this||e).canvas,debugGridColor:(this||e).debugGridColor,options:a||(this||e).drawerOptions[i]});if(o){(this||e).drawer=t;s&&this.forceRedraw()}return t}return false},
/**
     * @function
     * @returns {Boolean}
     */
isMouseNavEnabled:function(){return(this||e).innerTracker.isTracking()},
/**
     * @function
     * @param {Boolean} enabled - true to enable, false to disable
     * @returns {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:mouse-enabled
     */
setMouseNavEnabled:function(t){(this||e).innerTracker.setTracking(t);(this||e).outerTracker.setTracking(t);
/**
       * Raised when mouse/touch navigation is enabled or disabled (see {@link OpenSeadragon.Viewer#setMouseNavEnabled}).
       *
       * @event mouse-enabled
       * @memberof OpenSeadragon.Viewer
       * @type {object}
       * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
       * @property {Boolean} enabled
       * @property {?Object} userData - Arbitrary subscriber-defined object.
       */this.raiseEvent("mouse-enabled",{enabled:t});return this||e},
/**
     * @function
     * @returns {Boolean}
     */
areControlsEnabled:function(){var t,i=(this||e).controls.length;for(t=0;t<(this||e).controls.length;t++)i=i&&(this||e).controls[t].isVisible();return i},
/**
     * Shows or hides the controls (e.g. the default navigation buttons).
     *
     * @function
     * @param {Boolean} true to show, false to hide.
     * @returns {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:controls-enabled
     */
setControlsEnabled:function(t){t?abortControlsAutoHide(this||e):beginControlsAutoHide(this||e)
/**
       * Raised when the navigation controls are shown or hidden (see {@link OpenSeadragon.Viewer#setControlsEnabled}).
       *
       * @event controls-enabled
       * @memberof OpenSeadragon.Viewer
       * @type {object}
       * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
       * @property {Boolean} enabled
       * @property {?Object} userData - Arbitrary subscriber-defined object.
       */;this.raiseEvent("controls-enabled",{enabled:t});return this||e},
/**
     * Turns debugging mode on or off for this viewer.
     *
     * @function
     * @param {Boolean} debugMode true to turn debug on, false to turn debug off.
     */
setDebugMode:function(t){for(var i=0;i<(this||e).world.getItemCount();i++)(this||e).world.getItemAt(i).debugMode=t;(this||e).debugMode=t;this.forceRedraw()},
/**
     * Update headers to include when making AJAX requests.
     *
     * Unless `propagate` is set to false (which is likely only useful in rare circumstances),
     * the updated headers are propagated to all tiled images, each of which will subsequently
     * propagate the changed headers to all their tiles.
     * If applicable, the headers of the viewer's navigator and reference strip will also be updated.
     *
     * Note that the rules for merging headers still apply, i.e. headers returned by
     * {@link OpenSeadragon.TileSource#getTileAjaxHeaders} take precedence over
     * `TiledImage.ajaxHeaders`, which take precedence over the headers here in the viewer.
     *
     * @function
     * @param {Object} ajaxHeaders Updated AJAX headers.
     * @param {Boolean} [propagate=true] Whether to propagate updated headers to tiled images, etc.
     */
setAjaxHeaders:function(i,n){i===null&&(i={});if(t.isPlainObject(i)){n===void 0&&(n=true);(this||e).ajaxHeaders=i;if(n){for(var r=0;r<(this||e).world.getItemCount();r++)(this||e).world.getItemAt(r)._updateAjaxHeaders(true);(this||e).navigator&&(this||e).navigator.setAjaxHeaders((this||e).ajaxHeaders,true);if((this||e).referenceStrip&&(this||e).referenceStrip.miniViewers)for(var o in(this||e).referenceStrip.miniViewers)(this||e).referenceStrip.miniViewers[o].setAjaxHeaders((this||e).ajaxHeaders,true)}}else console.error("[Viewer.setAjaxHeaders] Ignoring invalid headers, must be a plain object")},
/**
     * Adds the given button to this viewer.
     *
     * @function
     * @param {OpenSeadragon.Button} button
     */
addButton:function(t){(this||e).buttonGroup.addButton(t)},
/**
     * @function
     * @returns {Boolean}
     */
isFullPage:function(){return i[(this||e).hash]&&i[(this||e).hash].fullPage},
/**
     * Toggle full page mode.
     * @function
     * @param {Boolean} fullPage
     *      If true, enter full page mode.  If false, exit full page mode.
     * @returns {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:pre-full-page
     * @fires OpenSeadragon.Viewer.event:full-page
     */
setFullPage:function(n){var r,o,s=document.body,a=s.style,l=document.documentElement.style,h=this||e;if(n===this.isFullPage())return this||e;var u={fullPage:n,preventDefaultAction:false};
/**
       * Raised when the viewer is about to change to/from full-page mode (see {@link OpenSeadragon.Viewer#setFullPage}).
       *
       * @event pre-full-page
       * @memberof OpenSeadragon.Viewer
       * @type {object}
       * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
       * @property {Boolean} fullPage - True if entering full-page mode, false if exiting full-page mode.
       * @property {Boolean} preventDefaultAction - Set to true to prevent full-page mode change. Default: false.
       * @property {?Object} userData - Arbitrary subscriber-defined object.
       */this.raiseEvent("pre-full-page",u);if(u.preventDefaultAction)return this||e;if(n&&(this||e).element){(this||e).elementSize=t.getElementSize((this||e).element);(this||e).pageScroll=t.getPageScroll();(this||e).elementMargin=(this||e).element.style.margin;(this||e).element.style.margin="0";(this||e).elementPadding=(this||e).element.style.padding;(this||e).element.style.padding="0";(this||e).bodyMargin=a.margin;(this||e).docMargin=l.margin;a.margin="0";l.margin="0";(this||e).bodyPadding=a.padding;(this||e).docPadding=l.padding;a.padding="0";l.padding="0";(this||e).bodyWidth=a.width;(this||e).docWidth=l.width;a.width="100%";l.width="100%";(this||e).bodyHeight=a.height;(this||e).docHeight=l.height;a.height="100%";l.height="100%";(this||e).bodyDisplay=a.display;a.display="block";(this||e).previousBody=[];i[(this||e).hash].prevElementParent=(this||e).element.parentNode;i[(this||e).hash].prevNextSibling=(this||e).element.nextSibling;i[(this||e).hash].prevElementWidth=(this||e).element.style.width;i[(this||e).hash].prevElementHeight=(this||e).element.style.height;r=s.childNodes.length;for(o=0;o<r;o++){(this||e).previousBody.push(s.childNodes[0]);s.removeChild(s.childNodes[0])}if((this||e).toolbar&&(this||e).toolbar.element){(this||e).toolbar.parentNode=(this||e).toolbar.element.parentNode;(this||e).toolbar.nextSibling=(this||e).toolbar.element.nextSibling;s.appendChild((this||e).toolbar.element);t.addClass((this||e).toolbar.element,"fullpage")}t.addClass((this||e).element,"fullpage");s.appendChild((this||e).element);(this||e).element.style.height="100vh";(this||e).element.style.width="100vw";(this||e).toolbar&&(this||e).toolbar.element&&((this||e).element.style.height=t.getElementSize((this||e).element).y-t.getElementSize((this||e).toolbar.element).y+"px");i[(this||e).hash].fullPage=true;t.delegate(this||e,onContainerEnter)({})}else{(this||e).element.style.margin=(this||e).elementMargin;(this||e).element.style.padding=(this||e).elementPadding;a.margin=(this||e).bodyMargin;l.margin=(this||e).docMargin;a.padding=(this||e).bodyPadding;l.padding=(this||e).docPadding;a.width=(this||e).bodyWidth;l.width=(this||e).docWidth;a.height=(this||e).bodyHeight;l.height=(this||e).docHeight;a.display=(this||e).bodyDisplay;s.removeChild((this||e).element);r=(this||e).previousBody.length;for(o=0;o<r;o++)s.appendChild((this||e).previousBody.shift());t.removeClass((this||e).element,"fullpage");i[(this||e).hash].prevElementParent.insertBefore((this||e).element,i[(this||e).hash].prevNextSibling);if((this||e).toolbar&&(this||e).toolbar.element){s.removeChild((this||e).toolbar.element);t.removeClass((this||e).toolbar.element,"fullpage");(this||e).toolbar.parentNode.insertBefore((this||e).toolbar.element,(this||e).toolbar.nextSibling);delete(this||e).toolbar.parentNode;delete(this||e).toolbar.nextSibling}(this||e).element.style.width=i[(this||e).hash].prevElementWidth;(this||e).element.style.height=i[(this||e).hash].prevElementHeight;var c=0;var restoreScroll=function(){t.setPageScroll(h.pageScroll);var e=t.getPageScroll();c++;c<10&&(e.x!==h.pageScroll.x||e.y!==h.pageScroll.y)&&t.requestAnimationFrame(restoreScroll)};t.requestAnimationFrame(restoreScroll);i[(this||e).hash].fullPage=false;t.delegate(this||e,onContainerLeave)({})}(this||e).navigator&&(this||e).viewport&&(this||e).navigator.update((this||e).viewport)
/**
       * Raised when the viewer has changed to/from full-page mode (see {@link OpenSeadragon.Viewer#setFullPage}).
       *
       * @event full-page
       * @memberof OpenSeadragon.Viewer
       * @type {object}
       * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
       * @property {Boolean} fullPage - True if changed to full-page mode, false if exited full-page mode.
       * @property {?Object} userData - Arbitrary subscriber-defined object.
       */;this.raiseEvent("full-page",{fullPage:n});return this||e},
/**
     * Toggle full screen mode if supported. Toggle full page mode otherwise.
     * @function
     * @param {Boolean} fullScreen
     *      If true, enter full screen mode.  If false, exit full screen mode.
     * @returns {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:pre-full-screen
     * @fires OpenSeadragon.Viewer.event:full-screen
     */
setFullScreen:function(i){var n=this||e;if(!t.supportsFullScreen)return this.setFullPage(i);if(t.isFullScreen()===i)return this||e;var r={fullScreen:i,preventDefaultAction:false};
/**
       * Raised when the viewer is about to change to/from full-screen mode (see {@link OpenSeadragon.Viewer#setFullScreen}).
       * Note: the pre-full-screen event is not raised when the user is exiting
       * full-screen mode by pressing the Esc key. In that case, consider using
       * the full-screen, pre-full-page or full-page events.
       *
       * @event pre-full-screen
       * @memberof OpenSeadragon.Viewer
       * @type {object}
       * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
       * @property {Boolean} fullScreen - True if entering full-screen mode, false if exiting full-screen mode.
       * @property {Boolean} preventDefaultAction - Set to true to prevent full-screen mode change. Default: false.
       * @property {?Object} userData - Arbitrary subscriber-defined object.
       */this.raiseEvent("pre-full-screen",r);if(r.preventDefaultAction)return this||e;if(i){this.setFullPage(true);if(!this.isFullPage())return this||e;(this||e).fullPageStyleWidth=(this||e).element.style.width;(this||e).fullPageStyleHeight=(this||e).element.style.height;(this||e).element.style.width="100%";(this||e).element.style.height="100%";var onFullScreenChange=function(){var e=t.isFullScreen();if(!e){t.removeEvent(document,t.fullScreenEventName,onFullScreenChange);t.removeEvent(document,t.fullScreenErrorEventName,onFullScreenChange);n.setFullPage(false);if(n.isFullPage()){n.element.style.width=n.fullPageStyleWidth;n.element.style.height=n.fullPageStyleHeight}}n.navigator&&n.viewport&&setTimeout((function(){n.navigator.update(n.viewport)}))
/**
           * Raised when the viewer has changed to/from full-screen mode (see {@link OpenSeadragon.Viewer#setFullScreen}).
           *
           * @event full-screen
           * @memberof OpenSeadragon.Viewer
           * @type {object}
           * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
           * @property {Boolean} fullScreen - True if changed to full-screen mode, false if exited full-screen mode.
           * @property {?Object} userData - Arbitrary subscriber-defined object.
           */;n.raiseEvent("full-screen",{fullScreen:e})};t.addEvent(document,t.fullScreenEventName,onFullScreenChange);t.addEvent(document,t.fullScreenErrorEventName,onFullScreenChange);t.requestFullScreen(document.body)}else t.exitFullScreen();return this||e},
/**
     * @function
     * @returns {Boolean}
     */
isVisible:function(){return(this||e).container.style.visibility!=="hidden"},
/**
     * @function
     * @returns {Boolean} returns true if the viewer is in fullscreen
     */
isFullScreen:function(){return t.isFullScreen()&&this.isFullPage()},
/**
     * @function
     * @param {Boolean} visible
     * @returns {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:visible
     */
setVisible:function(t){(this||e).container.style.visibility=t?"":"hidden";
/**
       * Raised when the viewer is shown or hidden (see {@link OpenSeadragon.Viewer#setVisible}).
       *
       * @event visible
       * @memberof OpenSeadragon.Viewer
       * @type {object}
       * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
       * @property {Boolean} visible
       * @property {?Object} userData - Arbitrary subscriber-defined object.
       */this.raiseEvent("visible",{visible:t});return this||e},
/**
     * Add a tiled image to the viewer.
     * options.tileSource can be anything that {@link OpenSeadragon.Viewer#open}
     *  supports except arrays of images.
     * Note that you can specify options.width or options.height, but not both.
     * The other dimension will be calculated according to the item's aspect ratio.
     * If collectionMode is on (see {@link OpenSeadragon.Options}), the new image is
     * automatically arranged with the others.
     * @function
     * @param {Object} options
     * @param {String|Object|Function} options.tileSource - The TileSource specifier.
     * A String implies a url used to determine the tileSource implementation
     *      based on the file extension of url. JSONP is implied by *.js,
     *      otherwise the url is retrieved as text and the resulting text is
     *      introspected to determine if its json, xml, or text and parsed.
     * An Object implies an inline configuration which has a single
     *      property sufficient for being able to determine tileSource
     *      implementation. If the object has a property which is a function
     *      named 'getTileUrl', it is treated as a custom TileSource.
     * @param {Number} [options.index] The index of the item. Added on top of
     * all other items if not specified.
     * @param {Boolean} [options.replace=false] If true, the item at options.index will be
     * removed and the new item is added in its place. options.tileSource will be
     * interpreted and fetched if necessary before the old item is removed to avoid leaving
     * a gap in the world.
     * @param {Number} [options.x=0] The X position for the image in viewport coordinates.
     * @param {Number} [options.y=0] The Y position for the image in viewport coordinates.
     * @param {Number} [options.width=1] The width for the image in viewport coordinates.
     * @param {Number} [options.height] The height for the image in viewport coordinates.
     * @param {OpenSeadragon.Rect} [options.fitBounds] The bounds in viewport coordinates
     * to fit the image into. If specified, x, y, width and height get ignored.
     * @param {OpenSeadragon.Placement} [options.fitBoundsPlacement=OpenSeadragon.Placement.CENTER]
     * How to anchor the image in the bounds if options.fitBounds is set.
     * @param {OpenSeadragon.Rect} [options.clip] - An area, in image pixels, to clip to
     * (portions of the image outside of this area will not be visible). Only works on
     * browsers that support the HTML5 canvas.
     * @param {Number} [options.opacity=1] Proportional opacity of the tiled images (1=opaque, 0=hidden)
     * @param {Boolean} [options.preload=false]  Default switch for loading hidden images (true loads, false blocks)
     * @param {Number} [options.degrees=0] Initial rotation of the tiled image around
     * its top left corner in degrees.
     * @param {Boolean} [options.flipped=false] Whether to horizontally flip the image.
     * @param {String} [options.compositeOperation] How the image is composited onto other images.
     * @param {String} [options.crossOriginPolicy] The crossOriginPolicy for this specific image,
     * overriding viewer.crossOriginPolicy.
     * @param {Boolean} [options.ajaxWithCredentials] Whether to set withCredentials on tile AJAX
     * @param {Boolean} [options.loadTilesWithAjax]
     *      Whether to load tile data using AJAX requests.
     *      Defaults to the setting in {@link OpenSeadragon.Options}.
     * @param {Object} [options.ajaxHeaders]
     *      A set of headers to include when making tile AJAX requests.
     *      Note that these headers will be merged over any headers specified in {@link OpenSeadragon.Options}.
     *      Specifying a falsy value for a header will clear its existing value set at the Viewer level (if any).
     * @param {Function} [options.success] A function that gets called when the image is
     * successfully added. It's passed the event object which contains a single property:
     * "item", which is the resulting instance of TiledImage.
     * @param {Function} [options.error] A function that gets called if the image is
     * unable to be added. It's passed the error event object, which contains "message"
     * and "source" properties.
     * @param {Boolean} [options.collectionImmediately=false] If collectionMode is on,
     * specifies whether to snap to the new arrangement immediately or to animate to it.
     * @param {String|CanvasGradient|CanvasPattern|Function} [options.placeholderFillStyle] - See {@link OpenSeadragon.Options}.
     * @fires OpenSeadragon.World.event:add-item
     * @fires OpenSeadragon.Viewer.event:add-item-failed
     */
addTiledImage:function(i){t.console.assert(i,"[Viewer.addTiledImage] options is required");t.console.assert(i.tileSource,"[Viewer.addTiledImage] options.tileSource is required");t.console.assert(!i.replace||i.index>-1&&i.index<(this||e).world.getItemCount(),"[Viewer.addTiledImage] if options.replace is used, options.index must be a valid index in Viewer.world");var n=this||e;i.replace&&(i.replaceItem=n.world.getItemAt(i.index));this._hideMessage();i.placeholderFillStyle===void 0&&(i.placeholderFillStyle=(this||e).placeholderFillStyle);i.opacity===void 0&&(i.opacity=(this||e).opacity);i.preload===void 0&&(i.preload=(this||e).preload);i.compositeOperation===void 0&&(i.compositeOperation=(this||e).compositeOperation);i.crossOriginPolicy===void 0&&(i.crossOriginPolicy=i.tileSource.crossOriginPolicy!==void 0?i.tileSource.crossOriginPolicy:(this||e).crossOriginPolicy);i.ajaxWithCredentials===void 0&&(i.ajaxWithCredentials=(this||e).ajaxWithCredentials);i.loadTilesWithAjax===void 0&&(i.loadTilesWithAjax=(this||e).loadTilesWithAjax);t.isPlainObject(i.ajaxHeaders)||(i.ajaxHeaders={});var r={options:i};function raiseAddItemFailed(e){for(var t=0;t<n._loadQueue.length;t++)if(n._loadQueue[t]===r){n._loadQueue.splice(t,1);break}n._loadQueue.length===0&&refreshWorld(r)
/**
        * Raised when an error occurs while adding a item.
        * @event add-item-failed
        * @memberOf OpenSeadragon.Viewer
        * @type {object}
        * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
        * @property {String} message
        * @property {String} source
        * @property {Object} options The options passed to the addTiledImage method.
        * @property {?Object} userData - Arbitrary subscriber-defined object.
        */;n.raiseEvent("add-item-failed",e);i.error&&i.error(e)}function refreshWorld(e){if(n.collectionMode){n.world.arrange({immediately:e.options.collectionImmediately,rows:n.collectionRows,columns:n.collectionColumns,layout:n.collectionLayout,tileSize:n.collectionTileSize,tileMargin:n.collectionTileMargin});n.world.setAutoRefigureSizes(true)}}if(t.isArray(i.tileSource))setTimeout((function(){raiseAddItemFailed({message:"[Viewer.addTiledImage] Sequences can not be added; add them one at a time instead.",source:i.tileSource,options:i})}));else{(this||e)._loadQueue.push(r);getTileSourceImplementation(this||e,i.tileSource,i,(function(e){r.tileSource=e;processReadyItems()}),(function(e){e.options=i;raiseAddItemFailed(e);processReadyItems()}))}function processReadyItems(){var e,i,r;while(n._loadQueue.length){e=n._loadQueue[0];if(!e.tileSource)break;n._loadQueue.splice(0,1);if(e.options.replace){var o=n.world.getIndexOfItem(e.options.replaceItem);o!==-1&&(e.options.index=o);n.world.removeItem(e.options.replaceItem)}i=new t.TiledImage({viewer:n,source:e.tileSource,viewport:n.viewport,drawer:n.drawer,tileCache:n.tileCache,imageLoader:n.imageLoader,x:e.options.x,y:e.options.y,width:e.options.width,height:e.options.height,fitBounds:e.options.fitBounds,fitBoundsPlacement:e.options.fitBoundsPlacement,clip:e.options.clip,placeholderFillStyle:e.options.placeholderFillStyle,opacity:e.options.opacity,preload:e.options.preload,degrees:e.options.degrees,flipped:e.options.flipped,compositeOperation:e.options.compositeOperation,springStiffness:n.springStiffness,animationTime:n.animationTime,minZoomImageRatio:n.minZoomImageRatio,wrapHorizontal:n.wrapHorizontal,wrapVertical:n.wrapVertical,maxTilesPerFrame:n.maxTilesPerFrame,immediateRender:n.immediateRender,blendTime:n.blendTime,alwaysBlend:n.alwaysBlend,minPixelRatio:n.minPixelRatio,smoothTileEdgesMinZoom:n.smoothTileEdgesMinZoom,iOSDevice:n.iOSDevice,crossOriginPolicy:e.options.crossOriginPolicy,ajaxWithCredentials:e.options.ajaxWithCredentials,loadTilesWithAjax:e.options.loadTilesWithAjax,ajaxHeaders:e.options.ajaxHeaders,debugMode:n.debugMode,subPixelRoundingForTransparency:n.subPixelRoundingForTransparency});n.collectionMode&&n.world.setAutoRefigureSizes(false);if(n.navigator){r=t.extend({},e.options,{replace:false,originalTiledImage:i,tileSource:e.tileSource});n.navigator.addTiledImage(r)}n.world.addItem(i,{index:e.options.index});n._loadQueue.length===0&&refreshWorld(e);n.world.getItemCount()!==1||n.preserveViewport||n.viewport.goHome(true);e.options.success&&e.options.success({item:i})}}},
/**
     * Add a simple image to the viewer.
     * The options are the same as the ones in {@link OpenSeadragon.Viewer#addTiledImage}
     * except for options.tileSource which is replaced by options.url.
     * @function
     * @param {Object} options - See {@link OpenSeadragon.Viewer#addTiledImage}
     * for all the options
     * @param {String} options.url - The URL of the image to add.
     * @fires OpenSeadragon.World.event:add-item
     * @fires OpenSeadragon.Viewer.event:add-item-failed
     */
addSimpleImage:function(e){t.console.assert(e,"[Viewer.addSimpleImage] options is required");t.console.assert(e.url,"[Viewer.addSimpleImage] options.url is required");var i=t.extend({},e,{tileSource:{type:"image",url:e.url}});delete i.url;this.addTiledImage(i)},addLayer:function(i){var n=this||e;t.console.error("[Viewer.addLayer] this function is deprecated; use Viewer.addTiledImage() instead.");var r=t.extend({},i,{success:function(e){n.raiseEvent("add-layer",{options:i,drawer:e.item})},error:function(e){n.raiseEvent("add-layer-failed",e)}});this.addTiledImage(r);return this||e},getLayerAtLevel:function(i){t.console.error("[Viewer.getLayerAtLevel] this function is deprecated; use World.getItemAt() instead.");return(this||e).world.getItemAt(i)},getLevelOfLayer:function(i){t.console.error("[Viewer.getLevelOfLayer] this function is deprecated; use World.getIndexOfItem() instead.");return(this||e).world.getIndexOfItem(i)},getLayersCount:function(){t.console.error("[Viewer.getLayersCount] this function is deprecated; use World.getItemCount() instead.");return(this||e).world.getItemCount()},setLayerLevel:function(i,n){t.console.error("[Viewer.setLayerLevel] this function is deprecated; use World.setItemIndex() instead.");return(this||e).world.setItemIndex(i,n)},removeLayer:function(i){t.console.error("[Viewer.removeLayer] this function is deprecated; use World.removeItem() instead.");return(this||e).world.removeItem(i)},
/**
     * Force the viewer to redraw its contents.
     * @returns {OpenSeadragon.Viewer} Chainable.
     */
forceRedraw:function(){i[(this||e).hash].forceRedraw=true;return this||e},forceResize:function(){i[(this||e).hash].needsResize=true;i[(this||e).hash].forceResize=true},
/**
     * @function
     * @returns {OpenSeadragon.Viewer} Chainable.
     */
bindSequenceControls:function(){var i=t.delegate(this||e,onFocus),n=t.delegate(this||e,onBlur),r=t.delegate(this||e,(this||e).goToNextPage),o=t.delegate(this||e,(this||e).goToPreviousPage),s=(this||e).navImages,a=true;if((this||e).showSequenceControl){((this||e).previousButton||(this||e).nextButton)&&(a=false);(this||e).previousButton=new t.Button({element:(this||e).previousButton?t.getElement((this||e).previousButton):null,clickTimeThreshold:(this||e).clickTimeThreshold,clickDistThreshold:(this||e).clickDistThreshold,tooltip:t.getString("Tooltips.PreviousPage"),srcRest:resolveUrl((this||e).prefixUrl,s.previous.REST),srcGroup:resolveUrl((this||e).prefixUrl,s.previous.GROUP),srcHover:resolveUrl((this||e).prefixUrl,s.previous.HOVER),srcDown:resolveUrl((this||e).prefixUrl,s.previous.DOWN),onRelease:o,onFocus:i,onBlur:n});(this||e).nextButton=new t.Button({element:(this||e).nextButton?t.getElement((this||e).nextButton):null,clickTimeThreshold:(this||e).clickTimeThreshold,clickDistThreshold:(this||e).clickDistThreshold,tooltip:t.getString("Tooltips.NextPage"),srcRest:resolveUrl((this||e).prefixUrl,s.next.REST),srcGroup:resolveUrl((this||e).prefixUrl,s.next.GROUP),srcHover:resolveUrl((this||e).prefixUrl,s.next.HOVER),srcDown:resolveUrl((this||e).prefixUrl,s.next.DOWN),onRelease:r,onFocus:i,onBlur:n});(this||e).navPrevNextWrap||(this||e).previousButton.disable();(this||e).tileSources&&(this||e).tileSources.length||(this||e).nextButton.disable();if(a){(this||e).paging=new t.ButtonGroup({buttons:[(this||e).previousButton,(this||e).nextButton],clickTimeThreshold:(this||e).clickTimeThreshold,clickDistThreshold:(this||e).clickDistThreshold});(this||e).pagingControl=(this||e).paging.element;(this||e).toolbar?(this||e).toolbar.addControl((this||e).pagingControl,{anchor:t.ControlAnchor.BOTTOM_RIGHT}):this.addControl((this||e).pagingControl,{anchor:(this||e).sequenceControlAnchor||t.ControlAnchor.TOP_LEFT})}}return this||e},
/**
     * @function
     * @returns {OpenSeadragon.Viewer} Chainable.
     */
bindStandardControls:function(){var i=t.delegate(this||e,beginZoomingIn),n=t.delegate(this||e,endZooming),r=t.delegate(this||e,doSingleZoomIn),o=t.delegate(this||e,beginZoomingOut),s=t.delegate(this||e,doSingleZoomOut),a=t.delegate(this||e,onHome),l=t.delegate(this||e,onFullScreen),h=t.delegate(this||e,onRotateLeft),u=t.delegate(this||e,onRotateRight),c=t.delegate(this||e,onFlip),d=t.delegate(this||e,onFocus),p=t.delegate(this||e,onBlur),g=(this||e).navImages,v=[],m=true;if((this||e).showNavigationControl){((this||e).zoomInButton||(this||e).zoomOutButton||(this||e).homeButton||(this||e).fullPageButton||(this||e).rotateLeftButton||(this||e).rotateRightButton||(this||e).flipButton)&&(m=false);if((this||e).showZoomControl){v.push((this||e).zoomInButton=new t.Button({element:(this||e).zoomInButton?t.getElement((this||e).zoomInButton):null,clickTimeThreshold:(this||e).clickTimeThreshold,clickDistThreshold:(this||e).clickDistThreshold,tooltip:t.getString("Tooltips.ZoomIn"),srcRest:resolveUrl((this||e).prefixUrl,g.zoomIn.REST),srcGroup:resolveUrl((this||e).prefixUrl,g.zoomIn.GROUP),srcHover:resolveUrl((this||e).prefixUrl,g.zoomIn.HOVER),srcDown:resolveUrl((this||e).prefixUrl,g.zoomIn.DOWN),onPress:i,onRelease:n,onClick:r,onEnter:i,onExit:n,onFocus:d,onBlur:p}));v.push((this||e).zoomOutButton=new t.Button({element:(this||e).zoomOutButton?t.getElement((this||e).zoomOutButton):null,clickTimeThreshold:(this||e).clickTimeThreshold,clickDistThreshold:(this||e).clickDistThreshold,tooltip:t.getString("Tooltips.ZoomOut"),srcRest:resolveUrl((this||e).prefixUrl,g.zoomOut.REST),srcGroup:resolveUrl((this||e).prefixUrl,g.zoomOut.GROUP),srcHover:resolveUrl((this||e).prefixUrl,g.zoomOut.HOVER),srcDown:resolveUrl((this||e).prefixUrl,g.zoomOut.DOWN),onPress:o,onRelease:n,onClick:s,onEnter:o,onExit:n,onFocus:d,onBlur:p}))}(this||e).showHomeControl&&v.push((this||e).homeButton=new t.Button({element:(this||e).homeButton?t.getElement((this||e).homeButton):null,clickTimeThreshold:(this||e).clickTimeThreshold,clickDistThreshold:(this||e).clickDistThreshold,tooltip:t.getString("Tooltips.Home"),srcRest:resolveUrl((this||e).prefixUrl,g.home.REST),srcGroup:resolveUrl((this||e).prefixUrl,g.home.GROUP),srcHover:resolveUrl((this||e).prefixUrl,g.home.HOVER),srcDown:resolveUrl((this||e).prefixUrl,g.home.DOWN),onRelease:a,onFocus:d,onBlur:p}));(this||e).showFullPageControl&&v.push((this||e).fullPageButton=new t.Button({element:(this||e).fullPageButton?t.getElement((this||e).fullPageButton):null,clickTimeThreshold:(this||e).clickTimeThreshold,clickDistThreshold:(this||e).clickDistThreshold,tooltip:t.getString("Tooltips.FullPage"),srcRest:resolveUrl((this||e).prefixUrl,g.fullpage.REST),srcGroup:resolveUrl((this||e).prefixUrl,g.fullpage.GROUP),srcHover:resolveUrl((this||e).prefixUrl,g.fullpage.HOVER),srcDown:resolveUrl((this||e).prefixUrl,g.fullpage.DOWN),onRelease:l,onFocus:d,onBlur:p}));if((this||e).showRotationControl){v.push((this||e).rotateLeftButton=new t.Button({element:(this||e).rotateLeftButton?t.getElement((this||e).rotateLeftButton):null,clickTimeThreshold:(this||e).clickTimeThreshold,clickDistThreshold:(this||e).clickDistThreshold,tooltip:t.getString("Tooltips.RotateLeft"),srcRest:resolveUrl((this||e).prefixUrl,g.rotateleft.REST),srcGroup:resolveUrl((this||e).prefixUrl,g.rotateleft.GROUP),srcHover:resolveUrl((this||e).prefixUrl,g.rotateleft.HOVER),srcDown:resolveUrl((this||e).prefixUrl,g.rotateleft.DOWN),onRelease:h,onFocus:d,onBlur:p}));v.push((this||e).rotateRightButton=new t.Button({element:(this||e).rotateRightButton?t.getElement((this||e).rotateRightButton):null,clickTimeThreshold:(this||e).clickTimeThreshold,clickDistThreshold:(this||e).clickDistThreshold,tooltip:t.getString("Tooltips.RotateRight"),srcRest:resolveUrl((this||e).prefixUrl,g.rotateright.REST),srcGroup:resolveUrl((this||e).prefixUrl,g.rotateright.GROUP),srcHover:resolveUrl((this||e).prefixUrl,g.rotateright.HOVER),srcDown:resolveUrl((this||e).prefixUrl,g.rotateright.DOWN),onRelease:u,onFocus:d,onBlur:p}))}(this||e).showFlipControl&&v.push((this||e).flipButton=new t.Button({element:(this||e).flipButton?t.getElement((this||e).flipButton):null,clickTimeThreshold:(this||e).clickTimeThreshold,clickDistThreshold:(this||e).clickDistThreshold,tooltip:t.getString("Tooltips.Flip"),srcRest:resolveUrl((this||e).prefixUrl,g.flip.REST),srcGroup:resolveUrl((this||e).prefixUrl,g.flip.GROUP),srcHover:resolveUrl((this||e).prefixUrl,g.flip.HOVER),srcDown:resolveUrl((this||e).prefixUrl,g.flip.DOWN),onRelease:c,onFocus:d,onBlur:p}));if(m){(this||e).buttonGroup=new t.ButtonGroup({buttons:v,clickTimeThreshold:(this||e).clickTimeThreshold,clickDistThreshold:(this||e).clickDistThreshold});(this||e).navControl=(this||e).buttonGroup.element;this.addHandler("open",t.delegate(this||e,lightUp));(this||e).toolbar?(this||e).toolbar.addControl((this||e).navControl,{anchor:(this||e).navigationControlAnchor||t.ControlAnchor.TOP_LEFT}):this.addControl((this||e).navControl,{anchor:(this||e).navigationControlAnchor||t.ControlAnchor.TOP_LEFT})}else(this||e).customButtons=v}return this||e},
/**
     * Gets the active page of a sequence
     * @function
     * @returns {Number}
     */
currentPage:function(){return(this||e)._sequenceIndex},
/**
     * @function
     * @returns {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:page
     */
goToPage:function(t){if((this||e).tileSources&&t>=0&&t<(this||e).tileSources.length){(this||e)._sequenceIndex=t;this._updateSequenceButtons(t);this.open((this||e).tileSources[t]);(this||e).referenceStrip&&(this||e).referenceStrip.setFocus(t)
/**
         * Raised when the page is changed on a viewer configured with multiple image sources (see {@link OpenSeadragon.Viewer#goToPage}).
         *
         * @event page
         * @memberof OpenSeadragon.Viewer
         * @type {Object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
         * @property {Number} page - The page index.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */;this.raiseEvent("page",{page:t})}return this||e},
/**
      * Adds an html element as an overlay to the current viewport.  Useful for
      * highlighting words or areas of interest on an image or other zoomable
      * interface. The overlays added via this method are removed when the viewport
      * is closed which include when changing page.
      * @method
      * @param {Element|String|Object} element - A reference to an element or an id for
      *      the element which will be overlaid. Or an Object specifying the configuration for the overlay.
      *      If using an object, see {@link OpenSeadragon.Overlay} for a list of
      *      all available options.
      * @param {OpenSeadragon.Point|OpenSeadragon.Rect} location - The point or
      *      rectangle which will be overlaid. This is a viewport relative location.
      * @param {OpenSeadragon.Placement} [placement=OpenSeadragon.Placement.TOP_LEFT] - The position of the
      *      viewport which the location coordinates will be treated as relative
      *      to.
      * @param {function} [onDraw] - If supplied the callback is called when the overlay
      *      needs to be drawn. It is the responsibility of the callback to do any drawing/positioning.
      *      It is passed position, size and element.
      * @returns {OpenSeadragon.Viewer} Chainable.
      * @fires OpenSeadragon.Viewer.event:add-overlay
      */
addOverlay:function(i,n,r,o){var s;s=t.isPlainObject(i)?i:{element:i,location:n,placement:r,onDraw:o};i=t.getElement(s.element);if(getOverlayIndex((this||e).currentOverlays,i)>=0)return this||e;var a=getOverlayObject(this||e,s);(this||e).currentOverlays.push(a);a.drawHTML((this||e).overlaysContainer,(this||e).viewport);
/**
       * Raised when an overlay is added to the viewer (see {@link OpenSeadragon.Viewer#addOverlay}).
       *
       * @event add-overlay
       * @memberof OpenSeadragon.Viewer
       * @type {object}
       * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
       * @property {Element} element - The overlay element.
       * @property {OpenSeadragon.Point|OpenSeadragon.Rect} location
       * @property {OpenSeadragon.Placement} placement
       * @property {?Object} userData - Arbitrary subscriber-defined object.
       */this.raiseEvent("add-overlay",{element:i,location:s.location,placement:s.placement});return this||e},
/**
     * Updates the overlay represented by the reference to the element or
     * element id moving it to the new location, relative to the new placement.
     * @method
     * @param {Element|String} element - A reference to an element or an id for
     *      the element which is overlaid.
     * @param {OpenSeadragon.Point|OpenSeadragon.Rect} location - The point or
     *      rectangle which will be overlaid. This is a viewport relative location.
     * @param {OpenSeadragon.Placement} [placement=OpenSeadragon.Placement.TOP_LEFT] - The position of the
     *      viewport which the location coordinates will be treated as relative
     *      to.
     * @returns {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:update-overlay
     */
updateOverlay:function(n,r,o){var s;n=t.getElement(n);s=getOverlayIndex((this||e).currentOverlays,n);if(s>=0){(this||e).currentOverlays[s].update(r,o);i[(this||e).hash].forceRedraw=true;
/**
         * Raised when an overlay's location or placement changes
         * (see {@link OpenSeadragon.Viewer#updateOverlay}).
         *
         * @event update-overlay
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the
         * Viewer which raised the event.
         * @property {Element} element
         * @property {OpenSeadragon.Point|OpenSeadragon.Rect} location
         * @property {OpenSeadragon.Placement} placement
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */this.raiseEvent("update-overlay",{element:n,location:r,placement:o})}return this||e},
/**
     * Removes an overlay identified by the reference element or element id
     * and schedules an update.
     * @method
     * @param {Element|String} element - A reference to the element or an
     *      element id which represent the ovelay content to be removed.
     * @returns {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:remove-overlay
     */
removeOverlay:function(n){var r;n=t.getElement(n);r=getOverlayIndex((this||e).currentOverlays,n);if(r>=0){(this||e).currentOverlays[r].destroy();(this||e).currentOverlays.splice(r,1);i[(this||e).hash].forceRedraw=true;
/**
         * Raised when an overlay is removed from the viewer
         * (see {@link OpenSeadragon.Viewer#removeOverlay}).
         *
         * @event remove-overlay
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the
         * Viewer which raised the event.
         * @property {Element} element - The overlay element.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */this.raiseEvent("remove-overlay",{element:n})}return this||e},
/**
     * Removes all currently configured Overlays from this Viewer and schedules
     * an update.
     * @method
     * @returns {OpenSeadragon.Viewer} Chainable.
     * @fires OpenSeadragon.Viewer.event:clear-overlay
     */
clearOverlays:function(){while((this||e).currentOverlays.length>0)(this||e).currentOverlays.pop().destroy();i[(this||e).hash].forceRedraw=true;
/**
       * Raised when all overlays are removed from the viewer (see {@link OpenSeadragon.Drawer#clearOverlays}).
       *
       * @event clear-overlay
       * @memberof OpenSeadragon.Viewer
       * @type {object}
       * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
       * @property {?Object} userData - Arbitrary subscriber-defined object.
       */this.raiseEvent("clear-overlay",{});return this||e},
/**
    * Finds an overlay identified by the reference element or element id
    * and returns it as an object, return null if not found.
    * @method
    * @param {Element|String} element - A reference to the element or an
    *      element id which represents the overlay content.
    * @returns {OpenSeadragon.Overlay} the matching overlay or null if none found.
    */
getOverlayById:function(i){var n;i=t.getElement(i);n=getOverlayIndex((this||e).currentOverlays,i);return n>=0?(this||e).currentOverlays[n]:null},
/**
     * Updates the sequence buttons.
     * @function OpenSeadragon.Viewer.prototype._updateSequenceButtons
     * @private
     * @param {Number} Sequence Value
     */
_updateSequenceButtons:function(t){(this||e).nextButton&&((this||e).tileSources&&(this||e).tileSources.length-1!==t?(this||e).nextButton.enable():(this||e).navPrevNextWrap||(this||e).nextButton.disable());(this||e).previousButton&&(t>0?(this||e).previousButton.enable():(this||e).navPrevNextWrap||(this||e).previousButton.disable())},
/**
     * Display a message in the viewport
     * @function OpenSeadragon.Viewer.prototype._showMessage
     * @private
     * @param {String} text message
     */
_showMessage:function(i){this._hideMessage();var n=t.makeNeutralElement("div");n.appendChild(document.createTextNode(i));(this||e).messageDiv=t.makeCenteredNode(n);t.addClass((this||e).messageDiv,"openseadragon-message");(this||e).container.appendChild((this||e).messageDiv)},_hideMessage:function(){var t=(this||e).messageDiv;if(t){t.parentNode.removeChild(t);delete(this||e).messageDiv}},
/**
     * Gets this viewer's gesture settings for the given pointer device type.
     * @method
     * @param {String} type - The pointer device type to get the gesture settings for ("mouse", "touch", "pen", etc.).
     * @returns {OpenSeadragon.GestureSettings}
     */
gestureSettingsByDeviceType:function(t){switch(t){case"mouse":return(this||e).gestureSettingsMouse;case"touch":return(this||e).gestureSettingsTouch;case"pen":return(this||e).gestureSettingsPen;default:return(this||e).gestureSettingsUnknown}},_drawOverlays:function(){var t,i=(this||e).currentOverlays.length;for(t=0;t<i;t++)(this||e).currentOverlays[t].drawHTML((this||e).overlaysContainer,(this||e).viewport)},_cancelPendingImages:function(){(this||e)._loadQueue=[]},removeReferenceStrip:function(){(this||e).showReferenceStrip=false;if((this||e).referenceStrip){(this||e).referenceStrip.destroy();(this||e).referenceStrip=null}},addReferenceStrip:function(){(this||e).showReferenceStrip=true;if((this||e).sequenceMode){if((this||e).referenceStrip)return;if((this||e).tileSources.length&&(this||e).tileSources.length>1){(this||e).referenceStrip=new t.ReferenceStrip({id:(this||e).referenceStripElement,position:(this||e).referenceStripPosition,sizeRatio:(this||e).referenceStripSizeRatio,scroll:(this||e).referenceStripScroll,height:(this||e).referenceStripHeight,width:(this||e).referenceStripWidth,tileSources:(this||e).tileSources,prefixUrl:(this||e).prefixUrl,viewer:this||e});(this||e).referenceStrip.setFocus((this||e)._sequenceIndex)}}else t.console.warn('Attempting to display a reference strip while "sequenceMode" is off.')},_addUpdatePixelDensityRatioEvent:function(){(this||e)._updatePixelDensityRatioBind=(this||e)._updatePixelDensityRatio.bind(this||e);t.addEvent(window,"resize",(this||e)._updatePixelDensityRatioBind)},_removeUpdatePixelDensityRatioEvent:function(){t.removeEvent(window,"resize",(this||e)._updatePixelDensityRatioBind)},_updatePixelDensityRatio:function(){var e=t.pixelDensityRatio;var i=t.getCurrentPixelDensityRatio();if(e!==i){t.pixelDensityRatio=i;this.forceResize()}},goToPreviousPage:function(){var t=(this||e)._sequenceIndex-1;(this||e).navPrevNextWrap&&t<0&&(t+=(this||e).tileSources.length);this.goToPage(t)},goToNextPage:function(){var t=(this||e)._sequenceIndex+1;(this||e).navPrevNextWrap&&t>=(this||e).tileSources.length&&(t=0);this.goToPage(t)},isAnimating:function(){return i[(this||e).hash].animating}});
/**
   * _getSafeElemSize is like getElementSize(), but refuses to return 0 for x or y,
   * which was causing some calling operations to return NaN.
   * @returns {Point}
   * @private
   */function _getSafeElemSize(e){e=t.getElement(e);return new t.Point(e.clientWidth===0?1:e.clientWidth,e.clientHeight===0?1:e.clientHeight)}function getTileSourceImplementation(e,i,n,r,o){var s=e;if(t.type(i)==="string")if(i.match(/^\s*<.*>\s*$/))i=t.parseXml(i);else if(i.match(/^\s*[{[].*[}\]]\s*$/))try{var a=t.parseJSON(i);i=a}catch(e){}function waitUntilReady(e,t){if(e.ready)r(e);else{e.addHandler("ready",(function(){r(e)}));e.addHandler("open-failed",(function(e){o({message:e.message,source:t})}))}}setTimeout((function(){if(t.type(i)==="string"){i=new t.TileSource({url:i,crossOriginPolicy:n.crossOriginPolicy!==void 0?n.crossOriginPolicy:e.crossOriginPolicy,ajaxWithCredentials:e.ajaxWithCredentials,ajaxHeaders:n.ajaxHeaders?n.ajaxHeaders:e.ajaxHeaders,splitHashDataForPost:e.splitHashDataForPost,success:function(e){r(e.tileSource)}});i.addHandler("open-failed",(function(e){o(e)}))}else if(t.isPlainObject(i)||i.nodeType){i.crossOriginPolicy!==void 0||n.crossOriginPolicy===void 0&&e.crossOriginPolicy===void 0||(i.crossOriginPolicy=n.crossOriginPolicy!==void 0?n.crossOriginPolicy:e.crossOriginPolicy);i.ajaxWithCredentials===void 0&&(i.ajaxWithCredentials=e.ajaxWithCredentials);if(t.isFunction(i.getTileUrl)){var a=new t.TileSource(i);a.getTileUrl=i.getTileUrl;r(a)}else{var l=t.TileSource.determineType(s,i);if(!l){o({message:"Unable to load TileSource",source:i});return}var h=l.prototype.configure.apply(s,[i]);waitUntilReady(new l(h),i)}}else waitUntilReady(i,i)}))}function getOverlayObject(e,i){if(i instanceof t.Overlay)return i;var n=null;if(i.element)n=t.getElement(i.element);else{var r=i.id?i.id:"openseadragon-overlay-"+Math.floor(Math.random()*1e7);n=t.getElement(i.id);if(!n){n=document.createElement("a");n.href="#/overlay/"+r}n.id=r;t.addClass(n,i.className?i.className:"openseadragon-overlay")}var o=i.location;var s=i.width;var a=i.height;if(!o){var l=i.x;var h=i.y;if(i.px!==void 0){var u=e.viewport.imageToViewportRectangle(new t.Rect(i.px,i.py,s||0,a||0));l=u.x;h=u.y;s=s!==void 0?u.width:void 0;a=a!==void 0?u.height:void 0}o=new t.Point(l,h)}var c=i.placement;c&&t.type(c)==="string"&&(c=t.Placement[i.placement.toUpperCase()]);return new t.Overlay({element:n,location:o,placement:c,onDraw:i.onDraw,checkResize:i.checkResize,width:s,height:a,rotationMode:i.rotationMode})}function getOverlayIndex(e,t){var i;for(i=e.length-1;i>=0;i--)if(e[i].element===t)return i;return-1}function scheduleUpdate(e,i){return t.requestAnimationFrame((function(){i(e)}))}function scheduleControlsFade(e){t.requestAnimationFrame((function(){updateControlsFade(e)}))}function beginControlsAutoHide(e){if(e.autoHideControls){e.controlsShouldFade=true;e.controlsFadeBeginTime=t.now()+e.controlsFadeDelay;window.setTimeout((function(){scheduleControlsFade(e)}),e.controlsFadeDelay)}}function updateControlsFade(e){var i,n,r,o;if(e.controlsShouldFade){i=t.now();n=i-e.controlsFadeBeginTime;r=1-n/e.controlsFadeLength;r=Math.min(1,r);r=Math.max(0,r);for(o=e.controls.length-1;o>=0;o--)e.controls[o].autoFade&&e.controls[o].setOpacity(r);r>0&&scheduleControlsFade(e)}}function abortControlsAutoHide(e){var t;e.controlsShouldFade=false;for(t=e.controls.length-1;t>=0;t--)e.controls[t].setOpacity(1)}function onFocus(){abortControlsAutoHide(this||e)}function onBlur(){beginControlsAutoHide(this||e)}function onCanvasContextMenu(e){var t={tracker:e.eventSource,position:e.position,originalEvent:e.originalEvent,preventDefault:e.preventDefault};
/**
     * Raised when a contextmenu event occurs in the {@link OpenSeadragon.Viewer#canvas} element.
     *
     * @event canvas-contextmenu
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {Object} originalEvent - The original DOM event.
     * @property {Boolean} preventDefault - Set to true to prevent the default user-agent's handling of the contextmenu event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */this.raiseEvent("canvas-contextmenu",t);e.preventDefault=t.preventDefault}function onCanvasKeyDown(i){var n={originalEvent:i.originalEvent,preventDefaultAction:false,preventVerticalPan:i.preventVerticalPan||!(this||e).panVertical,preventHorizontalPan:i.preventHorizontalPan||!(this||e).panHorizontal};
/**
     * Raised when a keyboard key is pressed and the focus is on the {@link OpenSeadragon.Viewer#canvas} element.
     *
     * @event canvas-key
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {Object} originalEvent - The original DOM event.
     * @property {Boolean} preventDefaultAction - Set to true to prevent default keyboard behaviour. Default: false.
     * @property {Boolean} preventVerticalPan - Set to true to prevent keyboard vertical panning. Default: false.
     * @property {Boolean} preventHorizontalPan - Set to true to prevent keyboard horizontal panning. Default: false.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */this.raiseEvent("canvas-key",n);if(n.preventDefaultAction||i.ctrl||i.alt||i.meta)i.preventDefault=false;else switch(i.keyCode){case 38:if(!n.preventVerticalPan){i.shift?(this||e).viewport.zoomBy(1.1):(this||e).viewport.panBy((this||e).viewport.deltaPointsFromPixels(new t.Point(0,-(this||e).pixelsPerArrowPress)));(this||e).viewport.applyConstraints()}i.preventDefault=true;break;case 40:if(!n.preventVerticalPan){i.shift?(this||e).viewport.zoomBy(.9):(this||e).viewport.panBy((this||e).viewport.deltaPointsFromPixels(new t.Point(0,(this||e).pixelsPerArrowPress)));(this||e).viewport.applyConstraints()}i.preventDefault=true;break;case 37:if(!n.preventHorizontalPan){(this||e).viewport.panBy((this||e).viewport.deltaPointsFromPixels(new t.Point(-(this||e).pixelsPerArrowPress,0)));(this||e).viewport.applyConstraints()}i.preventDefault=true;break;case 39:if(!n.preventHorizontalPan){(this||e).viewport.panBy((this||e).viewport.deltaPointsFromPixels(new t.Point((this||e).pixelsPerArrowPress,0)));(this||e).viewport.applyConstraints()}i.preventDefault=true;break;case 187:(this||e).viewport.zoomBy(1.1);(this||e).viewport.applyConstraints();i.preventDefault=true;break;case 189:(this||e).viewport.zoomBy(.9);(this||e).viewport.applyConstraints();i.preventDefault=true;break;case 48:(this||e).viewport.goHome();(this||e).viewport.applyConstraints();i.preventDefault=true;break;case 87:if(!n.preventVerticalPan){i.shift?(this||e).viewport.zoomBy(1.1):(this||e).viewport.panBy((this||e).viewport.deltaPointsFromPixels(new t.Point(0,-40)));(this||e).viewport.applyConstraints()}i.preventDefault=true;break;case 83:if(!n.preventVerticalPan){i.shift?(this||e).viewport.zoomBy(.9):(this||e).viewport.panBy((this||e).viewport.deltaPointsFromPixels(new t.Point(0,40)));(this||e).viewport.applyConstraints()}i.preventDefault=true;break;case 65:if(!n.preventHorizontalPan){(this||e).viewport.panBy((this||e).viewport.deltaPointsFromPixels(new t.Point(-40,0)));(this||e).viewport.applyConstraints()}i.preventDefault=true;break;case 68:if(!n.preventHorizontalPan){(this||e).viewport.panBy((this||e).viewport.deltaPointsFromPixels(new t.Point(40,0)));(this||e).viewport.applyConstraints()}i.preventDefault=true;break;case 82:i.shift?(this||e).viewport.flipped?(this||e).viewport.setRotation((this||e).viewport.getRotation()+(this||e).rotationIncrement):(this||e).viewport.setRotation((this||e).viewport.getRotation()-(this||e).rotationIncrement):(this||e).viewport.flipped?(this||e).viewport.setRotation((this||e).viewport.getRotation()-(this||e).rotationIncrement):(this||e).viewport.setRotation((this||e).viewport.getRotation()+(this||e).rotationIncrement);(this||e).viewport.applyConstraints();i.preventDefault=true;break;case 70:(this||e).viewport.toggleFlip();i.preventDefault=true;break;case 74:this.goToPreviousPage();break;case 75:this.goToNextPage();break;default:i.preventDefault=false;break}}function onCanvasKeyPress(e){var t={originalEvent:e.originalEvent};
/**
     * Raised when a keyboard key is pressed and the focus is on the {@link OpenSeadragon.Viewer#canvas} element.
     *
     * @event canvas-key-press
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {Object} originalEvent - The original DOM event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */this.raiseEvent("canvas-key-press",t)}function onCanvasClick(n){var r;var o=document.activeElement===(this||e).canvas;o||(this||e).canvas.focus();(this||e).viewport.flipped&&(n.position.x=(this||e).viewport.getContainerSize().x-n.position.x);var s={tracker:n.eventSource,position:n.position,quick:n.quick,shift:n.shift,originalEvent:n.originalEvent,originalTarget:n.originalTarget,preventDefaultAction:false};
/**
     * Raised when a mouse press/release or touch/remove occurs on the {@link OpenSeadragon.Viewer#canvas} element.
     *
     * @event canvas-click
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {Boolean} quick - True only if the clickDistThreshold and clickTimeThreshold are both passed. Useful for differentiating between clicks and drags.
     * @property {Boolean} shift - True if the shift key was pressed during this event.
     * @property {Object} originalEvent - The original DOM event.
     * @property {Element} originalTarget - The DOM element clicked on.
     * @property {Boolean} preventDefaultAction - Set to true to prevent default click to zoom behaviour. Default: false.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */this.raiseEvent("canvas-click",s);if(!s.preventDefaultAction&&(this||e).viewport&&n.quick){r=this.gestureSettingsByDeviceType(n.pointerType);if(r.clickToZoom===true){(this||e).viewport.zoomBy(n.shift?1/(this||e).zoomPerClick:(this||e).zoomPerClick,r.zoomToRefPoint?(this||e).viewport.pointFromPixel(n.position,true):null);(this||e).viewport.applyConstraints()}if(r.dblClickDragToZoom)if(i[(this||e).hash].draggingToZoom===true){i[(this||e).hash].lastClickTime=null;i[(this||e).hash].draggingToZoom=false}else i[(this||e).hash].lastClickTime=t.now()}}function onCanvasDblClick(t){var i;var n={tracker:t.eventSource,position:t.position,shift:t.shift,originalEvent:t.originalEvent,preventDefaultAction:false};
/**
     * Raised when a double mouse press/release or touch/remove occurs on the {@link OpenSeadragon.Viewer#canvas} element.
     *
     * @event canvas-double-click
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {Boolean} shift - True if the shift key was pressed during this event.
     * @property {Object} originalEvent - The original DOM event.
     * @property {Boolean} preventDefaultAction - Set to true to prevent default double tap to zoom behaviour. Default: false.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */this.raiseEvent("canvas-double-click",n);if(!n.preventDefaultAction&&(this||e).viewport){i=this.gestureSettingsByDeviceType(t.pointerType);if(i.dblClickToZoom){(this||e).viewport.zoomBy(t.shift?1/(this||e).zoomPerClick:(this||e).zoomPerClick,i.zoomToRefPoint?(this||e).viewport.pointFromPixel(t.position,true):null);(this||e).viewport.applyConstraints()}}}function onCanvasDrag(t){var n;var r={tracker:t.eventSource,pointerType:t.pointerType,position:t.position,delta:t.delta,speed:t.speed,direction:t.direction,shift:t.shift,originalEvent:t.originalEvent,preventDefaultAction:false};
/**
     * Raised when a mouse or touch drag operation occurs on the {@link OpenSeadragon.Viewer#canvas} element.
     *
     * @event canvas-drag
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {String} pointerType - "mouse", "touch", "pen", etc.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {OpenSeadragon.Point} delta - The x,y components of the difference between start drag and end drag.
     * @property {Number} speed - Current computed speed, in pixels per second.
     * @property {Number} direction - Current computed direction, expressed as an angle counterclockwise relative to the positive X axis (-pi to pi, in radians). Only valid if speed > 0.
     * @property {Boolean} shift - True if the shift key was pressed during this event.
     * @property {Object} originalEvent - The original DOM event.
     * @property {Boolean} preventDefaultAction - Set to true to prevent default drag to pan behaviour. Default: false.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */this.raiseEvent("canvas-drag",r);n=this.gestureSettingsByDeviceType(t.pointerType);if(!r.preventDefaultAction&&(this||e).viewport)if(n.dblClickDragToZoom&&i[(this||e).hash].draggingToZoom){var o=Math.pow((this||e).zoomPerDblClickDrag,t.delta.y/50);(this||e).viewport.zoomBy(o)}else if(n.dragToPan&&!i[(this||e).hash].draggingToZoom){(this||e).panHorizontal||(t.delta.x=0);(this||e).panVertical||(t.delta.y=0);(this||e).viewport.flipped&&(t.delta.x=-t.delta.x);if((this||e).constrainDuringPan){var s=(this||e).viewport.deltaPointsFromPixels(t.delta.negate());(this||e).viewport.centerSpringX.target.value+=s.x;(this||e).viewport.centerSpringY.target.value+=s.y;var a=(this||e).viewport.getConstrainedBounds();(this||e).viewport.centerSpringX.target.value-=s.x;(this||e).viewport.centerSpringY.target.value-=s.y;a.xConstrained&&(t.delta.x=0);a.yConstrained&&(t.delta.y=0)}(this||e).viewport.panBy((this||e).viewport.deltaPointsFromPixels(t.delta.negate()),n.flickEnabled&&!(this||e).constrainDuringPan)}}function onCanvasDragEnd(n){var r;var o={tracker:n.eventSource,pointerType:n.pointerType,position:n.position,speed:n.speed,direction:n.direction,shift:n.shift,originalEvent:n.originalEvent,preventDefaultAction:false};
/**
     * Raised when a mouse or touch drag operation ends on the {@link OpenSeadragon.Viewer#canvas} element.
     *
     * @event canvas-drag-end
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {String} pointerType - "mouse", "touch", "pen", etc.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {Number} speed - Speed at the end of a drag gesture, in pixels per second.
     * @property {Number} direction - Direction at the end of a drag gesture, expressed as an angle counterclockwise relative to the positive X axis (-pi to pi, in radians). Only valid if speed > 0.
     * @property {Boolean} shift - True if the shift key was pressed during this event.
     * @property {Object} originalEvent - The original DOM event.
     * @property {Boolean} preventDefaultAction - Set to true to prevent default drag-end flick behaviour. Default: false.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */this.raiseEvent("canvas-drag-end",o);r=this.gestureSettingsByDeviceType(n.pointerType);if(!o.preventDefaultAction&&(this||e).viewport){if(!i[(this||e).hash].draggingToZoom&&r.dragToPan&&r.flickEnabled&&n.speed>=r.flickMinSpeed){var s=0;(this||e).panHorizontal&&(s=r.flickMomentum*n.speed*Math.cos(n.direction));var a=0;(this||e).panVertical&&(a=r.flickMomentum*n.speed*Math.sin(n.direction));var l=(this||e).viewport.pixelFromPoint((this||e).viewport.getCenter(true));var h=(this||e).viewport.pointFromPixel(new t.Point(l.x-s,l.y-a));(this||e).viewport.panTo(h,false)}(this||e).viewport.applyConstraints()}r.dblClickDragToZoom&&i[(this||e).hash].draggingToZoom===true&&(i[(this||e).hash].draggingToZoom=false)}function onCanvasEnter(e){
/**
     * Raised when a pointer enters the {@link OpenSeadragon.Viewer#canvas} element.
     *
     * @event canvas-enter
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {String} pointerType - "mouse", "touch", "pen", etc.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {Number} buttons - Current buttons pressed. A combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
     * @property {Number} pointers - Number of pointers (all types) active in the tracked element.
     * @property {Boolean} insideElementPressed - True if the left mouse button is currently being pressed and was initiated inside the tracked element, otherwise false.
     * @property {Boolean} buttonDownAny - Was the button down anywhere in the screen during the event. <span style="color:red;">Deprecated. Use buttons instead.</span>
     * @property {Object} originalEvent - The original DOM event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */
this.raiseEvent("canvas-enter",{tracker:e.eventSource,pointerType:e.pointerType,position:e.position,buttons:e.buttons,pointers:e.pointers,insideElementPressed:e.insideElementPressed,buttonDownAny:e.buttonDownAny,originalEvent:e.originalEvent})}function onCanvasLeave(e){
/**
     * Raised when a pointer leaves the {@link OpenSeadragon.Viewer#canvas} element.
     *
     * @event canvas-exit
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {String} pointerType - "mouse", "touch", "pen", etc.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {Number} buttons - Current buttons pressed. A combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
     * @property {Number} pointers - Number of pointers (all types) active in the tracked element.
     * @property {Boolean} insideElementPressed - True if the left mouse button is currently being pressed and was initiated inside the tracked element, otherwise false.
     * @property {Boolean} buttonDownAny - Was the button down anywhere in the screen during the event. <span style="color:red;">Deprecated. Use buttons instead.</span>
     * @property {Object} originalEvent - The original DOM event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */
this.raiseEvent("canvas-exit",{tracker:e.eventSource,pointerType:e.pointerType,position:e.position,buttons:e.buttons,pointers:e.pointers,insideElementPressed:e.insideElementPressed,buttonDownAny:e.buttonDownAny,originalEvent:e.originalEvent})}function onCanvasPress(n){var r;
/**
     * Raised when the primary mouse button is pressed or touch starts on the {@link OpenSeadragon.Viewer#canvas} element.
     *
     * @event canvas-press
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {String} pointerType - "mouse", "touch", "pen", etc.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {Boolean} insideElementPressed - True if the left mouse button is currently being pressed and was initiated inside the tracked element, otherwise false.
     * @property {Boolean} insideElementReleased - True if the cursor still inside the tracked element when the button was released.
     * @property {Object} originalEvent - The original DOM event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */this.raiseEvent("canvas-press",{tracker:n.eventSource,pointerType:n.pointerType,position:n.position,insideElementPressed:n.insideElementPressed,insideElementReleased:n.insideElementReleased,originalEvent:n.originalEvent});r=this.gestureSettingsByDeviceType(n.pointerType);if(r.dblClickDragToZoom){var o=i[(this||e).hash].lastClickTime;var s=t.now();if(o===null)return;s-o<(this||e).dblClickTimeThreshold&&(i[(this||e).hash].draggingToZoom=true);i[(this||e).hash].lastClickTime=null}}function onCanvasRelease(e){
/**
     * Raised when the primary mouse button is released or touch ends on the {@link OpenSeadragon.Viewer#canvas} element.
     *
     * @event canvas-release
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {String} pointerType - "mouse", "touch", "pen", etc.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {Boolean} insideElementPressed - True if the left mouse button is currently being pressed and was initiated inside the tracked element, otherwise false.
     * @property {Boolean} insideElementReleased - True if the cursor still inside the tracked element when the button was released.
     * @property {Object} originalEvent - The original DOM event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */
this.raiseEvent("canvas-release",{tracker:e.eventSource,pointerType:e.pointerType,position:e.position,insideElementPressed:e.insideElementPressed,insideElementReleased:e.insideElementReleased,originalEvent:e.originalEvent})}function onCanvasNonPrimaryPress(e){
/**
     * Raised when any non-primary pointer button is pressed on the {@link OpenSeadragon.Viewer#canvas} element.
     *
     * @event canvas-nonprimary-press
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {String} pointerType - "mouse", "touch", "pen", etc.
     * @property {Number} button - Button which caused the event.
     *      -1: none, 0: primary/left, 1: aux/middle, 2: secondary/right, 3: X1/back, 4: X2/forward, 5: pen eraser.
     * @property {Number} buttons - Current buttons pressed.
     *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
     * @property {Object} originalEvent - The original DOM event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */
this.raiseEvent("canvas-nonprimary-press",{tracker:e.eventSource,position:e.position,pointerType:e.pointerType,button:e.button,buttons:e.buttons,originalEvent:e.originalEvent})}function onCanvasNonPrimaryRelease(e){
/**
     * Raised when any non-primary pointer button is released on the {@link OpenSeadragon.Viewer#canvas} element.
     *
     * @event canvas-nonprimary-release
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {String} pointerType - "mouse", "touch", "pen", etc.
     * @property {Number} button - Button which caused the event.
     *      -1: none, 0: primary/left, 1: aux/middle, 2: secondary/right, 3: X1/back, 4: X2/forward, 5: pen eraser.
     * @property {Number} buttons - Current buttons pressed.
     *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
     * @property {Object} originalEvent - The original DOM event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */
this.raiseEvent("canvas-nonprimary-release",{tracker:e.eventSource,position:e.position,pointerType:e.pointerType,button:e.button,buttons:e.buttons,originalEvent:e.originalEvent})}function onCanvasPinch(t){var i,n,r,o;var s={tracker:t.eventSource,pointerType:t.pointerType,gesturePoints:t.gesturePoints,lastCenter:t.lastCenter,center:t.center,lastDistance:t.lastDistance,distance:t.distance,shift:t.shift,originalEvent:t.originalEvent,preventDefaultPanAction:false,preventDefaultZoomAction:false,preventDefaultRotateAction:false};
/**
     * Raised when a pinch event occurs on the {@link OpenSeadragon.Viewer#canvas} element.
     *
     * @event canvas-pinch
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {String} pointerType - "mouse", "touch", "pen", etc.
     * @property {Array.<OpenSeadragon.MouseTracker.GesturePoint>} gesturePoints - Gesture points associated with the gesture. Velocity data can be found here.
     * @property {OpenSeadragon.Point} lastCenter - The previous center point of the two pinch contact points relative to the tracked element.
     * @property {OpenSeadragon.Point} center - The center point of the two pinch contact points relative to the tracked element.
     * @property {Number} lastDistance - The previous distance between the two pinch contact points in CSS pixels.
     * @property {Number} distance - The distance between the two pinch contact points in CSS pixels.
     * @property {Boolean} shift - True if the shift key was pressed during this event.
     * @property {Object} originalEvent - The original DOM event.
     * @property {Boolean} preventDefaultPanAction - Set to true to prevent default pinch to pan behaviour. Default: false.
     * @property {Boolean} preventDefaultZoomAction - Set to true to prevent default pinch to zoom behaviour. Default: false.
     * @property {Boolean} preventDefaultRotateAction - Set to true to prevent default pinch to rotate behaviour. Default: false.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */this.raiseEvent("canvas-pinch",s);if((this||e).viewport){i=this.gestureSettingsByDeviceType(t.pointerType);if(i.pinchToZoom&&(!s.preventDefaultPanAction||!s.preventDefaultZoomAction)){n=(this||e).viewport.pointFromPixel(t.center,true);if(i.zoomToRefPoint&&!s.preventDefaultPanAction){r=(this||e).viewport.pointFromPixel(t.lastCenter,true);o=r.minus(n);(this||e).panHorizontal||(o.x=0);(this||e).panVertical||(o.y=0);(this||e).viewport.panBy(o,true)}s.preventDefaultZoomAction||(this||e).viewport.zoomBy(t.distance/t.lastDistance,n,true);(this||e).viewport.applyConstraints()}if(i.pinchRotate&&!s.preventDefaultRotateAction){var a=Math.atan2(t.gesturePoints[0].currentPos.y-t.gesturePoints[1].currentPos.y,t.gesturePoints[0].currentPos.x-t.gesturePoints[1].currentPos.x);var l=Math.atan2(t.gesturePoints[0].lastPos.y-t.gesturePoints[1].lastPos.y,t.gesturePoints[0].lastPos.x-t.gesturePoints[1].lastPos.x);n=(this||e).viewport.pointFromPixel(t.center,true);(this||e).viewport.rotateTo((this||e).viewport.getRotation(true)+(a-l)*(180/Math.PI),n,true)}}}function onCanvasFocus(e){
/**
     * Raised when the {@link OpenSeadragon.Viewer#canvas} element gets keyboard focus.
     *
     * @event canvas-focus
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {Object} originalEvent - The original DOM event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */
this.raiseEvent("canvas-focus",{tracker:e.eventSource,originalEvent:e.originalEvent})}function onCanvasBlur(e){
/**
     * Raised when the {@link OpenSeadragon.Viewer#canvas} element loses keyboard focus.
     *
     * @event canvas-blur
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {Object} originalEvent - The original DOM event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */
this.raiseEvent("canvas-blur",{tracker:e.eventSource,originalEvent:e.originalEvent})}function onCanvasScroll(i){var n,r,o,s,a;s=t.now();a=s-(this||e)._lastScrollTime;if(a>(this||e).minScrollDeltaTime){(this||e)._lastScrollTime=s;n={tracker:i.eventSource,position:i.position,scroll:i.scroll,shift:i.shift,originalEvent:i.originalEvent,preventDefaultAction:false,preventDefault:true};
/**
       * Raised when a scroll event occurs on the {@link OpenSeadragon.Viewer#canvas} element (mouse wheel).
       *
       * @event canvas-scroll
       * @memberof OpenSeadragon.Viewer
       * @type {object}
       * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
       * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
       * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
       * @property {Number} scroll - The scroll delta for the event.
       * @property {Boolean} shift - True if the shift key was pressed during this event.
       * @property {Object} originalEvent - The original DOM event.
       * @property {Boolean} preventDefaultAction - Set to true to prevent default scroll to zoom behaviour. Default: false.
       * @property {Boolean} preventDefault - Set to true to prevent the default user-agent's handling of the wheel event. Default: true.
       * @property {?Object} userData - Arbitrary subscriber-defined object.
       */this.raiseEvent("canvas-scroll",n);if(!n.preventDefaultAction&&(this||e).viewport){(this||e).viewport.flipped&&(i.position.x=(this||e).viewport.getContainerSize().x-i.position.x);r=this.gestureSettingsByDeviceType(i.pointerType);if(r.scrollToZoom){o=Math.pow((this||e).zoomPerScroll,i.scroll);(this||e).viewport.zoomBy(o,r.zoomToRefPoint?(this||e).viewport.pointFromPixel(i.position,true):null);(this||e).viewport.applyConstraints()}}i.preventDefault=n.preventDefault}else i.preventDefault=true}function onContainerEnter(t){i[(this||e).hash].mouseInside=true;abortControlsAutoHide(this||e);
/**
     * Raised when the cursor enters the {@link OpenSeadragon.Viewer#container} element.
     *
     * @event container-enter
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {String} pointerType - "mouse", "touch", "pen", etc.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {Number} buttons - Current buttons pressed. A combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
     * @property {Number} pointers - Number of pointers (all types) active in the tracked element.
     * @property {Boolean} insideElementPressed - True if the left mouse button is currently being pressed and was initiated inside the tracked element, otherwise false.
     * @property {Boolean} buttonDownAny - Was the button down anywhere in the screen during the event. <span style="color:red;">Deprecated. Use buttons instead.</span>
     * @property {Object} originalEvent - The original DOM event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */this.raiseEvent("container-enter",{tracker:t.eventSource,pointerType:t.pointerType,position:t.position,buttons:t.buttons,pointers:t.pointers,insideElementPressed:t.insideElementPressed,buttonDownAny:t.buttonDownAny,originalEvent:t.originalEvent})}function onContainerLeave(t){if(t.pointers<1){i[(this||e).hash].mouseInside=false;i[(this||e).hash].animating||beginControlsAutoHide(this||e)}
/**
     * Raised when the cursor leaves the {@link OpenSeadragon.Viewer#container} element.
     *
     * @event container-exit
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {String} pointerType - "mouse", "touch", "pen", etc.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {Number} buttons - Current buttons pressed. A combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
     * @property {Number} pointers - Number of pointers (all types) active in the tracked element.
     * @property {Boolean} insideElementPressed - True if the left mouse button is currently being pressed and was initiated inside the tracked element, otherwise false.
     * @property {Boolean} buttonDownAny - Was the button down anywhere in the screen during the event. <span style="color:red;">Deprecated. Use buttons instead.</span>
     * @property {Object} originalEvent - The original DOM event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */this.raiseEvent("container-exit",{tracker:t.eventSource,pointerType:t.pointerType,position:t.position,buttons:t.buttons,pointers:t.pointers,insideElementPressed:t.insideElementPressed,buttonDownAny:t.buttonDownAny,originalEvent:t.originalEvent})}function updateMulti(e){updateOnce(e);e.isOpen()?e._updateRequestId=scheduleUpdate(e,updateMulti):e._updateRequestId=false}function doViewerResize(e,n){var r=e.viewport;var o=r.getZoom();var s=r.getCenter();r.resize(n,e.preserveImageSizeOnResize);r.panTo(s,true);var a;if(e.preserveImageSizeOnResize)a=i[e.hash].prevContainerSize.x/n.x;else{var l=new t.Point(0,0);var h=new t.Point(i[e.hash].prevContainerSize.x,i[e.hash].prevContainerSize.y).distanceTo(l);var u=new t.Point(n.x,n.y).distanceTo(l);a=u/h*i[e.hash].prevContainerSize.x/n.x}r.zoomTo(o*a,null,true);i[e.hash].prevContainerSize=n;i[e.hash].forceRedraw=true;i[e.hash].needsResize=false;i[e.hash].forceResize=false}function updateOnce(e){if(!e._opening&&i[e.hash]){if(e.autoResize||i[e.hash].forceResize){var t;if(e._autoResizePolling){t=_getSafeElemSize(e.container);var n=i[e.hash].prevContainerSize;t.equals(n)||(i[e.hash].needsResize=true)}i[e.hash].needsResize&&doViewerResize(e,t||_getSafeElemSize(e.container))}var r=e.viewport.update();var o=e.world.update(r)||r;r&&
/**
       * Raised when any spring animation update occurs (zoom, pan, etc.),
       * before the viewer has drawn the new location.
       *
       * @event viewport-change
       * @memberof OpenSeadragon.Viewer
       * @type {object}
       * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
       * @property {?Object} userData - Arbitrary subscriber-defined object.
       */
e.raiseEvent("viewport-change");e.referenceStrip&&(o=e.referenceStrip.update(e.viewport)||o);var s=i[e.hash].animating;if(!s&&o){
/**
       * Raised when any spring animation starts (zoom, pan, etc.).
       *
       * @event animation-start
       * @memberof OpenSeadragon.Viewer
       * @type {object}
       * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
       * @property {?Object} userData - Arbitrary subscriber-defined object.
       */
e.raiseEvent("animation-start");abortControlsAutoHide(e)}var a=s&&!o;a&&(i[e.hash].animating=false);if(o||a||i[e.hash].forceRedraw||e.world.needsDraw()){drawWorld(e);e._drawOverlays();e.navigator&&e.navigator.update(e.viewport);i[e.hash].forceRedraw=false;o&&
/**
         * Raised when any spring animation update occurs (zoom, pan, etc.),
         * after the viewer has drawn the new location.
         *
         * @event animation
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
e.raiseEvent("animation")}if(a){
/**
       * Raised when any spring animation ends (zoom, pan, etc.).
       *
       * @event animation-finish
       * @memberof OpenSeadragon.Viewer
       * @type {object}
       * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
       * @property {?Object} userData - Arbitrary subscriber-defined object.
       */
e.raiseEvent("animation-finish");i[e.hash].mouseInside||beginControlsAutoHide(e)}i[e.hash].animating=o}}function drawWorld(e){e.imageLoader.clear();e.world.draw();
/**
     * <em>- Needs documentation -</em>
     *
     * @event update-viewport
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */e.raiseEvent("update-viewport",{})}function resolveUrl(e,t){return e?e+t:t}function beginZoomingIn(){i[(this||e).hash].lastZoomTime=t.now();i[(this||e).hash].zoomFactor=(this||e).zoomPerSecond;i[(this||e).hash].zooming=true;scheduleZoom(this||e)}function beginZoomingOut(){i[(this||e).hash].lastZoomTime=t.now();i[(this||e).hash].zoomFactor=1/(this||e).zoomPerSecond;i[(this||e).hash].zooming=true;scheduleZoom(this||e)}function endZooming(){i[(this||e).hash].zooming=false}function scheduleZoom(e){t.requestAnimationFrame(t.delegate(e,doZoom))}function doZoom(){var n,r,o;if(i[(this||e).hash].zooming&&(this||e).viewport){n=t.now();r=n-i[(this||e).hash].lastZoomTime;o=Math.pow(i[(this||e).hash].zoomFactor,r/1e3);(this||e).viewport.zoomBy(o);(this||e).viewport.applyConstraints();i[(this||e).hash].lastZoomTime=n;scheduleZoom(this||e)}}function doSingleZoomIn(){if((this||e).viewport){i[(this||e).hash].zooming=false;(this||e).viewport.zoomBy((this||e).zoomPerClick/1);(this||e).viewport.applyConstraints()}}function doSingleZoomOut(){if((this||e).viewport){i[(this||e).hash].zooming=false;(this||e).viewport.zoomBy(1/(this||e).zoomPerClick);(this||e).viewport.applyConstraints()}}function lightUp(){if((this||e).buttonGroup){(this||e).buttonGroup.emulateEnter();(this||e).buttonGroup.emulateLeave()}}function onHome(){(this||e).viewport&&(this||e).viewport.goHome()}function onFullScreen(){this.isFullPage()&&!t.isFullScreen()?this.setFullPage(false):this.setFullScreen(!this.isFullPage());(this||e).buttonGroup&&(this||e).buttonGroup.emulateLeave();(this||e).fullPageButton.element.focus();(this||e).viewport&&(this||e).viewport.applyConstraints()}function onRotateLeft(){if((this||e).viewport){var t=(this||e).viewport.getRotation();(this||e).viewport.flipped?t+=(this||e).rotationIncrement:t-=(this||e).rotationIncrement;(this||e).viewport.setRotation(t)}}function onRotateRight(){if((this||e).viewport){var t=(this||e).viewport.getRotation();(this||e).viewport.flipped?t-=(this||e).rotationIncrement:t+=(this||e).rotationIncrement;(this||e).viewport.setRotation(t)}}function onFlip(){(this||e).viewport.toggleFlip()}t.determineDrawer=function(e){for(let i in OpenSeadragon){const n=OpenSeadragon[i],r=n.prototype;if(r&&r instanceof OpenSeadragon.DrawerBase&&t.isFunction(r.getType)&&r.getType.call(n)===e)return n}return null}})(OpenSeadragon);(function(t){
/**
   * @class Navigator
   * @classdesc The Navigator provides a small view of the current image as fixed
   * while representing the viewport as a moving box serving as a frame
   * of reference in the larger viewport as to which portion of the image
   * is currently being examined.  The navigator's viewport can be interacted
   * with using the keyboard or the mouse.
   *
   * @memberof OpenSeadragon
   * @extends OpenSeadragon.Viewer
   * @extends OpenSeadragon.EventSource
   * @param {Object} options - Navigator options
   * @param {Element} [options.element] - An element to use for the navigator.
   * @param {String} [options.id] - Id of the element to use for the navigator. However, this is ignored if {@link options.element} is provided.
   */
t.Navigator=function(i){var n,r,o=i.viewer,s=this||e;if(i.element||i.id){if(i.element){i.id&&t.console.warn("Given option.id for Navigator was ignored since option.element was provided and is being used instead.");i.element.id?i.id=i.element.id:i.id="navigator-"+t.now();(this||e).element=i.element}else(this||e).element=document.getElementById(i.id);i.controlOptions={anchor:t.ControlAnchor.NONE,attachToViewer:false,autoFade:false}}else{i.id="navigator-"+t.now();(this||e).element=t.makeNeutralElement("div");i.controlOptions={anchor:t.ControlAnchor.TOP_RIGHT,attachToViewer:true,autoFade:i.autoFade};if(i.position)if("BOTTOM_RIGHT"===i.position)i.controlOptions.anchor=t.ControlAnchor.BOTTOM_RIGHT;else if("BOTTOM_LEFT"===i.position)i.controlOptions.anchor=t.ControlAnchor.BOTTOM_LEFT;else if("TOP_RIGHT"===i.position)i.controlOptions.anchor=t.ControlAnchor.TOP_RIGHT;else if("TOP_LEFT"===i.position)i.controlOptions.anchor=t.ControlAnchor.TOP_LEFT;else if("ABSOLUTE"===i.position){i.controlOptions.anchor=t.ControlAnchor.ABSOLUTE;i.controlOptions.top=i.top;i.controlOptions.left=i.left;i.controlOptions.height=i.height;i.controlOptions.width=i.width}}(this||e).element.id=i.id;(this||e).element.className+=" navigator";i=t.extend(true,{sizeRatio:t.DEFAULT_SETTINGS.navigatorSizeRatio},i,{element:(this||e).element,tabIndex:-1,showNavigator:false,mouseNavEnabled:false,showNavigationControl:false,showSequenceControl:false,immediateRender:true,blendTime:0,animationTime:i.animationTime,autoResize:false,minZoomImageRatio:1,background:i.background,opacity:i.opacity,borderColor:i.borderColor,displayRegionColor:i.displayRegionColor});i.minPixelRatio=(this||e).minPixelRatio=o.minPixelRatio;t.setElementTouchActionNone((this||e).element);(this||e).borderWidth=2;(this||e).fudge=new t.Point(1,1);(this||e).totalBorderWidths=new t.Point((this||e).borderWidth*2,(this||e).borderWidth*2).minus((this||e).fudge);i.controlOptions.anchor!==t.ControlAnchor.NONE&&function(e,t){e.margin="0px";e.border=t+"px solid "+i.borderColor;e.padding="0px";e.background=i.background;e.opacity=i.opacity;e.overflow="hidden"}((this||e).element.style,(this||e).borderWidth);(this||e).displayRegion=t.makeNeutralElement("div");(this||e).displayRegion.id=(this||e).element.id+"-displayregion";(this||e).displayRegion.className="displayregion";(function(e,t){e.position="relative";e.top="0px";e.left="0px";e.fontSize="0px";e.overflow="hidden";e.border=t+"px solid "+i.displayRegionColor;e.margin="0px";e.padding="0px";e.background="transparent";e.float="left";e.cssFloat="left";e.zIndex=999999999;e.cursor="default";e.boxSizing="content-box"})((this||e).displayRegion.style,(this||e).borderWidth);t.setElementPointerEventsNone((this||e).displayRegion);t.setElementTouchActionNone((this||e).displayRegion);(this||e).displayRegionContainer=t.makeNeutralElement("div");(this||e).displayRegionContainer.id=(this||e).element.id+"-displayregioncontainer";(this||e).displayRegionContainer.className="displayregioncontainer";(this||e).displayRegionContainer.style.width="100%";(this||e).displayRegionContainer.style.height="100%";t.setElementPointerEventsNone((this||e).displayRegionContainer);t.setElementTouchActionNone((this||e).displayRegionContainer);o.addControl((this||e).element,i.controlOptions);(this||e)._resizeWithViewer=i.controlOptions.anchor!==t.ControlAnchor.ABSOLUTE&&i.controlOptions.anchor!==t.ControlAnchor.NONE;if(i.width&&i.height){this.setWidth(i.width);this.setHeight(i.height)}else if((this||e)._resizeWithViewer){n=t.getElementSize(o.element);(this||e).element.style.height=Math.round(n.y*i.sizeRatio)+"px";(this||e).element.style.width=Math.round(n.x*i.sizeRatio)+"px";(this||e).oldViewerSize=n;r=t.getElementSize((this||e).element);(this||e).elementArea=r.x*r.y}(this||e).oldContainerSize=new t.Point(0,0);t.Viewer.apply(this||e,[i]);(this||e).displayRegionContainer.appendChild((this||e).displayRegion);(this||e).element.getElementsByTagName("div")[0].appendChild((this||e).displayRegionContainer);function rotate(e,t){_setTransformRotate(s.displayRegionContainer,e);_setTransformRotate(s.displayRegion,-e);s.viewport.setRotation(e,t)}if(i.navigatorRotate){var a=i.viewer.viewport?i.viewer.viewport.getRotation():i.viewer.degrees||0;rotate(a,true);i.viewer.addHandler("rotate",(function(e){rotate(e.degrees,e.immediately)}))}(this||e).innerTracker.destroy();(this||e).innerTracker=new t.MouseTracker({userData:"Navigator.innerTracker",element:(this||e).element,dragHandler:t.delegate(this||e,onCanvasDrag),clickHandler:t.delegate(this||e,onCanvasClick),releaseHandler:t.delegate(this||e,onCanvasRelease),scrollHandler:t.delegate(this||e,onCanvasScroll),preProcessEventHandler:function(e){e.eventType==="wheel"&&(e.preventDefault=true)}});(this||e).outerTracker.userData="Navigator.outerTracker";t.setElementPointerEventsNone((this||e).canvas);t.setElementPointerEventsNone((this||e).container);this.addHandler("reset-size",(function(){s.viewport&&s.viewport.goHome(true)}));o.world.addHandler("item-index-change",(function(e){window.setTimeout((function(){var t=s.world.getItemAt(e.previousIndex);s.world.setItemIndex(t,e.newIndex)}),1)}));o.world.addHandler("remove-item",(function(e){var t=e.item;var i=s._getMatchingItem(t);i&&s.world.removeItem(i)}));this.update(o.viewport)};t.extend(t.Navigator.prototype,t.EventSource.prototype,t.Viewer.prototype,{updateSize:function(){if((this||e).viewport){var i=new t.Point((this||e).container.clientWidth===0?1:(this||e).container.clientWidth,(this||e).container.clientHeight===0?1:(this||e).container.clientHeight);if(!i.equals((this||e).oldContainerSize)){(this||e).viewport.resize(i,true);(this||e).viewport.goHome(true);(this||e).oldContainerSize=i;(this||e).world.update();(this||e).world.draw();this.update((this||e).viewer.viewport)}}},
/**
     * Explicitly sets the width of the navigator, in web coordinates. Disables automatic resizing.
     * @param {Number|String} width - the new width, either a number of pixels or a CSS string, such as "100%"
     */
setWidth:function(t){(this||e).width=t;(this||e).element.style.width=typeof t==="number"?t+"px":t;(this||e)._resizeWithViewer=false;this.updateSize()},
/**
     * Explicitly sets the height of the navigator, in web coordinates. Disables automatic resizing.
     * @param {Number|String} height - the new height, either a number of pixels or a CSS string, such as "100%"
     */
setHeight:function(t){(this||e).height=t;(this||e).element.style.height=typeof t==="number"?t+"px":t;(this||e)._resizeWithViewer=false;this.updateSize()},
/**
      * Flip navigator element
      * @param {Boolean} state - Flip state to set.
      */
setFlip:function(t){(this||e).viewport.setFlip(t);this.setDisplayTransform((this||e).viewer.viewport.getFlip()?"scale(-1,1)":"scale(1,1)");return this||e},setDisplayTransform:function(t){setElementTransform((this||e).canvas,t);setElementTransform((this||e).element,t)},
/**
     * Used to update the navigator minimap's viewport rectangle when a change in the viewer's viewport occurs.
     * @function
     * @param {OpenSeadragon.Viewport} [viewport] The viewport to display. Default: the viewport this navigator is tracking.
     */
update:function(i){var n,r,o,s,a,l;i||(i=(this||e).viewer.viewport);n=t.getElementSize((this||e).viewer.element);if((this||e)._resizeWithViewer&&n.x&&n.y&&!n.equals((this||e).oldViewerSize)){(this||e).oldViewerSize=n;if((this||e).maintainSizeRatio||!(this||e).elementArea){r=n.x*(this||e).sizeRatio;o=n.y*(this||e).sizeRatio}else{r=Math.sqrt((this||e).elementArea*(n.x/n.y));o=(this||e).elementArea/r}(this||e).element.style.width=Math.round(r)+"px";(this||e).element.style.height=Math.round(o)+"px";(this||e).elementArea||((this||e).elementArea=r*o);this.updateSize()}if(i&&(this||e).viewport){s=i.getBoundsNoRotate(true);a=(this||e).viewport.pixelFromPointNoRotate(s.getTopLeft(),false);l=(this||e).viewport.pixelFromPointNoRotate(s.getBottomRight(),false).minus((this||e).totalBorderWidths);if(!(this||e).navigatorRotate){var h=i.getRotation(true);_setTransformRotate((this||e).displayRegion,-h)}var u=(this||e).displayRegion.style;u.display=(this||e).world.getItemCount()?"block":"none";u.top=a.y.toFixed(2)+"px";u.left=a.x.toFixed(2)+"px";var c=l.x-a.x;var d=l.y-a.y;u.width=Math.round(Math.max(c,0))+"px";u.height=Math.round(Math.max(d,0))+"px"}},addTiledImage:function(i){var n=this||e;var r=i.originalTiledImage;delete i.original;var o=t.extend({},i,{success:function(e){var t=e.item;t._originalForNavigator=r;n._matchBounds(t,r,true);n._matchOpacity(t,r);n._matchCompositeOperation(t,r);function matchBounds(){n._matchBounds(t,r)}function matchOpacity(){n._matchOpacity(t,r)}function matchCompositeOperation(){n._matchCompositeOperation(t,r)}r.addHandler("bounds-change",matchBounds);r.addHandler("clip-change",matchBounds);r.addHandler("opacity-change",matchOpacity);r.addHandler("composite-operation-change",matchCompositeOperation)}});return t.Viewer.prototype.addTiledImage.apply(this||e,[o])},destroy:function(){return t.Viewer.prototype.destroy.apply(this||e)},_getMatchingItem:function(t){var i=(this||e).world.getItemCount();var n;for(var r=0;r<i;r++){n=(this||e).world.getItemAt(r);if(n._originalForNavigator===t)return n}return null},_matchBounds:function(e,t,i){var n=t.getBoundsNoRotate();e.setPosition(n.getTopLeft(),i);e.setWidth(n.width,i);e.setRotation(t.getRotation(),i);e.setClip(t.getClip());e.setFlip(t.getFlip())},_matchOpacity:function(e,t){e.setOpacity(t.opacity)},_matchCompositeOperation:function(e,t){e.setCompositeOperation(t.compositeOperation)}});function onCanvasClick(t){var i={tracker:t.eventSource,position:t.position,quick:t.quick,shift:t.shift,originalEvent:t.originalEvent,preventDefaultAction:false};
/**
     * Raised when a click event occurs on the {@link OpenSeadragon.Viewer#navigator} element.
     *
     * @event navigator-click
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {Boolean} quick - True only if the clickDistThreshold and clickTimeThreshold are both passed. Useful for differentiating between clicks and drags.
     * @property {Boolean} shift - True if the shift key was pressed during this event.
     * @property {Object} originalEvent - The original DOM event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     * @property {Boolean} preventDefaultAction - Set to true to prevent default click to zoom behaviour. Default: false.
     */(this||e).viewer.raiseEvent("navigator-click",i);if(!i.preventDefaultAction&&t.quick&&(this||e).viewer.viewport&&((this||e).panVertical||(this||e).panHorizontal)){(this||e).viewer.viewport.flipped&&(t.position.x=(this||e).viewport.getContainerSize().x-t.position.x);var n=(this||e).viewport.pointFromPixel(t.position);(this||e).panVertical?(this||e).panHorizontal||(n.x=(this||e).viewer.viewport.getCenter(true).x):n.y=(this||e).viewer.viewport.getCenter(true).y;(this||e).viewer.viewport.panTo(n);(this||e).viewer.viewport.applyConstraints()}}function onCanvasDrag(t){var i={tracker:t.eventSource,position:t.position,delta:t.delta,speed:t.speed,direction:t.direction,shift:t.shift,originalEvent:t.originalEvent,preventDefaultAction:false};
/**
     * Raised when a drag event occurs on the {@link OpenSeadragon.Viewer#navigator} element.
     *
     * @event navigator-drag
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {OpenSeadragon.Point} delta - The x,y components of the difference between start drag and end drag.
     * @property {Number} speed - Current computed speed, in pixels per second.
     * @property {Number} direction - Current computed direction, expressed as an angle counterclockwise relative to the positive X axis (-pi to pi, in radians). Only valid if speed > 0.
     * @property {Boolean} shift - True if the shift key was pressed during this event.
     * @property {Object} originalEvent - The original DOM event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     * @property {Boolean} preventDefaultAction - Set to true to prevent default drag to pan behaviour. Default: false.
     */(this||e).viewer.raiseEvent("navigator-drag",i);if(!i.preventDefaultAction&&(this||e).viewer.viewport){(this||e).panHorizontal||(t.delta.x=0);(this||e).panVertical||(t.delta.y=0);(this||e).viewer.viewport.flipped&&(t.delta.x=-t.delta.x);(this||e).viewer.viewport.panBy((this||e).viewport.deltaPointsFromPixels(t.delta));(this||e).viewer.constrainDuringPan&&(this||e).viewer.viewport.applyConstraints()}}function onCanvasRelease(t){t.insideElementPressed&&(this||e).viewer.viewport&&(this||e).viewer.viewport.applyConstraints()}function onCanvasScroll(t){var i={tracker:t.eventSource,position:t.position,scroll:t.scroll,shift:t.shift,originalEvent:t.originalEvent,preventDefault:t.preventDefault};
/**
     * Raised when a scroll event occurs on the {@link OpenSeadragon.Viewer#navigator} element (mouse wheel, touch pinch, etc.).
     *
     * @event navigator-scroll
     * @memberof OpenSeadragon.Viewer
     * @type {object}
     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
     * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
     * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
     * @property {Number} scroll - The scroll delta for the event.
     * @property {Boolean} shift - True if the shift key was pressed during this event.
     * @property {Object} originalEvent - The original DOM event.
     * @property {Boolean} preventDefault - Set to true to prevent the default user-agent's handling of the wheel event.
     * @property {?Object} userData - Arbitrary subscriber-defined object.
     */(this||e).viewer.raiseEvent("navigator-scroll",i);t.preventDefault=i.preventDefault}
/**
      * @function
      * @private
      * @param {Object} element
      * @param {Number} degrees
      */function _setTransformRotate(e,t){setElementTransform(e,"rotate("+t+"deg)")}function setElementTransform(e,t){e.style.webkitTransform=t;e.style.mozTransform=t;e.style.msTransform=t;e.style.oTransform=t;e.style.transform=t}})(OpenSeadragon);(function(e){var t={Errors:{Dzc:"Sorry, we don't support Deep Zoom Collections!",Dzi:"Hmm, this doesn't appear to be a valid Deep Zoom Image.",Xml:"Hmm, this doesn't appear to be a valid Deep Zoom Image.",ImageFormat:"Sorry, we don't support {0}-based Deep Zoom Images.",Security:"It looks like a security restriction stopped us from loading this Deep Zoom Image.",Status:"This space unintentionally left blank ({0} {1}).",OpenFailed:"Unable to open {0}: {1}"},Tooltips:{FullPage:"Toggle full page",Home:"Go home",ZoomIn:"Zoom in",ZoomOut:"Zoom out",NextPage:"Next page",PreviousPage:"Previous page",RotateLeft:"Rotate left",RotateRight:"Rotate right",Flip:"Flip Horizontally"}};e.extend(e,{
/**
     * @function
     * @param {String} property
     */
getString:function(i){var n,r=i.split("."),o=null,s=arguments,a=t;for(n=0;n<r.length-1;n++)a=a[r[n]]||{};o=a[r[n]];if(typeof o!=="string"){e.console.error("Untranslated source string:",i);o=""}return o.replace(/\{\d+\}/g,(function(e){var t=parseInt(e.match(/\d+/),10)+1;return t<s.length?s[t]:""}))},
/**
     * @function
     * @param {String} property
     * @param {*} value
     */
setString:function(e,i){var n,r=e.split("."),o=t;for(n=0;n<r.length-1;n++){o[r[n]]||(o[r[n]]={});o=o[r[n]]}o[r[n]]=i}})})(OpenSeadragon);(function(t){
/**
   * @class Point
   * @classdesc A Point is really used as a 2-dimensional vector, equally useful for
   * representing a point on a plane, or the height and width of a plane
   * not requiring any other frame of reference.
   *
   * @memberof OpenSeadragon
   * @param {Number} [x] The vector component 'x'. Defaults to the origin at 0.
   * @param {Number} [y] The vector component 'y'. Defaults to the origin at 0.
   */
t.Point=function(t,i){(this||e).x=typeof t==="number"?t:0;(this||e).y=typeof i==="number"?i:0};t.Point.prototype={
/**
     * @function
     * @returns {OpenSeadragon.Point} a duplicate of this Point
     */
clone:function(){return new t.Point((this||e).x,(this||e).y)},
/**
     * Add another Point to this point and return a new Point.
     * @function
     * @param {OpenSeadragon.Point} point The point to add vector components.
     * @returns {OpenSeadragon.Point} A new point representing the sum of the
     *  vector components
     */
plus:function(i){return new t.Point((this||e).x+i.x,(this||e).y+i.y)},
/**
     * Subtract another Point to this point and return a new Point.
     * @function
     * @param {OpenSeadragon.Point} point The point to subtract vector components.
     * @returns {OpenSeadragon.Point} A new point representing the subtraction of the
     *  vector components
     */
minus:function(i){return new t.Point((this||e).x-i.x,(this||e).y-i.y)},
/**
     * Multiply this point by a factor and return a new Point.
     * @function
     * @param {Number} factor The factor to multiply vector components.
     * @returns {OpenSeadragon.Point} A new point representing the multiplication
     *  of the vector components by the factor
     */
times:function(i){return new t.Point((this||e).x*i,(this||e).y*i)},
/**
     * Divide this point by a factor and return a new Point.
     * @function
     * @param {Number} factor The factor to divide vector components.
     * @returns {OpenSeadragon.Point} A new point representing the division of the
     *  vector components by the factor
     */
divide:function(i){return new t.Point((this||e).x/i,(this||e).y/i)},
/**
     * Compute the opposite of this point and return a new Point.
     * @function
     * @returns {OpenSeadragon.Point} A new point representing the opposite of the
     *  vector components
     */
negate:function(){return new t.Point(-(this||e).x,-(this||e).y)},
/**
     * Compute the distance between this point and another point.
     * @function
     * @param {OpenSeadragon.Point} point The point to compute the distance with.
     * @returns {Number} The distance between the 2 points
     */
distanceTo:function(t){return Math.sqrt(Math.pow((this||e).x-t.x,2)+Math.pow((this||e).y-t.y,2))},
/**
     * Compute the squared distance between this point and another point.
     * Useful for optimizing things like comparing distances.
     * @function
     * @param {OpenSeadragon.Point} point The point to compute the squared distance with.
     * @returns {Number} The squared distance between the 2 points
     */
squaredDistanceTo:function(t){return Math.pow((this||e).x-t.x,2)+Math.pow((this||e).y-t.y,2)},
/**
     * Apply a function to each coordinate of this point and return a new point.
     * @function
     * @param {function} func The function to apply to each coordinate.
     * @returns {OpenSeadragon.Point} A new point with the coordinates computed
     * by the specified function
     */
apply:function(i){return new t.Point(i((this||e).x),i((this||e).y))},
/**
     * Check if this point is equal to another one.
     * @function
     * @param {OpenSeadragon.Point} point The point to compare this point with.
     * @returns {Boolean} true if they are equal, false otherwise.
     */
equals:function(i){return i instanceof t.Point&&(this||e).x===i.x&&(this||e).y===i.y},
/**
     * Rotates the point around the specified pivot
     * From http://stackoverflow.com/questions/4465931/rotate-rectangle-around-a-point
     * @function
     * @param {Number} degress to rotate around the pivot.
     * @param {OpenSeadragon.Point} [pivot=(0,0)] Point around which to rotate.
     * Defaults to the origin.
     * @returns {OpenSeadragon.Point}. A new point representing the point rotated around the specified pivot
     */
rotate:function(i,n){n=n||new t.Point(0,0);var r;var o;if(i%90===0){var s=t.positiveModulo(i,360);switch(s){case 0:r=1;o=0;break;case 90:r=0;o=1;break;case 180:r=-1;o=0;break;case 270:r=0;o=-1;break}}else{var a=i*Math.PI/180;r=Math.cos(a);o=Math.sin(a)}var l=r*((this||e).x-n.x)-o*((this||e).y-n.y)+n.x;var h=o*((this||e).x-n.x)+r*((this||e).y-n.y)+n.y;return new t.Point(l,h)},
/**
     * Convert this point to a string in the format (x,y) where x and y are
     * rounded to the nearest integer.
     * @function
     * @returns {String} A string representation of this point.
     */
toString:function(){return"("+Math.round((this||e).x*100)/100+","+Math.round((this||e).y*100)/100+")"}}})(OpenSeadragon);(function(t){
/**
   * @class TileSource
   * @classdesc The TileSource contains the most basic implementation required to create a
   * smooth transition between layers in an image pyramid. It has only a single key
   * interface that must be implemented to complete its key functionality:
   * 'getTileUrl'.  It also has several optional interfaces that can be
   * implemented if a new TileSource wishes to support configuration via a simple
   * object or array ('configure') and if the tile source supports or requires
   * configuration via retrieval of a document on the network ala AJAX or JSONP,
   * ('getImageInfo').
   * <br/>
   * By default the image pyramid is split into N layers where the image's longest
   * side in M (in pixels), where N is the smallest integer which satisfies
   *      <strong>2^(N+1) >= M</strong>.
   *
   * @memberof OpenSeadragon
   * @extends OpenSeadragon.EventSource
   * @param {Object} options
   *      You can either specify a URL, or literally define the TileSource (by specifying
   *      width, height, tileSize, tileOverlap, minLevel, and maxLevel). For the former,
   *      the extending class is expected to implement 'getImageInfo' and 'configure'.
   *      For the latter, the construction is assumed to occur through
   *      the extending classes implementation of 'configure'.
   * @param {String} [options.url]
   *      The URL for the data necessary for this TileSource.
   * @param {String} [options.referenceStripThumbnailUrl]
   *      The URL for a thumbnail image to be used by the reference strip
   * @param {Function} [options.success]
   *      A function to be called upon successful creation.
   * @param {Boolean} [options.ajaxWithCredentials]
   *      If this TileSource needs to make an AJAX call, this specifies whether to set
   *      the XHR's withCredentials (for accessing secure data).
   * @param {Object} [options.ajaxHeaders]
   *      A set of headers to include in AJAX requests.
   * @param {Boolean} [options.splitHashDataForPost]
   *      First occurrence of '#' in the options.url is used to split URL
   *      and the latter part is treated as POST data (applies to getImageInfo(...))
   * @param {Number} [options.width]
   *      Width of the source image at max resolution in pixels.
   * @param {Number} [options.height]
   *      Height of the source image at max resolution in pixels.
   * @param {Number} [options.tileSize]
   *      The size of the tiles to assumed to make up each pyramid layer in pixels.
   *      Tile size determines the point at which the image pyramid must be
   *      divided into a matrix of smaller images.
   *      Use options.tileWidth and options.tileHeight to support non-square tiles.
   * @param {Number} [options.tileWidth]
   *      The width of the tiles to assumed to make up each pyramid layer in pixels.
   * @param {Number} [options.tileHeight]
   *      The height of the tiles to assumed to make up each pyramid layer in pixels.
   * @param {Number} [options.tileOverlap]
   *      The number of pixels each tile is expected to overlap touching tiles.
   * @param {Number} [options.minLevel]
   *      The minimum level to attempt to load.
   * @param {Number} [options.maxLevel]
   *      The maximum level to attempt to load.
   */
t.TileSource=function(i,n,r,o,s,a){var l=this||e;var h,u,c=arguments;h=t.isPlainObject(i)?i:{width:c[0],height:c[1],tileSize:c[2],tileOverlap:c[3],minLevel:c[4],maxLevel:c[5]};t.EventSource.call(this||e);t.extend(true,this||e,h);if(!(this||e).success)for(u=0;u<arguments.length;u++)if(t.isFunction(arguments[u])){(this||e).success=arguments[u];break}(this||e).success&&this.addHandler("ready",(function(e){l.success(e)}));"string"===t.type(arguments[0])&&((this||e).url=arguments[0]);if((this||e).url){(this||e).aspectRatio=1;(this||e).dimensions=new t.Point(10,10);(this||e)._tileWidth=0;(this||e)._tileHeight=0;(this||e).tileOverlap=0;(this||e).minLevel=0;(this||e).maxLevel=0;(this||e).ready=false;this.getImageInfo((this||e).url)}else{(this||e).ready=true;(this||e).aspectRatio=h.width&&h.height?h.width/h.height:1;(this||e).dimensions=new t.Point(h.width,h.height);if((this||e).tileSize){(this||e)._tileWidth=(this||e)._tileHeight=(this||e).tileSize;delete(this||e).tileSize}else{if((this||e).tileWidth){(this||e)._tileWidth=(this||e).tileWidth;delete(this||e).tileWidth}else(this||e)._tileWidth=0;if((this||e).tileHeight){(this||e)._tileHeight=(this||e).tileHeight;delete(this||e).tileHeight}else(this||e)._tileHeight=0}(this||e).tileOverlap=h.tileOverlap?h.tileOverlap:0;(this||e).minLevel=h.minLevel?h.minLevel:0;(this||e).maxLevel=void 0!==h.maxLevel&&null!==h.maxLevel?h.maxLevel:h.width&&h.height?Math.ceil(Math.log(Math.max(h.width,h.height))/Math.log(2)):0;(this||e).success&&t.isFunction((this||e).success)&&this.success(this||e)}};t.TileSource.prototype={getTileSize:function(i){t.console.error("[TileSource.getTileSize] is deprecated. Use TileSource.getTileWidth() and TileSource.getTileHeight() instead");return(this||e)._tileWidth},
/**
     * Return the tileWidth for a given level.
     * Subclasses should override this if tileWidth can be different at different levels
     *   such as in IIIFTileSource.  Code should use this function rather than reading
     *   from ._tileWidth directly.
     * @function
     * @param {Number} level
     */
getTileWidth:function(t){return(this||e)._tileWidth?(this||e)._tileWidth:this.getTileSize(t)},
/**
     * Return the tileHeight for a given level.
     * Subclasses should override this if tileHeight can be different at different levels
     *   such as in IIIFTileSource.  Code should use this function rather than reading
     *   from ._tileHeight directly.
     * @function
     * @param {Number} level
     */
getTileHeight:function(t){return(this||e)._tileHeight?(this||e)._tileHeight:this.getTileSize(t)},
/**
     * Set the maxLevel to the given level, and perform the memoization of
     * getLevelScale with the new maxLevel. This function can be useful if the
     * memoization is required before the first call of getLevelScale, or both
     * memoized getLevelScale and maxLevel should be changed accordingly.
     * @function
     * @param {Number} level
     */
setMaxLevel:function(t){(this||e).maxLevel=t;this._memoizeLevelScale()},
/**
     * @function
     * @param {Number} level
     */
getLevelScale:function(e){this._memoizeLevelScale();return this.getLevelScale(e)},_memoizeLevelScale:function(){var t,i={};for(t=0;t<=(this||e).maxLevel;t++)i[t]=1/Math.pow(2,(this||e).maxLevel-t);(this||e).getLevelScale=function(e){return i[e]}},
/**
     * @function
     * @param {Number} level
     */
getNumTiles:function(i){var n=this.getLevelScale(i),r=Math.ceil(n*(this||e).dimensions.x/this.getTileWidth(i)),o=Math.ceil(n*(this||e).dimensions.y/this.getTileHeight(i));return new t.Point(r,o)},
/**
     * @function
     * @param {Number} level
     */
getPixelRatio:function(i){var n=(this||e).dimensions.times(this.getLevelScale(i)),r=1/n.x*t.pixelDensityRatio,o=1/n.y*t.pixelDensityRatio;return new t.Point(r,o)},
/**
     * @function
     * @returns {Number} The highest level in this tile source that can be contained in a single tile.
     */
getClosestLevel:function(){var t,i;for(t=(this||e).minLevel+1;t<=(this||e).maxLevel;t++){i=this.getNumTiles(t);if(i.x>1||i.y>1)break}return t-1},
/**
     * @function
     * @param {Number} level
     * @param {OpenSeadragon.Point} point
     */
getTileAtPoint:function(i,n){var r=n.x>=0&&n.x<=1&&n.y>=0&&n.y<=1/(this||e).aspectRatio;t.console.assert(r,"[TileSource.getTileAtPoint] must be called with a valid point.");var o=(this||e).dimensions.x*this.getLevelScale(i);var s=n.x*o;var a=n.y*o;var l=Math.floor(s/this.getTileWidth(i));var h=Math.floor(a/this.getTileHeight(i));n.x>=1&&(l=this.getNumTiles(i).x-1);var u=1e-15;n.y>=1/(this||e).aspectRatio-u&&(h=this.getNumTiles(i).y-1);return new t.Point(l,h)},
/**
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     * @param {Boolean} [isSource=false] Whether to return the source bounds of the tile.
     * @returns {OpenSeadragon.Rect} Either where this tile fits (in normalized coordinates) or the
     * portion of the tile to use as the source of the drawing operation (in pixels), depending on
     * the isSource parameter.
     */
getTileBounds:function(i,n,r,o){var s=(this||e).dimensions.times(this.getLevelScale(i)),a=this.getTileWidth(i),l=this.getTileHeight(i),h=n===0?0:a*n-(this||e).tileOverlap,u=r===0?0:l*r-(this||e).tileOverlap,c=a+(n===0?1:2)*(this||e).tileOverlap,d=l+(r===0?1:2)*(this||e).tileOverlap,p=1/s.x;c=Math.min(c,s.x-h);d=Math.min(d,s.y-u);return o?new t.Rect(0,0,c,d):new t.Rect(h*p,u*p,c*p,d*p)},
/**
     * Responsible for retrieving, and caching the
     * image metadata pertinent to this TileSources implementation.
     * @function
     * @param {String} url
     * @throws {Error}
     */
getImageInfo:function(i){var n,r,o,s,a,l,h,u=this||e;if(i){a=i.split("/");l=a[a.length-1];h=l.lastIndexOf(".");h>-1&&(a[a.length-1]=l.slice(0,h))}var c=null;if((this||e).splitHashDataForPost){var d=i.indexOf("#");if(d!==-1){c=i.substring(d+1);i=i.substr(0,d)}}r=function(e){typeof e==="string"&&(e=t.parseXml(e));var n=t.TileSource.determineType(u,e,i);if(n){s=n.prototype.configure.apply(u,[e,i,c]);s.ajaxWithCredentials===void 0&&(s.ajaxWithCredentials=u.ajaxWithCredentials);o=new n(s);u.ready=true;
/**
         * Raised when a TileSource is opened and initialized.
         *
         * @event ready
         * @memberof OpenSeadragon.TileSource
         * @type {object}
         * @property {OpenSeadragon.TileSource} eventSource - A reference to the TileSource which raised the event.
         * @property {Object} tileSource
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */u.raiseEvent("ready",{tileSource:o})}else
/**
           * Raised when an error occurs loading a TileSource.
           *
           * @event open-failed
           * @memberof OpenSeadragon.TileSource
           * @type {object}
           * @property {OpenSeadragon.TileSource} eventSource - A reference to the TileSource which raised the event.
           * @property {String} message
           * @property {String} source
           * @property {?Object} userData - Arbitrary subscriber-defined object.
           */
u.raiseEvent("open-failed",{message:"Unable to load TileSource",source:i})};if(i.match(/\.js$/)){n=i.split("/").pop().replace(".js","");t.jsonp({url:i,async:false,callbackName:n,callback:r})}else t.makeAjaxRequest({url:i,postData:c,withCredentials:(this||e).ajaxWithCredentials,headers:(this||e).ajaxHeaders,success:function(e){var t=processResponse(e);r(t)},error:function(e,n){var r;try{r="HTTP "+e.status+" attempting to load TileSource: "+i}catch(e){var o;o=typeof n!=="undefined"&&n.toString?n.toString():"Unknown error";r=o+" attempting to load TileSource: "+i}t.console.error(r);
/***
             * Raised when an error occurs loading a TileSource.
             *
             * @event open-failed
             * @memberof OpenSeadragon.TileSource
             * @type {object}
             * @property {OpenSeadragon.TileSource} eventSource - A reference to the TileSource which raised the event.
             * @property {String} message
             * @property {String} source
             * @property {String} postData - HTTP POST data (usually but not necessarily in k=v&k2=v2... form,
             *      see TileSource::getPostData) or null
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */u.raiseEvent("open-failed",{message:r,source:i,postData:c})}})},
/**
     * Responsible for determining if the particular TileSource supports the
     * data format ( and allowed to apply logic against the url the data was
     * loaded from, if any ). Overriding implementations are expected to do
     * something smart with data and / or url to determine support.  Also
     * understand that iteration order of TileSources is not guaranteed so
     * please make sure your data or url is expressive enough to ensure a simple
     * and sufficient mechanism for clear determination.
     * @function
     * @param {String|Object|Array|Document} data
     * @param {String} url - the url the data was loaded
     *      from if any.
     * @returns {Boolean}
     */
supports:function(e,t){return false},
/**
     * Responsible for parsing and configuring the
     * image metadata pertinent to this TileSources implementation.
     * This method is not implemented by this class other than to throw an Error
     * announcing you have to implement it.  Because of the variety of tile
     * server technologies, and various specifications for building image
     * pyramids, this method is here to allow easy integration.
     * @function
     * @param {String|Object|Array|Document} data
     * @param {String} url - the url the data was loaded
     *      from if any.
     * @param {String} postData - HTTP POST data in k=v&k2=v2... form or null value obtained from
     *      the protocol URL after '#' sign if flag splitHashDataForPost set to 'true'
     * @returns {Object} options - A dictionary of keyword arguments sufficient
     *      to configure the tile source constructor (include all values you want to
     *      instantiate the TileSource subclass with - what _options_ object should contain).
     * @throws {Error}
     */
configure:function(e,t,i){throw new Error("Method not implemented.")},
/**
     * Responsible for retrieving the url which will return an image for the
     * region specified by the given x, y, and level components.
     * This method is not implemented by this class other than to throw an Error
     * announcing you have to implement it.  Because of the variety of tile
     * server technologies, and various specifications for building image
     * pyramids, this method is here to allow easy integration.
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     * @returns {String|Function} url - A string for the url or a function that returns a url string.
     * @throws {Error}
     */
getTileUrl:function(e,t,i){throw new Error("Method not implemented.")},
/**
     * Must use AJAX in order to work, i.e. loadTilesWithAjax = true is set.
     * If a value is returned, ajax issues POST request to the tile url.
     * If null is returned, ajax issues GET request.
     * The return value must comply to the header 'content type'.
     *
     * Examples (USED HEADER --> getTilePostData CODE):
     * 'Content-type': 'application/x-www-form-urlencoded' -->
     *   return "key1=value=1&key2=value2";
     *
     * 'Content-type': 'application/x-www-form-urlencoded' -->
     *   return JSON.stringify({key: "value", number: 5});
     *
     * 'Content-type': 'multipart/form-data' -->
     *   let result = new FormData();
     *   result.append("data", myData);
     *   return result;
     *
     * IMPORTANT: in case you move all the logic on image fetching
     * to post data, you must re-define 'getTileHashKey(...)' to
     * stay unique for different tile images.
     *
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     * @returns {*|null} post data to send with tile configuration request
     */
getTilePostData:function(e,t,i){return null},
/**
     * Responsible for retrieving the headers which will be attached to the image request for the
     * region specified by the given x, y, and level components.
     * This option is only relevant if {@link OpenSeadragon.Options}.loadTilesWithAjax is set to true.
     * The headers returned here will override headers specified at the Viewer or TiledImage level.
     * Specifying a falsy value for a header will clear its existing value set at the Viewer or
     * TiledImage level (if any).
     *
     * Note that the headers of existing tiles don't automatically change when this function
     * returns updated headers. To do that, you need to call {@link OpenSeadragon.Viewer#setAjaxHeaders}
     * and propagate the changes.
     *
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     * @returns {Object}
     */
getTileAjaxHeaders:function(e,t,i){return{}},
/**
     * The tile cache object is uniquely determined by this key and used to lookup
     * the image data in cache: keys should be different if images are different.
     *
     * In case a tile has context2D property defined (TileSource.prototype.getContext2D)
     * or its context2D is set manually; the cache is not used and this function
     * is irrelevant.
     * Note: default behaviour does not take into account post data.
     * @param {Number} level tile level it was fetched with
     * @param {Number} x x-coordinate in the pyramid level
     * @param {Number} y y-coordinate in the pyramid level
     * @param {String} url the tile was fetched with
     * @param {Object} ajaxHeaders the tile was fetched with
     * @param {*} postData data the tile was fetched with (type depends on getTilePostData(..) return type)
     */
getTileHashKey:function(e,t,i,n,r,o){function withHeaders(e){return r?e+"+"+JSON.stringify(r):e}return withHeaders(typeof n!=="string"?e+"/"+t+"_"+i:n)},
/**
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     */
tileExists:function(t,i,n){var r=this.getNumTiles(t);return t>=(this||e).minLevel&&t<=(this||e).maxLevel&&i>=0&&n>=0&&i<r.x&&n<r.y},
/**
     * Decide whether tiles have transparency: this is crucial for correct images blending.
     * @returns {boolean} true if the image has transparency
     */
hasTransparency:function(e,t,i,n){return!!e||t.match(".png")},
/**
     * Download tile data.
     * Note that if you override this function, you should override also downloadTileAbort().
     * @param {ImageJob} context job context that you have to call finish(...) on.
     * @param {String} [context.src] - URL of image to download.
     * @param {String} [context.loadWithAjax] - Whether to load this image with AJAX.
     * @param {String} [context.ajaxHeaders] - Headers to add to the image request if using AJAX.
     * @param {Boolean} [context.ajaxWithCredentials] - Whether to set withCredentials on AJAX requests.
     * @param {String} [context.crossOriginPolicy] - CORS policy to use for downloads
     * @param {String} [context.postData] - HTTP POST data (usually but not necessarily in k=v&k2=v2... form,
     *   see TileSource::getPostData) or null
     * @param {*} [context.userData] - Empty object to attach your own data and helper variables to.
     * @param {Function} [context.finish] - Should be called unless abort() was executed, e.g. on all occasions,
     *   be it successful or unsuccessful request.
     *   Usage: context.finish(data, request, errMessage). Pass the downloaded data object or null upon failure.
     *   Add also reference to an ajax request if used. Provide error message in case of failure.
     * @param {Function} [context.abort] - Called automatically when the job times out.
     *   Usage: context.abort().
     * @param {Function} [context.callback] @private - Called automatically once image has been downloaded
     *   (triggered by finish).
     * @param {Number} [context.timeout] @private - The max number of milliseconds that
     *   this image job may take to complete.
     * @param {string} [context.errorMsg] @private - The final error message, default null (set by finish).
     */
downloadTileStart:function(e){var i=e.userData,n=new Image;i.image=n;i.request=null;var finish=function(t){if(n){n.onload=n.onerror=n.onabort=null;e.finish(t?null:n,i.request,t)}else e.finish(null,i.request,"Image load failed: undefined Image instance.")};n.onload=function(){finish()};n.onabort=n.onerror=function(){finish("Image load aborted.")};if(e.loadWithAjax)i.request=t.makeAjaxRequest({url:e.src,withCredentials:e.ajaxWithCredentials,headers:e.ajaxHeaders,responseType:"arraybuffer",postData:e.postData,success:function(e){var t;try{t=new window.Blob([e.response])}catch(n){var i=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder;if(n.name==="TypeError"&&i){var r=new i;r.append(e.response);t=r.getBlob()}}t.size===0?finish("Empty image response."):n.src=(window.URL||window.webkitURL).createObjectURL(t)},error:function(e){finish("Image load aborted - XHR error")}});else{e.crossOriginPolicy!==false&&(n.crossOrigin=e.crossOriginPolicy);n.src=e.src}},
/**
     * Provide means of aborting the execution.
     * Note that if you override this function, you should override also downloadTileStart().
     * @param {ImageJob} context job, the same object as with downloadTileStart(..)
     * @param {*} [context.userData] - Empty object to attach (and mainly read) your own data.
     */
downloadTileAbort:function(e){e.userData.request&&e.userData.request.abort();var t=e.userData.image;e.userData.image&&(t.onload=t.onerror=t.onabort=null)},
/**
     * Create cache object from the result of the download process. The
     * cacheObject parameter should be used to attach the data to, there are no
     * conventions on how it should be stored - all the logic is implemented within *TileCache() functions.
     *
     * Note that if you override any of *TileCache() functions, you should override all of them.
     * @param {object} cacheObject context cache object
     * @param {*} data image data, the data sent to ImageJob.prototype.finish(), by default an Image object
     * @param {Tile} tile instance the cache was created with
     */
createTileCache:function(e,t,i){e._data=t},
/**
     * Cache object destructor, unset all properties you created to allow GC collection.
     * Note that if you override any of *TileCache() functions, you should override all of them.
     * @param {object} cacheObject context cache object
     */
destroyTileCache:function(e){e._data=null;e._renderedContext=null},
/**
     * Raw data getter
     * Note that if you override any of *TileCache() functions, you should override all of them.
     * @param {object} cacheObject context cache object
     * @returns {*} cache data
     */
getTileCacheData:function(e){return e._data},
/**
     * Compatibility image element getter
     *  - plugins might need image representation of the data
     *  - div HTML rendering relies on image element presence
     * Note that if you override any of *TileCache() functions, you should override all of them.
     *  @param {object} cacheObject context cache object
     *  @returns {Image} cache data as an Image
     */
getTileCacheDataAsImage:function(e){return e._data},
/**
     * Compatibility context 2D getter
     *  - most heavily used rendering method is a canvas-based approach,
     *    convert the data to a canvas and return it's 2D context
     * Note that if you override any of *TileCache() functions, you should override all of them.
     * @param {object} cacheObject context cache object
     * @returns {CanvasRenderingContext2D} context of the canvas representation of the cache data
     */
getTileCacheDataAsContext2D:function(e){if(!e._renderedContext){var t=document.createElement("canvas");t.width=e._data.width;t.height=e._data.height;e._renderedContext=t.getContext("2d");e._renderedContext.drawImage(e._data,0,0);e._data=null}return e._renderedContext}};t.extend(true,t.TileSource.prototype,t.EventSource.prototype);
/**
   * Decides whether to try to process the response as xml, json, or hand back
   * the text
   * @private
   * @inner
   * @function
   * @param {XMLHttpRequest} xhr - the completed network request
   */function processResponse(e){var i,n,r=e.responseText,o=e.status;if(!e)throw new Error(t.getString("Errors.Security"));if(e.status!==200&&e.status!==0){o=e.status;i=o===404?"Not Found":e.statusText;throw new Error(t.getString("Errors.Status",o,i))}if(r.match(/^\s*<.*/))try{n=e.responseXML&&e.responseXML.documentElement?e.responseXML:t.parseXml(r)}catch(t){n=e.responseText}else if(r.match(/\s*[{[].*/))try{n=t.parseJSON(r)}catch(e){n=r}else n=r;return n}
/**
   * Determines the TileSource Implementation by introspection of OpenSeadragon
   * namespace, calling each TileSource implementation of 'isType'
   * @private
   * @inner
   * @function
   * @param {Object|Array|Document} data - the tile source configuration object
   * @param {String} url - the url where the tile source configuration object was
   *      loaded from, if any.
   */t.TileSource.determineType=function(e,i,n){var r;for(r in OpenSeadragon)if(r.match(/.+TileSource$/)&&t.isFunction(OpenSeadragon[r])&&t.isFunction(OpenSeadragon[r].prototype.supports)&&OpenSeadragon[r].prototype.supports.call(e,i,n))return OpenSeadragon[r];t.console.error("No TileSource was able to open %s %s",n,i);return null}})(OpenSeadragon);(function(t){
/**
   * @class DziTileSource
   * @memberof OpenSeadragon
   * @extends OpenSeadragon.TileSource
   * @param {Number|Object} width - the pixel width of the image or the idiomatic
   *      options object which is used instead of positional arguments.
   * @param {Number} height
   * @param {Number} tileSize
   * @param {Number} tileOverlap
   * @param {String} tilesUrl
   * @param {String} fileFormat
   * @param {OpenSeadragon.DisplayRect[]} displayRects
   * @property {String} tilesUrl
   * @property {String} fileFormat
   * @property {OpenSeadragon.DisplayRect[]} displayRects
   */
t.DziTileSource=function(i,n,r,o,s,a,l,h,u){var c,d,p,g;g=t.isPlainObject(i)?i:{width:arguments[0],height:arguments[1],tileSize:arguments[2],tileOverlap:arguments[3],tilesUrl:arguments[4],fileFormat:arguments[5],displayRects:arguments[6],minLevel:arguments[7],maxLevel:arguments[8]};(this||e)._levelRects={};(this||e).tilesUrl=g.tilesUrl;(this||e).fileFormat=g.fileFormat;(this||e).displayRects=g.displayRects;if((this||e).displayRects)for(c=(this||e).displayRects.length-1;c>=0;c--){d=(this||e).displayRects[c];for(p=d.minLevel;p<=d.maxLevel;p++){(this||e)._levelRects[p]||((this||e)._levelRects[p]=[]);(this||e)._levelRects[p].push(d)}}t.TileSource.apply(this||e,[g])};t.extend(t.DziTileSource.prototype,t.TileSource.prototype,{
/**
     * Determine if the data and/or url imply the image service is supported by
     * this tile source.
     * @function
     * @param {Object|Array} data
     * @param {String} optional - url
     */
supports:function(e,t){var i;e.Image?i=e.Image.xmlns:e.documentElement&&("Image"!==e.documentElement.localName&&"Image"!==e.documentElement.tagName||(i=e.documentElement.namespaceURI));i=(i||"").toLowerCase();return i.indexOf("schemas.microsoft.com/deepzoom/2008")!==-1||i.indexOf("schemas.microsoft.com/deepzoom/2009")!==-1},
/**
     *
     * @function
     * @param {Object|XMLDocument} data - the raw configuration
     * @param {String} url - the url the data was retrieved from if any.
     * @param {String} postData - HTTP POST data in k=v&k2=v2... form or null
     * @returns {Object} options - A dictionary of keyword arguments sufficient
     *      to configure this tile sources constructor.
     */
configure:function(i,n,r){var o;o=t.isPlainObject(i)?configureFromObject(this||e,i):configureFromXML(this||e,i);if(n&&!o.tilesUrl){o.tilesUrl=n.replace(/([^/]+?)(\.(dzi|xml|js)?(\?[^/]*)?)?\/?$/,"$1_files/");n.search(/\.(dzi|xml|js)\?/)!==-1?o.queryParams=n.match(/\?.*/):o.queryParams=""}return o},
/**
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     */
getTileUrl:function(t,i,n){return[(this||e).tilesUrl,t,"/",i,"_",n,".",(this||e).fileFormat,(this||e).queryParams].join("")},
/**
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     */
tileExists:function(t,i,n){var r,o,s,a,l,h,u,c=(this||e)._levelRects[t];if((this||e).minLevel&&t<(this||e).minLevel||(this||e).maxLevel&&t>(this||e).maxLevel)return false;if(!c||!c.length)return true;for(u=c.length-1;u>=0;u--){r=c[u];if(!(t<r.minLevel||t>r.maxLevel)){o=this.getLevelScale(t);s=r.x*o;a=r.y*o;l=s+r.width*o;h=a+r.height*o;s=Math.floor(s/(this||e)._tileWidth);a=Math.floor(a/(this||e)._tileWidth);l=Math.ceil(l/(this||e)._tileWidth);h=Math.ceil(h/(this||e)._tileWidth);if(s<=i&&i<l&&a<=n&&n<h)return true}}return false}});function configureFromXML(e,i){if(!i||!i.documentElement)throw new Error(t.getString("Errors.Xml"));var n,r,o,s,a,l=i.documentElement,h=l.localName||l.tagName,u=i.documentElement.namespaceURI,c=null,d=[];if(h==="Image")try{s=l.getElementsByTagName("Size")[0];s===void 0&&(s=l.getElementsByTagNameNS(u,"Size")[0]);c={Image:{xmlns:"http://schemas.microsoft.com/deepzoom/2008",Url:l.getAttribute("Url"),Format:l.getAttribute("Format"),DisplayRect:null,Overlap:parseInt(l.getAttribute("Overlap"),10),TileSize:parseInt(l.getAttribute("TileSize"),10),Size:{Height:parseInt(s.getAttribute("Height"),10),Width:parseInt(s.getAttribute("Width"),10)}}};if(!t.imageFormatSupported(c.Image.Format))throw new Error(t.getString("Errors.ImageFormat",c.Image.Format.toUpperCase()));n=l.getElementsByTagName("DisplayRect");n===void 0&&(n=l.getElementsByTagNameNS(u,"DisplayRect")[0]);for(a=0;a<n.length;a++){r=n[a];o=r.getElementsByTagName("Rect")[0];o===void 0&&(o=r.getElementsByTagNameNS(u,"Rect")[0]);d.push({Rect:{X:parseInt(o.getAttribute("X"),10),Y:parseInt(o.getAttribute("Y"),10),Width:parseInt(o.getAttribute("Width"),10),Height:parseInt(o.getAttribute("Height"),10),MinLevel:parseInt(r.getAttribute("MinLevel"),10),MaxLevel:parseInt(r.getAttribute("MaxLevel"),10)}})}d.length&&(c.Image.DisplayRect=d);return configureFromObject(e,c)}catch(e){throw e instanceof Error?e:new Error(t.getString("Errors.Dzi"))}else{if(h==="Collection")throw new Error(t.getString("Errors.Dzc"));if(h==="Error"){var p=l.getElementsByTagName("Message")[0];var g=p.firstChild.nodeValue;throw new Error(g)}}throw new Error(t.getString("Errors.Dzi"))}function configureFromObject(e,i){var n,r,o=i.Image,s=o.Url,a=o.Format,l=o.Size,h=o.DisplayRect||[],u=parseInt(l.Width,10),c=parseInt(l.Height,10),d=parseInt(o.TileSize,10),p=parseInt(o.Overlap,10),g=[];for(r=0;r<h.length;r++){n=h[r].Rect;g.push(new t.DisplayRect(parseInt(n.X,10),parseInt(n.Y,10),parseInt(n.Width,10),parseInt(n.Height,10),parseInt(n.MinLevel,10),parseInt(n.MaxLevel,10)))}return t.extend(true,{width:u,height:c,tileSize:d,tileOverlap:p,minLevel:null,maxLevel:null,tilesUrl:s,fileFormat:a,displayRects:g},i)}})(OpenSeadragon);(function(t){
/**
   * @class IIIFTileSource
   * @classdesc A client implementation of the International Image Interoperability Framework
   * Format: Image API 1.0 - 2.1
   *
   * @memberof OpenSeadragon
   * @extends OpenSeadragon.TileSource
   * @see http://iiif.io/api/image/
   * @param {String} [options.tileFormat='jpg']
   *      The extension that will be used when requiring tiles.
   */
t.IIIFTileSource=function(i){t.extend(true,this||e,i);(this||e)._id=(this||e)["@id"]||(this||e).id||(this||e).identifier||null;if(!((this||e).height&&(this||e).width&&(this||e)._id))throw new Error("IIIF required parameters (width, height, or id) not provided.");i.tileSizePerScaleFactor={};(this||e).tileFormat=(this||e).tileFormat||"jpg";(this||e).version=i.version;if((this||e).tile_width&&(this||e).tile_height){i.tileWidth=(this||e).tile_width;i.tileHeight=(this||e).tile_height}else if((this||e).tile_width)i.tileSize=(this||e).tile_width;else if((this||e).tile_height)i.tileSize=(this||e).tile_height;else if((this||e).tiles)if((this||e).tiles.length===1){i.tileWidth=(this||e).tiles[0].width;i.tileHeight=(this||e).tiles[0].height||(this||e).tiles[0].width;(this||e).scale_factors=(this||e).tiles[0].scaleFactors}else{(this||e).scale_factors=[];for(var n=0;n<(this||e).tiles.length;n++)for(var r=0;r<(this||e).tiles[n].scaleFactors.length;r++){var o=(this||e).tiles[n].scaleFactors[r];(this||e).scale_factors.push(o);i.tileSizePerScaleFactor[o]={width:(this||e).tiles[n].width,height:(this||e).tiles[n].height||(this||e).tiles[n].width}}}else if(canBeTiled(i)){var s=Math.min((this||e).height,(this||e).width),a=[256,512,1024],l=[];for(var h=0;h<a.length;h++)a[h]<=s&&l.push(a[h]);l.length>0?i.tileSize=Math.max.apply(null,l):i.tileSize=s}else if((this||e).sizes&&(this||e).sizes.length>0){(this||e).emulateLegacyImagePyramid=true;i.levels=constructLevels(this||e);t.extend(true,i,{width:i.levels[i.levels.length-1].width,height:i.levels[i.levels.length-1].height,tileSize:Math.max(i.height,i.width),tileOverlap:0,minLevel:0,maxLevel:i.levels.length-1});(this||e).levels=i.levels}else t.console.error("Nothing in the info.json to construct image pyramids from");if(!i.maxLevel&&!(this||e).emulateLegacyImagePyramid)if((this||e).scale_factors){var u=Math.max.apply(null,(this||e).scale_factors);i.maxLevel=Math.round(Math.log(u)*Math.LOG2E)}else i.maxLevel=Number(Math.round(Math.log(Math.max((this||e).width,(this||e).height),2)));if((this||e).sizes){var c=(this||e).sizes.length;if(c===i.maxLevel||c===i.maxLevel+1){(this||e).levelSizes=(this||e).sizes.slice().sort(((e,t)=>e.width-t.width));c===i.maxLevel&&(this||e).levelSizes.push({width:(this||e).width,height:(this||e).height})}}t.TileSource.apply(this||e,[i])};t.extend(t.IIIFTileSource.prototype,t.TileSource.prototype,{
/**
     * Determine if the data and/or url imply the image service is supported by
     * this tile source.
     * @function
     * @param {Object|Array} data
     * @param {String} [url] - url
     */
supports:function(e,t){return!(!e.protocol||e.protocol!=="http://iiif.io/api/image")||(!(!e["@context"]||e["@context"]!=="http://library.stanford.edu/iiif/image-api/1.1/context.json"&&e["@context"]!=="http://iiif.io/api/image/1/context.json")||(!(!e.profile||e.profile.indexOf("http://library.stanford.edu/iiif/image-api/compliance.html")!==0)||(!!(e.identifier&&e.width&&e.height)||!(!e.documentElement||"info"!==e.documentElement.tagName||"http://library.stanford.edu/iiif/image-api/ns/"!==e.documentElement.namespaceURI))))},
/**
     * A static function used to prepare an incoming IIIF Image API info.json
     * response for processing by the tile handler. Normalizes data for all
     * versions of IIIF (1.0, 1.1, 2.x, 3.x) and returns a data object that
     * may be passed to the IIIFTileSource.
     *
     * @function
     * @static
     * @param {Object} data - the raw configuration
     * @param {String} url - the url configuration was retrieved from
     * @param {String} postData - HTTP POST data in k=v&k2=v2... form or null
     * @returns {Object} A normalized IIIF data object
     * @example <caption>IIIF 2.x Info Looks like this</caption>
     * {
     * "@context": "http://iiif.io/api/image/2/context.json",
     * "@id": "http://iiif.example.com/prefix/1E34750D-38DB-4825-A38A-B60A345E591C",
     * "protocol": "http://iiif.io/api/image",
     * "height": 1024,
     * "width": 775,
     * "tiles" : [{"width":256, "scaleFactors":[1,2,4,8]}],
     *  "profile": ["http://iiif.io/api/image/2/level1.json", {
     *    "qualities": [ "native", "bitonal", "grey", "color" ],
     *    "formats": [ "jpg", "png", "gif" ]
     *   }]
     * }
     */
configure:function(e,i,n){if(t.isPlainObject(e)){if(e["@context"]){var r=e["@context"];if(Array.isArray(r))for(var o=0;o<r.length;o++)if(typeof r[o]==="string"&&(/^http:\/\/iiif\.io\/api\/image\/[1-3]\/context\.json$/.test(r[o])||r[o]==="http://library.stanford.edu/iiif/image-api/1.1/context.json")){r=r[o];break}switch(r){case"http://iiif.io/api/image/1/context.json":case"http://library.stanford.edu/iiif/image-api/1.1/context.json":e.version=1;break;case"http://iiif.io/api/image/2/context.json":e.version=2;break;case"http://iiif.io/api/image/3/context.json":e.version=3;break;default:t.console.error("Data has a @context property which contains no known IIIF context URI.")}}else{e["@context"]="http://iiif.io/api/image/1.0/context.json";e["@id"]=i.replace("/info.json","");e.version=1}if(e.preferredFormats)for(var s=0;s<e.preferredFormats.length;s++)if(OpenSeadragon.imageFormatSupported(e.preferredFormats[s])){e.tileFormat=e.preferredFormats[s];break}return e}var a=configureFromXml10(e);a["@context"]="http://iiif.io/api/image/1.0/context.json";a["@id"]=i.replace("/info.xml","");a.version=1;return a},
/**
     * Return the tileWidth for the given level.
     * @function
     * @param {Number} level
     */
getTileWidth:function(i){if((this||e).emulateLegacyImagePyramid)return t.TileSource.prototype.getTileWidth.call(this||e,i);var n=Math.pow(2,(this||e).maxLevel-i);return(this||e).tileSizePerScaleFactor&&(this||e).tileSizePerScaleFactor[n]?(this||e).tileSizePerScaleFactor[n].width:(this||e)._tileWidth},
/**
     * Return the tileHeight for the given level.
     * @function
     * @param {Number} level
     */
getTileHeight:function(i){if((this||e).emulateLegacyImagePyramid)return t.TileSource.prototype.getTileHeight.call(this||e,i);var n=Math.pow(2,(this||e).maxLevel-i);return(this||e).tileSizePerScaleFactor&&(this||e).tileSizePerScaleFactor[n]?(this||e).tileSizePerScaleFactor[n].height:(this||e)._tileHeight},
/**
     * @function
     * @param {Number} level
     */
getLevelScale:function(i){if((this||e).emulateLegacyImagePyramid){var n=NaN;(this||e).levels.length>0&&i>=(this||e).minLevel&&i<=(this||e).maxLevel&&(n=(this||e).levels[i].width/(this||e).levels[(this||e).maxLevel].width);return n}return t.TileSource.prototype.getLevelScale.call(this||e,i)},
/**
     * @function
     * @param {Number} level
     */
getNumTiles:function(i){if((this||e).emulateLegacyImagePyramid){var n=this.getLevelScale(i);return n?new t.Point(1,1):new t.Point(0,0)}if((this||e).levelSizes){var r=(this||e).levelSizes[i];var o=Math.ceil(r.width/this.getTileWidth(i)),s=Math.ceil(r.height/this.getTileHeight(i));return new t.Point(o,s)}return t.TileSource.prototype.getNumTiles.call(this||e,i)},
/**
     * @function
     * @param {Number} level
     * @param {OpenSeadragon.Point} point
     */
getTileAtPoint:function(i,n){if((this||e).emulateLegacyImagePyramid)return new t.Point(0,0);if((this||e).levelSizes){var r=n.x>=0&&n.x<=1&&n.y>=0&&n.y<=1/(this||e).aspectRatio;t.console.assert(r,"[TileSource.getTileAtPoint] must be called with a valid point.");var o=(this||e).levelSizes[i].width;var s=n.x*o;var a=n.y*o;var l=Math.floor(s/this.getTileWidth(i));var h=Math.floor(a/this.getTileHeight(i));n.x>=1&&(l=this.getNumTiles(i).x-1);var u=1e-15;n.y>=1/(this||e).aspectRatio-u&&(h=this.getNumTiles(i).y-1);return new t.Point(l,h)}return t.TileSource.prototype.getTileAtPoint.call(this||e,i,n)},
/**
     * Responsible for retrieving the url which will return an image for the
     * region specified by the given x, y, and level components.
     * @function
     * @param {Number} level - z index
     * @param {Number} x
     * @param {Number} y
     * @throws {Error}
     */
getTileUrl:function(t,i,n){if((this||e).emulateLegacyImagePyramid){var r=null;(this||e).levels.length>0&&t>=(this||e).minLevel&&t<=(this||e).maxLevel&&(r=(this||e).levels[t].url);return r}var o,s,a,l,h,u,c,d,p,g,v,m,f,y,w,T,x="0",_=Math.pow(.5,(this||e).maxLevel-t);if((this||e).levelSizes){o=(this||e).levelSizes[t].width;s=(this||e).levelSizes[t].height}else{o=Math.ceil((this||e).width*_);s=Math.ceil((this||e).height*_)}a=this.getTileWidth(t);l=this.getTileHeight(t);h=Math.round(a/_);u=Math.round(l/_);w=(this||e).version===1?"native."+(this||e).tileFormat:"default."+(this||e).tileFormat;if(o<a&&s<l){m=(this||e).version===2&&o===(this||e).width?"full":(this||e).version===3&&o===(this||e).width&&s===(this||e).height?"max":(this||e).version===3?o+","+s:o+",";c="full"}else{d=i*h;p=n*u;g=Math.min(h,(this||e).width-d);v=Math.min(u,(this||e).height-p);c=i===0&&n===0&&g===(this||e).width&&v===(this||e).height?"full":[d,p,g,v].join(",");f=Math.min(a,o-i*a);y=Math.min(l,s-n*l);m=(this||e).version===2&&f===(this||e).width?"full":(this||e).version===3&&f===(this||e).width&&y===(this||e).height?"max":(this||e).version===3?f+","+y:f+","}T=[(this||e)._id,c,m,x,w].join("/");return T},__testonly__:{canBeTiled:canBeTiled,constructLevels:constructLevels}});
/**
   * Determine whether arbitrary tile requests can be made against a service with the given profile
   * @function
   * @param {Object} options
   * @param {Array|String} options.profile
   * @param {Number} options.version
   * @param {String[]} options.extraFeatures
   * @returns {Boolean}
   */function canBeTiled(e){var t=["http://library.stanford.edu/iiif/image-api/compliance.html#level0","http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level0","http://iiif.io/api/image/2/level0.json","level0","https://iiif.io/api/image/3/level0.json"];var i=Array.isArray(e.profile)?e.profile[0]:e.profile;var n=t.indexOf(i)!==-1;var r=false;e.version===2&&e.profile.length>1&&e.profile[1].supports&&(r=e.profile[1].supports.indexOf("sizeByW")!==-1);e.version===3&&e.extraFeatures&&(r=e.extraFeatures.indexOf("sizeByWh")!==-1);return!n||r}
/**
   * Build the legacy pyramid URLs (one tile per level)
   * @function
   * @param {object} options - infoJson
   * @throws {Error}
   */function constructLevels(e){var t=[];for(var i=0;i<e.sizes.length;i++)t.push({url:e._id+"/full/"+e.sizes[i].width+","+(e.version===3?e.sizes[i].height:"")+"/0/default."+e.tileFormat,width:e.sizes[i].width,height:e.sizes[i].height});return t.sort((function(e,t){return e.width-t.width}))}function configureFromXml10(e){if(!e||!e.documentElement)throw new Error(t.getString("Errors.Xml"));var i=e.documentElement,n=i.tagName,r=null;if(n==="info")try{r={};parseXML10(i,r);return r}catch(e){throw e instanceof Error?e:new Error(t.getString("Errors.IIIF"))}throw new Error(t.getString("Errors.IIIF"))}function parseXML10(e,i,n){var r,o;if(e.nodeType===3&&n){o=e.nodeValue.trim();o.match(/^\d*$/)&&(o=Number(o));if(i[n]){t.isArray(i[n])||(i[n]=[i[n]]);i[n].push(o)}else i[n]=o}else if(e.nodeType===1)for(r=0;r<e.childNodes.length;r++)parseXML10(e.childNodes[r],i,e.nodeName)}})(OpenSeadragon);(function(t){
/**
   * @class OsmTileSource
   * @classdesc A tilesource implementation for OpenStreetMap.<br><br>
   *
   * Note 1. Zoomlevels. Deep Zoom and OSM define zoom levels differently. In  Deep
   * Zoom, level 0 equals an image of 1x1 pixels. In OSM, level 0 equals an image of
   * 256x256 levels (see http://gasi.ch/blog/inside-deep-zoom-2). I.e. there is a
   * difference of log2(256)=8 levels.<br><br>
   *
   * Note 2. Image dimension. According to the OSM Wiki
   * (http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Zoom_levels)
   * the highest Mapnik zoom level has 256.144x256.144 tiles, with a 256x256
   * pixel size. I.e. the Deep Zoom image dimension is 65.572.864x65.572.864
   * pixels.
   *
   * @memberof OpenSeadragon
   * @extends OpenSeadragon.TileSource
   * @param {Number|Object} width - the pixel width of the image or the idiomatic
   *      options object which is used instead of positional arguments.
   * @param {Number} height
   * @param {Number} tileSize
   * @param {Number} tileOverlap
   * @param {String} tilesUrl
   */
t.OsmTileSource=function(i,n,r,o,s){var a;a=t.isPlainObject(i)?i:{width:arguments[0],height:arguments[1],tileSize:arguments[2],tileOverlap:arguments[3],tilesUrl:arguments[4]};if(!a.width||!a.height){a.width=65572864;a.height=65572864}if(!a.tileSize){a.tileSize=256;a.tileOverlap=0}a.tilesUrl||(a.tilesUrl="http://tile.openstreetmap.org/");a.minLevel=8;t.TileSource.apply(this||e,[a])};t.extend(t.OsmTileSource.prototype,t.TileSource.prototype,{
/**
     * Determine if the data and/or url imply the image service is supported by
     * this tile source.
     * @function
     * @param {Object|Array} data
     * @param {String} optional - url
     */
supports:function(e,t){return e.type&&"openstreetmaps"===e.type},
/**
     *
     * @function
     * @param {Object} data - the raw configuration
     * @param {String} url - the url the data was retrieved from if any.
     * @param {String} postData - HTTP POST data in k=v&k2=v2... form or null
     * @returns {Object} options - A dictionary of keyword arguments sufficient
     *      to configure this tile sources constructor.
     */
configure:function(e,t,i){return e},
/**
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     */
getTileUrl:function(t,i,n){return(this||e).tilesUrl+(t-8)+"/"+i+"/"+n+".png"}})})(OpenSeadragon);(function(t){
/**
   * @class TmsTileSource
   * @classdesc A tilesource implementation for Tiled Map Services (TMS).
   * TMS tile scheme ( [ as supported by OpenLayers ] is described here
   * ( http://openlayers.org/dev/examples/tms.html ).
   *
   * @memberof OpenSeadragon
   * @extends OpenSeadragon.TileSource
   * @param {Number|Object} width - the pixel width of the image or the idiomatic
   *      options object which is used instead of positional arguments.
   * @param {Number} height
   * @param {Number} tileSize
   * @param {Number} tileOverlap
   * @param {String} tilesUrl
   */
t.TmsTileSource=function(i,n,r,o,s){var a;a=t.isPlainObject(i)?i:{width:arguments[0],height:arguments[1],tileSize:arguments[2],tileOverlap:arguments[3],tilesUrl:arguments[4]};var l,h=Math.ceil(a.width/256)*256,u=Math.ceil(a.height/256)*256;l=h>u?h/256:u/256;a.maxLevel=Math.ceil(Math.log(l)/Math.log(2))-1;a.tileSize=256;a.width=h;a.height=u;t.TileSource.apply(this||e,[a])};t.extend(t.TmsTileSource.prototype,t.TileSource.prototype,{
/**
     * Determine if the data and/or url imply the image service is supported by
     * this tile source.
     * @function
     * @param {Object|Array} data
     * @param {String} optional - url
     */
supports:function(e,t){return e.type&&"tiledmapservice"===e.type},
/**
     *
     * @function
     * @param {Object} data - the raw configuration
     * @param {String} url - the url the data was retrieved from if any.
     * @param {String} postData - HTTP POST data in k=v&k2=v2... form or null
     * @returns {Object} options - A dictionary of keyword arguments sufficient
     *      to configure this tile sources constructor.
     */
configure:function(e,t,i){return e},
/**
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     */
getTileUrl:function(t,i,n){var r=this.getNumTiles(t).y-1;return(this||e).tilesUrl+t+"/"+i+"/"+(r-n)+".png"}})})(OpenSeadragon);(function(t){
/**
   * @class ZoomifyTileSource
   * @classdesc A tilesource implementation for the zoomify format.
   *
   * A description of the format can be found here:
   * https://ecommons.cornell.edu/bitstream/handle/1813/5410/Introducing_Zoomify_Image.pdf
   *
   * There are two ways of creating a zoomify tilesource for openseadragon
   *
   * 1) Supplying all necessary information in the tilesource object. A minimal example object for this method looks like this:
   *
   * {
   *      type: "zoomifytileservice",
   *      width: 1000,
   *      height: 1000,
   *      tilesUrl: "/test/data/zoomify/"
   * }
   *
   * The tileSize is set to 256 (the usual Zoomify default) when it is not defined. The tileUrl must the path to the image _directory_.
   *
   * 2) Loading image metadata from xml file: (CURRENTLY NOT SUPPORTED)
   *
   * When creating zoomify formatted images one "xml" like file with name ImageProperties.xml
   * will be created as well. Here is an example of such a file:
   *
   * <IMAGE_PROPERTIES WIDTH="1000" HEIGHT="1000" NUMTILES="21" NUMIMAGES="1" VERSION="1.8" TILESIZE="256" />
   *
   * To use this xml file as metadata source you must supply the path to the ImageProperties.xml file and leave out all other parameters:
   * As stated above, this method of loading a zoomify tilesource is currently not supported
   *
   * {
   *      type: "zoomifytileservice",
   *      tilesUrl: "/test/data/zoomify/ImageProperties.xml"
   * }
   *
  * @memberof OpenSeadragon
   * @extends OpenSeadragon.TileSource
   * @param {Number} width - the pixel width of the image.
   * @param {Number} height
   * @param {Number} tileSize
   * @param {String} tilesUrl
   */
t.ZoomifyTileSource=function(t){typeof t.tileSize==="undefined"&&(t.tileSize=256);if(typeof t.fileFormat==="undefined"){t.fileFormat="jpg";(this||e).fileFormat=t.fileFormat}var i={x:t.width,y:t.height};t.imageSizes=[{x:t.width,y:t.height}];t.gridSize=[this._getGridSize(t.width,t.height,t.tileSize)];while(parseInt(i.x,10)>t.tileSize||parseInt(i.y,10)>t.tileSize){i.x=Math.floor(i.x/2);i.y=Math.floor(i.y/2);t.imageSizes.push({x:i.x,y:i.y});t.gridSize.push(this._getGridSize(i.x,i.y,t.tileSize))}t.imageSizes.reverse();t.gridSize.reverse();t.minLevel=0;t.maxLevel=t.gridSize.length-1;OpenSeadragon.TileSource.apply(this||e,[t])};t.extend(t.ZoomifyTileSource.prototype,t.TileSource.prototype,{_getGridSize:function(e,t,i){return{x:Math.ceil(e/i),y:Math.ceil(t/i)}},_calculateAbsoluteTileNumber:function(t,i,n){var r=0;var o={};for(var s=0;s<t;s++){o=(this||e).gridSize[s];r+=o.x*o.y}o=(this||e).gridSize[t];r+=o.x*n+i;return r},
/**
     * Determine if the data and/or url imply the image service is supported by
     * this tile source.
     * @function
     * @param {Object|Array} data
     * @param {String} optional - url
     */
supports:function(e,t){return e.type&&"zoomifytileservice"===e.type},
/**
     *
     * @function
     * @param {Object} data - the raw configuration
     * @param {String} url - the url the data was retrieved from if any.
     * @param {String} postData - HTTP POST data in k=v&k2=v2... form or null
     * @returns {Object} options - A dictionary of keyword arguments sufficient
     *      to configure this tile sources constructor.
     */
configure:function(e,t,i){return e},
/**
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     */
getTileUrl:function(t,i,n){var r=0;var o=this._calculateAbsoluteTileNumber(t,i,n);r=Math.floor(o/256);return(this||e).tilesUrl+"TileGroup"+r+"/"+t+"-"+i+"-"+n+"."+(this||e).fileFormat}})})(OpenSeadragon);(function(t){
/**
   * @class LegacyTileSource
   * @classdesc The LegacyTileSource allows simple, traditional image pyramids to be loaded
   * into an OpenSeadragon Viewer.  Basically, this translates to the historically
   * common practice of starting with a 'master' image, maybe a tiff for example,
   * and generating a set of 'service' images like one or more thumbnails, a medium
   * resolution image and a high resolution image in standard web formats like
   * png or jpg.
   *
   * @memberof OpenSeadragon
   * @extends OpenSeadragon.TileSource
   * @param {Array} levels An array of file descriptions, each is an object with
   *      a 'url', a 'width', and a 'height'.  Overriding classes can expect more
   *      properties but these properties are sufficient for this implementation.
   *      Additionally, the levels are required to be listed in order from
   *      smallest to largest.
   * @property {Number} aspectRatio
   * @property {Number} dimensions
   * @property {Number} tileSize
   * @property {Number} tileOverlap
   * @property {Number} minLevel
   * @property {Number} maxLevel
   * @property {Array}  levels
   */
t.LegacyTileSource=function(i){var n,r,o;t.isArray(i)&&(n={type:"legacy-image-pyramid",levels:i});n.levels=filterFiles(n.levels);if(n.levels.length>0){r=n.levels[n.levels.length-1].width;o=n.levels[n.levels.length-1].height}else{r=0;o=0;t.console.error("No supported image formats found")}t.extend(true,n,{width:r,height:o,tileSize:Math.max(o,r),tileOverlap:0,minLevel:0,maxLevel:n.levels.length>0?n.levels.length-1:0});t.TileSource.apply(this||e,[n]);(this||e).levels=n.levels};t.extend(t.LegacyTileSource.prototype,t.TileSource.prototype,{
/**
     * Determine if the data and/or url imply the image service is supported by
     * this tile source.
     * @function
     * @param {Object|Array} data
     * @param {String} optional - url
     */
supports:function(e,t){return e.type&&"legacy-image-pyramid"===e.type||e.documentElement&&"legacy-image-pyramid"===e.documentElement.getAttribute("type")},
/**
     *
     * @function
     * @param {Object|XMLDocument} configuration - the raw configuration
     * @param {String} dataUrl - the url the data was retrieved from if any.
     * @param {String} postData - HTTP POST data in k=v&k2=v2... form or null
     * @returns {Object} options - A dictionary of keyword arguments sufficient
     *      to configure this tile sources constructor.
     */
configure:function(i,n,r){var o;o=t.isPlainObject(i)?configureFromObject(this||e,i):configureFromXML(this||e,i);return o},
/**
     * @function
     * @param {Number} level
     */
getLevelScale:function(t){var i=NaN;(this||e).levels.length>0&&t>=(this||e).minLevel&&t<=(this||e).maxLevel&&(i=(this||e).levels[t].width/(this||e).levels[(this||e).maxLevel].width);return i},
/**
     * @function
     * @param {Number} level
     */
getNumTiles:function(e){var i=this.getLevelScale(e);return i?new t.Point(1,1):new t.Point(0,0)},
/**
     * This method is not implemented by this class other than to throw an Error
     * announcing you have to implement it.  Because of the variety of tile
     * server technologies, and various specifications for building image
     * pyramids, this method is here to allow easy integration.
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     * @throws {Error}
     */
getTileUrl:function(t,i,n){var r=null;(this||e).levels.length>0&&t>=(this||e).minLevel&&t<=(this||e).maxLevel&&(r=(this||e).levels[t].url);return r}});function filterFiles(e){var i,n,r=[];for(n=0;n<e.length;n++){i=e[n];i.height&&i.width&&i.url?r.push({url:i.url,width:Number(i.width),height:Number(i.height)}):t.console.error("Unsupported image format: %s",i.url?i.url:"<no URL>")}return r.sort((function(e,t){return e.height-t.height}))}function configureFromXML(e,i){if(!i||!i.documentElement)throw new Error(t.getString("Errors.Xml"));var n,r,o=i.documentElement,s=o.tagName,a=null,l=[];if(s==="image")try{a={type:o.getAttribute("type"),levels:[]};l=o.getElementsByTagName("level");for(r=0;r<l.length;r++){n=l[r];a.levels.push({url:n.getAttribute("url"),width:parseInt(n.getAttribute("width"),10),height:parseInt(n.getAttribute("height"),10)})}return configureFromObject(e,a)}catch(e){throw e instanceof Error?e:new Error("Unknown error parsing Legacy Image Pyramid XML.")}else{if(s==="collection")throw new Error("Legacy Image Pyramid Collections not yet supported.");if(s==="error")throw new Error("Error: "+i)}throw new Error("Unknown element "+s)}function configureFromObject(e,t){return t.levels}})(OpenSeadragon);(function(t){
/**
   * @class ImageTileSource
   * @classdesc The ImageTileSource allows a simple image to be loaded
   * into an OpenSeadragon Viewer.
   * There are 2 ways to open an ImageTileSource:
   * 1. viewer.open({type: 'image', url: fooUrl});
   * 2. viewer.open(new OpenSeadragon.ImageTileSource({url: fooUrl}));
   *
   * With the first syntax, the crossOriginPolicy and ajaxWithCredentials
   * options are inherited from the viewer if they are not
   * specified directly in the options object.
   *
   * @memberof OpenSeadragon
   * @extends OpenSeadragon.TileSource
   * @param {Object} options Options object.
   * @param {String} options.url URL of the image
   * @param {Boolean} [options.buildPyramid=true] If set to true (default), a
   * pyramid will be built internally to provide a better downsampling.
   * @param {String|Boolean} [options.crossOriginPolicy=false] Valid values are
   * 'Anonymous', 'use-credentials', and false. If false, image requests will
   * not use CORS preventing internal pyramid building for images from other
   * domains.
   * @param {String|Boolean} [options.ajaxWithCredentials=false] Whether to set
   * the withCredentials XHR flag for AJAX requests (when loading tile sources).
   */
t.ImageTileSource=function(i){i=t.extend({buildPyramid:true,crossOriginPolicy:false,ajaxWithCredentials:false},i);t.TileSource.apply(this||e,[i])};t.extend(t.ImageTileSource.prototype,t.TileSource.prototype,{
/**
     * Determine if the data and/or url imply the image service is supported by
     * this tile source.
     * @function
     * @param {Object|Array} data
     * @param {String} optional - url
     */
supports:function(e,t){return e.type&&e.type==="image"},
/**
     *
     * @function
     * @param {Object} options - the options
     * @param {String} dataUrl - the url the image was retrieved from, if any.
     * @param {String} postData - HTTP POST data in k=v&k2=v2... form or null
     * @returns {Object} options - A dictionary of keyword arguments sufficient
     *      to configure this tile sources constructor.
     */
configure:function(e,t,i){return e},
/**
     * Responsible for retrieving, and caching the
     * image metadata pertinent to this TileSources implementation.
     * @function
     * @param {String} url
     * @throws {Error}
     */
getImageInfo:function(i){var n=(this||e)._image=new Image;var r=this||e;(this||e).crossOriginPolicy&&(n.crossOrigin=(this||e).crossOriginPolicy);(this||e).ajaxWithCredentials&&(n.useCredentials=(this||e).ajaxWithCredentials);t.addEvent(n,"load",(function(){r.width=n.naturalWidth;r.height=n.naturalHeight;r.aspectRatio=r.width/r.height;r.dimensions=new t.Point(r.width,r.height);r._tileWidth=r.width;r._tileHeight=r.height;r.tileOverlap=0;r.minLevel=0;r.levels=r._buildLevels();r.maxLevel=r.levels.length-1;r.ready=true;r.raiseEvent("ready",{tileSource:r})}));t.addEvent(n,"error",(function(){r.raiseEvent("open-failed",{message:"Error loading image at "+i,source:i})}));n.src=i},
/**
     * @function
     * @param {Number} level
     */
getLevelScale:function(t){var i=NaN;t>=(this||e).minLevel&&t<=(this||e).maxLevel&&(i=(this||e).levels[t].width/(this||e).levels[(this||e).maxLevel].width);return i},
/**
     * @function
     * @param {Number} level
     */
getNumTiles:function(e){var i=this.getLevelScale(e);return i?new t.Point(1,1):new t.Point(0,0)},
/**
     * Retrieves a tile url
     * @function
     * @param {Number} level Level of the tile
     * @param {Number} x x coordinate of the tile
     * @param {Number} y y coordinate of the tile
     */
getTileUrl:function(t,i,n){var r=null;t>=(this||e).minLevel&&t<=(this||e).maxLevel&&(r=(this||e).levels[t].url);return r},
/**
     * Retrieves a tile context 2D
     * @function
     * @param {Number} level Level of the tile
     * @param {Number} x x coordinate of the tile
     * @param {Number} y y coordinate of the tile
     */
getContext2D:function(t,i,n){var r=null;t>=(this||e).minLevel&&t<=(this||e).maxLevel&&(r=(this||e).levels[t].context2D);return r},
/**
     * Destroys ImageTileSource
     * @function
     * @param {OpenSeadragon.Viewer} viewer the viewer that is calling
     * destroy on the ImageTileSource
     */
destroy:function(e){this._freeupCanvasMemory(e)},_buildLevels:function(){var i=[{url:(this||e)._image.src,width:(this||e)._image.naturalWidth,height:(this||e)._image.naturalHeight}];if(!(this||e).buildPyramid||!t.supportsCanvas){delete(this||e)._image;return i}var n=(this||e)._image.naturalWidth;var r=(this||e)._image.naturalHeight;var o=document.createElement("canvas");var s=o.getContext("2d");o.width=n;o.height=r;s.drawImage((this||e)._image,0,0,n,r);i[0].context2D=s;delete(this||e)._image;if(t.isCanvasTainted(o))return i;while(n>=2&&r>=2){n=Math.floor(n/2);r=Math.floor(r/2);var a=document.createElement("canvas");var l=a.getContext("2d");a.width=n;a.height=r;l.drawImage(o,0,0,n,r);i.splice(0,0,{context2D:l,width:n,height:r});o=a;s=l}return i},_freeupCanvasMemory:function(t){for(var i=0;i<(this||e).levels.length;i++)if((this||e).levels[i].context2D){(this||e).levels[i].context2D.canvas.height=0;(this||e).levels[i].context2D.canvas.width=0;t&&
/**
            * Triggered when an image has just been unloaded
            *
            * @event image-unloaded
            * @memberof OpenSeadragon.Viewer
            * @type {object}
            * @property {CanvasRenderingContext2D} context2D - The context that is being unloaded
            * @private
            */
t.raiseEvent("image-unloaded",{context2D:(this||e).levels[i].context2D})}}})})(OpenSeadragon);(function(e){e.TileSourceCollection=function(t,i,n,r){e.console.error("TileSourceCollection is deprecated; use World instead")}})(OpenSeadragon);(function(t){
/**
   * An enumeration of button states
   * @member ButtonState
   * @memberof OpenSeadragon
   * @static
   * @type {Object}
   * @property {Number} REST
   * @property {Number} GROUP
   * @property {Number} HOVER
   * @property {Number} DOWN
   */
t.ButtonState={REST:0,GROUP:1,HOVER:2,DOWN:3};
/**
   * @class Button
   * @classdesc Manages events, hover states for individual buttons, tool-tips, as well
   * as fading the buttons out when the user has not interacted with them
   * for a specified period.
   *
   * @memberof OpenSeadragon
   * @extends OpenSeadragon.EventSource
   * @param {Object} options
   * @param {Element} [options.element=null] Element to use as the button. If not specified, an HTML &lt;div&gt; element is created.
   * @param {String} [options.tooltip=null] Provides context help for the button when the
   *  user hovers over it.
   * @param {String} [options.srcRest=null] URL of image to use in 'rest' state.
   * @param {String} [options.srcGroup=null] URL of image to use in 'up' state.
   * @param {String} [options.srcHover=null] URL of image to use in 'hover' state.
   * @param {String} [options.srcDown=null] URL of image to use in 'down' state.
   * @param {Number} [options.fadeDelay=0] How long to wait before fading.
   * @param {Number} [options.fadeLength=2000] How long should it take to fade the button.
   * @param {OpenSeadragon.EventHandler} [options.onPress=null] Event handler callback for {@link OpenSeadragon.Button.event:press}.
   * @param {OpenSeadragon.EventHandler} [options.onRelease=null] Event handler callback for {@link OpenSeadragon.Button.event:release}.
   * @param {OpenSeadragon.EventHandler} [options.onClick=null] Event handler callback for {@link OpenSeadragon.Button.event:click}.
   * @param {OpenSeadragon.EventHandler} [options.onEnter=null] Event handler callback for {@link OpenSeadragon.Button.event:enter}.
   * @param {OpenSeadragon.EventHandler} [options.onExit=null] Event handler callback for {@link OpenSeadragon.Button.event:exit}.
   * @param {OpenSeadragon.EventHandler} [options.onFocus=null] Event handler callback for {@link OpenSeadragon.Button.event:focus}.
   * @param {OpenSeadragon.EventHandler} [options.onBlur=null] Event handler callback for {@link OpenSeadragon.Button.event:blur}.
   * @param {Object} [options.userData=null] Arbitrary object to be passed unchanged to any attached handler methods.
   */t.Button=function(i){var n=this||e;t.EventSource.call(this||e);t.extend(true,this||e,{tooltip:null,srcRest:null,srcGroup:null,srcHover:null,srcDown:null,clickTimeThreshold:t.DEFAULT_SETTINGS.clickTimeThreshold,clickDistThreshold:t.DEFAULT_SETTINGS.clickDistThreshold,fadeDelay:0,fadeLength:2e3,onPress:null,onRelease:null,onClick:null,onEnter:null,onExit:null,onFocus:null,onBlur:null,userData:null},i);(this||e).element=i.element||t.makeNeutralElement("div");if(!i.element){(this||e).imgRest=t.makeTransparentImage((this||e).srcRest);(this||e).imgGroup=t.makeTransparentImage((this||e).srcGroup);(this||e).imgHover=t.makeTransparentImage((this||e).srcHover);(this||e).imgDown=t.makeTransparentImage((this||e).srcDown);(this||e).imgRest.alt=(this||e).imgGroup.alt=(this||e).imgHover.alt=(this||e).imgDown.alt=(this||e).tooltip;t.setElementPointerEventsNone((this||e).imgRest);t.setElementPointerEventsNone((this||e).imgGroup);t.setElementPointerEventsNone((this||e).imgHover);t.setElementPointerEventsNone((this||e).imgDown);(this||e).element.style.position="relative";t.setElementTouchActionNone((this||e).element);(this||e).imgGroup.style.position=(this||e).imgHover.style.position=(this||e).imgDown.style.position="absolute";(this||e).imgGroup.style.top=(this||e).imgHover.style.top=(this||e).imgDown.style.top="0px";(this||e).imgGroup.style.left=(this||e).imgHover.style.left=(this||e).imgDown.style.left="0px";(this||e).imgHover.style.visibility=(this||e).imgDown.style.visibility="hidden";(this||e).element.appendChild((this||e).imgRest);(this||e).element.appendChild((this||e).imgGroup);(this||e).element.appendChild((this||e).imgHover);(this||e).element.appendChild((this||e).imgDown)}this.addHandler("press",(this||e).onPress);this.addHandler("release",(this||e).onRelease);this.addHandler("click",(this||e).onClick);this.addHandler("enter",(this||e).onEnter);this.addHandler("exit",(this||e).onExit);this.addHandler("focus",(this||e).onFocus);this.addHandler("blur",(this||e).onBlur);(this||e).currentState=t.ButtonState.GROUP;(this||e).fadeBeginTime=null;(this||e).shouldFade=false;(this||e).element.style.display="inline-block";(this||e).element.style.position="relative";(this||e).element.title=(this||e).tooltip;(this||e).tracker=new t.MouseTracker({userData:"Button.tracker",element:(this||e).element,clickTimeThreshold:(this||e).clickTimeThreshold,clickDistThreshold:(this||e).clickDistThreshold,enterHandler:function(e){if(e.insideElementPressed){inTo(n,t.ButtonState.DOWN);
/**
           * Raised when the cursor enters the Button element.
           *
           * @event enter
           * @memberof OpenSeadragon.Button
           * @type {object}
           * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
           * @property {Object} originalEvent - The original DOM event.
           * @property {?Object} userData - Arbitrary subscriber-defined object.
           */n.raiseEvent("enter",{originalEvent:e.originalEvent})}else e.buttonDownAny||inTo(n,t.ButtonState.HOVER)},focusHandler:function(e){n.tracker.enterHandler(e);
/**
         * Raised when the Button element receives focus.
         *
         * @event focus
         * @memberof OpenSeadragon.Button
         * @type {object}
         * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
         * @property {Object} originalEvent - The original DOM event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */n.raiseEvent("focus",{originalEvent:e.originalEvent})},leaveHandler:function(e){outTo(n,t.ButtonState.GROUP);e.insideElementPressed&&
/**
           * Raised when the cursor leaves the Button element.
           *
           * @event exit
           * @memberof OpenSeadragon.Button
           * @type {object}
           * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
           * @property {Object} originalEvent - The original DOM event.
           * @property {?Object} userData - Arbitrary subscriber-defined object.
           */
n.raiseEvent("exit",{originalEvent:e.originalEvent})},blurHandler:function(e){n.tracker.leaveHandler(e);
/**
         * Raised when the Button element loses focus.
         *
         * @event blur
         * @memberof OpenSeadragon.Button
         * @type {object}
         * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
         * @property {Object} originalEvent - The original DOM event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */n.raiseEvent("blur",{originalEvent:e.originalEvent})},pressHandler:function(e){inTo(n,t.ButtonState.DOWN);
/**
         * Raised when a mouse button is pressed or touch occurs in the Button element.
         *
         * @event press
         * @memberof OpenSeadragon.Button
         * @type {object}
         * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
         * @property {Object} originalEvent - The original DOM event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */n.raiseEvent("press",{originalEvent:e.originalEvent})},releaseHandler:function(e){if(e.insideElementPressed&&e.insideElementReleased){outTo(n,t.ButtonState.HOVER);
/**
           * Raised when the mouse button is released or touch ends in the Button element.
           *
           * @event release
           * @memberof OpenSeadragon.Button
           * @type {object}
           * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
           * @property {Object} originalEvent - The original DOM event.
           * @property {?Object} userData - Arbitrary subscriber-defined object.
           */n.raiseEvent("release",{originalEvent:e.originalEvent})}else e.insideElementPressed?outTo(n,t.ButtonState.GROUP):inTo(n,t.ButtonState.HOVER)},clickHandler:function(e){e.quick&&
/**
           * Raised when a mouse button is pressed and released or touch is initiated and ended in the Button element within the time and distance threshold.
           *
           * @event click
           * @memberof OpenSeadragon.Button
           * @type {object}
           * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
           * @property {Object} originalEvent - The original DOM event.
           * @property {?Object} userData - Arbitrary subscriber-defined object.
           */
n.raiseEvent("click",{originalEvent:e.originalEvent})},keyHandler:function(e){if(13===e.keyCode){
/***
           * Raised when a mouse button is pressed and released or touch is initiated and ended in the Button element within the time and distance threshold.
           *
           * @event click
           * @memberof OpenSeadragon.Button
           * @type {object}
           * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
           * @property {Object} originalEvent - The original DOM event.
           * @property {?Object} userData - Arbitrary subscriber-defined object.
           */
n.raiseEvent("click",{originalEvent:e.originalEvent});
/***
           * Raised when the mouse button is released or touch ends in the Button element.
           *
           * @event release
           * @memberof OpenSeadragon.Button
           * @type {object}
           * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
           * @property {Object} originalEvent - The original DOM event.
           * @property {?Object} userData - Arbitrary subscriber-defined object.
           */n.raiseEvent("release",{originalEvent:e.originalEvent});e.preventDefault=true}else e.preventDefault=false}});outTo(this||e,t.ButtonState.REST)};t.extend(t.Button.prototype,t.EventSource.prototype,{notifyGroupEnter:function(){inTo(this||e,t.ButtonState.GROUP)},notifyGroupExit:function(){outTo(this||e,t.ButtonState.REST)},disable:function(){this.notifyGroupExit();(this||e).element.disabled=true;(this||e).tracker.setTracking(false);t.setElementOpacity((this||e).element,.2,true)},enable:function(){(this||e).element.disabled=false;(this||e).tracker.setTracking(true);t.setElementOpacity((this||e).element,1,true);this.notifyGroupEnter()},destroy:function(){if((this||e).imgRest){(this||e).element.removeChild((this||e).imgRest);(this||e).imgRest=null}if((this||e).imgGroup){(this||e).element.removeChild((this||e).imgGroup);(this||e).imgGroup=null}if((this||e).imgHover){(this||e).element.removeChild((this||e).imgHover);(this||e).imgHover=null}if((this||e).imgDown){(this||e).element.removeChild((this||e).imgDown);(this||e).imgDown=null}this.removeAllHandlers();(this||e).tracker.destroy();(this||e).element=null}});function scheduleFade(e){t.requestAnimationFrame((function(){updateFade(e)}))}function updateFade(e){var i,n,r;if(e.shouldFade){i=t.now();n=i-e.fadeBeginTime;r=1-n/e.fadeLength;r=Math.min(1,r);r=Math.max(0,r);e.imgGroup&&t.setElementOpacity(e.imgGroup,r,true);r>0&&scheduleFade(e)}}function beginFading(e){e.shouldFade=true;e.fadeBeginTime=t.now()+e.fadeDelay;window.setTimeout((function(){scheduleFade(e)}),e.fadeDelay)}function stopFading(e){e.shouldFade=false;e.imgGroup&&t.setElementOpacity(e.imgGroup,1,true)}function inTo(e,i){if(!e.element.disabled){if(i>=t.ButtonState.GROUP&&e.currentState===t.ButtonState.REST){stopFading(e);e.currentState=t.ButtonState.GROUP}if(i>=t.ButtonState.HOVER&&e.currentState===t.ButtonState.GROUP){e.imgHover&&(e.imgHover.style.visibility="");e.currentState=t.ButtonState.HOVER}if(i>=t.ButtonState.DOWN&&e.currentState===t.ButtonState.HOVER){e.imgDown&&(e.imgDown.style.visibility="");e.currentState=t.ButtonState.DOWN}}}function outTo(e,i){if(!e.element.disabled){if(i<=t.ButtonState.HOVER&&e.currentState===t.ButtonState.DOWN){e.imgDown&&(e.imgDown.style.visibility="hidden");e.currentState=t.ButtonState.HOVER}if(i<=t.ButtonState.GROUP&&e.currentState===t.ButtonState.HOVER){e.imgHover&&(e.imgHover.style.visibility="hidden");e.currentState=t.ButtonState.GROUP}if(i<=t.ButtonState.REST&&e.currentState===t.ButtonState.GROUP){beginFading(e);e.currentState=t.ButtonState.REST}}}})(OpenSeadragon);(function(t){
/**
   * @class ButtonGroup
   * @classdesc Manages events on groups of buttons.
   *
   * @memberof OpenSeadragon
   * @param {Object} options - A dictionary of settings applied against the entire group of buttons.
   * @param {Array} options.buttons Array of buttons
   * @param {Element} [options.element] Element to use as the container
   **/
t.ButtonGroup=function(i){t.extend(true,this||e,{buttons:[],clickTimeThreshold:t.DEFAULT_SETTINGS.clickTimeThreshold,clickDistThreshold:t.DEFAULT_SETTINGS.clickDistThreshold,labelText:""},i);var n,r=(this||e).buttons.concat([]),o=this||e;(this||e).element=i.element||t.makeNeutralElement("div");if(!i.group){(this||e).element.style.display="inline-block";for(n=0;n<r.length;n++)(this||e).element.appendChild(r[n].element)}t.setElementTouchActionNone((this||e).element);(this||e).tracker=new t.MouseTracker({userData:"ButtonGroup.tracker",element:(this||e).element,clickTimeThreshold:(this||e).clickTimeThreshold,clickDistThreshold:(this||e).clickDistThreshold,enterHandler:function(e){var t;for(t=0;t<o.buttons.length;t++)o.buttons[t].notifyGroupEnter()},leaveHandler:function(e){var t;if(!e.insideElementPressed)for(t=0;t<o.buttons.length;t++)o.buttons[t].notifyGroupExit()}})};t.ButtonGroup.prototype={
/**
     * Adds the given button to this button group.
     *
     * @function
     * @param {OpenSeadragon.Button} button
     */
addButton:function(t){(this||e).buttons.push(t);(this||e).element.appendChild(t.element)},emulateEnter:function(){(this||e).tracker.enterHandler({eventSource:(this||e).tracker})},emulateLeave:function(){(this||e).tracker.leaveHandler({eventSource:(this||e).tracker})},destroy:function(){while((this||e).buttons.length){var t=(this||e).buttons.pop();(this||e).element.removeChild(t.element);t.destroy()}(this||e).tracker.destroy();(this||e).element=null}}})(OpenSeadragon);(function(t){
/**
   * @class Rect
   * @classdesc A Rectangle is described by it top left coordinates (x, y), width,
   * height and degrees of rotation around (x, y).
   * Note that the coordinate system used is the one commonly used with images:
   * x increases when going to the right
   * y increases when going to the bottom
   * degrees increases clockwise with 0 being the horizontal
   *
   * The constructor normalizes the rectangle to always have 0 <= degrees < 90
   *
   * @memberof OpenSeadragon
   * @param {Number} [x=0] The vector component 'x'.
   * @param {Number} [y=0] The vector component 'y'.
   * @param {Number} [width=0] The vector component 'width'.
   * @param {Number} [height=0] The vector component 'height'.
   * @param {Number} [degrees=0] Rotation of the rectangle around (x,y) in degrees.
   */
t.Rect=function(i,n,r,o,s){(this||e).x=typeof i==="number"?i:0;(this||e).y=typeof n==="number"?n:0;(this||e).width=typeof r==="number"?r:0;(this||e).height=typeof o==="number"?o:0;(this||e).degrees=typeof s==="number"?s:0;(this||e).degrees=t.positiveModulo((this||e).degrees,360);var a,l;if((this||e).degrees>=270){a=this.getTopRight();(this||e).x=a.x;(this||e).y=a.y;l=(this||e).height;(this||e).height=(this||e).width;(this||e).width=l;(this||e).degrees-=270}else if((this||e).degrees>=180){a=this.getBottomRight();(this||e).x=a.x;(this||e).y=a.y;(this||e).degrees-=180}else if((this||e).degrees>=90){a=this.getBottomLeft();(this||e).x=a.x;(this||e).y=a.y;l=(this||e).height;(this||e).height=(this||e).width;(this||e).width=l;(this||e).degrees-=90}};
/**
   * Builds a rectangle having the 3 specified points as summits.
   * @static
   * @memberof OpenSeadragon.Rect
   * @param {OpenSeadragon.Point} topLeft
   * @param {OpenSeadragon.Point} topRight
   * @param {OpenSeadragon.Point} bottomLeft
   * @returns {OpenSeadragon.Rect}
   */t.Rect.fromSummits=function(e,i,n){var r=e.distanceTo(i);var o=e.distanceTo(n);var s=i.minus(e);var a=Math.atan(s.y/s.x);s.x<0?a+=Math.PI:s.y<0&&(a+=2*Math.PI);return new t.Rect(e.x,e.y,r,o,a/Math.PI*180)};t.Rect.prototype={
/**
     * @function
     * @returns {OpenSeadragon.Rect} a duplicate of this Rect
     */
clone:function(){return new t.Rect((this||e).x,(this||e).y,(this||e).width,(this||e).height,(this||e).degrees)},
/**
     * The aspect ratio is simply the ratio of width to height.
     * @function
     * @returns {Number} The ratio of width to height.
     */
getAspectRatio:function(){return(this||e).width/(this||e).height},
/**
     * Provides the coordinates of the upper-left corner of the rectangle as a
     * point.
     * @function
     * @returns {OpenSeadragon.Point} The coordinate of the upper-left corner of
     *  the rectangle.
     */
getTopLeft:function(){return new t.Point((this||e).x,(this||e).y)},
/**
     * Provides the coordinates of the bottom-right corner of the rectangle as a
     * point.
     * @function
     * @returns {OpenSeadragon.Point} The coordinate of the bottom-right corner of
     *  the rectangle.
     */
getBottomRight:function(){return new t.Point((this||e).x+(this||e).width,(this||e).y+(this||e).height).rotate((this||e).degrees,this.getTopLeft())},
/**
     * Provides the coordinates of the top-right corner of the rectangle as a
     * point.
     * @function
     * @returns {OpenSeadragon.Point} The coordinate of the top-right corner of
     *  the rectangle.
     */
getTopRight:function(){return new t.Point((this||e).x+(this||e).width,(this||e).y).rotate((this||e).degrees,this.getTopLeft())},
/**
     * Provides the coordinates of the bottom-left corner of the rectangle as a
     * point.
     * @function
     * @returns {OpenSeadragon.Point} The coordinate of the bottom-left corner of
     *  the rectangle.
     */
getBottomLeft:function(){return new t.Point((this||e).x,(this||e).y+(this||e).height).rotate((this||e).degrees,this.getTopLeft())},
/**
     * Computes the center of the rectangle.
     * @function
     * @returns {OpenSeadragon.Point} The center of the rectangle as represented
     *  as represented by a 2-dimensional vector (x,y)
     */
getCenter:function(){return new t.Point((this||e).x+(this||e).width/2,(this||e).y+(this||e).height/2).rotate((this||e).degrees,this.getTopLeft())},
/**
     * Returns the width and height component as a vector OpenSeadragon.Point
     * @function
     * @returns {OpenSeadragon.Point} The 2 dimensional vector representing the
     *  width and height of the rectangle.
     */
getSize:function(){return new t.Point((this||e).width,(this||e).height)},
/**
     * Determines if two Rectangles have equivalent components.
     * @function
     * @param {OpenSeadragon.Rect} rectangle The Rectangle to compare to.
     * @returns {Boolean} 'true' if all components are equal, otherwise 'false'.
     */
equals:function(i){return i instanceof t.Rect&&(this||e).x===i.x&&(this||e).y===i.y&&(this||e).width===i.width&&(this||e).height===i.height&&(this||e).degrees===i.degrees},
/**
    * Multiply all dimensions (except degrees) in this Rect by a factor and
    * return a new Rect.
    * @function
    * @param {Number} factor The factor to multiply vector components.
    * @returns {OpenSeadragon.Rect} A new rect representing the multiplication
    *  of the vector components by the factor
    */
times:function(i){return new t.Rect((this||e).x*i,(this||e).y*i,(this||e).width*i,(this||e).height*i,(this||e).degrees)},
/**
    * Translate/move this Rect by a vector and return new Rect.
    * @function
    * @param {OpenSeadragon.Point} delta The translation vector.
    * @returns {OpenSeadragon.Rect} A new rect with altered position
    */
translate:function(i){return new t.Rect((this||e).x+i.x,(this||e).y+i.y,(this||e).width,(this||e).height,(this||e).degrees)},
/**
     * Returns the smallest rectangle that will contain this and the given
     * rectangle bounding boxes.
     * @param {OpenSeadragon.Rect} rect
     * @returns {OpenSeadragon.Rect} The new rectangle.
     */
union:function(e){var i=this.getBoundingBox();var n=e.getBoundingBox();var r=Math.min(i.x,n.x);var o=Math.min(i.y,n.y);var s=Math.max(i.x+i.width,n.x+n.width);var a=Math.max(i.y+i.height,n.y+n.height);return new t.Rect(r,o,s-r,a-o)},
/**
     * Returns the bounding box of the intersection of this rectangle with the
     * given rectangle.
     * @param {OpenSeadragon.Rect} rect
     * @returns {OpenSeadragon.Rect} the bounding box of the intersection
     * or null if the rectangles don't intersect.
     */
intersection:function(e){var i=1e-10;var n=[];var r=this.getTopLeft();e.containsPoint(r,i)&&n.push(r);var o=this.getTopRight();e.containsPoint(o,i)&&n.push(o);var s=this.getBottomLeft();e.containsPoint(s,i)&&n.push(s);var a=this.getBottomRight();e.containsPoint(a,i)&&n.push(a);var l=e.getTopLeft();this.containsPoint(l,i)&&n.push(l);var h=e.getTopRight();this.containsPoint(h,i)&&n.push(h);var u=e.getBottomLeft();this.containsPoint(u,i)&&n.push(u);var c=e.getBottomRight();this.containsPoint(c,i)&&n.push(c);var d=this._getSegments();var p=e._getSegments();for(var g=0;g<d.length;g++){var v=d[g];for(var m=0;m<p.length;m++){var f=p[m];var y=getIntersection(v[0],v[1],f[0],f[1]);y&&n.push(y)}}function getIntersection(e,n,r,o){var s=n.minus(e);var a=o.minus(r);var l=-a.x*s.y+s.x*a.y;if(l===0)return null;var h=(s.x*(e.y-r.y)-s.y*(e.x-r.x))/l;var u=(a.x*(e.y-r.y)-a.y*(e.x-r.x))/l;return-i<=h&&h<=1-i&&-i<=u&&u<=1-i?new t.Point(e.x+u*s.x,e.y+u*s.y):null}if(n.length===0)return null;var w=n[0].x;var T=n[0].x;var x=n[0].y;var _=n[0].y;for(var E=1;E<n.length;E++){var P=n[E];P.x<w&&(w=P.x);P.x>T&&(T=P.x);P.y<x&&(x=P.y);P.y>_&&(_=P.y)}return new t.Rect(w,x,T-w,_-x)},_getSegments:function(){var e=this.getTopLeft();var t=this.getTopRight();var i=this.getBottomLeft();var n=this.getBottomRight();return[[e,t],[t,n],[n,i],[i,e]]},
/**
     * Rotates a rectangle around a point.
     * @function
     * @param {Number} degrees The angle in degrees to rotate.
     * @param {OpenSeadragon.Point} [pivot] The point about which to rotate.
     * Defaults to the center of the rectangle.
     * @returns {OpenSeadragon.Rect}
     */
rotate:function(i,n){i=t.positiveModulo(i,360);if(i===0)return this.clone();n=n||this.getCenter();var r=this.getTopLeft().rotate(i,n);var o=this.getTopRight().rotate(i,n);var s=o.minus(r);s=s.apply((function(e){var t=1e-15;return Math.abs(e)<t?0:e}));var a=Math.atan(s.y/s.x);s.x<0?a+=Math.PI:s.y<0&&(a+=2*Math.PI);return new t.Rect(r.x,r.y,(this||e).width,(this||e).height,a/Math.PI*180)},
/**
     * Retrieves the smallest horizontal (degrees=0) rectangle which contains
     * this rectangle.
     * @returns {OpenSeadragon.Rect}
     */
getBoundingBox:function(){if((this||e).degrees===0)return this.clone();var i=this.getTopLeft();var n=this.getTopRight();var r=this.getBottomLeft();var o=this.getBottomRight();var s=Math.min(i.x,n.x,r.x,o.x);var a=Math.max(i.x,n.x,r.x,o.x);var l=Math.min(i.y,n.y,r.y,o.y);var h=Math.max(i.y,n.y,r.y,o.y);return new t.Rect(s,l,a-s,h-l)},
/**
     * Retrieves the smallest horizontal (degrees=0) rectangle which contains
     * this rectangle and has integers x, y, width and height
     * @returns {OpenSeadragon.Rect}
     */
getIntegerBoundingBox:function(){var e=this.getBoundingBox();var i=Math.floor(e.x);var n=Math.floor(e.y);var r=Math.ceil(e.width+e.x-i);var o=Math.ceil(e.height+e.y-n);return new t.Rect(i,n,r,o)},
/**
     * Determines whether a point is inside this rectangle (edge included).
     * @function
     * @param {OpenSeadragon.Point} point
     * @param {Number} [epsilon=0] the margin of error allowed
     * @returns {Boolean} true if the point is inside this rectangle, false
     * otherwise.
     */
containsPoint:function(e,t){t=t||0;var i=this.getTopLeft();var n=this.getTopRight();var r=this.getBottomLeft();var o=n.minus(i);var s=r.minus(i);return(e.x-i.x)*o.x+(e.y-i.y)*o.y>=-t&&(e.x-n.x)*o.x+(e.y-n.y)*o.y<=t&&(e.x-i.x)*s.x+(e.y-i.y)*s.y>=-t&&(e.x-r.x)*s.x+(e.y-r.y)*s.y<=t},
/**
     * Provides a string representation of the rectangle which is useful for
     * debugging.
     * @function
     * @returns {String} A string representation of the rectangle.
     */
toString:function(){return"["+Math.round((this||e).x*100)/100+", "+Math.round((this||e).y*100)/100+", "+Math.round((this||e).width*100)/100+"x"+Math.round((this||e).height*100)/100+", "+Math.round((this||e).degrees*100)/100+"deg]"}}})(OpenSeadragon);(function(t){var i={};
/**
   * @class ReferenceStrip
   * @memberof OpenSeadragon
   * @param {Object} options
   */t.ReferenceStrip=function(n){var r,o,s,a=this||e,l=n.viewer,h=t.getElementSize(l.element);if(!n.id){n.id="referencestrip-"+t.now();(this||e).element=t.makeNeutralElement("div");(this||e).element.id=n.id;(this||e).element.className="referencestrip"}n=t.extend(true,{sizeRatio:t.DEFAULT_SETTINGS.referenceStripSizeRatio,position:t.DEFAULT_SETTINGS.referenceStripPosition,scroll:t.DEFAULT_SETTINGS.referenceStripScroll,clickTimeThreshold:t.DEFAULT_SETTINGS.clickTimeThreshold},n,{element:(this||e).element});t.extend(this||e,n);i[(this||e).id]={animating:false};(this||e).minPixelRatio=(this||e).viewer.minPixelRatio;(this||e).element.tabIndex=0;o=(this||e).element.style;o.marginTop="0px";o.marginRight="0px";o.marginBottom="0px";o.marginLeft="0px";o.left="0px";o.bottom="0px";o.border="0px";o.background="#000";o.position="relative";t.setElementTouchActionNone((this||e).element);t.setElementOpacity((this||e).element,.8);(this||e).viewer=l;(this||e).tracker=new t.MouseTracker({userData:"ReferenceStrip.tracker",element:(this||e).element,clickHandler:t.delegate(this||e,onStripClick),dragHandler:t.delegate(this||e,onStripDrag),scrollHandler:t.delegate(this||e,onStripScroll),enterHandler:t.delegate(this||e,onStripEnter),leaveHandler:t.delegate(this||e,onStripLeave),keyDownHandler:t.delegate(this||e,onKeyDown),keyHandler:t.delegate(this||e,onKeyPress),preProcessEventHandler:function(e){e.eventType==="wheel"&&(e.preventDefault=true)}});if(n.width&&n.height){(this||e).element.style.width=n.width+"px";(this||e).element.style.height=n.height+"px";l.addControl((this||e).element,{anchor:t.ControlAnchor.BOTTOM_LEFT})}else if("horizontal"===n.scroll){(this||e).element.style.width=h.x*n.sizeRatio*l.tileSources.length+12*l.tileSources.length+"px";(this||e).element.style.height=h.y*n.sizeRatio+"px";l.addControl((this||e).element,{anchor:t.ControlAnchor.BOTTOM_LEFT})}else{(this||e).element.style.height=h.y*n.sizeRatio*l.tileSources.length+12*l.tileSources.length+"px";(this||e).element.style.width=h.x*n.sizeRatio+"px";l.addControl((this||e).element,{anchor:t.ControlAnchor.TOP_LEFT})}(this||e).panelWidth=h.x*(this||e).sizeRatio+8;(this||e).panelHeight=h.y*(this||e).sizeRatio+8;(this||e).panels=[];(this||e).miniViewers={};for(s=0;s<l.tileSources.length;s++){r=t.makeNeutralElement("div");r.id=(this||e).element.id+"-"+s;r.style.width=a.panelWidth+"px";r.style.height=a.panelHeight+"px";r.style.display="inline";r.style.float="left";r.style.cssFloat="left";r.style.padding="2px";t.setElementTouchActionNone(r);t.setElementPointerEventsNone(r);(this||e).element.appendChild(r);r.activePanel=false;(this||e).panels.push(r)}loadPanels(this||e,(this||e).scroll==="vertical"?h.y:h.x,0);this.setFocus(0)};t.ReferenceStrip.prototype={setFocus:function(i){var n,r=(this||e).element.querySelector("#"+(this||e).element.id+"-"+i),o=t.getElementSize((this||e).viewer.canvas),s=Number((this||e).element.style.width.replace("px","")),a=Number((this||e).element.style.height.replace("px","")),l=-Number((this||e).element.style.marginLeft.replace("px","")),h=-Number((this||e).element.style.marginTop.replace("px",""));if((this||e).currentSelected!==r){(this||e).currentSelected&&((this||e).currentSelected.style.background="#000");(this||e).currentSelected=r;(this||e).currentSelected.style.background="#999";if("horizontal"===(this||e).scroll){n=Number(i)*((this||e).panelWidth+3);if(n>l+o.x-(this||e).panelWidth){n=Math.min(n,s-o.x);(this||e).element.style.marginLeft=-n+"px";loadPanels(this||e,o.x,-n)}else if(n<l){n=Math.max(0,n-o.x/2);(this||e).element.style.marginLeft=-n+"px";loadPanels(this||e,o.x,-n)}}else{n=Number(i)*((this||e).panelHeight+3);if(n>h+o.y-(this||e).panelHeight){n=Math.min(n,a-o.y);(this||e).element.style.marginTop=-n+"px";loadPanels(this||e,o.y,-n)}else if(n<h){n=Math.max(0,n-o.y/2);(this||e).element.style.marginTop=-n+"px";loadPanels(this||e,o.y,-n)}}(this||e).currentPage=i;onStripEnter.call(this||e,{eventSource:(this||e).tracker})}},update:function(){return!!i[(this||e).id].animating},destroy:function(){if((this||e).miniViewers)for(var t in(this||e).miniViewers)(this||e).miniViewers[t].destroy();(this||e).tracker.destroy();(this||e).element&&(this||e).viewer.removeControl((this||e).element)}};function onStripClick(t){if(t.quick){var i;i="horizontal"===(this||e).scroll?Math.floor(t.position.x/((this||e).panelWidth+4)):Math.floor(t.position.y/(this||e).panelHeight);(this||e).viewer.goToPage(i)}(this||e).element.focus()}function onStripDrag(i){(this||e).dragging=true;if((this||e).element){var n=Number((this||e).element.style.marginLeft.replace("px","")),r=Number((this||e).element.style.marginTop.replace("px","")),o=Number((this||e).element.style.width.replace("px","")),s=Number((this||e).element.style.height.replace("px","")),a=t.getElementSize((this||e).viewer.canvas);if("horizontal"===(this||e).scroll){if(-i.delta.x>0){if(n>-(o-a.x)){(this||e).element.style.marginLeft=n+i.delta.x*2+"px";loadPanels(this||e,a.x,n+i.delta.x*2)}}else if(-i.delta.x<0&&n<0){(this||e).element.style.marginLeft=n+i.delta.x*2+"px";loadPanels(this||e,a.x,n+i.delta.x*2)}}else if(-i.delta.y>0){if(r>-(s-a.y)){(this||e).element.style.marginTop=r+i.delta.y*2+"px";loadPanels(this||e,a.y,r+i.delta.y*2)}}else if(-i.delta.y<0&&r<0){(this||e).element.style.marginTop=r+i.delta.y*2+"px";loadPanels(this||e,a.y,r+i.delta.y*2)}}}function onStripScroll(i){if((this||e).element){var n=Number((this||e).element.style.marginLeft.replace("px","")),r=Number((this||e).element.style.marginTop.replace("px","")),o=Number((this||e).element.style.width.replace("px","")),s=Number((this||e).element.style.height.replace("px","")),a=t.getElementSize((this||e).viewer.canvas);if("horizontal"===(this||e).scroll){if(i.scroll>0){if(n>-(o-a.x)){(this||e).element.style.marginLeft=n-i.scroll*60+"px";loadPanels(this||e,a.x,n-i.scroll*60)}}else if(i.scroll<0&&n<0){(this||e).element.style.marginLeft=n-i.scroll*60+"px";loadPanels(this||e,a.x,n-i.scroll*60)}}else if(i.scroll<0){if(r>a.y-s){(this||e).element.style.marginTop=r+i.scroll*60+"px";loadPanels(this||e,a.y,r+i.scroll*60)}}else if(i.scroll>0&&r<0){(this||e).element.style.marginTop=r+i.scroll*60+"px";loadPanels(this||e,a.y,r+i.scroll*60)}i.preventDefault=true}}function loadPanels(e,i,n){var r,o,s,a,l,h;r="horizontal"===e.scroll?e.panelWidth:e.panelHeight;o=Math.ceil(i/r)+5;s=Math.ceil((Math.abs(n)+i)/r)+1;o=s-o;o=o<0?0:o;for(l=o;l<s&&l<e.panels.length;l++){h=e.panels[l];if(!h.activePanel){var u;var c=e.viewer.tileSources[l];u=c.referenceStripThumbnailUrl?{type:"image",url:c.referenceStripThumbnailUrl}:c;a=new t.Viewer({id:h.id,tileSources:[u],element:h,navigatorSizeRatio:e.sizeRatio,showNavigator:false,mouseNavEnabled:false,showNavigationControl:false,showSequenceControl:false,immediateRender:true,blendTime:0,animationTime:0,loadTilesWithAjax:e.viewer.loadTilesWithAjax,ajaxHeaders:e.viewer.ajaxHeaders,drawer:"canvas"});t.setElementPointerEventsNone(a.canvas);t.setElementPointerEventsNone(a.container);a.innerTracker.setTracking(false);a.outerTracker.setTracking(false);e.miniViewers[h.id]=a;h.activePanel=true}}}function onStripEnter(t){var i=t.eventSource.element;"horizontal"===(this||e).scroll?i.style.marginBottom="0px":i.style.marginLeft="0px"}function onStripLeave(i){var n=i.eventSource.element;"horizontal"===(this||e).scroll?n.style.marginBottom="-"+t.getElementSize(n).y/2+"px":n.style.marginLeft="-"+t.getElementSize(n).x/2+"px"}function onKeyDown(t){if(t.ctrl||t.alt||t.meta)t.preventDefault=false;else switch(t.keyCode){case 38:onStripScroll.call(this||e,{eventSource:(this||e).tracker,position:null,scroll:1,shift:null});t.preventDefault=true;break;case 40:onStripScroll.call(this||e,{eventSource:(this||e).tracker,position:null,scroll:-1,shift:null});t.preventDefault=true;break;case 37:onStripScroll.call(this||e,{eventSource:(this||e).tracker,position:null,scroll:-1,shift:null});t.preventDefault=true;break;case 39:onStripScroll.call(this||e,{eventSource:(this||e).tracker,position:null,scroll:1,shift:null});t.preventDefault=true;break;default:t.preventDefault=false;break}}function onKeyPress(t){if(t.ctrl||t.alt||t.meta)t.preventDefault=false;else switch(t.keyCode){case 61:onStripScroll.call(this||e,{eventSource:(this||e).tracker,position:null,scroll:1,shift:null});t.preventDefault=true;break;case 45:onStripScroll.call(this||e,{eventSource:(this||e).tracker,position:null,scroll:-1,shift:null});t.preventDefault=true;break;case 48:case 119:case 87:onStripScroll.call(this||e,{eventSource:(this||e).tracker,position:null,scroll:1,shift:null});t.preventDefault=true;break;case 115:case 83:onStripScroll.call(this||e,{eventSource:(this||e).tracker,position:null,scroll:-1,shift:null});t.preventDefault=true;break;case 97:onStripScroll.call(this||e,{eventSource:(this||e).tracker,position:null,scroll:-1,shift:null});t.preventDefault=true;break;case 100:onStripScroll.call(this||e,{eventSource:(this||e).tracker,position:null,scroll:1,shift:null});t.preventDefault=true;break;default:t.preventDefault=false;break}}})(OpenSeadragon);(function(t){
/**
   * @class DisplayRect
   * @classdesc A display rectangle is very similar to {@link OpenSeadragon.Rect} but adds two
   * fields, 'minLevel' and 'maxLevel' which denote the supported zoom levels
   * for this rectangle.
   *
   * @memberof OpenSeadragon
   * @extends OpenSeadragon.Rect
   * @param {Number} x The vector component 'x'.
   * @param {Number} y The vector component 'y'.
   * @param {Number} width The vector component 'height'.
   * @param {Number} height The vector component 'width'.
   * @param {Number} minLevel The lowest zoom level supported.
   * @param {Number} maxLevel The highest zoom level supported.
   */
t.DisplayRect=function(i,n,r,o,s,a){t.Rect.apply(this||e,[i,n,r,o]);(this||e).minLevel=s;(this||e).maxLevel=a};t.extend(t.DisplayRect.prototype,t.Rect.prototype)})(OpenSeadragon);(function(t){
/**
   * @class Spring
   * @memberof OpenSeadragon
   * @param {Object} options - Spring configuration settings.
   * @param {Number} options.springStiffness - Spring stiffness. Must be greater than zero.
   * The closer to zero, the closer to linear animation.
   * @param {Number} options.animationTime - Animation duration per spring, in seconds.
   * Must be zero or greater.
   * @param {Number} [options.initial=0] - Initial value of spring.
   * @param {Boolean} [options.exponential=false] - Whether this spring represents
   * an exponential scale (such as zoom) and should be animated accordingly. Note that
   * exponential springs must have non-zero values.
   */
t.Spring=function(i){var n=arguments;typeof i!=="object"&&(i={initial:n.length&&typeof n[0]==="number"?n[0]:void 0,springStiffness:n.length>1?n[1].springStiffness:5,animationTime:n.length>1?n[1].animationTime:1.5});t.console.assert(typeof i.springStiffness==="number"&&i.springStiffness!==0,"[OpenSeadragon.Spring] options.springStiffness must be a non-zero number");t.console.assert(typeof i.animationTime==="number"&&i.animationTime>=0,"[OpenSeadragon.Spring] options.animationTime must be a number greater than or equal to 0");if(i.exponential){(this||e)._exponential=true;delete i.exponential}t.extend(true,this||e,i);(this||e).current={value:typeof(this||e).initial==="number"?(this||e).initial:(this||e)._exponential?0:1,time:t.now()};t.console.assert(!(this||e)._exponential||(this||e).current.value!==0,"[OpenSeadragon.Spring] value must be non-zero for exponential springs");(this||e).start={value:(this||e).current.value,time:(this||e).current.time};(this||e).target={value:(this||e).current.value,time:(this||e).current.time};if((this||e)._exponential){(this||e).start._logValue=Math.log((this||e).start.value);(this||e).target._logValue=Math.log((this||e).target.value);(this||e).current._logValue=Math.log((this||e).current.value)}};t.Spring.prototype={
/**
     * @function
     * @param {Number} target
     */
resetTo:function(i){t.console.assert(!(this||e)._exponential||i!==0,"[OpenSeadragon.Spring.resetTo] target must be non-zero for exponential springs");(this||e).start.value=(this||e).target.value=(this||e).current.value=i;(this||e).start.time=(this||e).target.time=(this||e).current.time=t.now();if((this||e)._exponential){(this||e).start._logValue=Math.log((this||e).start.value);(this||e).target._logValue=Math.log((this||e).target.value);(this||e).current._logValue=Math.log((this||e).current.value)}},
/**
     * @function
     * @param {Number} target
     */
springTo:function(i){t.console.assert(!(this||e)._exponential||i!==0,"[OpenSeadragon.Spring.springTo] target must be non-zero for exponential springs");(this||e).start.value=(this||e).current.value;(this||e).start.time=(this||e).current.time;(this||e).target.value=i;(this||e).target.time=(this||e).start.time+1e3*(this||e).animationTime;if((this||e)._exponential){(this||e).start._logValue=Math.log((this||e).start.value);(this||e).target._logValue=Math.log((this||e).target.value)}},
/**
     * @function
     * @param {Number} delta
     */
shiftBy:function(i){(this||e).start.value+=i;(this||e).target.value+=i;if((this||e)._exponential){t.console.assert((this||e).target.value!==0&&(this||e).start.value!==0,"[OpenSeadragon.Spring.shiftBy] spring value must be non-zero for exponential springs");(this||e).start._logValue=Math.log((this||e).start.value);(this||e).target._logValue=Math.log((this||e).target.value)}},setExponential:function(i){(this||e)._exponential=i;if((this||e)._exponential){t.console.assert((this||e).current.value!==0&&(this||e).target.value!==0&&(this||e).start.value!==0,"[OpenSeadragon.Spring.setExponential] spring value must be non-zero for exponential springs");(this||e).start._logValue=Math.log((this||e).start.value);(this||e).target._logValue=Math.log((this||e).target.value);(this||e).current._logValue=Math.log((this||e).current.value)}},
/**
     * @function
     * @returns true if the spring is still updating its value, false if it is
     * already at the target value.
     */
update:function(){(this||e).current.time=t.now();let i,n;if((this||e)._exponential){i=(this||e).start._logValue;n=(this||e).target._logValue}else{i=(this||e).start.value;n=(this||e).target.value}if((this||e).current.time>=(this||e).target.time)(this||e).current.value=(this||e).target.value;else{let t=i+(n-i)*transform((this||e).springStiffness,((this||e).current.time-(this||e).start.time)/((this||e).target.time-(this||e).start.time));(this||e)._exponential?(this||e).current.value=Math.exp(t):(this||e).current.value=t}return(this||e).current.value!==(this||e).target.value},
/**
     * Returns whether the spring is at the target value
     * @function
     * @returns {Boolean} True if at target value, false otherwise
     */
isAtTargetValue:function(){return(this||e).current.value===(this||e).target.value}};function transform(e,t){return(1-Math.exp(e*-t))/(1-Math.exp(-e))}})(OpenSeadragon);(function(t){
/**
   * @class ImageJob
   * @classdesc Handles downloading of a single image.
   *
   * @memberof OpenSeadragon
   * @param {Object} options - Options for this ImageJob.
   * @param {String} [options.src] - URL of image to download.
   * @param {Tile} [options.tile] - Tile that belongs the data to.
   * @param {TileSource} [options.source] - Image loading strategy
   * @param {String} [options.loadWithAjax] - Whether to load this image with AJAX.
   * @param {String} [options.ajaxHeaders] - Headers to add to the image request if using AJAX.
   * @param {Boolean} [options.ajaxWithCredentials] - Whether to set withCredentials on AJAX requests.
   * @param {String} [options.crossOriginPolicy] - CORS policy to use for downloads
   * @param {String} [options.postData] - HTTP POST data (usually but not necessarily in k=v&k2=v2... form,
   *      see TileSource::getPostData) or null
   * @param {Function} [options.callback] - Called once image has been downloaded.
   * @param {Function} [options.abort] - Called when this image job is aborted.
   * @param {Number} [options.timeout] - The max number of milliseconds that this image job may take to complete.
   * @param {Number} [options.tries] - Actual number of the current try.
   */
t.ImageJob=function(i){t.extend(true,this||e,{timeout:t.DEFAULT_SETTINGS.timeout,jobId:null,tries:0},i);(this||e).data=null;(this||e).userData={};(this||e).errorMsg=null};t.ImageJob.prototype={start:function(){(this||e).tries++;var t=this||e;var i=(this||e).abort;(this||e).jobId=window.setTimeout((function(){t.finish(null,null,"Image load exceeded timeout ("+t.timeout+" ms)")}),(this||e).timeout);(this||e).abort=function(){t.source.downloadTileAbort(t);typeof i==="function"&&i()};(this||e).source.downloadTileStart(this||e)},
/**
     * Finish this job.
     * @param {*} data data that has been downloaded
     * @param {XMLHttpRequest} request reference to the request if used
     * @param {string} errorMessage description upon failure
     * @memberof OpenSeadragon.ImageJob#
     */
finish:function(t,i,n){(this||e).data=t;(this||e).request=i;(this||e).errorMsg=n;(this||e).jobId&&window.clearTimeout((this||e).jobId);this.callback(this||e)}};
/**
   * @class ImageLoader
   * @memberof OpenSeadragon
   * @classdesc Handles downloading of a set of images using asynchronous queue pattern.
   * You generally won't have to interact with the ImageLoader directly.
   * @param {Object} options - Options for this ImageLoader.
   * @param {Number} [options.jobLimit] - The number of concurrent image requests. See imageLoaderLimit in {@link OpenSeadragon.Options} for details.
   * @param {Number} [options.timeout] - The max number of milliseconds that an image job may take to complete.
   */t.ImageLoader=function(i){t.extend(true,this||e,{jobLimit:t.DEFAULT_SETTINGS.imageLoaderLimit,timeout:t.DEFAULT_SETTINGS.timeout,jobQueue:[],failedTiles:[],jobsInProgress:0},i)};t.ImageLoader.prototype={
/**
     * Add an unloaded image to the loader queue.
     * @method
     * @param {Object} options - Options for this job.
     * @param {String} [options.src] - URL of image to download.
     * @param {Tile} [options.tile] - Tile that belongs the data to. The tile instance
     *      is not internally used and serves for custom TileSources implementations.
     * @param {TileSource} [options.source] - Image loading strategy
     * @param {String} [options.loadWithAjax] - Whether to load this image with AJAX.
     * @param {String} [options.ajaxHeaders] - Headers to add to the image request if using AJAX.
     * @param {String|Boolean} [options.crossOriginPolicy] - CORS policy to use for downloads
     * @param {String} [options.postData] - POST parameters (usually but not necessarily in k=v&k2=v2... form,
     *      see TileSource::getPostData) or null
     * @param {Boolean} [options.ajaxWithCredentials] - Whether to set withCredentials on AJAX
     *      requests.
     * @param {Function} [options.callback] - Called once image has been downloaded.
     * @param {Function} [options.abort] - Called when this image job is aborted.
     */
addJob:function(i){if(!i.source){t.console.error("ImageLoader.prototype.addJob() requires [options.source]. TileSource since new API defines how images are fetched. Creating a dummy TileSource.");var n=t.TileSource.prototype;i.source={downloadTileStart:n.downloadTileStart,downloadTileAbort:n.downloadTileAbort}}var r=this||e,complete=function(e){completeJob(r,e,i.callback)},o={src:i.src,tile:i.tile||{},source:i.source,loadWithAjax:i.loadWithAjax,ajaxHeaders:i.loadWithAjax?i.ajaxHeaders:null,crossOriginPolicy:i.crossOriginPolicy,ajaxWithCredentials:i.ajaxWithCredentials,postData:i.postData,callback:complete,abort:i.abort,timeout:(this||e).timeout},s=new t.ImageJob(o);if(!(this||e).jobLimit||(this||e).jobsInProgress<(this||e).jobLimit){s.start();(this||e).jobsInProgress++}else(this||e).jobQueue.push(s)},clear:function(){for(var t=0;t<(this||e).jobQueue.length;t++){var i=(this||e).jobQueue[t];typeof i.abort==="function"&&i.abort()}(this||e).jobQueue=[]}};
/**
   * Cleans up ImageJob once completed. Restarts job after tileRetryDelay seconds if failed
   * but max tileRetryMax times
   * @method
   * @private
   * @param loader - ImageLoader used to start job.
   * @param job - The ImageJob that has completed.
   * @param callback - Called once cleanup is finished.
   */function completeJob(e,t,i){t.errorMsg!==""&&(t.data===null||t.data===void 0)&&t.tries<1+e.tileRetryMax&&e.failedTiles.push(t);var n;e.jobsInProgress--;if((!e.jobLimit||e.jobsInProgress<e.jobLimit)&&e.jobQueue.length>0){n=e.jobQueue.shift();n.start();e.jobsInProgress++}if(e.tileRetryMax>0&&e.jobQueue.length===0&&(!e.jobLimit||e.jobsInProgress<e.jobLimit)&&e.failedTiles.length>0){n=e.failedTiles.shift();setTimeout((function(){n.start()}),e.tileRetryDelay);e.jobsInProgress++}i(t.data,t.errorMsg,t.request)}})(OpenSeadragon);(function(t){
/**
   * @class Tile
   * @memberof OpenSeadragon
   * @param {Number} level The zoom level this tile belongs to.
   * @param {Number} x The vector component 'x'.
   * @param {Number} y The vector component 'y'.
   * @param {OpenSeadragon.Rect} bounds Where this tile fits, in normalized
   *      coordinates.
   * @param {Boolean} exists Is this tile a part of a sparse image? ( Also has
   *      this tile failed to load? )
   * @param {String|Function} url The URL of this tile's image or a function that returns a url.
   * @param {CanvasRenderingContext2D} context2D The context2D of this tile if it
   *      is provided directly by the tile source.
   * @param {Boolean} loadWithAjax Whether this tile image should be loaded with an AJAX request .
   * @param {Object} ajaxHeaders The headers to send with this tile's AJAX request (if applicable).
   * @param {OpenSeadragon.Rect} sourceBounds The portion of the tile to use as the source of the
   *      drawing operation, in pixels. Note that this only works when drawing with canvas; when drawing
   *      with HTML the entire tile is always used.
   * @param {String} postData HTTP POST data (usually but not necessarily in k=v&k2=v2... form,
   *      see TileSource::getPostData) or null
   * @param {String} cacheKey key to act as a tile cache, must be unique for tiles with unique image data
   */
t.Tile=function(i,n,r,o,s,a,l,h,u,c,d,p){(this||e).level=i;(this||e).x=n;(this||e).y=r;(this||e).bounds=o;(this||e).positionedBounds=new OpenSeadragon.Rect(o.x,o.y,o.width,o.height);(this||e).sourceBounds=c;(this||e).exists=s;(this||e)._url=a;(this||e).postData=d;(this||e).context2D=l;(this||e).loadWithAjax=h;(this||e).ajaxHeaders=u;if(p===void 0){t.console.warn("Tile constructor needs 'cacheKey' variable: creation tile cache in Tile class is deprecated. TileSource.prototype.getTileHashKey will be used.");p=t.TileSource.prototype.getTileHashKey(i,n,r,a,u,d)}(this||e).cacheKey=p;(this||e).loaded=false;(this||e).loading=false;(this||e).element=null;(this||e).imgElement=null;(this||e).style=null;(this||e).position=null;(this||e).size=null;(this||e).flipped=false;(this||e).blendStart=null;(this||e).opacity=null;(this||e).squaredDistance=null;(this||e).visibility=null;(this||e).hasTransparency=false;(this||e).beingDrawn=false;(this||e).lastTouchTime=0;(this||e).isRightMost=false;(this||e).isBottomMost=false};t.Tile.prototype={
/**
     * Provides a string representation of this tiles level and (x,y)
     * components.
     * @function
     * @returns {String}
     */
toString:function(){return(this||e).level+"/"+(this||e).x+"_"+(this||e).y},_hasTransparencyChannel:function(){console.warn("Tile.prototype._hasTransparencyChannel() has been deprecated and will be removed in the future. Use TileSource.prototype.hasTransparency() instead.");return!!(this||e).context2D||this.getUrl().match(".png")},
/**
     * The Image object for this tile.
     * @member {Object} image
     * @memberof OpenSeadragon.Tile#
     * @deprecated
     * @returns {Image}
     */
get image(){t.console.error("[Tile.image] property has been deprecated. Use [Tile.prototype.getImage] instead.");return this.getImage()},
/**
     * The URL of this tile's image.
     * @member {String} url
     * @memberof OpenSeadragon.Tile#
     * @deprecated
     * @returns {String}
     */
get url(){t.console.error("[Tile.url] property has been deprecated. Use [Tile.prototype.getUrl] instead.");return this.getUrl()},
/**
     * Get the Image object for this tile.
     * @returns {Image}
     */
getImage:function(){return(this||e).cacheImageRecord.getImage()},
/**
     * Get the url string for this tile.
     * @returns {String}
     */
getUrl:function(){return typeof(this||e)._url==="function"?this._url():(this||e)._url},
/**
     * Get the CanvasRenderingContext2D instance for tile image data drawn
     * onto Canvas if enabled and available
     * @returns {CanvasRenderingContext2D}
     */
getCanvasContext:function(){return(this||e).context2D||(this||e).cacheImageRecord&&(this||e).cacheImageRecord.getRenderedContext()},
/**
     * Get the ratio between current and original size.
     * @function
     * @returns {Float}
     */
getScaleForEdgeSmoothing:function(){var i;if((this||e).cacheImageRecord)i=(this||e).cacheImageRecord.getRenderedContext();else{if(!(this||e).context2D){t.console.warn("[Tile.drawCanvas] attempting to get tile scale %s when tile's not cached",this.toString());return 1}i=(this||e).context2D}return i.canvas.width/((this||e).size.x*t.pixelDensityRatio)},
/**
     * Get a translation vector that when applied to the tile position produces integer coordinates.
     * Needed to avoid swimming and twitching.
     * @function
     * @param {Number} [scale=1] - Scale to be applied to position.
     * @returns {OpenSeadragon.Point}
     */
getTranslationForEdgeSmoothing:function(i,n,r){var o=Math.max(1,Math.ceil((r.x-n.x)/2));var s=Math.max(1,Math.ceil((r.y-n.y)/2));return new t.Point(o,s).minus((this||e).position.times(t.pixelDensityRatio).times(i||1).apply((function(e){return e%1})))},unload:function(){(this||e).imgElement&&(this||e).imgElement.parentNode&&(this||e).imgElement.parentNode.removeChild((this||e).imgElement);(this||e).element&&(this||e).element.parentNode&&(this||e).element.parentNode.removeChild((this||e).element);(this||e).element=null;(this||e).imgElement=null;(this||e).loaded=false;(this||e).loading=false}}})(OpenSeadragon);(function(t){
/**
   * An enumeration of positions that an overlay may be assigned relative to
   * the viewport.
   * It is identical to OpenSeadragon.Placement but is kept for backward
   * compatibility.
   * @member OverlayPlacement
   * @memberof OpenSeadragon
   * @see OpenSeadragon.Placement
   * @static
   * @readonly
   * @type {Object}
   * @property {Number} CENTER
   * @property {Number} TOP_LEFT
   * @property {Number} TOP
   * @property {Number} TOP_RIGHT
   * @property {Number} RIGHT
   * @property {Number} BOTTOM_RIGHT
   * @property {Number} BOTTOM
   * @property {Number} BOTTOM_LEFT
   * @property {Number} LEFT
   */
t.OverlayPlacement=t.Placement;t.OverlayRotationMode=t.freezeObject({NO_ROTATION:1,EXACT:2,BOUNDING_BOX:3});
/**
   * @class Overlay
   * @classdesc Provides a way to float an HTML element on top of the viewer element.
   *
   * @memberof OpenSeadragon
   * @param {Object} options
   * @param {Element} options.element
   * @param {OpenSeadragon.Point|OpenSeadragon.Rect} options.location - The
   * location of the overlay on the image. If a {@link OpenSeadragon.Point}
   * is specified, the overlay will be located at this location with respect
   * to the placement option. If a {@link OpenSeadragon.Rect} is specified,
   * the overlay will be placed at this location with the corresponding width
   * and height and placement TOP_LEFT.
   * @param {OpenSeadragon.Placement} [options.placement=OpenSeadragon.Placement.TOP_LEFT]
   * Defines what part of the overlay should be at the specified options.location
   * @param {OpenSeadragon.Overlay.OnDrawCallback} [options.onDraw]
   * @param {Boolean} [options.checkResize=true] Set to false to avoid to
   * check the size of the overlay every time it is drawn in the directions
   * which are not scaled. It will improve performances but will cause a
   * misalignment if the overlay size changes.
   * @param {Number} [options.width] The width of the overlay in viewport
   * coordinates. If specified, the width of the overlay will be adjusted when
   * the zoom changes.
   * @param {Number} [options.height] The height of the overlay in viewport
   * coordinates. If specified, the height of the overlay will be adjusted when
   * the zoom changes.
   * @param {Boolean} [options.rotationMode=OpenSeadragon.OverlayRotationMode.EXACT]
   * How to handle the rotation of the viewport.
   */t.Overlay=function(i,n,r){
/**
     * onDraw callback signature used by {@link OpenSeadragon.Overlay}.
     *
     * @callback OnDrawCallback
     * @memberof OpenSeadragon.Overlay
     * @param {OpenSeadragon.Point} position
     * @param {OpenSeadragon.Point} size
     * @param {Element} element
     */
var o;o=t.isPlainObject(i)?i:{element:i,location:n,placement:r};(this||e).elementWrapper=document.createElement("div");(this||e).element=o.element;(this||e).elementWrapper.appendChild((this||e).element);(this||e).element.id?(this||e).elementWrapper.id="overlay-wrapper-"+(this||e).element.id:(this||e).elementWrapper.id="overlay-wrapper";(this||e).style=(this||e).elementWrapper.style;this._init(o)};t.Overlay.prototype={_init:function(i){(this||e).location=i.location;(this||e).placement=i.placement===void 0?t.Placement.TOP_LEFT:i.placement;(this||e).onDraw=i.onDraw;(this||e).checkResize=i.checkResize===void 0||i.checkResize;(this||e).width=i.width===void 0?null:i.width;(this||e).height=i.height===void 0?null:i.height;(this||e).rotationMode=i.rotationMode||t.OverlayRotationMode.EXACT;if((this||e).location instanceof t.Rect){(this||e).width=(this||e).location.width;(this||e).height=(this||e).location.height;(this||e).location=(this||e).location.getTopLeft();(this||e).placement=t.Placement.TOP_LEFT}(this||e).scales=(this||e).width!==null&&(this||e).height!==null;(this||e).bounds=new t.Rect((this||e).location.x,(this||e).location.y,(this||e).width,(this||e).height);(this||e).position=(this||e).location},
/**
     * Internal function to adjust the position of an overlay
     * depending on it size and placement.
     * @function
     * @param {OpenSeadragon.Point} position
     * @param {OpenSeadragon.Point} size
     */
adjust:function(i,n){var r=t.Placement.properties[(this||e).placement];if(r){r.isHorizontallyCentered?i.x-=n.x/2:r.isRight&&(i.x-=n.x);r.isVerticallyCentered?i.y-=n.y/2:r.isBottom&&(i.y-=n.y)}},destroy:function(){var i=(this||e).elementWrapper;var n=(this||e).style;if(i.parentNode){i.parentNode.removeChild(i);if(i.prevElementParent){n.display="none";document.body.appendChild(i)}}(this||e).onDraw=null;n.top="";n.left="";n.position="";(this||e).width!==null&&(n.width="");(this||e).height!==null&&(n.height="");var r=t.getCssPropertyWithVendorPrefix("transformOrigin");var o=t.getCssPropertyWithVendorPrefix("transform");if(r&&o){n[r]="";n[o]=""}},
/**
     * @function
     * @param {Element} container
     */
drawHTML:function(i,n){var r=(this||e).elementWrapper;if(r.parentNode!==i){r.prevElementParent=r.parentNode;r.prevNextSibling=r.nextSibling;i.appendChild(r);(this||e).style.position="absolute";(this||e).size=t.getElementSize((this||e).elementWrapper)}var o=this._getOverlayPositionAndSize(n);var s=o.position;var a=(this||e).size=o.size;var l="";n.overlayPreserveContentDirection&&(l=n.flipped?" scaleX(-1)":" scaleX(1)");var h=n.flipped?-o.rotate:o.rotate;var u=n.flipped?" scaleX(-1)":"";if((this||e).onDraw)this.onDraw(s,a,(this||e).element);else{var c=(this||e).style;var d=(this||e).element.style;d.display="block";c.left=s.x+"px";c.top=s.y+"px";(this||e).width!==null&&(d.width=a.x+"px");(this||e).height!==null&&(d.height=a.y+"px");var p=t.getCssPropertyWithVendorPrefix("transformOrigin");var g=t.getCssPropertyWithVendorPrefix("transform");if(p&&g)if(h&&!n.flipped){d[g]="";c[p]=this._getTransformOrigin();c[g]="rotate("+h+"deg)"}else if(!h&&n.flipped){d[g]=l;c[p]=this._getTransformOrigin();c[g]=u}else if(h&&n.flipped){d[g]=l;c[p]=this._getTransformOrigin();c[g]="rotate("+h+"deg)"+u}else{d[g]="";c[p]="";c[g]=""}c.display="flex"}},_getOverlayPositionAndSize:function(i){var n=i.pixelFromPoint((this||e).location,true);var r=this._getSizeInPixels(i);this.adjust(n,r);var o=0;if(i.getRotation(true)&&(this||e).rotationMode!==t.OverlayRotationMode.NO_ROTATION)if((this||e).rotationMode===t.OverlayRotationMode.BOUNDING_BOX&&(this||e).width!==null&&(this||e).height!==null){var s=new t.Rect(n.x,n.y,r.x,r.y);var a=this._getBoundingBox(s,i.getRotation(true));n=a.getTopLeft();r=a.getSize()}else o=i.getRotation(true);i.flipped&&(n.x=i.getContainerSize().x-n.x);return{position:n,size:r,rotate:o}},_getSizeInPixels:function(i){var n=(this||e).size.x;var r=(this||e).size.y;if((this||e).width!==null||(this||e).height!==null){var o=i.deltaPixelsFromPointsNoRotate(new t.Point((this||e).width||0,(this||e).height||0),true);(this||e).width!==null&&(n=o.x);(this||e).height!==null&&(r=o.y)}if((this||e).checkResize&&((this||e).width===null||(this||e).height===null)){var s=(this||e).size=t.getElementSize((this||e).elementWrapper);(this||e).width===null&&(n=s.x);(this||e).height===null&&(r=s.y)}return new t.Point(n,r)},_getBoundingBox:function(e,t){var i=this._getPlacementPoint(e);return e.rotate(t,i).getBoundingBox()},_getPlacementPoint:function(i){var n=new t.Point(i.x,i.y);var r=t.Placement.properties[(this||e).placement];if(r){r.isHorizontallyCentered?n.x+=i.width/2:r.isRight&&(n.x+=i.width);r.isVerticallyCentered?n.y+=i.height/2:r.isBottom&&(n.y+=i.height)}return n},_getTransformOrigin:function(){var i="";var n=t.Placement.properties[(this||e).placement];if(!n)return i;n.isLeft?i="left":n.isRight&&(i="right");n.isTop?i+=" top":n.isBottom&&(i+=" bottom");return i},
/**
     * Changes the overlay settings.
     * @function
     * @param {OpenSeadragon.Point|OpenSeadragon.Rect|Object} location
     * If an object is specified, the options are the same than the constructor
     * except for the element which can not be changed.
     * @param {OpenSeadragon.Placement} placement
     */
update:function(i,n){var r=t.isPlainObject(i)?i:{location:i,placement:n};this._init({location:r.location||(this||e).location,placement:r.placement!==void 0?r.placement:(this||e).placement,onDraw:r.onDraw||(this||e).onDraw,checkResize:r.checkResize||(this||e).checkResize,width:r.width!==void 0?r.width:(this||e).width,height:r.height!==void 0?r.height:(this||e).height,rotationMode:r.rotationMode||(this||e).rotationMode})},
/**
     * Returns the current bounds of the overlay in viewport coordinates
     * @function
     * @param {OpenSeadragon.Viewport} viewport the viewport
     * @returns {OpenSeadragon.Rect} overlay bounds
     */
getBounds:function(i){t.console.assert(i,"A viewport must now be passed to Overlay.getBounds.");var n=(this||e).width;var r=(this||e).height;if(n===null||r===null){var o=i.deltaPointsFromPixelsNoRotate((this||e).size,true);n===null&&(n=o.x);r===null&&(r=o.y)}var s=(this||e).location.clone();this.adjust(s,new t.Point(n,r));return this._adjustBoundsForRotation(i,new t.Rect(s.x,s.y,n,r))},_adjustBoundsForRotation:function(i,n){if(!i||i.getRotation(true)===0||(this||e).rotationMode===t.OverlayRotationMode.EXACT)return n;if((this||e).rotationMode===t.OverlayRotationMode.BOUNDING_BOX){if((this||e).width===null||(this||e).height===null)return n;var r=this._getOverlayPositionAndSize(i);return i.viewerElementToViewportRectangle(new t.Rect(r.position.x,r.position.y,r.size.x,r.size.y))}return n.rotate(-i.getRotation(true),this._getPlacementPoint(n))}}})(OpenSeadragon);(function(e){const t=e;
/**
   * @class OpenSeadragon.DrawerBase
   * @classdesc Base class for Drawers that handle rendering of tiles for an {@link OpenSeadragon.Viewer}.
   * @param {Object} options - Options for this Drawer.
   * @param {OpenSeadragon.Viewer} options.viewer - The Viewer that owns this Drawer.
   * @param {OpenSeadragon.Viewport} options.viewport - Reference to Viewer viewport.
   * @param {HTMLElement} options.element - Parent element.
   * @abstract
   */t.DrawerBase=class DrawerBase{constructor(t){e.console.assert(t.viewer,"[Drawer] options.viewer is required");e.console.assert(t.viewport,"[Drawer] options.viewport is required");e.console.assert(t.element,"[Drawer] options.element is required");this.viewer=t.viewer;this.viewport=t.viewport;this.debugGridColor=typeof t.debugGridColor==="string"?[t.debugGridColor]:t.debugGridColor||e.DEFAULT_SETTINGS.debugGridColor;this.options=t.options||{};this.container=e.getElement(t.element);this._renderingTarget=this._createDrawingElement();this.canvas.style.width="100%";this.canvas.style.height="100%";this.canvas.style.position="absolute";this.canvas.style.left="0";e.setElementOpacity(this.canvas,this.viewer.opacity,true);e.setElementPointerEventsNone(this.canvas);e.setElementTouchActionNone(this.canvas);this.container.style.textAlign="left";this.container.appendChild(this.canvas);this._checkForAPIOverrides()}get canvas(){return this._renderingTarget}get element(){e.console.error("Drawer.element is deprecated. Use Drawer.container instead.");return this.container}
/**
     * @abstract
     * @returns {String | undefined} What type of drawer this is. Must be overridden by extending classes.
     */getType(){e.console.error("Drawer.getType must be implemented by child class")}
/**
     * @abstract
     * @returns {Boolean} Whether the drawer implementation is supported by the browser. Must be overridden by extending classes.
     */static isSupported(){e.console.error("Drawer.isSupported must be implemented by child class")}
/**
     * @abstract
     * @returns {Element} the element to draw into
     * @private
     */_createDrawingElement(){e.console.error("Drawer._createDrawingElement must be implemented by child class");return null}
/**
     * @abstract
     * @param {Array} tiledImages - An array of TiledImages that are ready to be drawn.
     * @private
     */draw(t){e.console.error("Drawer.draw must be implemented by child class")}
/**
     * @abstract
     * @returns {Boolean} True if rotation is supported.
     */canRotate(){e.console.error("Drawer.canRotate must be implemented by child class")}destroy(){e.console.error("Drawer.destroy must be implemented by child class")}
/**
     * @param {TiledImage} tiledImage the tiled image that is calling the function
     * @returns {Boolean} Whether this drawer requires enforcing minimum tile overlap to avoid showing seams.
     * @private
     */minimumOverlapRequired(e){return false}
/**
     * @abstract
     * @param {Boolean} [imageSmoothingEnabled] - Whether or not the image is
     * drawn smoothly on the canvas; see imageSmoothingEnabled in
     * {@link OpenSeadragon.Options} for more explanation.
     */setImageSmoothingEnabled(t){e.console.error("Drawer.setImageSmoothingEnabled must be implemented by child class")}
/**
     * Optional public API to draw a rectangle (e.g. for debugging purposes)
     * Child classes can override this method if they wish to support this
     * @param {OpenSeadragon.Rect} rect
     */drawDebuggingRect(t){e.console.warn("[drawer].drawDebuggingRect is not implemented by this drawer")}clear(){e.console.warn("[drawer].clear() is deprecated. The drawer is responsible for clearing itself as needed before drawing tiles.")}_checkForAPIOverrides(){if(this._createDrawingElement===e.DrawerBase.prototype._createDrawingElement)throw new Error("[drawer]._createDrawingElement must be implemented by child class");if(this.draw===e.DrawerBase.prototype.draw)throw new Error("[drawer].draw must be implemented by child class");if(this.canRotate===e.DrawerBase.prototype.canRotate)throw new Error("[drawer].canRotate must be implemented by child class");if(this.destroy===e.DrawerBase.prototype.destroy)throw new Error("[drawer].destroy must be implemented by child class");if(this.setImageSmoothingEnabled===e.DrawerBase.prototype.setImageSmoothingEnabled)throw new Error("[drawer].setImageSmoothingEnabled must be implemented by child class")}
/**
     * Scale from OpenSeadragon viewer rectangle to drawer rectangle
     * (ignoring rotation)
     * @param {OpenSeadragon.Rect} rectangle - The rectangle in viewport coordinate system.
     * @returns {OpenSeadragon.Rect} Rectangle in drawer coordinate system.
     */
viewportToDrawerRectangle(t){var i=this.viewport.pixelFromPointNoRotate(t.getTopLeft(),true);var n=this.viewport.deltaPixelsFromPointsNoRotate(t.getSize(),true);return new e.Rect(i.x*e.pixelDensityRatio,i.y*e.pixelDensityRatio,n.x*e.pixelDensityRatio,n.y*e.pixelDensityRatio)}
/**
     * This function converts the given point from to the drawer coordinate by
     * multiplying it with the pixel density.
     * This function does not take rotation into account, thus assuming provided
     * point is at 0 degree.
     * @param {OpenSeadragon.Point} point - the pixel point to convert
     * @returns {OpenSeadragon.Point} Point in drawer coordinate system.
     */viewportCoordToDrawerCoord(t){var i=this.viewport.pixelFromPointNoRotate(t,true);return new e.Point(i.x*e.pixelDensityRatio,i.y*e.pixelDensityRatio)}
/**
     * Calculate width and height of the canvas based on viewport dimensions
     * and pixelDensityRatio
     * @private
     * @returns {OpenSeadragon.Point} {x, y} size of the canvas
     */
_calculateCanvasSize(){var i=e.pixelDensityRatio;var n=this.viewport.getContainerSize();return new t.Point(Math.round(n.x*i),Math.round(n.y*i))}_raiseTiledImageDrawnEvent(e,t){this.viewer&&
/**
      *  Raised when a tiled image is drawn to the canvas. Used internally for testing.
      *  The update-viewport event is preferred if you want to know when a frame has been drawn.
      *
      * @event tiled-image-drawn
      * @memberof OpenSeadragon.Viewer
      * @type {object}
      * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
      * @property {OpenSeadragon.TiledImage} tiledImage - Which TiledImage is being drawn.
      * @property {Array} tiles - An array of Tile objects that were drawn.
      * @property {?Object} userData - Arbitrary subscriber-defined object.
      * @private
      */
this.viewer.raiseEvent("tiled-image-drawn",{tiledImage:e,tiles:t})}_raiseDrawerErrorEvent(e,t){this.viewer&&
/**
      *  Raised when a tiled image is drawn to the canvas. Used internally for testing.
      *  The update-viewport event is preferred if you want to know when a frame has been drawn.
      *
      * @event drawer-error
      * @memberof OpenSeadragon.Viewer
      * @type {object}
      * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
      * @property {OpenSeadragon.TiledImage} tiledImage - Which TiledImage is being drawn.
      * @property {OpenSeadragon.DrawerBase} drawer - The drawer that raised the error.
      * @property {String} error - A message describing the error.
      * @property {?Object} userData - Arbitrary subscriber-defined object.
      * @private
      */
this.viewer.raiseEvent("drawer-error",{tiledImage:e,drawer:this,error:t})}}})(OpenSeadragon);(function(e){const t=e;
/**
   * @class OpenSeadragon.HTMLDrawer
   * @extends OpenSeadragon.DrawerBase
   * @classdesc HTML-based implementation of DrawerBase for an {@link OpenSeadragon.Viewer}.
   * @param {Object} options - Options for this Drawer.
   * @param {OpenSeadragon.Viewer} options.viewer - The Viewer that owns this Drawer.
   * @param {OpenSeadragon.Viewport} options.viewport - Reference to Viewer viewport.
   * @param {Element} options.element - Parent element.
   * @param {Number} [options.debugGridColor] - See debugGridColor in {@link OpenSeadragon.Options} for details.
   */class HTMLDrawer extends t.DrawerBase{constructor(e){super(e);this.viewer.rejectEventHandler("tile-drawing","The HTMLDrawer does not raise the tile-drawing event");this.viewer.allowEventHandler("tile-drawn")}
/**
     * @returns {Boolean} always true
     */static isSupported(){return true}
/**
     *
     * @returns 'html'
     */getType(){return"html"}
/**
     * @param {TiledImage} tiledImage the tiled image that is calling the function
     * @returns {Boolean} Whether this drawer requires enforcing minimum tile overlap to avoid showing seams.
     * @private
     */minimumOverlapRequired(e){return true}
/**
     * create the HTML element (e.g. canvas, div) that the image will be drawn into
     * @returns {Element} the div to draw into
     */_createDrawingElement(){let t=e.makeNeutralElement("div");return t}draw(e){var t=this;this._prepareNewFrame();e.forEach((function(e){e.opacity!==0&&t._drawTiles(e)}))}
/**
     * @returns {Boolean} False - rotation is not supported.
     */canRotate(){return false}destroy(){this.container.removeChild(this.canvas)}
/**
     * This function is ignored by the HTML Drawer. Implementing it is required by DrawerBase.
     * @param {Boolean} [imageSmoothingEnabled] - Whether or not the image is
     * drawn smoothly on the canvas; see imageSmoothingEnabled in
     * {@link OpenSeadragon.Options} for more explanation.
     */setImageSmoothingEnabled(){}_prepareNewFrame(){this.canvas.innerHTML=""}_drawTiles(e){var t=e.getTilesToDraw().map((e=>e.tile));if(e.opacity!==0&&(t.length!==0||e.placeholderFillStyle))for(var i=t.length-1;i>=0;i--){var n=t[i];this._drawTile(n);this.viewer&&
/**
           * Raised when a tile is drawn to the canvas. Only valid for
           * context2d and html drawers.
           *
           * @event tile-drawn
           * @memberof OpenSeadragon.Viewer
           * @type {object}
           * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
           * @property {OpenSeadragon.TiledImage} tiledImage - Which TiledImage is being drawn.
           * @property {OpenSeadragon.Tile} tile
           * @property {?Object} userData - Arbitrary subscriber-defined object.
           */
this.viewer.raiseEvent("tile-drawn",{tiledImage:e,tile:n})}}
/**
     * Draws the given tile.
     * @private
     * @param {OpenSeadragon.Tile} tile - The tile to draw.
     * @param {Function} drawingHandler - Method for firing the drawing event if using canvas.
     * drawingHandler({context, tile, rendered})
     */_drawTile(t){e.console.assert(t,"[Drawer._drawTile] tile is required");let i=this.canvas;if(t.cacheImageRecord)if(t.loaded){if(!t.element){var n=t.getImage();if(!n)return;t.element=e.makeNeutralElement("div");t.imgElement=n.cloneNode();t.imgElement.style.msInterpolationMode="nearest-neighbor";t.imgElement.style.width="100%";t.imgElement.style.height="100%";t.style=t.element.style;t.style.position="absolute"}t.element.parentNode!==i&&i.appendChild(t.element);t.imgElement.parentNode!==t.element&&t.element.appendChild(t.imgElement);t.style.top=t.position.y+"px";t.style.left=t.position.x+"px";t.style.height=t.size.y+"px";t.style.width=t.size.x+"px";t.flipped&&(t.style.transform="scaleX(-1)");e.setElementOpacity(t.element,t.opacity)}else e.console.warn("Attempting to draw tile %s when it's not yet loaded.",t.toString());else e.console.warn("[Drawer._drawTileToHTML] attempting to draw tile %s when it's not cached",t.toString())}}e.HTMLDrawer=HTMLDrawer})(OpenSeadragon);(function(e){const t=e;
/**
   * @class OpenSeadragon.CanvasDrawer
   * @extends OpenSeadragon.DrawerBase
   * @classdesc Default implementation of CanvasDrawer for an {@link OpenSeadragon.Viewer}.
   * @param {Object} options - Options for this Drawer.
   * @param {OpenSeadragon.Viewer} options.viewer - The Viewer that owns this Drawer.
   * @param {OpenSeadragon.Viewport} options.viewport - Reference to Viewer viewport.
   * @param {Element} options.element - Parent element.
   * @param {Number} [options.debugGridColor] - See debugGridColor in {@link OpenSeadragon.Options} for details.
   */class CanvasDrawer extends t.DrawerBase{constructor(e){super(e);this.context=this.canvas.getContext("2d");this.sketchCanvas=null;this.sketchContext=null;this._imageSmoothingEnabled=true;this.viewer.allowEventHandler("tile-drawn");this.viewer.allowEventHandler("tile-drawing")}
/**
     * @returns {Boolean} true if canvas is supported by the browser, otherwise false
     */static isSupported(){return e.supportsCanvas}getType(){return"canvas"}
/**
     * create the HTML element (e.g. canvas, div) that the image will be drawn into
     * @returns {Element} the canvas to draw into
     */_createDrawingElement(){let t=e.makeNeutralElement("canvas");let i=this._calculateCanvasSize();t.width=i.x;t.height=i.y;return t}draw(e){this._prepareNewFrame();this.viewer.viewport.getFlip()!==this._viewportFlipped&&this._flip();for(const t of e)t.opacity!==0&&this._drawTiles(t)}
/**
     * @returns {Boolean} True - rotation is supported.
     */canRotate(){return true}destroy(){this.canvas.width=1;this.canvas.height=1;this.sketchCanvas=null;this.sketchContext=null;this.container.removeChild(this.canvas)}
/**
     * @param {TiledImage} tiledImage the tiled image that is calling the function
     * @returns {Boolean} Whether this drawer requires enforcing minimum tile overlap to avoid showing seams.
     * @private
     */minimumOverlapRequired(e){return true}
/**
     * Turns image smoothing on or off for this viewer. Note: Ignored in some (especially older) browsers that do not support this property.
     *
     * @function
     * @param {Boolean} [imageSmoothingEnabled] - Whether or not the image is
     * drawn smoothly on the canvas; see imageSmoothingEnabled in
     * {@link OpenSeadragon.Options} for more explanation.
     */setImageSmoothingEnabled(e){this._imageSmoothingEnabled=!!e;this._updateImageSmoothingEnabled(this.context);this.viewer.forceRedraw()}
/**
     * Draw a rectangle onto the canvas
     * @param {OpenSeadragon.Rect} rect
     */drawDebuggingRect(t){var i=this.context;i.save();i.lineWidth=2*e.pixelDensityRatio;i.strokeStyle=this.debugGridColor[0];i.fillStyle=this.debugGridColor[0];i.strokeRect(t.x*e.pixelDensityRatio,t.y*e.pixelDensityRatio,t.width*e.pixelDensityRatio,t.height*e.pixelDensityRatio);i.restore()}get _viewportFlipped(){return this.context.getTransform().a<0}_raiseTileDrawingEvent(e,t,i,n){
/**
       * This event is fired just before the tile is drawn giving the application a chance to alter the image.
       *
       * NOTE: This event is only fired when the 'canvas' drawer is being used
       *
       * @event tile-drawing
       * @memberof OpenSeadragon.Viewer
       * @type {object}
       * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
       * @property {OpenSeadragon.Tile} tile - The Tile being drawn.
       * @property {OpenSeadragon.TiledImage} tiledImage - Which TiledImage is being drawn.
       * @property {CanvasRenderingContext2D} context - The HTML canvas context being drawn into.
       * @property {CanvasRenderingContext2D} rendered - The HTML canvas context containing the tile imagery.
       * @property {?Object} userData - Arbitrary subscriber-defined object.
       */
this.viewer.raiseEvent("tile-drawing",{tiledImage:e,context:t,tile:i,rendered:n})}_prepareNewFrame(){var e=this._calculateCanvasSize();if(this.canvas.width!==e.x||this.canvas.height!==e.y){this.canvas.width=e.x;this.canvas.height=e.y;this._updateImageSmoothingEnabled(this.context);if(this.sketchCanvas!==null){var t=this._calculateSketchCanvasSize();this.sketchCanvas.width=t.x;this.sketchCanvas.height=t.y;this._updateImageSmoothingEnabled(this.sketchContext)}}this._clear()}
/**
     * @private
     * @param {Boolean} useSketch Whether to clear sketch canvas or main canvas
     * @param {OpenSeadragon.Rect} [bounds] The rectangle to clear
     */_clear(e,t){var i=this._getContext(e);if(t)i.clearRect(t.x,t.y,t.width,t.height);else{var n=i.canvas;i.clearRect(0,0,n.width,n.height)}}_drawTiles(t){var i=t.getTilesToDraw().map((e=>e.tile));if(t.opacity!==0&&(i.length!==0||t.placeholderFillStyle)){var n=i[0];var r;n&&(r=t.opacity<1||t.compositeOperation&&t.compositeOperation!=="source-over"||!t._isBottomItem()&&t.source.hasTransparency(n.context2D,n.getUrl(),n.ajaxHeaders,n.postData));var o;var s;var a=this.viewport.getZoom(true);var l=t.viewportToImageZoom(a);if(i.length>1&&l>t.smoothTileEdgesMinZoom&&!t.iOSDevice&&t.getRotation(true)%360===0){r=true;o=n.getScaleForEdgeSmoothing();s=n.getTranslationForEdgeSmoothing(o,this._getCanvasSize(false),this._getCanvasSize(true))}var h;if(r){if(!o){h=this.viewport.viewportToViewerElementRectangle(t.getClippedBounds(true)).getIntegerBoundingBox();h=h.times(e.pixelDensityRatio)}this._clear(true,h)}o||this._setRotations(t,r);var u=false;if(t._clip){this._saveContext(r);var c=t.imageToViewportRectangle(t._clip,true);c=c.rotate(-t.getRotation(true),t._getRotationPoint(true));var d=this.viewportToDrawerRectangle(c);o&&(d=d.times(o));s&&(d=d.translate(s));this._setClip(d,r);u=true}if(t._croppingPolygons){var p=this;u||this._saveContext(r);try{var g=t._croppingPolygons.map((function(e){return e.map((function(e){var i=t.imageToViewportCoordinates(e.x,e.y,true).rotate(-t.getRotation(true),t._getRotationPoint(true));var n=p.viewportCoordToDrawerCoord(i);o&&(n=n.times(o));s&&(n=n.plus(s));return n}))}));this._clipWithPolygons(g,r)}catch(t){e.console.error(t)}u=true}t._hasOpaqueTile=false;if(t.placeholderFillStyle&&t._hasOpaqueTile===false){let e=this.viewportToDrawerRectangle(t.getBoundsNoRotate(true));o&&(e=e.times(o));s&&(e=e.translate(s));let i=null;i=typeof t.placeholderFillStyle==="function"?t.placeholderFillStyle(t,this.context):t.placeholderFillStyle;this._drawRectangle(e,i,r)}var v=determineSubPixelRoundingRule(t.subPixelRoundingForTransparency);var m=false;if(v===e.SUBPIXEL_ROUNDING_OCCURRENCES.ALWAYS)m=true;else if(v===e.SUBPIXEL_ROUNDING_OCCURRENCES.ONLY_AT_REST){var f=this.viewer&&this.viewer.isAnimating();m=!f}for(var y=0;y<i.length;y++){n=i[y];this._drawTile(n,t,r,o,s,m,t.source);this.viewer&&
/**
           * Raised when a tile is drawn to the canvas. Only valid for
           * context2d and html drawers.
           *
           * @event tile-drawn
           * @memberof OpenSeadragon.Viewer
           * @type {object}
           * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
           * @property {OpenSeadragon.TiledImage} tiledImage - Which TiledImage is being drawn.
           * @property {OpenSeadragon.Tile} tile
           * @property {?Object} userData - Arbitrary subscriber-defined object.
           */
this.viewer.raiseEvent("tile-drawn",{tiledImage:t,tile:n})}u&&this._restoreContext(r);if(!o){t.getRotation(true)%360!==0&&this._restoreRotationChanges(r);this.viewport.getRotation(true)%360!==0&&this._restoreRotationChanges(r)}if(r){o&&this._setRotations(t);this.blendSketch({opacity:t.opacity,scale:o,translate:s,compositeOperation:t.compositeOperation,bounds:h});if(o){t.getRotation(true)%360!==0&&this._restoreRotationChanges(false);this.viewport.getRotation(true)%360!==0&&this._restoreRotationChanges(false)}}this._drawDebugInfo(t,i);this._raiseTiledImageDrawnEvent(t,i)}}
/**
     * Draws special debug information for a TiledImage if in debug mode.
     * @private
     * @param {OpenSeadragon.Tile[]} lastDrawn - An unordered list of Tiles drawn last frame.
     */_drawDebugInfo(t,i){if(t.debugMode)for(var n=i.length-1;n>=0;n--){var r=i[n];try{this._drawDebugInfoOnTile(r,i.length,n,t)}catch(t){e.console.error(t)}}}
/**
     * This function will create multiple polygon paths on the drawing context by provided polygons,
     * then clip the context to the paths.
     * @private
     * @param {OpenSeadragon.Point[][]} polygons - an array of polygons. A polygon is an array of OpenSeadragon.Point
     * @param {Boolean} useSketch - Whether to use the sketch canvas or not.
     */_clipWithPolygons(e,t){var i=this._getContext(t);i.beginPath();for(const t of e)for(const[e,n]of t.entries())i[e===0?"moveTo":"lineTo"](n.x,n.y);i.clip()}
/**
     * Draws the given tile.
     * @private
     * @param {OpenSeadragon.Tile} tile - The tile to draw.
     * @param {OpenSeadragon.TiledImage} tiledImage - The tiled image being drawn.
     * @param {Boolean} useSketch - Whether to use the sketch canvas or not.
     * where <code>rendered</code> is the context with the pre-drawn image.
     * @param {Float} [scale=1] - Apply a scale to tile position and size. Defaults to 1.
     * @param {OpenSeadragon.Point} [translate] A translation vector to offset tile position
     * @param {Boolean} [shouldRoundPositionAndSize] - Tells whether to round
     * position and size of tiles supporting alpha channel in non-transparency
     * context.
     * @param {OpenSeadragon.TileSource} source - The source specification of the tile.
     */_drawTile(t,i,n,r,o,s,a){e.console.assert(t,"[Drawer._drawTile] tile is required");e.console.assert(i,"[Drawer._drawTile] drawingHandler is required");var l=this._getContext(n);r=r||1;this._drawTileToCanvas(t,l,i,r,o,s,a)}
/**
     * Renders the tile in a canvas-based context.
     * @private
     * @function
     * @param {OpenSeadragon.Tile} tile - the tile to draw to the canvas
     * @param {Canvas} context
     * @param {OpenSeadragon.TiledImage} tiledImage - Method for firing the drawing event.
     * drawingHandler({context, tile, rendered})
     * where <code>rendered</code> is the context with the pre-drawn image.
     * @param {Number} [scale=1] - Apply a scale to position and size
     * @param {OpenSeadragon.Point} [translate] - A translation vector
     * @param {Boolean} [shouldRoundPositionAndSize] - Tells whether to round
     * position and size of tiles supporting alpha channel in non-transparency
     * context.
     * @param {OpenSeadragon.TileSource} source - The source specification of the tile.
     */_drawTileToCanvas(t,i,n,r,o,s,a){var l,h=t.position.times(e.pixelDensityRatio),u=t.size.times(e.pixelDensityRatio);if(t.context2D||t.cacheImageRecord){l=t.getCanvasContext();if(t.loaded&&l){i.save();if(typeof r==="number"&&r!==1){h=h.times(r);u=u.times(r)}o instanceof e.Point&&(h=h.plus(o));if(i.globalAlpha===1&&t.hasTransparency){if(s){h.x=Math.round(h.x);h.y=Math.round(h.y);u.x=Math.round(u.x);u.y=Math.round(u.y)}i.clearRect(h.x,h.y,u.x,u.y)}this._raiseTileDrawingEvent(n,i,t,l);var c,d;if(t.sourceBounds){c=Math.min(t.sourceBounds.width,l.canvas.width);d=Math.min(t.sourceBounds.height,l.canvas.height)}else{c=l.canvas.width;d=l.canvas.height}i.translate(h.x+u.x/2,0);t.flipped&&i.scale(-1,1);i.drawImage(l.canvas,0,0,c,d,-u.x/2,h.y,u.x,u.y);i.restore()}else e.console.warn("Attempting to draw tile %s when it's not yet loaded.",t.toString())}else e.console.warn("[Drawer._drawTileToCanvas] attempting to draw tile %s when it's not cached",t.toString())}
/**
     * Get the context of the main or sketch canvas
     * @private
     * @param {Boolean} useSketch
     * @returns {CanvasRenderingContext2D}
     */_getContext(e){var t=this.context;if(e){if(this.sketchCanvas===null){this.sketchCanvas=document.createElement("canvas");var i=this._calculateSketchCanvasSize();this.sketchCanvas.width=i.x;this.sketchCanvas.height=i.y;this.sketchContext=this.sketchCanvas.getContext("2d");if(this.viewport.getRotation()===0){var n=this;this.viewer.addHandler("rotate",(function resizeSketchCanvas(){if(n.viewport.getRotation()!==0){n.viewer.removeHandler("rotate",resizeSketchCanvas);var e=n._calculateSketchCanvasSize();n.sketchCanvas.width=e.x;n.sketchCanvas.height=e.y}}))}this._updateImageSmoothingEnabled(this.sketchContext)}t=this.sketchContext}return t}
/**
     * Save the context of the main or sketch canvas
     * @private
     * @param {Boolean} useSketch
     */_saveContext(e){this._getContext(e).save()}
/**
     * Restore the context of the main or sketch canvas
     * @private
     * @param {Boolean} useSketch
     */_restoreContext(e){this._getContext(e).restore()}_setClip(e,t){var i=this._getContext(t);i.beginPath();i.rect(e.x,e.y,e.width,e.height);i.clip()}_drawRectangle(e,t,i){var n=this._getContext(i);n.save();n.fillStyle=t;n.fillRect(e.x,e.y,e.width,e.height);n.restore()}
/**
     * Blends the sketch canvas in the main canvas.
     * @param {Object} options The options
     * @param {Float} options.opacity The opacity of the blending.
     * @param {Float} [options.scale=1] The scale at which tiles were drawn on
     * the sketch. Default is 1.
     * Use scale to draw at a lower scale and then enlarge onto the main canvas.
     * @param {OpenSeadragon.Point} [options.translate] A translation vector
     * that was used to draw the tiles
     * @param {String} [options.compositeOperation] - How the image is
     * composited onto other images; see compositeOperation in
     * {@link OpenSeadragon.Options} for possible values.
     * @param {OpenSeadragon.Rect} [options.bounds] The part of the sketch
     * canvas to blend in the main canvas. If specified, options.scale and
     * options.translate get ignored.
     */blendSketch(t,i,n,r){var o=t;e.isPlainObject(o)||(o={opacity:t,scale:i,translate:n,compositeOperation:r});t=o.opacity;r=o.compositeOperation;var s=o.bounds;this.context.save();this.context.globalAlpha=t;r&&(this.context.globalCompositeOperation=r);if(s){if(s.x<0){s.width+=s.x;s.x=0}s.x+s.width>this.canvas.width&&(s.width=this.canvas.width-s.x);if(s.y<0){s.height+=s.y;s.y=0}s.y+s.height>this.canvas.height&&(s.height=this.canvas.height-s.y);this.context.drawImage(this.sketchCanvas,s.x,s.y,s.width,s.height,s.x,s.y,s.width,s.height)}else{i=o.scale||1;n=o.translate;var a=n instanceof e.Point?n:new e.Point(0,0);var l=0;var h=0;if(n){var u=this.sketchCanvas.width-this.canvas.width;var c=this.sketchCanvas.height-this.canvas.height;l=Math.round(u/2);h=Math.round(c/2)}this.context.drawImage(this.sketchCanvas,a.x-l*i,a.y-h*i,(this.canvas.width+2*l)*i,(this.canvas.height+2*h)*i,-l,-h,this.canvas.width+2*l,this.canvas.height+2*h)}this.context.restore()}_drawDebugInfoOnTile(t,i,n,r){var o=this.viewer.world.getIndexOfItem(r)%this.debugGridColor.length;var s=this.context;s.save();s.lineWidth=2*e.pixelDensityRatio;s.font="small-caps bold "+13*e.pixelDensityRatio+"px arial";s.strokeStyle=this.debugGridColor[o];s.fillStyle=this.debugGridColor[o];this._setRotations(r);this._viewportFlipped&&this._flip({point:t.position.plus(t.size.divide(2))});s.strokeRect(t.position.x*e.pixelDensityRatio,t.position.y*e.pixelDensityRatio,t.size.x*e.pixelDensityRatio,t.size.y*e.pixelDensityRatio);var a=(t.position.x+t.size.x/2)*e.pixelDensityRatio;var l=(t.position.y+t.size.y/2)*e.pixelDensityRatio;s.translate(a,l);const h=this.viewport.getRotation(true);s.rotate(Math.PI/180*-h);s.translate(-a,-l);if(t.x===0&&t.y===0){s.fillText("Zoom: "+this.viewport.getZoom(),t.position.x*e.pixelDensityRatio,(t.position.y-30)*e.pixelDensityRatio);s.fillText("Pan: "+this.viewport.getBounds().toString(),t.position.x*e.pixelDensityRatio,(t.position.y-20)*e.pixelDensityRatio)}s.fillText("Level: "+t.level,(t.position.x+10)*e.pixelDensityRatio,(t.position.y+20)*e.pixelDensityRatio);s.fillText("Column: "+t.x,(t.position.x+10)*e.pixelDensityRatio,(t.position.y+30)*e.pixelDensityRatio);s.fillText("Row: "+t.y,(t.position.x+10)*e.pixelDensityRatio,(t.position.y+40)*e.pixelDensityRatio);s.fillText("Order: "+n+" of "+i,(t.position.x+10)*e.pixelDensityRatio,(t.position.y+50)*e.pixelDensityRatio);s.fillText("Size: "+t.size.toString(),(t.position.x+10)*e.pixelDensityRatio,(t.position.y+60)*e.pixelDensityRatio);s.fillText("Position: "+t.position.toString(),(t.position.x+10)*e.pixelDensityRatio,(t.position.y+70)*e.pixelDensityRatio);this.viewport.getRotation(true)%360!==0&&this._restoreRotationChanges();r.getRotation(true)%360!==0&&this._restoreRotationChanges();s.restore()}_updateImageSmoothingEnabled(e){e.msImageSmoothingEnabled=this._imageSmoothingEnabled;e.imageSmoothingEnabled=this._imageSmoothingEnabled}
/**
     * Get the canvas size
     * @private
     * @param {Boolean} sketch If set to true return the size of the sketch canvas
     * @returns {OpenSeadragon.Point} The size of the canvas
     */_getCanvasSize(t){var i=this._getContext(t).canvas;return new e.Point(i.width,i.height)}
/**
     * Get the canvas center
     * @private
     * @param {Boolean} sketch If set to true return the center point of the sketch canvas
     * @returns {OpenSeadragon.Point} The center point of the canvas
     */_getCanvasCenter(){return new e.Point(this.canvas.width/2,this.canvas.height/2)}
/**
     * Set rotations for viewport & tiledImage
     * @private
     * @param {OpenSeadragon.TiledImage} tiledImage
     * @param {Boolean} [useSketch=false]
     */_setRotations(e,t=false){var i=false;if(this.viewport.getRotation(true)%360!==0){this._offsetForRotation({degrees:this.viewport.getRotation(true),useSketch:t,saveContext:i});i=false}e.getRotation(true)%360!==0&&this._offsetForRotation({degrees:e.getRotation(true),point:this.viewport.pixelFromPointNoRotate(e._getRotationPoint(true),true),useSketch:t,saveContext:i})}_offsetForRotation(t){var i=t.point?t.point.times(e.pixelDensityRatio):this._getCanvasCenter();var n=this._getContext(t.useSketch);n.save();n.translate(i.x,i.y);n.rotate(Math.PI/180*t.degrees);n.translate(-i.x,-i.y)}_flip(t){t=t||{};var i=t.point?t.point.times(e.pixelDensityRatio):this._getCanvasCenter();var n=this._getContext(t.useSketch);n.translate(i.x,0);n.scale(-1,1);n.translate(-i.x,0)}_restoreRotationChanges(e){var t=this._getContext(e);t.restore()}_calculateCanvasSize(){var t=e.pixelDensityRatio;var i=this.viewport.getContainerSize();return{x:Math.round(i.x*t),y:Math.round(i.y*t)}}_calculateSketchCanvasSize(){var e=this._calculateCanvasSize();if(this.viewport.getRotation()===0)return e;var t=Math.ceil(Math.sqrt(e.x*e.x+e.y*e.y));return{x:t,y:t}}}e.CanvasDrawer=CanvasDrawer;var i=e.SUBPIXEL_ROUNDING_OCCURRENCES.NEVER;
/**
   * Checks whether the input value is an invalid subpixel rounding enum value.
   * @private
   *
   * @param {SUBPIXEL_ROUNDING_OCCURRENCES} value - The subpixel rounding enum value to check.
   * @returns {Boolean} Returns true if the input value is none of the expected
   * {@link SUBPIXEL_ROUNDING_OCCURRENCES.ALWAYS}, {@link SUBPIXEL_ROUNDING_OCCURRENCES.ONLY_AT_REST} or {@link SUBPIXEL_ROUNDING_OCCURRENCES.NEVER} value.
   */function isSubPixelRoundingRuleUnknown(t){return t!==e.SUBPIXEL_ROUNDING_OCCURRENCES.ALWAYS&&t!==e.SUBPIXEL_ROUNDING_OCCURRENCES.ONLY_AT_REST&&t!==e.SUBPIXEL_ROUNDING_OCCURRENCES.NEVER}
/**
   * Ensures the returned value is always a valid subpixel rounding enum value,
   * defaulting to {@link SUBPIXEL_ROUNDING_OCCURRENCES.NEVER} if input is missing or invalid.
   * @private
   * @param {SUBPIXEL_ROUNDING_OCCURRENCES} value - The subpixel rounding enum value to normalize.
   * @returns {SUBPIXEL_ROUNDING_OCCURRENCES} Returns a valid subpixel rounding enum value.
   */function normalizeSubPixelRoundingRule(e){return isSubPixelRoundingRuleUnknown(e)?i:e}
/**
   * Ensures the returned value is always a valid subpixel rounding enum value,
   * defaulting to 'NEVER' if input is missing or invalid.
   * @private
   *
   * @param {Object} subPixelRoundingRules - A subpixel rounding enum values dictionary [{@link BROWSERS}] --> {@link SUBPIXEL_ROUNDING_OCCURRENCES}.
   * @returns {SUBPIXEL_ROUNDING_OCCURRENCES} Returns the determined subpixel rounding enum value for the
   * current browser.
   */function determineSubPixelRoundingRule(t){if(typeof t==="number")return normalizeSubPixelRoundingRule(t);if(!t||!e.Browser)return i;var n=t[e.Browser.vendor];isSubPixelRoundingRuleUnknown(n)&&(n=t["*"]);return normalizeSubPixelRoundingRule(n)}})(OpenSeadragon);(function(e){const t=e;
/**
   * @class OpenSeadragon.WebGLDrawer
   * @classdesc Default implementation of WebGLDrawer for an {@link OpenSeadragon.Viewer}. The WebGLDrawer
   * loads tile data as textures to the graphics card as soon as it is available (via the tile-ready event),
   * and unloads the data (via the image-unloaded event). The drawer utilizes a context-dependent two pass drawing pipeline.
   * For the first pass, tile composition for a given TiledImage is always done using a canvas with a WebGL context.
   * This allows tiles to be stitched together without seams or artifacts, without requiring a tile source with overlap. If overlap is present,
   * overlapping pixels are discarded. The second pass copies all pixel data from the WebGL context onto an output canvas
   * with a Context2d context. This allows applications to have access to pixel data and other functionality provided by
   * Context2d, regardless of whether the CanvasDrawer or the WebGLDrawer is used. Certain options, including compositeOperation,
   * clip, croppingPolygons, and debugMode are implemented using Context2d operations; in these scenarios, each TiledImage is
   * drawn onto the output canvas immediately after the tile composition step (pass 1). Otherwise, for efficiency, all TiledImages
   * are copied over to the output canvas at once, after all tiles have been composited for all images.
   * @param {Object} options - Options for this Drawer.
   * @param {OpenSeadragon.Viewer} options.viewer - The Viewer that owns this Drawer.
   * @param {OpenSeadragon.Viewport} options.viewport - Reference to Viewer viewport.
   * @param {Element} options.element - Parent element.
   * @param {Number} [options.debugGridColor] - See debugGridColor in {@link OpenSeadragon.Options} for details.
   */t.WebGLDrawer=class WebGLDrawer extends t.DrawerBase{constructor(e){super(e);this._destroyed=false;this._TextureMap=new Map;this._TileMap=new Map;this._gl=null;this._firstPass=null;this._secondPass=null;this._glFrameBuffer=null;this._renderToTexture=null;this._glFramebufferToCanvasTransform=null;this._outputCanvas=null;this._outputContext=null;this._clippingCanvas=null;this._clippingContext=null;this._renderingCanvas=null;this._backupCanvasDrawer=null;this._imageSmoothingEnabled=true;this._boundToTileReady=e=>this._tileReadyHandler(e);this._boundToImageUnloaded=e=>this._imageUnloadedHandler(e);this.viewer.addHandler("tile-ready",this._boundToTileReady);this.viewer.addHandler("image-unloaded",this._boundToImageUnloaded);this.viewer.rejectEventHandler("tile-drawn","The WebGLDrawer does not raise the tile-drawn event");this.viewer.rejectEventHandler("tile-drawing","The WebGLDrawer does not raise the tile-drawing event");this._setupCanvases();this._setupRenderer();this.context=this._outputContext}destroy(){if(this._destroyed)return;let e=this._gl;var t=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS);for(let i=0;i<t;++i){e.activeTexture(e.TEXTURE0+i);e.bindTexture(e.TEXTURE_2D,null);e.bindTexture(e.TEXTURE_CUBE_MAP,null)}e.bindBuffer(e.ARRAY_BUFFER,null);e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null);e.bindRenderbuffer(e.RENDERBUFFER,null);e.bindFramebuffer(e.FRAMEBUFFER,null);this._unloadTextures();e.deleteBuffer(this._secondPass.bufferOutputPosition);e.deleteFramebuffer(this._glFrameBuffer);this._renderingCanvas.width=this._renderingCanvas.height=1;this._clippingCanvas.width=this._clippingCanvas.height=1;this._outputCanvas.width=this._outputCanvas.height=1;this._renderingCanvas=null;this._clippingCanvas=this._clippingContext=null;this._outputCanvas=this._outputContext=null;let i=e.getExtension("WEBGL_lose_context");i&&i.loseContext();this.viewer.removeHandler("tile-ready",this._boundToTileReady);this.viewer.removeHandler("image-unloaded",this._boundToImageUnloaded);this.viewer.removeHandler("resize",this._resizeHandler);this._gl=null;if(this._backupCanvasDrawer){this._backupCanvasDrawer.destroy();this._backupCanvasDrawer=null}this.container.removeChild(this.canvas);this.viewer.drawer===this&&(this.viewer.drawer=null);this._destroyed=true}
/**
    *
    * @returns {Boolean} true
    */
canRotate(){return true}
/**
    * @returns {Boolean} true if canvas and webgl are supported
    */
static isSupported(){let t=document.createElement("canvas");let i=e.isFunction(t.getContext)&&t.getContext("webgl");let n=i&&i.getExtension("WEBGL_lose_context");n&&n.loseContext();return!!i}
/**
     *
     * @returns 'webgl'
     */getType(){return"webgl"}
/**
     * @param {TiledImage} tiledImage the tiled image that is calling the function
     * @returns {Boolean} Whether this drawer requires enforcing minimum tile overlap to avoid showing seams.
     * @private
     */minimumOverlapRequired(e){return e.isTainted()}
/**
    * create the HTML element (canvas in this case) that the image will be drawn into
    * @private
    * @returns {Element} the canvas to draw into
    */_createDrawingElement(){let t=e.makeNeutralElement("canvas");let i=this._calculateCanvasSize();t.width=i.x;t.height=i.y;return t}
/**
     * Get the backup renderer (CanvasDrawer) to use if data cannot be used by webgl
     * Lazy loaded
     * @private
     * @returns {CanvasDrawer}
     */_getBackupCanvasDrawer(){if(!this._backupCanvasDrawer){this._backupCanvasDrawer=this.viewer.requestDrawer("canvas",{mainDrawer:false});this._backupCanvasDrawer.canvas.style.setProperty("visibility","hidden")}return this._backupCanvasDrawer}
/**
    *
    * @param {Array} tiledImages Array of TiledImage objects to draw
    */draw(i){let n=this._gl;const r=this.viewport.getBoundsNoRotateWithMargins(true);let o={bounds:r,center:new t.Point(r.x+r.width/2,r.y+r.height/2),rotation:this.viewport.getRotation(true)*Math.PI/180};let s=this.viewport.flipped?-1:1;let a=e.Mat3.makeTranslation(-o.center.x,-o.center.y);let l=e.Mat3.makeScaling(2/o.bounds.width*s,-2/o.bounds.height);let h=e.Mat3.makeRotation(-o.rotation);let u=l.multiply(h).multiply(a);n.bindFramebuffer(n.FRAMEBUFFER,null);n.clear(n.COLOR_BUFFER_BIT);this._outputContext.clearRect(0,0,this._outputCanvas.width,this._outputCanvas.height);let c=false;i.forEach(((t,i)=>{if(t.isTainted()){if(c){this._outputContext.drawImage(this._renderingCanvas,0,0);n.bindFramebuffer(n.FRAMEBUFFER,null);n.clear(n.COLOR_BUFFER_BIT);c=false}const e=this._getBackupCanvasDrawer();e.draw([t]);this._outputContext.drawImage(e.canvas,0,0)}else{let r=t.getTilesToDraw();t.placeholderFillStyle&&t._hasOpaqueTile===false&&this._drawPlaceholder(t);if(r.length===0||t.getOpacity()===0)return;let o=r[0];let s=t.compositeOperation||this.viewer.compositeOperation||t._clip||t._croppingPolygons||t.debugMode;let a=s||t.opacity<1||o.hasTransparency;if(s){c&&this._outputContext.drawImage(this._renderingCanvas,0,0);n.bindFramebuffer(n.FRAMEBUFFER,null);n.clear(n.COLOR_BUFFER_BIT)}n.useProgram(this._firstPass.shaderProgram);if(a){n.bindFramebuffer(n.FRAMEBUFFER,this._glFrameBuffer);n.clear(n.COLOR_BUFFER_BIT)}else n.bindFramebuffer(n.FRAMEBUFFER,null);let l=u;let h=t.getRotation(true);if(h%360!==0){let i=e.Mat3.makeRotation(-h*Math.PI/180);let n=t.getBoundsNoRotate(true).getCenter();let r=e.Mat3.makeTranslation(n.x,n.y);let o=e.Mat3.makeTranslation(-n.x,-n.y);let s=r.multiply(i).multiply(o);l=u.multiply(s)}let d=this._gl.getParameter(this._gl.MAX_TEXTURE_IMAGE_UNITS);if(d<=0)throw new Error(`WegGL error: bad value for gl parameter MAX_TEXTURE_IMAGE_UNITS (${d}). This could happen\n                        if too many contexts have been created and not released, or there is another problem with the graphics card.`);let p=new Float32Array(d*12);let g=new Array(d);let v=new Array(d);let m=new Array(d);for(let e=0;e<r.length;e++){let i=r[e].tile;let o=e%d;let s=o+1;let a=i.getCanvasContext();let h=a?this._TextureMap.get(a.canvas):null;if(!h){this._tileReadyHandler({tile:i,tiledImage:t});h=a?this._TextureMap.get(a.canvas):null}h&&this._getTileData(i,t,h,l,o,p,g,v,m);if(s===d||e===r.length-1){for(let e=0;e<=s;e++){n.activeTexture(n.TEXTURE0+e);n.bindTexture(n.TEXTURE_2D,g[e])}n.bindBuffer(n.ARRAY_BUFFER,this._firstPass.bufferTexturePosition);n.bufferData(n.ARRAY_BUFFER,p,n.DYNAMIC_DRAW);v.forEach(((e,t)=>{n.uniformMatrix3fv(this._firstPass.uTransformMatrices[t],false,e)}));n.uniform1fv(this._firstPass.uOpacities,new Float32Array(m));n.bindBuffer(n.ARRAY_BUFFER,this._firstPass.bufferOutputPosition);n.vertexAttribPointer(this._firstPass.aOutputPosition,2,n.FLOAT,false,0,0);n.bindBuffer(n.ARRAY_BUFFER,this._firstPass.bufferTexturePosition);n.vertexAttribPointer(this._firstPass.aTexturePosition,2,n.FLOAT,false,0,0);n.bindBuffer(n.ARRAY_BUFFER,this._firstPass.bufferIndex);n.vertexAttribPointer(this._firstPass.aIndex,1,n.FLOAT,false,0,0);n.drawArrays(n.TRIANGLES,0,6*s)}}if(a){n.useProgram(this._secondPass.shaderProgram);n.bindFramebuffer(n.FRAMEBUFFER,null);n.activeTexture(n.TEXTURE0);n.bindTexture(n.TEXTURE_2D,this._renderToTexture);this._gl.uniform1f(this._secondPass.uOpacityMultiplier,t.opacity);n.bindBuffer(n.ARRAY_BUFFER,this._secondPass.bufferTexturePosition);n.vertexAttribPointer(this._secondPass.aTexturePosition,2,n.FLOAT,false,0,0);n.bindBuffer(n.ARRAY_BUFFER,this._secondPass.bufferOutputPosition);n.vertexAttribPointer(this._secondPass.aOutputPosition,2,n.FLOAT,false,0,0);n.drawArrays(n.TRIANGLES,0,6)}c=true;if(s){this._applyContext2dPipeline(t,r,i);c=false;n.bindFramebuffer(n.FRAMEBUFFER,null);n.clear(n.COLOR_BUFFER_BIT)}i===0&&this._raiseTiledImageDrawnEvent(t,r.map((e=>e.tile)))}}));c&&this._outputContext.drawImage(this._renderingCanvas,0,0)}
/**
    * Sets whether image smoothing is enabled or disabled
    * @param {Boolean} enabled If true, uses gl.LINEAR as the TEXTURE_MIN_FILTER and TEXTURE_MAX_FILTER, otherwise gl.NEAREST.
    */
setImageSmoothingEnabled(e){if(this._imageSmoothingEnabled!==e){this._imageSmoothingEnabled=e;this._unloadTextures();this.viewer.world.draw()}}
/**
    * Draw a rect onto the output canvas for debugging purposes
    * @param {OpenSeadragon.Rect} rect
    */drawDebuggingRect(t){let i=this._outputContext;i.save();i.lineWidth=2*e.pixelDensityRatio;i.strokeStyle=this.debugGridColor[0];i.fillStyle=this.debugGridColor[0];i.strokeRect(t.x*e.pixelDensityRatio,t.y*e.pixelDensityRatio,t.width*e.pixelDensityRatio,t.height*e.pixelDensityRatio);i.restore()}_getTextureDataFromTile(e){return e.getCanvasContext().canvas}
/**
    * Draw data from the rendering canvas onto the output canvas, with clipping,
    * cropping and/or debug info as requested.
    * @private
    * @param {OpenSeadragon.TiledImage} tiledImage - the tiledImage to draw
    * @param {Array} tilesToDraw - array of objects containing tiles that were drawn
    */_applyContext2dPipeline(e,t,i){this._outputContext.save();this._outputContext.globalCompositeOperation=i===0?null:e.compositeOperation||this.viewer.compositeOperation;if(e._croppingPolygons||e._clip){this._renderToClippingCanvas(e);this._outputContext.drawImage(this._clippingCanvas,0,0)}else this._outputContext.drawImage(this._renderingCanvas,0,0);this._outputContext.restore();if(e.debugMode){const i=this.viewer.viewport.getFlip();i&&this._flip();this._drawDebugInfo(t,e,i);i&&this._flip()}}_getTileData(t,i,n,r,o,s,a,l,h){let u=n.texture;let c=n.position;s.set(c,o*12);let d=this._calculateOverlapFraction(t,i);let p=t.positionedBounds.width*d.x;let g=t.positionedBounds.height*d.y;let v=t.positionedBounds.x+(t.x===0?0:p);let m=t.positionedBounds.y+(t.y===0?0:g);let f=t.positionedBounds.x+t.positionedBounds.width-(t.isRightMost?0:p);let y=t.positionedBounds.y+t.positionedBounds.height-(t.isBottomMost?0:g);let w=f-v;let T=y-m;let x=new e.Mat3([w,0,0,0,T,0,v,m,1]);if(t.flipped){let t=e.Mat3.makeTranslation(.5,0);let i=e.Mat3.makeTranslation(-.5,0);let n=t.multiply(e.Mat3.makeScaling(-1,1)).multiply(i);x=x.multiply(n)}let _=r.multiply(x);h[o]=t.opacity;a[o]=u;l[o]=_.values}_textureFilter(){return this._imageSmoothingEnabled?this._gl.LINEAR:this._gl.NEAREST}_setupRenderer(){let t=this._gl;t||e.console.error("_setupCanvases must be called before _setupRenderer");this._unitQuad=this._makeQuadVertexBuffer(0,1,0,1);this._makeFirstPassShaderProgram();this._makeSecondPassShaderProgram();this._renderToTexture=t.createTexture();t.activeTexture(t.TEXTURE0);t.bindTexture(t.TEXTURE_2D,this._renderToTexture);t.texImage2D(t.TEXTURE_2D,0,t.RGBA,this._renderingCanvas.width,this._renderingCanvas.height,0,t.RGBA,t.UNSIGNED_BYTE,null);t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,this._textureFilter());t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE);t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);this._glFrameBuffer=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,this._glFrameBuffer);t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,this._renderToTexture,0);t.enable(t.BLEND);t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA)}_makeFirstPassShaderProgram(){let e=this._glNumTextures=this._gl.getParameter(this._gl.MAX_TEXTURE_IMAGE_UNITS);let makeMatrixUniforms=()=>[...Array(e).keys()].map((e=>`uniform mat3 u_matrix_${e};`)).join("\n");let makeConditionals=()=>[...Array(e).keys()].map((e=>`${e>0?"else ":""}if(int(a_index) == ${e}) { transform_matrix = u_matrix_${e}; }`)).join("\n");const t=`\n            attribute vec2 a_output_position;\n            attribute vec2 a_texture_position;\n            attribute float a_index;\n\n            ${makeMatrixUniforms()} // create a uniform mat3 for each potential tile to draw\n\n            varying vec2 v_texture_position;\n            varying float v_image_index;\n\n            void main() {\n\n                mat3 transform_matrix; // value will be set by the if/elses in makeConditional()\n\n                ${makeConditionals()}\n\n                gl_Position = vec4(transform_matrix * vec3(a_output_position, 1), 1);\n\n                v_texture_position = a_texture_position;\n                v_image_index = a_index;\n            }\n            `;const i=`\n            precision mediump float;\n\n            // our textures\n            uniform sampler2D u_images[${e}];\n            // our opacities\n            uniform float u_opacities[${e}];\n\n            // the varyings passed in from the vertex shader.\n            varying vec2 v_texture_position;\n            varying float v_image_index;\n\n            void main() {\n                // can't index directly with a variable, need to use a loop iterator hack\n                for(int i = 0; i < ${e}; ++i){\n                    if(i == int(v_image_index)){\n                        gl_FragColor = texture2D(u_images[i], v_texture_position) * u_opacities[i];\n                    }\n                }\n            }\n            `;let n=this._gl;let r=this.constructor.initShaderProgram(n,t,i);n.useProgram(r);this._firstPass={shaderProgram:r,aOutputPosition:n.getAttribLocation(r,"a_output_position"),aTexturePosition:n.getAttribLocation(r,"a_texture_position"),aIndex:n.getAttribLocation(r,"a_index"),uTransformMatrices:[...Array(this._glNumTextures).keys()].map((e=>n.getUniformLocation(r,`u_matrix_${e}`))),uImages:n.getUniformLocation(r,"u_images"),uOpacities:n.getUniformLocation(r,"u_opacities"),bufferOutputPosition:n.createBuffer(),bufferTexturePosition:n.createBuffer(),bufferIndex:n.createBuffer()};n.uniform1iv(this._firstPass.uImages,[...Array(e).keys()]);let o=new Float32Array(e*12);for(let t=0;t<e;++t)o.set(Float32Array.from(this._unitQuad),t*12);n.bindBuffer(n.ARRAY_BUFFER,this._firstPass.bufferOutputPosition);n.bufferData(n.ARRAY_BUFFER,o,n.STATIC_DRAW);n.enableVertexAttribArray(this._firstPass.aOutputPosition);n.bindBuffer(n.ARRAY_BUFFER,this._firstPass.bufferTexturePosition);n.enableVertexAttribArray(this._firstPass.aTexturePosition);n.bindBuffer(n.ARRAY_BUFFER,this._firstPass.bufferIndex);let s=[...Array(this._glNumTextures).keys()].map((e=>Array(6).fill(e))).flat();n.bufferData(n.ARRAY_BUFFER,new Float32Array(s),n.STATIC_DRAW);n.enableVertexAttribArray(this._firstPass.aIndex)}_makeSecondPassShaderProgram(){const t="\n            attribute vec2 a_output_position;\n            attribute vec2 a_texture_position;\n\n            uniform mat3 u_matrix;\n\n            varying vec2 v_texture_position;\n\n            void main() {\n                gl_Position = vec4(u_matrix * vec3(a_output_position, 1), 1);\n\n                v_texture_position = a_texture_position;\n            }\n            ";const i="\n            precision mediump float;\n\n            // our texture\n            uniform sampler2D u_image;\n\n            // the texCoords passed in from the vertex shader.\n            varying vec2 v_texture_position;\n\n            // the opacity multiplier for the image\n            uniform float u_opacity_multiplier;\n\n            void main() {\n                gl_FragColor = texture2D(u_image, v_texture_position);\n                gl_FragColor *= u_opacity_multiplier;\n            }\n            ";let n=this._gl;let r=this.constructor.initShaderProgram(n,t,i);n.useProgram(r);this._secondPass={shaderProgram:r,aOutputPosition:n.getAttribLocation(r,"a_output_position"),aTexturePosition:n.getAttribLocation(r,"a_texture_position"),uMatrix:n.getUniformLocation(r,"u_matrix"),uImage:n.getUniformLocation(r,"u_image"),uOpacityMultiplier:n.getUniformLocation(r,"u_opacity_multiplier"),bufferOutputPosition:n.createBuffer(),bufferTexturePosition:n.createBuffer()};n.bindBuffer(n.ARRAY_BUFFER,this._secondPass.bufferOutputPosition);n.bufferData(n.ARRAY_BUFFER,this._unitQuad,n.STATIC_DRAW);n.enableVertexAttribArray(this._secondPass.aOutputPosition);n.bindBuffer(n.ARRAY_BUFFER,this._secondPass.bufferTexturePosition);n.bufferData(n.ARRAY_BUFFER,this._unitQuad,n.DYNAMIC_DRAW);n.enableVertexAttribArray(this._secondPass.aTexturePosition);let o=e.Mat3.makeScaling(2,2).multiply(e.Mat3.makeTranslation(-.5,-.5));n.uniformMatrix3fv(this._secondPass.uMatrix,false,o.values)}_resizeRenderer(){let e=this._gl;let t=this._renderingCanvas.width;let i=this._renderingCanvas.height;e.viewport(0,0,t,i);e.deleteTexture(this._renderToTexture);this._renderToTexture=e.createTexture();e.activeTexture(e.TEXTURE0);e.bindTexture(e.TEXTURE_2D,this._renderToTexture);e.texImage2D(e.TEXTURE_2D,0,e.RGBA,t,i,0,e.RGBA,e.UNSIGNED_BYTE,null);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,this._textureFilter());e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);e.bindFramebuffer(e.FRAMEBUFFER,this._glFrameBuffer);e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,this._renderToTexture,0)}_setupCanvases(){let e=this;this._outputCanvas=this.canvas;this._outputContext=this._outputCanvas.getContext("2d");this._renderingCanvas=document.createElement("canvas");this._clippingCanvas=document.createElement("canvas");this._clippingContext=this._clippingCanvas.getContext("2d");this._renderingCanvas.width=this._clippingCanvas.width=this._outputCanvas.width;this._renderingCanvas.height=this._clippingCanvas.height=this._outputCanvas.height;this._gl=this._renderingCanvas.getContext("webgl");this._resizeHandler=function(){if(e._outputCanvas!==e.viewer.drawer.canvas){e._outputCanvas.style.width=e.viewer.drawer.canvas.clientWidth+"px";e._outputCanvas.style.height=e.viewer.drawer.canvas.clientHeight+"px"}let t=e._calculateCanvasSize();if(e._outputCanvas.width!==t.x||e._outputCanvas.height!==t.y){e._outputCanvas.width=t.x;e._outputCanvas.height=t.y}e._renderingCanvas.style.width=e._outputCanvas.clientWidth+"px";e._renderingCanvas.style.height=e._outputCanvas.clientHeight+"px";e._renderingCanvas.width=e._clippingCanvas.width=e._outputCanvas.width;e._renderingCanvas.height=e._clippingCanvas.height=e._outputCanvas.height;e._resizeRenderer()};this.viewer.addHandler("resize",this._resizeHandler)}_makeQuadVertexBuffer(e,t,i,n){return new Float32Array([e,n,t,n,e,i,e,i,t,n,t,i])}_tileReadyHandler(t){let i=t.tile;let n=t.tiledImage;if(n.isTainted())return;let r=i.getCanvasContext();let o=r&&r.canvas;if(!o||e.isCanvasTainted(o)){const t=n.isTainted();if(!t){n.setTainted(true);e.console.warn("WebGL cannot be used to draw this TiledImage because it has tainted data. Does crossOriginPolicy need to be set?");this._raiseDrawerErrorEvent(n,"Tainted data cannot be used by the WebGLDrawer. Falling back to CanvasDrawer for this TiledImage.")}return}let s=this._TextureMap.get(o);if(!s){let e=this._gl;let t=e.createTexture();let s;let a=n.source.tileOverlap;let l,h;if(i.sourceBounds){l=Math.min(i.sourceBounds.width,o.width)/o.width;h=Math.min(i.sourceBounds.height,o.height)/o.height}else{l=1;h=1}if(a>0){let e=this._calculateOverlapFraction(i,n);let t=(i.x===0?0:e.x)*l;let r=(i.y===0?0:e.y)*h;let o=(i.isRightMost?1:1-e.x)*l;let a=(i.isBottomMost?1:1-e.y)*h;s=this._makeQuadVertexBuffer(t,o,r,a)}else s=l===1&&h===1?this._unitQuad:this._makeQuadVertexBuffer(0,l,0,h);let u={texture:t,position:s};this._TextureMap.set(o,u);e.activeTexture(e.TEXTURE0);e.bindTexture(e.TEXTURE_2D,t);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,this._textureFilter());e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,this._textureFilter());this._uploadImageData(r)}}_calculateOverlapFraction(e,t){let i=t.source.tileOverlap;let n=e.sourceBounds.width;let r=e.sourceBounds.height;let o=(e.x===0?0:i)+(e.isRightMost?0:i);let s=(e.y===0?0:i)+(e.isBottomMost?0:i);let a=i/(n+o);let l=i/(r+s);return{x:a,y:l}}_unloadTextures(){let e=Array.from(this._TextureMap.keys());e.forEach((e=>{this._cleanupImageData(e)}))}_uploadImageData(t){let i=this._gl;let n=t.canvas;try{if(!n)throw"Tile context does not have a canvas",t;i.texImage2D(i.TEXTURE_2D,0,i.RGBA,i.RGBA,i.UNSIGNED_BYTE,n)}catch(t){e.console.error("Error uploading image data to WebGL",t)}}_imageUnloadedHandler(e){let t=e.context2D.canvas;this._cleanupImageData(t)}_cleanupImageData(e){let t=this._TextureMap.get(e);this._TextureMap.delete(e);t&&this._gl.deleteTexture(t.texture)}_setClip(){}_renderToClippingCanvas(t){this._clippingContext.clearRect(0,0,this._clippingCanvas.width,this._clippingCanvas.height);this._clippingContext.save();if(this.viewer.viewport.getFlip()){const t=new e.Point(this.canvas.width/2,this.canvas.height/2);this._clippingContext.translate(t.x,0);this._clippingContext.scale(-1,1);this._clippingContext.translate(-t.x,0)}if(t._clip){const e=[{x:t._clip.x,y:t._clip.y},{x:t._clip.x+t._clip.width,y:t._clip.y},{x:t._clip.x+t._clip.width,y:t._clip.y+t._clip.height},{x:t._clip.x,y:t._clip.y+t._clip.height}];let i=e.map((e=>{let i=t.imageToViewportCoordinates(e.x,e.y,true).rotate(this.viewer.viewport.getRotation(true),this.viewer.viewport.getCenter(true));let n=this.viewportCoordToDrawerCoord(i);return n}));this._clippingContext.beginPath();i.forEach(((e,t)=>{this._clippingContext[t===0?"moveTo":"lineTo"](e.x,e.y)}));this._clippingContext.clip();this._setClip()}if(t._croppingPolygons){let e=t._croppingPolygons.map((e=>e.map((e=>{let i=t.imageToViewportCoordinates(e.x,e.y,true).rotate(this.viewer.viewport.getRotation(true),this.viewer.viewport.getCenter(true));let n=this.viewportCoordToDrawerCoord(i);return n}))));this._clippingContext.beginPath();e.forEach((e=>{e.forEach(((e,t)=>{this._clippingContext[t===0?"moveTo":"lineTo"](e.x,e.y)}))}));this._clippingContext.clip()}if(this.viewer.viewport.getFlip()){const t=new e.Point(this.canvas.width/2,this.canvas.height/2);this._clippingContext.translate(t.x,0);this._clippingContext.scale(-1,1);this._clippingContext.translate(-t.x,0)}this._clippingContext.drawImage(this._renderingCanvas,0,0);this._clippingContext.restore()}
/**
     * Set rotations for viewport & tiledImage
     * @private
     * @param {OpenSeadragon.TiledImage} tiledImage
     */_setRotations(e){var t=false;if(this.viewport.getRotation(true)%360!==0){this._offsetForRotation({degrees:this.viewport.getRotation(true),saveContext:t});t=false}e.getRotation(true)%360!==0&&this._offsetForRotation({degrees:e.getRotation(true),point:this.viewport.pixelFromPointNoRotate(e._getRotationPoint(true),true),saveContext:t})}_offsetForRotation(t){var i=t.point?t.point.times(e.pixelDensityRatio):this._getCanvasCenter();var n=this._outputContext;n.save();n.translate(i.x,i.y);n.rotate(Math.PI/180*t.degrees);n.translate(-i.x,-i.y)}_flip(t){t=t||{};var i=t.point?t.point.times(e.pixelDensityRatio):this._getCanvasCenter();var n=this._outputContext;n.translate(i.x,0);n.scale(-1,1);n.translate(-i.x,0)}_drawDebugInfo(t,i,n){for(var r=t.length-1;r>=0;r--){var o=t[r].tile;try{this._drawDebugInfoOnTile(o,t.length,r,i,n)}catch(t){e.console.error(t)}}}_drawDebugInfoOnTile(t,i,n,r,o){var s=this.viewer.world.getIndexOfItem(r)%this.debugGridColor.length;var a=this.context;a.save();a.lineWidth=2*e.pixelDensityRatio;a.font="small-caps bold "+13*e.pixelDensityRatio+"px arial";a.strokeStyle=this.debugGridColor[s];a.fillStyle=this.debugGridColor[s];this._setRotations(r);o&&this._flip({point:t.position.plus(t.size.divide(2))});a.strokeRect(t.position.x*e.pixelDensityRatio,t.position.y*e.pixelDensityRatio,t.size.x*e.pixelDensityRatio,t.size.y*e.pixelDensityRatio);var l=(t.position.x+t.size.x/2)*e.pixelDensityRatio;var h=(t.position.y+t.size.y/2)*e.pixelDensityRatio;a.translate(l,h);const u=this.viewport.getRotation(true);a.rotate(Math.PI/180*-u);a.translate(-l,-h);if(t.x===0&&t.y===0){a.fillText("Zoom: "+this.viewport.getZoom(),t.position.x*e.pixelDensityRatio,(t.position.y-30)*e.pixelDensityRatio);a.fillText("Pan: "+this.viewport.getBounds().toString(),t.position.x*e.pixelDensityRatio,(t.position.y-20)*e.pixelDensityRatio)}a.fillText("Level: "+t.level,(t.position.x+10)*e.pixelDensityRatio,(t.position.y+20)*e.pixelDensityRatio);a.fillText("Column: "+t.x,(t.position.x+10)*e.pixelDensityRatio,(t.position.y+30)*e.pixelDensityRatio);a.fillText("Row: "+t.y,(t.position.x+10)*e.pixelDensityRatio,(t.position.y+40)*e.pixelDensityRatio);a.fillText("Order: "+n+" of "+i,(t.position.x+10)*e.pixelDensityRatio,(t.position.y+50)*e.pixelDensityRatio);a.fillText("Size: "+t.size.toString(),(t.position.x+10)*e.pixelDensityRatio,(t.position.y+60)*e.pixelDensityRatio);a.fillText("Position: "+t.position.toString(),(t.position.x+10)*e.pixelDensityRatio,(t.position.y+70)*e.pixelDensityRatio);this.viewport.getRotation(true)%360!==0&&this._restoreRotationChanges();r.getRotation(true)%360!==0&&this._restoreRotationChanges();a.restore()}_drawPlaceholder(e){const t=e.getBounds(true);const i=this.viewportToDrawerRectangle(e.getBounds(true));const n=this._outputContext;let r;r=typeof e.placeholderFillStyle==="function"?e.placeholderFillStyle(e,n):e.placeholderFillStyle;this._offsetForRotation({degrees:this.viewer.viewport.getRotation(true)});n.fillStyle=r;n.translate(i.x,i.y);n.rotate(Math.PI/180*t.degrees);n.translate(-i.x,-i.y);n.fillRect(i.x,i.y,i.width,i.height);this._restoreRotationChanges()}
/**
     * Get the canvas center
     * @private
     * @returns {OpenSeadragon.Point} The center point of the canvas
     */_getCanvasCenter(){return new e.Point(this.canvas.width/2,this.canvas.height/2)}_restoreRotationChanges(){var e=this._outputContext;e.restore()}static initShaderProgram(t,i,n){function loadShader(t,i,n){const r=t.createShader(i);t.shaderSource(r,n);t.compileShader(r);if(!t.getShaderParameter(r,t.COMPILE_STATUS)){e.console.error(`An error occurred compiling the shaders: ${t.getShaderInfoLog(r)}`);t.deleteShader(r);return null}return r}const r=loadShader(t,t.VERTEX_SHADER,i);const o=loadShader(t,t.FRAGMENT_SHADER,n);const s=t.createProgram();t.attachShader(s,r);t.attachShader(s,o);t.linkProgram(s);if(!t.getProgramParameter(s,t.LINK_STATUS)){e.console.error(`Unable to initialize the shader program: ${t.getProgramInfoLog(s)}`);return null}return s}}})(OpenSeadragon);(function(t){
/**
   * @class Viewport
   * @memberof OpenSeadragon
   * @classdesc Handles coordinate-related functionality (zoom, pan, rotation, etc.)
   * for an {@link OpenSeadragon.Viewer}.
   * @param {Object} options - Options for this Viewport.
   * @param {Object} [options.margins] - See viewportMargins in {@link OpenSeadragon.Options}.
   * @param {Number} [options.springStiffness] - See springStiffness in {@link OpenSeadragon.Options}.
   * @param {Number} [options.animationTime] - See animationTime in {@link OpenSeadragon.Options}.
   * @param {Number} [options.minZoomImageRatio] - See minZoomImageRatio in {@link OpenSeadragon.Options}.
   * @param {Number} [options.maxZoomPixelRatio] - See maxZoomPixelRatio in {@link OpenSeadragon.Options}.
   * @param {Number} [options.visibilityRatio] - See visibilityRatio in {@link OpenSeadragon.Options}.
   * @param {Boolean} [options.wrapHorizontal] - See wrapHorizontal in {@link OpenSeadragon.Options}.
   * @param {Boolean} [options.wrapVertical] - See wrapVertical in {@link OpenSeadragon.Options}.
   * @param {Number} [options.defaultZoomLevel] - See defaultZoomLevel in {@link OpenSeadragon.Options}.
   * @param {Number} [options.minZoomLevel] - See minZoomLevel in {@link OpenSeadragon.Options}.
   * @param {Number} [options.maxZoomLevel] - See maxZoomLevel in {@link OpenSeadragon.Options}.
   * @param {Number} [options.degrees] - See degrees in {@link OpenSeadragon.Options}.
   * @param {Boolean} [options.homeFillsViewer] - See homeFillsViewer in {@link OpenSeadragon.Options}.
   * @param {Boolean} [options.silenceMultiImageWarnings] - See silenceMultiImageWarnings in {@link OpenSeadragon.Options}.
   */
t.Viewport=function(i){var n=arguments;n.length&&n[0]instanceof t.Point&&(i={containerSize:n[0],contentSize:n[1],config:n[2]});if(i.config){t.extend(true,i,i.config);delete i.config}(this||e)._margins=t.extend({left:0,top:0,right:0,bottom:0},i.margins||{});delete i.margins;i.initialDegrees=i.degrees;delete i.degrees;t.extend(true,this||e,{containerSize:null,contentSize:null,zoomPoint:null,rotationPivot:null,viewer:null,springStiffness:t.DEFAULT_SETTINGS.springStiffness,animationTime:t.DEFAULT_SETTINGS.animationTime,minZoomImageRatio:t.DEFAULT_SETTINGS.minZoomImageRatio,maxZoomPixelRatio:t.DEFAULT_SETTINGS.maxZoomPixelRatio,visibilityRatio:t.DEFAULT_SETTINGS.visibilityRatio,wrapHorizontal:t.DEFAULT_SETTINGS.wrapHorizontal,wrapVertical:t.DEFAULT_SETTINGS.wrapVertical,defaultZoomLevel:t.DEFAULT_SETTINGS.defaultZoomLevel,minZoomLevel:t.DEFAULT_SETTINGS.minZoomLevel,maxZoomLevel:t.DEFAULT_SETTINGS.maxZoomLevel,initialDegrees:t.DEFAULT_SETTINGS.degrees,flipped:t.DEFAULT_SETTINGS.flipped,homeFillsViewer:t.DEFAULT_SETTINGS.homeFillsViewer,silenceMultiImageWarnings:t.DEFAULT_SETTINGS.silenceMultiImageWarnings},i);this._updateContainerInnerSize();(this||e).centerSpringX=new t.Spring({initial:0,springStiffness:(this||e).springStiffness,animationTime:(this||e).animationTime});(this||e).centerSpringY=new t.Spring({initial:0,springStiffness:(this||e).springStiffness,animationTime:(this||e).animationTime});(this||e).zoomSpring=new t.Spring({exponential:true,initial:1,springStiffness:(this||e).springStiffness,animationTime:(this||e).animationTime});(this||e).degreesSpring=new t.Spring({initial:i.initialDegrees,springStiffness:(this||e).springStiffness,animationTime:(this||e).animationTime});(this||e)._oldCenterX=(this||e).centerSpringX.current.value;(this||e)._oldCenterY=(this||e).centerSpringY.current.value;(this||e)._oldZoom=(this||e).zoomSpring.current.value;(this||e)._oldDegrees=(this||e).degreesSpring.current.value;this._setContentBounds(new t.Rect(0,0,1,1),1);this.goHome(true);this.update()};t.Viewport.prototype={get degrees(){t.console.warn("Accessing [Viewport.degrees] is deprecated. Use viewport.getRotation instead.");return this.getRotation()},set degrees(e){t.console.warn("Setting [Viewport.degrees] is deprecated. Use viewport.rotateTo, viewport.rotateBy, or viewport.setRotation instead.");this.rotateTo(e)},
/**
     * Updates the viewport's home bounds and constraints for the given content size.
     * @function
     * @param {OpenSeadragon.Point} contentSize - size of the content in content units
     * @returns {OpenSeadragon.Viewport} Chainable.
     * @fires OpenSeadragon.Viewer.event:reset-size
     */
resetContentSize:function(i){t.console.assert(i,"[Viewport.resetContentSize] contentSize is required");t.console.assert(i instanceof t.Point,"[Viewport.resetContentSize] contentSize must be an OpenSeadragon.Point");t.console.assert(i.x>0,"[Viewport.resetContentSize] contentSize.x must be greater than 0");t.console.assert(i.y>0,"[Viewport.resetContentSize] contentSize.y must be greater than 0");this._setContentBounds(new t.Rect(0,0,1,i.y/i.x),i.x);return this||e},setHomeBounds:function(e,i){t.console.error("[Viewport.setHomeBounds] this function is deprecated; The content bounds should not be set manually.");this._setContentBounds(e,i)},_setContentBounds:function(i,n){t.console.assert(i,"[Viewport._setContentBounds] bounds is required");t.console.assert(i instanceof t.Rect,"[Viewport._setContentBounds] bounds must be an OpenSeadragon.Rect");t.console.assert(i.width>0,"[Viewport._setContentBounds] bounds.width must be greater than 0");t.console.assert(i.height>0,"[Viewport._setContentBounds] bounds.height must be greater than 0");(this||e)._contentBoundsNoRotate=i.clone();(this||e)._contentSizeNoRotate=(this||e)._contentBoundsNoRotate.getSize().times(n);(this||e)._contentBounds=i.rotate(this.getRotation()).getBoundingBox();(this||e)._contentSize=(this||e)._contentBounds.getSize().times(n);(this||e)._contentAspectRatio=(this||e)._contentSize.x/(this||e)._contentSize.y;(this||e).viewer&&
/**
         * Raised when the viewer's content size or home bounds are reset
         * (see {@link OpenSeadragon.Viewport#resetContentSize}).
         *
         * @event reset-size
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
         * @property {OpenSeadragon.Point} contentSize
         * @property {OpenSeadragon.Rect} contentBounds - Content bounds.
         * @property {OpenSeadragon.Rect} homeBounds - Content bounds.
         * Deprecated use contentBounds instead.
         * @property {Number} contentFactor
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
(this||e).viewer.raiseEvent("reset-size",{contentSize:(this||e)._contentSizeNoRotate.clone(),contentFactor:n,homeBounds:(this||e)._contentBoundsNoRotate.clone(),contentBounds:(this||e)._contentBounds.clone()})},
/**
     * Returns the home zoom in "viewport zoom" value.
     * @function
     * @returns {Number} The home zoom in "viewport zoom".
     */
getHomeZoom:function(){if((this||e).defaultZoomLevel)return(this||e).defaultZoomLevel;var t=(this||e)._contentAspectRatio/this.getAspectRatio();var i;i=(this||e).homeFillsViewer?t>=1?t:1:t>=1?1:t;return i/(this||e)._contentBounds.width},
/**
     * Returns the home bounds in viewport coordinates.
     * @function
     * @returns {OpenSeadragon.Rect} The home bounds in vewport coordinates.
     */
getHomeBounds:function(){return this.getHomeBoundsNoRotate().rotate(-this.getRotation())},
/**
     * Returns the home bounds in viewport coordinates.
     * This method ignores the viewport rotation. Use
     * {@link OpenSeadragon.Viewport#getHomeBounds} to take it into account.
     * @function
     * @returns {OpenSeadragon.Rect} The home bounds in vewport coordinates.
     */
getHomeBoundsNoRotate:function(){var i=(this||e)._contentBounds.getCenter();var n=1/this.getHomeZoom();var r=n/this.getAspectRatio();return new t.Rect(i.x-n/2,i.y-r/2,n,r)},
/**
     * @function
     * @param {Boolean} immediately
     * @fires OpenSeadragon.Viewer.event:home
     */
goHome:function(t){(this||e).viewer&&
/**
         * Raised when the "home" operation occurs (see {@link OpenSeadragon.Viewport#goHome}).
         *
         * @event home
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
         * @property {Boolean} immediately
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
(this||e).viewer.raiseEvent("home",{immediately:t});return this.fitBounds(this.getHomeBounds(),t)},getMinZoom:function(){var t=this.getHomeZoom(),i=(this||e).minZoomLevel?(this||e).minZoomLevel:(this||e).minZoomImageRatio*t;return i},getMaxZoom:function(){var t=(this||e).maxZoomLevel;if(!t){t=(this||e)._contentSize.x*(this||e).maxZoomPixelRatio/(this||e)._containerInnerSize.x;t/=(this||e)._contentBounds.width}return Math.max(t,this.getHomeZoom())},getAspectRatio:function(){return(this||e)._containerInnerSize.x/(this||e)._containerInnerSize.y},
/**
     * @function
     * @returns {OpenSeadragon.Point} The size of the container, in screen coordinates.
     */
getContainerSize:function(){return new t.Point((this||e).containerSize.x,(this||e).containerSize.y)},
/**
     * The margins push the "home" region in from the sides by the specified amounts.
     * @function
     * @returns {Object} Properties (Numbers, in screen coordinates): left, top, right, bottom.
     */
getMargins:function(){return t.extend({},(this||e)._margins)},
/**
     * The margins push the "home" region in from the sides by the specified amounts.
     * @function
     * @param {Object} margins - Properties (Numbers, in screen coordinates): left, top, right, bottom.
     */
setMargins:function(i){t.console.assert(t.type(i)==="object","[Viewport.setMargins] margins must be an object");(this||e)._margins=t.extend({left:0,top:0,right:0,bottom:0},i);this._updateContainerInnerSize();(this||e).viewer&&(this||e).viewer.forceRedraw()},
/**
     * Returns the bounds of the visible area in viewport coordinates.
     * @function
     * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
     * @returns {OpenSeadragon.Rect} The location you are zoomed/panned to, in viewport coordinates.
     */
getBounds:function(e){return this.getBoundsNoRotate(e).rotate(-this.getRotation(e))},
/**
     * Returns the bounds of the visible area in viewport coordinates.
     * This method ignores the viewport rotation. Use
     * {@link OpenSeadragon.Viewport#getBounds} to take it into account.
     * @function
     * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
     * @returns {OpenSeadragon.Rect} The location you are zoomed/panned to, in viewport coordinates.
     */
getBoundsNoRotate:function(e){var i=this.getCenter(e);var n=1/this.getZoom(e);var r=n/this.getAspectRatio();return new t.Rect(i.x-n/2,i.y-r/2,n,r)},
/**
     * @function
     * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
     * @returns {OpenSeadragon.Rect} The location you are zoomed/panned to,
     * including the space taken by margins, in viewport coordinates.
     */
getBoundsWithMargins:function(e){return this.getBoundsNoRotateWithMargins(e).rotate(-this.getRotation(e),this.getCenter(e))},
/**
     * @function
     * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
     * @returns {OpenSeadragon.Rect} The location you are zoomed/panned to,
     * including the space taken by margins, in viewport coordinates.
     */
getBoundsNoRotateWithMargins:function(t){var i=this.getBoundsNoRotate(t);var n=(this||e)._containerInnerSize.x*this.getZoom(t);i.x-=(this||e)._margins.left/n;i.y-=(this||e)._margins.top/n;i.width+=((this||e)._margins.left+(this||e)._margins.right)/n;i.height+=((this||e)._margins.top+(this||e)._margins.bottom)/n;return i},
/**
     * @function
     * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
     */
getCenter:function(i){var n,r,o,s,a,l,h,u,c=new t.Point((this||e).centerSpringX.current.value,(this||e).centerSpringY.current.value),d=new t.Point((this||e).centerSpringX.target.value,(this||e).centerSpringY.target.value);if(i)return c;if(!(this||e).zoomPoint)return d;n=this.pixelFromPoint((this||e).zoomPoint,true);r=this.getZoom();o=1/r;s=o/this.getAspectRatio();a=new t.Rect(c.x-o/2,c.y-s/2,o,s);l=this._pixelFromPoint((this||e).zoomPoint,a);h=l.minus(n).rotate(-this.getRotation(true));u=h.divide((this||e)._containerInnerSize.x*r);return d.plus(u)},
/**
     * @function
     * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
     */
getZoom:function(t){return t?(this||e).zoomSpring.current.value:(this||e).zoomSpring.target.value},_applyZoomConstraints:function(e){return Math.max(Math.min(e,this.getMaxZoom()),this.getMinZoom())},
/**
     * @function
     * @private
     * @param {OpenSeadragon.Rect} bounds
     * @returns {OpenSeadragon.Rect} constrained bounds.
     */
_applyBoundaryConstraints:function(t){var i=this.viewportToViewerElementRectangle(t).getBoundingBox();var n=this.viewportToViewerElementRectangle((this||e)._contentBoundsNoRotate).getBoundingBox();var r=false;var o=false;if((this||e).wrapHorizontal);else{var s=i.x+i.width;var a=n.x+n.width;var l,h,u;l=i.width>n.width?(this||e).visibilityRatio*n.width:(this||e).visibilityRatio*i.width;h=n.x-s+l;u=a-i.x-l;if(l>n.width){i.x+=(h+u)/2;r=true}else if(u<0){i.x+=u;r=true}else if(h>0){i.x+=h;r=true}}if((this||e).wrapVertical);else{var c=i.y+i.height;var d=n.y+n.height;var p,g,v;p=i.height>n.height?(this||e).visibilityRatio*n.height:(this||e).visibilityRatio*i.height;g=n.y-c+p;v=d-i.y-p;if(p>n.height){i.y+=(g+v)/2;o=true}else if(v<0){i.y+=v;o=true}else if(g>0){i.y+=g;o=true}}var m=r||o;var f=m?this.viewerElementToViewportRectangle(i):t.clone();f.xConstrained=r;f.yConstrained=o;f.constraintApplied=m;return f},
/**
     * @function
     * @private
     * @param {Boolean} [immediately=false] - whether the function that triggered this event was
     * called with the "immediately" flag
     */
_raiseConstraintsEvent:function(t){(this||e).viewer&&
/**
         * Raised when the viewport constraints are applied (see {@link OpenSeadragon.Viewport#applyConstraints}).
         *
         * @event constrain
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
         * @property {Boolean} immediately - whether the function that triggered this event was
         * called with the "immediately" flag
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
(this||e).viewer.raiseEvent("constrain",{immediately:t})},
/**
     * Enforces the minZoom, maxZoom and visibilityRatio constraints by
     * zooming and panning to the closest acceptable zoom and location.
     * @function
     * @param {Boolean} [immediately=false]
     * @returns {OpenSeadragon.Viewport} Chainable.
     * @fires OpenSeadragon.Viewer.event:constrain if constraints were applied
     */
applyConstraints:function(t){var i=this.getZoom();var n=this._applyZoomConstraints(i);i!==n&&this.zoomTo(n,(this||e).zoomPoint,t);var r=this.getConstrainedBounds(false);if(r.constraintApplied){this.fitBounds(r,t);this._raiseConstraintsEvent(t)}return this||e},
/**
     * Equivalent to {@link OpenSeadragon.Viewport#applyConstraints}
     * @function
     * @param {Boolean} [immediately=false]
     * @returns {OpenSeadragon.Viewport} Chainable.
     * @fires OpenSeadragon.Viewer.event:constrain
     */
ensureVisible:function(e){return this.applyConstraints(e)},
/**
     * @function
     * @private
     * @param {OpenSeadragon.Rect} bounds
     * @param {Object} options (immediately=false, constraints=false)
     * @returns {OpenSeadragon.Viewport} Chainable.
     */
_fitBounds:function(i,n){n=n||{};var r=n.immediately||false;var o=n.constraints||false;var s=this.getAspectRatio();var a=i.getCenter();var l=new t.Rect(i.x,i.y,i.width,i.height,i.degrees+this.getRotation()).getBoundingBox();l.getAspectRatio()>=s?l.height=l.width/s:l.width=l.height*s;l.x=a.x-l.width/2;l.y=a.y-l.height/2;var h=1/l.width;if(r){this.panTo(a,true);this.zoomTo(h,null,true);o&&this.applyConstraints(true);return this||e}var u=this.getCenter(true);var c=this.getZoom(true);this.panTo(u,true);this.zoomTo(c,null,true);var d=this.getBounds();var p=this.getZoom();if(p===0||Math.abs(h/p-1)<1e-8){this.zoomTo(h,null,true);this.panTo(a,r);o&&this.applyConstraints(false);return this||e}if(o){this.panTo(a,false);h=this._applyZoomConstraints(h);this.zoomTo(h,null,false);var g=this.getConstrainedBounds();this.panTo(u,true);this.zoomTo(c,null,true);this.fitBounds(g)}else{var v=l.rotate(-this.getRotation());var m=v.getTopLeft().times(h).minus(d.getTopLeft().times(p)).divide(h-p);this.zoomTo(h,m,r)}return this||e},
/**
     * Makes the viewport zoom and pan so that the specified bounds take
     * as much space as possible in the viewport.
     * Note: this method ignores the constraints (minZoom, maxZoom and
     * visibilityRatio).
     * Use {@link OpenSeadragon.Viewport#fitBoundsWithConstraints} to enforce
     * them.
     * @function
     * @param {OpenSeadragon.Rect} bounds
     * @param {Boolean} [immediately=false]
     * @returns {OpenSeadragon.Viewport} Chainable.
     */
fitBounds:function(e,t){return this._fitBounds(e,{immediately:t,constraints:false})},
/**
     * Makes the viewport zoom and pan so that the specified bounds take
     * as much space as possible in the viewport while enforcing the constraints
     * (minZoom, maxZoom and visibilityRatio).
     * Note: because this method enforces the constraints, part of the
     * provided bounds may end up outside of the viewport.
     * Use {@link OpenSeadragon.Viewport#fitBounds} to ignore them.
     * @function
     * @param {OpenSeadragon.Rect} bounds
     * @param {Boolean} [immediately=false]
     * @returns {OpenSeadragon.Viewport} Chainable.
     */
fitBoundsWithConstraints:function(e,t){return this._fitBounds(e,{immediately:t,constraints:true})},
/**
     * Zooms so the image just fills the viewer vertically.
     * @param {Boolean} immediately
     * @returns {OpenSeadragon.Viewport} Chainable.
     */
fitVertically:function(i){var n=new t.Rect((this||e)._contentBounds.x+(this||e)._contentBounds.width/2,(this||e)._contentBounds.y,0,(this||e)._contentBounds.height);return this.fitBounds(n,i)},
/**
     * Zooms so the image just fills the viewer horizontally.
     * @param {Boolean} immediately
     * @returns {OpenSeadragon.Viewport} Chainable.
     */
fitHorizontally:function(i){var n=new t.Rect((this||e)._contentBounds.x,(this||e)._contentBounds.y+(this||e)._contentBounds.height/2,(this||e)._contentBounds.width,0);return this.fitBounds(n,i)},
/**
     * Returns bounds taking constraints into account
     * Added to improve constrained panning
     * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
     * @returns {OpenSeadragon.Rect} The bounds in viewport coordinates after applying constraints. The returned $.Rect
     *                               contains additional properties constraintsApplied, xConstrained and yConstrained.
     *                               These flags indicate whether the viewport bounds were modified by the constraints
     *                               of the viewer rectangle, and in which dimension(s).
     */
getConstrainedBounds:function(e){var t,i;t=this.getBounds(e);i=this._applyBoundaryConstraints(t);return i},
/**
     * @function
     * @param {OpenSeadragon.Point} delta
     * @param {Boolean} immediately
     * @returns {OpenSeadragon.Viewport} Chainable.
     * @fires OpenSeadragon.Viewer.event:pan
     */
panBy:function(i,n){var r=new t.Point((this||e).centerSpringX.target.value,(this||e).centerSpringY.target.value);return this.panTo(r.plus(i),n)},
/**
     * @function
     * @param {OpenSeadragon.Point} center
     * @param {Boolean} immediately
     * @returns {OpenSeadragon.Viewport} Chainable.
     * @fires OpenSeadragon.Viewer.event:pan
     */
panTo:function(t,i){if(i){(this||e).centerSpringX.resetTo(t.x);(this||e).centerSpringY.resetTo(t.y)}else{(this||e).centerSpringX.springTo(t.x);(this||e).centerSpringY.springTo(t.y)}(this||e).viewer&&
/**
         * Raised when the viewport is panned (see {@link OpenSeadragon.Viewport#panBy} and {@link OpenSeadragon.Viewport#panTo}).
         *
         * @event pan
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
         * @property {OpenSeadragon.Point} center
         * @property {Boolean} immediately
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
(this||e).viewer.raiseEvent("pan",{center:t,immediately:i});return this||e},
/**
     * @function
     * @returns {OpenSeadragon.Viewport} Chainable.
     * @fires OpenSeadragon.Viewer.event:zoom
     */
zoomBy:function(t,i,n){return this.zoomTo((this||e).zoomSpring.target.value*t,i,n)},
/**
     * Zooms to the specified zoom level
     * @function
     * @param {Number} zoom The zoom level to zoom to.
     * @param {OpenSeadragon.Point} [refPoint] The point which will stay at
     * the same screen location. Defaults to the viewport center.
     * @param {Boolean} [immediately=false]
     * @returns {OpenSeadragon.Viewport} Chainable.
     * @fires OpenSeadragon.Viewer.event:zoom
     */
zoomTo:function(i,n,r){var o=this||e;(this||e).zoomPoint=n instanceof t.Point&&!isNaN(n.x)&&!isNaN(n.y)?n:null;r?this._adjustCenterSpringsForZoomPoint((function(){o.zoomSpring.resetTo(i)})):(this||e).zoomSpring.springTo(i);(this||e).viewer&&
/**
         * Raised when the viewport zoom level changes (see {@link OpenSeadragon.Viewport#zoomBy} and {@link OpenSeadragon.Viewport#zoomTo}).
         *
         * @event zoom
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
         * @property {Number} zoom
         * @property {OpenSeadragon.Point} refPoint
         * @property {Boolean} immediately
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
(this||e).viewer.raiseEvent("zoom",{zoom:i,refPoint:n,immediately:r});return this||e},
/**
     * Rotates this viewport to the angle specified.
     * @function
     * @param {Number} degrees The degrees to set the rotation to.
     * @param {Boolean} [immediately=false] Whether to animate to the new angle
     * or rotate immediately.
     * * @returns {OpenSeadragon.Viewport} Chainable.
     */
setRotation:function(e,t){return this.rotateTo(e,null,t)},
/**
     * Gets the current rotation in degrees.
     * @function
     * @param {Boolean} [current=false] True for current rotation, false for target.
     * @returns {Number} The current rotation in degrees.
     */
getRotation:function(t){return t?(this||e).degreesSpring.current.value:(this||e).degreesSpring.target.value},
/**
     * Rotates this viewport to the angle specified around a pivot point. Alias for rotateTo.
     * @function
     * @param {Number} degrees The degrees to set the rotation to.
     * @param {OpenSeadragon.Point} [pivot] (Optional) point in viewport coordinates
     * around which the rotation should be performed. Defaults to the center of the viewport.
     * @param {Boolean} [immediately=false] Whether to animate to the new angle
     * or rotate immediately.
     * * @returns {OpenSeadragon.Viewport} Chainable.
     */
setRotationWithPivot:function(e,t,i){return this.rotateTo(e,t,i)},
/**
     * Rotates this viewport to the angle specified.
     * @function
     * @param {Number} degrees The degrees to set the rotation to.
     * @param {OpenSeadragon.Point} [pivot] (Optional) point in viewport coordinates
     * around which the rotation should be performed. Defaults to the center of the viewport.
     * @param {Boolean} [immediately=false] Whether to animate to the new angle
     * or rotate immediately.
     * @returns {OpenSeadragon.Viewport} Chainable.
     */
rotateTo:function(i,n,r){if(!(this||e).viewer||!(this||e).viewer.drawer.canRotate())return this||e;if((this||e).degreesSpring.target.value===i&&(this||e).degreesSpring.isAtTargetValue())return this||e;(this||e).rotationPivot=n instanceof t.Point&&!isNaN(n.x)&&!isNaN(n.y)?n:null;if(r)if((this||e).rotationPivot){var o=i-(this||e)._oldDegrees;if(!o){(this||e).rotationPivot=null;return this||e}this._rotateAboutPivot(i)}else(this||e).degreesSpring.resetTo(i);else{var s=t.positiveModulo((this||e).degreesSpring.current.value,360);var a=t.positiveModulo(i,360);var l=a-s;l>180?a-=360:l<-180&&(a+=360);var h=s-a;(this||e).degreesSpring.resetTo(i+h);(this||e).degreesSpring.springTo(i)}this._setContentBounds((this||e).viewer.world.getHomeBounds(),(this||e).viewer.world.getContentFactor());(this||e).viewer.forceRedraw();
/**
       * Raised when rotation has been changed.
       *
       * @event rotate
       * @memberof OpenSeadragon.Viewer
       * @type {object}
       * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
       * @property {Number} degrees - The number of degrees the rotation was set to.
       * @property {Boolean} immediately - Whether the rotation happened immediately or was animated
       * @property {OpenSeadragon.Point} pivot - The point in viewport coordinates around which the rotation (if any) happened
       * @property {?Object} userData - Arbitrary subscriber-defined object.
       */(this||e).viewer.raiseEvent("rotate",{degrees:i,immediately:!!r,pivot:(this||e).rotationPivot||this.getCenter()});return this||e},
/**
     * Rotates this viewport by the angle specified.
     * @function
     * @param {Number} degrees The degrees by which to rotate the viewport.
     * @param {OpenSeadragon.Point} [pivot] (Optional) point in viewport coordinates
     * around which the rotation should be performed. Defaults to the center of the viewport.
     * * @param {Boolean} [immediately=false] Whether to animate to the new angle
     * or rotate immediately.
     * @returns {OpenSeadragon.Viewport} Chainable.
     */
rotateBy:function(t,i,n){return this.rotateTo((this||e).degreesSpring.target.value+t,i,n)},
/**
     * @function
     * @returns {OpenSeadragon.Viewport} Chainable.
     * @fires OpenSeadragon.Viewer.event:resize
     */
resize:function(t,i){var n,r=this.getBoundsNoRotate(),o=r;(this||e).containerSize.x=t.x;(this||e).containerSize.y=t.y;this._updateContainerInnerSize();if(i){n=t.x/(this||e).containerSize.x;o.width=r.width*n;o.height=o.width/this.getAspectRatio()}(this||e).viewer&&
/**
         * Raised when a viewer resize operation is initiated (see {@link OpenSeadragon.Viewport#resize}).
         * This event happens before the viewport bounds have been updated.
         * See also {@link OpenSeadragon.Viewer#after-resize} which reflects
         * the new viewport bounds following the resize action.
         *
         * @event resize
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
         * @property {OpenSeadragon.Point} newContainerSize
         * @property {Boolean} maintain
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
(this||e).viewer.raiseEvent("resize",{newContainerSize:t,maintain:i});var s=this.fitBounds(o,true);(this||e).viewer&&
/**
         * Raised after the viewer is resized (see {@link OpenSeadragon.Viewport#resize}).
         * See also {@link OpenSeadragon.Viewer#resize} event which happens
         * before the new bounds have been calculated and applied.
         *
         * @event after-resize
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
         * @property {OpenSeadragon.Point} newContainerSize
         * @property {Boolean} maintain
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
(this||e).viewer.raiseEvent("after-resize",{newContainerSize:t,maintain:i});return s},_updateContainerInnerSize:function(){(this||e)._containerInnerSize=new t.Point(Math.max(1,(this||e).containerSize.x-((this||e)._margins.left+(this||e)._margins.right)),Math.max(1,(this||e).containerSize.y-((this||e)._margins.top+(this||e)._margins.bottom)))},
/**
     * Update the zoom, degrees, and center (X and Y) springs.
     * @function
     * @returns {Boolean} True if the viewport is still animating, false otherwise.
     */
update:function(){var t=this||e;this._adjustCenterSpringsForZoomPoint((function(){t.zoomSpring.update()}));(this||e).degreesSpring.isAtTargetValue()&&((this||e).rotationPivot=null);(this||e).centerSpringX.update();(this||e).centerSpringY.update();(this||e).rotationPivot?this._rotateAboutPivot(true):(this||e).degreesSpring.update();var i=(this||e).centerSpringX.current.value!==(this||e)._oldCenterX||(this||e).centerSpringY.current.value!==(this||e)._oldCenterY||(this||e).zoomSpring.current.value!==(this||e)._oldZoom||(this||e).degreesSpring.current.value!==(this||e)._oldDegrees;(this||e)._oldCenterX=(this||e).centerSpringX.current.value;(this||e)._oldCenterY=(this||e).centerSpringY.current.value;(this||e)._oldZoom=(this||e).zoomSpring.current.value;(this||e)._oldDegrees=(this||e).degreesSpring.current.value;var n=i||!(this||e).zoomSpring.isAtTargetValue()||!(this||e).centerSpringX.isAtTargetValue()||!(this||e).centerSpringY.isAtTargetValue()||!(this||e).degreesSpring.isAtTargetValue();return n},_rotateAboutPivot:function(t){var i=t===true;var n=(this||e).rotationPivot.minus(this.getCenter());(this||e).centerSpringX.shiftBy(n.x);(this||e).centerSpringY.shiftBy(n.y);i?(this||e).degreesSpring.update():(this||e).degreesSpring.resetTo(t);var r=(this||e).degreesSpring.current.value-(this||e)._oldDegrees;var o=n.rotate(r*-1).times(-1);(this||e).centerSpringX.shiftBy(o.x);(this||e).centerSpringY.shiftBy(o.y)},_adjustCenterSpringsForZoomPoint:function(t){if((this||e).zoomPoint){var i=this.pixelFromPoint((this||e).zoomPoint,true);t();var n=this.pixelFromPoint((this||e).zoomPoint,true);var r=n.minus(i);var o=this.deltaPointsFromPixels(r,true);(this||e).centerSpringX.shiftBy(o.x);(this||e).centerSpringY.shiftBy(o.y);(this||e).zoomSpring.isAtTargetValue()&&((this||e).zoomPoint=null)}else t()},
/**
     * Convert a delta (translation vector) from viewport coordinates to pixels
     * coordinates. This method does not take rotation into account.
     * Consider using deltaPixelsFromPoints if you need to account for rotation.
     * @param {OpenSeadragon.Point} deltaPoints - The translation vector to convert.
     * @param {Boolean} [current=false] - Pass true for the current location;
     * defaults to false (target location).
     * @returns {OpenSeadragon.Point}
     */
deltaPixelsFromPointsNoRotate:function(t,i){return t.times((this||e)._containerInnerSize.x*this.getZoom(i))},
/**
     * Convert a delta (translation vector) from viewport coordinates to pixels
     * coordinates.
     * @param {OpenSeadragon.Point} deltaPoints - The translation vector to convert.
     * @param {Boolean} [current=false] - Pass true for the current location;
     * defaults to false (target location).
     * @returns {OpenSeadragon.Point}
     */
deltaPixelsFromPoints:function(e,t){return this.deltaPixelsFromPointsNoRotate(e.rotate(this.getRotation(t)),t)},
/**
     * Convert a delta (translation vector) from pixels coordinates to viewport
     * coordinates. This method does not take rotation into account.
     * Consider using deltaPointsFromPixels if you need to account for rotation.
     * @param {OpenSeadragon.Point} deltaPixels - The translation vector to convert.
     * @param {Boolean} [current=false] - Pass true for the current location;
     * defaults to false (target location).
     * @returns {OpenSeadragon.Point}
     */
deltaPointsFromPixelsNoRotate:function(t,i){return t.divide((this||e)._containerInnerSize.x*this.getZoom(i))},
/**
     * Convert a delta (translation vector) from pixels coordinates to viewport
     * coordinates.
     * @param {OpenSeadragon.Point} deltaPixels - The translation vector to convert.
     * @param {Boolean} [current=false] - Pass true for the current location;
     * defaults to false (target location).
     * @returns {OpenSeadragon.Point}
     */
deltaPointsFromPixels:function(e,t){return this.deltaPointsFromPixelsNoRotate(e,t).rotate(-this.getRotation(t))},
/**
     * Convert viewport coordinates to pixels coordinates.
     * This method does not take rotation into account.
     * Consider using pixelFromPoint if you need to account for rotation.
     * @param {OpenSeadragon.Point} point the viewport coordinates
     * @param {Boolean} [current=false] - Pass true for the current location;
     * defaults to false (target location).
     * @returns {OpenSeadragon.Point}
     */
pixelFromPointNoRotate:function(e,t){return this._pixelFromPointNoRotate(e,this.getBoundsNoRotate(t))},
/**
     * Convert viewport coordinates to pixel coordinates.
     * @param {OpenSeadragon.Point} point the viewport coordinates
     * @param {Boolean} [current=false] - Pass true for the current location;
     * defaults to false (target location).
     * @returns {OpenSeadragon.Point}
     */
pixelFromPoint:function(e,t){return this._pixelFromPoint(e,this.getBoundsNoRotate(t))},_pixelFromPointNoRotate:function(i,n){return i.minus(n.getTopLeft()).times((this||e)._containerInnerSize.x/n.width).plus(new t.Point((this||e)._margins.left,(this||e)._margins.top))},_pixelFromPoint:function(e,t){return this._pixelFromPointNoRotate(e.rotate(this.getRotation(true),this.getCenter(true)),t)},
/**
     * Convert pixel coordinates to viewport coordinates.
     * This method does not take rotation into account.
     * Consider using pointFromPixel if you need to account for rotation.
     * @param {OpenSeadragon.Point} pixel Pixel coordinates
     * @param {Boolean} [current=false] - Pass true for the current location;
     * defaults to false (target location).
     * @returns {OpenSeadragon.Point}
     */
pointFromPixelNoRotate:function(i,n){var r=this.getBoundsNoRotate(n);return i.minus(new t.Point((this||e)._margins.left,(this||e)._margins.top)).divide((this||e)._containerInnerSize.x/r.width).plus(r.getTopLeft())},
/**
     * Convert pixel coordinates to viewport coordinates.
     * @param {OpenSeadragon.Point} pixel Pixel coordinates
     * @param {Boolean} [current=false] - Pass true for the current location;
     * defaults to false (target location).
     * @returns {OpenSeadragon.Point}
     */
pointFromPixel:function(e,t){return this.pointFromPixelNoRotate(e,t).rotate(-this.getRotation(t),this.getCenter(t))},_viewportToImageDelta:function(i,n){var r=(this||e)._contentBoundsNoRotate.width;return new t.Point(i*(this||e)._contentSizeNoRotate.x/r,n*(this||e)._contentSizeNoRotate.x/r)},
/**
     * Translates from OpenSeadragon viewer coordinate system to image coordinate system.
     * This method can be called either by passing X,Y coordinates or an
     * OpenSeadragon.Point
     * Note: not accurate with multi-image; use TiledImage.viewportToImageCoordinates instead.
     * @function
     * @param {(OpenSeadragon.Point|Number)} viewerX either a point or the X
     * coordinate in viewport coordinate system.
     * @param {Number} [viewerY] Y coordinate in viewport coordinate system.
     * @returns {OpenSeadragon.Point} a point representing the coordinates in the image.
     */
viewportToImageCoordinates:function(i,n){if(i instanceof t.Point)return this.viewportToImageCoordinates(i.x,i.y);if((this||e).viewer){var r=(this||e).viewer.world.getItemCount();if(r>1)(this||e).silenceMultiImageWarnings||t.console.error("[Viewport.viewportToImageCoordinates] is not accurate with multi-image; use TiledImage.viewportToImageCoordinates instead.");else if(r===1){var o=(this||e).viewer.world.getItemAt(0);return o.viewportToImageCoordinates(i,n,true)}}return this._viewportToImageDelta(i-(this||e)._contentBoundsNoRotate.x,n-(this||e)._contentBoundsNoRotate.y)},_imageToViewportDelta:function(i,n){var r=(this||e)._contentBoundsNoRotate.width;return new t.Point(i/(this||e)._contentSizeNoRotate.x*r,n/(this||e)._contentSizeNoRotate.x*r)},
/**
     * Translates from image coordinate system to OpenSeadragon viewer coordinate system
     * This method can be called either by passing X,Y coordinates or an
     * OpenSeadragon.Point
     * Note: not accurate with multi-image; use TiledImage.imageToViewportCoordinates instead.
     * @function
     * @param {(OpenSeadragon.Point | Number)} imageX the point or the
     * X coordinate in image coordinate system.
     * @param {Number} [imageY] Y coordinate in image coordinate system.
     * @returns {OpenSeadragon.Point} a point representing the coordinates in the viewport.
     */
imageToViewportCoordinates:function(i,n){if(i instanceof t.Point)return this.imageToViewportCoordinates(i.x,i.y);if((this||e).viewer){var r=(this||e).viewer.world.getItemCount();if(r>1)(this||e).silenceMultiImageWarnings||t.console.error("[Viewport.imageToViewportCoordinates] is not accurate with multi-image; use TiledImage.imageToViewportCoordinates instead.");else if(r===1){var o=(this||e).viewer.world.getItemAt(0);return o.imageToViewportCoordinates(i,n,true)}}var s=this._imageToViewportDelta(i,n);s.x+=(this||e)._contentBoundsNoRotate.x;s.y+=(this||e)._contentBoundsNoRotate.y;return s},
/**
     * Translates from a rectangle which describes a portion of the image in
     * pixel coordinates to OpenSeadragon viewport rectangle coordinates.
     * This method can be called either by passing X,Y,width,height or an
     * OpenSeadragon.Rect
     * Note: not accurate with multi-image; use TiledImage.imageToViewportRectangle instead.
     * @function
     * @param {(OpenSeadragon.Rect | Number)} imageX the rectangle or the X
     * coordinate of the top left corner of the rectangle in image coordinate system.
     * @param {Number} [imageY] the Y coordinate of the top left corner of the rectangle
     * in image coordinate system.
     * @param {Number} [pixelWidth] the width in pixel of the rectangle.
     * @param {Number} [pixelHeight] the height in pixel of the rectangle.
     * @returns {OpenSeadragon.Rect} This image's bounds in viewport coordinates
     */
imageToViewportRectangle:function(i,n,r,o){var s=i;s instanceof t.Rect||(s=new t.Rect(i,n,r,o));if((this||e).viewer){var a=(this||e).viewer.world.getItemCount();if(a>1)(this||e).silenceMultiImageWarnings||t.console.error("[Viewport.imageToViewportRectangle] is not accurate with multi-image; use TiledImage.imageToViewportRectangle instead.");else if(a===1){var l=(this||e).viewer.world.getItemAt(0);return l.imageToViewportRectangle(i,n,r,o,true)}}var h=this.imageToViewportCoordinates(s.x,s.y);var u=this._imageToViewportDelta(s.width,s.height);return new t.Rect(h.x,h.y,u.x,u.y,s.degrees)},
/**
     * Translates from a rectangle which describes a portion of
     * the viewport in point coordinates to image rectangle coordinates.
     * This method can be called either by passing X,Y,width,height or an
     * OpenSeadragon.Rect
     * Note: not accurate with multi-image; use TiledImage.viewportToImageRectangle instead.
     * @function
     * @param {(OpenSeadragon.Rect | Number)} viewerX either a rectangle or
     * the X coordinate of the top left corner of the rectangle in viewport
     * coordinate system.
     * @param {Number} [viewerY] the Y coordinate of the top left corner of the rectangle
     * in viewport coordinate system.
     * @param {Number} [pointWidth] the width of the rectangle in viewport coordinate system.
     * @param {Number} [pointHeight] the height of the rectangle in viewport coordinate system.
     */
viewportToImageRectangle:function(i,n,r,o){var s=i;s instanceof t.Rect||(s=new t.Rect(i,n,r,o));if((this||e).viewer){var a=(this||e).viewer.world.getItemCount();if(a>1)(this||e).silenceMultiImageWarnings||t.console.error("[Viewport.viewportToImageRectangle] is not accurate with multi-image; use TiledImage.viewportToImageRectangle instead.");else if(a===1){var l=(this||e).viewer.world.getItemAt(0);return l.viewportToImageRectangle(i,n,r,o,true)}}var h=this.viewportToImageCoordinates(s.x,s.y);var u=this._viewportToImageDelta(s.width,s.height);return new t.Rect(h.x,h.y,u.x,u.y,s.degrees)},
/**
     * Convert pixel coordinates relative to the viewer element to image
     * coordinates.
     * Note: not accurate with multi-image.
     * @param {OpenSeadragon.Point} pixel
     * @returns {OpenSeadragon.Point}
     */
viewerElementToImageCoordinates:function(e){var t=this.pointFromPixel(e,true);return this.viewportToImageCoordinates(t)},
/**
     * Convert pixel coordinates relative to the image to
     * viewer element coordinates.
     * Note: not accurate with multi-image.
     * @param {OpenSeadragon.Point} pixel
     * @returns {OpenSeadragon.Point}
     */
imageToViewerElementCoordinates:function(e){var t=this.imageToViewportCoordinates(e);return this.pixelFromPoint(t,true)},
/**
     * Convert pixel coordinates relative to the window to image coordinates.
     * Note: not accurate with multi-image.
     * @param {OpenSeadragon.Point} pixel
     * @returns {OpenSeadragon.Point}
     */
windowToImageCoordinates:function(i){t.console.assert((this||e).viewer,"[Viewport.windowToImageCoordinates] the viewport must have a viewer.");var n=i.minus(t.getElementPosition((this||e).viewer.element));return this.viewerElementToImageCoordinates(n)},
/**
     * Convert image coordinates to pixel coordinates relative to the window.
     * Note: not accurate with multi-image.
     * @param {OpenSeadragon.Point} pixel
     * @returns {OpenSeadragon.Point}
     */
imageToWindowCoordinates:function(i){t.console.assert((this||e).viewer,"[Viewport.imageToWindowCoordinates] the viewport must have a viewer.");var n=this.imageToViewerElementCoordinates(i);return n.plus(t.getElementPosition((this||e).viewer.element))},
/**
     * Convert pixel coordinates relative to the viewer element to viewport
     * coordinates.
     * @param {OpenSeadragon.Point} pixel
     * @returns {OpenSeadragon.Point}
     */
viewerElementToViewportCoordinates:function(e){return this.pointFromPixel(e,true)},
/**
     * Convert viewport coordinates to pixel coordinates relative to the
     * viewer element.
     * @param {OpenSeadragon.Point} point
     * @returns {OpenSeadragon.Point}
     */
viewportToViewerElementCoordinates:function(e){return this.pixelFromPoint(e,true)},
/**
     * Convert a rectangle in pixel coordinates relative to the viewer element
     * to viewport coordinates.
     * @param {OpenSeadragon.Rect} rectangle the rectangle to convert
     * @returns {OpenSeadragon.Rect} the converted rectangle
     */
viewerElementToViewportRectangle:function(e){return t.Rect.fromSummits(this.pointFromPixel(e.getTopLeft(),true),this.pointFromPixel(e.getTopRight(),true),this.pointFromPixel(e.getBottomLeft(),true))},
/**
     * Convert a rectangle in viewport coordinates to pixel coordinates relative
     * to the viewer element.
     * @param {OpenSeadragon.Rect} rectangle the rectangle to convert
     * @returns {OpenSeadragon.Rect} the converted rectangle
     */
viewportToViewerElementRectangle:function(e){return t.Rect.fromSummits(this.pixelFromPoint(e.getTopLeft(),true),this.pixelFromPoint(e.getTopRight(),true),this.pixelFromPoint(e.getBottomLeft(),true))},
/**
     * Convert pixel coordinates relative to the window to viewport coordinates.
     * @param {OpenSeadragon.Point} pixel
     * @returns {OpenSeadragon.Point}
     */
windowToViewportCoordinates:function(i){t.console.assert((this||e).viewer,"[Viewport.windowToViewportCoordinates] the viewport must have a viewer.");var n=i.minus(t.getElementPosition((this||e).viewer.element));return this.viewerElementToViewportCoordinates(n)},
/**
     * Convert viewport coordinates to pixel coordinates relative to the window.
     * @param {OpenSeadragon.Point} point
     * @returns {OpenSeadragon.Point}
     */
viewportToWindowCoordinates:function(i){t.console.assert((this||e).viewer,"[Viewport.viewportToWindowCoordinates] the viewport must have a viewer.");var n=this.viewportToViewerElementCoordinates(i);return n.plus(t.getElementPosition((this||e).viewer.element))},
/**
     * Convert a viewport zoom to an image zoom.
     * Image zoom: ratio of the original image size to displayed image size.
     * 1 means original image size, 0.5 half size...
     * Viewport zoom: ratio of the displayed image's width to viewport's width.
     * 1 means identical width, 2 means image's width is twice the viewport's width...
     * Note: not accurate with multi-image.
     * @function
     * @param {Number} viewportZoom The viewport zoom
     * target zoom.
     * @returns {Number} imageZoom The image zoom
     */
viewportToImageZoom:function(i){if((this||e).viewer){var n=(this||e).viewer.world.getItemCount();if(n>1)(this||e).silenceMultiImageWarnings||t.console.error("[Viewport.viewportToImageZoom] is not accurate with multi-image.");else if(n===1){var r=(this||e).viewer.world.getItemAt(0);return r.viewportToImageZoom(i)}}var o=(this||e)._contentSizeNoRotate.x;var s=(this||e)._containerInnerSize.x;var a=(this||e)._contentBoundsNoRotate.width;var l=s/o*a;return i*l},
/**
     * Convert an image zoom to a viewport zoom.
     * Image zoom: ratio of the original image size to displayed image size.
     * 1 means original image size, 0.5 half size...
     * Viewport zoom: ratio of the displayed image's width to viewport's width.
     * 1 means identical width, 2 means image's width is twice the viewport's width...
     * Note: not accurate with multi-image; use [TiledImage.imageToViewportZoom] for the specific image of interest.
     * @function
     * @param {Number} imageZoom The image zoom
     * target zoom.
     * @returns {Number} viewportZoom The viewport zoom
     */
imageToViewportZoom:function(i){if((this||e).viewer){var n=(this||e).viewer.world.getItemCount();if(n>1)(this||e).silenceMultiImageWarnings||t.console.error("[Viewport.imageToViewportZoom] is not accurate with multi-image. Instead, use [TiledImage.imageToViewportZoom] for the specific image of interest");else if(n===1){var r=(this||e).viewer.world.getItemAt(0);return r.imageToViewportZoom(i)}}var o=(this||e)._contentSizeNoRotate.x;var s=(this||e)._containerInnerSize.x;var a=(this||e)._contentBoundsNoRotate.width;var l=o/s/a;return i*l},
/**
     * Toggles flip state and demands a new drawing on navigator and viewer objects.
     * @function
     * @returns {OpenSeadragon.Viewport} Chainable.
     */
toggleFlip:function(){this.setFlip(!this.getFlip());return this||e},
/**
     * Get flip state stored on viewport.
     * @function
     * @returns {Boolean} Flip state.
     */
getFlip:function(){return(this||e).flipped},
/**
     * Sets flip state according to the state input argument.
     * @function
     * @param {Boolean} state - Flip state to set.
     * @returns {OpenSeadragon.Viewport} Chainable.
     */
setFlip:function(t){if((this||e).flipped===t)return this||e;(this||e).flipped=t;(this||e).viewer.navigator&&(this||e).viewer.navigator.setFlip(this.getFlip());(this||e).viewer.forceRedraw();
/**
       * Raised when flip state has been changed.
       *
       * @event flip
       * @memberof OpenSeadragon.Viewer
       * @type {object}
       * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
       * @property {Number} flipped - The flip state after this change.
       * @property {?Object} userData - Arbitrary subscriber-defined object.
       */(this||e).viewer.raiseEvent("flip",{flipped:t});return this||e},
/**
     * Gets current max zoom pixel ratio
     * @function
     * @returns {Number} Max zoom pixel ratio
     */
getMaxZoomPixelRatio:function(){return(this||e).maxZoomPixelRatio},
/**
     * Sets max zoom pixel ratio
     * @function
     * @param {Number} ratio - Max zoom pixel ratio
     * @param {Boolean} [applyConstraints=true] - Apply constraints after setting ratio;
     * Takes effect only if current zoom is greater than set max zoom pixel ratio
     * @param {Boolean} [immediately=false] - Whether to animate to new zoom
     */
setMaxZoomPixelRatio:function(i,n=true,r=false){t.console.assert(!isNaN(i),"[Viewport.setMaxZoomPixelRatio] ratio must be a number");if(!isNaN(i)){(this||e).maxZoomPixelRatio=i;n&&this.getZoom()>this.getMaxZoom()&&this.applyConstraints(r)}}}})(OpenSeadragon);(function(t){
/**
   * You shouldn't have to create a TiledImage instance directly; get it asynchronously by
   * using {@link OpenSeadragon.Viewer#open} or {@link OpenSeadragon.Viewer#addTiledImage} instead.
   * @class TiledImage
   * @memberof OpenSeadragon
   * @extends OpenSeadragon.EventSource
   * @classdesc Handles rendering of tiles for an {@link OpenSeadragon.Viewer}.
   * A new instance is created for each TileSource opened.
   * @param {Object} options - Configuration for this TiledImage.
   * @param {OpenSeadragon.TileSource} options.source - The TileSource that defines this TiledImage.
   * @param {OpenSeadragon.Viewer} options.viewer - The Viewer that owns this TiledImage.
   * @param {OpenSeadragon.TileCache} options.tileCache - The TileCache for this TiledImage to use.
   * @param {OpenSeadragon.Drawer} options.drawer - The Drawer for this TiledImage to draw onto.
   * @param {OpenSeadragon.ImageLoader} options.imageLoader - The ImageLoader for this TiledImage to use.
   * @param {Number} [options.x=0] - Left position, in viewport coordinates.
   * @param {Number} [options.y=0] - Top position, in viewport coordinates.
   * @param {Number} [options.width=1] - Width, in viewport coordinates.
   * @param {Number} [options.height] - Height, in viewport coordinates.
   * @param {OpenSeadragon.Rect} [options.fitBounds] The bounds in viewport coordinates
   * to fit the image into. If specified, x, y, width and height get ignored.
   * @param {OpenSeadragon.Placement} [options.fitBoundsPlacement=OpenSeadragon.Placement.CENTER]
   * How to anchor the image in the bounds if options.fitBounds is set.
   * @param {OpenSeadragon.Rect} [options.clip] - An area, in image pixels, to clip to
   * (portions of the image outside of this area will not be visible). Only works on
   * browsers that support the HTML5 canvas.
   * @param {Number} [options.springStiffness] - See {@link OpenSeadragon.Options}.
   * @param {Boolean} [options.animationTime] - See {@link OpenSeadragon.Options}.
   * @param {Number} [options.minZoomImageRatio] - See {@link OpenSeadragon.Options}.
   * @param {Boolean} [options.wrapHorizontal] - See {@link OpenSeadragon.Options}.
   * @param {Boolean} [options.wrapVertical] - See {@link OpenSeadragon.Options}.
   * @param {Boolean} [options.immediateRender] - See {@link OpenSeadragon.Options}.
   * @param {Number} [options.blendTime] - See {@link OpenSeadragon.Options}.
   * @param {Boolean} [options.alwaysBlend] - See {@link OpenSeadragon.Options}.
   * @param {Number} [options.minPixelRatio] - See {@link OpenSeadragon.Options}.
   * @param {Number} [options.smoothTileEdgesMinZoom] - See {@link OpenSeadragon.Options}.
   * @param {Boolean} [options.iOSDevice] - See {@link OpenSeadragon.Options}.
   * @param {Number} [options.opacity=1] - Set to draw at proportional opacity. If zero, images will not draw.
   * @param {Boolean} [options.preload=false] - Set true to load even when the image is hidden by zero opacity.
   * @param {String} [options.compositeOperation] - How the image is composited onto other images;
   * see compositeOperation in {@link OpenSeadragon.Options} for possible values.
   * @param {Boolean} [options.debugMode] - See {@link OpenSeadragon.Options}.
   * @param {String|CanvasGradient|CanvasPattern|Function} [options.placeholderFillStyle] - See {@link OpenSeadragon.Options}.
   * @param {String|Boolean} [options.crossOriginPolicy] - See {@link OpenSeadragon.Options}.
   * @param {Boolean} [options.ajaxWithCredentials] - See {@link OpenSeadragon.Options}.
   * @param {Boolean} [options.loadTilesWithAjax]
   *      Whether to load tile data using AJAX requests.
   *      Defaults to the setting in {@link OpenSeadragon.Options}.
   * @param {Object} [options.ajaxHeaders={}]
   *      A set of headers to include when making tile AJAX requests.
   */
t.TiledImage=function(i){(this||e)._initialized=false;t.console.assert(i.tileCache,"[TiledImage] options.tileCache is required");t.console.assert(i.drawer,"[TiledImage] options.drawer is required");t.console.assert(i.viewer,"[TiledImage] options.viewer is required");t.console.assert(i.imageLoader,"[TiledImage] options.imageLoader is required");t.console.assert(i.source,"[TiledImage] options.source is required");t.console.assert(!i.clip||i.clip instanceof t.Rect,"[TiledImage] options.clip must be an OpenSeadragon.Rect if present");t.EventSource.call(this||e);(this||e)._tileCache=i.tileCache;delete i.tileCache;(this||e)._drawer=i.drawer;delete i.drawer;(this||e)._imageLoader=i.imageLoader;delete i.imageLoader;i.clip instanceof t.Rect&&((this||e)._clip=i.clip.clone());delete i.clip;var n=i.x||0;delete i.x;var r=i.y||0;delete i.y;(this||e).normHeight=i.source.dimensions.y/i.source.dimensions.x;(this||e).contentAspectX=i.source.dimensions.x/i.source.dimensions.y;var o=1;if(i.width){o=i.width;delete i.width;if(i.height){t.console.error("specifying both width and height to a tiledImage is not supported");delete i.height}}else if(i.height){o=i.height/(this||e).normHeight;delete i.height}var s=i.fitBounds;delete i.fitBounds;var a=i.fitBoundsPlacement||OpenSeadragon.Placement.CENTER;delete i.fitBoundsPlacement;var l=i.degrees||0;delete i.degrees;var h=i.ajaxHeaders;delete i.ajaxHeaders;t.extend(true,this||e,{viewer:null,tilesMatrix:{},coverage:{},loadingCoverage:{},lastDrawn:[],lastResetTime:0,_needsDraw:true,_needsUpdate:true,_hasOpaqueTile:false,_tilesLoading:0,_tilesToDraw:[],_lastDrawn:[],_isBlending:false,_wasBlending:false,_isTainted:false,springStiffness:t.DEFAULT_SETTINGS.springStiffness,animationTime:t.DEFAULT_SETTINGS.animationTime,minZoomImageRatio:t.DEFAULT_SETTINGS.minZoomImageRatio,wrapHorizontal:t.DEFAULT_SETTINGS.wrapHorizontal,wrapVertical:t.DEFAULT_SETTINGS.wrapVertical,immediateRender:t.DEFAULT_SETTINGS.immediateRender,blendTime:t.DEFAULT_SETTINGS.blendTime,alwaysBlend:t.DEFAULT_SETTINGS.alwaysBlend,minPixelRatio:t.DEFAULT_SETTINGS.minPixelRatio,smoothTileEdgesMinZoom:t.DEFAULT_SETTINGS.smoothTileEdgesMinZoom,iOSDevice:t.DEFAULT_SETTINGS.iOSDevice,debugMode:t.DEFAULT_SETTINGS.debugMode,crossOriginPolicy:t.DEFAULT_SETTINGS.crossOriginPolicy,ajaxWithCredentials:t.DEFAULT_SETTINGS.ajaxWithCredentials,placeholderFillStyle:t.DEFAULT_SETTINGS.placeholderFillStyle,opacity:t.DEFAULT_SETTINGS.opacity,preload:t.DEFAULT_SETTINGS.preload,compositeOperation:t.DEFAULT_SETTINGS.compositeOperation,subPixelRoundingForTransparency:t.DEFAULT_SETTINGS.subPixelRoundingForTransparency,maxTilesPerFrame:t.DEFAULT_SETTINGS.maxTilesPerFrame},i);(this||e)._preload=(this||e).preload;delete(this||e).preload;(this||e)._fullyLoaded=false;(this||e)._xSpring=new t.Spring({initial:n,springStiffness:(this||e).springStiffness,animationTime:(this||e).animationTime});(this||e)._ySpring=new t.Spring({initial:r,springStiffness:(this||e).springStiffness,animationTime:(this||e).animationTime});(this||e)._scaleSpring=new t.Spring({initial:o,springStiffness:(this||e).springStiffness,animationTime:(this||e).animationTime});(this||e)._degreesSpring=new t.Spring({initial:l,springStiffness:(this||e).springStiffness,animationTime:(this||e).animationTime});this._updateForScale();s&&this.fitBounds(s,a,true);(this||e)._ownAjaxHeaders={};this.setAjaxHeaders(h,false);(this||e)._initialized=true};t.extend(t.TiledImage.prototype,t.EventSource.prototype,{
/**
     * @returns {Boolean} Whether the TiledImage needs to be drawn.
     */
needsDraw:function(){return(this||e)._needsDraw},redraw:function(){(this||e)._needsDraw=true},
/**
     * @returns {Boolean} Whether all tiles necessary for this TiledImage to draw at the current view have been loaded.
     */
getFullyLoaded:function(){return(this||e)._fullyLoaded},_setFullyLoaded:function(t){if(t!==(this||e)._fullyLoaded){(this||e)._fullyLoaded=t;
/**
       * Fired when the TiledImage's "fully loaded" flag (whether all tiles necessary for this TiledImage
       * to draw at the current view have been loaded) changes.
       *
       * @event fully-loaded-change
       * @memberof OpenSeadragon.TiledImage
       * @type {object}
       * @property {Boolean} fullyLoaded - The new "fully loaded" value.
       * @property {OpenSeadragon.TiledImage} eventSource - A reference to the TiledImage which raised the event.
       * @property {?Object} userData - Arbitrary subscriber-defined object.
       */this.raiseEvent("fully-loaded-change",{fullyLoaded:(this||e)._fullyLoaded})}},reset:function(){(this||e)._tileCache.clearTilesFor(this||e);(this||e).lastResetTime=t.now();(this||e)._needsDraw=true},
/**
     * Updates the TiledImage's bounds, animating if needed. Based on the new
     * bounds, updates the levels and tiles to be drawn into the viewport.
     * @param viewportChanged Whether the viewport changed meaning tiles need to be updated.
     * @returns {Boolean} Whether the TiledImage needs to be drawn.
     */
update:function(t){let i=(this||e)._xSpring.update();let n=(this||e)._ySpring.update();let r=(this||e)._scaleSpring.update();let o=(this||e)._degreesSpring.update();let s=i||n||r||o||(this||e)._needsUpdate;if(s||t||!(this||e)._fullyLoaded){let e=this._updateLevelsForViewport();this._setFullyLoaded(e)}(this||e)._needsUpdate=false;if(s){this._updateForScale();this._raiseBoundsChange();(this||e)._needsDraw=true;return true}return false},
/**
     * Mark this TiledImage as having been drawn, so that it will only be drawn
     * again if something changes about the image. If the image is still blending,
     * this will have no effect.
     * @returns {Boolean} whether the item still needs to be drawn due to blending
     */
setDrawn:function(){(this||e)._needsDraw=(this||e)._isBlending||(this||e)._wasBlending;return(this||e)._needsDraw},setTainted(t){(this||e)._isTainted=t},
/**
     * @private
     * @returns {Boolean} whether the TiledImage has been marked as tainted
     */
isTainted(){return(this||e)._isTainted},destroy:function(){this.reset();(this||e).source.destroy&&(this||e).source.destroy((this||e).viewer)},
/**
     * Get this TiledImage's bounds in viewport coordinates.
     * @param {Boolean} [current=false] - Pass true for the current location;
     * false for target location.
     * @returns {OpenSeadragon.Rect} This TiledImage's bounds in viewport coordinates.
     */
getBounds:function(e){return this.getBoundsNoRotate(e).rotate(this.getRotation(e),this._getRotationPoint(e))},
/**
     * Get this TiledImage's bounds in viewport coordinates without taking
     * rotation into account.
     * @param {Boolean} [current=false] - Pass true for the current location;
     * false for target location.
     * @returns {OpenSeadragon.Rect} This TiledImage's bounds in viewport coordinates.
     */
getBoundsNoRotate:function(i){return i?new t.Rect((this||e)._xSpring.current.value,(this||e)._ySpring.current.value,(this||e)._worldWidthCurrent,(this||e)._worldHeightCurrent):new t.Rect((this||e)._xSpring.target.value,(this||e)._ySpring.target.value,(this||e)._worldWidthTarget,(this||e)._worldHeightTarget)},getWorldBounds:function(){t.console.error("[TiledImage.getWorldBounds] is deprecated; use TiledImage.getBounds instead");return this.getBounds()},
/**
     * Get the bounds of the displayed part of the tiled image.
     * @param {Boolean} [current=false] Pass true for the current location,
     * false for the target location.
     * @returns {$.Rect} The clipped bounds in viewport coordinates.
     */
getClippedBounds:function(i){var n=this.getBoundsNoRotate(i);if((this||e)._clip){var r=i?(this||e)._worldWidthCurrent:(this||e)._worldWidthTarget;var o=r/(this||e).source.dimensions.x;var s=(this||e)._clip.times(o);n=new t.Rect(n.x+s.x,n.y+s.y,s.width,s.height)}return n.rotate(this.getRotation(i),this._getRotationPoint(i))},
/**
     * @function
     * @param {Number} level
     * @param {Number} x
     * @param {Number} y
     * @returns {OpenSeadragon.Rect} Where this tile fits (in normalized coordinates).
     */
getTileBounds:function(t,i,n){var r=(this||e).source.getNumTiles(t);var o=(r.x+i%r.x)%r.x;var s=(r.y+n%r.y)%r.y;var a=(this||e).source.getTileBounds(t,o,s);this.getFlip()&&(a.x=Math.max(0,1-a.x-a.width));a.x+=(i-o)/r.x;a.y+=(this||e)._worldHeightCurrent/(this||e)._worldWidthCurrent*((n-s)/r.y);return a},
/**
     * @returns {OpenSeadragon.Point} This TiledImage's content size, in original pixels.
     */
getContentSize:function(){return new t.Point((this||e).source.dimensions.x,(this||e).source.dimensions.y)},
/**
     * @returns {OpenSeadragon.Point} The TiledImage's content size, in window coordinates.
     */
getSizeInWindowCoordinates:function(){var e=this.imageToWindowCoordinates(new t.Point(0,0));var i=this.imageToWindowCoordinates(this.getContentSize());return new t.Point(i.x-e.x,i.y-e.y)},_viewportToImageDelta:function(i,n,r){var o=r?(this||e)._scaleSpring.current.value:(this||e)._scaleSpring.target.value;return new t.Point(i*((this||e).source.dimensions.x/o),n*((this||e).source.dimensions.y*(this||e).contentAspectX/o))},
/**
     * Translates from OpenSeadragon viewer coordinate system to image coordinate system.
     * This method can be called either by passing X,Y coordinates or an {@link OpenSeadragon.Point}.
     * @param {Number|OpenSeadragon.Point} viewerX - The X coordinate or point in viewport coordinate system.
     * @param {Number} [viewerY] - The Y coordinate in viewport coordinate system.
     * @param {Boolean} [current=false] - Pass true to use the current location; false for target location.
     * @returns {OpenSeadragon.Point} A point representing the coordinates in the image.
     */
viewportToImageCoordinates:function(i,n,r){var o;if(i instanceof t.Point){r=n;o=i}else o=new t.Point(i,n);o=o.rotate(-this.getRotation(r),this._getRotationPoint(r));return r?this._viewportToImageDelta(o.x-(this||e)._xSpring.current.value,o.y-(this||e)._ySpring.current.value):this._viewportToImageDelta(o.x-(this||e)._xSpring.target.value,o.y-(this||e)._ySpring.target.value)},_imageToViewportDelta:function(i,n,r){var o=r?(this||e)._scaleSpring.current.value:(this||e)._scaleSpring.target.value;return new t.Point(i/(this||e).source.dimensions.x*o,n/(this||e).source.dimensions.y/(this||e).contentAspectX*o)},
/**
     * Translates from image coordinate system to OpenSeadragon viewer coordinate system
     * This method can be called either by passing X,Y coordinates or an {@link OpenSeadragon.Point}.
     * @param {Number|OpenSeadragon.Point} imageX - The X coordinate or point in image coordinate system.
     * @param {Number} [imageY] - The Y coordinate in image coordinate system.
     * @param {Boolean} [current=false] - Pass true to use the current location; false for target location.
     * @returns {OpenSeadragon.Point} A point representing the coordinates in the viewport.
     */
imageToViewportCoordinates:function(i,n,r){if(i instanceof t.Point){r=n;n=i.y;i=i.x}var o=this._imageToViewportDelta(i,n,r);if(r){o.x+=(this||e)._xSpring.current.value;o.y+=(this||e)._ySpring.current.value}else{o.x+=(this||e)._xSpring.target.value;o.y+=(this||e)._ySpring.target.value}return o.rotate(this.getRotation(r),this._getRotationPoint(r))},
/**
     * Translates from a rectangle which describes a portion of the image in
     * pixel coordinates to OpenSeadragon viewport rectangle coordinates.
     * This method can be called either by passing X,Y,width,height or an {@link OpenSeadragon.Rect}.
     * @param {Number|OpenSeadragon.Rect} imageX - The left coordinate or rectangle in image coordinate system.
     * @param {Number} [imageY] - The top coordinate in image coordinate system.
     * @param {Number} [pixelWidth] - The width in pixel of the rectangle.
     * @param {Number} [pixelHeight] - The height in pixel of the rectangle.
     * @param {Boolean} [current=false] - Pass true to use the current location; false for target location.
     * @returns {OpenSeadragon.Rect} A rect representing the coordinates in the viewport.
     */
imageToViewportRectangle:function(e,i,n,r,o){var s=e;s instanceof t.Rect?o=i:s=new t.Rect(e,i,n,r);var a=this.imageToViewportCoordinates(s.getTopLeft(),o);var l=this._imageToViewportDelta(s.width,s.height,o);return new t.Rect(a.x,a.y,l.x,l.y,s.degrees+this.getRotation(o))},
/**
     * Translates from a rectangle which describes a portion of
     * the viewport in point coordinates to image rectangle coordinates.
     * This method can be called either by passing X,Y,width,height or an {@link OpenSeadragon.Rect}.
     * @param {Number|OpenSeadragon.Rect} viewerX - The left coordinate or rectangle in viewport coordinate system.
     * @param {Number} [viewerY] - The top coordinate in viewport coordinate system.
     * @param {Number} [pointWidth] - The width in viewport coordinate system.
     * @param {Number} [pointHeight] - The height in viewport coordinate system.
     * @param {Boolean} [current=false] - Pass true to use the current location; false for target location.
     * @returns {OpenSeadragon.Rect} A rect representing the coordinates in the image.
     */
viewportToImageRectangle:function(e,i,n,r,o){var s=e;e instanceof t.Rect?o=i:s=new t.Rect(e,i,n,r);var a=this.viewportToImageCoordinates(s.getTopLeft(),o);var l=this._viewportToImageDelta(s.width,s.height,o);return new t.Rect(a.x,a.y,l.x,l.y,s.degrees-this.getRotation(o))},
/**
     * Convert pixel coordinates relative to the viewer element to image
     * coordinates.
     * @param {OpenSeadragon.Point} pixel
     * @returns {OpenSeadragon.Point}
     */
viewerElementToImageCoordinates:function(t){var i=(this||e).viewport.pointFromPixel(t,true);return this.viewportToImageCoordinates(i)},
/**
     * Convert pixel coordinates relative to the image to
     * viewer element coordinates.
     * @param {OpenSeadragon.Point} pixel
     * @returns {OpenSeadragon.Point}
     */
imageToViewerElementCoordinates:function(t){var i=this.imageToViewportCoordinates(t);return(this||e).viewport.pixelFromPoint(i,true)},
/**
     * Convert pixel coordinates relative to the window to image coordinates.
     * @param {OpenSeadragon.Point} pixel
     * @returns {OpenSeadragon.Point}
     */
windowToImageCoordinates:function(t){var i=t.minus(OpenSeadragon.getElementPosition((this||e).viewer.element));return this.viewerElementToImageCoordinates(i)},
/**
     * Convert image coordinates to pixel coordinates relative to the window.
     * @param {OpenSeadragon.Point} pixel
     * @returns {OpenSeadragon.Point}
     */
imageToWindowCoordinates:function(t){var i=this.imageToViewerElementCoordinates(t);return i.plus(OpenSeadragon.getElementPosition((this||e).viewer.element))},_viewportToTiledImageRectangle:function(i){var n=(this||e)._scaleSpring.current.value;i=i.rotate(-this.getRotation(true),this._getRotationPoint(true));return new t.Rect((i.x-(this||e)._xSpring.current.value)/n,(i.y-(this||e)._ySpring.current.value)/n,i.width/n,i.height/n,i.degrees)},
/**
     * Convert a viewport zoom to an image zoom.
     * Image zoom: ratio of the original image size to displayed image size.
     * 1 means original image size, 0.5 half size...
     * Viewport zoom: ratio of the displayed image's width to viewport's width.
     * 1 means identical width, 2 means image's width is twice the viewport's width...
     * @function
     * @param {Number} viewportZoom The viewport zoom
     * @returns {Number} imageZoom The image zoom
     */
viewportToImageZoom:function(t){var i=(this||e)._scaleSpring.current.value*(this||e).viewport._containerInnerSize.x/(this||e).source.dimensions.x;return i*t},
/**
     * Convert an image zoom to a viewport zoom.
     * Image zoom: ratio of the original image size to displayed image size.
     * 1 means original image size, 0.5 half size...
     * Viewport zoom: ratio of the displayed image's width to viewport's width.
     * 1 means identical width, 2 means image's width is twice the viewport's width...
     * Note: not accurate with multi-image.
     * @function
     * @param {Number} imageZoom The image zoom
     * @returns {Number} viewportZoom The viewport zoom
     */
imageToViewportZoom:function(t){var i=(this||e)._scaleSpring.current.value*(this||e).viewport._containerInnerSize.x/(this||e).source.dimensions.x;return t/i},
/**
     * Sets the TiledImage's position in the world.
     * @param {OpenSeadragon.Point} position - The new position, in viewport coordinates.
     * @param {Boolean} [immediately=false] - Whether to animate to the new position or snap immediately.
     * @fires OpenSeadragon.TiledImage.event:bounds-change
     */
setPosition:function(t,i){var n=(this||e)._xSpring.target.value===t.x&&(this||e)._ySpring.target.value===t.y;if(i){if(n&&(this||e)._xSpring.current.value===t.x&&(this||e)._ySpring.current.value===t.y)return;(this||e)._xSpring.resetTo(t.x);(this||e)._ySpring.resetTo(t.y);(this||e)._needsDraw=true;(this||e)._needsUpdate=true}else{if(n)return;(this||e)._xSpring.springTo(t.x);(this||e)._ySpring.springTo(t.y);(this||e)._needsDraw=true;(this||e)._needsUpdate=true}n||this._raiseBoundsChange()},
/**
     * Sets the TiledImage's width in the world, adjusting the height to match based on aspect ratio.
     * @param {Number} width - The new width, in viewport coordinates.
     * @param {Boolean} [immediately=false] - Whether to animate to the new size or snap immediately.
     * @fires OpenSeadragon.TiledImage.event:bounds-change
     */
setWidth:function(e,t){this._setScale(e,t)},
/**
     * Sets the TiledImage's height in the world, adjusting the width to match based on aspect ratio.
     * @param {Number} height - The new height, in viewport coordinates.
     * @param {Boolean} [immediately=false] - Whether to animate to the new size or snap immediately.
     * @fires OpenSeadragon.TiledImage.event:bounds-change
     */
setHeight:function(t,i){this._setScale(t/(this||e).normHeight,i)},
/**
     * Sets an array of polygons to crop the TiledImage during draw tiles.
     * The render function will use the default non-zero winding rule.
     * @param {OpenSeadragon.Point[][]} polygons - represented in an array of point object in image coordinates.
     * Example format: [
     *  [{x: 197, y:172}, {x: 226, y:172}, {x: 226, y:198}, {x: 197, y:198}], // First polygon
     *  [{x: 328, y:200}, {x: 330, y:199}, {x: 332, y:201}, {x: 329, y:202}]  // Second polygon
     *  [{x: 321, y:201}, {x: 356, y:205}, {x: 341, y:250}] // Third polygon
     * ]
     */
setCroppingPolygons:function(i){var isXYObject=function(e){return e instanceof t.Point||typeof e.x==="number"&&typeof e.y==="number"};var objectToSimpleXYObject=function(e){return e.map((function(e){try{if(isXYObject(e))return{x:e.x,y:e.y};throw new Error}catch(e){throw new Error("A Provided cropping polygon point is not supported")}}))};try{if(!t.isArray(i))throw new Error("Provided cropping polygon is not an array");(this||e)._croppingPolygons=i.map((function(e){return objectToSimpleXYObject(e)}));(this||e)._needsDraw=true}catch(e){t.console.error("[TiledImage.setCroppingPolygons] Cropping polygon format not supported");t.console.error(e);this.resetCroppingPolygons()}},resetCroppingPolygons:function(){(this||e)._croppingPolygons=null;(this||e)._needsDraw=true},
/**
     * Positions and scales the TiledImage to fit in the specified bounds.
     * Note: this method fires OpenSeadragon.TiledImage.event:bounds-change
     * twice
     * @param {OpenSeadragon.Rect} bounds The bounds to fit the image into.
     * @param {OpenSeadragon.Placement} [anchor=OpenSeadragon.Placement.CENTER]
     * How to anchor the image in the bounds.
     * @param {Boolean} [immediately=false] Whether to animate to the new size
     * or snap immediately.
     * @fires OpenSeadragon.TiledImage.event:bounds-change
     */
fitBounds:function(i,n,r){n=n||t.Placement.CENTER;var o=t.Placement.properties[n];var s=(this||e).contentAspectX;var a=0;var l=0;var h=1;var u=1;if((this||e)._clip){s=(this||e)._clip.getAspectRatio();h=(this||e)._clip.width/(this||e).source.dimensions.x;u=(this||e)._clip.height/(this||e).source.dimensions.y;if(i.getAspectRatio()>s){a=(this||e)._clip.x/(this||e)._clip.height*i.height;l=(this||e)._clip.y/(this||e)._clip.height*i.height}else{a=(this||e)._clip.x/(this||e)._clip.width*i.width;l=(this||e)._clip.y/(this||e)._clip.width*i.width}}if(i.getAspectRatio()>s){var c=i.height/u;var d=0;o.isHorizontallyCentered?d=(i.width-i.height*s)/2:o.isRight&&(d=i.width-i.height*s);this.setPosition(new t.Point(i.x-a+d,i.y-l),r);this.setHeight(c,r)}else{var p=i.width/h;var g=0;o.isVerticallyCentered?g=(i.height-i.width/s)/2:o.isBottom&&(g=i.height-i.width/s);this.setPosition(new t.Point(i.x-a,i.y-l+g),r);this.setWidth(p,r)}},
/**
     * @returns {OpenSeadragon.Rect|null} The TiledImage's current clip rectangle,
     * in image pixels, or null if none.
     */
getClip:function(){return(this||e)._clip?(this||e)._clip.clone():null},
/**
     * @param {OpenSeadragon.Rect|null} newClip - An area, in image pixels, to clip to
     * (portions of the image outside of this area will not be visible). Only works on
     * browsers that support the HTML5 canvas.
     * @fires OpenSeadragon.TiledImage.event:clip-change
     */
setClip:function(i){t.console.assert(!i||i instanceof t.Rect,"[TiledImage.setClip] newClip must be an OpenSeadragon.Rect or null");i instanceof t.Rect?(this||e)._clip=i.clone():(this||e)._clip=null;(this||e)._needsUpdate=true;(this||e)._needsDraw=true;
/**
       * Raised when the TiledImage's clip is changed.
       * @event clip-change
       * @memberOf OpenSeadragon.TiledImage
       * @type {object}
       * @property {OpenSeadragon.TiledImage} eventSource - A reference to the
       * TiledImage which raised the event.
       * @property {?Object} userData - Arbitrary subscriber-defined object.
       */this.raiseEvent("clip-change")},
/**
     * @returns {Boolean} Whether the TiledImage should be flipped before rendering.
     */
getFlip:function(){return(this||e).flipped},
/**
     * @param {Boolean} flip Whether the TiledImage should be flipped before rendering.
     * @fires OpenSeadragon.TiledImage.event:bounds-change
     */
setFlip:function(t){(this||e).flipped=t},get flipped(){return(this||e)._flipped},set flipped(t){let i=(this||e)._flipped!==!!t;(this||e)._flipped=!!t;if(i){this.update(true);(this||e)._needsDraw=true;this._raiseBoundsChange()}},get wrapHorizontal(){return(this||e)._wrapHorizontal},set wrapHorizontal(t){let i=(this||e)._wrapHorizontal!==!!t;(this||e)._wrapHorizontal=!!t;if((this||e)._initialized&&i){this.update(true);(this||e)._needsDraw=true}},get wrapVertical(){return(this||e)._wrapVertical},set wrapVertical(t){let i=(this||e)._wrapVertical!==!!t;(this||e)._wrapVertical=!!t;if((this||e)._initialized&&i){this.update(true);(this||e)._needsDraw=true}},get debugMode(){return(this||e)._debugMode},set debugMode(t){(this||e)._debugMode=!!t;(this||e)._needsDraw=true},
/**
     * @returns {Number} The TiledImage's current opacity.
     */
getOpacity:function(){return(this||e).opacity},
/**
     * @param {Number} opacity Opacity the tiled image should be drawn at.
     * @fires OpenSeadragon.TiledImage.event:opacity-change
     */
setOpacity:function(t){(this||e).opacity=t},get opacity(){return(this||e)._opacity},set opacity(t){if(t!==(this||e).opacity){(this||e)._opacity=t;(this||e)._needsDraw=true;
/**
       * Raised when the TiledImage's opacity is changed.
       * @event opacity-change
       * @memberOf OpenSeadragon.TiledImage
       * @type {object}
       * @property {Number} opacity - The new opacity value.
       * @property {OpenSeadragon.TiledImage} eventSource - A reference to the
       * TiledImage which raised the event.
       * @property {?Object} userData - Arbitrary subscriber-defined object.
       */this.raiseEvent("opacity-change",{opacity:(this||e).opacity})}},
/**
     * @returns {Boolean} whether the tiledImage can load its tiles even when it has zero opacity.
     */
getPreload:function(){return(this||e)._preload},setPreload:function(t){(this||e)._preload=!!t;(this||e)._needsDraw=true},
/**
     * Get the rotation of this tiled image in degrees.
     * @param {Boolean} [current=false] True for current rotation, false for target.
     * @returns {Number} the rotation of this tiled image in degrees.
     */
getRotation:function(t){return t?(this||e)._degreesSpring.current.value:(this||e)._degreesSpring.target.value},
/**
     * Set the current rotation of this tiled image in degrees.
     * @param {Number} degrees the rotation in degrees.
     * @param {Boolean} [immediately=false] Whether to animate to the new angle
     * or rotate immediately.
     * @fires OpenSeadragon.TiledImage.event:bounds-change
     */
setRotation:function(t,i){if((this||e)._degreesSpring.target.value!==t||!(this||e)._degreesSpring.isAtTargetValue()){i?(this||e)._degreesSpring.resetTo(t):(this||e)._degreesSpring.springTo(t);(this||e)._needsDraw=true;(this||e)._needsUpdate=true;this._raiseBoundsChange()}},
/**
     * Get the region of this tiled image that falls within the viewport.
     * @returns {OpenSeadragon.Rect} the region of this tiled image that falls within the viewport.
     * Returns false for images with opacity==0 unless preload==true
     */
getDrawArea:function(){if((this||e)._opacity===0&&!(this||e)._preload)return false;var t=this._viewportToTiledImageRectangle((this||e).viewport.getBoundsWithMargins(true));if(!(this||e).wrapHorizontal&&!(this||e).wrapVertical){var i=this._viewportToTiledImageRectangle(this.getClippedBounds(true));t=t.intersection(i)}return t},
/**
     *
     * @returns {Array} Array of Tiles that make up the current view
     */
getTilesToDraw:function(){let t=(this||e)._tilesToDraw.flat();this._updateTilesInViewport(t);t=(this||e)._tilesToDraw.flat();t.forEach((e=>{e.tile.beingDrawn=true}));(this||e)._lastDrawn=t;return t},
/**
     * Get the point around which this tiled image is rotated
     * @private
     * @param {Boolean} current True for current rotation point, false for target.
     * @returns {OpenSeadragon.Point}
     */
_getRotationPoint:function(e){return this.getBoundsNoRotate(e).getCenter()},get compositeOperation(){return(this||e)._compositeOperation},set compositeOperation(t){if(t!==(this||e)._compositeOperation){(this||e)._compositeOperation=t;(this||e)._needsDraw=true;
/**
       * Raised when the TiledImage's opacity is changed.
       * @event composite-operation-change
       * @memberOf OpenSeadragon.TiledImage
       * @type {object}
       * @property {String} compositeOperation - The new compositeOperation value.
       * @property {OpenSeadragon.TiledImage} eventSource - A reference to the
       * TiledImage which raised the event.
       * @property {?Object} userData - Arbitrary subscriber-defined object.
       */this.raiseEvent("composite-operation-change",{compositeOperation:(this||e)._compositeOperation})}},
/**
     * @returns {String} The TiledImage's current compositeOperation.
     */
getCompositeOperation:function(){return(this||e)._compositeOperation},
/**
     * @param {String} compositeOperation the tiled image should be drawn with this globalCompositeOperation.
     * @fires OpenSeadragon.TiledImage.event:composite-operation-change
     */
setCompositeOperation:function(t){(this||e).compositeOperation=t},
/**
     * Update headers to include when making AJAX requests.
     *
     * Unless `propagate` is set to false (which is likely only useful in rare circumstances),
     * the updated headers are propagated to all tiles and queued image loader jobs.
     *
     * Note that the rules for merging headers still apply, i.e. headers returned by
     * {@link OpenSeadragon.TileSource#getTileAjaxHeaders} take precedence over
     * the headers here in the tiled image (`TiledImage.ajaxHeaders`).
     *
     * @function
     * @param {Object} ajaxHeaders Updated AJAX headers, which will be merged over any headers specified in {@link OpenSeadragon.Options}.
     * @param {Boolean} [propagate=true] Whether to propagate updated headers to existing tiles and queued image loader jobs.
     */
setAjaxHeaders:function(i,n){i===null&&(i={});if(t.isPlainObject(i)){(this||e)._ownAjaxHeaders=i;this._updateAjaxHeaders(n)}else console.error("[TiledImage.setAjaxHeaders] Ignoring invalid headers, must be a plain object")},
/**
     * Update headers to include when making AJAX requests.
     *
     * This function has the same effect as calling {@link OpenSeadragon.TiledImage#setAjaxHeaders},
     * except that the headers for this tiled image do not change. This is especially useful
     * for propagating updated headers from {@link OpenSeadragon.TileSource#getTileAjaxHeaders}
     * to existing tiles.
     *
     * @private
     * @function
     * @param {Boolean} [propagate=true] Whether to propagate updated headers to existing tiles and queued image loader jobs.
     */
_updateAjaxHeaders:function(i){i===void 0&&(i=true);t.isPlainObject((this||e).viewer.ajaxHeaders)?(this||e).ajaxHeaders=t.extend({},(this||e).viewer.ajaxHeaders,(this||e)._ownAjaxHeaders):(this||e).ajaxHeaders=(this||e)._ownAjaxHeaders;if(i){var n,r,o,s;for(var a in(this||e).tilesMatrix){n=(this||e).source.getNumTiles(a);for(var l in(this||e).tilesMatrix[a]){r=(n.x+l%n.x)%n.x;for(var h in(this||e).tilesMatrix[a][l]){o=(n.y+h%n.y)%n.y;s=(this||e).tilesMatrix[a][l][h];s.loadWithAjax=(this||e).loadTilesWithAjax;if(s.loadWithAjax){var u=(this||e).source.getTileAjaxHeaders(a,r,o);s.ajaxHeaders=t.extend({},(this||e).ajaxHeaders,u)}else s.ajaxHeaders=null}}}for(var c=0;c<(this||e)._imageLoader.jobQueue.length;c++){var d=(this||e)._imageLoader.jobQueue[c];d.loadWithAjax=d.tile.loadWithAjax;d.ajaxHeaders=d.tile.loadWithAjax?d.tile.ajaxHeaders:null}}},_setScale:function(t,i){var n=(this||e)._scaleSpring.target.value===t;if(i){if(n&&(this||e)._scaleSpring.current.value===t)return;(this||e)._scaleSpring.resetTo(t);this._updateForScale();(this||e)._needsDraw=true;(this||e)._needsUpdate=true}else{if(n)return;(this||e)._scaleSpring.springTo(t);this._updateForScale();(this||e)._needsDraw=true;(this||e)._needsUpdate=true}n||this._raiseBoundsChange()},_updateForScale:function(){(this||e)._worldWidthTarget=(this||e)._scaleSpring.target.value;(this||e)._worldHeightTarget=(this||e).normHeight*(this||e)._scaleSpring.target.value;(this||e)._worldWidthCurrent=(this||e)._scaleSpring.current.value;(this||e)._worldHeightCurrent=(this||e).normHeight*(this||e)._scaleSpring.current.value},_raiseBoundsChange:function(){
/**
       * Raised when the TiledImage's bounds are changed.
       * Note that this event is triggered only when the animation target is changed;
       * not for every frame of animation.
       * @event bounds-change
       * @memberOf OpenSeadragon.TiledImage
       * @type {object}
       * @property {OpenSeadragon.TiledImage} eventSource - A reference to the
       * TiledImage which raised the event.
       * @property {?Object} userData - Arbitrary subscriber-defined object.
       */
this.raiseEvent("bounds-change")},_isBottomItem:function(){return(this||e).viewer.world.getItemAt(0)===(this||e)},_getLevelsInterval:function(){var t=Math.max((this||e).source.minLevel,Math.floor(Math.log((this||e).minZoomImageRatio)/Math.log(2)));var i=(this||e).viewport.deltaPixelsFromPointsNoRotate((this||e).source.getPixelRatio(0),true).x*(this||e)._scaleSpring.current.value;var n=Math.min(Math.abs((this||e).source.maxLevel),Math.abs(Math.floor(Math.log(i/(this||e).minPixelRatio)/Math.log(2))));n=Math.max(n,(this||e).source.minLevel||0);t=Math.min(t,n);return{lowestLevel:t,highestLevel:n}},_updateLevelsForViewport:function(){var i=this._getLevelsInterval();var n=i.lowestLevel;var r=i.highestLevel;var o=[];var s=this.getDrawArea();var a=t.now();(this||e)._lastDrawn.forEach((e=>{e.tile.beingDrawn=false}));(this||e)._tilesToDraw=[];(this||e)._tilesLoading=0;(this||e).loadingCoverage={};if(!s){(this||e)._needsDraw=false;return(this||e)._fullyLoaded}var l=new Array(r-n+1);for(let e=0,t=r;t>=n;t--,e++)l[e]=t;for(let t=r+1;t<=(this||e).source.maxLevel;t++){var h=(this||e).tilesMatrix[t]&&(this||e).tilesMatrix[t][0]&&(this||e).tilesMatrix[t][0][0];if(h&&h.isBottomMost&&h.isRightMost&&h.loaded){l.push(t);break}}let u=false;for(let t=0;t<l.length;t++){let i=l[t];var c=(this||e).viewport.deltaPixelsFromPointsNoRotate((this||e).source.getPixelRatio(i),true).x*(this||e)._scaleSpring.current.value;if(t===l.length-1||c>=(this||e).minPixelRatio)u=true;else if(!u)continue;var d=(this||e).viewport.deltaPixelsFromPointsNoRotate((this||e).source.getPixelRatio(i),false).x*(this||e)._scaleSpring.current.value;var p=(this||e).viewport.deltaPixelsFromPointsNoRotate((this||e).source.getPixelRatio(Math.max((this||e).source.getClosestLevel(),0)),false).x*(this||e)._scaleSpring.current.value;var g=(this||e).immediateRender?1:p;var v=Math.min(1,(c-.5)/.5);var m=g/Math.abs(g-d);var f=this._updateLevel(i,v,m,s,a,o);o=f.bestTiles;var y=f.updatedTiles.filter((e=>e.loaded));var w=function(e,t,i){return function(n){return{tile:n,level:e,levelOpacity:t,currentTime:i}}}(i,v,a);(this||e)._tilesToDraw[i]=y.map(w);if(this._providesCoverage((this||e).coverage,i))break}if(o&&o.length>0){o.forEach((function(e){e&&!e.context2D&&this._loadTile(e,a)}),this||e);(this||e)._needsDraw=true;return false}return(this||e)._tilesLoading===0},_updateTilesInViewport:function(i){let n=t.now();let r=this||e;(this||e)._tilesLoading=0;(this||e)._wasBlending=(this||e)._isBlending;(this||e)._isBlending=false;(this||e).loadingCoverage={};let o=i.length?i[0].level:0;let s=this.getDrawArea();if(!s)return;function updateTile(e){let t=e.tile;if(t&&t.loaded){let i=r._blendTile(t,t.x,t.y,e.level,e.levelOpacity,n,o);r._isBlending=r._isBlending||i;r._needsDraw=r._needsDraw||i||r._wasBlending}}let a=0;for(let t=0;t<i.length;t++){let n=i[t];updateTile(n);this._providesCoverage((this||e).coverage,n.level)&&(a=Math.max(a,n.level))}if(a>0)for(let t in(this||e)._tilesToDraw)t<a&&delete(this||e)._tilesToDraw[t]},
/**
     * Updates the opacity of a tile according to the time it has been on screen
     * to perform a fade-in.
     * Updates coverage once a tile is fully opaque.
     * Returns whether the fade-in has completed.
     * @private
     *
     * @param {OpenSeadragon.Tile} tile
     * @param {Number} x
     * @param {Number} y
     * @param {Number} level
     * @param {Number} levelOpacity
     * @param {Number} currentTime
     * @param {Boolean} lowestLevel
     * @returns {Boolean} true if blending did not yet finish
     */
_blendTile:function(t,i,n,r,o,s,a){let l,h,u=1e3*(this||e).blendTime;t.blendStart||(t.blendStart=s);l=s-t.blendStart;h=u?Math.min(1,l/u):1;if(r===a){h=1;l=u}(this||e).alwaysBlend&&(h*=o);t.opacity=h;if(h===1){this._setCoverage((this||e).coverage,r,i,n,true);(this||e)._hasOpaqueTile=true}return l<u},
/**
     * Updates all tiles at a given resolution level.
     * @private
     * @param {Number} level
     * @param {Number} levelOpacity
     * @param {Number} levelVisibility
     * @param {OpenSeadragon.Rect} drawArea
     * @param {Number} currentTime
     * @param {OpenSeadragon.Tile[]} best Array of the current best tiles
     * @returns {Object} Dictionary {bestTiles: OpenSeadragon.Tile - the current "best" tiles to draw, updatedTiles: OpenSeadragon.Tile) - the updated tiles}.
     */
_updateLevel:function(t,i,n,r,o,s){var a=r.getBoundingBox().getTopLeft();var l=r.getBoundingBox().getBottomRight();(this||e).viewer&&
/**
         * <em>- Needs documentation -</em>
         *
         * @event update-level
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
         * @property {OpenSeadragon.TiledImage} tiledImage - Which TiledImage is being drawn.
         * @property {Object} havedrawn - deprecated, always true (kept for backwards compatibility)
         * @property {Object} level
         * @property {Object} opacity
         * @property {Object} visibility
         * @property {OpenSeadragon.Rect} drawArea
         * @property {Object} topleft deprecated, use drawArea instead
         * @property {Object} bottomright deprecated, use drawArea instead
         * @property {Object} currenttime
         * @property {Object[]} best
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
(this||e).viewer.raiseEvent("update-level",{tiledImage:this||e,havedrawn:true,level:t,opacity:i,visibility:n,drawArea:r,topleft:a,bottomright:l,currenttime:o,best:s});this._resetCoverage((this||e).coverage,t);this._resetCoverage((this||e).loadingCoverage,t);var h=this._getCornerTiles(t,a,l);var u=h.topLeft;var c=h.bottomRight;var d=(this||e).source.getNumTiles(t);var p=(this||e).viewport.pixelFromPoint((this||e).viewport.getCenter());if(this.getFlip()){c.x+=1;(this||e).wrapHorizontal||(c.x=Math.min(c.x,d.x-1))}var g=Math.max(0,(c.x-u.x)*(c.y-u.y));var v=new Array(g);var m=0;for(var f=u.x;f<=c.x;f++)for(var y=u.y;y<=c.y;y++){var w;if(this.getFlip()){var T=(d.x+f%d.x)%d.x;w=f+d.x-T-T-1}else w=f;if(r.intersection(this.getTileBounds(t,w,y))!==null){var x=this._updateTile(w,y,t,n,p,d,o,s);s=x.bestTiles;v[m]=x.tile;m+=1}}return{bestTiles:s,updatedTiles:v}},
/**
     * @private
     * @param {OpenSeadragon.Tile} tile
     * @param {Boolean} overlap
     * @param {OpenSeadragon.Viewport} viewport
     * @param {OpenSeadragon.Point} viewportCenter
     * @param {Number} levelVisibility
     */
_positionTile:function(i,n,r,o,s){var a=i.bounds.getTopLeft();a.x*=(this||e)._scaleSpring.current.value;a.y*=(this||e)._scaleSpring.current.value;a.x+=(this||e)._xSpring.current.value;a.y+=(this||e)._ySpring.current.value;var l=i.bounds.getSize();l.x*=(this||e)._scaleSpring.current.value;l.y*=(this||e)._scaleSpring.current.value;i.positionedBounds.x=a.x;i.positionedBounds.y=a.y;i.positionedBounds.width=l.x;i.positionedBounds.height=l.y;var h=r.pixelFromPointNoRotate(a,true),u=r.pixelFromPointNoRotate(a,false),c=r.deltaPixelsFromPointsNoRotate(l,true),d=r.deltaPixelsFromPointsNoRotate(l,false),p=u.plus(d.divide(2)),g=o.squaredDistanceTo(p);if((this||e).viewer.drawer.minimumOverlapRequired(this||e)){n||(c=c.plus(new t.Point(1,1)));i.isRightMost&&(this||e).wrapHorizontal&&(c.x+=.75);i.isBottomMost&&(this||e).wrapVertical&&(c.y+=.75)}i.position=h;i.size=c;i.squaredDistance=g;i.visibility=s},
/**
     * Update a single tile at a particular resolution level.
     * @private
     * @param {Number} x
     * @param {Number} y
     * @param {Number} level
     * @param {Number} levelVisibility
     * @param {OpenSeadragon.Point} viewportCenter
     * @param {Number} numberOfTiles
     * @param {Number} currentTime
     * @param {OpenSeadragon.Tile} best - The current "best" tile to draw.
     * @returns {Object} Dictionary {bestTiles: OpenSeadragon.Tile[] - the current best tiles, tile: OpenSeadragon.Tile the current tile}
     */
_updateTile:function(t,i,n,r,o,s,a,l){var h=this._getTile(t,i,n,a,s);(this||e).viewer&&
/**
         * <em>- Needs documentation -</em>
         *
         * @event update-tile
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
         * @property {OpenSeadragon.TiledImage} tiledImage - Which TiledImage is being drawn.
         * @property {OpenSeadragon.Tile} tile
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
(this||e).viewer.raiseEvent("update-tile",{tiledImage:this||e,tile:h});this._setCoverage((this||e).coverage,n,t,i,false);var u=h.loaded||h.loading||this._isCovered((this||e).loadingCoverage,n,t,i);this._setCoverage((this||e).loadingCoverage,n,t,i,u);if(!h.exists)return{bestTiles:l,tile:h};h.loaded&&h.opacity===1&&this._setCoverage((this||e).coverage,n,t,i,true);this._positionTile(h,(this||e).source.tileOverlap,(this||e).viewport,o,r);if(!h.loaded)if(h.context2D)this._setTileLoaded(h);else{var c=(this||e)._tileCache.getImageRecord(h.cacheKey);c&&this._setTileLoaded(h,c.getData())}h.loading?(this||e)._tilesLoading++:u||(l=this._compareTiles(l,h,(this||e).maxTilesPerFrame));return{bestTiles:l,tile:h}},_getCornerTiles:function(i,n,r){var o;var s;if((this||e).wrapHorizontal){o=t.positiveModulo(n.x,1);s=t.positiveModulo(r.x,1)}else{o=Math.max(0,n.x);s=Math.min(1,r.x)}var a;var l;var h=1/(this||e).source.aspectRatio;if((this||e).wrapVertical){a=t.positiveModulo(n.y,h);l=t.positiveModulo(r.y,h)}else{a=Math.max(0,n.y);l=Math.min(h,r.y)}var u=(this||e).source.getTileAtPoint(i,new t.Point(o,a));var c=(this||e).source.getTileAtPoint(i,new t.Point(s,l));var d=(this||e).source.getNumTiles(i);if((this||e).wrapHorizontal){u.x+=d.x*Math.floor(n.x);c.x+=d.x*Math.floor(r.x)}if((this||e).wrapVertical){u.y+=d.y*Math.floor(n.y/h);c.y+=d.y*Math.floor(r.y/h)}return{topLeft:u,bottomRight:c}},
/**
     * Obtains a tile at the given location.
     * @private
     * @param {Number} x
     * @param {Number} y
     * @param {Number} level
     * @param {Number} time
     * @param {Number} numTiles
     * @returns {OpenSeadragon.Tile}
     */
_getTile:function(i,n,r,o,s){var a,l,h,u,c,d,p,g,v,m,f=(this||e).tilesMatrix,y=(this||e).source;f[r]||(f[r]={});f[r][i]||(f[r][i]={});if(!f[r][i][n]||!f[r][i][n].flipped!==!(this||e).flipped){a=(s.x+i%s.x)%s.x;l=(s.y+n%s.y)%s.y;h=this.getTileBounds(r,i,n);u=y.getTileBounds(r,a,l,true);c=y.tileExists(r,a,l);d=y.getTileUrl(r,a,l);p=y.getTilePostData(r,a,l);if((this||e).loadTilesWithAjax){g=y.getTileAjaxHeaders(r,a,l);t.isPlainObject((this||e).ajaxHeaders)&&(g=t.extend({},(this||e).ajaxHeaders,g))}else g=null;v=y.getContext2D?y.getContext2D(r,a,l):void 0;m=new t.Tile(r,i,n,h,c,d,v,(this||e).loadTilesWithAjax,g,u,p,y.getTileHashKey(r,a,l,d,g,p));this.getFlip()?a===0&&(m.isRightMost=true):a===s.x-1&&(m.isRightMost=true);l===s.y-1&&(m.isBottomMost=true);m.flipped=(this||e).flipped;f[r][i][n]=m}m=f[r][i][n];m.lastTouchTime=o;return m},
/**
     * Dispatch a job to the ImageLoader to load the Image for a Tile.
     * @private
     * @param {OpenSeadragon.Tile} tile
     * @param {Number} time
     */
_loadTile:function(t,i){var n=this||e;t.loading=true;(this||e)._imageLoader.addJob({src:t.getUrl(),tile:t,source:(this||e).source,postData:t.postData,loadWithAjax:t.loadWithAjax,ajaxHeaders:t.ajaxHeaders,crossOriginPolicy:(this||e).crossOriginPolicy,ajaxWithCredentials:(this||e).ajaxWithCredentials,callback:function(e,r,o){n._onTileLoad(t,i,e,r,o)},abort:function(){t.loading=false}})},
/**
     * Callback fired when a Tile's Image finished downloading.
     * @private
     * @param {OpenSeadragon.Tile} tile
     * @param {Number} time
     * @param {*} data image data
     * @param {String} errorMsg
     * @param {XMLHttpRequest} tileRequest
     */
_onTileLoad:function(i,n,r,o,s){if(r){i.exists=true;if(n<(this||e).lastResetTime){t.console.warn("Ignoring tile %s loaded before reset: %s",i,i.getUrl());i.loading=false}else{var a=this||e,finish=function(){var e=a.source;var t=e.getClosestLevel();a._setTileLoaded(i,r,t,s)};finish()}}else{t.console.error("Tile %s failed to load: %s - error: %s",i,i.getUrl(),o);
/**
         * Triggered when a tile fails to load.
         *
         * @event tile-load-failed
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Tile} tile - The tile that failed to load.
         * @property {OpenSeadragon.TiledImage} tiledImage - The tiled image the tile belongs to.
         * @property {number} time - The time in milliseconds when the tile load began.
         * @property {string} message - The error message.
         * @property {XMLHttpRequest} tileRequest - The XMLHttpRequest used to load the tile if available.
         */(this||e).viewer.raiseEvent("tile-load-failed",{tile:i,tiledImage:this||e,time:n,message:o,tileRequest:s});i.loading=false;i.exists=false}},
/**
     * @private
     * @param {OpenSeadragon.Tile} tile
     * @param {*} data image data, the data sent to ImageJob.prototype.finish(), by default an Image object
     * @param {Number|undefined} cutoff
     * @param {XMLHttpRequest|undefined} tileRequest
     */
_setTileLoaded:function(i,n,r,o){var s=0,a=false,l=this||e;function getCompletionCallback(){a&&t.console.error("Event 'tile-loaded' argument getCompletionCallback must be called synchronously. Its return value should be called asynchronously.");s++;return completionCallback}function completionCallback(){s--;if(s===0){i.loading=false;i.loaded=true;i.hasTransparency=l.source.hasTransparency(i.context2D,i.getUrl(),i.ajaxHeaders,i.postData);i.context2D||l._tileCache.cacheTile({data:n,tile:i,cutoff:r,tiledImage:l})
/**
           * Triggered when a tile is loaded and pre-processing is compelete,
           * and the tile is ready to draw.
           *
           * @event tile-ready
           * @memberof OpenSeadragon.Viewer
           * @type {object}
           * @property {OpenSeadragon.Tile} tile - The tile which has been loaded.
           * @property {OpenSeadragon.TiledImage} tiledImage - The tiled image of the loaded tile.
           * @property {XMLHttpRequest} tileRequest - The AJAX request that loaded this tile (if applicable).
           * @private
           */;l.viewer.raiseEvent("tile-ready",{tile:i,tiledImage:l,tileRequest:o});l._needsDraw=true}}
/**
       * Triggered when a tile has just been loaded in memory. That means that the
       * image has been downloaded and can be modified before being drawn to the canvas.
       *
       * @event tile-loaded
       * @memberof OpenSeadragon.Viewer
       * @type {object}
       * @property {Image|*} image - The image (data) of the tile. Deprecated.
       * @property {*} data image data, the data sent to ImageJob.prototype.finish(), by default an Image object
       * @property {OpenSeadragon.TiledImage} tiledImage - The tiled image of the loaded tile.
       * @property {OpenSeadragon.Tile} tile - The tile which has been loaded.
       * @property {XMLHttpRequest} tileRequest - The AJAX request that loaded this tile (if applicable).
       * @property {function} getCompletionCallback - A function giving a callback to call
       * when the asynchronous processing of the image is done. The image will be
       * marked as entirely loaded when the callback has been called once for each
       * call to getCompletionCallback.
       */var h=getCompletionCallback();(this||e).viewer.raiseEvent("tile-loaded",{tile:i,tiledImage:this||e,tileRequest:o,get image(){t.console.error("[tile-loaded] event 'image' has been deprecated. Use 'data' property instead.");return n},data:n,getCompletionCallback:getCompletionCallback});a=true;h()},
/**
     * Determines the 'best tiles' from the given 'last best' tiles and the
     * tile in question.
     * @private
     *
     * @param {OpenSeadragon.Tile[]} previousBest The best tiles so far.
     * @param {OpenSeadragon.Tile} tile The new tile to consider.
     * @param {Number} maxNTiles The max number of best tiles.
     * @returns {OpenSeadragon.Tile[]} The new best tiles.
     */
_compareTiles:function(e,t,i){if(!e)return[t];e.push(t);this._sortTiles(e);e.length>i&&e.pop();return e},
/**
     * Sorts tiles in an array according to distance and visibility.
     * @private
     *
     * @param {OpenSeadragon.Tile[]} tiles The tiles.
     */
_sortTiles:function(e){e.sort((function(e,t){return e===null?1:t===null?-1:e.visibility===t.visibility?e.squaredDistance-t.squaredDistance:t.visibility-e.visibility}))},
/**
     * Returns true if the given tile provides coverage to lower-level tiles of
     * lower resolution representing the same content. If neither x nor y is
     * given, returns true if the entire visible level provides coverage.
     *
     * Note that out-of-bounds tiles provide coverage in this sense, since
     * there's no content that they would need to cover. Tiles at non-existent
     * levels that are within the image bounds, however, do not.
     * @private
     *
     * @param {Object} coverage - A '3d' dictionary [level][x][y] --> Boolean.
     * @param {Number} level - The resolution level of the tile.
     * @param {Number} x - The X position of the tile.
     * @param {Number} y - The Y position of the tile.
     * @returns {Boolean}
     */
_providesCoverage:function(e,t,i,n){var r,o,s,a;if(!e[t])return false;if(i===void 0||n===void 0){r=e[t];for(s in r)if(Object.prototype.hasOwnProperty.call(r,s)){o=r[s];for(a in o)if(Object.prototype.hasOwnProperty.call(o,a)&&!o[a])return false}return true}return e[t][i]===void 0||e[t][i][n]===void 0||e[t][i][n]===true},
/**
     * Returns true if the given tile is completely covered by higher-level
     * tiles of higher resolution representing the same content. If neither x
     * nor y is given, returns true if the entire visible level is covered.
     * @private
     *
     * @param {Object} coverage - A '3d' dictionary [level][x][y] --> Boolean.
     * @param {Number} level - The resolution level of the tile.
     * @param {Number} x - The X position of the tile.
     * @param {Number} y - The Y position of the tile.
     * @returns {Boolean}
     */
_isCovered:function(e,t,i,n){return i===void 0||n===void 0?this._providesCoverage(e,t+1):this._providesCoverage(e,t+1,2*i,2*n)&&this._providesCoverage(e,t+1,2*i,2*n+1)&&this._providesCoverage(e,t+1,2*i+1,2*n)&&this._providesCoverage(e,t+1,2*i+1,2*n+1)},
/**
     * Sets whether the given tile provides coverage or not.
     * @private
     *
     * @param {Object} coverage - A '3d' dictionary [level][x][y] --> Boolean.
     * @param {Number} level - The resolution level of the tile.
     * @param {Number} x - The X position of the tile.
     * @param {Number} y - The Y position of the tile.
     * @param {Boolean} covers - Whether the tile provides coverage.
     */
_setCoverage:function(e,i,n,r,o){if(e[i]){e[i][n]||(e[i][n]={});e[i][n][r]=o}else t.console.warn("Setting coverage for a tile before its level's coverage has been reset: %s",i)},
/**
     * Resets coverage information for the given level. This should be called
     * after every draw routine. Note that at the beginning of the next draw
     * routine, coverage for every visible tile should be explicitly set.
     * @private
     *
     * @param {Object} coverage - A '3d' dictionary [level][x][y] --> Boolean.
     * @param {Number} level - The resolution level of tiles to completely reset.
     */
_resetCoverage:function(e,t){e[t]={}}})})(OpenSeadragon);(function(t){var TileRecord=function(i){t.console.assert(i,"[TileCache.cacheTile] options is required");t.console.assert(i.tile,"[TileCache.cacheTile] options.tile is required");t.console.assert(i.tiledImage,"[TileCache.cacheTile] options.tiledImage is required");(this||e).tile=i.tile;(this||e).tiledImage=i.tiledImage};var ImageRecord=function(i){t.console.assert(i,"[ImageRecord] options is required");t.console.assert(i.data,"[ImageRecord] options.data is required");(this||e)._tiles=[];i.create.apply(null,[this||e,i.data,i.ownerTile]);(this||e)._destroyImplementation=i.destroy.bind(null,this||e);(this||e).getImage=i.getImage.bind(null,this||e);(this||e).getData=i.getData.bind(null,this||e);(this||e).getRenderedContext=i.getRenderedContext.bind(null,this||e)};ImageRecord.prototype={destroy:function(){this._destroyImplementation();(this||e)._tiles=null},addTile:function(i){t.console.assert(i,"[ImageRecord.addTile] tile is required");(this||e)._tiles.push(i)},removeTile:function(i){for(var n=0;n<(this||e)._tiles.length;n++)if((this||e)._tiles[n]===i){(this||e)._tiles.splice(n,1);return}t.console.warn("[ImageRecord.removeTile] trying to remove unknown tile",i)},getTileCount:function(){return(this||e)._tiles.length}};
/**
   * @class TileCache
   * @memberof OpenSeadragon
   * @classdesc Stores all the tiles displayed in a {@link OpenSeadragon.Viewer}.
   * You generally won't have to interact with the TileCache directly.
   * @param {Object} options - Configuration for this TileCache.
   * @param {Number} [options.maxImageCacheCount] - See maxImageCacheCount in
   * {@link OpenSeadragon.Options} for details.
   */t.TileCache=function(i){i=i||{};(this||e)._maxImageCacheCount=i.maxImageCacheCount||t.DEFAULT_SETTINGS.maxImageCacheCount;(this||e)._tilesLoaded=[];(this||e)._imagesLoaded=[];(this||e)._imagesLoadedCount=0};t.TileCache.prototype={
/**
     * @returns {Number} The total number of tiles that have been loaded by
     * this TileCache.
     */
numTilesLoaded:function(){return(this||e)._tilesLoaded.length},
/**
     * Caches the specified tile, removing an old tile if necessary to stay under the
     * maxImageCacheCount specified on construction. Note that if multiple tiles reference
     * the same image, there may be more tiles than maxImageCacheCount; the goal is to keep
     * the number of images below that number. Note, as well, that even the number of images
     * may temporarily surpass that number, but should eventually come back down to the max specified.
     * @param {Object} options - Tile info.
     * @param {OpenSeadragon.Tile} options.tile - The tile to cache.
     * @param {String} options.tile.cacheKey - The unique key used to identify this tile in the cache.
     * @param {Image} options.image - The image of the tile to cache.
     * @param {OpenSeadragon.TiledImage} options.tiledImage - The TiledImage that owns that tile.
     * @param {Number} [options.cutoff=0] - If adding this tile goes over the cache max count, this
     * function will release an old tile. The cutoff option specifies a tile level at or below which
     * tiles will not be released.
     */
cacheTile:function(i){t.console.assert(i,"[TileCache.cacheTile] options is required");t.console.assert(i.tile,"[TileCache.cacheTile] options.tile is required");t.console.assert(i.tile.cacheKey,"[TileCache.cacheTile] options.tile.cacheKey is required");t.console.assert(i.tiledImage,"[TileCache.cacheTile] options.tiledImage is required");var n=i.cutoff||0;var r=(this||e)._tilesLoaded.length;var o=(this||e)._imagesLoaded[i.tile.cacheKey];if(!o){if(!i.data){t.console.error("[TileCache.cacheTile] options.image was renamed to options.data. '.image' attribute has been deprecated and will be removed in the future.");i.data=i.image}t.console.assert(i.data,"[TileCache.cacheTile] options.data is required to create an ImageRecord");o=(this||e)._imagesLoaded[i.tile.cacheKey]=new ImageRecord({data:i.data,ownerTile:i.tile,create:i.tiledImage.source.createTileCache,destroy:i.tiledImage.source.destroyTileCache,getImage:i.tiledImage.source.getTileCacheDataAsImage,getData:i.tiledImage.source.getTileCacheData,getRenderedContext:i.tiledImage.source.getTileCacheDataAsContext2D});(this||e)._imagesLoadedCount++}o.addTile(i.tile);i.tile.cacheImageRecord=o;if((this||e)._imagesLoadedCount>(this||e)._maxImageCacheCount){var s=null;var a=-1;var l=null;var h,u,c,d,p,g;for(var v=(this||e)._tilesLoaded.length-1;v>=0;v--){g=(this||e)._tilesLoaded[v];h=g.tile;if(!(h.level<=n||h.beingDrawn))if(s){d=h.lastTouchTime;u=s.lastTouchTime;p=h.level;c=s.level;if(d<u||d===u&&p>c){s=h;a=v;l=g}}else{s=h;a=v;l=g}}if(s&&a>=0){this._unloadTile(l);r=a}}(this||e)._tilesLoaded[r]=new TileRecord({tile:i.tile,tiledImage:i.tiledImage})},
/**
     * Clears all tiles associated with the specified tiledImage.
     * @param {OpenSeadragon.TiledImage} tiledImage
     */
clearTilesFor:function(i){t.console.assert(i,"[TileCache.clearTilesFor] tiledImage is required");var n;for(var r=0;r<(this||e)._tilesLoaded.length;++r){n=(this||e)._tilesLoaded[r];if(n.tiledImage===i){this._unloadTile(n);(this||e)._tilesLoaded.splice(r,1);r--}}},getImageRecord:function(i){t.console.assert(i,"[TileCache.getImageRecord] cacheKey is required");return(this||e)._imagesLoaded[i]},_unloadTile:function(i){t.console.assert(i,"[TileCache._unloadTile] tileRecord is required");var n=i.tile;var r=i.tiledImage;let o=n.getCanvasContext&&n.getCanvasContext();n.unload();n.cacheImageRecord=null;var s=(this||e)._imagesLoaded[n.cacheKey];if(s){s.removeTile(n);if(!s.getTileCount()){s.destroy();delete(this||e)._imagesLoaded[n.cacheKey];(this||e)._imagesLoadedCount--;if(o){o.canvas.width=0;o.canvas.height=0;
/**
           * Triggered when an image has just been unloaded
           *
           * @event image-unloaded
           * @memberof OpenSeadragon.Viewer
           * @type {object}
           * @property {CanvasRenderingContext2D} context2D - The context that is being unloaded
           * @private
           */r.viewer.raiseEvent("image-unloaded",{context2D:o,tile:n})}}
/**
       * Triggered when a tile has just been unloaded from the cache.
       *
       * @event tile-unloaded
       * @memberof OpenSeadragon.Viewer
       * @type {object}
       * @property {OpenSeadragon.TiledImage} tiledImage - The tiled image of the unloaded tile.
       * @property {OpenSeadragon.Tile} tile - The tile which has been unloaded.
       */r.viewer.raiseEvent("tile-unloaded",{tile:n,tiledImage:r})}}}})(OpenSeadragon);(function(t){
/**
   * @class World
   * @memberof OpenSeadragon
   * @extends OpenSeadragon.EventSource
   * @classdesc Keeps track of all of the tiled images in the scene.
   * @param {Object} options - World options.
   * @param {OpenSeadragon.Viewer} options.viewer - The Viewer that owns this World.
   **/
t.World=function(i){var n=this||e;t.console.assert(i.viewer,"[World] options.viewer is required");t.EventSource.call(this||e);(this||e).viewer=i.viewer;(this||e)._items=[];(this||e)._needsDraw=false;(this||e)._autoRefigureSizes=true;(this||e)._needsSizesFigured=false;(this||e)._delegatedFigureSizes=function(e){n._autoRefigureSizes?n._figureSizes():n._needsSizesFigured=true};this._figureSizes()};t.extend(t.World.prototype,t.EventSource.prototype,{
/**
     * Add the specified item.
     * @param {OpenSeadragon.TiledImage} item - The item to add.
     * @param {Number} [options.index] - Index for the item. If not specified, goes at the top.
     * @fires OpenSeadragon.World.event:add-item
     * @fires OpenSeadragon.World.event:metrics-change
     */
addItem:function(i,n){t.console.assert(i,"[World.addItem] item is required");t.console.assert(i instanceof t.TiledImage,"[World.addItem] only TiledImages supported at this time");n=n||{};if(n.index!==void 0){var r=Math.max(0,Math.min((this||e)._items.length,n.index));(this||e)._items.splice(r,0,i)}else(this||e)._items.push(i);(this||e)._autoRefigureSizes?this._figureSizes():(this||e)._needsSizesFigured=true;(this||e)._needsDraw=true;i.addHandler("bounds-change",(this||e)._delegatedFigureSizes);i.addHandler("clip-change",(this||e)._delegatedFigureSizes);
/**
       * Raised when an item is added to the World.
       * @event add-item
       * @memberOf OpenSeadragon.World
       * @type {object}
       * @property {OpenSeadragon.Viewer} eventSource - A reference to the World which raised the event.
       * @property {OpenSeadragon.TiledImage} item - The item that has been added.
       * @property {?Object} userData - Arbitrary subscriber-defined object.
       */this.raiseEvent("add-item",{item:i})},
/**
     * Get the item at the specified index.
     * @param {Number} index - The item's index.
     * @returns {OpenSeadragon.TiledImage} The item at the specified index.
     */
getItemAt:function(i){t.console.assert(i!==void 0,"[World.getItemAt] index is required");return(this||e)._items[i]},
/**
     * Get the index of the given item or -1 if not present.
     * @param {OpenSeadragon.TiledImage} item - The item.
     * @returns {Number} The index of the item or -1 if not present.
     */
getIndexOfItem:function(i){t.console.assert(i,"[World.getIndexOfItem] item is required");return t.indexOf((this||e)._items,i)},
/**
     * @returns {Number} The number of items used.
     */
getItemCount:function(){return(this||e)._items.length},
/**
     * Change the index of a item so that it appears over or under others.
     * @param {OpenSeadragon.TiledImage} item - The item to move.
     * @param {Number} index - The new index.
     * @fires OpenSeadragon.World.event:item-index-change
     */
setItemIndex:function(i,n){t.console.assert(i,"[World.setItemIndex] item is required");t.console.assert(n!==void 0,"[World.setItemIndex] index is required");var r=this.getIndexOfItem(i);if(n>=(this||e)._items.length)throw new Error("Index bigger than number of layers.");if(n!==r&&r!==-1){(this||e)._items.splice(r,1);(this||e)._items.splice(n,0,i);(this||e)._needsDraw=true;
/**
       * Raised when the order of the indexes has been changed.
       * @event item-index-change
       * @memberOf OpenSeadragon.World
       * @type {object}
       * @property {OpenSeadragon.World} eventSource - A reference to the World which raised the event.
       * @property {OpenSeadragon.TiledImage} item - The item whose index has
       * been changed
       * @property {Number} previousIndex - The previous index of the item
       * @property {Number} newIndex - The new index of the item
       * @property {?Object} userData - Arbitrary subscriber-defined object.
       */this.raiseEvent("item-index-change",{item:i,previousIndex:r,newIndex:n})}},
/**
     * Remove an item.
     * @param {OpenSeadragon.TiledImage} item - The item to remove.
     * @fires OpenSeadragon.World.event:remove-item
     * @fires OpenSeadragon.World.event:metrics-change
     */
removeItem:function(i){t.console.assert(i,"[World.removeItem] item is required");var n=t.indexOf((this||e)._items,i);if(n!==-1){i.removeHandler("bounds-change",(this||e)._delegatedFigureSizes);i.removeHandler("clip-change",(this||e)._delegatedFigureSizes);i.destroy();(this||e)._items.splice(n,1);this._figureSizes();(this||e)._needsDraw=true;this._raiseRemoveItem(i)}},removeAll:function(){(this||e).viewer._cancelPendingImages();var t;var i;for(i=0;i<(this||e)._items.length;i++){t=(this||e)._items[i];t.removeHandler("bounds-change",(this||e)._delegatedFigureSizes);t.removeHandler("clip-change",(this||e)._delegatedFigureSizes);t.destroy()}var n=(this||e)._items;(this||e)._items=[];this._figureSizes();(this||e)._needsDraw=true;for(i=0;i<n.length;i++){t=n[i];this._raiseRemoveItem(t)}},resetItems:function(){for(var t=0;t<(this||e)._items.length;t++)(this||e)._items[t].reset()},
/**
     * Updates (i.e. animates bounds of) all items.
     * @function
     * @param viewportChanged Whether the viewport changed, which indicates that
     * all TiledImages need to be updated.
     */
update:function(t){var i=false;for(var n=0;n<(this||e)._items.length;n++)i=(this||e)._items[n].update(t)||i;return i},draw:function(){(this||e).viewer.drawer.draw((this||e)._items);(this||e)._needsDraw=false;(this||e)._items.forEach((t=>{(this||e)._needsDraw=t.setDrawn()||(this||e)._needsDraw}))},
/**
     * @returns {Boolean} true if any items need updating.
     */
needsDraw:function(){for(var t=0;t<(this||e)._items.length;t++)if((this||e)._items[t].needsDraw())return true;return(this||e)._needsDraw},
/**
     * @returns {OpenSeadragon.Rect} The smallest rectangle that encloses all items, in viewport coordinates.
     */
getHomeBounds:function(){return(this||e)._homeBounds.clone()},
/**
     * To facilitate zoom constraints, we keep track of the pixel density of the
     * densest item in the World (i.e. the item whose content size to viewport size
     * ratio is the highest) and save it as this "content factor".
     * @returns {Number} the number of content units per viewport unit.
     */
getContentFactor:function(){return(this||e)._contentFactor},
/**
     * As a performance optimization, setting this flag to false allows the bounds-change event handler
     * on tiledImages to skip calculations on the world bounds. If a lot of images are going to be positioned in
     * rapid succession, this is a good idea. When finished, setAutoRefigureSizes should be called with true
     * or the system may behave oddly.
     * @param {Boolean} [value] The value to which to set the flag.
     */
setAutoRefigureSizes:function(t){(this||e)._autoRefigureSizes=t;if(t&(this||e)._needsSizesFigured){this._figureSizes();(this||e)._needsSizesFigured=false}},
/**
     * Arranges all of the TiledImages with the specified settings.
     * @param {Object} options - Specifies how to arrange.
     * @param {Boolean} [options.immediately=false] - Whether to animate to the new arrangement.
     * @param {String} [options.layout] - See collectionLayout in {@link OpenSeadragon.Options}.
     * @param {Number} [options.rows] - See collectionRows in {@link OpenSeadragon.Options}.
     * @param {Number} [options.columns] - See collectionColumns in {@link OpenSeadragon.Options}.
     * @param {Number} [options.tileSize] - See collectionTileSize in {@link OpenSeadragon.Options}.
     * @param {Number} [options.tileMargin] - See collectionTileMargin in {@link OpenSeadragon.Options}.
     * @fires OpenSeadragon.World.event:metrics-change
     */
arrange:function(i){i=i||{};var n=i.immediately||false;var r=i.layout||t.DEFAULT_SETTINGS.collectionLayout;var o=i.rows||t.DEFAULT_SETTINGS.collectionRows;var s=i.columns||t.DEFAULT_SETTINGS.collectionColumns;var a=i.tileSize||t.DEFAULT_SETTINGS.collectionTileSize;var l=i.tileMargin||t.DEFAULT_SETTINGS.collectionTileMargin;var h=a+l;var u;u=!i.rows&&s?s:Math.ceil((this||e)._items.length/o);var c=0;var d=0;var p,g,v,m,f;this.setAutoRefigureSizes(false);for(var y=0;y<(this||e)._items.length;y++){if(y&&y%u===0)if(r==="horizontal"){d+=h;c=0}else{c+=h;d=0}p=(this||e)._items[y];g=p.getBounds();v=g.width>g.height?a:a*(g.width/g.height);m=v*(g.height/g.width);f=new t.Point(c+(a-v)/2,d+(a-m)/2);p.setPosition(f,n);p.setWidth(v,n);r==="horizontal"?c+=h:d+=h}this.setAutoRefigureSizes(true)},_figureSizes:function(){var i=(this||e)._homeBounds?(this||e)._homeBounds.clone():null;var n=(this||e)._contentSize?(this||e)._contentSize.clone():null;var r=(this||e)._contentFactor||0;if((this||e)._items.length){var o=(this||e)._items[0];var s=o.getBounds();(this||e)._contentFactor=o.getContentSize().x/s.width;var a=o.getClippedBounds().getBoundingBox();var l=a.x;var h=a.y;var u=a.x+a.width;var c=a.y+a.height;for(var d=1;d<(this||e)._items.length;d++){o=(this||e)._items[d];s=o.getBounds();(this||e)._contentFactor=Math.max((this||e)._contentFactor,o.getContentSize().x/s.width);a=o.getClippedBounds().getBoundingBox();l=Math.min(l,a.x);h=Math.min(h,a.y);u=Math.max(u,a.x+a.width);c=Math.max(c,a.y+a.height)}(this||e)._homeBounds=new t.Rect(l,h,u-l,c-h);(this||e)._contentSize=new t.Point((this||e)._homeBounds.width*(this||e)._contentFactor,(this||e)._homeBounds.height*(this||e)._contentFactor)}else{(this||e)._homeBounds=new t.Rect(0,0,1,1);(this||e)._contentSize=new t.Point(1,1);(this||e)._contentFactor=1}(this||e)._contentFactor===r&&(this||e)._homeBounds.equals(i)&&(this||e)._contentSize.equals(n)||
/**
         * Raised when the home bounds or content factor change.
         * @event metrics-change
         * @memberOf OpenSeadragon.World
         * @type {object}
         * @property {OpenSeadragon.World} eventSource - A reference to the World which raised the event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
this.raiseEvent("metrics-change",{})},_raiseRemoveItem:function(e){
/**
       * Raised when an item is removed.
       * @event remove-item
       * @memberOf OpenSeadragon.World
       * @type {object}
       * @property {OpenSeadragon.World} eventSource - A reference to the World which raised the event.
       * @property {OpenSeadragon.TiledImage} item - The item's underlying item.
       * @property {?Object} userData - Arbitrary subscriber-defined object.
       */
this.raiseEvent("remove-item",{item:e})}})})(OpenSeadragon);var i=t;export{i as default};

