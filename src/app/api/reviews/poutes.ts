import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      restaurantName,
      mealName,
      price,
      rating,
      comment,
      genre,
      imageUrl,
      location,
      userId,
    } = req.body;
    try {
      const newReview = await prisma.review.create({
        data: {
          restaurantName,
          mealName,
          price,
          rating,
          comment,
          genre,
          imageUrl,
          location,
          userId,
        },
      });
      res.status(200).json(newReview);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
    try {
      const reviews = await prisma.review.findMany();
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).end();
  }
}
