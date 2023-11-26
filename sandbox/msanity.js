import data from "./newdata.json" assert { type: "json" }
import fs from "fs"

fs.unlinkSync("migrated.ndjson")
const slugs = []

function migrate(item) {
    id++
    let slug = item.name && item.name.toLowerCase().replace(/ /g, "-")
    if (slugs.includes(slug)) {
        console.log("Duplicate slug: " + slug)
        slug = slug + "-" + parseInt(id).toString()
    }
    slugs.push(slug)
    return {
        _id: parseInt(id).toString(),
        _type: "items",
        name: item.name,
        slug: {
            _type: "slug",
            current: slug,
        },
        anime: item.anime,
        itype: item.itype,
        price: item.price,
        images: [{
            _type: "image",
            _sanityAsset: "image@" + item.images[0],
        }],
        postDescription: item.postDescription,
        available: true,
    }
}

let id = 0
Object.keys(data.items).forEach(key => {
    console.log(key)
    const migrated = migrate(data.items[key])

    fs.appendFileSync("migrated.ndjson", JSON.stringify(migrated) + "\n")
})