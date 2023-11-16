<template>
  <section class="home-banner">
    <img src="../assets/img/home-background-2.jpg" alt="home-banner" />
    <section class="banner-content">
      <div class="banner-cover"></div>
      <section class="banner-text">
        <span class="banner-title">Tratament de calitate</span>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores eos
          quisquam atque pariatur saepe ad molestiae consequatur ipsam aperiam.
        </p>
        <Button class="banner-button" label="Inscrie-te" @click="$emit('openRegistration')"/>
      </section>
    </section>
  </section>
  <section class="cards-content">
    <div class="cards-detail-top"></div>
    <div class="cards-detail-middle"></div>
    <div class="cards-detail-bottom"></div>
    <h2>Unde te incadrezi?</h2>
    <section class="cards-container">
      <section class="client-card home-card">
        <img src="https://img.icons8.com/dotty/80/ffffff/medical-doctor.png" alt="medical-doctor" />
        <h3>Personal medical</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus alias voluptas assumenda quaerat ipsam corporis tempora beatae enim molestiae aliquid esse illo repellat a ab ea, tempore, distinctio nostrum rem.</p>
        <Button label="Mai multe detalii" @click="router.push('/nurse')" />
      </section>
      <section class="nurse-card home-card">
        <img src="https://img.icons8.com/dotty/80/ffffff/person-male.png" alt="person-male"/>
        <h3>Pacient</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus alias voluptas assumenda quaerat ipsam corporis tempora beatae enim molestiae aliquid esse illo repellat a ab ea, tempore, distinctio nostrum rem.</p>
        <Button label="Mai multe detalii" @click="router.push('/patient')"/>
      </section>
    </section>
    <h2>Servicii oferite</h2>
    <section class="card-services">
      <section class="card-service">
        <h3>Pentru personal medical</h3>
        <img src="../assets/img/nurse.jpg" alt="nurse">
        <ul>
          <li  v-for="item in medicalSerices" :key="item">{{ item }}</li>
        </ul>
      </section>
      <section class="card-service">
        <h3>Pentru pacienti</h3>
        <img src="../assets/img/patient.jpg" alt="doctor">
        <ul>
          <li v-for="item in patientServices" :key="item">{{ item }}</li>
        </ul>
      </section>
    </section>
  </section>
</template>
<script setup>
import Button from "primevue/button";
import { useRouter } from "vue-router";

const router = useRouter();


const bannerButtonAnimation = () => {
  let button = document.querySelector(".banner-button");
  button.classList.add("show-banner-button");
};

setTimeout(() => {
  bannerButtonAnimation();
}, 2000);

const medicalSerices = [
  "Lorem ipsum dolor sit amet.",
  "Lorem ipsum dolor sit amet.",
  "Lorem ipsum dolor sit amet.",
  "Lorem ipsum dolor sit amet.",
  "Lorem ipsum dolor sit amet.",
  "Lorem ipsum dolor sit amet."
]

const patientServices = [
  "Lorem ipsum dolor sit amet.",
  "Lorem ipsum dolor sit amet.",
  "Lorem ipsum dolor sit amet.",
  "Lorem ipsum dolor sit amet.",
  "Lorem ipsum dolor sit amet.",
  "Lorem ipsum dolor sit amet."
]

</script>
<style lang="scss">
@import "../assets/css/home-banner.scss";


.cards-detail-top {
  width: 100%;
  height: 50vh;
  background: var(--dark);
  opacity: 0.9;
  position: absolute;
  top: 0;
  clip-path: polygon(100% 0, 30% 0, 100% 50%);
  z-index: -1;
}

.cards-detail-bottom{
  width: 100%;
  height: 50vh;
  background: var(--dark);
  opacity: 0.9;
  position: absolute;
  bottom: 0;
  clip-path: polygon(100% 50%, 100% 100%, 30% 100%);
  z-index: -1;
}

.cards-detail-middle {
  width: 100%;
  height: 50vh;
  background: var(--dark);
  opacity: 0.9;
  position: absolute;
  bottom: 32%;
  clip-path: polygon(40% 50%, 0 30%, 0 70%);
  z-index: -1;
}

.cards-content {
  width: 100%;
  position: relative;
  display: flex;
  flex-flow: column;
  padding: 7% 0 7% 0;
  align-items: center;
  color: var(--main);
  h2{
    margin: 0;
    font-size: 3rem;
  }
}

.cards-container {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 5rem;
  padding-top: 5rem;
  margin-bottom: 5rem;
}

.home-card{
  width: 30vw;
  height: 40vh;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.5);
  background: var(--main);
  border-radius: 6px;
  padding: 2rem;
  display: flex;
  flex-flow: row wrap;
  color: white;
  gap: 2rem;
  align-items: center;
  img{
    width: 5rem;
    height: 5rem;
  }
  h3{
    font-size: 2rem;
  }
}

.card-services{
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  gap: 5rem;
}

.card-service{
  width: 35%;
  border-radius: 6px;
  display: flex;
  flex-flow: row wrap;
  h3{
    width: 100%;
    text-align: center;
    font-size: 1.5rem;
  }
  img{
    width: 18vw;
    height: 40vh;
    object-fit: cover;
    border-radius: 6px;
  }
  ul{
    list-style: none;
  }

  ul li::before{
    content: "\2713";
    color: var(--main);
    font-weight: bold;
    display: inline-block;
    width: 1.2em;
    margin-left: -1em;
  }
  li{
    margin-top: 1rem;
  }
}

@media screen and (max-width: 1440px) {
  .cards-content {
    h2{
      font-size: 3rem;
    }
  }
  .home-card{
    width: 40vw;
    height: fit-content;
    p{
      font-size: 1.2rem;
    }
  }
  .card-services{
    margin-top: 1rem;
  }
  .card-service{
    width: 40%;
    margin-bottom: 3rem;
    img{
      width: 20vw;
    }
  }
}


@media screen and (max-width: 1024px) {
  .cards-content {
    h2{
      font-size: 2.5rem;
    }
  }
  .cards-container{
    flex-flow: column;
    align-items: center;
  }
  .home-card{
    width: 80%;
    height: fit-content;
    flex-flow: column;
    gap: 0;
    p{
      text-align: justify;
      text-justify: distribute;
    }
  }
  .card-services{
    flex-flow: column;
    align-items: center;
    .card-service{
      width: 80%;
      flex-flow: column;
      align-items: center;
      img{
        width: 100%;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .cards-content {
    h2{
      font-size: 2rem;
    }
  }
  .cards-container{
    flex-flow: column;
    align-items: center;
  }
  .home-card{
    width: 80%;
    height: fit-content;
    flex-flow: column;
    gap: 0;
    p{
      text-align: justify;
      text-justify: distribute;
    }
  }
  .card-services{
    flex-flow: column;
    align-items: center;
    .card-service{
      width: 80%;
      flex-flow: column;
      align-items: center;
      img{
        width: 100%;
      }
    }
  }
  
}
</style>