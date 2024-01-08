import  fs from 'fs';

// Read the original JSON file
const jsonData = fs.readFileSync('data.json', 'utf8');
const originalData = JSON.parse(jsonData);

// Separate 'category' and 'products' arrays
const categories = originalData.categories.map(item => ({ ...item, id: undefined }));
const products = originalData.products.map(item => ({ ...item, id: undefined }));

// Write to new JSON files
fs.writeFileSync('categories.json', JSON.stringify(categories, null, 2));
fs.writeFileSync('products.json', JSON.stringify(products, null, 2));

console.log('Separation and removal of id field completed!');
