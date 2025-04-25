import { v4 as uuidv4 } from 'uuid';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    stock: number;
}

export const products: Product[] = [
    {
        id: uuidv4(),
        name: "Sauce Labs Bike Light",
        description: `A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.`,
        price: 9.99,
        imageUrl: 'bike-light-1200x1500.jpg',
        stock: 100,
    },
    {
        id: uuidv4(),
        name: "Sauce Labs Bolt T-Shirt",
        description: `Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.`,
        price: 15.99,
        imageUrl: 'bolt-shirt-1200x1500.jpg',
        stock: 100,
    },
    {
        id: uuidv4(),
        name: "Sauce Labs Onesie",
        description: `Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.`,
        price: 7.99,
        imageUrl: 'red-onesie-1200x1500.jpg',
        stock: 100,
    },
    {
        id: uuidv4(),
        name: "Test.allTheThings() T-Shirt (Red)",
        description: `This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.`,
        price: 15.99,
        imageUrl: 'red-tatt-1200x1500.jpg',
        stock: 100,
    },
    {
        id: uuidv4(),
        name: "Sauce Labs Backpack",
        description: `carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.`,
        price: 29.99,
        imageUrl: 'sauce-backpack-1200x1500.jpg',
        stock: 100,
    },
    {
        id: uuidv4(),
        name: "Sauce Labs Fleece Jacket",
        description: `It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.`,
        price: 49.99,
        imageUrl: 'sauce-pullover-1200x1500.jpg',
        stock: 100,
    },
    {
        id: uuidv4(),
        name: "Sauce Labs Debugging Cap",
        description: `This classic black cap with the Sauce Labs logo is perfect for those days when you need to hide your bedhead while fixing broken tests. 100% cotton with adjustable strap.`,
        price: 12.99,
        imageUrl: 'debugging-cap-1200x1500.jpg',
        stock: 75,
    },
    {
        id: uuidv4(),
        name: "Sauce Labs Laptop Sleeve",
        description: `Protect your precious device with this premium neoprene laptop sleeve. Snug fit for 13-15 inch laptops with secure zipper closure and outer pocket for accessories.`,
        price: 24.99,
        imageUrl: 'laptop-sleeve-1200x1500.jpg',
        stock: 50,
    },
    {
        id: uuidv4(),
        name: "Sauce Labs Water Bottle",
        description: `Stay hydrated during long coding sessions with this stainless steel water bottle. Double-walled insulation keeps beverages hot or cold for hours. 20oz capacity.`,
        price: 19.99,
        imageUrl: 'water-bottle-1200x1500.jpg',
        stock: 120,
    },
    {
        id: uuidv4(),
        name: "Sauce Labs Hoodie",
        description: `Perfect for those chilly server rooms, this cozy hoodie features the Sauce Labs logo on premium heavyweight cotton/poly blend. Front pocket, hood drawstrings, and ribbed cuffs.`,
        price: 39.99,
        imageUrl: 'sauce-hoodie-1200x1500.jpg',
        stock: 60,
    },
    {
        id: uuidv4(),
        name: "Sauce Labs Mouse Pad",
        description: `Enhance your clicking precision with this high-quality mouse pad featuring the Sauce Labs logo. Non-slip rubber base with smooth surface for optimal tracking.`,
        price: 8.99,
        imageUrl: 'mouse-pad-1200x1500.jpg',
        stock: 150,
    },
    {
        id: uuidv4(),
        name: "Sauce Labs Coffee Mug",
        description: `Start your morning test runs right with this ceramic coffee mug. Microwave and dishwasher safe, with the Sauce Labs logo emblazoned on both sides.`,
        price: 11.99,
        imageUrl: 'coffee-mug-1200x1500.jpg',
        stock: 90,
    },
    {
        id: uuidv4(),
        name: "Sauce Labs Sticker Pack",
        description: `Show your Sauce Labs pride with this set of 5 high-quality vinyl stickers. Perfect for laptops, notebooks, or anywhere you want to display your testing enthusiasm.`,
        price: 4.99,
        imageUrl: 'sticker-pack-1200x1500.jpg',
        stock: 200,
    },
    {
        id: uuidv4(),
        name: "Sauce Labs Wireless Earbuds",
        description: `Tune out distractions with these wireless earbuds featuring the Sauce Labs logo. Bluetooth 5.0, 8-hour battery life, and convenient charging case included.`,
        price: 59.99,
        imageUrl: 'wireless-earbuds-1200x1500.jpg',
        stock: 40,
    },
];