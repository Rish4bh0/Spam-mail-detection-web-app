from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.pipeline import Pipeline
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
from sklearn.model_selection import GridSearchCV
import joblib
from wordcloud import WordCloud
import matplotlib.pyplot as plt
import seaborn as sns

app = FastAPI()

class InputText(BaseModel):
    text: str

@app.post("/predict/")
async def predict_spam(input_text: InputText):
    message = input_text.text
    if not message:
        raise HTTPException(status_code=400, detail="Empty text")
    
    # Load the dataset
    df = pd.read_csv("spam.csv", encoding="ISO-8859-1")
    # Drop unnecessary columns
    cols = [2,3,4]
    df.drop(df.columns[cols], axis=1, inplace=True)
    # Rename columns
    df.rename(columns={'v1':'Category', 'v2':'Message'}, inplace=True)
    # Prepare data
    df['Category'] = df['Category'].apply(lambda x: 1 if x=='spam' else 0)
    X = df['Message']
    y = df['Category']
    X_train, _, y_train, _ = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Train Naive Bayes model
    clf_nb = Pipeline([
        ('vectorizer', CountVectorizer()),
        ('nb', MultinomialNB())
    ])
    clf_nb.fit(X_train, y_train)
    
    # Train SVM model
    clf_svm = Pipeline([
        ('vectorizer', CountVectorizer()),
        ('svc', SVC(C=1, gamma=0.0001, kernel='linear'))
    ])
    clf_svm.fit(X_train, y_train)
    
    # Train KNN model
    clf_knn = Pipeline([
        ('vectorizer', CountVectorizer()),
        ('knn', KNeighborsClassifier(n_neighbors=3))
    ])
    clf_knn.fit(X_train, y_train)
    
    # Make predictions
    pred_nb = clf_nb.predict([message])[0]
    pred_svm = clf_svm.predict([message])[0]
    pred_knn = clf_knn.predict([message])[0]
    
    return {"Naive Bayes": "spam" if pred_nb == 1 else "not spam",
            "SVM": "spam" if pred_svm == 1 else "not spam",
            "KNN": "spam" if pred_knn == 1 else "not spam"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)