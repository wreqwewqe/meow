import { BigNumber } from "ethers";
var url = "https://api.etherscan.io/api?module=stats&action=ethprice";


const getprice =async()=>{
    const response =await fetch(url);
    const data = await response.json();
    const Price =parseFloat(data.result.ethusd)*100;
    return Price;
}

const total=(bignum)=>{
    var K =  BigNumber.from(1000);
    var M =  BigNumber.from(1000000);
    var B =  BigNumber.from(1000000000);
    var hundred = BigNumber.from(100)
    if (bignum.gt(B.mul(BigNumber.from(10000000)))){
        return "\u00A0\u00A0\u00A0\u00A0\u221E"
    }
    if (bignum.gt(B.mul(hundred))){
        return (bignum.div(B).toNumber()/100).toString()+"B";
    }else{
        if(bignum.gt(M.mul(hundred))){
            return  (bignum.div(M).toNumber()/100).toString()+"M";
        }else{
            if(bignum.gt(K.mul(hundred))){
                return  (bignum.div(K).toNumber()/100).toString()+"K";
            }else{
                return  (bignum.toNumber()/100).toString();
            }
        }
    }
}

const total4=(bignum)=>{
    var K =  BigNumber.from(1000);
    var M =  BigNumber.from(1000000);
    var B =  BigNumber.from(1000000000);
    var tenTundred = BigNumber.from(10000)
    if (bignum.gt(B.mul(BigNumber.from(10000000)))){
        return "\u00A0\u00A0\u00A0\u00A0\u221E"
    }
    if (bignum.gt(B.mul(tenTundred))){
        return (bignum.div(B).toNumber()/100).toString()+"B";
    }else{
        if(bignum.gt(M.mul(tenTundred))){
            return  (bignum.div(M).toNumber()/100).toString()+"M";
        }else{
            if(bignum.gt(K.mul(tenTundred))){
                return  (bignum.div(K).toNumber()/100).toString()+"K";
            }else{
                return  (bignum.toNumber()/10000).toString();
            }
        }
    }
}

const calculateInterest = (rate,lastTimestamp)=>{
    const timeDiffer = parseInt(Date.now()/1000) - lastTimestamp
    const ratePerSecond = rate.div(BigNumber.from(31536000))
    return rayPow(ratePerSecond.add(BigNumber.from(10).pow(27)),timeDiffer)
    // return 22
}
const ray = BigNumber.from(10).pow(27)
const rayPow=(x,n)=>{
    let z = n%2!=0?x:ray

    for(n=parseInt(n/2);n!=0;n=parseInt(n/2)){
        x = ray.div(BigNumber.from(2)).add(x.mul(x)).div(ray)
        if(n%2!=0){
            z=ray.div(BigNumber.from(2)).add(z.mul(x)).div(ray)
        }
    }
    return z
}
const rayMul=(a,b)=>{
    return ray.div(BigNumber.from(2)).add(a.mul(b)).div(ray)
}
const rayToWad = (a)=>{
    return BigNumber.from(10).pow(9).div(BigNumber.from(2)).add(a).div(BigNumber.from(10).pow(9))
}
const rayDiv=(a,b)=>{
    return b.div(BigNumber.from(2)).add(a.mul(ray)).div(b)
}


module.exports = {
    getprice,total,calculateInterest,rayMul,rayToWad,rayDiv,total4
}