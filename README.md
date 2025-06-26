MINIMIND Educational App

MINIMIND is a React (Vite) app for children ages 6–12, featuring onboarding, authentication, course exploration, learning paths, and an AI chatbot. The app is styled with Tailwind CSS and inline CSS, and uses Figma assets for a playful, child-friendly UI.

Features

- Onboarding: Fun, age-appropriate welcome and setup flow.
- Authentication: Simple login/signup for kids.
- Course Exploration: Browse and preview courses.
- Learning Paths: Personalized learning journeys.
- AI Chatbot: Friendly, helpful assistant for learning.
- Custom Avatars: Uses Figma-exported PNGs for avatars.
- Modern UI: Styled with Tailwind CSS and inline styles for color accuracy.

Prerequisites

- Node.js (v16 or higher recommended)
- npm (v8 or higher) or yarn
- Git (to clone the repo)
- Figma assets: All images (e.g., /public/assets/faces/) must be present as exported from Figma.

Getting Started

1. Clone the Repository

   git clone https://github.com/your-username/minimind.git
   cd minimind

2. Install Dependencies

   Using npm:
   npm install

   Or with yarn:
   yarn

3. Add Figma Assets

   - Ensure all Figma-exported images (avatars, icons, etc.) are in the public/assets/ directory.
   - Example: public/assets/faces/face1.png, public/assets/logo.png, etc.

4. Start the Development Server

   npm run dev

   Or:
   yarn dev

   - The app will run at http://localhost:5173 by default.
   - If the port is in use, Vite will pick another (check your terminal output).

Project Structure

minimind/
├── public/
│   └── assets/
│       └── faces/
│           └── face1.png
│       └── logo.png
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js
├── package.json
└── README.md

Styling

- Tailwind CSS is used for layout and spacing.
- Inline CSS and CSS variables are used for colors to match the Figma design exactly.
- No external component library is required, but you may use one for accessibility or UI consistency if needed.

Troubleshooting

- Colors not showing?
  - Check that inline styles and CSS variables are present in components.
  - Ensure Tailwind is properly configured (tailwind.config.js).
- Images not displaying?
  - Make sure all image paths are correct and files are in public/assets/.
  - For Vite, use /assets/face1.png (not src/assets/).
- Port conflicts?
  - If localhost:5173 is busy, Vite will use another port (see terminal).
- Node.js not installed?
  - Download from nodejs.org.

Customization

- Add new avatars: Place PNGs in public/assets/faces/ and update the Avatar component if needed.
- Update colors: Edit inline styles or CSS variables in components.
- Change logo: Replace public/assets/logo.png.

Build for Production

npm run build

Or:
yarn build

- Output will be in the dist/ folder.

Deployment

- Deploy the dist/ folder to any static hosting (Vercel, Netlify, GitHub Pages, etc.).
- Ensure the public/assets/ directory is included.

Contact

For questions or help, contact the project maintainer or refer to the Figma design for UI details.

Enjoy building and using MINIMIND!
