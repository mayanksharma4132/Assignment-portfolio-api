import { Portfolio } from '.';
import  mongoose  from 'mongoose';
import { getSecuritiesByPortfolioId } from '../security/service'; 

export let getPortfolio = async (id) => {
    try{
        let portfolio = await getSecuritiesByPortfolioId(id);
        return portfolio;
    }catch(err){
        console.log('err: ',err);
        return err;
    }   
}

export let getReturnsOnPortfolio = async (id) =>{
    try{
        let portfolio = await getPortfolio(id);
        let currentPrice = 100;
        let returns = 0;
        portfolio.forEach(security => {
            let avgBuyPrice = security.avgBuyPrice;
            let quantity = security.shares;
            returns+= ((currentPrice - avgBuyPrice)*quantity);
        });
        return { id,returns };
    }catch(err){
        console.log(err);
        return null;
    }
    
}