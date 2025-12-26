import sqlite3

import statics 


class Book :



    def getAllBooks():
            
        conn = None 
        try:
            conn = sqlite3.connect(statics.statics.DATABASE_NAME)
            conn.row_factory = sqlite3.Row 
            cursor = conn.cursor()
            sql_q="SELECT * FROM BOOKS"
            rows = cursor.execute(sql_q,())
            return [dict(row) for row in rows]
        
        except Exception as e:
            print(e)
            return False
        
        finally:
            if conn:
                conn.close()

       


#home
    def select_all_books_with_rating(self):
                    
                    conn = sqlite3.connect(statics.statics.DATABASE_NAME)
                    conn.row_factory = sqlite3.Row 
                    cursor = conn.cursor()  

                    sql_query = """SELECT new_table.BOOK_ID, new_table.avg_rate ,BOOKS.BOOK_NAME,BOOKS.CATEGORY_ID,BOOKS.DESCRIBTION,BOOKS.IMAGE_URL,CATEGORIES.CATEGORY_NAME,BOOKS.AUTHOR

            FROM (
                SELECT BOOKS.BOOK_ID, AVG(REVIEWS.RATE) AS avg_rate
                FROM BOOKS
                JOIN REVIEWS ON BOOKS.BOOK_ID = REVIEWS.BOOK_ID
                GROUP BY BOOKS.BOOK_ID
            ) 


            AS new_table JOIN BOOKS on new_table.BOOK_ID = BOOKS.BOOK_ID
                        JOIN CATEGORIES on CATEGORIES.CATEGORY_ID = BOOKS.CATEGORY_ID"""

                    cursor.execute(sql_query)
                    rows = cursor.fetchall()
                    return [dict(row) for row in rows]
    

    # def search_bar_search(self,book_name):
    #     conn = None
    #     try:
    #         conn = sqlite3.connect(statics.statics.DATABASE_NAME)
    #         conn.row_factory = sqlite3.Row
    #         cursor = conn.cursor()                      

    #         sql_q = "SELECT * FROM BOOKS WHERE AUTHOR LIKE :book_name "
    #         params = {'book_name': f'%{book_name}%'}


    #         return cursor.execute(sql_q, params).fetchall()
    #     except Exception as e:
    #         print(e)
    #         return False
    #     finally:
    #         if conn:
    #             conn.close()




    def see_more(self,category_id):
        conn = None
        try:
            conn = sqlite3.connect(statics.statics.DATABASE_NAME)
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()                      
            sql_q = "SELECT * FROM BOOKS WHERE category_id = :category_id"
            params = {'category_id': category_id}
            return cursor.execute(sql_q, params).fetchall()
        except Exception as e:
            print(e)
            return False
        finally:
            if conn:
                conn.close()

    

    def get_book_details(self, book_id):
        conn = None
        try:
            conn = sqlite3.connect(statics.statics.DATABASE_NAME)
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            sql_q = "SELECT * FROM BOOKS WHERE book_id = :book_id"
            params = {'book_id': book_id}
            book_row = cursor.execute(sql_q, params).fetchone()
            
            if book_row:
                book_dict = dict(book_row)
                
                sql_reviews = "SELECT User_Name, rate, review FROM reviews WHERE book_id = :book_id"
                reviews_rows = cursor.execute(sql_reviews, params).fetchall()
                
                reviews_list = []
                for row in reviews_rows:
                    reviews_list.append({
                        "user": row["User_Name"],
                        "rating": row["rate"],
                        "comment": row["review"]
                    })
                
                book_dict["reviews"] = reviews_list
                return book_dict
            return None
        except Exception as e:
            print(e)
            return False
        finally:
            if conn:
                conn.close()


    def advanced_search(self,category_id,author_name,book_title):
        conn = None
        try:
            conn = sqlite3.connect(statics.statics.DATABASE_NAME)
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()      
            
            
            sql_q =  """SELECT new_table.BOOK_ID, new_table.avg_rate ,BOOKS.BOOK_NAME,BOOKS.CATEGORY_ID,BOOKS.DESCRIBTION,BOOKS.IMAGE_URL,CATEGORIES.CATEGORY_NAME,AUTHOR


            FROM (
                SELECT BOOKS.BOOK_ID, AVG(REVIEWS.RATE) AS avg_rate
                FROM BOOKS
                JOIN REVIEWS ON BOOKS.BOOK_ID = REVIEWS.BOOK_ID
                GROUP BY BOOKS.BOOK_ID
            ) 


            AS new_table JOIN BOOKS on new_table.BOOK_ID = BOOKS.BOOK_ID
                        JOIN CATEGORIES on CATEGORIES.CATEGORY_ID = BOOKS.CATEGORY_ID 
            WHERE 1=1"""

            params = {}



            if book_title:
                sql_q += " AND book_name LIKE :book_name"
                params['book_name'] = f'%{book_title}%'
            if category_id:
                sql_q += " AND CATEGORIES.CATEGORY_ID = :category_title"
                params['category_title'] = category_id

            if author_name:
                sql_q += " AND AUTHOR LIKE :author_name"
                params['author_name'] = f'%{author_name}%'

            rows = cursor.execute(sql_q, params).fetchall()
            return [dict(row) for row in rows]  
        except Exception as e:
            print(e)
            return False
        finally:
            if conn:
                conn.close()




    def search_for_book(self, book_name):
        conn = None
        try:
            conn = sqlite3.connect(statics.statics.DATABASE_NAME)
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()              

            sql_q = "SELECT * FROM BOOKS WHERE book_name LIKE :book_name OR author LIKE :book_name"
            params = {'book_name': f'%{book_name}%'}
            rows = cursor.execute(sql_q, params).fetchall()
            return [dict(row) for row in rows]

        except Exception as e:
            print(e)
            return False
        finally:
            if conn:
                conn.close()    
