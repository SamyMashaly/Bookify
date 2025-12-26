import sqlite3

import statics 

class categories :
    def select_all_categories(self):
                    
            conn = None
            try:
                conn = sqlite3.connect(statics.statics.DATABASE_NAME)
                conn.row_factory = sqlite3.Row  

                cursor = conn.execute("SELECT * FROM categories")
                rows = cursor.fetchall()
                return [dict(row) for row in rows]
            
            except Exception as e:
                print(e)
                return False
            
            finally:
                if conn:
                    conn.close()
