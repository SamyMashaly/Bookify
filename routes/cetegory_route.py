from fastapi import APIRouter
from pydantic import BaseModel
from tables.category import categories


router = APIRouter(prefix="/categories", tags=["categories"])

@router.get("/")
def get_all_categories():  
        category_table = categories()  
        return category_table.select_all_categories()   