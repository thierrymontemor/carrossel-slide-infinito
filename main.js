"use strict";
const telaSlide = document.querySelector('.visible-container');
const tremItems = document.querySelector('.limits');
const items = [...document.querySelectorAll('.item')];
const leftBt = document.querySelector('.bt-left');
const rightBt = document.querySelector('.bt-right');
let posTrem
let posSlide
let itemWidth = items[0].offsetWidth
telaSlide.style.width = `${itemWidth*3.3}px`
let startingPoint = 0
let currentPoint = 0
let savedPoint = 0

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
        savedPoint+=itemWidth
        tremItems.style.transform='translate('+savedPoint+'px)';
        items.map((item, index)=>{
            if(item.style.order==0){
                item.style.order=items.length-1
            }else{
                item.style.order-=1
            }
        })
    }else if(distTremSlide()<=itemWidth){
        savedPoint-=itemWidth
        tremItems.style.transform='translate('+savedPoint+'px)';
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
    tremItems.style.transition='none'
    tremItems.removeEventListener("transitionend", onTransitionEnd)
}
function onMouseUp(){
    savedPoint=currentPoint
    tremItems.removeEventListener("mousemove", onMouseMove)
    window.removeEventListener("mouseup", onMouseUp)
}
function onMouseMove(event){
    let cursorPosition = event.clientX
    infinity()
    currentPoint = savedPoint + cursorPosition - startingPoint
    tremItems.style.transform='translateX('+currentPoint+'px)';  
}
tremItems.addEventListener("mousedown", (event)=>{
    startingPoint = event.clientX 
    tremItems.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
})
rightBt.addEventListener("click", ()=>{
    rightBt.disabled = true
    savedPoint -=itemWidth
    tremItems.style='transform:translate('+savedPoint+'px);transition: transform 0.3s';
    tremItems.addEventListener("transitionend", onTransitionEnd)
})    
leftBt.addEventListener("click", ()=>{
    leftBt.disabled = true
    savedPoint +=itemWidth
    tremItems.style='transform:translate('+savedPoint+'px);transition: transform 0.3s ease-in-out';
    tremItems.addEventListener("transitionend", onTransitionEnd)
});
function touchMove(event){
       let touchIsIn = event.touches[0].clientX;
        infinity()
        currentPoint = savedPoint + touchIsIn - startingPoint
        tremItems.style.transform='translateX('+currentPoint+'px)';
}
tremItems.addEventListener("touchstart", (event)=>{
    startingPoint = event.touches[0].clientX
})
tremItems.addEventListener("touchmove", touchMove)
tremItems.addEventListener("touchend", ()=>{
    savedPoint=currentPoint
})


