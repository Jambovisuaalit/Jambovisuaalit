import pandas as pd
from pybaseball import schedule_and_record
from config import RAW_DATA, DATA_DIR

def fetch_games(start_year=2018, end_year=2023):
    teams = [...]  # same defined list
    lst = []
    for year in range(start_year, end_year+1):
        for team in teams:
            try:
                df = schedule_and_record(year, team)
                df['year'] = year
                lst.append(df)
            except:
                pass
    return pd.concat(lst, ignore_index=True)

if __name__ == "__main__":
    DATA_DIR.mkdir(exist_ok=True)
    df = fetch_games()
    df.to_csv(RAW_DATA, index=False)
    print(f"Raw data saved to {RAW_DATA}")