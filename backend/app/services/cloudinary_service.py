import cloudinary
import cloudinary.uploader
import uuid
from io import BytesIO
from PIL import Image
from app.core.config import settings

# Configure Cloudinary
cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True
)

async def upload_image_to_cloudinary(image_bytes: bytes, filename: str) -> str:
    """
    Uploads an image to Cloudinary and returns the secure URL.
    """
    unique_id = str(uuid.uuid4())

    try:
        image = Image.open(BytesIO(image_bytes))
        max_size = (1920, 1920)
        # Handle different Pillow versions safely
        resample_filter = getattr(Image, "Resampling", Image).LANCZOS
        image.thumbnail(max_size, resample_filter)
        output_io = BytesIO()
        format = "JPEG" if image.mode in ("RGB", "L") else "PNG"
        if image.mode in ("RGBA", "LA"):
            background = Image.new("RGB", image.size, (255, 255, 255))
            background.paste(image, mask=image.split()[-1])
            image = background
            format = "JPEG"
        image.save(output_io, format=format, quality=85, optimize=True)
        output_io.seek(0)
        processed_bytes = output_io.read()
    except Exception:
        processed_bytes = image_bytes

    upload_result = cloudinary.uploader.upload(
        processed_bytes,
        public_id=f"pins/{unique_id}",
        overwrite=True,
        resource_type="image",
    )

    return upload_result.get("secure_url")
