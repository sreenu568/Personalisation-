import React from 'react';

const TopProducts = () => {
  const jsonString ="{\n    \"product 1\": {\n        \"product name\": \"Lurrose 100Pcs Full Cover Fake Toenails Artificial Transparent Nail Tips Nail Art for DIY\",\n        \"image link\": \"https://m.media-amazon.com/images/I/41a1Sj7Q20L._SL1005_.jpg\",\n        \"description\": \"A set of 100 full cover transparent fake toenails, suitable for DIY nail art.\",\n        \"reason\": \"This product aligns with the user's previous interest in nail art products and allows for personal customization and creativity, which correlates with their innovative and detailed-oriented personality traits.\"\n    },\n    \"product 2\": {\n        \"product name\": \"Dufy Butterfly Nail Art Stickers Decals, 6 Large Sheets Romantic Rose Design Nail Art Supplies for Women, 3D Self-Adhesive Nail Foil Decorations Summer Style for DIY Nail Art Dating Decorations\",\n        \"image link\": \"https://m.media-amazon.com/images/I/71X4OqGUdqL._SL1000_.jpg\",\n        \"description\": \"Set of six sheets of butterfly and romantic rose-themed nail art stickers for creative and stylish DIY nail art.\",\n        \"reason\": \"Considering the user's previous purchases in nail art and their innovative character, this product can offer a new avenue for self-expression and aesthetic experimentation in their DIY nail projects.\"\n    },\n    \"product 3\": {\n        \"product name\": \"Naked Nails Refills Replacement Parts Buffers, Files & Shines\",\n        \"image link\": \"https://m.media-amazon.com/images/I/71+7TTq3yyL._SL1500_.jpg\",\n        \"description\": \"Replacement parts for the Naked Nails system, including buffers and files for maintaining high-quality nail care.\",\n        \"reason\": \"This product complements the user's previous purchases related to nail care, enabling maintenance of nail art and care with high-quality tools, resonating with their predisposition for thoroughness in both professional and personal projects.\"\n    },\n    \"product 4\": {\n        \"product name\": \"Nail File, 12 Pcs Nail Files and Buffers 7 Steps Washable Emery Boards for Nails Professional Manicure Tools, Makeup Essential\",\n        \"image link\": \"https://m.media-amazon.com/images/I/71OTfuQXlNL._SL1500_.jpg\",\n        \"description\": \"A set of 12 multi-step, washable emery boards designed for filing and buffering nails, suitable for professional-level manicure.\",\n        \"reason\": \"The quality and versatility of these tools align with the user's appreciation for professional-grade products and their meticulous approach to both their personal and professional life.\"\n    },\n    \"product 5\": {\n        \"product name\": \"Organic Sweet Almond Oil and Fractionated Coconut Oil Bundle for Hair and Skin, 100% Pure and Natural, Hexane-Free, Moisturizing, For Healthy Skin, Silky Hair, Multiuse Body Oil, 16 fl. Oz X 2\",\n        \"image link\": \"https://m.media-amazon.com/images/I/71Q2P-Qht8L._SL1500_.jpg\",\n        \"description\": \"A health and wellness combo featuring almond and coconut oil that supports healthy skin and hair, providing natural and hexane-free moisturization.\",\n        \"reason\": \"Although not directly aligning with AI interests, this product resonates with the user\u2019s holistic approach to personal care and wellness, which may interest them as a practical and health-oriented personality who appreciates natural, quality products.\"\n    }\n}";

  // Parse the JSON string
  const products = JSON.parse(jsonString);

  return (
    <div>
      <h2>Top 5 Products</h2>
      <ul>
        {Object.entries(products).map(([key, product]) => (
          <li key={key}>
            <h3>{product['product name']}</h3>
            <img src={product['image link']} alt={product['product name']} style={{ width: '150px' }} />
            <p>{product['description']}</p>
            <p><strong>Reason:</strong> {product['reason']}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopProducts;
