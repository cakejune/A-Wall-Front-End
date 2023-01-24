View	a container for other components
Text	displays text
Image	displays images
Stylesheet	provides a way of styling elements 
TextInput	an input field
Button	a clickable button

Adding an Image
Images in React Native are placed in the assets folder and referenced like this:


color tester: 
{
color: #f9c2ff}

The problem is that recording.getURI() is not available in the handleSubmitRecording function. The recording object passed in the function does not have the getURI() method.

In the stopRecording() function, you're using recording.getURI() to get the URI of the recording, but in the handleSubmitRecording() function, you're passing in the recording object without the URI.

You should pass the URI of the recording separately to the handleSubmitRecording() function, or store the URI of the recording in state and pass it to the handleSubmitRecording() function.

<div class="container">
  <div class="toggle">
    <input type="checkbox">
    <span class="button"></span>
    <span class="label">+</span>
  </div>
  <div class="toggle">
    <input type="checkbox" checked>
    <span class="button"></span>
    <span class="label">–</span>
  </div>
</div>

@import compass


// Squishy buttons inspired by https://goo.gl/bFCyS

@import url(https://fonts.googleapis.com/css?family=Lato:700)

html, body

  font-family: 'Lato', sans-serif
  background: url(https://s.cdpn.io/1715/dark_stripes.png)
  text-align: center
  height: 100%

.container

  text-align: center
  position: absolute
  margin-top: -80px
  width: 100%
  top: 50%

.toggle

  margin: 4px
  display: inline-block

.toggle
  $size: 140px

  box-shadow: inset 0 0 35px 5px rgba(0,0,0,0.25), inset 0 2px 1px 1px rgba(255,255,255,0.9), inset 0 -2px 1px 0 rgba(0,0,0,0.25)
  border-radius: 8px
  background: #ccd0d4
  position: relative
  height: $size
  width: $size

  &:before

    $radius: $size * 0.845
    $glow: $size * 0.125

    box-shadow: 0 0 $glow $glow / 2 #fff
    border-radius: $radius
    background: #fff
    position: absolute
    margin-left: ( $radius - $glow ) * -0.5
    margin-top: ( $radius - $glow ) * -0.5
    opacity: 0.2
    content: ''
    height: $radius - $glow
    width: $radius - $glow
    left: 50%
    top: 50%

  .button

    $radius: $size * 0.688

    -webkit-filter: blur(1px)
    -moz-filter: blur(1px)
    filter: blur(1px)

    transition: all 300ms cubic-bezier(0.230, 1.000, 0.320, 1.000)
    box-shadow: 0 15px 25px -4px rgba(0,0,0,0.5), inset 0 -3px 4px -1px rgba(0,0,0,0.2), 0 -10px 15px -1px rgba(255,255,255,0.6), inset 0 3px 4px -1px rgba(255,255,255,0.2), inset 0 0 5px 1px rgba(255,255,255,0.8), inset 0 20px 30px 0 rgba(255,255,255,0.2)
    border-radius: $radius
    position: absolute
    background: #ccd0d4
    margin-left: $radius * -0.5
    margin-top: $radius * -0.5
    display: block
    height: $radius
    width: $radius
    left: 50%
    top: 50%

  .label

    transition: color 300ms ease-out
    text-shadow: 1px 1px 3px #ccd0d4, 0 0 0 rgba(0,0,0,0.8), 1px 1px 4px #fff
    line-height: $size - 1
    text-align: center
    position: absolute
    font-weight: 700
    font-size: 42px
    display: block
    opacity: 0.9
    height: 100%
    width: 100%
    color: rgba(0,0,0,0.4)

  input

    opacity: 0
    background :red
    position: absolute
    cursor: pointer
    z-index: 1
    height: 100%
    width: 100%
    left: 0
    top: 0

    &:active

      ~ .button

        box-shadow: 0 15px 25px -4px rgba(0,0,0,0.4), inset 0 -8px 30px 1px rgba(255,255,255,0.9), 0 -10px 15px -1px rgba(255,255,255,0.6), inset 0 8px 25px 0 rgba(0,0,0,0.4), inset 0 0 10px 1px rgba(255,255,255,0.6)
      
      ~ .label

        font-size: 40px
        color: rgba(0,0,0,0.45)

    &:checked
      
      ~ .button

        box-shadow: 0 15px 25px -4px rgba(0,0,0,0.4), inset 0 -8px 25px -1px rgba(255,255,255,0.9), 0 -10px 15px -1px rgba(255,255,255,0.6), inset 0 8px 20px 0 rgba(0,0,0,0.2), inset 0 0 5px 1px rgba(255,255,255,0.6)

      ~ .label

        font-size: 40px
        color: rgba(0,0,0,0.4)



        const metadata = {
      name: `msg-for-${title}.mp4`,
      type: "audio/mp4",
      duration: recording.duration
    }
    alarm_messages.append("audio_messages", {
      uri: file,
      metadata: metadata
    });
    uploadToAPI(alarm_messages);