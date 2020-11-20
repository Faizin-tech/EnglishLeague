// "publicKey":"BKr4RqYnHRuVjy2jXqk633t0Bb89KKU2bgzHou6rItTumlkr11aZJIAOi86b7n3qsqDpt4w_0_LMrVwLiYoZlhE",
// "privateKey":"S_Sjr0j8YFyCwtrI38lEqqIT6EdxDAKse24OupY7Mw8"
var webPush = require('web-push');


const vapidKeys = {
   "publicKey":"BKr4RqYnHRuVjy2jXqk633t0Bb89KKU2bgzHou6rItTumlkr11aZJIAOi86b7n3qsqDpt4w_0_LMrVwLiYoZlhE", 
   "privateKey":"S_Sjr0j8YFyCwtrI38lEqqIT6EdxDAKse24OupY7Mw8"   
};

webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)

var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/eKSWZYHJXoE:APA91bGhwfpW9uFPTQcJrogORCj3SF79cFpYU40cg4pbAUfDFIPfXKrKfNkbyzJmqGECFyxXGar3bfaSJSoPmRxwX5E4gR6Q6CXLEIzJ9vk7GzEWODhSb8at2whFJHPZa_rQBfbQmjti",
   "keys": {
       "p256dh": "BPih1s+9rXmFE6bja1eZtm9XoesWyixKMlhPCpAaUht68We/u/T6GNOGJ2uK5RbPcqZ8EkMI/dT1YJoXc5Iy5cY==",
       "auth": "KeQ0eXS1PXzmX2zbhDnIjw=="
   }
};

var payload = 'Tim Favorit anda sedang akan berlaga pada pukul 20:00 WIB';
 
var options = {
   gcmAPIKey: "204459126986",
   TTL: 60
};

webPush.sendNotification(
   pushSubscription,
   payload,
   options
);