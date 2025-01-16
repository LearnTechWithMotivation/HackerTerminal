function getRandomLimit(limit) {
    let randomSeq = []
    let i = 1;
    randomSeq[0] = 1;
    console.log("LIMIT",limit);
    while (randomSeq[i] < limit) {
    console.log(randomSeq[i],"i = ",i,randomSeq,randomSeq[i-1]);
    
    randomSeq.push(Math.floor(Math.random() * 5) + randomSeq[i - 1]);
    i++;
    console.log(randomSeq[i],i,randomSeq);
        if (randomSeq[i] > limit) { randomSeq[i] = limit; break; }
    }
    console.log(randomSeq);
}


function generateRandomList(lst,i,limit){
    if(i>limit) return;
    lst.push(lst[i-1]+(Math.random()*5));
    generateRandomList(lst, i++,limit);
}
lst = [1];
// generateRandomList(lst,1,100);
console.log(lst);
let index = 0;
limit = 50;
console.log(lst[index]<limit,lst[index],limit);
while(lst[index]<limit){
    lst.push(lst[index]+Math.floor((Math.random()*5)));
    index++;
}

console.log(lst);
