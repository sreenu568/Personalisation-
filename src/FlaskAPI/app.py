import threading
import time
import io
import base64
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from wordcloud import WordCloud
import matplotlib.pyplot as plt
from flask_ngrok import run_with_ngrok

app = Flask(__name__)
CORS(app)  # Enable CORS for all origins by default
#run_with_ngrok(app)
bearer_token = "AAAAAAAAAAAAAAAAAAAAAIbMtwEAAAAAqw5oqOo3o07SCqa1VZPPkEH5jf8%3D0OYxcrWdjl6KlCB9bNstF5j2Au3U4LWx85lbG83wRF3vn9rOdc"  # Replace with your actual bearer token

@app.route('/api/twitter/<username>')
def get_tweets(username):
    try:
        # Fetch user id first
        user_id = get_user_id(username)

        # Fetch user's tweets
        tweets = get_user_tweets(user_id)

        return jsonify(tweets)
    except Exception as e:
        print('Error fetching Twitter details:', e)
        return jsonify({'error': 'Failed to fetch Twitter details'}), 500

def get_user_id(username):
    url = f"https://api.twitter.com/2/users/by/username/{username}"
    headers = {
        'Authorization': f'Bearer {bearer_token}'
    }

    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return response.json()['data']['id']

def get_user_tweets(user_id):
    url = f"https://api.twitter.com/2/users/{user_id}/tweets"
    headers = {
        'Authorization': f'Bearer {bearer_token}'
    }
    params = {
        'tweet.fields': 'created_at'  # Specify additional tweet fields as needed
    }

    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()
    return [{
        'created_at': tweet['created_at'],
        'text': tweet['text']
    } for tweet in response.json()['data']]

if __name__ == '__main__':
    app.run(debug=False,host="0.0.0.0")
