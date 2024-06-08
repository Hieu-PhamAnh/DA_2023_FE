import pickle
import numpy as np
from pathlib import Path

BASE_DIR = Path(__file__).resolve(strict=True).parent

with open(f"{BASE_DIR}/GradientBoostingClassifier_v1.pkl","rb") as f:
    model = pickle.load(f)

def prep(stats):
    print("Log tai model.py, stats:",stats)
    prep = np.array(stats).reshape(1, -1)
    result = model.predict(prep)
    print("Log tai model.py, result:",result)
    return result
