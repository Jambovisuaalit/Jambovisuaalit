from pathlib import Path

BASE_DIR = Path(__file__).parent
DATA_DIR = BASE_DIR / "data"
MODELS_DIR = BASE_DIR / "models"

RAW_DATA = DATA_DIR / "mlb_raw_games_2018_2023.csv"
ODDS_DATA = DATA_DIR / "mlb_odds_2018_2023.csv"
FEATURE_DATA = DATA_DIR / "mlb_featured_games.csv"

MODEL_FILE = MODELS_DIR / "xgb_model.joblib"
CALIBRATOR_FILE = MODELS_DIR / "calibrator.joblib"

TARGET = 'HomeWin'
FEATURES = [
    'Home_RS_Roll', 'Home_RA_Roll', 'Home_Win_Pct_Roll',
    'Away_RS_Roll', 'Away_RA_Roll', 'Away_Win_Pct_Roll',
    'DecimalOdds_Home'
]

BACKTEST_YEAR = 2023
INITIAL_BANKROLL = 1000
KELLY_FRACTION = 0.25
VALUE_THRESHOLD = 0.01