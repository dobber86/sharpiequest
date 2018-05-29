# sharpiequest
SharpieQuest

This project/game is made within 2 weeks as part of a Front End Developer Traineeship by me and another trianee. Before the start of this project, we had very little to no experience of the languages and frameworks listed below.

This project is programmed in the following tools, languages and frameworks:

- HTML5
- CSS3 with Bootstrap
- JavaScript
- MySql
- Express
- AngularJS
- Node.js
- bcrypt

Game description:

The game starts with a log-in view where you can log-in or click on a link to create a new account with username and password.
After logging in the first battle begins. Your enemy is a random one from three different enemies (each with different values). You have three options to do: Attack, Defend or Special Power (Debistate). You get hints before every action, what your enemy might do in his turn. This depends on your insight percentage. After an action it is the enemy's turn. This continues until you or your enemy is dead. 
If the enemy dies, you get loot (money and xp). You can spent your money and xp in the shop to buy upgrades or refill yout HP and MP bar. Then you go to the next battle and you of to fight again against one of the three possible enemies. In level 8, you will encounter a some kind of endboss. This enemy is stronger and has more HP and will become stronger and stronger after turn 10.
When you defeat the boss the game continous, but enemies are a little bit stronger now. And in level 16 you will encounter the boss again. The game is balanced until level 8. So after level 8 it might be possible that you can be too much upgrades and that you are too strong.
When you die, you go to a view where you can choose to reset your account or delete it (ragequit ;)).

Installation (local):

MySql database (you can change this offcourse, but this is as in server.js-file):
- Database: sharpiequest
- Table: players

In the main sharpiequest folder with the server.js-file: install npm (with bodyparser, express and mysql), install bcrypt.

This program runs on Node.js and you can start this program with: node server.js
And will start at localhost:3001
