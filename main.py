from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, RedirectResponse
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from routes import review_routes
from routes import book_route
from routes import cetegory_route

app = FastAPI()

# Print validation errors to console for debugging
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    print(f"Validation Error: {exc.errors()}")
    return JSONResponse(status_code=422, content={"detail": exc.errors()})



app.mount("/static", StaticFiles(directory="static"), name="static")
 

@app.get("/")
def read_root():
    # Redirect to the static index file so relative links (like categories.html) work correctly
    return RedirectResponse(url="/static/index.html")




# 2. تشغيل الراوتر
app.include_router(review_routes.router)
app.include_router(book_route.router)
app.include_router(cetegory_route.router)





# Run server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
