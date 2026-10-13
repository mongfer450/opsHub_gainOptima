import assert from "node:assert/strict";
import test from "node:test";

import { fetchShortcuts, saveShortcut } from "../src/services/shortcuts.js";

test("local shortcut edits survive a sheet refresh without changing sheet data", async () => {
  const storage = new Map();
  const originalStorage = globalThis.localStorage;
  const originalFetch = globalThis.fetch;
  const sheetRow = { id: "sheet-1", label: "Original", url: "https://example.com/original", description: "", icon: "link", placement: "list", sortOrder: 10, enabled: true };
  globalThis.localStorage = {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  };
  globalThis.fetch = async () => ({
    ok: true,
    text: async () => `google.visualization.Query.setResponse(${JSON.stringify({
      status: "ok",
      table: { rows: [{ c: [sheetRow.id, sheetRow.label, sheetRow.url, sheetRow.description, sheetRow.icon, sheetRow.placement, sheetRow.sortOrder, sheetRow.enabled].map((v) => ({ v })) }] },
    })});`,
  });

  try {
    const fromSheet = await fetchShortcuts();
    const edited = await saveShortcut("upsert", { ...sheetRow, label: "Edited" }, "", fromSheet);
    assert.equal(edited[0].label, "Edited");
    assert.equal((await fetchShortcuts())[0].label, "Edited");

    const added = await saveShortcut("upsert", { ...sheetRow, id: "local-1", label: "Added", sortOrder: 20 }, "", edited);
    assert.deepEqual(added.map((item) => item.label), ["Edited", "Added"]);
    assert.deepEqual((await fetchShortcuts()).map((item) => item.label), ["Edited", "Added"]);

    const afterDelete = await saveShortcut("delete", { id: sheetRow.id }, "", added);
    assert.deepEqual(afterDelete.map((item) => item.label), ["Added"]);
    assert.deepEqual((await fetchShortcuts()).map((item) => item.label), ["Added"]);
  } finally {
    globalThis.localStorage = originalStorage;
    globalThis.fetch = originalFetch;
  }
});
