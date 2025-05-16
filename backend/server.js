const express = require('express');
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/resources', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM product_details');
    res.json(rows);
  } catch (error) {
    console.error('Detailed error:', error); // More detailed error
    res.status(500).json({ 
      message: 'Failed to fetch resources',
      error: error.message 
    });
  }
});

app.post("/api/product", (req, res) => {
  try{
    const {title, author, views, likes, bgColor, type, section} = req.body;
    const newProduct = pool.query(
      "INSERT INTO product_details (title, author, views, likes, bgColor, type, section) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [title, author, views, likes, bgColor, type, section]
    );
    res.json(newProduct);
  }catch(error){
    console.error('Detailed error:', error); // More detailed error
    res.status(500).json({ 
      message: 'Failed to create product',
      error: error.message 
    });
  }
});

app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Check if user already exists
    const [existingUsers] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Insert new user
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );
    
    // Get the inserted user (for token creation)
    const [newUser] = await pool.query(
      'SELECT id, name, email FROM users WHERE id = ?',
      [result.insertId]
    );
    
    
    
    // Return user data and token
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser[0].id,
        name: newUser[0].name,
        email: newUser[0].email
      }
    });
    
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// User login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    // Check if user exists
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const user = users[0];
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    return res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});