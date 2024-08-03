import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import { body, validationResult } from 'express-validator';

dotenv.config();
const app = express();
const server = http.createServer(app);
const PORT = 3001;
app.use(cors());

const prisma = new PrismaClient();

// TOKEN VERIFICATION
const verifyAuthToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// USER REGISTRATION API REQUIRED PARAMS (email,password)
app.post("/register", [
  body('email').isEmail(),
  body('password').isLength()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(406).json({ error: 'User already exists' });
  }
});

// USER LOGIN API  REQUIRED PARAMS (email,password)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  res.json({ token });
});

app.post("/create", verifyAuthToken, [body('name').not().isEmpty(), body('description').not().isEmpty(), body('price').isFloat({ gt: 0 })], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, description, price } = req.body;
    const userId = req.user.userId;
    const toy = await prisma.toy.create({
      data: {
        name,
        description,
        price,
        userId
      }
    });
    res.status(201).json(toy);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/:name', verifyAuthToken, async (req, res) => {
  const { name } = req.params;
  const toy = await prisma.toy.findUnique({ where: { name } });
  if (!toy) return res.status(404).json({ error: 'Toy not found' });
  res.json(toy);
});

app.put('/:id', verifyAuthToken, async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    const toy = await prisma.toy.update({
      where: { id: parseInt(id) },
      data: { name, description, price }
    });
    res.json(toy);
  } catch (error) {
    res.status(404).json({ error: 'Toy not found' });
  }
});


app.delete('/:id', verifyAuthToken, async (req, res) => {
  const { id } = req.params;
  try {
      await prisma.toy.delete({
          where: { id: parseInt(id) }
      });
      res.status(204).end();
  } catch (error) {
      res.status(404).json({ error: 'Toy not found' });
  }
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ error: err.message });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
