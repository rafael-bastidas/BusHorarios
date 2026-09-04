import os
import sys

try:
    from PIL import Image, ImageDraw
except ImportError:
    print("PIL (Pillow) is not installed. Installing it now...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image, ImageDraw

def create_bus_icon(size, filename):
    # Background color (Aragón Gold)
    bg_color = (229, 169, 59) # #E5A93B
    fg_color = (18, 18, 20)   # #121214 (Dark Charcoal)
    accent_color = (255, 255, 255) # White
    
    # Create blank image with gold background
    image = Image.new("RGBA", (size, size), bg_color)
    draw = ImageDraw.Draw(image)
    
    # Let's draw a premium, stylized bus silhouette
    # Scale coordinates based on size
    scale = size / 512.0
    
    # Draw bus body (main rectangle with rounded top corners if possible, else standard polygon)
    # We will draw a modern bus shape
    
    # Bus main chassis
    left = 100 * scale
    top = 140 * scale
    right = 412 * scale
    bottom = 380 * scale
    
    # Draw body border/shadow or chassis
    draw.rounded_rectangle([left, top, right, bottom], radius=24 * scale, fill=fg_color)
    
    # Draw front window (windshield)
    w_left = 120 * scale
    w_top = 160 * scale
    w_right = 392 * scale
    w_bottom = 250 * scale
    draw.rounded_rectangle([w_left, w_top, w_right, w_bottom], radius=8 * scale, fill=accent_color)
    
    # Split windshield in two (modern split look)
    draw.rectangle([251 * scale, w_top, 261 * scale, w_bottom], fill=fg_color)
    
    # Draw lower front panel detail (headlights, grill)
    # Headlights
    draw.ellipse([130 * scale, 310 * scale, 170 * scale, 335 * scale], fill=bg_color)
    draw.ellipse([342 * scale, 310 * scale, 382 * scale, 335 * scale], fill=bg_color)
    
    # Grill (horizontal lines)
    grill_y1 = 300 * scale
    grill_y2 = 340 * scale
    draw.rounded_rectangle([190 * scale, grill_y1, 322 * scale, grill_y2], radius=6 * scale, fill=(40, 40, 42))
    draw.rectangle([200 * scale, grill_y1 + 10 * scale, 312 * scale, grill_y1 + 14 * scale], fill=bg_color)
    draw.rectangle([200 * scale, grill_y1 + 22 * scale, 312 * scale, grill_y1 + 26 * scale], fill=bg_color)
    
    # License plate
    draw.rectangle([220 * scale, 350 * scale, 292 * scale, 368 * scale], fill=accent_color)
    # Draw tiny lines for text
    draw.rectangle([230 * scale, 356 * scale, 282 * scale, 362 * scale], fill=fg_color)
    
    # Draw wheels (partially showing under the bus)
    wheel_y = 380 * scale
    draw.ellipse([120 * scale, wheel_y - 20 * scale, 170 * scale, wheel_y + 30 * scale], fill=(0, 0, 0))
    draw.ellipse([342 * scale, wheel_y - 20 * scale, 392 * scale, wheel_y + 30 * scale], fill=(0, 0, 0))
    
    # Wheel hubcaps
    draw.ellipse([135 * scale, wheel_y - 5 * scale, 155 * scale, wheel_y + 15 * scale], fill=(120, 120, 120))
    draw.ellipse([357 * scale, wheel_y - 5 * scale, 377 * scale, wheel_y + 15 * scale], fill=(120, 120, 120))
    
    # Draw some cool Moncayo mountains background or Aragon flags? Let's keep it clean and minimal.
    # Save the file
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    image.save(filename, "PNG")
    print(f"Created icon: {filename}")

if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.abspath(__file__))
    icons_dir = os.path.join(base_dir, "www", "icons")
    create_bus_icon(192, os.path.join(icons_dir, "icon-192.png"))
    create_bus_icon(512, os.path.join(icons_dir, "icon-512.png"))
    print("Done generating assets!")
