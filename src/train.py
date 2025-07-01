import pandas as pd, xgboost as xgb, joblib
from sklearn.calibration import CalibratedClassifierCV
from config import FEATURE_DATA, MODEL_FILE, CALIBRATOR_FILE, FEATURES, TARGET, BACKTEST_YEAR, MODELS_DIR

df = pd.read_csv(FEATURE_DATA, parse_dates=['Date'])
train = df[df['year'] < BACKTEST_YEAR]
X, y = train[FEATURES], train[TARGET]

MODELS_DIR.mkdir(exist_ok=True)
mdl = xgb.XGBClassifier(...).fit(X, y)
cal = CalibratedClassifierCV(mdl, method='isotonic', cv='prefit').fit(X,y)

joblib.dump(mdl, MODEL_FILE)
joblib.dump(cal, CALIBRATOR_FILE)
print("Saved model & calibrator.")