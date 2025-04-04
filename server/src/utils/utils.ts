import { mongo } from "mongoose";

export const distinctModelList = (
  list: { _id: mongo.BSON.ObjectId }[]
): { _id: mongo.BSON.ObjectId }[] => {
  const idSet = new Set([...list.map((row) => row._id.toString())]);

  const finalList: { _id: mongo.BSON.ObjectId }[] = [];

  Array.from(idSet).forEach((_id) => {
    const item = list.find((row) => row._id.toString() === _id);
    if (item) {
      finalList.push(item);
    }
  });
  return finalList;
};
