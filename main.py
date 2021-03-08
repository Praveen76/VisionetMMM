# -*- coding: utf-8 -*-

import pandas as pd
import numpy as np
import pickle
from utils import ScoringEngine


Internet_model = pickle.load(open('./Models/Internet_model.sav','rb'))
Radio_model = pickle.load(open('./Models/Radio_model.sav','rb'))
TV_model = pickle.load(open('./Models/TV_model.sav','rb'))
SM_model = pickle.load(open('./Models/SocialMedia_model.sav','rb'))
Other_model = pickle.load(open('./Models/otherexp_model.sav','rb'))


args =[1234,4567,7890,12234,34567]

models=[Internet_model,Radio_model,TV_model,SM_model,Other_model]

args=args+models

IntLeads,RadioLeads,TVLeads,SMLeads,OtherLeads,TotalLeads=ScoringEngine(args)

print('Respective leads :',IntLeads,RadioLeads,TVLeads,SMLeads,OtherLeads,TotalLeads)



