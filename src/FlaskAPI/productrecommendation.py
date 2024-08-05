from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_openai.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
#from flask_ngrok import run_with_ngrok

app = Flask(__name__)
CORS(app)
#run_with_ngrok(app)

# Assuming you have your Twitter API and OpenAI API keys set up here

def generate_wordcloud(tweets):
    # Your word cloud generation logic here
    pass

@app.route('/home')
def hello_twitter():
    return 'Hello OpenAI'

@app.route('/extract', methods=['POST'])
def extract_tweets():
    data = request.json
    tweets = data['tweets']
    try:
        # Your Twitter API code to fetch tweets
        # tweets = []  # Placeholder for fetched tweets
        wordcloud_url = generate_wordcloud(tweets)  # Generate word cloud and get URL

        return jsonify({"wordcloud_url": wordcloud_url, "tweets": tweets})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    tweets = data['tweets']
    movie_titles = data['selected_movies']
    # movie_reviews = data['movie_reviews']
    book_titles = data['selected_books']

    OPENAI_API_KEY ="sk-proj-lx3gJyUf4CBET9kL6CyIT3BlbkFJtgKPJfzidV0Kzn66y8PV"
    model = ChatOpenAI(openai_api_key=OPENAI_API_KEY, model="gpt-3.5-turbo")

    template = """Task: Generate a book recommendation based on the user's movie history details, Twitter profile description, and posted tweets.

    Input Data: using given data {question} which contains user movies details, user tweets, and books option list. Based on this, recommend the book title based on the option list {choices}.
   
    Desired Output: Recommended book title from the choices (option list) that best matches the user's history, profile description, and tweets. Additionally, provide a brief explanation of why this book was recommended based on the user's movies and tweets.
    Note: Don't assume book titles not listed in the option list {choices}. Only provide the book title and the reason for the recommendation in the output.

    Recommendation Logic:

    To generate a relevant book title recommendation for the given user, follow these steps:

    1. Analyze Preferences: Determine the user's preferred genres and themes based on given movie list, reviews, and tweets.

    2. Match Choices: Compare the user's preferences with the provided book title choices.

    3. Recommend Book: Select the book title from the given choices (option list) that best aligns with the user's movie preferences and interests expressed on Twitter. Provide a brief reason explaining why this book was chosen based on the user's movies and tweets, formatted as follows:

    Recommended Book: <Book Title>
    Reason: <Brief explanation>"""

    prompt = ChatPromptTemplate.from_template(template)
    parser = StrOutputParser()

    data_input = {
        "Movie details": movie_titles,
        "Tweet": tweets,
        "Choices": book_titles
    }

    chain = (
        {"choices": lambda x: data_input["Choices"], "question": RunnablePassthrough()}
        | prompt
        | model
        | parser
    )

    try:
        recommendation = chain.invoke(str(data_input))
        return jsonify({"recommendation": recommendation})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=6005)
