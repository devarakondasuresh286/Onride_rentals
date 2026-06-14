from fastapi import APIRouter, Depends, File, UploadFile, HTTPException, status
from app.core.security import get_current_user
from app.services.cloudinary_service import upload_image_to_cloudinary

router = APIRouter()

@router.post("", response_model=dict)
async def upload_image(
    file: UploadFile = File(...),
    current_user = Depends(get_current_user),
) -> dict:
    """
    Upload an image file to Cloudinary and return the secure URL.
    """
    # Verify file is an image
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file must be an image.",
        )
    
    try:
        image_bytes = await file.read()
        secure_url = await upload_image_to_cloudinary(image_bytes, file.filename)
        return {"secure_url": secure_url}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to upload image: {str(e)}",
        )
