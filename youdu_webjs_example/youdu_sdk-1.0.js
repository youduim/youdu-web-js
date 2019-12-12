var iOSBridge
var isAnroid = (/android/i.test(navigator.userAgent.toLowerCase()));
var isiOS = (/iphone|ipad/i.test(navigator.userAgent.toLowerCase()));
var isYoudu = (/youdu/i.test(navigator.userAgent.toLowerCase()));

function setupWebViewJavascriptBridge(callback) {
	if (!isiOS) {
		return;
	}
	if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
	if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
	window.WVJBCallbacks = [callback];
	var WVJBIframe = document.createElement('iframe');
	WVJBIframe.style.display = 'none';
	WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
	document.documentElement.appendChild(WVJBIframe);
	setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}
//OC原生回调js
setupWebViewJavascriptBridge(function(bridge) {
	iOSBridge = bridge
	bridge.registerHandler('onYDAlbumSelected', function(path, responseCallback) {
		onYDAlbumSelected(path)
	})
	bridge.registerHandler('onYDUploadResult', function(data, responseCallback) {
		onYDUploadResult(data.path, data.errorCode, data.fileId)
		responseCallback(responseData)
	})
	bridge.registerHandler('onMenuClick', function(data, responseCallback) {
		onMenuClick(data)
	})
	bridge.registerHandler('onUserChooserResult', function(data, responseCallback) {
		onUserChooserResult(data)
	})
	bridge.registerHandler('onDeptChooserResult', function(data, responseCallback) {
		onDeptChooserResult(data)
	})
	bridge.registerHandler('onLocationChanged', function(data, responseCallback) {
		onLocationChanged(data)
	})
	bridge.registerHandler('onGetWiFiBSSID', function(data, responseCallback) {
		onGetWiFiBSSID(data)
	})
	bridge.registerHandler('onScanQRCodeResult', function(data, responseCallback) {
		onScanQRCodeResult(data.success, data.result)
	})
})

function showAlbumByYD() {
	if (isAnroid) {
		window.youdu.showAlbumByYD()    
	} else if(isiOS) {
		iOSBridge.callHandler('showAlbumByYD', {}, function(response) {})
	}
}

function uploadImageByYD(path, flag) {
	 if (isAnroid) {
		window.youdu.uploadImageByYD(path, flag)
	} else if(isiOS) {
		iOSBridge.callHandler('uploadImageByYD', {'imagePath': path, 'reduceQuality': flag}, function(response) {})
	}
}

function setMenuByYD(name) {
	if (isAnroid) {
		window.youdu.setMenuName(name)
	} else if(isiOS) {
		iOSBridge.callHandler('setMenuName', name, function(response) {})
	}
}

function openUserChooserByYD(maxSize, gids) {
	if (isAnroid) {
		window.youdu.openUserChooser(maxSize, gids)
	} else if(isiOS) {
		iOSBridge.callHandler('openUserChooser', {'maxSize': maxSize, 'gids': gids}, function(response) {})
	}
}

function openDeptChooserByYD(maxSize, deptIds) {
	if (isAnroid) {
		window.youdu.openDeptChooser(maxSize, deptIds)
	} else if(isiOS) {
		iOSBridge.callHandler('openDeptChooser', {'maxSize': maxSize, 'deptIds': deptIds}, function(response) {})
	}
}

function startLocationByYD(param) {
	if (isAnroid) {
		window.youdu.startLocation(param)
	} else if (isiOS) {
		iOSBridge.callHandler('startLocation', param, function(response) {})
	}
}

function getWiFiBSSIDByYD(param) {
	if (isAnroid) {
		window.youdu.getWiFiBSSID(param)
	} else if (isiOS) {
		iOSBridge.callHandler('getWiFiBSSID', param, function(response) {})
	}
}

function fetchSmsByYD(requestId, index, count, lowerTime, key) {
	if (isAnroid) {
		window.youdu.fetchSmsByYD(requestId, index, count, lowerTime, key)
	}
}

function setNewSmsObserverByYD() {
	if (isAnroid) {
		window.youdu.setNewSmsObserver()
	}
}

function enableMenuByYD(enable) {
	if (isAnroid) {
		window.youdu.enableMenuByYD(enable)    
	} else if(isiOS) {
		iOSBridge.callHandler('enableMenuByYD', {'enable': enable}, function(response) {})
	}
}

function scanQRCodeByYD(needResult) {
	if (isAnroid) {
		window.youdu.scanQRCodeByYD(needResult)
	} else if (isiOS) {
		iOSBridge.callHandler('scanQRCodeByYD', {'needResult': needResult}, function(response) {})
	}
}

function closeYdWindow() {
	if (isAnroid) {
		window.youdu.closeWindow()
	} else if (isiOS) {
		iOSBridge.callHandler('closeWindow', {}, function(response) {})
	}
}

function getInputResult() {
	iOSBridge.callHandler('getInputResult', function(response) {})
}

function enableBottomNavigatorOn() {
	iOSBridge.callHandler('enableBottomNavigator', {'enable': true}, function(response) {})
}

function enableBottomNavigatorOff() {
	iOSBridge.callHandler('enableBottomNavigator', {'enable': false}, function(response) {})
}