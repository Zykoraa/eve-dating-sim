import os
from collections import deque
import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter, binary_fill_holes

def process_sprite(src_path: str, dst_path: str, is_era4: bool = False):
    print(f"Processing {os.path.basename(src_path)} -> {os.path.basename(dst_path)}...")
    img = Image.open(src_path).convert('RGB')
    arr = np.array(img, dtype=np.float32)
    H, W, _ = arr.shape
    
    if is_era4:
        # Studio background vertical gradient interpolation
        bg_left = arr[:, :15, :].mean(axis=1)
        bg_right = arr[:, -15:, :].mean(axis=1)
        bg_y = (bg_left + bg_right) / 2.0
        bg_map = np.tile(bg_y[:, np.newaxis, :], (1, W, 1))
        diff = np.sqrt(np.sum((arr - bg_map)**2, axis=2))
        is_bg = diff < 22.0
        bg_edge_color = bg_map
    else:
        # Near-white backdrop detection
        bg_corner = np.concatenate([
            arr[:20, :20, :].reshape(-1, 3),
            arr[:20, -20:, :].reshape(-1, 3),
            arr[-20:, :20, :].reshape(-1, 3),
            arr[-20:, -20:, :].reshape(-1, 3)
        ], axis=0).mean(axis=0)
        diff = np.sqrt(np.sum((arr - bg_corner)**2, axis=2))
        is_bg = (diff < 20.0) | ((arr[:,:,0] > 242) & (arr[:,:,1] > 242) & (arr[:,:,2] > 242))
        bg_edge_color = np.tile(bg_corner.reshape(1, 1, 3), (H, W, 1))
        
    # BFS flood fill from 4 outer edges
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
                    
    # Foreground mask
    fg_mask = ~visited
    # Fill internal holes to protect jewelry, eye whites, teeth, and white accessories
    fg_mask = binary_fill_holes(fg_mask)
    
    # Antialiased soft edge with gaussian filter
    alpha = fg_mask.astype(np.float32)
    smooth_alpha = gaussian_filter(alpha, sigma=0.9)
    smooth_alpha = np.clip((smooth_alpha - 0.2) / 0.6, 0.0, 1.0)
    
    # Defringe edge pixels to eliminate white halos
    unmixed = arr.copy()
    edge_pixels = (smooth_alpha > 0.02) & (smooth_alpha < 0.98)
    a_edge = smooth_alpha[edge_pixels, np.newaxis]
    bg_edge = bg_edge_color[edge_pixels]
    unmixed[edge_pixels] = np.clip((arr[edge_pixels] - (1.0 - a_edge) * bg_edge) / np.maximum(a_edge, 0.1), 0, 255)
    
    rgba = np.zeros((H, W, 4), dtype=np.uint8)
    rgba[:, :, :3] = np.clip(unmixed, 0, 255).astype(np.uint8)
    rgba[:, :, 3] = (smooth_alpha * 255).astype(np.uint8)
    
    out = Image.fromarray(rgba, 'RGBA')
    os.makedirs(os.path.dirname(dst_path), exist_ok=True)
    out.save(dst_path, 'PNG', optimize=True)
    print(f"Saved {dst_path} successfully.")

if __name__ == '__main__':
    print("Sprite background processor utility initialized.")
