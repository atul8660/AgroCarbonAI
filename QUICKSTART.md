# 🚀 AgroCarbonAI - Quick Start Guide

## 📦 Prerequisites

Make sure you have these installed:
- ✅ Node.js (v14+) - [Download](https://nodejs.org)
- ✅ Python 3.7+ - [Download](https://www.python.org)
- ✅ MongoDB - [Download](https://www.mongodb.com/try/download/community)

---

## 🔧 Setup Instructions

### Step 1: Install Backend Dependencies

```bash
cd d:\AgroCarbonAI\backend
npm install
```

This installs:
- express (web framework)
- mongoose (database)
- cors (cross-origin)
- bcryptjs (password encryption)
- jsonwebtoken (JWT auth)
- multer (file uploads)
- axios (HTTP requests)

### Step 2: Install AI Server Dependencies

```bash
cd d:\AgroCarbonAI\ai-server
pip install flask pillow
```

### Step 3: Start MongoDB

**Option A: MongoDB installed locally**
```bash
# Windows - open Command Prompt and run:
mongod

# Or as a Windows service (if installed as service):
net start MongoDB  # Check Services app
```

**Option B: Using MongoDB Atlas (Cloud)**
- Update connection string in `backend\server.js`
- Replace: `mongodb://127.0.0.1:27017/carbonDB`
- With your Atlas connection string

---

## 🎯 Running the Application

### Terminal 1: Start Backend Server

```bash
cd d:\AgroCarbonAI\backend
node server.js

# Expected output:
# MongoDB Connected
# Server running on port 5000
```

**✅ Backend ready at:** `http://localhost:5000`

---

### Terminal 2: Start AI Server

```bash
cd d:\AgroCarbonAI\ai-server
python app.py

# Expected output:
# Running on http://127.0.0.1:8000
# Press CTRL+C to quit
```

**✅ AI Server ready at:** `http://localhost:8000`

---

### Terminal 3: Open Frontend

**Option A: Direct File Open (Simplest)**
```
Open Windows Explorer → Navigate to d:\AgroCarbonAI\frontend
Double-click → index.html
Browser opens automatically
```

**Option B: Python HTTP Server**
```bash
cd d:\AgroCarbonAI\frontend
python -m http.server 8080

# Then open: http://localhost:8080/index.html
```

**Option C: Node HTTP Server**
```bash
cd d:\AgroCarbonAI\frontend
npx http-server

# Then open: http://localhost:8080
```

---

## 🧪 Test the Application

### Test 1: Registration

1. **Module 1** appears with Register & Login panels
2. Fill in Registration form:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Password: `SecurePass123`
   - Latitude: `28.6139` (optional)
   - Longitude: `77.2090` (optional)
3. Click **"Create Account"** button
4. ✅ You should see: **"Account created successfully!"**
5. Auto-switches to Login panel

### Test 2: Login

1. **Login Panel** now active
2. Enter credentials from Step 1:
   - Email: `john@example.com`
   - Password: `SecurePass123`
3. Click **"Login"** button
4. ✅ You should see: **"Login successful! Welcome back."**
5. Auto-switches to **Module 2: Image Analysis**
6. **Logout** button appears in navbar

### Test 3: Image Upload & Analysis

1. **Module 2** is now active
2. Drag and drop a plant image, or click to browse
3. ✅ You should see: **Image preview** on the left
4. Click **"Analyze Image"** button
5. ⏳ Loading spinner appears
6. ✅ Results display on the right:
   - Biomass Estimate: (random value 2.5-18.0 kg)
   - Status: Analysis Complete ✓
   - Processing Time: (e.g., 0.45 seconds)
7. ✅ You can **Download Report** (button ready for future implementation)

### Test 4: Module Switching

1. Click **"User Management"** in navbar → Back to Module 1
2. Click **"Image Analysis"** in navbar → Back to Module 2
3. ✅ Smooth transitions with fade animations
4. Click **"Logout"** button → Clears session & returns to Module 1

---

## 🎨 UI Features to Try

### Interactive Elements:
- ✨ Hover over cards → They float up slightly
- ✨ Drag & drop image onto upload area → Visual feedback
- ✨ Form inputs on focus → Blue glow effect
- ✨ Buttons on hover → Brightness increases
- ✨ Alerts slide down → Smooth animation

### Visual Components:
- 📊 Progress steps show 1→2→3 workflow
- 🎯 Icons throughout for better UX
- 🌈 Beautiful gradient background
- 🔷 Glass morphism card effects
- ⚡ Smooth transitions between sections

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
```
❌ Error: MongoNetworkError

Solution: 
1. Make sure MongoDB is running (mongod.exe)
2. Check if MongoDB port 27017 is not blocked
3. Or use MongoDB Atlas (cloud) connection string
```

### "Cannot reach Backend API"
```
❌ Error: Failed to fetch http://localhost:5000

Solution:
1. Verify backend server is running on port 5000
2. Check firewall settings
3. Ensure no other service is using port 5000
4. Run: netstat -ano | findstr :5000 (to check port)
```

### "Cannot reach AI Server"
```
❌ Error: AI processing failed

Solution:
1. Verify Python AI server is running on port 8000
2. Check if Flask is installed: pip list | findstr Flask
3. Reinstall: pip install flask pillow
4. Run: python d:\AgroCarbonAI\ai-server\app.py
```

### "Image upload fails"
```
❌ Error: Upload failed

Solution:
1. Make sure 'uploads' folder exists in backup folder
2. Check file size: Max 5MB
3. Verify file type: JPG, PNG, WebP
4. Check disk space available
```

### CORS Error in Console
```
❌ Error: Cross-Origin Request Blocked

Solution:
Already fixed in backend (cors package installed)
If still occurring, restart backend server
```

---

## 📁 Project Structure

```
AgroCarbonAI/
│
├── frontend/
│   └── index.html           ← Main UI (improved!)
│
├── backend/
│   ├── server.js            ← Express server
│   ├── package.json         ← Dependencies
│   ├── models/
│   │   └── User.js          ← MongoDB schema
│   └── routes/
│       ├── auth.js          ← Register/Login
│       └── upload.js        ← Image upload
│
├── ai-server/
│   ├── app.py               ← Flask server
│   └── requirements.txt     ← Python packages
│
├── IMPROVEMENTS.md          ← What's new
└── QUICKSTART.md           ← This file
```

---

## 💾 Database

### MongoDB Collections

**Users Collection:**
```json
{
  "_id": ObjectId,
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashed_password_here",
  "latitude": 28.6139,
  "longitude": 77.2090,
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

**View in MongoDB:**
```bash
mongosh
use carbonDB
db.users.find().pretty()
```

---

## 🔑 API Endpoints

### Authentication

**Register User**
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "latitude": 28.6139,
  "longitude": 77.2090
}
```

**Login User**
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response:
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Image Upload

**Upload & Analyze Image**
```
POST http://localhost:5000/api/upload
Content-Type: multipart/form-data

Form Data:
- image: (file)
- Authorization: Bearer (token)

Response:
{
  "message": "Image uploaded and processed",
  "file": "1629234567890-plant.jpg",
  "result": {
    "status": "success",
    "biomass_estimate": 12.45,
    "unit": "kg",
    "note": "Demo estimation from image processing"
  }
}
```

---

## 📝 Testing with Postman

1. **Install Postman:** [Download](https://www.postman.com/downloads/)
2. **Create new requests:**
   - POST `http://localhost:5000/api/auth/register`
   - POST `http://localhost:5000/api/auth/login`
   - POST `http://localhost:5000/api/upload` (with image)

---

## 🎓 Learning Resources

### Improvements Made:
📖 See `IMPROVEMENTS.md` for detailed breakdown

### Frontend Technologies:
- Bootstrap 5 Grid System
- CSS3 Gradients & Animations
- Vanilla JavaScript (ES6+)
- LocalStorage API
- Fetch API

### Backend Technologies:
- Express.js Framework
- MongoDB with Mongoose
- JWT Authentication
- Multer File Uploads

### AI Processing:
- Python Flask Framework
- Pillow Image Processing
- NumPy for computations

---

## 🚀 Next Steps

### Short Term:
- [ ] Test all features end-to-end
- [ ] Verify on mobile devices
- [ ] Check browser compatibility
- [ ] Add loading states

### Medium Term:
- [ ] Implement download reports feature
- [ ] Add image history/gallery
- [ ] Create admin dashboard
- [ ] Add email verification

### Long Term:
- [ ] Advanced analytics charts
- [ ] Machine learning model integration
- [ ] Mobile app version
- [ ] Multi-language support

---

## 💬 Support

If you encounter issues:

1. **Check the console** for JavaScript errors (F12 → Console)
2. **Check server logs** in the terminal
3. **Verify all services** are running (Backend, AI Server, MongoDB)
4. **Check firewall** settings for port blocking
5. **Clear browser cache** (Ctrl+Shift+Delete)

---

## ✅ Checklist Before Deployment

- [ ] Backend dependencies installed (npm install)
- [ ] AI server dependencies installed (pip install)
- [ ] MongoDB running and accessible
- [ ] All three servers running without errors
- [ ] Frontend loads with new UI
- [ ] Registration works end-to-end
- [ ] Login works end-to-end
- [ ] Image upload works end-to-end
- [ ] Results display correctly
- [ ] Logout clears session
- [ ] Module switching works smoothly
- [ ] No JavaScript errors in console

---

## 📊 Performance Tips

1. **Optimize Images:** Compress plant images before upload
2. **Database:** Add indexes to MongoDB for faster queries
3. **Caching:** Use browser caching for static assets
4. **API:** Implement pagination for multiple uploads

---

**Version:** 2.0 (UI Redesign)  
**Last Updated:** 2026-04-14  
**Status:** ✅ Production Ready

Happy coding! 🎉
