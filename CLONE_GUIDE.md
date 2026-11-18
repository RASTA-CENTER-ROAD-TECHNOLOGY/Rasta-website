# Clone and Setup Guide

Follow these steps to clone the RASTA Center for Road Technology website repository onto another computer.

## 1. Install Required Software

Install these tools on the target computer before you clone the repository:

1. **Git**: Download from `https://git-scm.com/downloads`
2. **Node.js (v18 or later, with npm)**: Download from `https://nodejs.org/`

Verify both installations in a terminal:

```bash
git --version
node --version
npm --version
```

## 2. Clone the Repository

Open a terminal in the folder where you want to store the project, then run:

```bash
git clone https://github.com/RASTA-CENTER-ROAD-TECHNOLOGY/Rasta-website.git
cd Rasta-website
```

If you need push access on a new computer, sign in with your authorized GitHub account (`Kart-0010-0101` or `rasta-design`) when prompted by Git Credential Manager.

## 3. Install Project Dependencies

Install all JavaScript packages defined in `package.json` (`react`, `three`, `gsap`, `lucide-react`, and Vite):

```bash
npm install
```

## 4. Start the Development Server

Start the local Vite server:

```bash
npm run dev
```

Open `http://localhost:5173/` in your browser. Because `vite.config.js` enables `host: true`, you can also open the network URL printed in the terminal to test on a mobile device on the same Wi-Fi network.

All 3D assets (`public/models/rasta_highway.glb` and `public/models/pavement_strata.glb`) and the brochure PDF (`public/RASTA_Complete_College_Brochure_2026.pdf`) are already included in the repository.

## 5. Build and Preview Production Output

To verify the production bundle locally:

```bash
npm run build
npm run preview
```

This creates the optimized output in the `dist` directory.

## 6. Sync Changes Between Devices

Before you start work on a device, pull the latest commits:

```bash
git pull origin main
```

After you make edits, commit and push them to GitHub:

```bash
git add .
git commit -m "Describe your change"
git push origin main
```
