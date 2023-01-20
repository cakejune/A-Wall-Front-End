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