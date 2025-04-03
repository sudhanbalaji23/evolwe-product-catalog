
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
const whatsappLogo = "/whatsapp-icon.png";

const products = [
  {
    id: 1,
    name: "Nuts & Seeds Protein Snack Ball",
    shortDesc:
      "High protein, fiber-rich & clean snacking for kids, professionals & health-conscious eaters.",
    fullDesc:
      "Indulge in nature’s finest with our handcrafted Nuts & Seeds Protein Snack Ball — a luxurious blend of cashews, almonds, walnuts, juicy raisins, figs, dates, pumpkin seeds, and sunflower seeds, gently bound with pure ghee. No added sugar, no preservatives — just pure, honest goodness in every bite.",
    price: 20,
    offerPrice: 12,
    benefits: ["Plant-based protein", "Healthy fats", "Natural fiber"],
    audience: ["Kids", "Busy professionals", "Health-conscious people"],
  },
  {
    id: 2,
    name: "Black Urad Dal Snack Ball",
    shortDesc:
      "Protein-rich, iron-packed & satisfying snack for mindful, traditional, and modern munchers.",
    fullDesc:
      "Rooted in tradition and rolled with care, our handcrafted Black Urad Dal Snack Ball blends wholesome black urad dal, fragrant cardamom, crunchy cashews, golden jaggery, and pure ghee into one nourishing bite. No preservatives, no shortcuts — just real ingredients and time-honored goodness.",
    price: 20,
    offerPrice: 12,
    benefits: ["Plant-based protein", "Iron", "Fiber"],
    audience: ["Fitness lovers", "Families", "Traditional snack lovers"],
  },
];

export default function EvolweCatalog() {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [expanded, setExpanded] = useState({});

  const handleAddToCart = (product) => {
    const qty = quantities[product.id] || 1;
    setCart((prev) => [...prev, { ...product, qty }]);
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCheckout = () => {
    const message = cart
      .map((item) => `${item.name} x ${item.qty}`)
      .join("%0A");
    window.open(
      `https://wa.me/6592419525?text=I'd like to order:%0A${message}`,
      "_blank"
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 text-center font-playfair">
      <img
        src="/logo.jpg"
        alt="Evolwe Logo"
        className="mx-auto w-48 mb-6"
      />

      <div className="space-y-8">
        {products.map((product) => (
          <Card key={product.id} className="shadow-xl rounded-2xl">
            <CardContent className="p-6">
              <div className="mb-4">
                <div className="h-40 bg-gray-100 rounded mb-2">Image/Video</div>
                <h2 className="text-xl font-semibold mb-1">{product.name}</h2>
                <p>{product.shortDesc}</p>
                <button
                  onClick={() => toggleExpand(product.id)}
                  className="text-blue-500 flex items-center justify-center mt-2"
                >
                  {expanded[product.id] ? (
                    <>
                      Show less <ChevronUp className="ml-1 w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Show more <ChevronDown className="ml-1 w-4 h-4" />
                    </>
                  )}
                </button>
                {expanded[product.id] && (
                  <p className="mt-2 text-sm text-gray-600">{product.fullDesc}</p>
                )}
              </div>
              <p className="text-sm font-medium mb-1">
                <span className="line-through">SGD {product.price}</span> &nbsp;
                <span className="text-green-600 font-bold">SGD {product.offerPrice}</span>
              </p>
              <Input
                type="number"
                min={1}
                placeholder="Quantity"
                className="w-24 mx-auto mb-2"
                onChange={(e) =>
                  setQuantities({ ...quantities, [product.id]: parseInt(e.target.value) })
                }
              />
              <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="mt-10 p-4 border-t">
          <div className="flex justify-center mb-4">
            <img src="/cart-icon.png" alt="Cart Icon" className="w-8 h-8" />
          </div>
          <ul className="mb-4">
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} x {item.qty}
              </li>
            ))}
          </ul>
          <div className="flex justify-center">
            <Button
              className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
              onClick={handleCheckout}
            >
              <img src={whatsappLogo} alt="WhatsApp" className="w-5 h-5" /> Buy via WhatsApp
            </Button>
          </div>
        </div>
      )}

      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4">Testimonials</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="italic">“So fresh and tasty — my kids love them!”</p>
            <p className="text-sm font-medium mt-1">— Priya, Mom of two</p>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="italic">“Finally, a guilt-free snack that actually satisfies.”</p>
            <p className="text-sm font-medium mt-1">— Arjun, Fitness Enthusiast</p>
          </div>
        </div>
      </div>

      <div className="mt-10 mb-6">
        <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
        <div className="flex justify-center">
          <Button
            className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
            onClick={() => window.open("https://wa.me/6592419525", "_blank")}
          >
            <img src={whatsappLogo} alt="WhatsApp" className="w-5 h-5" /> Chat on WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
