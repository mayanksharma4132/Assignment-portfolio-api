import { Security } from '.';
import mongoose from 'mongoose';

export let updateTradeInSecurityOnAdd = async (params) =>{
    const session = await Security.startSession();
    try {
        await session.startTransaction();
        let { Security_id,Type,Quantity,Price } = params;
        let security = await Security.findById(Security_id);
        if(!security){
            throw 'Security id not found!';
        }

        let oldQuantity = security.shares;
        let oldAvgBuyPrice = security.avgBuyPrice; 
        let newAvgBuyPrice = oldAvgBuyPrice;
        let newQuantity = oldQuantity;

        if(Type == 'BUY'){
            newAvgBuyPrice = ((oldAvgBuyPrice*oldQuantity) + (Price*Quantity))/(oldQuantity + Quantity);
        }
        if(Type == 'SELL'){
            Quantity = -parseInt(Quantity);
        }
        newQuantity = oldQuantity + parseInt(Quantity);

        let query = {'_id': Security_id};
        let update = {
            $set : { avgBuyPrice: newAvgBuyPrice,shares: newQuantity }
        }
        let options = { useFindAndModify: false }
        let newSecurity = await Security.findOneAndUpdate(query,update,options);
        await session.commitTransaction();
        await session.endSession();
        return newSecurity;
    } catch(err){
        console.log("err: ",err)
        await session.abortTransaction();
        await session.endSession();
        throw err;
    }
}

export let updateTradeInSecurityOnUpdate = async (params) => {
    const session = await Security.startSession();
    try{
        await session.startTransaction();
        let { oldTrade, newTrade } = params; 
        let Security_id  = oldTrade.Security_id;
        let security = await Security.findById(Security_id);
        if(!security){
            throw 'Security id not found!';
        }

        //reverting changes of oldTrade
        let { Type, Price, Quantity } = oldTrade;
        let newAvgBuyPrice = security.avgBuyPrice;  
        let newShares = parseInt(security.shares);
        if(Type == 'BUY'){
            newAvgBuyPrice =  (((newAvgBuyPrice*newShares)-(Price*Quantity))/(newShares-Quantity));
            newShares -= parseInt(Quantity);
        }else if(Type == 'SELL'){
            newShares += parseInt(Quantity);
        }

        //applying changes of newTrade
        Type = newTrade.Type;
        Price = parseFloat(newTrade.Price);
        Quantity = parseInt(newTrade.Quantity);

        if(Type == 'BUY'){
            newAvgBuyPrice = ((newAvgBuyPrice*newShares)+(Quantity*Price))/(Quantity+newShares);
            newShares += parseInt(Quantity);
        }else if(Type == 'SELL'){
            newShares -= parseInt(Quantity);
        }

        let query = {'_id': Security_id};
        let update = {
            $set : { avgBuyPrice: newAvgBuyPrice,shares: newShares }
        }
        let options = { useFindAndModify: false }
        let newSecurity = await Security.findOneAndUpdate(query,update,options);
        
        await session.commitTransaction();
        await session.endSession();

        return newSecurity;
    }catch(err){
        console.log("err ",err);
        await session.abortTransaction();
        await session.endSession();
        throw err;
    }
}

export let updateTradeInSecurityOnDelete = async (params) => {
    const session = await Security.startSession();
    try{
        await session.startTransaction();
        let Security_id  = params.Security_id;
        let security = await Security.findById(Security_id);
        if(!security){
            throw 'Security id not found!';
        }

        //reverting changes of oldTrade
        let { Type, Price, Quantity } = params;
        let newAvgBuyPrice = security.avgBuyPrice;  
        let newShares = parseInt(security.shares);
        if(Type == 'BUY'){
            newAvgBuyPrice =  (((newAvgBuyPrice*newShares)-(Price*Quantity))/(newShares-Quantity));
            newShares -= parseInt(Quantity);
        }else if(Type == 'SELL'){
            newShares += parseInt(Quantity);
        }

        let query = {'_id': Security_id};
        let update = {
            $set : { avgBuyPrice: newAvgBuyPrice,shares: newShares }
        }
        let options = { useFindAndModify: false }
        let newSecurity = await Security.findOneAndUpdate(query,update,options);
        await session.commitTransaction();
        await session.endSession();

        return newSecurity;
    }catch(err){
        console.log("err: ",err);
        await session.abortTransaction();
        await session.endSession();
        throw err;
    }
}

export let getSecuritiesByPortfolioId = async (id) => {
    try{
        let pipeline  = [ 
            {
                $match: {
                    Portfolio_id: mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'securtiymasters',
                    localField: 'ticker',
                    foreignField: '_id',
                    as: 'ticker'
                }
            },
            {
                $unwind: '$ticker'
            }
        ];
        let securities = await Security.aggregate(pipeline);
        return securities;
    }catch(err){
        console.log("err: ",err);
        return null;
    }
}