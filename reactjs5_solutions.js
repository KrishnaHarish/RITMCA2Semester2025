Create another React functional component called TextInputTracker with a controlled text input. Display the current input text below the input as the user types, along with a character count. Use useState to track the input value. Restrict input to only letters and spaces—ignore any other characters. Include a clear button that resets the input and display. Keep the styling minimal: just some spacing and basic font styles to keep it clean and readable.
import { useState } from "react";
function TextInputTracker() {
const [text, setText] = useState("");
// Allow only letters and spaces
const handleChange = (e) => {
const input = e.target.value;
if (/^[a-zA-Z\s]*$/.test(input)) {
setText(input);
}
};
const clearInput = () => setText("");
<div style={{ maxWidth: 300, margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
<input
type="text" value={text} onChange={handleChange}
placeholder="Type letters only..."
style={{
}}
/>
<p>Current text: {text}</p>
<p>Character count: {text.length}</p>
<button
onClick={clearInput}
style={{
}}
>
</button>
</div>
);
}
export default TextInputTracker;
Design a functional component named ColorChanger with a button that cycles through a list of colors (["red", "green", "blue"]) each time it’s clicked. Use useState to manage the current color. Display a div with a fixed height and width, and apply the current color as its background using inline CSS. Also, include a label above the div showing the current color name.
import  { useState } from 'react';
function ColorChanger() {
const colors = ['red', 'green', 'blue'];
const [currentIndex, setCurrentIndex] = useState(0);
const changeColor = () => {
setCurrentIndex((currentIndex + 1) % colors.length);
};
const boxStyle = {
};
const buttonStyle = {
};
const labelStyle = {
};
<div style={{ textAlign: 'center', marginTop: '40px' }}>
<div style={labelStyle}>Current Color: {colors[currentIndex]}</div>
<div style={boxStyle}></div>
<button onClick={changeColor} style={buttonStyle}>Change Color</button>
</div>
);
}export default ColorChanger;
Create a functional component named Counter that displays a number starting from 0. Add three buttons labeled "Increase", "Decrease", and "Reset". Clicking "Increase" should increment the number by 1 using useState. Clicking "Decrease" should decrement the number by 1. Clicking "Reset" should set the number back to 0. Use inline CSS to center the content on the page, apply padding, margin, and background color to the buttons, and make the displayed number bold with a slightly larger font size.
import React, { useState } from 'react';
function Counter() {
const [count, setCount] = useState(0);
const increment = () => setCount(count + 1);
const decrement = () => setCount(count - 1);
const reset = () => setCount(0);
const containerStyle = {
};
const buttonStyle = {
};
const countStyle = {
};
<div style={containerStyle}>
<div style={countStyle}>Count: {count}</div>
<button onClick={increment} style={buttonStyle}>Increase</button>
<button onClick={decrement} style={buttonStyle}>Decrease</button>
<button onClick={reset} style={buttonStyle}>Reset</button>
</div>
);
}
export default Counter;