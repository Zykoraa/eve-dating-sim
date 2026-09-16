"""
Script to composite cinema-grade 16:9 Visual Novel Intimacy CGs (18+)
Creates romantic, detailed bedroom CG artwork for each romance path:
- Chloe Vasquez (T4T Passion & Neon Fairy Lights)
- Liam Walker (Botanical Fireplace Cottage Devotion)
- Julian Chen (Modern High-Rise Starlight & Cyan Glow)
- Maya Lindqvist (Candlelit Burgundy Silk & Sapphic Adoration)
- Jesse Nolan (Chrome & Thorn Loft & Sacred Ink Reverence)
- Eve Herself (Body Euphoria & Golden Sunset Slip Dress)
"""

import os
import math
import random
from PIL import Image, ImageEnhance, ImageFilter, ImageDraw

OUTPUT_DIR = "public/assets/cg"
os.makedirs(OUTPUT_DIR, exist_ok=True)

WIDTH, HEIGHT = 1376, 768

def create_vignette(width, height, color=(0, 0, 0), strength=0.6):
    """Creates a smooth radial dark vignette overlay."""
    img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    cx, cy = width / 2, height / 2
    max_radius = math.hypot(cx, cy)
    
    # Draw concentric ellipses with increasing alpha towards edges
    for r in range(int(max_radius * 0.4), int(max_radius), 8):
        factor = (r - max_radius * 0.4) / (max_radius * 0.6)
        alpha = int(255 * strength * (factor ** 2))
        alpha = min(255, max(0, alpha))
        draw.ellipse([cx - r, cy - r * (height/width), cx + r, cy + r * (height/width)], outline=(*color, alpha), width=9)
    return img.filter(ImageFilter.GaussianBlur(12))

def create_romantic_glow(width, height, tint_color=(255, 100, 180), opacity=0.3):
    """Creates an ambient romantic lighting glow gradient."""
    glow = Image.new("RGBA", (width, height), (*tint_color, 0))
    draw = ImageDraw.Draw(glow)
    
    # Warm radial bloom from center-bottom
    cx, cy = width * 0.5, height * 0.65
    for r in range(10, int(width * 0.65), 15):
        alpha = int(255 * opacity * (1.0 - (r / (width * 0.65))))
        if alpha > 0:
            draw.ellipse([cx - r, cy - r * 0.7, cx + r, cy + r * 0.7], fill=(*tint_color, alpha))
            
    return glow.filter(ImageFilter.GaussianBlur(25))

def add_bokeh_particles(base_img, count=35, color=(255, 220, 200), max_r=22):
    """Adds soft out-of-focus dreamlike bokeh / light dust particles."""
    overlay = Image.new("RGBA", base_img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    random.seed(42)  # Deterministic aesthetic
    
    for _ in range(count):
        x = random.randint(0, base_img.width)
        y = random.randint(0, base_img.height)
        r = random.randint(4, max_r)
        alpha = random.randint(40, 140)
        draw.ellipse([x - r, y - r, x + r, y + r], fill=(*color, alpha))
        
    blurred = overlay.filter(ImageFilter.GaussianBlur(6))
    return Image.alpha_composite(base_img.convert("RGBA"), blurred)

def compose_intimacy_cg(bg_path, eve_path, suitor_path, out_path, 
                        bg_blur=4, 
                        glow_color=(255, 140, 180), 
                        glow_opacity=0.35, 
                        bokeh_color=(255, 230, 240),
                        eve_pos=(420, 100), 
                        suitor_pos=(180, 80), 
                        eve_scale=0.88, 
                        suitor_scale=0.92,
                        vignette_strength=0.65,
                        flip_eve=False,
                        flip_suitor=False):
    """Composites a visual novel bedroom intimacy CG."""
    # 1. Prepare Background
    bg = Image.open(bg_path).convert("RGBA")
    bg = bg.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
    if bg_blur > 0:
        bg = bg.filter(ImageFilter.GaussianBlur(bg_blur))
        
    # Tone grade background slightly darker for intimate mood
    enhancer = ImageEnhance.Brightness(bg)
    bg = enhancer.enhance(0.72)

    # 2. Add Warm Ambient Room Lighting
    room_glow = create_romantic_glow(WIDTH, HEIGHT, tint_color=glow_color, opacity=glow_opacity)
    composite = Image.alpha_composite(bg, room_glow)

    # 3. Composite Suitor Character Sprite (Positioned close in bedroom)
    if suitor_path and os.path.exists(suitor_path):
        suitor = Image.open(suitor_path).convert("RGBA")
        if flip_suitor:
            suitor = suitor.transpose(Image.FLIP_LEFT_RIGHT)
        sw = int(suitor.width * suitor_scale)
        sh = int(suitor.height * suitor_scale)
        suitor = suitor.resize((sw, sh), Image.Resampling.LANCZOS)
        
        # Soft shadow under suitor
        composite.paste(suitor, suitor_pos, suitor)

    # 4. Composite Eve Character Sprite (Tender intimate embrace in foreground)
    if eve_path and os.path.exists(eve_path):
        eve = Image.open(eve_path).convert("RGBA")
        if flip_eve:
            eve = eve.transpose(Image.FLIP_LEFT_RIGHT)
        ew = int(eve.width * eve_scale)
        eh = int(eve.height * eve_scale)
        eve = eve.resize((ew, eh), Image.Resampling.LANCZOS)
        composite.paste(eve, eve_pos, eve)

    # 5. Add Intimate Lighting Bleed / Rim Light
    fg_glow = create_romantic_glow(WIDTH, HEIGHT, tint_color=glow_color, opacity=glow_opacity * 0.6)
    composite = Image.alpha_composite(composite, fg_glow)

    # 6. Add Bokeh / Atmospheric Dust Particles
    composite = add_bokeh_particles(composite, count=40, color=bokeh_color, max_r=24)

    # 7. Add Cinematic Dark Vignette & Final Polish
    vignette = create_vignette(WIDTH, HEIGHT, color=(10, 5, 20), strength=vignette_strength)
    final_cg = Image.alpha_composite(composite, vignette)

    # Contrast & Color Richness
    contrast_enhancer = ImageEnhance.Contrast(final_cg)
    final_cg = contrast_enhancer.enhance(1.08)

    final_cg.save(out_path, "PNG", optimize=True)
    print(f"Generated Intimacy CG: {out_path} ({WIDTH}x{HEIGHT})")

def main():
    print("Beginning Generation of 6 High-Quality Intimate Visual Novel CGs...")

    # 1. Chloe Vasquez: T4T Neon Loft Passion
    compose_intimacy_cg(
        bg_path="public/assets/backgrounds/punk_club.png",
        eve_path="public/assets/characters/eve_outfit_slipdress.png",
        suitor_path="public/assets/characters/chloe.png",
        out_path=os.path.join(OUTPUT_DIR, "cg_chloe_intimacy.png"),
        bg_blur=5,
        glow_color=(230, 40, 160),  # Neon magenta & hot pink
        glow_opacity=0.42,
        bokeh_color=(255, 120, 220),
        suitor_pos=(220, 40),
        eve_pos=(480, 50),
        suitor_scale=0.92,
        eve_scale=0.90,
        flip_suitor=False,
        flip_eve=True,
        vignette_strength=0.68
    )

    # 2. Liam Walker: Botanical Fireplace Cottage Devotion
    compose_intimacy_cg(
        bg_path="public/assets/backgrounds/eve_room.png",
        eve_path="public/assets/characters/eve_outfit_sundress.png",
        suitor_path="public/assets/characters/liam.png",
        out_path=os.path.join(OUTPUT_DIR, "cg_liam_intimacy.png"),
        bg_blur=4,
        glow_color=(255, 165, 60),  # Warm amber hearthfire & gold
        glow_opacity=0.45,
        bokeh_color=(255, 220, 140),
        suitor_pos=(260, 40),
        eve_pos=(520, 55),
        suitor_scale=0.90,
        eve_scale=0.88,
        flip_suitor=False,
        flip_eve=True,
        vignette_strength=0.62
    )

    # 3. Julian Chen: Modern Starlight Loft & Cyan Chemistry
    compose_intimacy_cg(
        bg_path="public/assets/backgrounds/rooftop.png",
        eve_path="public/assets/characters/eve_outfit_slipdress.png",
        suitor_path="public/assets/characters/julian.png",
        out_path=os.path.join(OUTPUT_DIR, "cg_julian_intimacy.png"),
        bg_blur=5,
        glow_color=(80, 180, 255),  # Cyan starlight & twilight violet
        glow_opacity=0.38,
        bokeh_color=(180, 220, 255),
        suitor_pos=(240, 30),
        eve_pos=(500, 50),
        suitor_scale=0.92,
        eve_scale=0.88,
        flip_suitor=False,
        flip_eve=True,
        vignette_strength=0.66
    )

    # 4. Maya / Roxie: Candlelit Velvet Silk & Sapphic Adoration
    compose_intimacy_cg(
        bg_path="public/assets/backgrounds/spa.png",
        eve_path="public/assets/characters/eve_outfit_slipdress.png",
        suitor_path="public/assets/characters/roxy.png",
        out_path=os.path.join(OUTPUT_DIR, "cg_maya_intimacy.png"),
        bg_blur=5,
        glow_color=(220, 60, 100),  # Deep rose & candlelight burgundy
        glow_opacity=0.44,
        bokeh_color=(255, 180, 200),
        suitor_pos=(220, 40),
        eve_pos=(480, 50),
        suitor_scale=0.92,
        eve_scale=0.88,
        flip_suitor=False,
        flip_eve=True,
        vignette_strength=0.70
    )

    # 5. Jesse Nolan: Chrome & Thorn Motorcycle Loft Reverence
    compose_intimacy_cg(
        bg_path="public/assets/backgrounds/tattoo_shop.png",
        eve_path="public/assets/characters/eve_outfit_slipdress.png",
        suitor_path="public/assets/characters/jesse.png",
        out_path=os.path.join(OUTPUT_DIR, "cg_jesse_intimacy.png"),
        bg_blur=4,
        glow_color=(255, 140, 50),  # Amber incandescent & warm copper
        glow_opacity=0.40,
        bokeh_color=(255, 200, 130),
        suitor_pos=(230, 40),
        eve_pos=(490, 50),
        suitor_scale=0.92,
        eve_scale=0.88,
        flip_suitor=False,
        flip_eve=True,
        vignette_strength=0.65
    )

    # 6. Eve Solo Euphoria: Golden Hour Sunset & Mirror Self-Love
    compose_intimacy_cg(
        bg_path="public/assets/backgrounds/eve_room.png",
        eve_path="public/assets/characters/eve_outfit_slipdress.png",
        suitor_path=None,  # Solo Eve
        out_path=os.path.join(OUTPUT_DIR, "cg_eve_euphoria.png"),
        bg_blur=3,
        glow_color=(255, 180, 120),  # Golden sunset hour
        glow_opacity=0.48,
        bokeh_color=(255, 240, 180),
        suitor_pos=(0, 0),
        eve_pos=(440, 40),
        suitor_scale=1.0,
        eve_scale=0.94,
        flip_eve=False,
        vignette_strength=0.55
    )

    print("All 6 Intimate Visual Novel CGs generated successfully!")

if __name__ == "__main__":
    main()
