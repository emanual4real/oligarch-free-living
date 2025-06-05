import express, { Request, Response } from "express";
import { readdir } from "fs";
import { config } from "../config";
import { PhotoGallery } from "../types";

export const photoRouter = express.Router();

photoRouter.get("/", async (req: Request, res: Response) => {
  const fileList: string[] = [];
  const directory = config.photoPath;
  const port = config.port;

  if (directory) {
    readdir(directory, (err, files) => {
      if (err) {
        res.status(500).json("File path not found");
      }
      files.forEach((fileName) => {
        fileList.push(fileName);
      });

      const result = fileList.map((row) => {
        const photoGallery: PhotoGallery = {
          itemImageSrc: `http://localhost:${port}/images/${row}`,
          thumbnailImageSrc: "",
          alt: "",
          title: "",
        };

        return photoGallery;
      });
      res.status(200).json(result);
    });
  } else {
    res.status(500).json("File path not found");
  }
});
