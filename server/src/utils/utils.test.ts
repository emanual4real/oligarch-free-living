import { mongo } from "mongoose";
import { distinctModelList } from "./utils";

describe("distinctModelList", () => {
  it("removes duplicates", () => {
    const id1 = { _id: new mongo.ObjectId() };
    const id2 = { _id: new mongo.ObjectId() };
    const list = [id1, id1, id2];
    const expected = [id1, id2];

    const actual = distinctModelList(list);

    expect(actual).toEqual(expected);
  });
});
