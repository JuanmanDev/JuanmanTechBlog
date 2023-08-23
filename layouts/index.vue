<template>
  <div class="main">
    <div class="cube"></div>
    <div class="cube"></div>
    <div class="cube"></div>
    <div class="cube"></div>
    <div class="cube"></div>
    <div class="cube"></div>

    <div class="main__title">
      <h1>JuanmanTech</h1>
    </div>
    
    <a href="/blog">
      <div class="main__link">
        Blog
      </div>
    </a>
    <a href="/about">
      <div class="main__link">
        About me
      </div>
    </a>
    <div class="main_note">
      This is a work in progress
    </div>
    <div>
      <!-- <slot /> -->
    </div>
  </div>
</template>

<style lang="scss">

html {
  color: white;
}




.main {
  background-color: #0040C1;
  position: relative;
  height: 100vh;
  overflow: hidden;
  a {
    color: white;
    text-decoration: none;

  }
}

.main__title {
  font-size: 4rem;
  z-index: 1;
  text-align: center;
  border: solid white 0.1rem;
  max-width: 16.7rem;
  margin: 1rem auto;

}

.main__link {
  text-align: center;
  margin: 3rem;
  font-size: 2rem;
  transition: transform .2s;
  
    &:hover{
      transform: scale(1.5);
    }
}

.main_note {
  text-align: center;
  font-style: italic;
  font-size: 0.5rem;
}

.cube {
  position: absolute;
  top: 80vh;
  left: 45vw;
  width: 10px;
  height: 10px;
  border: solid 1px #003298;
  transform-origin: top left;
  transform: scale(0) rotate(0deg) translate(-50%, -50%);
  -webkit-animation: cube 32s ease-in forwards infinite;
          animation: cube 32s ease-in forwards infinite;
}
.cube:nth-child(2n) {
  border-color: #0051f4;
}
.cube:nth-child(2) {
  -webkit-animation-delay: 2s;
          animation-delay: 2s;
  left: 25vw;
  top: 40vh;
}
.cube:nth-child(3) {
  -webkit-animation-delay: 4s;
          animation-delay: 4s;
  left: 75vw;
  top: 50vh;
}
.cube:nth-child(4) {
  -webkit-animation-delay: 6s;
          animation-delay: 6s;
  left: 90vw;
  top: 10vh;
}
.cube:nth-child(5) {
  -webkit-animation-delay: 8s;
          animation-delay: 8s;
  left: 10vw;
  top: 85vh;
}
.cube:nth-child(6) {
  -webkit-animation-delay: 10s;
          animation-delay: 10s;
  left: 50vw;
  top: 10vh;
}

@-webkit-keyframes cube {
  from {
    transform: scale(0) rotate(0deg) translate(-50%, -50%);
    opacity: 1;
  }
  to {
    transform: scale(20) rotate(960deg) translate(-50%, -50%);
    opacity: 0;
  }
}

@keyframes cube {
  from {
    transform: scale(0) rotate(0deg) translate(-50%, -50%);
    opacity: 1;
  }
  to {
    transform: scale(20) rotate(960deg) translate(-50%, -50%);
    opacity: 0;
  }
}
</style>