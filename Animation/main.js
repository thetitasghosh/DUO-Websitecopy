function LocoScrollinit(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
el: document.querySelector(".main"),
smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
scrollTop(value) {
  return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
}, // we don't have to define a scrollLeft because we're only scrolling vertically.
getBoundingClientRect() {
  return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
},
// LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
LocoScrollinit();

let cursor = document.querySelector("#cursor");
let main = document.querySelector(".main");
main.addEventListener("mousemove", (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
      })
})
  
// page1 animation  
// gsap.from(".page1 h1,.page1 h2", {
//   y: 10,
//   rotate: 10,
//   opacity: 0,
//   delay: 0.3,
//   duration: 0.7
// })

// page1 animation  heading and video
var tl = gsap.timeline({
  scrollTrigger: {
    trigger:".page1 .Heading h1",
    scroller: ".main",
    start: "top 10%",
    end: "top 0",
    scrub:3,
    // markers: true,
  }
});
tl.to(".page1 .Heading h1",{
    x:-100,   
},"a")
tl.to(".page1 .Heading h2",{
  x:100,
},"a")
tl.to(".video",{
    width:"90%",
},"a")



// page2 animation backgorund color change
gsap.to(".main",{
  backgroundColor:"#fff",
  color:"#000",
  scrollTrigger: {
    trigger:".page2",
    scroller: ".main",
    start: "top 10%",
    end: "top 0",
    scrub:1,
    // markers: true,
  }
})

// page3 animation backgorund color change
// gsap.to(".main",{
//   backgroundColor:"#000",
  
//   scrollTrigger: {
//     trigger:".box",
//     scroller: ".main",
//     start: "top 50%",
//     end: "top 0",
//     scrub:1,
//     markers: true,
//   }
// })

































