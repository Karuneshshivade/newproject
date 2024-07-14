from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load CSV data
df = pd.read_csv('final.csv')

@app.route('/search', methods=['GET'])
def search():
    frontend = request.args.get('frontend', '').split(',')
    backend = request.args.get('backend', '').split(',')
    dbms = request.args.get('dbms', '').split(',')

    filtered_df = df

    if frontend and frontend != ['']:
        filtered_df = filtered_df[filtered_df['Frontend'].apply(lambda x: any(f.strip() in x.split(',') for f in frontend))]

    if backend and backend != ['']:
        filtered_df = filtered_df[filtered_df['Backend'].apply(lambda x: any(b.strip() in x.split(',') for b in backend))]

    if dbms and dbms != ['']:
        filtered_df = filtered_df[filtered_df['DBMS'].apply(lambda x: any(d.strip() in x.split(',') for d in dbms))]

    result = filtered_df.to_dict(orient='records')
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
