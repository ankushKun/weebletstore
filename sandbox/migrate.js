import fs from "fs";
import data from "./data.json" assert { type: "json" };

const items = data.items;

const newItems = {
    items: {}
}

Object.keys(items).forEach((key) => {
    const item = items[key];

    const newItem = {
        name: item.name,
        anime: item.anime.replace(".png", "").replace(".jpg", "").replace(".jpeg", ""),
        id: item.id,
        itype: item.itemType.toLowerCase(),
        price: item.price,
        images: [item.src],
        postDescription: "",
    }

    newItems.items[key] = newItem;

    console.log(newItem)
})

fs.writeFileSync("./newdata.json", JSON.stringify(newItems, null, 2));