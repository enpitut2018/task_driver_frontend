function serviceworker (user_id) {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/sw.js').then(registration => {
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
	return registration.pushManager.getSubscription().then(subscription => {
		if (subscription) {
			// 登録済みの場合
			return subscription;
		} else {
			// 未登録の場合
			return subscribe(registration).then(subscription => {
				return subscription;
			})
		}
	})
}

function subscribe (registration) {
	return fetch('http://localhost:3001/endpoints/getVapidPublicKey', {
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
		})
	}).then(subscription => {
		return subscription;
	});
}

function afterSubscribed ({subscription, user_id}) {
	const endpoint = subscription.endpoint; //エンドポイントURL
	const publicKey = encodeBase64URL(subscription.getKey('p256dh')); //クライアント公開鍵
	const authSecret = encodeBase64URL(subscription.getKey('auth')); //auth secret
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