from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from alphagocanvas.api.endpoints.admin import router as admin_router
from alphagocanvas.api.endpoints.authentication import router as auth_router
from alphagocanvas.api.endpoints.faculty import router as faculty_router
from alphagocanvas.api.endpoints.student import router as student_router

app = FastAPI()
app.include_router(auth_router)
app.include_router(admin_router)
app.include_router(student_router)
app.include_router(faculty_router)

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
async def root():
    return {"message": "Hello user"}


if __name__ == '__main__':
    import os

    print(auth_router.prefix)
    print(os.getcwd())
