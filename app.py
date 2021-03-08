from flask import Flask, request ,jsonify, render_template, url_for
from flask_cors import CORS
import pandas as pd
import numpy as np
import pickle
from utils import ScoringEngine

# create the Flask app
app = Flask(__name__)
CORS(app)

Internet_model = pickle.load(open('./Models/Internet_model.sav','rb'))
Radio_model = pickle.load(open('./Models/Radio_model.sav','rb'))
TV_model = pickle.load(open('./Models/TV_model.sav','rb'))
SM_model = pickle.load(open('./Models/SocialMedia_model.sav','rb'))
Other_model = pickle.load(open('./Models/otherexp_model.sav','rb'))


    
@app.route('/')
def home():
    #return 'Hello World'
    return render_template('index.html')
    #return render_template('index.html')


@app.route('/predict', methods=['POST'])
def json_example():
    request_data = request.get_json()
    respData = getPredition(request_data)
    return respData


def getPredition(args):
   
   # call prediction functions and populate values here 
    models=[Internet_model,Radio_model,TV_model,SM_model,Other_model]

    args=args+models
    IntLeads,RadioLeads,TVLeads,SMLeads,OtherLeads,TotalLeads=ScoringEngine(args)
    print('Respective leads :',IntLeads,RadioLeads,TVLeads,SMLeads,OtherLeads,TotalLeads)
    
    
    resp = {
        "InternetPredict": IntLeads,
        "SocialMediaPredict": SMLeads,
        "TelevisionPredict": TVLeads,
        "RadioPredict": RadioLeads,
        "OtherPredict": OtherLeads,
        "TotalPredict":TotalLeads
    }
    return resp


if __name__ == '__main__':
    # run app in debug mode on port 5000
    app.run(debug=True, port=8000)
