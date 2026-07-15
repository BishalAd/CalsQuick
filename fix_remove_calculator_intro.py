#!/usr/bin/env python3
"""
Remove <CalculatorIntro ... /> from all .astro pages:
  1. Remove `import CalculatorIntro from '...'` from frontmatter
  2. Remove the <CalculatorIntro ... /> JSX tag (single-line or multi-line)
"""

import os
import re

PAGES_DIR = os.path.join(os.path.dirname(__file__), "src", "pages")

# Match import line inside frontmatter
IMPORT_RE = re.compile(
    r"^\s*import CalculatorIntro from ['\"].*?['\"];?\s*\n",
    re.MULTILINE,
)

# Match <CalculatorIntro ... /> — handles both single-line and multi-line variants
# Strategy: find the opening tag, then scan forward to find the self-closing />
OPEN_TAG_RE = re.compile(r"[ \t]*<CalculatorIntro\b")


def remove_self_closing_tag(content: str, tag_name: str) -> str:
    """
    Remove all occurrences of <TagName ... /> (self-closing, possibly multi-line).
    """
    result = []
    i = 0
    pattern = re.compile(r"[ \t]*<" + re.escape(tag_name) + r"\b")

    while i < len(content):
        m = pattern.search(content, i)
        if not m:
            result.append(content[i:])
            break

        # Append everything before the tag (but strip the leading newline before tag if present)
        before = content[i:m.start()]
        result.append(before)

        # Scan forward from m.start() to find the self-closing />
        j = m.end()
        in_string = False
        string_char = None
        depth = 0  # track { } nesting inside attributes

        while j < len(content):
            c = content[j]
            if in_string:
                if c == string_char and content[j - 1] != "\\":
                    in_string = False
            elif c in ('"', "'", "`"):
                in_string = True
                string_char = c
            elif c == "{":
                depth += 1
            elif c == "}":
                depth -= 1
            elif c == "/" and depth == 0 and not in_string:
                if j + 1 < len(content) and content[j + 1] == ">":
                    # Found />  — skip past it, also eat trailing newline
                    end = j + 2
                    if end < len(content) and content[end] == "\n":
                        end += 1
                    i = end
                    break
            j += 1
        else:
            # Didn't find /> — just move past the opening match to avoid infinite loop
            i = m.end()

    return "".join(result)


def fix_file(filepath: str) -> bool:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    original = content

    # Remove import statement
    content = IMPORT_RE.sub("", content)

    # Remove <CalculatorIntro ... /> tag
    content = remove_self_closing_tag(content, "CalculatorIntro")

    # Clean up any double blank lines left behind (max 2 consecutive newlines)
    content = re.sub(r"\n{3,}", "\n\n", content)

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
    print(f"Cleaned {len(fixed)} files:")
    for f in fixed:
        print(f"  ✅ {f}")
    if skipped:
        print(f"\nUnchanged {len(skipped)} files (no CalculatorIntro found):")
        for f in skipped:
            print(f"  — {f}")
    print(f"{'='*55}\n")


if __name__ == "__main__":
    main()
