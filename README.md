# chat-test
A simple chat application using NodeJS. This is live on Heroku. You can view it at https://mfrancis-chat.herokuapp.com. It is a very simple web application where you enter a display name and chat with anyone else that happens to be online at the same time as you. You cannot see past messages, only ones posted in real time. You can also see joining and leaving notifications with fun messages. You can customize your username color through commands. If you enter an ascii emoji, it may be converted into its unicode counterpart.

As a security measure, anything put through the chat is plain text. This avoids XSS attacks where an attacker can affect anyone else on the application by entering <script> tags.
