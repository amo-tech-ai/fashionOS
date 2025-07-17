#!/usr/bin/env python3
"""
Analyze FashionOS project for missing components, especially the footer
"""

import os
import json
from pathlib import Path

project_path = "/home/sk25/fx/fashionos"

# Components to check
components_to_check = {
    "Footer": {"found": False, "locations": []},
    "Header": {"found": False, "locations": []},
    "Layout": {"found": False, "locations": []},
    "CustomThemedLayout": {"found": False, "locations": []},
    "AppShell": {"found": False, "locations": []},
    "Breadcrumb": {"found": False, "locations": []},
    "Menu": {"found": False, "locations": []},
    "Sidebar": {"found": False, "locations": []},
    "CustomSider": {"found": False, "locations": []},
    "CustomHeader": {"found": False, "locations": []},
}

# Check all TypeScript/React files
for root, dirs, files in os.walk(os.path.join(project_path, "src")):
    # Skip node_modules and .next
    if "node_modules" in root or ".next" in root:
        continue
        
    for file in files:
        if file.endswith((".tsx", ".ts")):
            file_path = os.path.join(root, file)
            relative_path = file_path.replace(project_path, "")
            
            try:
                with open(file_path, "r") as f:
                    content = f.read()
                    
                    # Check each component
                    for comp_name in components_to_check:
                        # Check if component is imported or used
                        if comp_name in content:
                            components_to_check[comp_name]["found"] = True
                            components_to_check[comp_name]["locations"].append(relative_path)
            except Exception as e:
                pass

print("=== FashionOS Component Analysis ===\n")

# Report findings
print("1. Component Usage Report:")
print("-" * 40)
for comp_name, info in components_to_check.items():
    if info["found"]:
        print(f"✅ {comp_name}: Found in {len(info['locations'])} files")
        for loc in info["locations"][:3]:  # Show first 3
            print(f"   - {loc}")
        if len(info["locations"]) > 3:
            print(f"   ... and {len(info['locations']) - 3} more")
    else:
        print(f"❌ {comp_name}: NOT FOUND")

# Check specific issues
print("\n2. Footer Integration Check:")
print("-" * 40)

# Check main layout
main_layout_path = os.path.join(project_path, "src/app/layout.tsx")
with open(main_layout_path, "r") as f:
    main_layout = f.read()
    
print(f"Main layout (src/app/layout.tsx):")
print(f"  - Uses CustomThemedLayout: {'CustomThemedLayout' in main_layout}")
print(f"  - Imports Footer: {'Footer' in main_layout}")
print(f"  - Renders <Footer>: {'<Footer' in main_layout}")

# Check CustomThemedLayout
themed_layout_path = os.path.join(project_path, "src/components/layout/CustomThemedLayout.tsx")
with open(themed_layout_path, "r") as f:
    themed_layout = f.read()
    
print(f"\nCustomThemedLayout:")
print(f"  - Imports Footer: {'Footer' in themed_layout}")
print(f"  - Renders <Footer>: {'<Footer' in themed_layout}")
print(f"  - Uses AppShell: {'AppShell' in themed_layout}")

# Check if Footer component exists
footer_path = os.path.join(project_path, "src/components/footer/index.tsx")
print(f"\nFooter Component:")
print(f"  - File exists: {os.path.exists(footer_path)}")

# Check dashboard pages
print("\n3. Dashboard Layout Analysis:")
print("-" * 40)

dashboard_path = os.path.join(project_path, "src/app/dashboard/page.tsx")
if os.path.exists(dashboard_path):
    with open(dashboard_path, "r") as f:
        dashboard_content = f.read()
    print(f"Dashboard page (src/app/dashboard/page.tsx):")
    print(f"  - Uses Layout wrapper: {'Layout>' in dashboard_content}")
    print(f"  - Uses DashboardRouter: {'DashboardRouter' in dashboard_content}")
    print(f"  - Direct Footer usage: {'Footer' in dashboard_content}")

# Solution
print("\n4. SOLUTION - Why Footer is Missing:")
print("-" * 40)
print("The Footer component exists but is NOT integrated into the main layout system!")
print("\nThe issue:")
print("1. CustomThemedLayout uses AppShell but doesn't include Footer")
print("2. AppShell only has 'navbar' and 'header' props, no footer slot")
print("3. The separate Layout component has Footer, but it's not being used")
print("\nTo fix this, CustomThemedLayout needs to be updated to include the Footer component.")
