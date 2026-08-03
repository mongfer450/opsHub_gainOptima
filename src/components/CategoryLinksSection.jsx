import { ChevronLeft } from "lucide-react";
import { GOLD_DARK } from "../config/constants";
import { categories } from "../data/categories";
import { IconCard } from "./IconCard";

export function CategoryLinksSection({ activeCategory, onSelectCategory, onBack }) {
  const selectedCategory = categories.find((c) => c.id === activeCategory);

  return (
    <div className="wrap">
      {activeCategory === null ? (
        <div style={{ marginTop: 32 }}>
          <div className="grid">
            {categories.map((cat) => (
              <IconCard key={cat.id} icon={cat.icon} label={cat.label} description={cat.description} onClick={() => onSelectCategory(cat.id)} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={onBack}
              className="tap"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#FFFFFF",
                border: "1px solid #ECE9E1",
                cursor: "pointer",
              }}
            >
              <ChevronLeft size={18} color={GOLD_DARK} />
            </button>
            <div className="sectionTitle" style={{ fontWeight: 700 }}>{selectedCategory?.label}</div>
          </div>
          <div className="grid" style={{ marginTop: 16 }}>
            {selectedCategory?.items.map((item) => (
              <IconCard key={item.label} icon={item.icon} label={item.label} description={item.description} href={item.href} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
