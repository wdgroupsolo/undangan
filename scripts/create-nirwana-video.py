import math
import subprocess
from PIL import Image

def create_smooth_cinematic_entrance_video():
    img1_path = "public/themes/nirwana-sarangan/gate-closed.jpg"
    img2_path = "public/themes/nirwana-sarangan/gate-opened.jpg"
    img3_path = "public/themes/nirwana-sarangan/gate-terrace.jpg"
    output_mp4 = "public/themes/nirwana-sarangan/nirwana-entrance-gate.mp4"

    im1 = Image.open(img1_path).convert('RGB')
    im2 = Image.open(img2_path).convert('RGB')
    im3 = Image.open(img3_path).convert('RGB')

    W, H = im1.size  # 768, 1376
    OUT_W, OUT_H = 720, 1280
    FPS = 30
    TOTAL_FRAMES = 114  # 3.8 seconds

    ffmpeg_cmd = [
        'ffmpeg', '-y',
        '-f', 'rawvideo',
        '-vcodec', 'rawvideo',
        '-s', f'{OUT_W}x{OUT_H}',
        '-pix_fmt', 'rgb24',
        '-r', str(FPS),
        '-i', '-',
        '-c:v', 'libx264',
        '-profile:v', 'high',
        '-level:v', '4.0',
        '-preset', 'slow',
        '-crf', '18',
        '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart',
        output_mp4
    ]

    proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE)

    def crop_zoom(img, zoom, shift_y=0.0):
        zw = int(W / zoom)
        zh = int(H / zoom)
        cx = W // 2
        cy = int(H // 2 + shift_y * (H // 4))

        x1 = max(0, min(W - zw, cx - zw // 2))
        y1 = max(0, min(H - zh, cy - zh // 2))
        x2 = x1 + zw
        y2 = y1 + zh

        cropped = img.crop((x1, y1, x2, y2))
        return cropped.resize((OUT_W, OUT_H), Image.Resampling.LANCZOS)

    def smooth_step(x):
        # 3x^2 - 2x^3 (smooth Hermite interpolation)
        x = max(0.0, min(1.0, x))
        return x * x * (3 - 2 * x)

    print(f"Rendering silky-smooth cinematic 3D entrance video ({TOTAL_FRAMES} frames)...")

    # Global camera forward movement: smooth constant glide forward
    for f in range(TOTAL_FRAMES):
        # Normalized time 0.0 to 1.0
        t = f / float(TOTAL_FRAMES)
        
        # Continuous camera push: smooth acceleration and glide
        # From t=0 to t=0.6: approaching gate, doors open
        # From t=0.6 to t=1.0: passing through gate onto terrace

        if f < 30:
            # Phase 1: Closed gate, camera approaches steadily (0.0s - 1.0s)
            p = f / 30.0
            zoom = 1.00 + 0.06 * smooth_step(p)
            frame = crop_zoom(im1, zoom, shift_y=0.05)

        elif f < 58:
            # Phase 2: Doors swing open smoothly in 3D (1.0s - 1.93s)
            # Both im1 and im2 share the EXACT same zoom and shift_y -> 0 ghosting!
            p = (f - 30) / (58.0 - 30.0)
            eased_p = smooth_step(p)

            zoom = 1.06 + 0.14 * p
            shift_y = 0.05 - 0.02 * p

            f1 = crop_zoom(im1, zoom, shift_y=shift_y)
            f2 = crop_zoom(im2, zoom, shift_y=shift_y)

            # Silky cross-dissolve: as doors swing open, view reveals opened gate naturally
            frame = Image.blend(f1, f2, eased_p)

        elif f < 80:
            # Phase 3: Gliding through the open gate towards the lake terrace (1.93s - 2.66s)
            p = (f - 58) / (80.0 - 58.0)
            zoom = 1.20 + 0.16 * p
            shift_y = 0.03 - 0.02 * p
            frame = crop_zoom(im2, zoom, shift_y=shift_y)

        else:
            # Phase 4: Stepping onto the terrace, wedding gazebo by the lake (2.66s - 3.8s)
            p = (f - 80) / (114.0 - 80.0)
            eased_p = smooth_step(p)

            zoom2 = 1.36 + 0.28 * p
            zoom3 = 1.00 + 0.14 * eased_p

            f2 = crop_zoom(im2, zoom2, shift_y=0.01)
            f3 = crop_zoom(im3, zoom3, shift_y=-0.02)

            frame = Image.blend(f2, f3, eased_p)

        proc.stdin.write(frame.tobytes())

    proc.stdin.close()
    proc.wait()
    print("Done! Perfectly smooth video generated at:", output_mp4)

if __name__ == "__main__":
    create_smooth_cinematic_entrance_video()
