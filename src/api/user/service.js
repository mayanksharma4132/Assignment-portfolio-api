import { User } from '.'
export async const updatePortfolio = ()=>{
    let user = await User.find({});
    console.log(user);
}