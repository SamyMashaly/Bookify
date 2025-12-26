from fastapi import APIRouter
from pydantic import BaseModel
from tables.review import Review


router = APIRouter(prefix="/reviews", tags=["reviews"])

# 1. الروت الأساسي
@router.get("/")
def get_all_reviews():  # غيرنا الاسم عشان مايتكررش
    # review_table = Review  <-- دي غلط
    review_table = Review()  # <-- الصح: لازم قوسين
    return review_table.selectAllreviews()




@router.post("/")
def insert_review(payload: dict):
    review_class = Review()
    review_class.insert_review(payload["user_name"], payload["book_id"], payload["review"], payload["rate"])
    return "insert done"


@router.delete("/{review_id}")
def delete_review(review_id: int):
    review_class = Review()
    review_class.delete_review(review_id)
    return "delete done"







@router.get("/{review_id}")
def get_reviews_details(review_id: int):
    review_class = Review()
    return review_class.get_review_details(review_id)



@router.get("/getBookReviews/{book_id}")
def get_book_reviews(book_id: int):
    review_class = Review()
    
    return review_class.get_book_reviews(book_id)










@router.get("/ali")  
def get_ali():
    return "Aliiiiiii"


@router.get("/samy")
def get_samy():       
    return "samy"