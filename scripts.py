import os

def list_dirs_ignoring_patterns(start_path, ignored_folders):
    # Convert ignored folders to a set for faster lookup
    ignored_set = set(ignored_folders)

    for root, dirs, files in os.walk(start_path):
        # --- The Magic Step ---
        # We modify 'dirs' in-place. os.walk will see the list is shorter
        # and will NOT go into the removed directories.
        # We iterate backwards to safely remove items while looping.
        for i in range(len(dirs) - 1, -1, -1):
            if dirs[i] in ignored_set:
                print(f"Skipping ignored: {os.path.join(root, dirs[i])}")
                del dirs[i]

        # Print the valid directories
        print(root)

# --- Configuration ---
target_folder = "." # Current directory
# Add the exact folder names you want to ignore here
ignore_list = ["node_modules", "src", ".git", "__pycache__", "dist"]

list_dirs_ignoring_patterns(target_folder, ignore_list)