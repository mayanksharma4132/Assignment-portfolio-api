import { Trade } from '.';
import { updateTradeInSecurityOnAdd,
         updateTradeInSecurityOnUpdate,
         updateTradeInSecurityOnDelete} from '../security/service';

         
export let createTrade = async (body) => {
    try{
        // Update Security
        await updateTradeInSecurityOnAdd(body);

        //saving trade
        let trade = new Trade(body);
        await trade.save();

        return trade;
    }catch(err){
        console.log("err ", err);
        return err;
    }
}

export let updateTrade = async (body, id) => {
    try{
        let Trade_id = id;
        let trade = await Trade.findById(Trade_id);
        let params = {
            oldTrade: trade,
            newTrade: body
        }

        // Update Security
        await updateTradeInSecurityOnUpdate(params);

        // updating trade
        let query = {'_id': Trade_id};
        let update = {
            $set : {
                Price: body.Price,
                Quantity: body.Quantity,
                Type: body.Type
            }
        };
        let options = { useFindAndModify: false, new: true };
        let newTrade = await Trade.findOneAndUpdate(query,update,options);

        return newTrade;
    }catch(err){
        console.log("err ",err);
        return err;
    }
}

export let removeTrade = async (id) => {
    try{
        let Trade_id = id;
        let trade = await Trade.findById(Trade_id);

        await updateTradeInSecurityOnDelete(trade);

        let query = {'_id': Trade_id};    
        let newTrade = await Trade.deleteOne(query);

        return newTrade;
    }catch(err){
        console.log("err: ",err);
        return err;
    }
}

export let showAllTrades = async () =>{
    let pipeline = [
            {
                $lookup:{
                    from : 'securities',
                    localField: 'Security_id',
                    foreignField: '_id',
                    as: 'Security_id'
                }
            }, 
            {
                $unwind: '$Security_id'
            },
            {
            $lookup:{
                from: 'securtiymasters',
                localField: 'Security_id.ticker',
                foreignField: '_id',
                as: 'Security_id.ticker'
              }
            },
            {
              $unwind: '$Security_id.ticker'  
            }
        ];
    let trades = await Trade.aggregate(pipeline);
    console.log(trades);
    return trades;
}