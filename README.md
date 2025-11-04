# DEVELOPER AKADEMIE – URBAN EATS

## Overview

Urban Eats is a modern, interactive online food ordering application built with **HTML, CSS, and Vanilla JavaScript**. The project features a dynamic menu where users can browse different food categories, add dishes to the cart, switch between **delivery** and **pickup**, and view **subtotal, delivery fees, and total prices** in real-time. Designed with a **mobile-first approach**, the interface adapts seamlessly to all screen sizes.

### The Challenge

- Dynamically render categories and dishes using JavaScript
- Implement a fully functional shopping cart with add/remove/update functionality
- Enable a delivery/pickup toggle with real-time price updates
- Persist cart data using Local Storage
- Create a visually appealing, responsive layout with modern UI patterns

### Links

- **Solution URL:** [GitHub Repository](https://github.com/stefanstraeter/UrbanEats)
- **Live Site URL:** [Live Demo](https://stefanstraeter.github.io/UrbanEats/)

### Screenshot

![Urban Eats Screenshot](assets/img/screenshot.png)

---

## My Process

### Built With

- **HTML5** – semantic and accessible markup
- **CSS3** – custom properties, Grid & Flexbox layout
- **JavaScript (Vanilla)** – dynamic rendering, cart functionality, Local Storage persistence
- **Mobile-First Workflow** – optimized for small screens first
- **CSS Reset** – ensures consistent styling across browsers

### Key Features & Techniques

#### Dynamic Menu Rendering

- Food categories and dishes are loaded dynamically from a JavaScript array (`dishes`)
- `renderAllDishes()` and `createDishesHtml()` generate menu cards for each dish
- UI updates automatically when items are added or removed from the cart

#### Cart Functionality

- Users can add dishes to the cart, update quantities, or remove items
- Cart totals (subtotal, delivery fee, total) update in real-time
- Delivery/pickup toggle controls whether delivery fees are applied
- Cart contents persist in Local Storage

#### Responsive Design & Mobile-First Approach

- Flexible layouts using CSS Grid and Flexbox
- Scalable text and spacing using `clamp()` and CSS variables
- Mobile-first navigation and cart interface for small screens

#### Semantic HTML & Accessibility

- Uses meaningful HTML elements: `<header>`, `<main>`, `<section>`, `<aside>`
- Dish images include `alt` attributes
- Buttons and forms are accessible with `aria-label` attributes

#### Theming with CSS Variables

- Centralized design tokens with `:root` custom properties
- Easy to maintain and update colors, spacing, and typography

---

## Author

- GitHub: [@YOUR-USERNAME](https://github.com/stefanstraeter/)

# urban-eats
