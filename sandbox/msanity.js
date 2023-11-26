import data from "./newdata.json" assert { type: "json" }
import fs from "fs"

fs.unlinkSync("migrated.ndjson")


function migrate(item) {
    return {
        _id: parseInt(id++).toString(),
        _type: "items",
        name: item.name,
        slug: {
            _type: "slug",
            current: item.name && item.name.toLowerCase().replace(/ /g, "-"),
        },
        anime: item.anime,
        itype: item.itype,
        price: item.price,
        // images: item.images && item.images.map(image => "image@" + image),
        images: {
            _type: "array",
            of: {
                _type: "image",
                asset: {
                    _type: "image",
                    _sanityAsset: "image@" + item.images[0],
                },
            }
        },
        postDescription: item.postDescription,
        available: true,
    }
}

let id = 1
Object.keys(data.items).forEach(key => {
    console.log(key)
    const migrated = migrate(data.items[key])

    fs.appendFileSync("migrated.ndjson", JSON.stringify(migrated) + "\n")
})