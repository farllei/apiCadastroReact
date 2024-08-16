import express, { response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from 'cors';

// variable app contains all functionalities of express as a function
const prisma = new PrismaClient();
const app = express();
app.listen(3000);
app.use(express.json());
app.use(cors());

// HTTP Methods

// --------------------------------DELETE
app.delete("/users/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ message: "Usuario deletado com sucesso!" });
});

// --------------------------------PUT
app.put("/users/:id", async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });
  res.status(201).json(req.body);
});

// ---------------------------------POST
app.post("/users", async (req, res) => {
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });
  res.status(201).json(req.body);
});

// ----------------------------------GET
app.get("/users", async (req, res) => {
  let foundUsers = [];

  if (req.query) {
    foundUsers = await prisma.user.findMany({
      where: {
        name: req.query.name,
        email: req.query.email,
        age: req.query.age,
      },
    });
  } else {
    foundUsers = await prisma.user.findMany();
    
  }
  res.status(200).json(foundUsers);
});
