<template>
  <section class="account-details">
    <section class="personal-details dashboard-card">
      <div class="card-header">
        <h1>Detalii Personale</h1>
        <Button
          severity="success"
          icon="pi pi-pencil"
          label="Modifica"
          @click="personalIsReadonly = !personalIsReadonly"
        />
      </div>
      <div class="personal-details-container">
        <form>
          <div class="form-group">
            <span class="p-float-label">
              <InputText
                id="lastname"
                v-model="appStore.personalDetails.lastName"
                :readonly="personalIsReadonly"
              />
              <label>Nume</label>
            </span>
            <span class="p-float-label">
              <InputText
                id="firstname"
                v-model="appStore.personalDetails.firstName"
                :readonly="personalIsReadonly"
              />
              <label>Prenume</label>
            </span>
            <span class="p-float-label">
              <InputMask
                id="phone"
                mask="0999 999 999"
                v-model="appStore.personalDetails.phone"
                :readonly="personalIsReadonly"
              />
              <label>Telefon</label>
            </span>
          </div>
          <div class="form-group">
            <span class="p-float-label">
              <InputText
                id="address"
                v-model="appStore.personalDetails.address"
                :readonly="personalIsReadonly"
              />
              <label>Adresa</label>
            </span>
            <span class="p-float-label">
              <InputText
                id="city"
                v-model="appStore.personalDetails.city"
                :readonly="personalIsReadonly"
              />
              <label>Oras</label>
            </span>
            <span class="p-float-label">
              <InputText
                id="country"
                v-model="appStore.personalDetails.county"
                :readonly="personalIsReadonly"
              />
              <label>Judet</label>
            </span>
          </div>
          <div class="form-group" v-if="appStore.userType === 'patient'">
            <span class="p-float-label">
              <InputText
                id="age"
                v-model="appStore.personalDetails.age"
                :readonly="personalIsReadonly"
              />
              <label>Varsta</label>
            </span>
            <span class="p-float-label">
              <InputText
                id="sex"
                v-model="appStore.personalDetails.sex"
                :readonly="personalIsReadonly"
              />
              <label>Sex</label>
            </span>
            <span class="toggle-illness">
              <label>Boli cronice</label>
              <ToggleButton
                id="chronicIllness"
                v-model="appStore.personalDetails.illness"
                offLabel="Nu"
                onLabel="Da"
                :disabled="personalIsReadonly"
              />
            </span>
          </div>
          <div
            class="form-group"
            v-if="
              appStore.userType === 'patient' &&
              appStore.personalDetails.illness === true
            "
          >
            <span class="p-float-label chornic-illness-description">
              <Textarea
                id="chronicIllness"
                v-model="appStore.personalDetails.illnessDescription"
                :readonly="personalIsReadonly"
              />
              <label>Boli cronice</label>
            </span>
          </div>
          <Button
            severity="info"
            icon="pi pi-save"
            label="Salveaza"
            v-if="!personalIsReadonly"
            @click="savePersonalDetails()"
          />
        </form>
      </div>
    </section>
    <section class="login-details dashboard-card">
      <div class="card-header">
        <h1>Detalii de Autentificare</h1>
        <Button
          severity="success"
          icon="pi pi-pencil"
          label="Modifica"
          @click="loginIsReadonly = !loginIsReadonly"
        />
      </div>
      <div class="login-details-container">
        <form>
          <div class="form-group">
            <span class="p-float-label">
              <InputText
                id="email"
                v-model="appStore.loginDetails.email"
                :readonly="loginIsReadonly"
              />
              <label>Email</label>
            </span>
            <span class="p-float-label">
              <InputText
                id="password"
                type="password"
                v-model="appStore.loginDetails.oldPassword"
                :readonly="loginIsReadonly"
              />
              <label>Parola Veche</label>
            </span>
            <span class="p-float-label">
              <Password
                id="newPassword"
                v-model="appStore.loginDetails.newPassword"
                toggleMask
                :readonly="loginIsReadonly"
              />
              <label>Parola Noua</label>
            </span>
          </div>
          <Button
            severity="info"
            icon="pi pi-save"
            label="Salveaza"
            @click="saveLoginDetails()"
            v-if="!loginIsReadonly"
          />
        </form>
      </div>
    </section>
  </section>
  <Toast />
</template>
<script setup>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import InputMask from "primevue/inputmask";
import Password from "primevue/password";
import Textarea from "primevue/textarea";
import ToggleButton from "primevue/togglebutton";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { useAppStore } from "../store/app";

const appStore = useAppStore();
const toast = useToast();

import { ref } from "vue";
import axios from "axios";

const personalIsReadonly = ref(true);
const loginIsReadonly = ref(true);

const savePersonalDetails = () => {
  personalIsReadonly.value = !personalIsReadonly.value;
  // Send request to server
  axios
    .post(
      `${appStore.url}/patient/updatePersonalInfo`,
      appStore.personalDetails,
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      if (response.status === 200) {
        toast.add({
          severity: "success",
          summary: "Succes",
          detail: "Datele au fost actualizate cu succes",
          life: 3000,
        });
      } else {
        toast.add({
          severity: "error",
          summary: "Eroare",
          detail: "Datele nu au putut fi actualizate",
          life: 3000,
        });
      }
    });
};

//TODO: Crate server endpoint
const saveLoginDetails = () => {
  loginIsReadonly.value = !loginIsReadonly.value;
};
</script>
<style lang="scss">
.account-details {
  padding: 1rem 0;
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
}

.personal-details-container {
  margin-top: 2rem;
}

.toggle-illness {
  width: 33%;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: flex-start;
  label {
    width: fit-content;
  }
  .p-togglebutton {
    width: 30%;
  }
}

.login-details {
  height: fit-content;
}

@media screen and (max-width: 851px) {
  .form-group {
    flex-flow: column wrap;
    gap: 2rem;
  }
  .account-details {
    width: 100%;
    .card-container {
      width: 100%;
    }
  }
}
</style>