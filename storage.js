/**
 * @license local-storage-js Copyright (c) 2011 Wojo Design | License: MIT/GPL
 */
/*jshint sub:true */
// kate: tabs
/*
Copyright (c) 2011 Wojo Design
Dual licensed under the MIT or GPL licenses.
*/
(function(){
	// check to see if we have localStorage or not
	if( !window.localStorage ){

		// globalStorage
		// non-standard: Firefox 2+
		// https://developer.mozilla.org/en/dom/storage#globalStorage
		if ( window.globalStorage ) {
			// try/catch for file protocol in Firefox
			// globalStorage is not the same as localStorage however
			// NOTE globalStorage will return null instead of undefined on keys that don't exist
			// NOTE globalStorage will return an object with a 'value' key instead of the value directly
			try {
				var store = window.globalStorage[location.hostname];
				// Add the clear() method if needed, globalStorage doesn't normally have it
				if (!window.localStorage.clear) {
					window.localStorage.clear = function () {
						for (var key in store) {
							if (store.hasOwnProperty(key)) {
								store.removeItem(key);
							}
						}
					};
				}
				window.localStorage = window.globalStorage[location.hostname];
			} catch( e ) {}

			return;
		}

		// userData
		// non-standard: IE 5+
		// http://msdn.microsoft.com/en-us/library/ms531424(v=vs.85).aspx
		var div = /*@type IEUserData */ document.createElement( "div" ),
			attrKey = "localStorage";
		div.style.display = "none";
		document.getElementsByTagName( "head" )[ 0 ].appendChild( div );
		if ( div.addBehavior ) {
			div.addBehavior( "#default#userdata" );
			//div.style.behavior = "url('#default#userData')";

			var localStorage = window["localStorage"] = {
				"length":0,
				"setItem":function( key , value ){
					div.load( attrKey );
					key = cleanKey(key );

					if( !div.getAttribute( key ) ){
						localStorage.length++;
					}
					div.setAttribute( key , value );

					div.save( attrKey );
				},
				"getItem":function( key ){
					div.load( attrKey );
					key = cleanKey(key );
					return div.getAttribute( key );

				},
				"removeItem":function( key ){
					div.load( attrKey );
					key = cleanKey(key );
					div.removeAttribute( key );

					div.save( attrKey );
					localStorage.length--;
					if( localStorage.length < 0){
						localStorage.length=0;
					}
				},

				"clear":function(){
					div.load( attrKey );
					var i = 0, attr;
					while (( attr = div.XMLDocument.documentElement.attributes[ i++ ] )) {
						div.removeAttribute( attr.name );
					}
					div.save( attrKey );
					localStorage.length=0;
				},

				"key":function( key ){
					div.load( attrKey );
					return div.XMLDocument.documentElement.attributes[ key ];
				}

			},

			// convert invalid characters to dashes
			// http://www.w3.org/TR/REC-xml/#NT-Name
			// simplified to assume the starting character is valid
			cleanKey = function( key ){
				return key.replace( /[^\-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g, "-" );
			};


			div.load( attrKey );
			localStorage["length"] = div.XMLDocument.documentElement.attributes.length;
		}
	}
})();