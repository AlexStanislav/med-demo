<template>
  <section class="nurse-view">
    <div class="patients-detail-top"></div>
    <div class="patients-detail-bottom"></div>
    <section class="nurse-description">
        <h1>Beneficii cadru medical</h1>
        <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum eius eaque atque, similique excepturi, laborum unde expedita rerum itaque explicabo consequatur sed. Enim necessitatibus accusantium architecto sit delectus officiis debitis. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos repellat nostrum, et omnis velit nulla placeat! Illum omnis vero earum hic exercitationem placeat rerum molestiae consequuntur porro nemo. Perferendis, ut.

            <ul>
                <li v-for="item in nurseDetail" :key="item">{{ item }}</li>
            </ul>
        </p>
        <img src="../assets/img/nurse.jpg" alt="blood-pressure-device">
        <Button label="Inscrie-te" />
    </section>
    <section class="nurse-documents">
        <img src="../assets/img/undraw_certificate.svg" alt="doctor" class="nurse-detail-left">
        <img src="../assets/img/undraw_terms.svg" alt="doctor" class="nurse-detail-right">
        <h1>Cerinte si acte necesare.</h1>
        <article>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
            </p>
            <ol>
                <li v-for="item in nurseDetail" :key="item">{{ item }}</li>
            </ol>
        </article>
    </section>
    <section class="nurse-form-container">
        <h1>Inscrie-te acum!</h1>
      <RegisterForm />
    </section>
  </section>
</template>
<script setup>
import Button from "primevue/button";
import RegisterForm from "../components/RegisterForm.vue";

const nurseDetail = [
  "Lorem ipsum dolor sit amet.",
  "Lorem ipsum dolor sit amet.",
  "Lorem ipsum dolor sit amet.",
  "Lorem ipsum dolor sit amet.",
  "Lorem ipsum dolor sit amet.",
  "Lorem ipsum dolor sit amet.",
];
</script>
<style lang="scss">
.nurse-view {
  width: 65%;
  margin: auto;
  padding: 2rem 0;
  display: flex;
  flex-flow: column wrap;
  gap: 5rem;
  h1 {
    width: 100%;
    text-align: center;
    color: var(--main);
    font-size: 3rem;
  }
}
.nurse-description {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  padding-bottom: 4rem;
  padding-top: 10rem;
  img {
    width: 40%;
    height: 50vh;
    border-radius: 6px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    object-fit: cover;
  }
 
  p {
    width: 58%;
    align-self: flex-start;
    text-align: justify;
    text-justify: distribute;
    color: var(--main);
    font-size: 1.2rem;
  }
  .p-button {
    width: 40%;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  ul {
    list-style: none;
  }

  li {
    margin-top: 1rem;
  }

  ul li::before {
    content: "\2713";
    color: var(--main);
    font-weight: bold;
    display: inline-block;
    width: 1.2em;
    margin-left: -1em;
  }
}

.nurse-documents {
    width: 70%;
    margin: auto;
    position: relative;
    p{
        font-size: 1.2rem;
        color: var(--main);
    }
    ol{
        color: var(--dark);
        font-size: 1.2rem;
    }
    li{
        padding: 0.5rem 0;
    }
}

.nurse-detail-left {
    width: 30%;
    position: absolute;
    left: -40%;
    top: 0;
}

.nurse-detail-right{
    width: 40%;
    position: absolute;
    right: -40%;
    bottom: 0;
}

.nurse-form-container {
    width: 60%;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    background: white;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    padding-bottom: 2rem;
    margin: auto;
    h1{
        width: 100%;
        text-align: center;
        font-size: 3rem;
        color: var(--main);
    }
    border: 1px solid #cdcdcd;
    border-radius: 6px;
}

@media screen and (max-width: 768px) {
  .nurse-view{
    width: 90%;
  }
  .nurse-description{
    flex-flow: column wrap;
    img{
      width: 100%;
    }
    p{
      width: 100%;
      font-weight: bold;
    }
    .p-button{
      width: 100%;
    }
  }
  .nurse-form-container{
    width: 100%;
    box-shadow: none;
    border: none;
    background: transparent;
  }
  .nurse-documents{
    width: 100%;
    text-align: justify;
    text-justify: distribute;
  }
  .nurse-detail-left, .nurse-detail-right{
    display: none;
  }
}
</style>