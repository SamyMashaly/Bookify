import sqlite3

import statics 


class Review :
    def insert_review(self,user_name,book_id,review,rate):
        conn = None
        try:
            conn = sqlite3.connect(statics.statics.DATABASE_NAME)
            cursor = conn.cursor()
            sql_q="insert into reviews(User_Name,book_id,review,rate) values(?,?,?,?)"
            cursor.execute(sql_q,(user_name,book_id,review,rate))
            conn.commit()
            print("insert done")
            return True

        except Exception as e:
            print(e)
            return False

        finally:
            if conn:
                conn.close()
        

         

            

    def selectAllreviews(self):
        conn = None
        try:
            conn = sqlite3.connect(statics.statics.DATABASE_NAME)
            conn.row_factory = sqlite3.Row  

            cursor = conn.execute("SELECT * FROM reviews")
            rows = cursor.fetchall()
            return [dict(row) for row in rows]
        
        except Exception as e:
            print(e)
            return False
        
        finally:
            if conn:
                conn.close()




    def delete_review(self,review_id):
        conn = None
        try:
            conn = sqlite3.connect(statics.statics.DATABASE_NAME)
            cursor = conn.cursor()
            sql_q="delete from reviews where review_id=?"
            cursor.execute(sql_q,(review_id,))
            conn.commit()

        except Exception as e:
            print(e)
            return False
        
        finally:
            if conn:
                conn.close()



    def get_book_reviews(self,book_id):

        conn = None
        try:
            
            conn = sqlite3.connect(statics.statics.DATABASE_NAME)
            conn.row_factory = sqlite3.Row 
            cursor = conn.cursor()
            sql_q="select * from reviews where book_id=? ORDER BY review_id DESC"
            rows = cursor.execute(sql_q,(book_id,))
            return [dict(row) for row in rows]
        
        except Exception as e:
            print(e)
            return []
        
        finally:
            if conn:
                conn.close()
       
