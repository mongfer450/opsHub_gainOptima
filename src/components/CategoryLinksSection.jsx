import { ChevronLeft, Plus, RotateCcw, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { GOLD_DARK } from "../config/constants";
import { defaultCategories, getIcon, LINK_ICON_OPTIONS } from "../data/categories";
import { IconCard } from "./IconCard";

const LINK_STORAGE_KEY = "gainOptimaOwnerLinksV1";
const DEFAULT_LINK_CONFIG = { shortcuts: [], categories: defaultCategories };

export function CategoryLinksSection({ activeCategory, linkEditMode, onSelectCategory, onBack }) {
  const [linkConfig, setLinkConfig] = useState(getStoredLinkConfig);
  const [linkDraft, setLinkDraft] = useState(null);
  const [categoryDraft, setCategoryDraft] = useState(null);
  const selectedCategory = linkConfig.categories.find((c) => c.id === activeCategory);

  useEffect(() => {
    window.localStorage.setItem(LINK_STORAGE_KEY, JSON.stringify(linkConfig));
  }, [linkConfig]);

  useEffect(() => {
    if (!linkEditMode) {
      setLinkDraft(null);
      setCategoryDraft(null);
    }
  }, [linkEditMode]);

  function updateLinks(updater) {
    setLinkConfig((current) => {
      const next = cloneLinkConfig(current);
      updater(next);
      return next;
    });
  }

  function saveCategoryDraft(event) {
    event.preventDefault();
    const category = {
      id: categoryDraft.id || makeCategoryId(categoryDraft.label),
      label: categoryDraft.label.trim(),
      description: categoryDraft.description.trim(),
      iconKey: categoryDraft.iconKey,
      items: categoryDraft.items,
    };

    updateLinks((next) => {
      if (categoryDraft.mode === "edit") next.categories[categoryDraft.index] = category;
      else next.categories.push(category);
    });
    setCategoryDraft(null);
  }

  function saveLinkDraft(event) {
    event.preventDefault();
    const item = {
      label: linkDraft.label.trim(),
      description: linkDraft.description.trim(),
      href: linkDraft.href.trim(),
      iconKey: linkDraft.iconKey,
    };

    updateLinks((next) => {
      if (linkDraft.scope === "shortcuts") {
        if (linkDraft.mode === "edit") next.shortcuts[linkDraft.index] = item;
        else next.shortcuts.push(item);
        return;
      }

      const category = next.categories.find((entry) => entry.id === linkDraft.categoryId);
      if (!category) return;
      if (linkDraft.mode === "edit") category.items[linkDraft.index] = item;
      else category.items.push(item);
    });
    setLinkDraft(null);
  }

  function deleteShortcut(index) {
    if (!window.confirm("ลบ Shortcut นี้ใช่ไหม?")) return;
    updateLinks((next) => {
      next.shortcuts.splice(index, 1);
    });
    setLinkDraft(null);
  }

  function deleteCategory(index) {
    if (!window.confirm("ลบหมวดหมู่นี้และลิงก์ทั้งหมดในหมวดใช่ไหม?")) return;
    const deleted = linkConfig.categories[index];
    updateLinks((next) => {
      next.categories.splice(index, 1);
    });
    if (deleted?.id === activeCategory) onBack();
    setCategoryDraft(null);
    setLinkDraft(null);
  }

  function deleteLink(categoryId, index) {
    if (!window.confirm("ลบลิงก์นี้ใช่ไหม?")) return;
    updateLinks((next) => {
      const category = next.categories.find((entry) => entry.id === categoryId);
      if (category) category.items.splice(index, 1);
    });
    setLinkDraft(null);
  }

  function resetLinks() {
    if (!window.confirm("รีเซ็ตลิงก์ทั้งหมดกลับค่าเริ่มต้นใช่ไหม?")) return;
    setLinkConfig(cloneLinkConfig(DEFAULT_LINK_CONFIG));
    setLinkDraft(null);
    setCategoryDraft(null);
    onBack();
  }

  return (
    <div className="wrap">
      {activeCategory === null ? (
        <>
          <div style={{ marginTop: 24, background: "#FFFFFF", border: "1px solid #ECE9E1", borderRadius: 16, padding: 14 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: linkEditMode || linkConfig.shortcuts.length > 0 ? 14 : 0 }}>
              <div className="sectionTitle" style={{ fontWeight: 700 }}>Shortcut</div>
              {linkEditMode && (
                <button
                  type="button"
                  onClick={() => {
                    setCategoryDraft(null);
                    setLinkDraft(emptyShortcutDraft());
                  }}
                  className="tap"
                  style={secondaryButtonStyle}
                >
                  <Plus size={14} /> เพิ่ม
                </button>
              )}
            </div>
            {linkEditMode && linkDraft?.scope === "shortcuts" && (
              <LinkEditor draft={linkDraft} onChange={setLinkDraft} onSubmit={saveLinkDraft} onCancel={() => setLinkDraft(null)} />
            )}
            {linkConfig.shortcuts.length > 0 && (
              <div className="grid" style={{ marginTop: linkEditMode && linkDraft?.scope === "shortcuts" ? 14 : 0 }}>
                {linkConfig.shortcuts.map((item, index) => (
                  <IconCard
                    key={`${item.label}-${index}`}
                    icon={getIcon(item.iconKey)}
                    label={item.label}
                    description={item.description}
                    href={item.href}
                    editMode={linkEditMode}
                    onEdit={() => {
                      setCategoryDraft(null);
                      setLinkDraft(linkToDraft("shortcuts", null, index, item));
                    }}
                    onDelete={() => deleteShortcut(index)}
                  />
                ))}
              </div>
            )}
          </div>

          <div style={{ marginTop: 32 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 14 }}>
            <div className="sectionTitle" style={{ fontWeight: 700 }}>ลิงก์จัดการ</div>
            {linkEditMode && (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => {
                    setLinkDraft(null);
                    setCategoryDraft(emptyCategoryDraft());
                  }}
                  className="tap"
                  style={secondaryButtonStyle}
                >
                  <Plus size={14} /> เพิ่มหมวด
                </button>
                <button type="button" onClick={resetLinks} className="tap" style={secondaryButtonStyle}>
                  <RotateCcw size={14} /> รีเซ็ต
                </button>
              </div>
            )}
          </div>
          {linkEditMode && categoryDraft && (
            <CategoryEditor draft={categoryDraft} onChange={setCategoryDraft} onSubmit={saveCategoryDraft} onCancel={() => setCategoryDraft(null)} />
          )}
          <div className="grid" style={{ marginTop: linkEditMode && categoryDraft ? 14 : 0 }}>
            {linkConfig.categories.map((cat, index) => (
              <IconCard
                key={cat.id}
                icon={getIcon(cat.iconKey)}
                label={cat.label}
                description={cat.description}
                onClick={() => onSelectCategory(cat.id)}
                editMode={linkEditMode}
                onEdit={() => {
                  setLinkDraft(null);
                  setCategoryDraft(categoryToDraft(index, cat));
                }}
                onDelete={() => deleteCategory(index)}
              />
            ))}
          </div>
        </div>
        </>
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
            {linkEditMode && (
              <button
                type="button"
                onClick={() => {
                  setCategoryDraft(null);
                  setLinkDraft(emptyLinkDraft(activeCategory));
                }}
                className="tap"
                style={{ ...secondaryButtonStyle, marginLeft: "auto" }}
              >
                <Plus size={14} /> เพิ่ม
              </button>
            )}
          </div>
          {linkEditMode && linkDraft?.categoryId === activeCategory && (
            <LinkEditor draft={linkDraft} onChange={setLinkDraft} onSubmit={saveLinkDraft} onCancel={() => setLinkDraft(null)} />
          )}
          <div className="grid" style={{ marginTop: 16 }}>
            {selectedCategory?.items.map((item, index) => (
              <IconCard
                key={`${item.label}-${index}`}
                icon={getIcon(item.iconKey)}
                label={item.label}
                description={item.description}
                href={item.href}
                editMode={linkEditMode}
                onEdit={() => {
                  setCategoryDraft(null);
                  setLinkDraft(linkToDraft("categoryItems", activeCategory, index, item));
                }}
                onDelete={() => deleteLink(activeCategory, index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function CategoryEditor({ draft, onChange, onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit} style={editorStyle}>
      <input value={draft.label} onChange={(event) => onChange({ ...draft, label: event.target.value })} placeholder="ชื่อหมวดหมู่" required style={inputStyle} />
      <input value={draft.description} onChange={(event) => onChange({ ...draft, description: event.target.value })} placeholder="คำอธิบายสั้นๆ" style={inputStyle} />
      <select value={draft.iconKey} onChange={(event) => onChange({ ...draft, iconKey: event.target.value })} style={inputStyle}>
        {LINK_ICON_OPTIONS.map(([key, label]) => (
          <option key={key} value={key}>{label}</option>
        ))}
      </select>
      <EditorActions onCancel={onCancel} />
    </form>
  );
}

function LinkEditor({ draft, onChange, onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit} style={{ ...editorStyle, marginTop: 14 }}>
      <input value={draft.label} onChange={(event) => onChange({ ...draft, label: event.target.value })} placeholder="ชื่อลิงก์" required style={inputStyle} />
      <input value={draft.description} onChange={(event) => onChange({ ...draft, description: event.target.value })} placeholder="คำอธิบายสั้นๆ" style={inputStyle} />
      <input value={draft.href} onChange={(event) => onChange({ ...draft, href: event.target.value })} placeholder="URL" required style={inputStyle} />
      <select value={draft.iconKey} onChange={(event) => onChange({ ...draft, iconKey: event.target.value })} style={inputStyle}>
        {LINK_ICON_OPTIONS.map(([key, label]) => (
          <option key={key} value={key}>{label}</option>
        ))}
      </select>
      <EditorActions onCancel={onCancel} />
    </form>
  );
}

function EditorActions({ onCancel }) {
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
      <button type="submit" className="tap" style={primaryButtonStyle}>
        <Save size={14} /> บันทึก
      </button>
      <button type="button" onClick={onCancel} className="tap" style={secondaryButtonStyle}>
        <X size={14} /> ยกเลิก
      </button>
    </div>
  );
}

function getStoredLinkConfig() {
  try {
    const stored = window.localStorage.getItem(LINK_STORAGE_KEY);
    if (!stored) return cloneLinkConfig(DEFAULT_LINK_CONFIG);
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed.categories)) return cloneLinkConfig(DEFAULT_LINK_CONFIG);
    return mergeWithDefaults(parsed);
  } catch {
    return cloneLinkConfig(DEFAULT_LINK_CONFIG);
  }
}

function cloneLinkConfig(config) {
  return {
    shortcuts: (config.shortcuts || []).map(cloneLinkItem),
    categories: (config.categories || []).map((category) => ({
      id: category.id,
      label: category.label || "",
      description: category.description || "",
      iconKey: category.iconKey || "FileText",
      items: (category.items || []).map(cloneLinkItem),
    })),
  };
}

function cloneLinkItem(item) {
  return {
    label: item.label || "",
    description: item.description || "",
    href: item.href || "",
    iconKey: item.iconKey || "FileText",
  };
}

function mergeWithDefaults(config) {
  const next = cloneLinkConfig({ ...config, shortcuts: config.shortcuts || [] });
  DEFAULT_LINK_CONFIG.categories.forEach((defaultCategory) => {
    const category = next.categories.find((entry) => entry.id === defaultCategory.id);
    if (!category) {
      next.categories.push(cloneLinkConfig({ categories: [defaultCategory] }).categories[0]);
      return;
    }
    defaultCategory.items.forEach((defaultItem) => {
      const hasItem = category.items.some((item) => item.href === defaultItem.href || item.label === defaultItem.label);
      if (!hasItem) category.items.push(cloneLinkItem(defaultItem));
    });
  });
  return next;
}

function emptyCategoryDraft() {
  return { mode: "add", index: null, id: "", label: "", description: "", iconKey: "Folder", items: [] };
}

function categoryToDraft(index, category) {
  return {
    mode: "edit",
    index,
    id: category.id,
    label: category.label || "",
    description: category.description || "",
    iconKey: category.iconKey || "Folder",
    items: category.items || [],
  };
}

function emptyLinkDraft(categoryId) {
  return { mode: "add", scope: "categoryItems", categoryId, index: null, label: "", description: "", href: "", iconKey: "FileText" };
}

function emptyShortcutDraft() {
  return { mode: "add", scope: "shortcuts", categoryId: null, index: null, label: "", description: "", href: "", iconKey: "FileText" };
}

function linkToDraft(scope, categoryId, index, item) {
  return {
    mode: "edit",
    scope,
    categoryId,
    index,
    label: item.label || "",
    description: item.description || "",
    href: item.href || "",
    iconKey: item.iconKey || "FileText",
  };
}

function makeCategoryId(label) {
  const safeLabel = label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9ก-๙]+/gi, "-")
    .replace(/^-+|-+$/g, "");
  return `${safeLabel || "category"}-${Date.now()}`;
}

const editorStyle = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 10,
  background: "#FFFFFF",
  border: "1px solid #ECE9E1",
  borderRadius: 16,
  padding: 14,
};

const inputStyle = {
  width: "100%",
  border: "1px solid #ECE9E1",
  borderRadius: 12,
  padding: "11px 12px",
  fontSize: 13,
  fontFamily: "inherit",
  outline: "none",
  background: "#FFFFFF",
};

const primaryButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  border: "none",
  borderRadius: 12,
  padding: "10px 14px",
  background: GOLD_DARK,
  color: "#FFFFFF",
  fontWeight: 700,
  cursor: "pointer",
  fontFamily: "inherit",
};

const secondaryButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  border: "1px solid #ECE9E1",
  borderRadius: 12,
  padding: "10px 12px",
  background: "#FFFFFF",
  color: "#111318",
  fontWeight: 700,
  cursor: "pointer",
  fontFamily: "inherit",
  fontSize: 12,
};
