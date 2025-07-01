def calculate_ev(prob, odds): return prob*odds - 1
def get_kelly_stake(prob, odds, bankroll, fraction):
    edge=prob*odds-1
    if edge<=0: return 0
    return bankroll*(edge/(odds-1))*fraction