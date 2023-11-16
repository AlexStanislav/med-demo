<template>
  <header>
    <Menubar :model="menuItems">
      <template #start>
        <div class="logo-container" @click="$router.push('/')">
          <span class="logo-prefix"> Logo </span>
          <img
            alt="cross-icon"
            src="https://img.icons8.com/ios-filled/50/ffffff/heart-with-pulse--v1.png"
            class="mr-2 header-logo"
          />
          <span class="logo-suffix"> Ipsum </span>
        </div>
      </template>
      <template #end>
        <div
          class="register-button custom-button"
          @click="showRegisterDialog = true"
        >
          Inscrie-te
        </div>
        <div class="login-button custom-button" @click="goTo('dashboard')">
          Portal
        </div>
      </template>
    </Menubar>
  </header>
  <main>
    <router-view v-on:openRegistration="showRegisterDialog = true"></router-view>
  </main>
  <footer>
    <span class="icon-credit"
      >Icons by <a href="https://icons8.com">Icons8</a></span
    >
    <div class="footer-desc">
      <h2>Despre noi</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing
        elit.
      </p>
    </div>
    <div class="schedule">
      <i class="pi pi-clock"></i>
      <h2>Program</h2>
      <div class="schedule-row">
        <div
          class="schedule-item"
          v-for="item in scheduleItems"
          :key="item.label"
        >
          <span>{{ item.label }}</span>
          <span>{{ item.hours }}</span>
        </div>
      </div>
    </div>
    <div class="footer-social">
      <h2>Contact</h2>
      <ul>
        <li v-for="item in socialItems" :key="item.label">
          <i :class="item.icon"></i>{{ item.label }}
        </li>
      </ul>
    </div>
  </footer>
  <Dialog
    v-model:visible="showRegisterDialog"
    modal
    header="Inscrie-te"
    style="
       {
        width: '50vw';
      }
    "
  >
    <RegisterForm :isModal="true" />
  </Dialog>
  <Toast />
</template>
<script setup>
import Menubar from "primevue/menubar";
import Dialog from "primevue/dialog";
import RegisterForm from "./components/RegisterForm.vue";
import { ref } from "vue";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import axios from "axios";
import { useAppStore } from "./store";

const toast = useToast();
const appStore = useAppStore();
const showRegisterDialog = ref(false);
const showLoginDialog = ref(false);
const loginType = ref("pacient");

const testCookie = () => {
  axios.post(`${appStore.url}/test`).then((response) => {
   console.log(response);
  })
};

// Redirect to origin url + /dashboard
const goTo = (url) => {
  window.location.href = window.location.href + url;
};

const menuItems = [
  {
    label: "Acasa",
    icon: "pi pi-fw pi-home",
    to: "/",
  },
  {
    label: "Pacientii",
    icon: "pi pi-fw pi-user",
    to: "/patient",
  },
  {
    label: "Cadru medical",
    icon: "pi pi-fw pi-plus-circle",
    to: "/nurse",
  },
];

const scheduleItems = [
  {
    label: "Luni - Vineri",
    hours: "8:00 - 17:00",
  },
  {
    label: "Sambata",
    hours: "9:00 - 16:00",
  },
  {
    label: "Duminica",
    hours: "Inchis",
  },
  {
    label: "Urgente",
    hours: "24/7",
  },
];

const socialItems = [
  {
    label: "Facebook",
    icon: "pi pi-facebook",
    url: "https://www.facebook.com/",
  },
  {
    label: "Instagram",
    icon: "pi pi-instagram",
    url: "https://www.instagram.com/",
  },
  {
    label: "Twitter",
    icon: "pi pi-twitter",
    url: "https://www.twitter.com/",
  },
  {
    label: "Email",
    icon: "pi pi-envelope",
    url: "https://www.gmail.com/",
  },
];

</script>
<style lang="scss">
@import "./assets/css/menubar.scss";
@import "./assets/css/header.scss";
main {
  margin-top: 60px;
  position: relative;
}

footer {
  color: white;
  padding: 2rem 15%;
  background: var(--dark);
  position: relative;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
}

.footer-desc {
  width: 33%;
  p {
    width: 70%;
    font-size: 0.8rem;
    text-align: justify;
    text-justify: distribute;
  }
}

.schedule {
  width: 15vw;
  align-items: center;
  gap: 1rem;
  display: flex;
  flex-flow: row wrap;
  h2 {
    margin: 0;
  }
  i {
    font-size: 2rem;
  }
}

.schedule-row {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
}

.schedule-item {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 0;
  border-bottom: 1px solid #185ca5;
}

.footer-social {
  width: 33%;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  h2 {
    margin: 0 0 1rem 0;
  }
  i {
    margin-right: 1rem;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    margin: 0.5rem 0;
  }
}

.icon-credit {
  position: absolute;
  bottom: 0.2rem;
  z-index: 5;
  right: 0.2rem;
  font-size: 0.8rem;
  a {
    color: var(--light-accent);
  }
}

.p-dialog-header span {
  width: 100%;
  font-size: 2rem;
  text-align: center;
  color: var(--main);
}

.form-radio-text-active {
  color: #ffffff !important;
}

.login-dialog {
  width: 20vw;
  .p-dialog-content {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  form {
    width: 100%;
  }
  .form-group {
    margin: 1rem 0;
    span {
      width: 100%;
      .p-inputtext {
        width: 100%;
      }
    }
  }
  .p-button {
    width: 100%;
  }
}

@media screen and (max-width: 768px) {
  footer {
    flex-flow: column wrap;
    gap: 2rem;
  }
  .footer-desc,
  .schedule,
  .footer-social {
    width: 100%;
    text-align: center;
  }
  .footer-desc p {
    width: 100%;
  }
}
</style>