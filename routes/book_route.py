from fastapi import APIRouter
from pydantic import BaseModel
from tables.book import Book


router = APIRouter(prefix="/books", tags=["books"])

@router.get("/")
def get_all_books():  
        book_table = Book()  
        return book_table.getAllBooks()


@router.get("/getAllBooksWithRating")
def getAllBooksWithRating():  
        book_table = Book()  
        return book_table.select_all_books_with_rating()


# @router.get("/search")
# def advanced_search(from_date: str = None, to_date: str = None, category_title: str = None, author_name: str = None):
#     book_table = Book()
#     return book_table.advanced_search(from_date, to_date, category_title, author_name)

@router.get("/search")
def advanced_search(book_title: str = None, author: str = None, my_categories: str = None):
    book_table = Book()
    category_id = None
    if my_categories and my_categories.isdigit():
        category_id = int(my_categories)
    return book_table.advanced_search(category_id, author, book_title)
    



    



@router.get("/search/{search_term}")
def search_for_book(search_term: str):
    book_table = Book()
    return book_table.search_for_book(search_term)


# @router.get("/search_bar/{book_name}")
# def search_bar_search(book_name: str):
#     book_table = Book()
#     return book_table.search_bar_search(book_name)



@router.get("/seeMore/{category_id}")
def see_more(category_id: int):
    book_table = Book()
    return book_table.see_more(category_id)


@router.get("/{book_id}")
def get_book_details(book_id: int):
    book_table = Book()
    return book_table.get_book_details(book_id)
