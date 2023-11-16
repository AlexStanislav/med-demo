<template>
  <form>
    <section class="form-select" v-if="isModal">
      <h2>Unde te incadrezi?</h2>
      <div class="form-radio">
        <RadioButton
          v-model="formType"
          inputId="pacient"
          value="pacient"
          name="formType"
        />
        <img
          :src="`https://img.icons8.com/dotty/80/${
            formType === 'pacient' ? 'ffffff' : '2490eb'
          }/person-male.png`"
          alt="person-male"
        />
        <span
          class="form-radio-text"
          :class="{ 'form-radio-text-active': formType === 'pacient' }"
          >Pacient</span
        >
      </div>
      <div class="form-radio">
        <RadioButton
          v-model="formType"
          inputId="nurse"
          value="nurse"
          name="formType"
        />
        <img
          :src="`https://img.icons8.com/dotty/80/${
            formType === 'nurse' ? 'ffffff' : '2490eb'
          }/medical-doctor.png`"
          alt="medical-doctor"
        />
        <span
          class="form-radio-text"
          :class="{ 'form-radio-text-active': formType === 'nurse' }"
          >Medical</span
        >
      </div>
    </section>
    <section class="patient-form" v-if="formType === 'pacient'">
      <h3>Formular de inscriere pacient</h3>
      <div class="form-group">
        <span class="p-float-label">
          <InputText
            required
            id="name"
            type="text"
            v-model="formValuesPatient.lastname"
          />
          <label for="name">Nume</label>
        </span>
        <span class="p-float-label">
          <InputText
            required
            id="surname"
            type="text"
            v-model="formValuesPatient.surname"
          />
          <label for="surname">Prenume</label>
        </span>
      </div>
      <span class="p-float-label">
        <Password
          required
          id="password"
          type="password"
          v-model="formValuesPatient.password"
          toggleMask
        />
        <label for="password">Parola</label>
      </span>
      <div class="form-group">
        <span class="p-float-label">
          <InputText
            required
            id="email"
            type="text"
            v-model="formValuesPatient.email"
          />
          <label for="email">Email</label>
        </span>
        <span class="p-float-label">
          <InputMask
            id="phone"
            date="phone"
            mask="9999 999 999"
            v-model="formValuesPatient.phone"
          />
          <label for="phone">Telefon</label>
        </span>
      </div>
      <div class="form-group form-address">
        <span class="p-float-label">
          <InputText
            required
            id="county"
            type="text"
            v-model="formValuesPatient.county"
          />
          <label for="county">Judet</label>
        </span>
        <span class="p-float-label">
          <InputText
            required
            id="city"
            type="text"
            v-model="formValuesPatient.city"
          />
          <label for="city">Oras</label>
        </span>
        <span class="p-float-label">
          <InputText
            required
            id="street"
            type="text"
            v-model="formValuesPatient.street"
          />
          <label for="street">Strada</label>
        </span>
      </div>
      <div class="form-group form-info">
        <fieldset class="patient-gender">
          <legend>Sex</legend>
          <div class="flex align-items-center">
            <RadioButton
              v-model="formValuesPatient.sex"
              inputId="patientMale"
              name="patientSex"
              value="Masculin"
            />
            <label for="patientMale" class="ml-2">Masculin</label>
          </div>
          <div class="flex align-items-center">
            <RadioButton
              v-model="formValuesPatient.sex"
              inputId="patientFemale"
              name="patientSex"
              value="Feminin"
            />
            <label for="patientFemale" class="ml-2">Feminin</label>
          </div>
        </fieldset>
        <fieldset class="patient-age">
          <legend>Varsta</legend>
          <div class="flex align-items-center">
            <RadioButton
              v-model="formValuesPatient.age"
              inputId="patientYoung"
              name="patientAge"
              value="18-30"
            />
            <label for="patientYoung" class="ml-2">18-30</label>
          </div>
          <div class="flex align-items-center">
            <RadioButton
              v-model="formValuesPatient.age"
              inputId="patientMiddle"
              name="patientAge"
              value="31-60"
            />
            <label for="patientMiddle" class="ml-2">31-60</label>
          </div>
          <div class="flex align-items-center">
            <RadioButton
              v-model="formValuesPatient.age"
              inputId="patientOld"
              name="patientAge"
              value="60+"
            />
            <label for="patientOld" class="ml-2">60+</label>
          </div>
        </fieldset>
      </div>
      <div class="form-group form-illness">
        <div class="illness-text">Suferiti de boli cronice?</div>
        <ToggleButton
          v-model="formValuesPatient.illness"
          onLabel="Da"
          offLabel="Nu"
        />
      </div>
      <span class="p-float-label" v-if="formValuesPatient.illness">
        <Textarea
          v-model="formValuesPatient.illnessDescription"
          rows="10"
          cols="46"
        />
        <label for="illnessDescription">Care sunt aceste boli?</label>
      </span>
      <div class="form-group">
        <Button
          class="submit-button"
          label="Inscrie-te"
          @click="submitForm()"
        />
      </div>
    </section>
    <section class="nurse-form" v-if="formType === 'nurse'">
      <h3>Formular de inscriere personal medical</h3>
      <div class="form-group">
        <span class="p-float-label">
          <InputText
            required
            id="name"
            type="text"
            v-model="formValuesNurse.lastname"
          />
          <label for="name">Nume</label>
        </span>
        <span class="p-float-label">
          <InputText
            required
            id="surname"
            type="text"
            v-model="formValuesNurse.surname"
          />
          <label for="surname">Prenume</label>
        </span>
      </div>
      <span class="p-float-label">
        <Password
          required
          id="password"
          type="password"
          v-model="formValuesNurse.password"
          toggleMask
        />
        <label for="password">Parola</label>
      </span>
      <div class="form-group">
        <span class="p-float-label">
          <InputText
            required
            id="email"
            type="text"
            v-model="formValuesNurse.email"
          />
          <label for="email">Email</label>
        </span>
        <span class="p-float-label">
          <InputMask
            id="phone"
            date="phone"
            mask="9999 999 999"
            v-model="formValuesNurse.phone"
          />
          <label for="phone">Telefon</label>
        </span>
      </div>
      <div class="form-group form-address">
        <span class="p-float-label">
          <InputText
            required
            id="county"
            type="text"
            v-model="formValuesNurse.county"
          />
          <label for="county">Judet</label>
        </span>
        <span class="p-float-label">
          <InputText
            required
            id="city"
            type="text"
            v-model="formValuesNurse.city"
          />
          <label for="city">Oras</label>
        </span>
        <span class="p-float-label">
          <InputText
            required
            id="street"
            type="text"
            v-model="formValuesNurse.street"
          />
          <label for="street">Strada</label>
        </span>
      </div>
      <span class="p-float-label">
        <InputText
          required
          id="specialty"
          type="text"
          v-model="formValuesNurse.specialty"
        />
        <label for="specialty">Specialitate</label>
      </span>
      <!-- <div class="form-group">
        <div class="image-upload">
          <label for="image">Incarca certificate</label>
          <input
            type="file"
            name="image"
            id="image"
            multiple
            @input="selectForUpload"
          />
          <i class="pi pi-upload"></i>
        </div>
        <div class="uploaded-files">
          <h4>Documente selectate</h4>
          <ol>
            <li v-for="file in selectedFiles" :key="file">{{ file.name }}</li>
          </ol>
          <div class="no-upload-files" v-if="selectedFiles.length === 0">
            Nu a fost incarcat nimic
          </div>
        </div>
      </div> -->
      <Button class="submit-button" label="Inscrie-te" @click="submitForm()" />
    </section>
  </form>
  <Toast />
</template>
<script setup>
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import RadioButton from "primevue/radiobutton";
import InputMask from "primevue/inputmask";
import Button from "primevue/button";
import ToggleButton from "primevue/togglebutton";
import Toast from "primevue/toast";
import Password from "primevue/password";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useAppStore } from "../store/index";
import axios from "axios";

const toast = useToast();
const store = useAppStore();

const props = defineProps({
  isModal: {
    type: Boolean,
    default: false,
  },
});

const formType = ref("pacient");
const router = useRouter();

/**
 * Generates the form type based on the current route.
 *
 * @return {void} No return value.
 */
const formDisplay = () => {
  let currentRoute = router.currentRoute.value.name;

  switch (currentRoute) {
    case "patient":
      formType.value = "pacient";
      break;
    case "nurse":
      formType.value = "nurse";
      break;
    default:
      formType.value = "pacient";
      break;
  }
};

onMounted(() => {
  formDisplay();
});

const formValuesPatient = ref({
  lastname: "",
  surname: "",
  email: "",
  password: "",
  phone: "",
  county: "",
  city: "",
  street: "",
  sex: "Masculin",
  age: "18-30",
  illness: false,
  illnessDescription: "",
});

const formValuesNurse = ref({
  lastname: "",
  surname: "",
  email: "",
  password: "",
  phone: "",
  county: "",
  city: "",
  street: "",
  specialty: "",
});


/**
 * Checks if all values in the given object, except for specified ones, are not empty.
 *
 * @param {Object} obj - The object to be checked.
 * @param {Array} exceptions - The list of keys to exclude from the check.
 * @return {boolean} Returns true if all values, except for specified ones, are not empty, false otherwise.
 */
function verifyFormValues(obj, exceptions) {
  for (const key in obj) {
    if (!exceptions.includes(key) && !obj[key]) {
      return false;
    }
  }
  return true;
}

const submitForm = () => {
  switch (formType.value) {
    case "pacient":
      if (
        verifyFormValues(formValuesPatient.value, [
          "illness",
          "illnessDescription",
        ])
      ) {
        axios
          .post(`${store.url}/patient/register`, formValuesPatient.value)
          .then((response) => {
            if (response.status === 200) {
              toast.add({
                severity: "success",
                summary: "Succes",
                detail: "Inregistrare realizata cu succes",
                life: 3000,
              });
            }
          })
          .catch((error) => {
            toast.add({
              severity: "error",
              summary: "Eroare",
              detail: error.response.data.message,
              life: 3000,
            });
          });
      }
      break;
    case "nurse":
      if(verifyFormValues(formValuesNurse.value, [])){
        axios.post(`${store.url}/nurse/register`, formValuesNurse.value)
        .then((response) => {
          if (response.status === 200) {
            toast.add({
              severity: "success",
              summary: "Succes",
              detail: "Inregistrare realizata cu succes",
              life: 3000,
            })
          }
        }).catch((error) => {
          toast.add({
            severity: "error",
            summary: "Eroare",
            detail: error.response.data.message,
            life: 3000,
          })
        })
      }
      break;
    default:
      throw new Error("Invalid form type");
  }
};
</script>
<style lang="scss">
.form-group {
  display: flex;
  gap: 1rem;
}

.form-select {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 1rem;
  h2 {
    width: 100%;
    text-align: center;
    color: var(--dark);
  }
}

form {
  width: 500px;
  h3 {
    text-align: center;
    color: var(--main);
  }
}

.form-select {
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

#specialty,
#password {
  width: 100%;
  .p-inputtext{
    width: 100%;
  }
}

.image-upload {
  width: 50%;
  height: 10vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
  gap: 1rem;
  color: #7d7d7d;
  i {
    font-size: 2.5rem;
  }
  border: 1px solid #bdbdbd;
  border-radius: 6px;
  #image {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
}

.uploaded-files {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
  gap: 1rem;
  h4 {
    margin: 0;
    color: var(--main);
  }
  ol {
    width: 11vw;
    margin: 0;
    padding: 0;
    color: var(--dark);
  }
}

.form-info {
  .p-radiobutton-box {
    width: 1vw;
    height: 1vw;
    display: flex;
  }
  .p-radiobutton-icon {
    width: 0.8vw;
    height: 0.8vw;
  }
}

.patient-gender,
.patient-age {
  display: flex;
  flex-flow: row wrap;
  gap: 0.5rem;
  border-radius: 6px;
  border: 1px solid #cdcdcd;
  legend {
    margin: 0;
    color: var(--main);
    font-weight: bold;
  }
  label {
    padding-left: 0.5rem;
    color: #495057;
  }
}

.form-illness {
  flex-flow: row wrap;
  align-items: center;
  position: relative;
  justify-content: flex-start;
  .illness-text {
    width: fit-content;
    font-weight: bold;
    color: var(--main);
  }
  .p-highlight {
    background: var(--main);
    border: 1px solid var(--main);
  }
}

textarea {
  resize: none;
}
.submit-button {
  width: 100%;
  margin-top: 2rem;
}

@media screen and (max-width: 768px) {
  form {
    width: 400px;
  }
  .form-group {
    flex-flow: column wrap;
    align-items: center;
  }
  .p-inputtext {
    width: 90vw;
  }
  .form-address {
    #county,
    #city,
    #street {
      width: 90vw;
    }
  }
  .form-info {
    .p-radiobutton-box {
      width: 5vw;
      height: 5vw;
      display: flex;
    }
    .p-radiobutton-icon {
      width: 99%;
      height: 99%;
    }
  }
}
</style>