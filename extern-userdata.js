/*jshint expr:true */
/**
 * Enables the object to persist data in user data.
 * @see http://msdn.microsoft.com/en-us/library/ms531424(v=vs.85).aspx
 * @constructor
 * @extends {HTMLElement}
 */
var IEUserData = function () {};
/**
 * Saves an object participating in userData persistence to a UserData store.
 * @param {string} storeName
 * @see http://msdn.microsoft.com/en-us/library/ms531403(v=vs.85).aspx
 */
IEUserData.prototype.save = function (storeName) {};
/**
 * @see http://msdn.microsoft.com/en-us/library/ms531328(v=vs.85).aspx
 */
IEUserData.prototype.XMLDocument;
/**
 * @param {string} storeName
 * @see http://msdn.microsoft.com/en-us/library/ms531395(v=vs.85).aspx
 */
IEUserData.prototype.load = function (storeName) {};
/**
 * @type string
 * @see http://msdn.microsoft.com/en-us/library/ms531095(v=vs.85).aspx
 */
IEUserData.prototype.expires;
