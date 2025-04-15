# Sentence-Construction
# React + Vite + TailwindCSS + ESLint Starter

This is a modern React project bootstrapped with [Vite](https://vitejs.dev/), styled with [TailwindCSS](https://tailwindcss.com/), and linted using [ESLint](https://eslint.org/) with React Hooks support.

## 🔗 Live Demo
Check out the live demo deployed on Vercel:
👉https://sentence-construction-m58a.vercel.app/

## 🚀 Tech Stack

- ⚛️ **React** 19
- ⚡ **Vite** 6
- 🌬️ **TailwindCSS** 4
- 📦 **ESLint** with React Hooks and Refresh Plugins
- 🔍 **React Router DOM** 7


## 🔧 Available Scripts

In the project directory, you can run:

### `npm install`

Installs all dependencies listed in `package.json`.

### `npm run dev`

Runs the app in development mode using Vite.  
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### `npm run build`

Builds the app for production to the `dist` folder.

### `npm run preview`

Previews the production build locally.

### `npm run lint`

Runs ESLint on all JavaScript/JSX files.

## 📦 Dependencies

- `react`, `react-dom`: Core React libraries
- `react-router-dom`: Client-side routing
- `tailwindcss`, `@tailwindcss/vite`: Utility-first CSS framework
- `eslint`, `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`: Linting tools

## 🛠️ ESLint Configuration

The ESLint setup includes:

- Rules from `@eslint/js`
- React Hooks rules
- Warning on non-exported components for HMR compatibility
- Custom rule to ignore unused variables starting with uppercase letters or underscores (`^[A-Z_]`)

```js
'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }]
```
# 🌐 Browser Compatibility
The project is configured for modern browsers (via Vite's default settings).

# 🧪 Future Enhancements
Add TypeScript support

Integrate testing (e.g., Jest, React Testing Library)

Add CI/CD pipeline and deployment script

# 📄 License
This project is open source and available under the MIT License.


