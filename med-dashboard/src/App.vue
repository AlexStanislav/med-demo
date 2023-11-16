<template>
  <div class="main-app" v-if="authStore.isAuthenticated">
    <nav class="app-nav">
      <div class="logo-container">
        <span class="logo-prefix"> Logo </span>
        <!-- src="https://img.icons8.com/ios-filled/30/c5dcff/heart-with-pulse--v1.png" -->
        <img
          alt="cross-icon"
          src="https://img.icons8.com/ios-filled/30/2490eb/heart-with-pulse--v1.png"
          class="mr-2 header-logo"
        />
        <span class="logo-suffix"> Ipsum </span>
      </div>
      <h1>Dashboard Pacient</h1>
      <ul class="nav-links">
        <li>
          <router-link to="/">
            <span class="icon-wrapper">
              <i class="pi pi-user"></i>
            </span>
            <span class="nav-link-text"> Detalii Cont </span>
          </router-link>
        </li>
        <li>
          <router-link to="/requests">
            <span class="icon-wrapper">
              <i class="pi pi-folder"></i>
            </span>
            <span class="nav-link-text"> Cereri </span>
          </router-link>
        </li>
      </ul>
      <Button
        severity="danger"
        class="logout-btn"
        icon="pi pi-sign-out"
        label="Deconecteaza-te"
        @click="handleLogout()"
      />
    </nav>
    <section class="content-container">
      <header>
        <div class="breadcrumbs-custom">
          <span v-if="!appStore.isMobile()">
            Pagini / {{ $route.name }}
            <div class="current-page">{{ $route.name }}</div>
          </span>
          <span class="mobile-nav" v-if="appStore.isMobile()">
            <Button severity="info" icon="pi pi-user" label="Detalii Cont" @click="$router.push('/')" />
            <Button severity="info" icon="pi pi-folder" label="Cereri" @click="$router.push('/requests')" />
            <Button severity="danger" icon="pi pi-sign-out" @click="handleLogout()" />
          </span>
        </div>
      </header>
      <main>
        <router-view></router-view>
      </main>
    </section>
  </div>
  <div class="login-screen" v-if="!authStore.isAuthenticated">
    <section class="form-select">
      <div class="form-radio">
        <RadioButton
          v-model="loginType"
          inputId="pacient"
          value="pacient"
          name="loginType"
        />
        <img
          :src="`https://img.icons8.com/dotty/80/${
            loginType === 'pacient' ? 'ffffff' : '2490eb'
          }/person-male.png`"
          alt="person-male"
        />
        <span
          class="form-radio-text"
          :class="{ 'form-radio-text-active': loginType === 'pacient' }"
          >Pacient</span
        >
      </div>
      <div class="form-radio">
        <RadioButton
          v-model="loginType"
          inputId="nurse"
          value="nurse"
          name="loginType"
        />
        <img
          :src="`https://img.icons8.com/dotty/80/${
            loginType === 'nurse' ? 'ffffff' : '2490eb'
          }/medical-doctor.png`"
          alt="medical-doctor"
        />
        <span
          class="form-radio-text"
          :class="{ 'form-radio-text-active': loginType === 'nurse' }"
          >Medical</span
        >
      </div>
    </section>
    <form>
      <div class="form-group">
        <span class="p-float-label">
          <InputText id="login-email" type="text" v-model="loginValues.email" />
          <label for="email">Email</label>
        </span>
      </div>
      <div class="form-group">
        <span class="p-float-label">
          <InputText
            id="login-password"
            type="password"
            v-model="loginValues.password"
          />
          <label for="password">Parola</label>
        </span>
      </div>
      <Button label="Login" @click="handleLogin()" />
    </form>
  </div>
  <Toast />
</template>
<script setup>
import Button from "primevue/button";
import { onMounted, ref } from "vue";
import RadioButton from "primevue/radiobutton";
import InputText from "primevue/inputtext";
import { useAuthStore } from "./store/auth";
import { useAppStore } from "./store/app";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import axios from "axios";

const authStore = useAuthStore();
const appStore = useAppStore();

const loginType = ref("pacient");
const toast = useToast();

const loginValues = ref({
  email: "",
  password: "",
});

function verifyFormValues(obj, exceptions) {
  for (const key in obj) {
    if (!exceptions.includes(key) && !obj[key]) {
      return false;
    }
  }
  return true;
}

const handleLogin = () => {
  const isValid = verifyFormValues(loginValues.value, []);
  if (isValid) {
    try {
      let loginEndpoint = loginType.value === "pacient" ? "patient" : "nurse";
      axios
        .post(`${appStore.url}/${loginEndpoint}/login`, loginValues.value, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.status === 200) {
            toast.add({
              severity: "success",
              summary: "Succes",
              detail: "Logare reusita",
              life: 3000,
            });
            appStore.updatePersonalDetails(response.data.userInfo);
            appStore.setUserType(response.data.user_type);
            appStore.updateLoginDetails(response.data.userInfo.email);
            authStore.login();
          } else if (response.status === 401) {
            toast.add({
              severity: "error",
              summary: "Eroare",
              detail: "Date incorecte",
              life: 3000,
            })
          }
        }).catch((error) => {
          console.log("error", error);
          toast.add({
            severity: "error",
            summary: "Eroare",
            detail: "Date incorecte",
            life: 3000,
          });
        })
    } catch (error) {
      console.log("error", error);
      toast.add({
        severity: "error",
        summary: "Eroare",
        detail: "S-a dat eroare la logare",
        life: 3000,
      });
    }
  } else {
    toast.add({
      severity: "error",
      summary: "Eroare",
      detail: "Date incorecte",
      life: 3000,
    });
  }
};

const handleLogout = () => {
  axios.post(`${appStore.url}/logout`).then((response) => {
    if(response.status === 200){
      authStore.logout();
    }
  })
}
</script>
<style lang="scss">
@import "./assets/css/nav.scss";

.login-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  width: 100%;
  form {
    width: 400px;
    .p-button,
    .p-float-label,
    .p-inputtext {
      width: 100%;
    }
  }
}

.form-select {
  width: fit-content;
  display: flex;
  flex-flow: row;
  gap: 1rem;
}

section {
  width: calc(85vw - 4rem);
  border-radius: 6px;
  //   background: #fff;
  //   box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.5);
}
.breadcrumbs-custom {
  width: 100%;
  background: #fff;
  border-radius: 6px;
  padding: 1rem;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
  color: var(--main);
  .current-page {
    font-weight: bold;
    font-size: 1.4rem;
    margin-top: 0.5rem;
  }
}

.form-radio {
  width: 10vw;
  height: 3vw;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 3vw;
    position: absolute;
    top: 0;
    z-index: 2;
    left: 0.5rem;
    pointer-events: none;
  }
  span {
    position: absolute;
    margin-left: 2rem;
    font-weight: bold;
    color: var(--main);
    pointer-events: none;
  }
}
.form-radio-text-active {
  color: #ffffff !important;
}

.form-group {
  margin: 1.5rem 0;
  display: flex;
  justify-content: space-between;
}

.form-address {
  display: flex;
  #county {
    width: 5vw;
  }
  #city {
    width: 8vw;
  }
  #street {
    width: 100%;
  }
}

.p-radiobutton {
  width: 100%;
  height: 100%;
}
.p-highlight {
  width: 100%;
  height: 100%;
  border-radius: 6px;
}
.p-radiobutton-box {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  justify-content: flex-start;
  padding: 1rem;
  border: 1px solid var(--main);
}
.p-radiobutton-icon {
  display: flex;
  align-items: center;
  background: transparent;
}

@media screen and (max-width: 851px) {
  .app-nav{
    display: none;
  }
  .content-container{
    width: 100%;
  }
  .form-radio{
    width: 40vw;
    height: 20vw;
    img{
      width: 14vw;
      top: 0.5rem !important;
    }
  }
  .mobile-nav{
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
}
</style>