misfit-nodejs-example
=======

This test does "oauth" ( or whatever ) against misfit, logs you in with your API key you get from them, pulls your data for a timeperiod, and graphs it using high charts. 
It's not intended as a useful project.. just to show it's possible and as a good example of how to use the API, stack queries, do some auth, and redirect you a number of time to get you in the right spot. Fun.

Just copy constants_example.js to constants.js and fill it in with your secrets.
Then hit the / of the server.

Check out the screenshots in the docs/screenshots/ folder to get and idea of what it looks like and how the network transactions go..

Q: But how do I log in?!
A: If you're key isn't yet authorized for an account, it will direct you to misfit to login and send you back to the app. 
Each time you restart the server, it will go auth again, but you won't have to login again, since this appid / clientid already is authorized for a time. You will have to get a new token for this session though.. which do expire. 
You used to have to hit the /misfit/login to get redirected back to you to be able to pull the data, but this directs you around if you're not yet logged in, so no extra steps needed.
So it's all automatic now.

