const express = require("express");
const dotenv = require('dotenv');
const  mongoose = require("mongoose");
const cors = require('cors');
const Client = require('./model/Clients.model.js');

const app = express();
dotenv.config();

//middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// mongoDB setup
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((error) => {
  console.error("❌ MongoDB connection failed:", error.message);
  process.exit(1);
});

app.get('/', (req, res) => {
    res.send("hello")
});

// register new client
app.post('/api/clients', async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

//find All client
app.get('/api/clients', async (req, res) => {
  try {
    const client = await Client.find().sort({ createdAt: -1 });
    res.status(200).json(client)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

//find one client
app.get('/api/clients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id)
    res.status(200).json(client)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

//update client
app.put('/api/clients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByIdAndUpdate(id, req.body)
    if(!client){
      res.status(404).json("the client didn`t exist")
    }
    const updatedClient = await Client.findById(id)
    res.status(200).json(updatedClient)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

// delete client
app.delete('/api/clients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByIdAndDelete(id)
    if(!client){
      res.status(404).json("the client didn`t exist")
    }
    res.status(200).json("client deleted succesfull")
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});


// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});