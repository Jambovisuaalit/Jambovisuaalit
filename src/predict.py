import joblib, pandas as pd
from config import MODEL_FILE, CALIBRATOR_FILE, FEATURES

class ModelPredictor:
    def __init__(self):
        self.cal = joblib.load(CALIBRATOR_FILE)

    def predict_home_win(self, game_row: pd.Series) -> float:
        return self.cal.predict_proba(game_row.to_frame().T[FEATURES])[:,1][0]