Create a functional component in React-JS that displays a 5 Vehicle Info Card in a row with details like Model, Manufacturer, Year, and Fuel Type. Use inline CSS to style the card layout and appearance.
import React from "react";
function VehicleCard({ model, manufacturer, year, fuelType }) {
const cardStyle = {
};
const headingStyle = {
};
const infoStyle = {
};
<div style={cardStyle}>
<h2 style={headingStyle}>Vehicle Information</h2>
<p style={infoStyle}><strong>Model:</strong> {model}</p>
<p style={infoStyle}><strong>Manufacturer:</strong> {manufacturer}</p>
<p style={infoStyle}><strong>Year:</strong> {year}</p>
<p style={infoStyle}><strong>Fuel Type:</strong> {fuelType}</p>
</div>
);
}
export default VehicleCard;
import React from "react";
import VehicleCard from "./VehicleCard";
function App() {
const vehicles = [
{ model: "Tesla Model S", manufacturer: "Tesla", year: 2022, fuelType: "Electric" },
{ model: "Ford Mustang", manufacturer: "Ford", year: 2021, fuelType: "Gasoline" },
{ model: "Chevrolet Bolt", manufacturer: "Chevrolet", year: 2022, fuelType: "Electric" },
{ model: "BMW 3 Series", manufacturer: "BMW", year: 2021, fuelType: "Diesel" },
{ model: "Audi A6", manufacturer: "Audi", year: 2023, fuelType: "Hybrid" }
];
const containerStyle = {
};
<div style={containerStyle}>
{vehicles.map((vehicle, index) => (
<VehicleCard
key={index}
model={vehicle.model}
manufacturer={vehicle.manufacturer}
year={vehicle.year}
fuelType={vehicle.fuelType}
/>
))}
</div>
);
}
export default App;
Develop a React-JS application using a functional component that renders a list of countries with their capitals using .map(). Each list item must have a unique key, and the list should be styled using an external CSS file.
import React from "react";
import "./country.css";
function CountryList() {
const countries = [
{ name: "India", capital: "New Delhi" },
{ name: "United States", capital: "Washington, D.C." },
{ name: "Canada", capital: "Ottawa" },
{ name: "Germany", capital: "Berlin" },
{ name: "Australia", capital: "Canberra" },
{ name: "Japan", capital: "Tokyo" },
];
<div className="country-list-container">
<h2>Countries and Their Capitals</h2>
<ul className="country-list">
{countries.map((country, index) => (
<li key={index} className="country-item">
<strong>{country.name}</strong>: {country.capital}
</li>
))}
</ul>
</div>
);
}
export default CountryList;
.country-list-container {
font-family: Arial, sans-serif;
text-align: center;
margin: 20px;
}
.country-list {
list-style-type: none;
padding: 0;
}
.country-item {
font-size: 18px;
color: #333;
margin: 8px 0;
}
import React from "react";
import CountryList from "./country";
function App() {
<div>
<CountryList />
</div>
);
}export default App;
import React, { Component } from "react";
import PropTypes from "prop-types";
class CourseCard extends Component {
render() {
<div className="course-card">
<h2>{this.props.title}</h2>
<p><strong>Duration:</strong> {this.props.duration} weeks</p>
<p><strong>Instructor:</strong> {this.props.instructor}</p>
</div>
);
}
}
CourseCard.propTypes = {
};
export default CourseCard;
import React from "react";
import CourseCard from "./course";
function App() {
<div>
<CourseCard
duration={6}
instructor="John Doe"/>
<CourseCard
duration={8}
instructor="Jane Smith" />
</div>
);
}
export default App;
import React, { Component } from "react";
class RestaurantList extends Component {
render() {
const restaurants = [
{
{ id: 1, item: "Margherita" },
{ id: 2, item: "Pepperoni" },
{ id: 3, item: "BBQ Chicken" },
{ id: 4, item: "Vegetarian" },
},
{
{ id: 1, item: "California Roll" },
{ id: 2, item: "Tuna Sashimi" },
{ id: 3, item: "Tempura" },
{ id: 4, item: "Miso Soup" },
},
{
{ id: 1, item: "Cheeseburger" },
{ id: 2, item: "Bacon Burger" },
{ id: 3, item: "Veggie Burger" },
{ id: 4, item: "Fries" },
},
];
<div className="restaurant-list">
<h2>Restaurant Menu List</h2>
<ul>
{restaurants.map((restaurant) => (
<li key={restaurant.id}>
<h3>{restaurant.name}</h3>
<ul>
{restaurant.menu.map((menuItem) => (
<li key={menuItem.id}>{menuItem.item}</li>
))}
</ul>
</li>
))}
</ul>
</div>
);
}
}
export default RestaurantList;
import React from "react";
import RestaurantList from "./restorent";
function App() {
<div>
<RestaurantList />
</div>
);
}
export default App;
import React from "react";
import PropTypes from "prop-types";
function CompanyDetails({ name, industry, employees }) {
<div className="company-details">
<h2>{name}</h2>
<p><strong>Industry:</strong> {industry}</p>
<p><strong>Number of Employees:</strong> {employees}</p>
</div>
);
}
CompanyDetails.propTypes = {
};
export default CompanyDetails;
import React from "react";
import CompanyDetails from "./Company";
function App() {
const companyData = {
};
<div>
<h1>Company Information</h1>
<CompanyDetails
name={companyData.name}
industry={companyData.industry}
employees={companyData.employees}
/>
</div>
);
}
export default App;
import React from 'react';
import PropTypes from 'prop-types';
class App extends React.Component {
render() {
<div>
<h2>Simple ReactJS Props validation example</h2>
<table>
<tr>
<th>Type</th>
<th>Value</th>
<th>Valid</th>
</tr>
<tr>
<td>Array</td>
<td>{String(this.props.propArray)}</td>
<td>{Array.isArray(this.props.propArray) ? "true" : "false"}</td>
</tr>
<tr>
<td>Boolean</td>
<td>{String(this.props.propBool)}</td>
<td>{typeof this.props.propBool === 'boolean' ? "true" : "false"}</td>
</tr>
<tr>
<td>Function</td>
<td>
{typeof this.props.propFunc === 'function'
: String(this.props.propFunc)}
</td>
<td>{typeof this.props.propFunc === 'function' ? "true" : "false"}</td>
</tr>
<tr>
<td>String</td>
<td>{this.props.propString}</td>
<td>{typeof this.props.propString === 'string' ? "true" : "False"}</td>
</tr>
<tr>
<td>Number</td>
<td>{this.props.propNumber}</td>
<td>{typeof this.props.propNumber === 'number' ? "true" : "False"}</td>
</tr>
</table>
</div>
);
}
}
App.propTypes = {
}
// App.defaultProps = {
//   propFunc: function (x) { return x * 10 },
// }
App.defaultProps = {
propFunc: "not a function",
}
export default App;