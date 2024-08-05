from flask import Flask
from pyngrok import ngrok
from flask_ngrok import run_with_ngrok

sample = Flask(__name__)
run_with_ngrok(sample)
@sample.route('/')
def home():
    return 'Hello, World!'

if __name__ == '__main__':
    # Open a ngrok tunnel to the Flask app
    #public_url = ngrok.connect(5000)
    #print(" * ngrok tunnel \"{}\" -> \"http://127.0.0.1:5000\"".format(public_url))
    
    # Start the Flask app, listening on all interfaces
    sample.run()
