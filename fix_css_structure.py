import os

path = r"c:\Users\ASUS\OneDrive\Desktop\website\css\style.css"

with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines: {len(lines)}")

# Search for toast start
toast_idx = -1
for i, line in enumerate(lines):
    if '/* New Toast Styles */' in line:
        toast_idx = i
        break

print(f"Toast styles start at index: {toast_idx}")

if toast_idx != -1:
    # We want to keep lines up to 1240 (index 1240 is line 1241).
    # Wait, line 1238 is .product-card {.
    # Line 1239 is transition...
    # Line 1240 is empty.
    # So we want to keep indices 0 to 1239 (inclusive).
    # And insert '}\n'
    
    # lines[:1240] gives indices 0 to 1239.
    
    new_lines = lines[:1240] + ['}\n\n'] + lines[toast_idx:]
    
    # Unindent the toast styles
    final_lines = []
    # The first part (up to the inserted brace)
    for line in lines[:1240]:
        final_lines.append(line)
    
    final_lines.append('}\n\n')
    
    # The toast part
    for line in lines[toast_idx:]:
        # Remove 4 spaces of indentation if present
        if line.startswith('    '):
            final_lines.append(line[4:])
        else:
            final_lines.append(line)
            
    with open(path, 'w', encoding='utf-8') as f:
        f.writelines(final_lines)
        
    print("Fixed CSS structure and indentation.")
else:
    print("Could not find New Toast Styles marker.")
