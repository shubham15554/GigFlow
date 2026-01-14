# GigFlow - Gig Marketplace Platform

GigFlow is a full-stack application designed to connect freelancers with opportunities. Users can post gigs, browse open positions, apply for work, and manage their hiring process all in one place.

## 🚀 Live Demo
- **Frontend:** [https://gig-flow-khaki.vercel.app](https://gig-flow-khaki.vercel.app)
- **Backend API:** [https://gigflow-3j81.onrender.com](https://gigflow-3j81.onrender.com)

## 🛠 Tech Stack
- **Frontend:** React.js, Tailwind CSS, [Insert State Management, e.g., Redux Toolkit]
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens) with HttpOnly Cookies

## 📖 Key Features & Workflow

### 1. Authentication
* **Secure Signup/Login:** Users must authenticate to access the marketplace.
* **Protected Routes:** Only logged-in users can create or apply for gigs.

### 2. Dashboard & Discovery
* **Browse Gigs:** View all open opportunities posted by other users.
* **Search & Filter:** Find specific gigs using the search functionality.

### 3. User Management
* **Create Gigs:** Users can post their own gig requirements.
* **My Gigs:** A dedicated section to manage gigs you have personally posted.
* **My Bids:** Track all the applications you have submitted to other gigs.

### 4. Hiring Workflow
* **Application System:** Users can apply (bid) on any open gig.
* **Review Applications:** Gig owners can see a list of applicants for their specific gigs.
* **Hiring:** Owners have the ability to select and "Hire" the right candidate directly from the applications list.

## ⚙️ Local Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB Atlas account or local MongoDB

### Installation
1. **Clone the repository**
   ```bash
   git clone [https://github.com/shubham15554/GigFlow.git](https://github.com/shubham15554/GigFlow.git)
   cd GigFlow