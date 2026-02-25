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

- Toast API https://react-hot-toast.com/
- Stringify a custom object and use json.parse to save it
- Keep variables seperate

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
