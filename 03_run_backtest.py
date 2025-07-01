import pandas as pd, matplotlib.pyplot as plt
from config import FEATURE_DATA, BACKTEST_YEAR, INITIAL_BANKROLL, KELLY_FRACTION, VALUE_THRESHOLD, TARGET
from src.predict import ModelPredictor
from src.strategy import calculate_ev, get_kelly_stake

df = pd.read_csv(FEATURE_DATA, parse_dates=['Date'])
test = df[df['year']==BACKTEST_YEAR]
pred = ModelPredictor()

bankroll = INITIAL_BANKROLL
history=[bankroll]

for _, g in test.iterrows():
    prob = pred.predict_home_win(g)
    odds = g['DecimalOdds_Home']
    ev = calculate_ev(prob, odds)
    if ev > VALUE_THRESHOLD:
        stake = get_kelly_stake(prob, odds, bankroll, KELLY_FRACTION)
        if stake>0:
            bankroll += stake*(odds-1) if g[TARGET]==1 else -stake
    history.append(bankroll)

plt.plot(history); plt.show()
print("Final bankroll:", bankroll)