#!/usr/bin/env python3
"""Merge songs/out/*.json into js/book-insights.js detail fields."""
import json, re
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "songs" / "out"
OUT.mkdir(parents=True, exist_ok=True)

# load seed
songs = {}  # (book_id, idx) -> song
seed_path = ROOT / "songs" / "seed.json"
if seed_path.exists():
    seed = json.loads(seed_path.read_text())
    for bid, m in seed.items():
        for idx, text in m.items():
            songs[(int(bid), int(idx))] = text

for p in sorted(OUT.glob("*.json")):
    data = json.loads(p.read_text())
    if isinstance(data, dict) and "songs" in data:
        data = data["songs"]
    if isinstance(data, dict):
        # { "5": { "0": "..." } }
        for bid, m in data.items():
            if isinstance(m, dict):
                for idx, text in m.items():
                    if isinstance(text, dict):
                        text = text.get("song") or text.get("detail") or ""
                    songs[(int(bid), int(idx))] = text
            elif isinstance(m, list):
                for i, item in enumerate(m):
                    if isinstance(item, dict):
                        songs[(int(bid), int(item.get("insight_idx", i)))] = item.get("song") or item.get("detail") or ""
    elif isinstance(data, list):
        for item in data:
            bid = int(item["book_id"])
            idx = int(item["insight_idx"])
            songs[(bid, idx)] = item.get("song") or item.get("detail") or ""

print(f"loaded {len(songs)} songs")

raw = (ROOT / "js" / "book-insights.js").read_text()
m = re.search(r"window\.WEALTH_BOOK_INSIGHTS\s*=\s*(\{.*?\})\s*;\s*\nwindow\.WEALTH_BOOK_APPLICATIONS", raw, re.S)
insights = json.loads(m.group(1))
m2 = re.search(r"window\.WEALTH_BOOK_APPLICATIONS\s*=\s*(\{.*?\})\s*;", raw, re.S)
apps = json.loads(m2.group(1))

updated = 0
for bid, pack in insights.items():
    for i, item in enumerate(pack):
        key = (int(bid), i)
        if key in songs and songs[key].strip():
            item["detail"] = songs[key].strip()
            updated += 1

(ROOT / "js" / "book-insights.js").write_text(
    "/** Create: full hip-hop songs per insight (Grok-generated) */\n"
    "window.WEALTH_BOOK_INSIGHTS = "
    + json.dumps(insights, ensure_ascii=False)
    + ";\n"
    "window.WEALTH_BOOK_APPLICATIONS = "
    + json.dumps(apps, ensure_ascii=False)
    + ";\n"
    "window.CREATE_BOOK_INSIGHTS = window.WEALTH_BOOK_INSIGHTS;\n"
    "window.CREATE_BOOK_APPLICATIONS = window.WEALTH_BOOK_APPLICATIONS;\n"
)
print(f"updated {updated} insights, KB={(ROOT/'js'/'book-insights.js').stat().st_size//1024}")
missing = []
for bid, pack in insights.items():
    for i in range(len(pack)):
        if (int(bid), i) not in songs:
            missing.append(f"{bid}:{i}")
print(f"missing {len(missing)}")
if missing[:10]:
    print("first missing", missing[:10])
