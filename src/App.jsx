// 多言語対応（英語/日本語）を追加
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import { motion } from "framer-motion";

const templates = [
  {
    id: 1,
    name: { en: "Modern Business", jp: "モダンビジネス" },
    category: { en: "Business", jp: "ビジネス" },
    price: 0.5,
    preview: "/previews/business.png",
    description: {
      en: "Clean and modern layout perfect for business presentations.",
      jp: "ビジネスプレゼンに最適なモダンなデザイン"
    }
  },
  {
    id: 2,
    name: { en: "Creative Portfolio", jp: "クリエイティブポートフォリオ" },
    category: { en: "Creative", jp: "クリエイティブ" },
    price: 0.5,
    preview: "/previews/creative.png",
    description: {
      en: "Colorful and bold template great for portfolios.",
      jp: "ポートフォリオにぴったりなカラフルで目を引くデザイン"
    }
  },
  {
    id: 3,
    name: { en: "Minimal Education", jp: "ミニマル教育" },
    category: { en: "Education", jp: "教育" },
    price: 0.5,
    preview: "/previews/education.png",
    description: {
      en: "Minimalistic design suited for educational content.",
      jp: "教育資料に最適なミニマルスタイルのテンプレート"
    }
  }
];

const categories = {
  en: ["All", "Business", "Creative", "Education"],
  jp: ["すべて", "ビジネス", "クリエイティブ", "教育"]
};

export default function App() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [language, setLanguage] = useState("jp");

  const getCategory = (template) => template.category[language];
  const filteredTemplates =
    selectedCategory === (language === "jp" ? "すべて" : "All")
      ? templates
      : templates.filter((t) => getCategory(t) === selectedCategory);

  const addToCart = (template) => {
    setCart([...cart, template]);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-center flex-grow">
          {language === "jp"
            ? "パワーポイントテンプレートストア"
            : "PowerPoint Template Store"}
        </h1>
        <Select value={language} onValueChange={setLanguage} className="w-32 ml-4">
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="jp">日本語</SelectItem>
        </Select>
      </div>

      <p className="text-center text-muted-foreground">
        {language === "jp"
          ? "ユニークなテンプレートを閲覧して、各テンプレートを50円で購入できます"
          : "Browse unique templates, preview them, and buy each for just $0.50"}
      </p>

      <div className="flex justify-center">
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="w-48"
        >
          {categories[language].map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <motion.div whileHover={{ scale: 1.05 }} key={template.id}>
            <Card>
              <CardContent className="p-4 space-y-2">
                <img
                  src={template.preview}
                  alt={template.name[language]}
                  className="w-full h-40 object-cover rounded"
                />
                <h2 className="text-xl font-semibold">{template.name[language]}</h2>
                <p className="text-muted-foreground text-sm">
                  {template.description[language]}
                </p>
                <p className="font-bold">{language === "jp" ? "¥50" : "$0.50"}</p>
                <Button onClick={() => addToCart(template)}>
                  {language === "jp" ? "カートに追加" : "Add to Cart"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="border-t pt-4">
        <h2 className="text-2xl font-bold">
          {language === "jp" ? "カート" : "Your Cart"}
        </h2>
        {cart.length === 0 ? (
          <p className="text-muted-foreground">
            {language === "jp" ? "カートに商品がありません" : "Your cart is empty."}
          </p>
        ) : (
          <ul className="space-y-2">
            {cart.map((item, index) => (
              <li key={index}>
                {item.name[language]} - {language === "jp" ? "¥50" : "$0.50"}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
Delete broken App.jsx
