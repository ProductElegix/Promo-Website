"""Builds public/press/elegix-press-kit.zip from the logo files in public/press and the team and app photos.
Run after changing any of them:  python3 scripts/press-kit.py"""
import pathlib, zipfile

root = pathlib.Path(__file__).resolve().parent.parent
pub = root / "public"
out = pub / "press" / "elegix-press-kit.zip"
files = {f"logo/{p.name}": p for p in sorted((pub / "press").glob("elegix-*.*")) if p.suffix in {".svg", ".png"}}
for name in ["founder", "alina-krupa", "maksym-zhuravskyi", "yevhenii-bohomol"]:
    files[f"team/{'edward-korytskyi' if name == 'founder' else name}.jpg"] = pub / "images" / f"{name}.jpg"
for name in ["home", "life-area"]:
    files[f"app/elegix-{name}-screen.jpg"] = pub / "images" / "app" / f"{name}.jpg"
with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
    for arc, path in files.items():
        z.write(path, f"elegix-press-kit/{arc}")
print(out.relative_to(root), f"{out.stat().st_size // 1024} KB", len(files), "files")
