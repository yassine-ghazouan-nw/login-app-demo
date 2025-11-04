// server.js - Login server with CORS for demo
const express = require('express');
const app = express();

app.use(express.json());

// Enable CORS for all origins (demo only - don't do this in production!)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});
app.get(".well-known/apple-app-site-association", (req, res) => {
    return res.status(200).json({
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "WF434D82N7.com.theodo.xcodecloudtest",
        "paths": ["*"]
      }
    ]
  },
  "activitycontinuation": {
    "apps": ["WF434D82N7.com.theodo.xcodecloudtest"]
  },
  "webcredentials": {
    "apps": ["WF434D82N7.com.theodo.xcodecloudtest"]
  }
    })
});
// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'demo@example.com' && password === 'demo123') {
    res.status(200).json({ 
      message: 'Login successful',
      token: 'demo-token-' + Date.now()
    });
  } else {
    res.status(401).json({ 
      error: 'Invalid credentials' 
    });
  }
});

// Health check endpoint (optional, but useful)
app.get('/', (req, res) => {
  res.json({ status: 'OK', endpoint: '/login' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

