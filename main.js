"use strict";

const telaSlide = document.querySelector('.visible-container');
const tremItems = document.querySelector('.limits');
const items = [...document.querySelectorAll('.item')];
const leftBt = document.querySelector('.bt-left');
const rightBt = document.querySelector('.bt-right');
let pos = 0
let posTrem
let posSlide
let itemWidth = items[0].offsetWidth
//tremItems.style.left=`-${itemWidth}px`
telaSlide.style.width = `${itemWidth*3.3}px`
let isDragging = false
let initTouch

items.map((item, index)=>{
    item.style.order = index;
})

function distTremSlide(){
    posTrem = tremItems.getBoundingClientRect().left;
    posSlide = telaSlide.getBoundingClientRect().left;
    return(posSlide - posTrem)
}


function infinity(){
        if (distTremSlide()>=itemWidth*2.5){
            pos+=itemWidth
            tremItems.style=`transform: translate(${pos}px)`;
            items.map((item, index)=>{
                if(item.style.order==0){
                    item.style.order=items.length-1
                }else{
                    item.style.order-=1
                }
            })
        }else if(distTremSlide()<=itemWidth){
            pos-=itemWidth
            tremItems.style=`transform: translate(${pos}px)`;
            items.map((item, index)=>{
                if(item.style.order==items.length-1){
                    item.style.order=0
                }else{
                    item.style.order= +item.style.order+1
                }
            })
        }
}

function onTransitionEnd(){
    infinity()
    rightBt.disabled = false
    leftBt.disabled = false
    tremItems.removeEventListener("transitionend", onTransitionEnd)
}

tremItems.addEventListener("touchstart", (e)=>{
    //console.log(distTremSlide())
    isDragging=true
    initTouch = e.touches[0].clientX
    //console.log(initTouch)
})
tremItems.addEventListener("touchmove", (e)=>{
    //console.log(distTremSlide())

    if(isDragging){
        const touch = e.touches[0];

        posSlide = telaSlide.getBoundingClientRect().left;
        let moveByTouch = (touch.clientX - initTouch)/12

       // pos +=moveByTouch/12
        console.log(pos)
        if (moveByTouch<0 && -moveByTouch>itemWidth){
            pos -=itemWidth
        }else if(moveByTouch<0 && -moveByTouch<itemWidth){
            pos +=moveByTouch
        }
        if (moveByTouch>0 && moveByTouch>itemWidth){
            pos +=itemWidth
        }else if (moveByTouch>0 && moveByTouch<itemWidth){
            pos +=moveByTouch
        }
        tremItems.style=`transform: translate(${pos}px);transition: transform 0.4s`;
        //tremItems.addEventListener("transitionend", onTransitionEnd) 

    }
    infinity()
})
tremItems.addEventListener("touchend", (e)=>{
    //console.log(distTremSlide())
    isDragging=false
    infinity()
})



rightBt.addEventListener("click", ()=>{
    rightBt.disabled = true
    pos -=itemWidth
    tremItems.style=`transform: translate(${pos}px);transition: transform 0.4s`;
    tremItems.addEventListener("transitionend", onTransitionEnd)
})    

leftBt.addEventListener("click", ()=>{
    leftBt.disabled = true
    pos +=itemWidth
    tremItems.style=`transform: translate(${pos}px);transition: transform 0.8s ease-in-out`;
    tremItems.addEventListener("transitionend", onTransitionEnd)

});

