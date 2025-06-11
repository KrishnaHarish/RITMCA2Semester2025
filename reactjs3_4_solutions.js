Create a functional component called NewsletterSignup. The form should include fields for full name and email address. Use useState to control the form inputs. On form submission, display a thank-you message using conditional rendering. Style the form using an external CSS file with padding, border, and hover effects.
NewsletterSignup.js
import { useState } from 'react';
import './NewsletterSignup.css';
const NewsletterSignup = () => {
const [fullName, setFullName] = useState('');
const [email, setEmail] = useState('');
const [submitted, setSubmitted] = useState(false);
const handleSubmit = (e) => {
e.preventDefault();
setSubmitted(true);
};
if (submitted) {
return <p className="thank-you">Thank you for signing up, {fullName}!</p>;
}
<form className="newsletter-form" onSubmit={handleSubmit}>
<h2>Sign Up for Our Newsletter</h2>
<label>
<input
type="text" value={fullName} required
onChange={(e) => setFullName(e.target.value)}
/>
</label>
<label>
<input
type="email" value={email} required
onChange={(e) => setEmail(e.target.value)}
/>
</label>
<button type="submit">Subscribe</button>
</form>
);
};
export default NewsletterSignup;
NewsletterSignup.js
.newsletter-form {
max-width: 400px;
padding: 20px;
border: 2px solid #ccc;
border-radius: 8px;
font-family: Arial, sans-serif;
background-color: #f9f9f9;
}
.newsletter-form h2 {
text-align: center;
margin-bottom: 20px;
}
.newsletter-form label {
display: block;
margin-bottom: 10px;
}
.newsletter-form input {
width: 100%;
padding: 8px;
margin-top: 4px;
margin-bottom: 16px;
border: 1px solid #aaa;
border-radius: 4px;
}
.newsletter-form button {
width: 100%;
padding: 10px;
background-color: #007bff;
border: none;
border-radius: 4px;
color: white;
font-size: 16px;
}
.newsletter-form button:hover {
background-color: #0056b3;
}
.thank-you {
text-align: center;
font-size: 18px;
color: green;}
Build a functional component named UserStatusSwitcher that toggles a user's status between “Online” and “Offline” using a button. Use useState to manage status and onClick to update it. Display the current status with conditional rendering. Style the status text with inline CSS (e.g., green for online, red for offline).
import  { useState } from 'react';
const UserStatusSwitcher = () => {
const [isOnline, setIsOnline] = useState(false);
const toggleStatus = () => {
setIsOnline((prevStatus) => !prevStatus);
};
const statusStyle = {
};
<div style={{ textAlign: 'center', padding: '20px' }}>
<p style={statusStyle}>
Status: {isOnline ? 'Online' : 'Offline'}
</p>
<button onClick={toggleStatus}>
Go {isOnline ? 'Offline' : 'Online'}
</button>
</div>
);
};
export default UserStatusSwitcher;
Develop a functional component called TechBugReportForm. The form should include the following fields:
import React, { useState } from 'react';
import './TechBugReportForm.css';
const TechBugReportForm = () => {
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [module, setModule] = useState('');
const [errors, setErrors] = useState({});
const [submitted, setSubmitted] = useState(false);
const handleSubmit = (e) => {
e.preventDefault();
const newErrors = {};
if (!title.trim()) newErrors.title = 'Bug title is required.';
if (!description.trim()) newErrors.description = 'Description is required.';
if (!module) newErrors.module = 'Please select a module.';
setErrors(newErrors);
if (Object.keys(newErrors).length === 0) {
setSubmitted(true);
}
};
if (submitted) {
return <p className="success-message">Bug report submitted successfully!</p>;
}
<form className="bug-form" onSubmit={handleSubmit}>
<h2>Tech Bug Report</h2>
<label>
<input
type="text" value={title}
onChange={(e) => setTitle(e.target.value)}
className={errors.title ? 'input-error' : ''}
/>
{errors.title && <span className="error">{errors.title}</span>}
</label>
<label>
<textarea
value={description}
onChange={(e) => setDescription(e.target.value)}
className={errors.description ? 'input-error' : ''}
/>
{errors.description && <span className="error">{errors.description}</span>}
</label>
<label>
<select
value={module}
onChange={(e) => setModule(e.target.value)}
className={errors.module ? 'input-error' : ''}
>
<option value="">-- Select Module --</option>
<option value="UI">UI</option>
<option value="API">API</option>
<option value="Database">Database</option>
<option value="Network">Network</option>
</select>
{errors.module && <span className="error">{errors.module}</span>}
</label>
<button type="submit">Submit</button>
</form>
);
};
export default TechBugReportForm;
.bug-form {
max-width: 400px;
margin: auto;
padding: 20px;
border: 1px solid #ccc;
border-radius: 8px;
background: #fafafa;
font-family: sans-serif;
}
.bug-form h2 {
text-align: center;
}
.bug-form label {
display: block;
margin-bottom: 12px;
}
.bug-form input, .bug-form textarea, .bug-form select {
width: 100%;
padding: 8px;
margin-top: 4px;
margin-bottom: 6px;
border: 1px solid #aaa;
border-radius: 4px;
}
.input-error {
border-color: red;
background: #ffecec;
}
.error {
color: red;
font-size: 13px;
}
button {
width: 100%;
padding: 10px;
background: #007bff;
color: white;
border-radius: 4px;
cursor: pointer;
}
button:hover {
background: #0056b3;
}
.success-message {
text-align: center;
color: green;
font-weight: bold;}
Create a functional component named FeedbackPoll. Display a question such as “How would you rate our tech support?” with three buttons: Good, Neutral, Poor. When a user clicks one, use conditional rendering to show a thank-you message including their selected choice. Use external CSS to style the poll area, buttons, and feedback message.
import React, { useState } from 'react';
import './FeedbackPoll.css';
const FeedbackPoll = () => {
const [feedback, setFeedback] = useState('');
const handleClick = (choice) => {
setFeedback(choice);
};
if (feedback) {
<div className="poll-container">
<p className="thank-you">
Thank you for your feedback! You rated us: <strong>{feedback}</strong>
</p>
</div>
);
}
<div className="poll-container">
<h2>How would you rate our tech support?</h2>
<div className="button-group">
<button onClick={() => handleClick('Good')}>Good</button>
<button onClick={() => handleClick('Neutral')}>Neutral</button>
<button onClick={() => handleClick('Poor')}>Poor</button>
</div>
</div>
);
};
export default FeedbackPoll;
.poll-container {
max-width: 400px;
margin: 30px auto;
padding: 20px;
border: 1px solid #ccc;
border-radius: 8px;
background: #f9f9f9;
text-align: center;
font-family: Arial, sans-serif;
}
.button-group button {
margin: 10px;
padding: 10px 20px;
font-size: 16px;
border: none;
border-radius: 6px;
cursor: pointer;
transition: background 0.3s ease;
}
.button-group button:nth-child(1) {
background-color: #4caf50;
color: white;
}
.button-group button:nth-child(2) {
background-color: #ff9800;
color: white;
}
.button-group button:nth-child(3) {
background-color: #f44336;
color: white;
}
.button-group button:hover {
opacity: 0.9;
}
.thank-you {
font-size: 18px;
color: #333;
}
Build a functional component called ExpenseTrackerInput. Include inputs for expense name and amount. Use useState for form control. Validate that the amount is a positive number. On form submission, show a success message or an error message using conditional rendering. Use inline CSS to highlight the amount field in red if validation fails.
import React, { useState } from 'react';
const ExpenseTrackerInput = () => {
const [name, setName] = useState('');
const [amount, setAmount] = useState('');
const [error, setError] = useState('');
const [success, setSuccess] = useState(false);
const handleSubmit = (e) => {
e.preventDefault();
setSuccess(false);
setError('');
const amountValue = parseFloat(amount);
if (!name.trim()) {
setError('Expense name is required.');
return;
}
if (isNaN(amountValue) || amountValue <= 0) {
setError('Amount must be a positive number.');
return;
}
setSuccess(true);
alert(`Expense "${name}" of amount ₹${amountValue.toFixed(2)} added successfully!`);
setName('');
setAmount('');
};
<form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
<div style={{ marginBottom: 12 }}>
<label htmlFor="expenseName">Expense Name:</label><br />
<input
id="expenseName" type="text" value={name}
onChange={(e) => setName(e.target.value)}
style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
/>
</div>
<div style={{ marginBottom: 12 }}>
<label htmlFor="expenseAmount">Amount:</label><br />
<input
id="expenseAmount" type="number" value={amount}
onChange={(e) => setAmount(e.target.value)}
style={{
}}
/>
</div>
<button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}> Add Expense </button>
{error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
{success && <p style={{ color: 'green', marginTop: 10 }}>Expense added successfully!</p>}
</form>
);
};
export default ExpenseTrackerInput;
Create a functional component named ThemeSelector. Provide two radio buttons: Light Mode and Dark Mode. Use useState to track the selected theme. Conditionally render a preview box styled with the appropriate theme (dark or light). Use external CSS classes to apply theme-based background and text styling.
import React, { useState } from 'react';
import './ThemeSelector.css';
const ThemeSelector = () => {
const [theme, setTheme] = useState('light');
<div className="theme-selector">
<h2>Select Theme</h2>
<div className="radio-group">
<label>
<input
checked={theme === 'light'} onChange={() => setTheme('light')} />
</label>
<label>
<input
checked={theme === 'dark'} onChange={() => setTheme('dark')}/>
</label>
</div>
<div className={`preview-box ${theme}`}>
<p>This is {theme === 'light' ? 'Light' : 'Dark'} Mode preview!</p>
</div>
</div>
);
};
export default ThemeSelector;
.theme-selector {
max-width: 400px;
margin: 30px auto;
font-family: Arial, sans-serif;
text-align: center;
}
.radio-group {
margin: 20px 0;
display: flex;
justify-content: center;
gap: 20px;
}
.preview-box {
padding: 30px;
margin-top: 20px;
border-radius: 8px;
transition: all 0.3s ease;
}
.light {
background-color: #f9f9f9;
color: #333;
border: 1px solid #ccc;
}
.dark {
background-color: #333;
color: #f9f9f9;
border: 1px solid #555;
}