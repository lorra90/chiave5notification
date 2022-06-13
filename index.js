import express from 'express'
import bodyparser from 'body-parser'
import { admin } from './firebase_config.js'

const app = express()
app.use(bodyparser.json())

const port = 3000

const sentNotification = (message) => {
    const topic = 'pushNotification';

    // See documentation on defining a message payload.
    const notification = {
        notification: {
            title: 'Chiave5 🍋',
            body: message
        },
        topic: topic
    };

    admin.messaging().send(notification)
        .then(response => {

            //configure your response here

        })
        .catch(error => {
            console.log(error);
        });
}

let database = admin.database()

const messagesRef = database.ref("/").limitToLast(1); 

  messagesRef.on('child_added', snapshot => {
    console.log(JSON.stringify(snapshot))
    var x = JSON.parse(JSON.stringify(snapshot));
    sentNotification(x.messageUser + ": " + x.messageText);
  });

app.post('/send', (req, res) => {
    console.log("Sending message")

    sentNotification("Prova")

})
app.listen(port, () => {
    console.log("listening to port" + port)
})