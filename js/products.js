const products = [
    {
        id: 1,
        name: "Midnight Oud",
        brand: "Arabian Nights",
        price: 25.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80",
        category: "Oud",
        gender: "Unisex",
        notes: "Agarwood, Rose, Amber"
    },
    {
        id: 2,
        name: "Velvet Rose",
        brand: "Luxe Scents",
        price: 18.50,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",
        category: "Floral",
        gender: "Women",
        notes: "Damask Rose, Clove, Praline"
    },
    {
        id: 3,
        name: "Oceanic Breeze",
        brand: "Aqua Pura",
        price: 15.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1523293188086-b4329588717a?auto=format&fit=crop&w=600&q=80",
        category: "Fresh",
        gender: "Unisex",
        notes: "Sea Salt, Sage, Grapefruit"
    },



    {
        id: 7,
        name: "Vanilla Dream",
        brand: "Sweet Essence",
        price: 20.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1605651202724-9b4dc8071178?auto=format&fit=crop&w=600&q=80",
        category: "Gourmand",
        gender: "Women",
        notes: "Vanilla Bean, Caramel, Tonka"
    },
    {
        id: 8,
        name: "Forest Rain",
        brand: "Nature's Call",
        price: 22.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=600&q=80",
        category: "Woody",
        gender: "Men",
        notes: "Pine, Cedar, Moss"
    },
    {
        id: 9,
        name: "Jasmine Bloom",
        brand: "Floral Fantasy",
        price: 19.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=600&q=80",
        category: "Floral",
        gender: "Women",
        notes: "Jasmine, Tuberose, Ylang-Ylang"
    },

    {
        id: 11,
        name: "Santal 33 (Inspired)",
        brand: "Le Labo",
        price: 45.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1584271854089-9bb3e5168e32?auto=format&fit=crop&w=600&q=80",
        category: "Woody",
        gender: "Unisex",
        notes: "Sandalwood, Cedar, Violet"
    },

    {
        id: 13,
        name: "Aventus (Inspired)",
        brand: "Creed",
        price: 50.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1590156206657-b18a92a43180?auto=format&fit=crop&w=600&q=80",
        category: "Fruity",
        gender: "Men",
        notes: "Pineapple, Birch, Musk"
    },
    {
        id: 14,
        name: "Sauvage (Inspired)",
        brand: "Dior",
        price: 30.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&w=600&q=80",
        category: "Fresh",
        gender: "Men",
        notes: "Bergamot, Pepper, Ambroxan"
    },
    {
        id: 15,
        name: "Bleu de Chanel (Inspired)",
        brand: "Chanel",
        price: 32.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1512777576244-b846ac3d816f?auto=format&fit=crop&w=600&q=80",
        category: "Woody",
        gender: "Men",
        notes: "Grapefruit, Incense, Ginger"
    },
    {
        id: 16,
        name: "Black Opium (Inspired)",
        brand: "YSL",
        price: 28.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1543486958-d783bfbf7f8e?auto=format&fit=crop&w=600&q=80",
        category: "Gourmand",
        gender: "Women",
        notes: "Coffee, Vanilla, Pear"
    },
    {
        id: 17,
        name: "Flowerbomb (Inspired)",
        brand: "Viktor&Rolf",
        price: 29.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=600&q=80",
        category: "Floral",
        gender: "Women",
        notes: "Orchid, Rose, Patchouli"
    },
    {
        id: 18,
        name: "Tobacco Vanille (Inspired)",
        brand: "Tom Ford",
        price: 48.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=600&q=80",
        category: "Spicy",
        gender: "Unisex",
        notes: "Tobacco Leaf, Vanilla, Cocoa"
    },
    {
        id: 19,
        name: "Oud Wood (Inspired)",
        brand: "Tom Ford",
        price: 48.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=600&q=80",
        category: "Woody",
        gender: "Unisex",
        notes: "Oud, Sandalwood, Cardamom"
    },
    {
        id: 20,
        name: "Lost Cherry (Inspired)",
        brand: "Tom Ford",
        price: 52.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=600&q=80",
        category: "Fruity",
        gender: "Unisex",
        notes: "Black Cherry, Almond, Tonka"
    },

    {
        id: 22,
        name: "Delina (Inspired)",
        brand: "Parfums de Marly",
        price: 42.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=600&q=80",
        category: "Floral",
        gender: "Women",
        notes: "Lychee, Rhubarb, Rose"
    },
    {
        id: 23,
        name: "Herod (Inspired)",
        brand: "Parfums de Marly",
        price: 40.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
        category: "Woody",
        gender: "Men",
        notes: "Tobacco, Cinnamon, Vanilla"
    },

    {
        id: 25,
        name: "Green Irish Tweed (Inspired)",
        brand: "Creed",
        price: 45.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1595535373192-fc0437bc299f?auto=format&fit=crop&w=600&q=80",
        category: "Fresh",
        gender: "Men",
        notes: "Lemon Verbena, Iris, Ambergris"
    },
    {
        id: 26,
        name: "Silver Mountain Water (Inspired)",
        brand: "Creed",
        price: 45.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1613521140785-e85e427f8002?auto=format&fit=crop&w=600&q=80",
        category: "Fresh",
        gender: "Unisex",
        notes: "Tea, Black Currant, Musk"
    },
    {
        id: 27,
        name: "Virgin Island Water (Inspired)",
        brand: "Creed",
        price: 46.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80",
        category: "Fruity",
        gender: "Unisex",
        notes: "Coconut, Lime, Rum"
    },
    {
        id: 28,
        name: "Millisime Imperial (Inspired)",
        brand: "Creed",
        price: 45.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1585751119414-ef2636f8aede?auto=format&fit=crop&w=600&q=80",
        category: "Fresh",
        gender: "Unisex",
        notes: "Sea Salt, Fruit, Musk"
    },
    {
        id: 29,
        name: "Eros (Inspired)",
        brand: "Versace",
        price: 25.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1584539696499-bff0b42f494f?auto=format&fit=crop&w=600&q=80",
        category: "Fresh",
        gender: "Men",
        notes: "Mint, Apple, Tonka"
    },
    {
        id: 30,
        name: "Dylan Blue (Inspired)",
        brand: "Versace",
        price: 24.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1583001931096-959e9ad7b535?auto=format&fit=crop&w=600&q=80",
        category: "Fresh",
        gender: "Men",
        notes: "Fig, Water Notes, Patchouli"
    },
    {
        id: 31,
        name: "The One (Inspired)",
        brand: "Dolce & Gabbana",
        price: 26.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1580876205577-9477e77b4d41?auto=format&fit=crop&w=600&q=80",
        category: "Spicy",
        gender: "Men",
        notes: "Tobacco, Amber, Ginger"
    },
    {
        id: 32,
        name: "Light Blue (Inspired)",
        brand: "Dolce & Gabbana",
        price: 22.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1592915385324-1243501f9531?auto=format&fit=crop&w=600&q=80",
        category: "Fresh",
        gender: "Women",
        notes: "Lemon, Apple, Cedar"
    },
    {
        id: 33,
        name: "Acqua di Gio (Inspired)",
        brand: "Giorgio Armani",
        price: 28.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1610461888750-10bfc601b874?auto=format&fit=crop&w=600&q=80",
        category: "Fresh",
        gender: "Men",
        notes: "Sea Notes, Lime, Jasmine"
    },

    {
        id: 35,
        name: "Stronger With You (Inspired)",
        brand: "Emporio Armani",
        price: 30.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1605651202724-9b4dc8071178?auto=format&fit=crop&w=600&q=80",
        category: "Gourmand",
        gender: "Men",
        notes: "Chestnut, Vanilla, Sage"
    },
    {
        id: 36,
        name: "Jazz Club (Inspired)",
        brand: "Maison Margiela",
        price: 35.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80",
        category: "Boozy",
        gender: "Men",
        notes: "Rum, Tobacco, Vanilla"
    },
    {
        id: 37,
        name: "By the Fireplace (Inspired)",
        brand: "Maison Margiela",
        price: 35.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",
        category: "Woody",
        gender: "Unisex",
        notes: "Chestnut, Wood, Vanilla"
    },
    {
        id: 38,
        name: "Beach Walk (Inspired)",
        brand: "Maison Margiela",
        price: 35.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1523293188086-b4329588717a?auto=format&fit=crop&w=600&q=80",
        category: "Fresh",
        gender: "Women",
        notes: "Coconut, Bergamot, Musk"
    },
    {
        id: 39,
        name: "Angels' Share (Inspired)",
        brand: "Kilian",
        price: 60.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80",
        category: "Boozy",
        gender: "Unisex",
        notes: "Cognac, Cinnamon, Praline"
    },
    {
        id: 40,
        name: "Black Phantom (Inspired)",
        brand: "Kilian",
        price: 58.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=600&q=80",
        category: "Gourmand",
        gender: "Unisex",
        notes: "Coffee, Rum, Chocolate"
    },
    {
        id: 41,
        name: "Good Girl Gone Bad (Inspired)",
        brand: "Kilian",
        price: 55.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=600&q=80",
        category: "Floral",
        gender: "Women",
        notes: "Osmanthus, Rose, Tuberose"
    },
    {
        id: 42,
        name: "Reflection Man (Inspired)",
        brand: "Amouage",
        price: 50.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1605651202724-9b4dc8071178?auto=format&fit=crop&w=600&q=80",
        category: "Floral",
        gender: "Men",
        notes: "Jasmine, Neroli, Sandalwood"
    },




    {
        id: 47,
        name: "Gentle Fluidity Gold (Inspired)",
        brand: "Maison Francis",
        price: 48.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80",
        category: "Gourmand",
        gender: "Unisex",
        notes: "Vanilla, Amber, Musk"
    },
    {
        id: 48,
        name: "L'Homme Ideal (Inspired)",
        brand: "Guerlain",
        price: 30.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=600&q=80",
        category: "Gourmand",
        gender: "Men",
        notes: "Almond, Leather, Cherry"
    },

    {
        id: 50,
        name: "Mon Guerlain (Inspired)",
        brand: "Guerlain",
        price: 28.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1605651202724-9b4dc8071178?auto=format&fit=crop&w=600&q=80",
        category: "Floral",
        gender: "Women",
        notes: "Lavender, Vanilla, Sandalwood"
    },
    {
        id: 51,
        name: "Terroni (Inspired)",
        brand: "Orto Parisi",
        price: 65.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=600&q=80",
        category: "Woody",
        gender: "Unisex",
        notes: "Earth, Smoke, Woods"
    },
    {
        id: 52,
        name: "Megamare (Inspired)",
        brand: "Orto Parisi",
        price: 65.00,
        size: "5ml",
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80",
        category: "Marine",
        gender: "Unisex",
        notes: "Sea Water, Seaweed, Musk"
    }
];
