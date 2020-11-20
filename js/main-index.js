
    if (!('serviceWorker' in navigator)) {
        console.log('Service Worker tidak didukung browser ini!');
    } else {
        registerServiceWorker();
        requestPermission();
    }

    // Register Service Worker
    function registerServiceWorker() {
        return navigator.serviceWorker.register('service-worker.js')
        .then(function(registration) {
            console.log('Registration Service Worker Berhasil!');
            return registration;
        })
        .catch(function(error) {
            console.log('Registrasi service worker Gagal!', error);
        })
    }

    // Meminta izin medafatrakan Fitur Notifikasi
    function requestPermission() {
        navigator.serviceWorker.ready.then(()=>{
            if ('Notification' in window) {
                Notification.requestPermission()
                .then(function(result) {
                    if (result === "denied") {
                        console.log('Fitur notifikasi tidak diizinkan!');
                        return;
                    } else if (result === "default") {
                        console.log('Pengguna menutup dialog permission');
                        return;
                    }

                    if (('PushManager' in window)) {
                    navigator.serviceWorker.getRegistration().then(function(registration) {
                            registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array("BKr4RqYnHRuVjy2jXqk633t0Bb89KKU2bgzHou6rItTumlkr11aZJIAOi86b7n3qsqDpt4w_0_LMrVwLiYoZlhE")
                            }).then(function(subscribe) {
                                console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                                console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('p256dh')))));
                                console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('auth')))));
                            }).catch(function(e) {
                                console.error('Tidak dapat melakukan subscribe ', e.message);
                            });
                        });

                    }
                });
            }
        });
    }

    // mengubah nilai publickey menjadi bentuk Uint8array
    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
            for (let i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
            }
        return outputArray;
    }
