// Membuat Database INDEXEDDB BARU
var dbPromised = idb.open("EPL", 1, (upgradeDb) => {
    var teamObjectStore = upgradeDb.createObjectStore("teams", { keyPath: "id" });
    teamObjectStore.createIndex("name", "name", {unique: false});
});

// MENYIMPAN DATA KE INDEXEDDB
function saveForLater(team) {
    dbPromised.then( (db) => {
        let tx = db.transaction("teams", "readwrite");
        let store = tx.objectStore("teams");
        console.log(team);
        store.put(team);
        return tx.complete;
    }).then(() => {
      M.toast({ html: 'Team has been saved!' });
        const title = 'Your Team Has Been Saved';
        const options = {
        'icon': 'images/logo144.png',
        requireInteraction: true,
        vibrate: [100,50,100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
        }
      if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification(title, options);
        });
      } else {
        console.error('Fitur notifikasi tidak diijinkan.');
      }
    }).catch(() => {
      M.toast({ html: 'Team cant be saved!' });
    });
}

// Menampilkan seluruh data dari IndexedDB
function getAll() {
  return new Promise( (resolve, reject) => {
    dbPromised.then( (db) => {
      let tx = db.transaction("teams", "readonly");
      let store = tx.objectStore("teams");
      return store.getAll();
    })
    .then( (team) => {
      resolve(team);
    });
  });
}

function getById(id) {
  return new Promise( (resolve, reject) => {
    dbPromised
      .then( (db) => {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.get(parseInt(id));
      })
      .then( (team) => {
        resolve(team);
      });
  });
}

// Menghapus Data
function deleteClub () {
  let idTeam = new URLSearchParams(window.location.search).get("id");
  idTeam = parseInt(idTeam);
    dbPromised
      .then((db) => {
        const tx = db.transaction('teams', 'readwrite');
        const store = tx.objectStore('teams');
        store.delete(idTeam);
        return tx.complete;
      }).then(() => {
        M.toast({ html: 'Team has been deleted!' });
        const title = 'Your Team Has Been Deleted';
        const options = {
        'icon': 'images/logo144.png',
        requireInteraction: true,
        vibrate: [100,50,100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
        }
        if (Notification.permission === 'granted') {
          navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification(title, options);
          });
        } else {
          console.error('Fitur notifikasi tidak diijinkan.');
        }
        getSavedTeams();
      }).catch((err) => {
        M.toast({ html: `${err}` });
      });
}
