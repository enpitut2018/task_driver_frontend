function serviceworker (user_id) {
	console.log("user_id: ", user_id);
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/sw.js').then(registration => {
			console.log('ServiceWorker registration successful with scope: ', registration.scope);
			navigator.serviceWorker.ready.then( () => {
				afterReady(registration).then(subscription => {
					afterSubscribed({subscription, user_id});
				})
			});
		}).catch(err => {
			console.log('ServiceWorker registration failed: ', err);
		});
	}
}

function afterReady (registration) {
	console.log('service worker is ready');
	return registration.pushManager.getSubscription().then(subscription => {
		if (subscription) {
			// 登録済みの場合
			console.log('successfully got subscription');
			console.log(subscription);
			return subscription;
		} else {
			// 未登録の場合
			console.log('subscribing...');
			return subscribe(registration);
		}
	})
}

function subscribe (registration) {
	fetch('http://localhost:3001/endpoints/getVapidPublicKey', {
		method: 'GET',
		mode: 'cors',
		credeintials: 'include'
	}).then(res => {
		return res.json();
	}).then(json => {
		const convertedVapIDKey = urlBase64ToUint8Array(json.vapidPublicKey);
		return registration.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: convertedVapIDKey,
		});
	})
}

function afterSubscribed ({subscription, user_id}) {
	const endpoint = subscription.endpoint; //エンドポイントURL
	console.log("pushManager RegistrationID:", endpoint.split("/").slice(-1).join());
	const publicKey = encodeBase64URL(subscription.getKey('p256dh')); //クライアント公開鍵
	console.log("publicKey:", publicKey);
	const authSecret = encodeBase64URL(subscription.getKey('auth')); //auth secret
	console.log("authSecret:", authSecret);
	let contentEncoding; //プッシュ通知のときに使用するContent-Encoding
	if ('supportedContentEncodings' in PushManager) {
	  contentEncoding = PushManager.supportedContentEncodings.includes('aes128gcm') ? 'aes128gcm' : 'aesgcm';
	} else {
	  contentEncoding = 'aesgcm';
	}
	//fetch APIを使用してサーバに送信
	fetch('http://localhost:3001/endpoints/register', {
		credentials: 'include',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			endpoint: endpoint,
			publicKey: publicKey,
			auth: authSecret,
			contentEncoding: contentEncoding,
			id: user_id
		})
	});
}

function urlBase64ToUint8Array(base64String) {
  //文字列→unit8に変換する関数
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function encodeBase64URL(buffer) {
  //Base64エンコードを行う関数
  return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))
           .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export default serviceworker