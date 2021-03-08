# -*- coding: utf-8 -*-


import numpy as np


def ScoringEngine(*args):
    print(args[0])
    args=args[0]
    IntBudget=np.array(float(args[0])).reshape(-1,1)
    RadioBudget=np.array(float(args[1])).reshape(-1,1)
    TVBudget=np.array(float(args[2])).reshape(-1,1)
    SMBudget=np.array(float(args[3])).reshape(-1,1)
    OtherBudget=np.array(float(args[4])).reshape(-1,1)
    
    IntLeads=args[5].predict(IntBudget)
    RadioLeads=args[6].predict(RadioBudget)
    TVLeads=args[7].predict(TVBudget)
    SMLeads=args[8].predict(SMBudget)
    OtherLeads=args[9].predict(OtherBudget)

    TotalLeads=IntLeads+RadioLeads+TVLeads+SMLeads+OtherLeads
    
    return int(IntLeads[0][0]),int(RadioLeads[0][0]),int(TVLeads[0][0]),int(SMLeads[0][0]),int(OtherLeads[0][0]),int(TotalLeads[0][0])
    
    

    
    
