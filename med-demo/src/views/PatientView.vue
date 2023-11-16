<template>
  <section class="patients-view">
    <div class="patients-detail-top"></div>
    <div class="patients-detail-bottom"></div>
    <section class="patients-description">
        <h1>Beneficii</h1>
        <img src="../assets/img/patient-1.jpg" alt="blood-pressure-device">
        <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum eius eaque atque, similique excepturi, laborum unde expedita rerum itaque explicabo consequatur sed. Enim necessitatibus accusantium architecto sit delectus officiis debitis. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos repellat nostrum, et omnis velit nulla placeat! Illum omnis vero earum hic exercitationem placeat rerum molestiae consequuntur porro nemo. Perferendis, ut.

            <ul>
                <li v-for="item in patientDetail" :key="item">{{ item }}</li>
            </ul>
        </p>
        <Button label="Inscrie-te" />
    </section>
    
    <section class="patients-timeline">
        <img src="../assets/img/undraw_injured.svg" alt="doctor" class="timeline-detail-left">
        <img src="../assets/img/undraw_doctor.svg" alt="doctor" class="timeline-detail-right">
        <h1>Cum functioneaza</h1>
        <Timeline :value="patientTimeline" :align="alignStyle">
            <template #marker="slotProps">
              <span class="timeline-marker" :style="{ backgroundColor: slotProps.item.color }">
                    <!-- <i :class="slotProps.item.icon"></i> -->
                    <img :src="slotProps.item.img" />
                </span>
            </template>
            <template #content="slotProps">
                <div class="timeline-content">
                    <h2>{{ slotProps.item.status }}</h2>
                    <p>{{ slotProps.item.description }}</p>
                </div>
            </template>
        </Timeline>
    </section>
    <!-- <section class="patients-nurse-example">
        <h1>Profesionisti ce te-ar putea ajuta.</h1>
        <Carousel :value="medicalProviders" :numVisible="3" :numScroll="3" :responsiveOptions="carouselResponsiveOptions">
            <template #item="slotProps">
                <div class="carousel-nurse">
                    <div class="image-placeholder">
                        <img width="100" height="100" src="https://img.icons8.com/ios/100/ffffff/no-image.png" alt="no-image"/>
                    </div>
                    <div class="nurse-details">
                        <h2>{{ slotProps.data.name }}</h2>
                        <p>{{ slotProps.data.description }}</p>
                        <p>{{ slotProps.data.area }}</p>
                        <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" class="rating" />
                    </div>
                </div>
            </template>
        </Carousel>
    </section> -->
    <section class="patient-form-container">
      <h1>Inscrie-te acum!</h1>
      <RegisterForm />
    </section>
  </section>
</template>
<script setup>
import Button from "primevue/button";
// import Carousel from "primevue/carousel";
// import Rating from "primevue/rating";
import Timeline from "primevue/timeline";
import { ref } from "vue";
import RegisterForm from "../components/RegisterForm.vue";

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

const alignStyle = ref("alternate");

if(isMobileDevice()) {
  alignStyle.value = "left";
}

const patientDetail = [
  "Lorem ipsum dolor sit amet.",
  "Lorem ipsum dolor sit amet.",
  "Lorem ipsum dolor sit amet.",
  "Lorem ipsum dolor sit amet.",
  "Lorem ipsum dolor sit amet.",
  "Lorem ipsum dolor sit amet.",
];

// const medicalProviders = [
//   {
//     name: "Jane Smith",
//     description: "Urgente",
//     area: "Oras, Localitate",
//     rating: 4,
//     image: "nurse1.jpg",
//   },
//   {
//     name: "Emma Johnson",
//     description: "Pediatrie",
//     area: "Oras, Localitate",
//     rating: 5,
//     image: "nurse2.jpg",
//   },
//   {
//     name: "David Brown",
//     description: "Chirurgie",
//     area: "Oras, Localitate",
//     rating: 3,
//     image: "nurse3.jpg",
//   },
//   {
//     name: "Sarah Lee",
//     description: "Urgente",
//     area: "Oras, Localitate",
//     rating: 4,
//     image: "nurse4.jpg",
//   },
//   {
//     name: "Michael Chen",
//     description: "Psihiatrie",
//     area: "Oras, Localitate",
//     rating: 5,
//     image: "nurse5.jpg",
//   },
//   {
//     name: "Lisa Johnson",
//     description: "ORL",
//     area: "Oras, Localitate",
//     rating: 4,
//     image: "nurse6.jpg",
//   },
// ];

const patientTimeline = ref([
  {
    status: "Te inregistrezi",
    icon: "pi pi-user-plus",
    color: "#2490eb",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, aspernatur? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, aspernatur?",
    img: "https://img.icons8.com/ios/50/ffffff/signing-a-document.png",
  },
  {
    status: "Completeaza formularul",
    icon: "pi pi-check",
    color: "#84C0D8",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, aspernatur? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, aspernatur?",
    img: "https://img.icons8.com/ios/50/ffffff/task.png",
  },
  {
    status: "Un doctor te va contacta",
    icon: "pi pi-send",
    color: "#707698",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, aspernatur? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, aspernatur?",
    img: "https://img.icons8.com/dotty/50/ffffff/medical-doctor.png",
  },
]);

const carouselResponsiveOptions = [
  {
    breakpoint: "414px",
    numVisible: 1,
    numScroll: 1,
  }
]
</script>
<style lang="scss">
@import "../assets/css/patients-view.scss";
@import "../assets/css/patients-nurse-example.scss";
@import "../assets/css/patients-timeline.scss";
.patient-form-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  border: 1px solid #cdcdcd;
  width: fit-content;
  border-radius: 6px;
  margin: 0 auto;
  background: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  h1 {
    width: 100%;
  }
}

@media screen and (max-width: 414px) {
  .patient-form-container {
    box-shadow: none;
    border: none;
    background: transparent;
  }
}
</style>