import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Eye } from "lucide-react";

const RelatedProducts = ({ currentCategory, currentProductId }) => {


    const localProducts = [
    // 1. Electronics (Audio)
    {
      id: 14,
      title: "Noise Cancelling Wireless Headphones",
      price: "$199.99",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000",
      category: "Electronics",
      subCategory: "Audio",
      brand: "Bose",
    },
    // 2. Fashion (Men's Watch)
    {
      id: 2,
      title: "Rolex Milgauss Batman Edition",
      price: "$199.95",
      image: "https://res.cloudinary.com/dgvpoklnb/image/upload/v1765178530/Beigelo_Products/dzk0duj2ztgkdrws4xjm.jpg",
      category: "Fashion",
      subCategory: "Men",
      brand: "Rolex",
    },
    // 3. Sports & Outdoors (Camping)
    {
      id: 20,
      title: "Waterproof Camping Tent (4 Person)",
      price: "$120.00",
      image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=1000",
      category: "Sports & Outdoors",
      subCategory: "Camping",
      brand: "Coleman",
    },
    // 4. Electronics (Gaming)
    {
      id: 5,
      title: "Sony PlayStation 5 Slim Gaming Console",
      price: "$465.00",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1D1fDLWkVhyKw6dGcQDSvALoXH9fpXnp6hA&s",
      category: "Electronics",
      subCategory: "Gaming",
      brand: "Sony",
    },
    // 5. Beauty (Skincare)
    {
      id: 11,
      title: "Organic Vitamin C Face Serum",
      price: "$24.99",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1000",
      category: "Beauty & Personal Care",
      subCategory: "Skincare",
      brand: "The Ordinary",
    },
    // 6. Fashion (Accessories)
    {
      id: 8,
      title: "Authentic Gucci Cap (Imported)",
      price: "$45.00",
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=1000",
      category: "Fashion",
      subCategory: "Accessories",
      brand: "Gucci",
    },
    // 7. Toys & Games (Vehicles)
    {
      id: 15,
      title: "Remote Control Off-Road Truck",
      price: "$45.50",
      image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&q=80&w=1000",
      category: "Toys & Games",
      subCategory: "Vehicles",
      brand: "Traxxas",
    },
    // 8. Fashion (Men's Watch)
    {
      id: 1,
      title: "Rolex Oyster Perpetual “Label Noir Open-Heart”",
      price: "$59.99",
      image: "https://res.cloudinary.com/dgvpoklnb/image/upload/v1765178478/Beigelo_Products/nai8eudjcdmxz5zs3fv4.jpg",
      category: "Fashion",
      subCategory: "Men",
      brand: "Rolex",
    },
    // 9. Arts (Painting)
    {
      id: 18,
      title: "Professional Acrylic Paint Set (48 Colors)",
      price: "$35.00",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1000",
      category: "Arts, Crafts & Sewing",
      subCategory: "Painting",
      brand: "Liquitex",
    },
    // 10. Fashion (Men's Watch)
    {
      id: 4,
      title: "Audemars Piguet Naughty Edition",
      price: "$157.95",
      image: "https://res.cloudinary.com/dgvpoklnb/image/upload/v1765177963/Beigelo_Products/e9tlrjrbsp1yaukxi2gf.jpg",
      category: "Fashion",
      subCategory: "Men",
      brand: "Audemars Piguet",
    },
    // 11. Health (Air Quality)
    {
      id: 12,
      title: "HEPA Air Purifier for Home",
      price: "$89.99",
      image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=1000",
      category: "Health & Household",
      subCategory: "Air Quality",
      brand: "Philips",
    },
    // 12. Fashion (Men's Watch)
    {
      id: 7,
      title: "Franck Muller Vanguard Yachting White",
      price: "$165.00",
      image: "https://res.cloudinary.com/dgvpoklnb/image/upload/v1765190416/Beigelo_Products/q9hqs4nqt5jxah10pe62.jpg",
      category: "Fashion",
      subCategory: "Men",
      brand: "Franck Muller",
    },
    // 13. Automotive (Electronics)
    {
      id: 21,
      title: "4K Dash Cam with Night Vision",
      price: "$89.95",
      image: "https://images.unsplash.com/photo-1522255282-358b54964645?auto=format&fit=crop&q=80&w=1000",
      category: "Automotive Accessories",
      subCategory: "Electronics",
      brand: "Garmin",
    },
    // 14. Home & Kitchen (Lighting)
    {
      id: 9,
      title: "Smart LED Desk Lamp with Wireless Charger",
      price: "$35.00",
      image: "https://images.unsplash.com/photo-1534073828943-f801091a7d58?auto=format&fit=crop&q=80&w=1000",
      category: "Home & Kitchen",
      subCategory: "Lighting",
      brand: "Sony",
    },
    // 15. Baby Products (Gear)
    {
      id: 16,
      title: "Ergonomic Baby Carrier 360",
      price: "$129.00",
      image: "https://images.unsplash.com/photo-1520013573738-34d3b62eb020?auto=format&fit=crop&q=80&w=1000",
      category: "Baby Products",
      subCategory: "Gear",
      brand: "Ergobaby",
    },
    // 16. Fashion (Men's Watch)
    {
      id: 3,
      title: "Patek Philippe Chronograph AA Grade",
      price: "$89.95",
      image: "https://res.cloudinary.com/dgvpoklnb/image/upload/v1765177911/Beigelo_Products/huumxrdrix8lvzsyau9u.jpg",
      category: "Fashion",
      subCategory: "Men",
      brand: "Patek Philippe",
    },
    // 17. Office Products (Furniture)
    {
      id: 19,
      title: "Ergonomic Mesh Office Chair",
      price: "$149.99",
      image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=1000",
      category: "Office Products",
      subCategory: "Furniture",
      brand: "Herman Miller",
    },
    // 18. Fashion (Men's Watch)
    {
      id: 6,
      title: "Hugo Boss Chronograph Premium",
      price: "$165.00",
      image: "https://res.cloudinary.com/dgvpoklnb/image/upload/v1765178031/Beigelo_Products/sjcuavjrfjkuo8gicmpu.jpg",
      category: "Fashion",
      subCategory: "Men",
      brand: "Hugo Boss",
    },
    // 19. Home & Kitchen (Appliances)
    {
      id: 13,
      title: "Automatic Espresso Coffee Machine",
      price: "$299.00",
      image: "https://images.unsplash.com/photo-1570554807278-22683072a392?auto=format&fit=crop&q=80&w=1000",
      category: "Home & Kitchen",
      subCategory: "Appliances",
      brand: "De'Longhi",
    },
    // 20. Fashion (Bags)
    {
      id: 10,
      title: "Vintage Leather Messenger Bag",
      price: "$120.00",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1000",
      category: "Fashion",
      subCategory: "Bags",
      brand: "Fossil",
    },
    // 21. Pet Supplies (Feeding)
    {
      id: 17,
      title: "Automatic Pet Feeder with Camera",
      price: "$79.99",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1000",
      category: "Pet Supplies",
      subCategory: "Feeding",
      brand: "PetSafe",
    },
  ];

  const relatedItems = localProducts
    .filter((item) => item.category === currentCategory && item.id !== currentProductId)
    .slice(0, 4);

  if (relatedItems.length === 0) return null;

  return (
    <div className="mt-20 border-t border-gray-200 pt-16">
      <div className="flex justify-between items-end mb-8">
        <div>
           <h3 className="text-orange-500 font-bold uppercase tracking-widest text-sm mb-2">You Might Also Like</h3>
           <h2 className="text-3xl font-bold text-gray-900">Related Products</h2>
        </div>
        <Link to="/collection" className="hidden md:block text-gray-500 hover:text-orange-500 font-medium transition">
           View Collection &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedItems.map((product) => (
          <Link 
            to={`/product/${product.id}`} 
            key={product.id} 
            className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden bg-gray-100">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Hover Actions */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                 <button className="bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-orange-500 hover:text-white transition">
                    <Eye size={18} />
                 </button>
                 <button className="bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-orange-500 hover:text-white transition">
                    <ShoppingCart size={18} />
                 </button>
              </div>

              {/* Tag */}
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-800 rounded-sm">
                {product.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-bold text-gray-800 mb-1 truncate group-hover:text-orange-500 transition-colors">
                {product.title}
              </h3>
              <div className="flex justify-between items-center">
                 <p className="text-gray-500 text-sm">{product.brand || "Vivid Valley"}</p>
                 <p className="font-bold text-gray-900">{product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Mobile View All Link */}
      <div className="mt-8 text-center md:hidden">
        <Link to="/collection" className="text-orange-500 font-bold border-b-2 border-orange-500 pb-1">
           View All Products
        </Link>
      </div>
    </div>
  );
};

export default RelatedProducts;