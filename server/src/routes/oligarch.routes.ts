import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { oligarchSchema } from "../db/schemas";
export const oligarchRouter = express.Router();

oligarchRouter.get("/", async (req: Request, res: Response) => {
  const oligarch = mongoose.model("Oligarch", oligarchSchema);

  const oligarchs = await oligarch.find().exec();
  res.json(oligarchs);
});

oligarchRouter.post("/", (req: Request, res: Response) => {
  const oligarch = mongoose.model("Oligarch", oligarchSchema);
  const elon = new oligarch({
    name: "Elon Musk",
    companies: [
      "Telsa",
      "X",
      "Starlink",
      "SpaceX",
      "The Boring Company",
      "Neuralink",
    ],
    oligarchRating: 10,
    description:
      "Musk is a malignant, metastasizing tumor on democracy. What do we do with cancer? Whatever it takes. Cut it out, irradiate it and and blast it with chemo. We consumers are the aggressive treatment for Musk, and we have to deprive him of the very things he craves: power and money. That means we should punish any brand or company that partners with the South African Nazi.\nIf you have a Tesla, get rid of it. If you own Tesla stock, sell it. If you’re a Starlink customer and have an alternative, use it. If you are in a position to decide on vendors for your employer or business, don’t award business to Tesla, Starlink, SpaceX, X, The Boring Company or Neuralink.\nDelete your X account. I know many people have kept their accounts to stay up to date on what the Nazi contingent is doing. You need to recognize that Musk is monetizing your attention and his clout in the White House. Business Insider claims advertisers, once concerned with the hate espoused on the platform, are returning to the platform. According to Ad Age, Comcast, IBM, Disney, Warner Bros. Discovery, and Lionsgate Entertainment have resumed advertising on President Elon’s hate forum.\nInteresting note: earlier this month, X settled with Trump for $10 million over Twitter banning his account following the January 6th Capitol insurrection. If that seems like a straight-up bribe, that’s because it is.\nIf citizens want to know what DOGE is doing, they have to have an X account. This is a massive conflict of interest and one that is serving Apartheid Clyde well. When Musk purchased then-Twitter, he paid $44 billion for the platform. Most on Wall Street agree he over-paid for the asset. He also took on $13 billion in debt when he bought the platform. Why? Because billionaires don’t want to spend their own money when they can so easily spend someone else’s. In this case, Morgan Stanley, Bank of America, Barclays, Mitsubishi and others lent Musk the money.\nUntil very recently, that debt was known as the worst buyout for banks since the 2008 financial crisis because the acquisition was WAY overvalued. Given Musk’s new role as President of the United States and him using X as the only official communication channel for the federal government, X’s debt is now worth par — meaning the company isn’t worth less than he paid for it.\nFunny how rigging the system works, huh?",
    sources: ["https://bridgestoburn.substack.com/p/wall-of-shame"],
  });

  elon.save();

  res.json({ message: "Oligarch saved" });
});
