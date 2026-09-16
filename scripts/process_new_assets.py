import os
from collections import deque
import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter, binary_fill_holes

BRAIN_DIR = r"C:\Users\Jonathan\.gemini\antigravity-cli\brain\11328f08-1a7e-483d-b61e-31ab7c925a60"
BG_DIR = r"C:\Users\Jonathan\Projects\eve-dating-sim\public\assets\backgrounds"
CHAR_DIR = r"C:\Users\Jonathan\Projects\eve-dating-sim\public\assets\characters"

BACKGROUND_MAP = {
    "clinic_bg_1789538919580.jpg": "clinic.png",
    "cabaret_bg_1789538939294.jpg": "cabaret.png",
    "tattoo_shop_bg_1789538960262.jpg": "tattoo_shop.png",
    "boardwalk_bg_1789538984885.jpg": "boardwalk.png",
    "spa_bg_1789539011120.jpg": "spa.png",
    "overlook_bg_1789539038262.jpg": "overlook.png",
    "courthouse_bg_1789539068924.jpg": "courthouse.png",
}

SPRITE_MAP = {
    "roxy_sprite_1789539111600.jpg": ("roxy.png", "roxy_avatar.png"),
    "jesse_sprite_1789539150818.jpg": ("jesse.png", "jesse_avatar.png"),
    "dr_shaw_sprite_1789539199167.jpg": ("dr_shaw.png", "dr_shaw_avatar.png"),
}

def convert_backgrounds():
    for src_name, dst_name in BACKGROUND_MAP.items():
        src_path = os.path.join(BRAIN_DIR, src_name)
        dst_path = os.path.join(BG_DIR, dst_name)
        if os.path.exists(src_path):
            print(f"Converting background {src_name} -> {dst_name}...")
            img = Image.open(src_path).convert('RGB')
            img.save(dst_path, format='PNG', optimize=True)
            print(f"Saved {dst_path} ({img.size})")

def process_sprite(src_path: str, dst_path: str):
    print(f"Processing sprite {os.path.basename(src_path)} -> {os.path.basename(dst_path)}...")
    img = Image.open(src_path).convert('RGB')
    arr = np.array(img, dtype=np.float32)
    H, W, _ = arr.shape
    
    # Near-white backdrop detection
    bg_corner = np.concatenate([
        arr[:20, :20, :].reshape(-1, 3),
        arr[:20, -20:, :].reshape(-1, 3),
        arr[-20:, :20, :].reshape(-1, 3),
        arr[-20:, -20:, :].reshape(-1, 3)
    ], axis=0).mean(axis=0)
    diff = np.sqrt(np.sum((arr - bg_corner)**2, axis=2))
    is_bg = (diff < 22.0) | ((arr[:,:,0] > 240) & (arr[:,:,1] > 240) & (arr[:,:,2] > 240))
    
    # Flood fill
    visited = np.zeros((H, W), dtype=bool)
    q = deque()
    for x in range(W):
        if is_bg[0, x]:
            visited[0, x] = True
            q.append((0, x))
        if is_bg[H-1, x]:
            visited[H-1, x] = True
            q.append((H-1, x))
    for y in range(H):
        if is_bg[y, 0] and not visited[y, 0]:
            visited[y, 0] = True
            q.append((y, 0))
        if is_bg[y, W-1] and not visited[y, W-1]:
            visited[y, W-1] = True
            q.append((y, W-1))
            
    while q:
        cy, cx = q.popleft()
        for dy, dx in [(-1,0), (1,0), (0,-1), (0,1)]:
            ny, nx = cy + dy, cx + dx
            if 0 <= ny < H and 0 <= nx < W:
                if not visited[ny, nx] and is_bg[ny, nx]:
                    visited[ny, nx] = True
                    q.append((ny, nx))
                    
    character_mask = ~visited
    character_mask = binary_fill_holes(character_mask)
    
    smooth_mask = gaussian_filter(character_mask.astype(np.float32), sigma=0.8)
    alpha = np.clip(smooth_mask * 255.0, 0, 255).astype(np.uint8)
    
    # Edge defringing
    bg_color = bg_corner.reshape(1, 1, 3)
    color_arr = arr.copy()
    norm_alpha = (alpha.astype(np.float32) / 255.0)[:, :, np.newaxis]
    semi_transparent = (norm_alpha > 0.05) & (norm_alpha < 0.95)
    
    unmixed = (color_arr - bg_color * (1.0 - norm_alpha)) / np.maximum(norm_alpha, 0.01)
    color_arr[semi_transparent[:,:,0]] = np.clip(unmixed[semi_transparent[:,:,0]], 0, 255)
    
    rgba = np.dstack((color_arr.astype(np.uint8), alpha))
    out_img = Image.fromarray(rgba, mode='RGBA')
    out_img.save(dst_path, format='PNG', optimize=True)
    print(f"Saved sprite {dst_path} ({out_img.size})")
    return out_img

def create_avatar(sprite_img: Image.Image, dst_path: str):
    # Crop to upper torso and face (approx top 40% centered)
    W, H = sprite_img.size
    face_box = (int(W * 0.15), int(H * 0.03), int(W * 0.85), int(H * 0.40))
    face_crop = sprite_img.crop(face_box)
    
    # Make square by adding padding or cropping
    cw, ch = face_crop.size
    dim = min(cw, ch)
    left = (cw - dim) // 2
    top = (ch - dim) // 2
    square_crop = face_crop.crop((left, top, left + dim, top + dim))
    resized = square_crop.resize((256, 256), Image.Resampling.LANCZOS)
    resized.save(dst_path, format='PNG', optimize=True)
    print(f"Saved avatar {dst_path}")

if __name__ == "__main__":
    convert_backgrounds()
    for src_name, (sprite_dst, avatar_dst) in SPRITE_MAP.items():
        src_path = os.path.join(BRAIN_DIR, src_name)
        dst_sprite_path = os.path.join(CHAR_DIR, sprite_dst)
        dst_avatar_path = os.path.join(CHAR_DIR, avatar_dst)
        if os.path.exists(src_path):
            sprite_img = process_sprite(src_path, dst_sprite_path)
            create_avatar(sprite_img, dst_avatar_path)
    print("All assets processed successfully!")
