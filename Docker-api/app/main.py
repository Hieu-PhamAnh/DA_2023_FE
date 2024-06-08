from fastapi import FastAPI
from pydantic import BaseModel
from app.model.model import prep

app = FastAPI()

class Input(BaseModel):
    stats: list[int]

class PredictionOut(BaseModel):
    position: int

@app.get("/")
def home():
    return {"message":"api predict"}

@app.post("/predict", response_model = PredictionOut)
def predict(payload: Input):
    print("Log tai main.py, payload.stats:",payload.stats)
    result = prep(payload.stats)
    print("Log tai main.py, result:",result[0])
    return {"position": result[0]}

# input_D = np.array([87.0,	73.0,	70.0,	84.0,	63.0,	74.0,	84.0,	84.0,	80.0,	74.0,	84.0,	13.0,	170,	68])
# input_M = np.array([86.0,	72.0,	55.0,	93.0,	78.0,	88.0,	92.0,	83.0,	79.0,	68.0,	76.0,	9.0,	173,	66])
# input_F = np.array([77.0,	92.0,	82.0,	82.0,	84.0,	69.0,	88.0,	41.0,	92.0,	62.0,	45.0,	37.0,	183,	86])