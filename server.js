const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const users = []
const formDataCollection = []

// Register a new user
app.post('/users/register', (req, res) => {
  const { mobile, aadhar, password } = req.body

  if (!mobile || !aadhar || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  if (users.some((u) => u.mobile === mobile || u.aadhar === aadhar)) {
    return res.status(409).json({ message: 'User already exists' })
  }

  users.push({ mobile, aadhar, password })
  res.status(201).json({ message: 'User registered successfully' })
})

// Login user
app.post('/users/login', (req, res) => {
  const { mobile, aadhar, password } = req.body

  const user = users.find(
    (u) => (u.mobile === mobile || u.aadhar === aadhar) && u.password === password
  )

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  res.status(200).json({ message: 'Login successful' })
})

// Submit form data
app.post('/forms', (req, res) => {
  const { wardNo, parameterNo, model, concernMsg } = req.body

  if (!wardNo || !parameterNo || !model || !concernMsg) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const formData = { wardNo, parameterNo, model, concernMsg }
  formDataCollection.push(formData)
  res.status(201).json({ message: 'Form data submitted successfully' })
})

// Retrieve all form data
app.get('/forms', (req, res) => {
  res.status(200).json(formDataCollection)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
