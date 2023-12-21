for(i=0;i<=100;i++){
    if(i<=80){
        console.log(`{ "Utilization Rate":`+i+`, "Borrow APR, variable":`+(1+i/80)+`},`);
    }else{
        console.log(`{ "Utilization Rate":`+i+`, "Borrow APR, variable":`+(2+(i-80)*8/(100-80))+`},`);
    }
}
