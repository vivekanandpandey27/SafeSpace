# 🚀 Frontend Mastery Guide — FTE 2027 Batch
### Built around your **SafeSpace** Mental Health Platform project

> This is your personal, project-tied, interview-ready guide.
> Every concept explained here is **directly traceable** to your SafeSpace codebase.
> Read line by line. Understand deeply. Win every interview.

---

## 📌 TABLE OF CONTENTS

1. How the Web Works — High-Level Flow
2. How a React App Boots Up — From index.html to UI
3. JSX — What It Really Is
4. Components — The Building Blocks
5. Props — How Components Talk
6. State — Memory of a Component
7. The Hooks System — Deep Dive (useState, useEffect, useContext, useNavigate, useParams, useLocation)
8. Context API — Global State in SafeSpace
9. React Router — Navigation Without Page Reload
10. API Calls with Axios — Talking to the Backend
11. Authentication Flow — JWT + Google OAuth
12. Forms in React — Controlled vs Uncontrolled
13. Event Handling — User Interactions
14. Conditional Rendering — Show/Hide Logic
15. Lists and Keys — Rendering Collections
16. Lifting State Up — Component Communication
17. Tailwind CSS — Utility-First Styling
18. Vite — The Build Tool
19. localStorage — Persisting Data in Browser
20. Payment Integration — Razorpay Flow
21. Performance Concepts
22. Virtual DOM — React's Secret Weapon
23. React Lifecycle — The Order of Events
24. Interview Questions — Categorized and Answered
25. Project-Specific Questions They WILL Ask

---

## 1. How the Web Works — High-Level Flow

### The Whole Picture

```
YOUR BROWSER       INTERNET          SERVER
------------       --------          ------
[Type URL] --> [DNS: URL→IP] --> [Server gets request]
                                      |
[Browser renders HTML] <-- [Server sends files back]
```

### Step-by-Step: What happens when you open SafeSpace

**Step 1: URL Entered**
- You type http://localhost:5173 (dev) or the live domain.
- Browser does a **DNS lookup** to get the server's IP address.

**Step 2: HTTP Request**
- Browser sends a GET request to that IP:port.
- Request includes headers (browser info, cookies, etc.)

**Step 3: Server Responds**
- In dev: Vite dev server responds.
- Sends back index.html — almost empty HTML.

**Step 4: Browser Parses HTML**
```html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```
Browser finds the script tag and fetches the JS bundle.

**Step 5: React Takes Over**
- main.jsx runs → React mounts into `<div id="root">`.
- Entire UI is rendered by JavaScript → SPA (Single Page Application).

**Step 6: API Calls**
- Components call `axios.get(backendUrl + '/api/doctor/list')`.
- Goes to Express backend → queries MongoDB → returns data.
- React updates UI with the data.

### 💡 Interview Tip
> **Q: What is a SPA (Single Page Application)?**
> **A:** A web app that loads ONE HTML page and dynamically updates content using JavaScript WITHOUT full page reloads. SafeSpace is a SPA. Changing routes (like clicking "About") does not make a server request — React Router handles it client-side using the browser's History API.

---

## 2. How a React App Boots Up — From index.html to UI

### index.html
```html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```
- `id="root"` is the **mount point**. React renders EVERYTHING inside this div.
- `type="module"` = ES Modules. No old-school require().

### main.jsx — The Entry Point (Line by Line)

```jsx
import { createRoot } from 'react-dom/client'   // React 18 API
import './index.css'                              // Global styles (loaded once)
import App from './app.jsx'
import { BrowserRouter } from 'react-router-dom' // Enables routing
import AppContextProvider from './context/AppContext.jsx' // Global state
import { GoogleOAuthProvider } from '@react-oauth/google' // Google login wrapper

createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <BrowserRouter>
            <AppContextProvider>
                <App />
            </AppContextProvider>
        </BrowserRouter>
    </GoogleOAuthProvider>
)
```

| Line | Purpose |
|------|---------|
| createRoot(...) | React 18 API. Creates a React root attached to #root div. |
| .render(...) | Tells React what JSX tree to render inside that root. |
| GoogleOAuthProvider | Provides Google client ID to entire app. Any component can trigger Google login. |
| BrowserRouter | Enables URL-based navigation using HTML5 History API. |
| AppContextProvider | Global store — shares doctors, token, userData with all components. |
| App | Root component — has Navbar, Routes (all pages), Footer. |

**The Provider Hierarchy (order matters!):**
```
GoogleOAuthProvider
  └── BrowserRouter
        └── AppContextProvider
              └── App
                    ├── Navbar
                    ├── Routes (all pages render here)
                    └── Footer
```

### 💡 Interview Tip
> **Q: What is createRoot and how is it different from ReactDOM.render?**
> **A:** createRoot is the React 18 API that enables CONCURRENT RENDERING — React can interrupt low-priority renders to handle urgent updates (like user input). The old ReactDOM.render is synchronous and blocking. SafeSpace uses createRoot, which is the modern standard.

---

## 3. JSX — What It Really Is

JSX looks like HTML inside JavaScript but is NOT HTML. It is syntactic sugar for `React.createElement()`.

### What JSX Compiles To

Your NavBar.jsx:
```jsx
<nav className='navbar-glass'>
  <div onClick={() => navigate('/')}>SafeSpace</div>
</nav>
```

After Vite/Babel compilation:
```js
React.createElement("nav", { className: "navbar-glass" },
  React.createElement("div", { onClick: () => navigate('/') }, "SafeSpace")
)
```

React.createElement returns a plain JavaScript object describing the UI. React uses these objects to build the Virtual DOM.

### Key JSX Rules

| Rule | Wrong ❌ | Right ✅ |
|------|----------|----------|
| class → className | `<div class="box">` | `<div className="box">` |
| for → htmlFor | `<label for="img">` | `<label htmlFor="img">` |
| Self-closing tags | `<input>` | `<input />` |
| JS expressions | N/A | `{userData.name}` |
| One root element | Multiple roots | Wrap in `<>...</>` Fragment |
| camelCase events | `onclick` | `onClick` |
| Style is an object | `style="color:red"` | `style={{ color: 'red' }}` |

### Real Example — Login.jsx
```jsx
<h1 className='text-2xl font-bold mb-1'>
  {state === 'Sign Up' ? 'Create Your Account' : 'Welcome Back'}
</h1>
```
- Ternary inside `{}` — JavaScript expression inside JSX.
- className not class.
- style={{ ... }} uses double curly braces: outer for JSX expression, inner for JS object.

---

## 4. Components — The Building Blocks

A component is a **function that returns JSX**. That is the entire definition.

### Types in SafeSpace

**Page Components (/pages/)** — full pages mounted by React Router:
- Home.jsx, Login.jsx, Doctors.jsx, MyProfile.jsx, MyAppointment.jsx, About.jsx, Contact.jsx

**UI Components (/components/)** — reusable pieces:
- Navbar.jsx, Footer.jsx, Banner.jsx, TopDoctors.jsx, SpecialityMenu.jsx, RelatedDoctors.jsx

**Special:** Appointment.jsx (in /src/ root) — booking flow page

### Anatomy of a Component

```jsx
// 1. Imports
import React, { useState, useContext } from 'react'

// 2. Component Definition
const MyComponent = (props) => {

  // 3. Hooks — MUST be at the top level
  const [count, setCount] = useState(0)

  // 4. Event handlers / helper functions
  const handleClick = () => setCount(count + 1)

  // 5. Return JSX
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Click</button>
    </div>
  )
}

// 6. Export
export default MyComponent
```

### 💡 Interview Tip
> **Q: Difference between functional and class component?**
> **A:** Class components use this.state, this.setState(), lifecycle methods (componentDidMount, componentDidUpdate). Functional components use Hooks. Since React 16.8 (2019), functional components can do EVERYTHING class components can. All SafeSpace components are functional — this is the industry standard today.

---

## 5. Props — How Components Talk

Props = Properties passed from parent to child. They are **READ-ONLY** in the child.

### In SafeSpace

```jsx
// Appointment.jsx passes props to RelatedDoctors
<RelatedDoctors speciality={docInfo.speciality} docId={docId} />

// RelatedDoctors.jsx receives them via destructuring
const RelatedDoctors = ({ speciality, docId }) => {
  // speciality = "Anxiety & Stress" — directly available
  // docId = "doctor_abc123"
}
```

### Props vs State

| Feature | Props | State |
|---------|-------|-------|
| Where it comes from | Parent component | Component itself |
| Can it change? | No (read-only in child) | Yes (via setter function) |
| Who manages it? | Parent | The component |
| Triggers re-render? | Yes (when parent re-renders) | Yes (when setState called) |

### props.children — The Special Prop

In AppContextProvider:
```jsx
return (
    <AppContext.Provider value={value}>
        {props.children}
        // props.children = everything nested between the opening and closing tags
        // In main.jsx that is: <App />
    </AppContext.Provider>
)
```

---

## 6. State — Memory of a Component

useState gives a component memory that:
1. **Persists between renders** (unlike regular variables which reset)
2. **Triggers re-renders** when changed via the setter

### Syntax
```jsx
const [stateVariable, setterFunction] = useState(initialValue)
```

### Real State Variables in SafeSpace

**Login.jsx:**
```jsx
const [state, setState] = useState('Sign Up')    // 'Sign Up' or 'Login' — toggles form mode
const [name, setName] = useState('')             // controlled input
const [email, setEmail] = useState('')           // controlled input
const [password, setPassword] = useState('')     // controlled input
const [googleLoading, setGoogleLoading] = useState(false)  // loading spinner
```

**Navbar.jsx:**
```jsx
const [showMenu, setShowMenu] = useState(false)  // false=closed, true=open mobile menu
```

**MyProfile.jsx:**
```jsx
const [isEdit, setIsEdit] = useState(false)  // false=view mode, true=edit mode
const [image, setImage] = useState(false)    // File object or false
```

**Appointment.jsx:**
```jsx
const [docInfo, setDocInfo] = useState(null)    // The specific doctor's data
const [docSlots, setDocSlots] = useState([])    // 2D array: [day][timeSlots]
const [slotIndex, setSlotIndex] = useState(0)   // Which day tab is selected
const [slotTime, setSlotTime] = useState('')    // Which time was clicked
```

### The Golden Rules of State

**RULE 1: Never mutate state directly:**
```jsx
// WRONG — does NOT trigger re-render, React doesn't know it changed
userData.name = "New Name"

// CORRECT — always use the setter function
setUserData(prev => ({ ...prev, name: "New Name" }))
```

**RULE 2: State updates are asynchronous:**
```jsx
setCount(count + 1)
console.log(count)  // Still shows OLD value! React batches updates.
```

**RULE 3: Functional update form when new state depends on old state:**
```jsx
// Safe — always gets the most recent state value
setUserData(prev => ({ ...prev, phone: e.target.value }))
```
This pattern appears throughout MyProfile.jsx for nested state updates.

### 💡 Interview Tip
> **Q: What triggers a re-render in React?**
> **A:** Three things: (1) State changes via setState, (2) Props change from parent re-rendering, (3) Context value changes. React then compares new VDOM with old VDOM and only updates what changed in the real DOM.

---

## 7. The Hooks System — Deep Dive

Hooks are functions that let functional components access React features.

---

### 7.1 useEffect — Managing Side Effects

Side effects = things that happen OUTSIDE the render cycle: API calls, localStorage, timers, subscriptions.

```jsx
useEffect(() => {
  // Code that runs after render
  return () => {
    // Cleanup function (optional) — runs before next effect or on unmount
  }
}, [dependencies])
```

**Dependency Array Controls WHEN it runs:**

| Array | Runs |
|-------|------|
| Not provided | After EVERY render |
| `[]` (empty) | ONCE — after first render (componentDidMount) |
| `[token]` | After first render + whenever token changes |
| `[doctors, docId]` | Whenever doctors OR docId changes |

**AppContext.jsx examples:**
```jsx
// Runs once — fetch all doctors when app starts
useEffect(() => {
    getDoctorsData()
}, [])

// Runs when token changes — user logged in/out
useEffect(() => {
    if (token) {
        loadUserProfileData()
    }
}, [token])
```

**Login.jsx — Auto-redirect if already logged in:**
```jsx
useEffect(() => {
    if (token) {
        navigate('/')  // Don't show login page if already authenticated
    }
}, [token])
```

**Appointment.jsx — Two Chained Effects:**
```jsx
// Effect 1: When doctors array loads or docId changes, find THIS doctor
useEffect(() => {
    if (doctors.length > 0) {
        fetchDocInfo()  // → sets docInfo state
    }
}, [doctors, docId])

// Effect 2: When docInfo is set, generate available slots
useEffect(() => {
    if (docInfo) {
        getAvailableSlots()  // → sets docSlots state
    }
}, [docInfo])
```
These are CHAINED — Effect 1 triggers Effect 2 by setting docInfo.

---

### 7.2 useContext — Access Global State

```jsx
// In any component:
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
    const { token, setToken, userData } = useContext(AppContext)
    // Destructure only what you need
}
```

Used in: Navbar.jsx, Login.jsx, MyProfile.jsx, MyAppointment.jsx, Appointment.jsx.

Without useContext, token would have to be passed: App → Navbar → UserMenu → ProfilePic (prop drilling).

---

### 7.3 useNavigate — Programmatic Navigation

```jsx
const navigate = useNavigate()

navigate('/')             // Go to home
navigate('/login')        // Go to login
navigate('/my-appointments')  // Go to appointments
navigate(-1)              // Go back (browser history)
```

**Used in SafeSpace:**
- Navbar.jsx: After logout → navigate('/login')
- Login.jsx: After successful login → navigate('/')
- Appointment.jsx: After booking → navigate('/my-appointments')

---

### 7.4 useParams — Read Dynamic URL Parameters

```jsx
// Route definition in App.jsx:
<Route path='/appointment/:docId' element={<Appointment />} />

// URL: http://localhost:5173/appointment/doc_abc123

// Inside Appointment.jsx:
const { docId } = useParams()
// docId = "doc_abc123"

// Used to find the specific doctor:
const doc = doctors.find((doc) => doc._id === docId)
```

---

### 7.5 useLocation — Read Current URL

```jsx
const location = useLocation()
// location.pathname = '/doctors'
// location.search = '?filter=anxiety'
// location.hash = '#section1'

// In Navbar.jsx — show Admin Panel ONLY on home page:
{location.pathname === '/' && (
    <button onClick={() => window.open('...')}>Admin Panel</button>
)}
```

---

### 💡 Interview Tip — The Most Important Hook Rule
> **Q: Why can't you use hooks inside loops, conditions, or nested functions?**
> **A:** React relies on the ORDER of hook calls to track which state belongs to which hook. If you put useState inside an if block that sometimes runs and sometimes doesn't, the hook order changes between renders. React would assign the wrong state to the wrong variable. The "Rules of Hooks" (enforced by eslint-plugin-react-hooks) say: always call hooks at the top level of a function component, in the same order, every time.

---

## 8. Context API — Global State in SafeSpace

### The Problem: Prop Drilling

Without Context, to get userData into a button nested 5 levels deep:
```
App (has userData) → Layout → Navbar → UserMenu → Avatar → Button (needs userData)
```
Every component in between MUST receive and pass userData even if it doesn't use it.

### The Solution: Context

```
AppContextProvider (has userData — shares it globally)
  └── Navbar (reads userData directly)
  └── MyProfile (reads userData directly)
  └── Login (reads token, setToken directly)
```

### AppContext.jsx Explained Line by Line

```jsx
import { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from 'axios'

// STEP 1: Create the context object (this is what components import)
export const AppContext = createContext()

// STEP 2: Create the Provider component (wraps the whole app)
const AppContextProvider = (props) => {

    // App-wide constants
    const currencySymbol = '₹'
    const backendUrl = import.meta.env.VITE_BACKEND_URL  // from .env file

    // GLOBAL STATE — shared with all components
    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    //           Initialize from localStorage — user stays logged in after refresh!
    const [userData, setUserData] = useState(false)

    // API function — fetch all doctors
    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)   // Fill global doctors state
            } else {
                toast.error(data.message)  // Business logic error
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)     // Network error
        }
    }

    // API function — fetch logged-in user's profile
    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', {
                headers: { token }  // JWT sent in header for authentication
            })
            if (data.success) {
                // Defensive: provide fallback values to prevent null crashes
                const safeUserData = {
                    ...data.userData,
                    address: data.userData.address || { line1: '', line2: '' },
                    gender: data.userData.gender || '',
                    dob: data.userData.dob || ''
                }
                setUserData(safeUserData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // On app start → fetch doctors immediately
    useEffect(() => {
        getDoctorsData()
    }, [])

    // When token changes (login/logout) → load or clear user profile
    useEffect(() => {
        if (token) {
            loadUserProfileData()
        }
    }, [token])

    // STEP 3: The value object — what gets shared globally
    const value = {
        doctors, getDoctorsData,     // Share the data AND the refetch function
        currencySymbol,
        backendUrl,
        token, setToken,             // Share both the value and the setter
        userData, setUserData, loadUserProfileData
    }

    // STEP 4: Provide to all children
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
```

### Consuming Context in a Component
```jsx
// Any component can do this:
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Login = () => {
    // Destructure ONLY what this component needs
    const { backendUrl, token, setToken } = useContext(AppContext)
}
```

### 💡 Interview Tip
> **Q: Context API vs Redux — which and when?**
> **A:** Context API is built-in, simpler, great for moderate global state like auth tokens, user data, theme. Redux (specifically Redux Toolkit) has a structured store with actions/reducers — better for complex apps with many state updates, time-travel debugging needs. SafeSpace's state complexity is perfectly handled by Context. For a larger app with dozens of features and complex interactions, Redux Toolkit would be worth the setup cost.

---

## 9. React Router — Navigation Without Page Reload

### Core Concept

React Router intercepts link clicks and URL changes. Instead of the browser fetching a new page from the server, React Router updates the React component tree — showing the right "page" component for the URL. Zero server round-trips. Instant navigation.

### Setup in SafeSpace

main.jsx wraps everything in BrowserRouter:
```jsx
<BrowserRouter>  // Uses HTML5 History API (pushState, popState)
  <App />
</BrowserRouter>
```

App.jsx defines all routes:
```jsx
import { Route, Routes } from 'react-router-dom'

<Routes>
  <Route path='/' element={<Home />} />
  <Route path='/doctors' element={<Doctors />} />
  <Route path='/doctors/:speciality' element={<Doctors />} />  // Same component, different URL!
  <Route path='/login' element={<Login />} />
  <Route path='/about' element={<About />} />
  <Route path='/contact' element={<Contact />} />
  <Route path='/my-profile' element={<MyProfile />} />
  <Route path='/my-appointments' element={<MyAppointment />} />
  <Route path='/appointment/:docId' element={<Appointment />} />
</Routes>
```

### Navigation Methods

| Method | Use Case | Example |
|--------|----------|---------|
| `<Link to="/about">` | Simple link in JSX | Navigation links in footer |
| `<NavLink to="/doctors">` | Nav items needing active state | Navbar links |
| `navigate('/login')` | Programmatic redirect | After form submit, logout |

### NavLink with Active Styling (Navbar.jsx)

```jsx
<NavLink
  to={to}
  className={({ isActive }) =>
    `px-4 py-2 rounded-full text-xs tracking-wider transition-all duration-200 ${
      isActive
        ? 'text-white font-semibold'           // Currently active route
        : 'text-gray-600 hover:text-primary'   // Other routes
    }`
  }
  style={({ isActive }) =>
    isActive ? { background: 'linear-gradient(135deg, #4F46E5, #8B5CF6)' } : {}
  }
>
  {label}
</NavLink>
```
React Router checks if current URL matches the `to` prop and passes `isActive: true` to the className function.

### Dynamic Routes

```jsx
// Route with URL parameter
<Route path='/appointment/:docId' element={<Appointment />} />

// URL: /appointment/682ab3f1c2
// In Appointment.jsx:
const { docId } = useParams()   // docId = "682ab3f1c2"
const doc = doctors.find(d => d._id === docId)  // Find this specific doctor
```

### Same Component, Different URL

```jsx
// Both these routes render <Doctors />
<Route path='/doctors' element={<Doctors />} />
<Route path='/doctors/:speciality' element={<Doctors />} />

// In Doctors.jsx:
const { speciality } = useParams()
// If URL is /doctors → speciality is undefined → show all doctors
// If URL is /doctors/Anxiety → speciality = "Anxiety" → filter doctors
```

### The vercel.json Explanation

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
```
Without this: User navigates to /doctors, then refreshes. Vercel server looks for a /doctors file — doesn't exist → 404.
With this: All URLs serve index.html → React app loads → React Router handles the route.

### 💡 Interview Tip
> **Q: BrowserRouter vs HashRouter?**
> **A:** BrowserRouter uses HTML5 History API — clean URLs (/login, /doctors). Requires server to redirect all paths to index.html. HashRouter uses URL hashes (/#/login, /#/doctors) — works without server config (hash is never sent to server). BrowserRouter gives better URLs and SEO. SafeSpace uses BrowserRouter with Vercel's rewrite rule to handle refreshes.

---

## 10. API Calls with Axios — Talking to the Backend

### Why Axios over Fetch?

| Feature | Axios | Fetch |
|---------|-------|-------|
| Auto JSON parse | Yes — data is already parsed | No — need res.json() |
| Error on HTTP errors | Yes — 4xx/5xx throw | No — need manual check |
| Request interceptors | Yes | No |
| Request cancellation | Yes | Yes (AbortController) |
| Browser support | Excellent | Modern browsers only |

### Every API Pattern Used in SafeSpace

**Pattern 1: Simple GET (public)**
```jsx
// AppContext.jsx — no auth needed to list doctors
const { data } = await axios.get(backendUrl + '/api/doctor/list')
// axios.get returns { data, status, headers, config, request }
// Destructuring just 'data' from the response
```

**Pattern 2: GET with Authentication**
```jsx
// AppContext.jsx — needs JWT to get user profile
const { data } = await axios.get(backendUrl + '/api/user/get-profile', {
    headers: { token }  // Sends "token: jwt_string_here" as HTTP header
})
```

**Pattern 3: POST with JSON body**
```jsx
// Login.jsx — send credentials
const { data } = await axios.post(backendUrl + '/api/user/login', {
    email,    // JS object auto-serialized to JSON
    password  // Content-Type: application/json set automatically
})
```

**Pattern 4: POST with FormData (file upload)**
```jsx
// MyProfile.jsx — send text + image file
const formData = new FormData()
formData.append('name', userData.name)
formData.append('phone', userData.phone)
// Objects must be stringified — FormData only accepts strings and Blobs
formData.append('address', JSON.stringify(userData.address))
formData.append('gender', userData.gender)
formData.append('dob', userData.dob)
image && formData.append('image', image)  // File object only if user selected one

const { data } = await axios.post(
    backendUrl + '/api/user/update-profile',
    formData,
    { headers: { token } }  // Auth header
    // Content-Type: multipart/form-data set automatically by browser
)
```

**Pattern 5: POST with auth (appointment actions)**
```jsx
// MyAppointment.jsx — cancel appointment
const { data } = await axios.post(
    backendUrl + '/api/user/cancel-appointment',
    { appointmentId },          // Body
    { headers: { token } }      // Auth header in config object
)
```

### Response Handling Pattern
```jsx
try {
    const { data } = await axios.post(url, body, config)

    if (data.success) {
        // Happy path — operation succeeded
        toast.success(data.message)
        // Update local state, navigate, etc.
    } else {
        // Business logic failure — server responded 200 but op failed
        toast.error(data.message)  // e.g., "Email already exists"
    }
} catch (error) {
    // Network failure — server down, CORS, timeout, 500 error
    console.log(error)
    toast.error(error.message)
}
```

### 💡 Interview Tip
> **Q: What is CORS and when do you hit it?**
> **A:** CORS (Cross-Origin Resource Sharing) is a browser security mechanism. When your React app (localhost:5173) makes a request to a different origin (localhost:4000), the browser first sends a "preflight" OPTIONS request to check if the server allows cross-origin requests. Your backend must respond with headers like `Access-Control-Allow-Origin: *` or `http://localhost:5173`. If it doesn't, the browser blocks the response. The server must enable CORS — you can't fix it from the frontend.

---

## 11. Authentication Flow — JWT + Google OAuth

### JWT (JSON Web Token) Authentication — Step by Step

```
[User submits form] → Login.jsx
    ↓
[POST /api/user/login { email, password }] → Backend
    ↓
[Backend validates credentials against MongoDB]
    ↓
[If valid: create JWT token] → signed with secret key
    JWT contains: { userId, iat, exp } — NOT password!
    ↓
[Send token back: { success: true, token: "eyJ..." }]
    ↓
[Frontend receives token]
    localStorage.setItem('token', data.token)  // Persist across refresh
    setToken(data.token)                       // Update Context state
    ↓
[useEffect in Login.jsx detects token change → navigate('/')]
    ↓
[useEffect in AppContext detects token change → loadUserProfileData()]
    ↓
[All API calls send: headers: { token }]
    ↓
[Logout: localStorage.removeItem('token'), setToken(false), navigate('/login')]
```

### Token Persistence Logic

```jsx
// AppContext.jsx
// When app first loads, check if user was previously logged in:
const [token, setToken] = useState(localStorage.getItem('token') || '')
//                         ↑ If token exists in localStorage → user stays logged in
//                            If null → '' → falsy → show "Get Started"
```

### Google OAuth Flow — Step by Step

```
[User clicks "Continue with Google" button]
    ↓
[handleGoogleLogin() fires — from @react-oauth/google library]
    ↓
[Google popup window opens — user selects their Google account]
    ↓
[Google verifies user identity]
    ↓
[Google gives us an access_token (NOT a JWT — Google's token)]
    ↓
[We call Google's userinfo API with that access_token:]
GET https://www.googleapis.com/oauth2/v3/userinfo
Headers: { Authorization: "Bearer <access_token>" }
    ↓
[Google returns: { sub: googleId, email, name, picture }]
    ↓
[We send to OUR backend:]
POST /api/user/google { credential, googleId, email, name, picture }
    ↓
[Backend: find existing user by googleId/email OR create new user]
[Backend: create OUR app's JWT token]
    ↓
[Frontend receives OUR JWT token → same as normal login from here]
localStorage.setItem('token', data.token)
setToken(data.token)
```

From Login.jsx:
```jsx
const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
        setGoogleLoading(true)
        try {
            // Step 1: Get user info from Google
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
            )
            // Step 2: Extract user details
            const { sub: googleId, email, name, picture } = userInfo.data

            // Step 3: Send to our backend
            const { data } = await axios.post(backendUrl + '/api/user/google', {
                credential: tokenResponse.access_token,
                googleId, email, name, picture,
            })

            // Step 4: Store our JWT
            if (data.success) {
                localStorage.setItem('token', data.token)
                setToken(data.token)
                toast.success('Logged in with Google!')
            }
        } finally {
            setGoogleLoading(false)
        }
    },
    onError: () => toast.error('Google login failed.')
})
```

### Auto-Redirect Chain After Login

```jsx
// Login.jsx
useEffect(() => {
    if (token) { navigate('/') }
}, [token])
// When setToken(data.token) runs → token state changes → this useEffect fires → redirect

// AppContext.jsx
useEffect(() => {
    if (token) { loadUserProfileData() }
}, [token])
// Same trigger → loads user's name, image, etc. → Navbar shows profile picture
```

### 💡 Interview Tip
> **Q: Why is storing JWT in localStorage a security risk?**
> **A:** localStorage is accessible to ANY JavaScript on the page. An XSS attack (injecting malicious scripts) could steal the token. The more secure approach is httpOnly cookies — the browser sends them automatically and JavaScript CANNOT read them. However, httpOnly cookies have their own complexity (CSRF attacks, SameSite config). For SafeSpace (mental health app, no financial data stored), localStorage is a practical tradeoff. In a banking app, httpOnly cookies would be mandatory.

---

## 12. Forms in React — Controlled vs Uncontrolled

### Controlled Components (Used throughout SafeSpace)

React state is the **single source of truth** for the input's value. Every character typed updates state, state updates the input.

```jsx
// Login.jsx
const [email, setEmail] = useState('')

<input
    value={email}                               // Input's value = React state
    onChange={(e) => setEmail(e.target.value)}  // Every keystroke → update state
    type="email"
/>
```

Data flow on every keystroke:
```
User types 'v' → onChange fires → setEmail('v') → React re-renders → input shows 'v'
User types 'i' → onChange fires → setEmail('vi') → React re-renders → input shows 'vi'
... and so on
```

Why controlled? You have full control — you can validate on every keystroke, transform input, disable submit if fields empty, etc.

### Uncontrolled Components (NOT used in SafeSpace — for comparison)

```jsx
const emailRef = useRef(null)
<input ref={emailRef} type="email" />
// Access value only when needed: emailRef.current.value
// DOM controls its own value, React doesn't know about changes
```
Useful for file inputs or integrating with non-React libraries.

### Form Submission

```jsx
// Login.jsx
<form onSubmit={onSubmitHandler}>
  ...fields...
  <button type='submit'>Log In</button>
</form>

const onSubmitHandler = async (event) => {
    event.preventDefault()  // CRITICAL — stops browser's default behavior
    // Default behavior: serialize form data, make GET/POST to current URL, RELOAD page
    // With preventDefault: we handle submission ourselves via Axios
    try {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (data.success) { setToken(data.token) }
    } catch (error) { ... }
}
```

### FormData for File Uploads

```jsx
// MyProfile.jsx — sending both text data AND an image file
const formData = new FormData()
formData.append('name', userData.name)         // string
formData.append('address', JSON.stringify(userData.address))  // object → JSON string
image && formData.append('image', image)       // File object (binary data)

// Reading file from input:
<input
    type="file"
    onChange={(e) => setImage(e.target.files[0])}
    // e.target.files = FileList (array-like)
    // files[0] = first selected file as a File object
    hidden
/>

// Preview selected image before upload:
<img src={image ? URL.createObjectURL(image) : userData.image} />
//          ↑ Creates a temporary URL for a File object — no upload needed for preview
```

---

## 13. Event Handling — User Interactions

### Events Used in SafeSpace

| Event | Element | Example |
|-------|---------|---------|
| onClick | Buttons, divs, paragraphs | Cancel button, logout, slot selection |
| onChange | Input, select, textarea | Form fields, file input |
| onSubmit | Form | Login/register form |

### Inline vs Named Handlers

```jsx
// Inline — simple one-liner, ok for simple actions
<button onClick={() => setShowMenu(false)}>Close</button>
<button onClick={() => setSlotIndex(index)}>Day {index}</button>

// Named function — complex logic, better readability
const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
}
<p onClick={logout}>Logout</p>

// Named async function — for API calls
const cancelAppointment = async (appointmentId) => {
    try {
        const { data } = await axios.post(url, { appointmentId }, { headers: { token } })
        if (data.success) { toast.success(data.message); getUserAppointments() }
    } catch (error) { toast.error(error.message) }
}
<button onClick={() => cancelAppointment(item._id)}>Cancel</button>
//              ↑ Arrow function wrapper needed to pass arguments
```

### The Synthetic Event Object

```jsx
<input onChange={(e) => setEmail(e.target.value)} />
// e = React's SyntheticEvent (cross-browser wrapper over native DOM event)
// e.target = the DOM element (<input>)
// e.target.value = current text in the input
// e.preventDefault() = stop default browser behavior
// e.stopPropagation() = stop event bubbling up to parent elements
```

---

## 14. Conditional Rendering — Show/Hide Logic

React renders UI conditionally using regular JavaScript expressions inside JSX.

### Pattern 1: Ternary (choose between two things)

```jsx
// Navbar.jsx — profile vs login button
{token && userData ? (
    <div className='profile-dropdown'>
        <img src={userData.image} />
        {/* dropdown menu */}
    </div>
) : (
    <button onClick={() => navigate('/login')}>Get Started</button>
)}
```

```jsx
// Login.jsx — form heading
<h1>
    {state === 'Sign Up' ? 'Create Your Account' : 'Welcome Back'}
</h1>
```

```jsx
// MyProfile.jsx — editable vs display mode for every field
{isEdit ? (
    <input value={userData.name} onChange={(e) => setUserData(...)} />
) : (
    <p>{userData.name}</p>
)}
```

### Pattern 2: Short-Circuit && (render or nothing)

```jsx
// Only show when condition is true
{location.pathname === '/' && <button>Admin Panel</button>}
{googleLoading && <LoadingSpinner />}
{!token && <button>Get Started</button>}
{state === 'Sign Up' && <div>Name field</div>}
```

### Pattern 3: Return null (prevent render)

```jsx
// MyProfile.jsx — don't render until data is loaded
return userData ? (
    <div>...entire profile UI...</div>
) : null

// Appointment.jsx — don't render until doctor data is fetched
return (
    docInfo && (
        <div>...entire appointment UI...</div>
    )
)
```

### Pattern 4: Complex State Machine (Appointment Status)

MyAppointment.jsx shows different buttons based on appointment flags:

```jsx
// Pay Online — not cancelled, not paid, not completed, no payment selected
{!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
    <button onClick={() => setPayment(item._id)}>Pay Online</button>
)}
// Razorpay — payment selected (user clicked Pay Online)
{!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
    <button onClick={() => appointmentRazorpay(item._id)}>Razorpay</button>
)}
// Paid — already paid, not completed
{!item.cancelled && item.payment && !item.isCompleted && (
    <button disabled>Paid</button>
)}
// Completed — session done
{item.isCompleted && (
    <button disabled>Session Completed</button>
)}
// Cancel — not cancelled, not completed
{!item.cancelled && !item.isCompleted && (
    <button onClick={() => cancelAppointment(item._id)}>Cancel Session</button>
)}
// Cancelled — was cancelled
{item.cancelled && !item.isCompleted && (
    <button disabled>Session Cancelled</button>
)}
```
This is a real-world state machine rendered in JSX.

---

## 15. Lists and Keys — Rendering Collections

### .map() — Standard Way to Render Lists

```jsx
// Navbar.jsx — DRY approach: nav links from array
const navLinks = [
    { to: '/', label: 'HOME' },
    { to: '/doctors', label: 'OUR THERAPISTS' },
    { to: '/about', label: 'ABOUT' },
    { to: '/contact', label: 'CONTACT' },
]

<ul>
    {navLinks.map(({ to, label }) => (
        <li key={to}>              // key={to} — unique, stable identifier
            <NavLink to={to}>{label}</NavLink>
        </li>
    ))}
</ul>
```

```jsx
// MyAppointment.jsx — render list of appointments
{appointments.map((item, index) => (
    <div key={index}>   // Using index — works but not ideal (explained below)
        <p>{item.docData.name}</p>
        ...
    </div>
))}
```

### Why is the key Prop Required?

React uses keys to identify which items changed, were added, or removed.

WITHOUT key:
- React re-renders the ENTIRE list on any change.
- Animations break, inputs lose focus.

WITH key:
- React tracks each item by its key.
- Only changed items re-render. Much more efficient.

### Why Index as Key is Not Ideal

```jsx
// If appointments = [A, B, C] with keys [0, 1, 2]
// User cancels B → appointments = [A, C]
// New keys: [0, 1] — key 1 now refers to C, not B!
// React thinks item 1 changed, item 2 was removed → wrong diff
```

Better:
```jsx
{appointments.map((item) => (
    <div key={item._id}>   // Stable, unique database ID
```

### .filter() + .map() — Filter Then Render

```jsx
// Doctors.jsx — show only filtered speciality
const filteredDoctors = speciality
    ? doctors.filter(d => d.speciality === speciality)
    : doctors

{filteredDoctors.map(doc => <DoctorCard key={doc._id} doc={doc} />)}
```

---

## 16. Lifting State Up — Component Communication

When siblings need to share state, the state must live in their common parent.

### How SafeSpace Does It

Problem: Login page must update the token. Navbar must read the token. They are siblings.

Without lifting:
```
App
  ├── Login (sets token — but where to store it?)
  └── Navbar (reads token — can't access Login's state)
```

Lifted to AppContext (common ancestor):
```
AppContext (owns token state)
  └── App
        ├── Login → calls setToken() from context → token updates in AppContext
        └── Navbar → reads token from context → re-renders to show profile
```

The flow:
```
User logs in → Login.jsx calls setToken(data.token)
→ AppContext's token state changes
→ React re-renders all consumers of AppContext
→ Navbar reads new token → shows profile picture
→ MyProfile reads new userData → shows user info
```

This is React's unidirectional data flow: state goes DOWN (via context/props), events go UP (via setter functions).

---

## 17. Tailwind CSS — Utility-First Styling

### The Philosophy

Write styles AS utility class names directly in JSX. No separate CSS files for component-level styles.

```jsx
// Traditional CSS approach:
// Button.css: .primary-btn { background: indigo; color: white; padding: ... }
// Button.jsx: <button className="primary-btn">Click</button>

// Tailwind approach:
<button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors duration-200">
  Click
</button>
```

### Most Important Classes Used in SafeSpace

**Layout:**
```
flex           → display: flex
items-center   → align-items: center
justify-between → justify-content: space-between
grid           → display: grid
gap-3          → gap: 12px (between flex/grid children)
```

**Sizing:**
```
w-10 h-10     → width: 40px; height: 40px
w-full        → width: 100%
min-h-screen  → min-height: 100vh
max-w-md      → max-width: 28rem
```

**Spacing:**
```
px-4 py-2     → padding: 8px 16px
m-4 mt-6      → margin: 16px; margin-top: 24px
```

**Typography:**
```
text-sm text-lg text-2xl  → font sizes
font-bold font-semibold    → font weight
text-gray-600              → color
text-center                → text-align: center
tracking-wider             → letter-spacing
```

**Visual:**
```
rounded-full rounded-xl rounded-2xl → border-radius
shadow-card                          → custom box-shadow
border border-indigo-200             → border
overflow-hidden                      → overflow: hidden
opacity-60                           → opacity: 0.6
```

**Positioning:**
```
relative          → position: relative
absolute          → position: absolute
fixed             → position: fixed
inset-0           → top:0; right:0; bottom:0; left:0
z-50              → z-index: 50
```

**Animation / Transitions:**
```
transition-all duration-200  → all properties transition over 200ms
translate-x-0                → translateX(0) — in view
translate-x-full             → translateX(100%) — off screen to right
```

### Mobile Navbar Animation — How It Works

```jsx
// The mobile menu overlay
<div className={`fixed inset-0 z-50 transition-all duration-300 
    ${showMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
    
    {/* Slide-in panel */}
    <div className={`absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl 
        transition-transform duration-300 
        ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        ...
    </div>
</div>
```

When showMenu = false: opacity-0 (invisible) + translate-x-full (off-screen right)
When showMenu = true: opacity-100 (visible) + translate-x-0 (on-screen)
The `transition-all duration-300` creates smooth 300ms animation between states.

### Responsive Design

```jsx
// "hidden md:flex" pattern throughout Navbar
<ul className='hidden md:flex items-center gap-1'>
    {/* Desktop nav — only visible on screens >= 768px */}
</ul>

<img className='w-6 md:hidden cursor-pointer' />
{/* Hamburger — only visible on screens < 768px */}
```

Tailwind breakpoints (mobile-first):
- No prefix: applies to ALL screen sizes
- sm: (>= 640px), md: (>= 768px), lg: (>= 1024px), xl: (>= 1280px)

### Custom Tailwind in tailwind.config.js

```js
extend: {
    colors: {
        'primary': '#4F46E5',     // text-primary, bg-primary, border-primary
        'secondary': '#8B5CF6',   // text-secondary
    },
    boxShadow: {
        'card': '...',            // shadow-card
        'card-hover': '...',      // shadow-card-hover
    }
}
```

### Custom Component Classes in index.css

```css
/* These compose Tailwind utilities into reusable class names */
.btn-primary {
    @apply bg-gradient-to-r from-primary to-secondary text-white ...;
}
.safespace-input {
    @apply w-full border border-gray-200 rounded-xl px-4 py-2.5 ...;
}
.slot-day {
    @apply flex flex-col items-center p-3 rounded-xl border ...;
}
.slot-day.active {
    @apply bg-primary text-white border-primary;
}
```

### 💡 Interview Tip
> **Q: Tailwind pros and cons?**
> **Pros:** No CSS file switching, consistent design tokens, responsive system built-in, no naming conflicts, PurgeCSS removes unused styles (tiny production bundle).
> **Cons:** JSX looks verbose, learning all utility names, harder to create truly dynamic styles (need inline style for computed values). SafeSpace uses BOTH Tailwind utilities AND custom CSS (@apply classes) — best of both worlds.

---

## 18. Vite — The Build Tool

### What Vite Does

1. **Development:** Serves files instantly using native ES modules. No bundling needed in dev.
2. **Hot Module Replacement:** When you save a file, only that module updates in the browser. No full reload.
3. **Production Build:** Uses Rollup to bundle, tree-shake, and minify everything.
4. **JSX Transform:** Converts JSX to React.createElement() calls via @vitejs/plugin-react.

### Why Vite Over CRA?

CRA (Create React App) uses Webpack:
- Webpack bundles EVERYTHING before starting the dev server → 30+ second startup
- Webpack rebundles on every save → slow HMR

Vite:
- Dev server starts in < 1 second (serves ES modules natively, browser does the bundling)
- HMR is instant (only the changed module is replaced)
- Production uses Rollup (better tree-shaking than Webpack)

### vite.config.js — Your Config

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],   // Enables JSX support + React Fast Refresh (HMR)
    server: { port: 5173 }  // Dev server port (default is also 5173)
})
```

### Environment Variables in Vite

```
# .env file (never commit this!)
VITE_BACKEND_URL=http://localhost:4000
VITE_GOOGLE_CLIENT_ID=123456.apps.googleusercontent.com
VITE_RAZORPAY_KEY_ID=rzp_test_xyz
```

```jsx
// Access in React code:
const backendUrl = import.meta.env.VITE_BACKEND_URL
// import.meta.env is Vite's way (NOT process.env which is Node.js)
// MUST start with VITE_ — other variables are NOT exposed to the browser (security)
```

### npm Scripts in package.json

```json
"scripts": {
    "dev": "vite --host",        // Start dev server (--host exposes on network)
    "build": "vite build",       // Production build → dist/ folder
    "lint": "eslint .",          // Run ESLint
    "preview": "vite preview"    // Preview production build locally
}
```

---

## 19. localStorage — Persisting Data in Browser

### The Core API

```js
localStorage.setItem('key', 'value')          // Store (value must be string)
localStorage.getItem('key')                    // Read (returns null if not found)
localStorage.removeItem('key')                 // Delete one item
localStorage.clear()                           // Delete all items

// Storing objects (must serialize):
localStorage.setItem('user', JSON.stringify({ name: 'Vivek', age: 22 }))
const user = JSON.parse(localStorage.getItem('user'))
```

### How SafeSpace Uses localStorage

```jsx
// After successful login — persist the JWT
localStorage.setItem('token', data.token)  // Login.jsx
setToken(data.token)                       // Update React state too

// On page load — restore previous session
const [token, setToken] = useState(localStorage.getItem('token') || '')
// If 'token' key exists → user stays logged in across refreshes
// If null → '' → falsy → show login button

// On logout — clear the session
localStorage.removeItem('token')  // Navbar.jsx
setToken(false)                   // Clear React state
navigate('/login')                // Redirect
```

### localStorage vs Other Storage Options

| Feature | localStorage | sessionStorage | Cookies | Memory (React State) |
|---------|--------------|----------------|---------|---------------------|
| Persists after close | Yes | No | Depends | No |
| Size | ~5-10MB | ~5MB | ~4KB | Unlimited |
| JavaScript accessible | Yes | Yes | Yes (unless httpOnly) | Yes |
| Sent to server auto | No | No | Yes | No |
| Good for | Auth tokens, preferences | Form data | Server-side auth | Runtime state |

---

## 20. Payment Integration — Razorpay Flow

### The Complete Payment Journey

```
User sees appointment → clicks "Pay Online"
    ↓
State: setPayment(item._id) — track which appointment is being paid
    ↓
Razorpay button appears → User clicks it
    ↓
Frontend: POST /api/user/payment-razorpay { appointmentId } + JWT
    ↓
Backend: Calls Razorpay API to create an ORDER
Backend: Sends back { id: "order_xyz", amount: 50000, currency: "INR" }
    ↓
Frontend: new window.Razorpay(options) → opens Razorpay modal
    ↓
User selects payment method (UPI, Card, NetBanking) and pays
    ↓
Razorpay: calls handler({ razorpay_payment_id, razorpay_order_id, razorpay_signature })
    ↓
Frontend: POST /api/user/verifyRazorpay with all three values + JWT
    ↓
Backend: Verifies signature using HMAC-SHA256 with secret key
Backend: If valid → marks appointment.payment = true in MongoDB
    ↓
Frontend: navigate('/my-appointments'), getUserAppointments()
UI: Shows "✅ Paid" instead of pay button
```

From MyAppointment.jsx:
```jsx
// Step 1: Open Razorpay modal
const initPay = (order) => {
    const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,  // Public key (safe to expose)
        amount: order.amount,
        currency: order.currency,
        name: 'Session Payment',
        description: 'Therapy Session Payment',
        order_id: order.id,
        receipt: order.receipt,
        handler: async (response) => {
            // Called automatically when payment succeeds
            const { data } = await axios.post(
                backendUrl + "/api/user/verifyRazorpay",
                response,  // { razorpay_payment_id, razorpay_order_id, razorpay_signature }
                { headers: { token } }
            )
            if (data.success) {
                navigate('/my-appointments')
                getUserAppointments()  // Refresh to show "Paid" status
            }
        }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()  // Opens the payment modal
}

// Step 2: Create order then initiate payment
const appointmentRazorpay = async (appointmentId) => {
    const { data } = await axios.post(
        backendUrl + '/api/user/payment-razorpay',
        { appointmentId },
        { headers: { token } }
    )
    if (data.success) {
        initPay(data.order)  // Opens modal with order details
    }
}
```

### 💡 Interview Tip
> **Q: Why is payment verification done server-side?**
> **A:** Frontend code runs in the browser — any user can open DevTools and modify JavaScript. If we verified payment on frontend, a user could intercept the Razorpay response, fake a payment_id, and mark their appointment as paid without paying. Server-side verification uses HMAC-SHA256: only someone with the SECRET Razorpay key (stored on server, never in browser) can create a valid signature. This signature mathematically proves the payment_id and order_id are authentic.

---

## 21. Performance Concepts

### React.memo — Prevent Unnecessary Re-renders

```jsx
// Without memo: RelatedDoctors re-renders every time Appointment re-renders
// With memo: only re-renders when speciality or docId props change
const RelatedDoctors = React.memo(({ speciality, docId }) => {
    return <div>...</div>
})
```

### useMemo — Cache Expensive Computations

```jsx
// Without useMemo: recalculates filteredDoctors on EVERY render
// With useMemo: recalculates only when doctors or speciality changes
const filteredDoctors = useMemo(
    () => doctors.filter(d => d.speciality === speciality),
    [doctors, speciality]
)
```

### useCallback — Cache Functions

```jsx
// Without useCallback: getDoctorsData is a NEW function every render
// → any component receiving it as prop re-renders unnecessarily
const getDoctorsData = useCallback(async () => {
    const { data } = await axios.get(...)
    setDoctors(data.doctors)
}, [backendUrl])  // Only create a new function when backendUrl changes
```

### Lazy Loading / Code Splitting

Not used in SafeSpace but critical for interviews:

```jsx
import React, { Suspense, lazy } from 'react'
const About = lazy(() => import('./pages/About'))  // Only load when needed

<Suspense fallback={<div>Loading...</div>}>
    <Routes>
        <Route path='/about' element={<About />} />
    </Routes>
</Suspense>
```

Initial bundle = smaller. About.js only downloads when user navigates to /about.

---

## 22. Virtual DOM — React's Secret Weapon

### What is the Virtual DOM?

A Virtual DOM (VDOM) is a plain JavaScript object that represents the real DOM.

Real DOM:
```html
<div id="root">
  <nav>...</nav>
  <main>...</main>
  <footer>...</footer>
</div>
```

Virtual DOM (simplified):
```js
{
    type: 'div',
    props: { id: 'root' },
    children: [
        { type: 'nav', props: {}, children: [...] },
        { type: 'main', props: {}, children: [...] },
        { type: 'footer', props: {}, children: [...] }
    ]
}
```

React keeps TWO copies in memory: the current VDOM and the new VDOM.

### The Reconciliation Process

```
State changes → setToken(newToken)
       ↓
React re-runs component functions → generates NEW VDOM tree
       ↓
React DIFFS old VDOM vs new VDOM (O(n) heuristic algorithm)
       ↓
React finds ONLY what changed:
  e.g., "The <button> in Navbar changed from 'Get Started' to profile image"
       ↓
React makes ONLY THAT change to the real DOM
  document.querySelector('.navbar-right').innerHTML = '...'
       ↓
Browser repaints only the changed area → Very fast!
```

### Why Direct DOM Manipulation is Slow

Each real DOM operation can trigger:
1. **Reflow** — browser recalculates layout of all affected elements
2. **Repaint** — browser redraws pixels on screen

React batches all changes and makes ONE efficient DOM update instead of many small ones.

---

## 23. React Lifecycle — The Order of Events

### Mounting Phase (First time component appears)

```
1. Component function runs → initializes state with useState values
2. JSX is returned → React creates VDOM from JSX
3. React updates the real DOM
4. useEffect(() => {...}, []) runs → componentDidMount equivalent
   → In SafeSpace: getDoctorsData() runs when AppContext mounts
```

### Update Phase (State or props change)

```
1. State setter called → e.g., setSlotIndex(2)
2. Component function RUNS AGAIN (entire function, not just changed part)
3. New JSX returned → New VDOM created
4. Diff: new VDOM vs old VDOM
5. Minimal real DOM update
6. useEffect cleanup runs (if previous effect had cleanup)
7. useEffect with matching dependency runs
   → In Appointment.jsx: slot buttons re-render with new active state
```

### Unmounting Phase (Component removed — route changed)

```
1. React Router changes route → Appointment component unmounts
2. useEffect cleanup functions run
3. Component removed from real DOM
4. State and refs are garbage collected
```

### The Chained Effect Pattern in Appointment.jsx

```
Component mounts:
  → Effect 1: doctors or docId changed → fetchDocInfo() → setDocInfo(doc)

docInfo state changes (set by Effect 1):
  → Effect 2: docInfo changed → getAvailableSlots() → setDocSlots([...])

docSlots state changes (set by Effect 2):
  → Component re-renders → slot buttons appear on screen
```

Each Effect triggers the next one through state changes. This is the React way to handle dependent async operations.

---

## 24. Interview Questions — Categorized & Answered

### 🟢 Beginner

**Q: What is React?**
> A JavaScript library for building user interfaces. Component-based architecture. Uses Virtual DOM for efficient rendering. Maintained by Meta.

**Q: What is the difference between state and props?**
> State: local, mutable, managed by the component, triggers re-render when changed.
> Props: external, read-only, passed from parent, changes when parent re-renders.

**Q: What is useEffect?**
> Hook for side effects. Runs after render. Dependency array controls when it re-runs: [] runs once, [dep] runs when dep changes, nothing runs every render.

**Q: What is JSX?**
> Syntactic sugar for React.createElement(). Looks like HTML but compiles to JS function calls. Must follow rules: className, htmlFor, camelCase events, one root element.

**Q: What is Virtual DOM?**
> JS object representation of real DOM. React diffs old and new VDOM and only updates what changed in the real DOM.

---

### 🟡 Intermediate

**Q: Explain component lifecycle.**
> Mounting: initialize state → return JSX → mount to DOM → run useEffect(fn, []).
> Updating: state/props change → re-run function → new VDOM → diff → patch DOM → run useEffect(fn, [dep]).
> Unmounting: remove from DOM → run cleanup functions.

**Q: What is prop drilling and how do you fix it?**
> Passing props through multiple levels of components that don't need it, just to reach a deeply nested component. Fix with Context API (SafeSpace), Redux, Zustand, or Jotai.

**Q: React.memo vs useMemo vs useCallback?**
> React.memo: memoizes a COMPONENT, skips re-render if props unchanged.
> useMemo: memoizes a COMPUTED VALUE, recalculates only when deps change.
> useCallback: memoizes a FUNCTION, recreates only when deps change.

**Q: Controlled vs uncontrolled components?**
> Controlled: React state is the source of truth (value + onChange). Uncontrolled: DOM is source of truth (accessed via useRef). SafeSpace uses controlled everywhere.

**Q: What are React fragments?**
> <>...</> — return multiple elements without adding extra DOM nodes. Important for semantic HTML (can't add a div inside a table row).

**Q: event.preventDefault() vs event.stopPropagation()?**
> preventDefault(): stops the default browser action (page reload on form submit, link navigation).
> stopPropagation(): stops the event from bubbling up to parent elements.

---

### 🔴 Advanced

**Q: What is Concurrent Mode?**
> React 18 feature via createRoot. React can interrupt low-priority rendering to handle urgent updates (like user input). Makes large apps feel more responsive. SafeSpace enables this via createRoot.

**Q: Explain reconciliation.**
> React's diffing algorithm. O(n) complexity using heuristics: same element type = update props, different type = destroy and rebuild. Keys help React identify stable list items efficiently.

**Q: What is StrictMode?**
> Development tool that double-invokes renders and effects to expose side effects in impure components. No production impact.

**Q: What is automatic batching in React 18?**
> React 18 batches multiple setState calls even in async code (setTimeout, Promises, event handlers) into a single re-render. React 17 only batched inside React event handlers.

**Q: What is React Suspense?**
> A component that shows a fallback UI while children are "suspended" (loading data or lazy-loading code). Works with React.lazy() and libraries like React Query, SWR.

---

## 25. Project-Specific Questions They WILL Ask

---

### "Walk me through your project."

SafeSpace is a mental health appointment booking platform. Tech stack:
- Frontend: React 19 + Vite, Tailwind CSS, React Router v7
- State: Context API (AppContext for global state)
- Auth: JWT (email/password) + Google OAuth (@react-oauth/google)
- API: Axios for all HTTP calls to Express backend
- Payments: Razorpay integration
- Notifications: react-toastify

Users can browse mental health professionals by speciality, book appointment slots (auto-generated with conflict detection), pay via Razorpay, and manage their profile. There's also a separate admin panel.

---

### "How does authentication work?"

Two methods:
1. **Email/Password:** Submit form → POST /api/user/login → backend returns JWT → localStorage + Context state. Persists across refresh because useState initializes from localStorage.
2. **Google OAuth:** useGoogleLogin hook → Google popup → access_token → call Google userinfo API → get { googleId, email, name, picture } → POST to /api/user/google → backend returns our JWT → same storage flow.

Logout: clear localStorage, reset token state, redirect to login.

---

### "Explain your state management approach."

Context API with a single AppContext. Global state: doctors list, auth token, user profile data. Local state: component-specific (isEdit in MyProfile, showMenu in Navbar, slot selection in Appointment). Didn't need Redux because the app's state complexity doesn't justify the boilerplate.

---

### "How does appointment booking work?"

1. Click doctor card → navigate to /appointment/:docId
2. useParams gets docId from URL
3. useEffect finds doctor from context's doctors array using .find()
4. Second useEffect generates 7-day slot grid (30-min intervals, 10AM-9PM)
5. Slots exclude already-booked times by checking docInfo.slots_booked[date].includes(time)
6. User picks day → picks time → clicks "Book Your Session"
7. POST /api/user/book-appointment with docId, slotDate, slotTime, JWT header
8. Success → navigate('/my-appointments')

---

### "Walk me through the slot generation algorithm."

```jsx
// Appointment.jsx - getAvailableSlots()
for (let i = 0; i < 7; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)

    // Start time: today = next hour (or 10AM), other days = 10AM
    if (i === 0) {
        date.setHours(Math.max(date.getHours() + 1, 10), 0, 0, 0)
    } else {
        date.setHours(10, 0, 0, 0)
    }

    const endTime = new Date(date)
    endTime.setHours(21, 0, 0, 0)  // 9 PM cutoff

    const slots = []
    while (date < endTime) {
        const slotDate = `${date.getDate()}_${date.getMonth()+1}_${date.getFullYear()}`
        const slotTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        // Check if this slot is already booked
        const available = !docInfo.slots_booked?.[slotDate]?.includes(slotTime)
        if (available) slots.push({ datetime: new Date(date), time: slotTime })

        date.setMinutes(date.getMinutes() + 30)  // Next 30-minute slot
    }
    setDocSlots(prev => [...prev, slots])
}
```

---

### "How does Razorpay work in your project?"

1. User clicks "Pay Online" → setPayment(item._id) shows Razorpay button
2. User clicks Razorpay → POST /api/user/payment-razorpay { appointmentId }
3. Backend creates Razorpay order → returns { id, amount, currency }
4. Frontend opens Razorpay modal: new window.Razorpay(options).open()
5. User pays → Razorpay calls handler({ payment_id, order_id, signature })
6. POST /api/user/verifyRazorpay with response → backend verifies HMAC signature
7. Verified → appointment marked paid → UI refresh shows "Paid"

Security: Secret key never leaves server. Frontend only has the public key.

---

### "Why Vite over Create React App?"

Vite: <1 second dev start, instant HMR (native ES modules), smaller production bundles (Rollup).
CRA: 30+ second start (Webpack bundles everything first), slow HMR, larger bundles.
For a project this size, Vite is the modern standard. CRA is essentially deprecated.

---

### "How did you build the responsive mobile navbar?"

Desktop nav: `hidden md:flex` — invisible on mobile.
Hamburger icon: `md:hidden` — visible only on mobile.
Click hamburger → `setShowMenu(true)`.
Mobile menu: `fixed inset-0 z-50` full-screen overlay.
Slide-in panel: `translate-x-full` → `translate-x-0` with `transition-transform duration-300`.
NavLinks close menu on click: `onClick={() => setShowMenu(false)}`.

---

### "Explain optional chaining in your code."

Optional chaining (?.) safely accesses nested properties without throwing if an intermediate value is null/undefined.

```jsx
// Without optional chaining — crashes if slots_booked is undefined
docInfo.slots_booked[slotDate].includes(slotTime)  // TypeError!

// With optional chaining — returns undefined (falsy) instead of throwing
docInfo?.slots_booked?.[slotDate]?.includes(slotTime)
// If any part is null/undefined, whole expression short-circuits to undefined
```

Used throughout MyProfile.jsx: `userData.address?.line1` — safe if address is null.

---

### "Why JSON.stringify for address in profile update?"

FormData only accepts string and Blob values. Address is a JS object ({ line1: '', line2: '' }).
To send it via FormData (multipart), we serialize: `JSON.stringify(userData.address)`.
Backend parses back: `JSON.parse(req.body.address)`.
Standard pattern for sending structured data in file upload requests.

---

## Final Interview Tips

### The STAR Method for Project Questions

**Situation:** "In SafeSpace, we had..."
**Task:** "We needed to..."
**Action:** "I implemented..."
**Result:** "This resulted in..."

### Know Your Dependencies (package.json)

| Package | Purpose | Why we use it |
|---------|---------|---------------|
| react + react-dom | Core React | The framework itself |
| react-router-dom v7 | Client-side routing | SPA navigation |
| axios | HTTP client | API calls (better than fetch) |
| react-toastify | Toast notifications | User feedback on actions |
| @react-oauth/google | Google OAuth | Social login |
| tailwindcss | CSS framework | Utility-first styling |
| vite | Build tool | Fast dev, optimized prod |

### What Would You Improve?

- Add React.lazy + Suspense for page-level code splitting
- Replace localStorage JWT with httpOnly cookies (security)
- Add debouncing to doctor search/filter inputs
- Add error boundaries to catch unexpected runtime errors
- Use React Query or SWR for data fetching (caching, automatic refetch)

### JS Fundamentals to Know

- Closures, Promises, async/await, event loop
- Destructuring, spread operator, optional chaining
- Array methods: map, filter, reduce, find, some, every
- this binding, arrow functions
- Prototype chain (conceptually)
- var vs let vs const, hoisting

---

## Quick Revision Cheatsheet

```
REACT CORE:
  Virtual DOM → JS object → diff → minimal real DOM updates
  JSX → React.createElement() → VDOM object
  Component = function returning JSX
  Props = read-only data from parent
  State = mutable local memory, setter triggers re-render

HOOKS (always call at top level!):
  useState(init) → [value, setter]
  useEffect(fn, [deps]) → side effects after render
  useContext(Ctx) → consume global context value
  useNavigate() → navigate('/path') or navigate(-1)
  useParams() → { paramName } from URL
  useLocation() → { pathname, search, hash }
  useMemo(fn, [deps]) → cached computed value
  useCallback(fn, [deps]) → cached function reference
  useRef() → mutable ref, does NOT cause re-render

CONTEXT:
  createContext() → the context object
  <Ctx.Provider value={...}> → provides values
  useContext(Ctx) → consumes values

ROUTING (React Router v7):
  BrowserRouter → enables History API routing
  Routes + Route path='' element={} → path mapping
  NavLink → active-aware link with isActive prop
  Link → plain navigation link
  navigate('/path') → programmatic navigation
  useParams() → { :param } from URL
  useLocation() → current location object

AUTH FLOW:
  Login → POST /api/user/login → JWT
  Store: localStorage.setItem('token', jwt)
  State: setToken(jwt)
  Persist: useState(localStorage.getItem('token') || '')
  API calls: { headers: { token } }
  Logout: removeItem + setToken(false) + navigate('/login')

FORM HANDLING:
  Controlled: value={state} + onChange={(e) => setState(e.target.value)}
  Submit: event.preventDefault() + axios.post(url, body)
  Files: new FormData() + .append() + type="file" input

CONDITIONAL RENDERING:
  Ternary: {condition ? <A /> : <B />}
  Short-circuit: {condition && <A />}
  Null guard: {data ? <Component /> : null}

LISTS:
  {arr.map(item => <div key={item.id}>...</div>)}
  Key = stable unique ID (not index if list can reorder)

TAILWIND:
  Utilities: flex, grid, items-center, text-sm, font-bold, p-4, m-2, rounded-xl
  Responsive: sm: md: lg: xl:
  Hover: hover:bg-blue-50
  Custom: extend tailwind.config.js
  Component: @apply in CSS for reusable class names
```

---

> You built a real-world, production-deployed React application.
> You know WHY every line of code exists.
> Every concept in this guide is YOUR code — not a tutorial.
> Walk into that interview with confidence. You have shipped real features.

---

*SafeSpace Frontend | FTE 2027 Campus Prep | React + Vite + Tailwind + Router + Axios + Context + OAuth + Razorpay*
