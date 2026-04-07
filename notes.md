# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 54.225.235.132
I got the licenses working for the main and the wildcard.

## Caddy

No issues getting Caddy set up. Just followed the directions

## HTML
I refreshed myself on the basic tags of HTML.

I learned how to better use the form tags and how buttons work. I also learned to use div tags to split up different areas for easy customization later on. I used previous examples of html to gain a better understanding of how different tags work and where to use them.

## CSS

It took me quite a while to get the hang of how I wanted the website to look, but once I had gotten the index.html to a way I liked, I was for the most part able to just link the stylesheet to the other pages and have them mostly finished.

Bootstrap made things so much easier, making things look very nice very quickly, giving the cozy vibe I was going for.

Adding a font had some unexpected difficulty, but I got it figured out.

I also used SVG to make the icon and logo for the app. This turned out to be a piece of cake.

## React Part 1: Routing

This was easily the most annoying and difficult assignment yet. The instructions were incredibly unclear on where different code was supposed to go and the example code would have small errors that were difficult to find to fix, such as having import /app.css instead of import ./app.css. Once I figured it out it was not too difficult to get the rest of it done.

## React Part 2: Reactivity

I messed around a bit with the code for simon, changing the name and score of the placeholder for the websocket service. I have also learned more about how && works as an implicit if statement.

I've also learned a lot more about how to make a site more reactive and change the views depending on user actions, like signing in. I've also learned what different parts of React do, like useEffect running whenever the trigger condition happens.

I was surprised that jsx also has a map function, but it does make my life much easier when handling users hobbies.

- Toast API https://react-hot-toast.com/
- Stringify a custom object and use json.parse to save it
- Keep variables seperate

## Startup Service

I learned a lot more about setting up a backend service for my webpage. I struggled with the simon set up a little, but eventually got it figured out.

I got the assignment complete, adding in calls to the back end from the front end pages, password encryption (easier than I thought it would be), called a 3rd party API, and figured out hosting my own local back end.

## Database

Setting up a database is much easier than I was expecting. MongoDB does make it really easy to handle your data without needing to worry about universal formatting. Also, add stuff to your .gitignore so you don't post credientials publically.

## Websocket

I found it really cool being able to set up the ability for users to impact the experience of others. This also made me more aware of how computer programs can have vulnerabilities. Before I didn't understand how you could get a program to do something it wasn't built to do but once you allow for users to begin interacting with a server and so many moving parts, I can see how things may bug out.