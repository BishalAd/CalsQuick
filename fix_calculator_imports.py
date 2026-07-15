#!/usr/bin/env python3
"""
Fix two bugs across all .astro calculator pages:
  1. Move `import CalculatorIntro from "../../components/CalculatorIntro.astro";`
     from OUTSIDE the frontmatter (---) into INSIDE the frontmatter block.
  2. Fix array prop syntax: benefits=[...] → benefits={[...]}
                            faq=[...] → faq={[...]}
"""

import os
import re

PAGES_DIR = os.path.join(os.path.dirname(__file__), "src", "pages")

STRAY_IMPORT_PATTERN = re.compile(
    r'^import CalculatorIntro from ["\'](?:\.\./)*components/CalculatorIntro\.astro["\'];?\s*$',
    re.MULTILINE,
)

CORRECT_IMPORT = "import CalculatorIntro from '../components/CalculatorIntro.astro';"

# Matches array-value props NOT wrapped in {}: e.g.  benefits=["a", "b"]  or  faq=[{...}]
# We need to convert  propname=[...]  →  propname={[...]}
# Uses a simple scan for  benefits=[  and  faq=[  at attribute position
BARE_ARRAY_PROP_RE = re.compile(r'\b(benefits|faq)=(\[)', )


def fix_file(filepath: str) -> bool:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    original = content

    # ── 1. Find and remove the stray import (outside frontmatter) ──────────────
    # Split on --- to find frontmatter boundaries
    parts = content.split("---", 2)
    if len(parts) < 3:
        # No frontmatter at all — skip
        return False

    frontmatter = parts[1]
    body = parts[2]

    # Check if the stray import exists in the body
    stray_in_body = bool(STRAY_IMPORT_PATTERN.search(body))
    already_in_frontmatter = "CalculatorIntro" in frontmatter

    if stray_in_body:
        # Remove it from body
        body = STRAY_IMPORT_PATTERN.sub("", body)

        # Add the import into the frontmatter if not already there
        if not already_in_frontmatter:
            # Insert after the last existing `import` line in frontmatter
            fm_lines = frontmatter.split("\n")
            last_import_idx = -1
            for i, line in enumerate(fm_lines):
                if line.strip().startswith("import "):
                    last_import_idx = i
            if last_import_idx >= 0:
                fm_lines.insert(last_import_idx + 1, CORRECT_IMPORT)
            else:
                # No imports yet — put at top of frontmatter
                fm_lines.insert(1, CORRECT_IMPORT)
            frontmatter = "\n".join(fm_lines)

        content = "---" + frontmatter + "---" + body

    # ── 2. Fix bare array props: benefits=[  →  benefits={[  ──────────────────
    # We do a careful bracket-matching replacement so we capture the full array
    def fix_bare_array_prop(text: str) -> str:
        result = []
        i = 0
        while i < len(text):
            # Look for pattern:  propname=[
            m = BARE_ARRAY_PROP_RE.search(text, i)
            if not m:
                result.append(text[i:])
                break

            # Make sure it's NOT already wrapped: look back for {
            before_match = text[i:m.start()]
            result.append(before_match)

            prop_name = m.group(1)
            # Check if already  propname={[  — skip if so
            # (The regex matched  propname=[  so check char before [)
            # Actually our regex matches propname=[ not propname={[, so it's already fine
            # But double check: is char just before this match a `{`?  No — already handled.

            # Find the matching ] for the [ at m.end()-1
            bracket_start = m.end() - 1  # position of [
            depth = 0
            j = bracket_start
            in_string = False
            string_char = None
            while j < len(text):
                c = text[j]
                if in_string:
                    if c == string_char and text[j-1] != '\\':
                        in_string = False
                elif c in ('"', "'", '`'):
                    in_string = True
                    string_char = c
                elif c == '[' or c == '{':
                    depth += 1
                elif c == ']' or c == '}':
                    depth -= 1
                    if depth == 0:
                        break
                j += 1

            array_content = text[bracket_start:j+1]  # includes [ and ]
            result.append(f"{prop_name}={{" + array_content + "}")
            i = j + 1

        return "".join(result)

    fixed_content = fix_bare_array_prop(content)
    if fixed_content != content:
        content = fixed_content

    if content != original:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        return True
    return False


def main():
    fixed = []
    skipped = []

    for fname in sorted(os.listdir(PAGES_DIR)):
        if not fname.endswith(".astro"):
            continue
        fpath = os.path.join(PAGES_DIR, fname)
        try:
            changed = fix_file(fpath)
            if changed:
                fixed.append(fname)
            else:
                skipped.append(fname)
        except Exception as e:
            print(f"  ERROR in {fname}: {e}")

    print(f"\n{'='*55}")
    print(f"Fixed {len(fixed)} files:")
    for f in fixed:
        print(f"  ✅ {f}")
    print(f"\nUnchanged {len(skipped)} files:")
    for f in skipped:
        print(f"  — {f}")
    print(f"{'='*55}\n")


if __name__ == "__main__":
    main()
