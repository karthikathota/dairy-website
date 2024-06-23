from flask import Flask, render_template, request, jsonify
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from flask_cors import CORS
import nltk

nltk.download('vader_lexicon')

app = Flask(__name__)
CORS(app)

# Load the SentimentIntensityAnalyzer outside the route to improve performance
sid = SentimentIntensityAnalyzer()

@app.route('/', methods=["GET", "POST"])

def welcome():
  if request.method == "POST":
    inp = request.form.get("inp")
    score = sid.polarity_scores(inp)

    # Define broader threshold values for neutral sentiment
    neutral_threshold_low = -0.25
    neutral_threshold_high = 0.25

    if score["compound"] >= neutral_threshold_high:
      return render_template('newentry.html', message="POSITIVE")
    elif score["compound"] <= neutral_threshold_low:
      return render_template('newentry.html', message="NEGATIVE")
    else:
      return render_template('newentry.html', message="NEUTRAL")

  return render_template('newentry.html')

@app.route('/predict_sentiment', methods=["POST"])

def predict_sentiment():
  # JSON data
  request_data = request.json
  if request_data and 'text' in request_data:
    text = request_data['text']

    # Predict sentiment
    score = sid.polarity_scores(text)

    # Print out the compound score for debugging
    print("Compound Score:", score["compound"])

    # Determine sentiment based on adjusted compound score
    if score["compound"] >= 0.05:
      sentiment = "POSITIVE"
    elif score["compound"] <= -0.05:
      sentiment = "NEGATIVE"
    else:
      sentiment = "NEUTRAL"

    return jsonify({"sentiment": sentiment})
  else:
    return jsonify({"error": "Text field not found in request data"}), 400
