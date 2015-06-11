var initParticleCount = Math.floor(document.body.clientWidth / 4),
maxParticleCount = Math.ceil(9.2 * initParticleCount),
particleCount = initParticleCount;
/* config dom id (optional) + config particles params */
particlesJS('particles-js', {
  particles: {
    color: "#4285F4",
    color_random: ["#DB4437" /*red*/, "#FFEB3B" /*yellow*/ , "#0F9D58" /*green*/, "#4285F4" /*blue*/],
    shape: 'circle',
    opacity: {
        opacity: .5
        
    },
    size: 2,
    size_random: true,
    nb: 322,
   
    line_linked: {
        enable_auto: true,
        distance: 250,
        color: "#33b1f8",
        opacity: .25,
        width: 1
    },
    anim: {
              enable: true,
              speed: .8
    }
  },
  interactivity: {
    mode: false // "grab" or false
  },
  retina_detect: false
});