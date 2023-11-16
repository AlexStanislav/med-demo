<template>
  <section class="requests-view">
    <Button
      icon="pi pi-plus"
      class="p-button-success request-button"
      @click="requestDialogVisible = true"
      label="Cerere noua"
      v-if="appStore.userType === 'patient'"
    />
    <section class="dashboard-card mobile-tables">
      <div class="card-header">
        <h1>
          {{ appStore.userType === "patient" ? "Cererile mele" : "Cereri" }}
        </h1>
      </div>
      <div class="card-container" v-if="!appStore.isMobile()">
        <DataTable
          v-model:selection="selectedRequest"
          @rowSelect="onSelectedRequest"
          selectionMode="single"
          :value="appStore.requests"
          responsiveLayout="scroll"
          paginator
          :rows="5"
        >
          <Column field="name" header="Nume"></Column>
          <Column field="email" header="Email"></Column>
          <Column field="phone" header="Telefon"></Column>
          <Column field="address" header="Adresa"></Column>
          <Column filed="illness" header="Sufera cronic">
            <template #body="slotProps">
              {{ chronicSuffer(slotProps.data) }}
            </template>
          </Column>
          <Column field="status" header="Status">
            <template #body="slotProps">
              <Tag
                :severity="tagType(slotProps.data.accepted).severity"
                :icon="tagType(slotProps.data.accepted).icon"
              >
                {{ slotProps.data.accepted ? "Acceptat" : "In asteptare" }}</Tag
              >
            </template>
          </Column>
          <Column field="actions" header="Actiuni" v-if="appStore.userType === 'patient'">
            <template #body="slotProps">
              <Button icon="pi pi-trash" class="p-button-danger" v-if="!slotProps.data.accepted"></Button>
            </template>
          </Column>
        </DataTable>
        <hr style="color: var(--blue-200); opacity: 0.5;" v-if="appStore.userType === 'nurse'">
        <DataTable
          v-model:selection="selectedRequest"
          @rowSelect="onSelectedRequest"
          selectionMode="single"
          :value="appStore.acceptedRequests"
          responsiveLayout="scroll"
          v-if="appStore.userType === 'nurse'"
        >
          <Column field="name" header="Nume"></Column>
          <Column field="email" header="Email"></Column>
          <Column field="phone" header="Telefon"></Column>
          <Column field="address" header="Adresa"></Column>
          <Column filed="illness" header="Sufera cronic">
            <template #body="slotProps">
              {{ chronicSuffer(slotProps.data) }}
            </template>
          </Column>
          <Column field="status" header="Status">
            <template #body="slotProps">
              <Tag
                :severity="tagType(slotProps.data.accepted).severity"
                :icon="tagType(slotProps.data.accepted).icon"
              >
                {{ slotProps.data.accepted ? "Acceptat" : "In asteptare" }}</Tag
              >
            </template>
          </Column>
          <Column field="actions" header="Actiuni" v-if="appStore.userType === 'patient'">
            <template #body="slotProps">
              <Button v-if="slotProps.data.accepted === false" icon="pi pi-trash" class="p-button-danger"></Button>
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="card-container" v-else>
        <Accordion :activeIndex="0">
          <AccordionTab v-for="request in appStore.requests" :key="request.id">
            <template #header>
              <Tag :severity="tagType(request.has_been_accepted).severity" :icon="tagType(request.has_been_accepted).icon">
                {{ request.has_been_accepted ? "Acceptat" : "In asteptare" }}
              </Tag>
              <Button class="p-button-success" label="Accepta" icon="pi pi-check" v-if="appStore.userType === 'nurse' && !request.has_been_accepted" @click="acceptRequest()" />
            </template>
            <p class="dialog-content">
              <div><span>Nume:</span> {{ request.name }}<br /></div> 
              <div><span>Email:</span> {{ request.email }}<br /></div>
              <div><span>Telefon:</span> {{ request.phone }}<br /></div>
              <div><span>Sex:</span> {{ request.sex }}<br /></div>
              <div><span>Varsta:</span> {{ request.age }}<br /></div>
              <div><span>Adresa:</span> {{ request.address }}<br /></div>
              <div><span>Sufera cronic:</span> {{ request.illness ? "Da" : "Nu" }}<br /></div>
              <div v-if="request.illness"><span>Detalii boala cronica:</span> {{ request.illnessDescription }}<br /></div>
              <div><span>Detalii cerere:</span> {{ request.requestDescription }}<br /></div>
            </p>
          </AccordionTab>
        </Accordion>
      </div>
    </section>
    <section class="dashboard-card" v-if="appStore.userType === 'nurse' && appStore.isMobile()">
      <div class="card-header">
        <h1>
          Cereri acceptate
        </h1>
      </div>
      <div class="card-container">
        <Accordion :activeIndex="0">
          <AccordionTab v-for="request in appStore.acceptedRequests" :key="request.id">
            <template #header>
              <Tag :severity="tagType(request.has_been_accepted).severity" :icon="tagType(request.has_been_accepted).icon">
                {{ request.has_been_accepted ? "Acceptat" : "In asteptare" }}
              </Tag>
            </template>
            <p class="dialog-content">
              <div><span>Nume:</span> {{ request.name }}<br /></div> 
              <div><span>Email:</span> {{ request.email }}<br /></div>
              <div><span>Telefon:</span> {{ request.phone }}<br /></div>
              <div><span>Sex:</span> {{ request.sex }}<br /></div>
              <div><span>Varsta:</span> {{ request.age }}<br /></div>
              <div><span>Adresa:</span> {{ request.address }}<br /></div>
              <div><span>Sufera cronic:</span> {{ request.illness ? "Da" : "Nu" }}<br /></div>
              <div v-if="request.illness"><span>Detalii boala cronica:</span> {{ request.illnessDescription }}<br /></div>
              <div><span>Detalii cerere:</span> {{ request.requestDescription }}<br /></div>
            </p>
          </AccordionTab>
        </Accordion>
      </div>
    </section>
  </section>
  <Dialog
    v-model:visible="requestDialogVisible"
    :style="{ width: '450px' }"
    :modal="true"
    header="Cerere noua"
  >
    <div class="dialog-content">
      <Textarea
        placeholder="Detalii cerere"
        rows="10"
        cols="42"
        v-model="requestDetails"
      ></Textarea>
      <Button
        severity="success"
        icon="pi pi-check"
        label="Trimite"
        @click="sendRequest()"
      />
    </div>
  </Dialog>
  <Dialog
    header="Detalii cerere"
    v-model:visible="selectedRequestVisible"
    modal
  >
    <Tag :severity="tagType(selectedRequest.data.accepted).severity" :icon="tagType(selectedRequest.data.accepted).icon">
      {{ selectedRequest.data.accepted ? "Acceptat" : "In asteptare" }}
    </Tag>
    <div class="dialog-content">
      <p>
        <div><span>Nume:</span> {{ selectedRequest.data.name }}<br /></div> 
        <div><span>Email:</span> {{ selectedRequest.data.email }}<br /></div>
        <div><span>Telefon:</span> {{ selectedRequest.data.phone }}<br /></div>
        <div><span>Sex:</span> {{ selectedRequest.data.sex }}<br /></div>
        <div><span>Varsta:</span> {{ selectedRequest.data.age }}<br /></div>
        <div><span>Adresa:</span> {{ selectedRequest.data.address }}<br /></div>
        <div><span>Sufera cronic:</span> {{ selectedRequest.data.illness ? "Da" : "Nu" }}<br /></div>
        <div v-if="selectedRequest.data.illness"><span>Detalii boala cronica:</span> {{ selectedRequest.data.illnessDescription }}<br /></div>
        <div><span>Detalii cerere:</span> {{ selectedRequest.data.requestDescription }}<br /></div>
      </p>
      <Button class="p-button-success" label="Accepta" icon="pi pi-check" v-if="appStore.userType === 'nurse'" @click="acceptRequest()" />
    </div>
  </Dialog>
  <Toast />
</template>
<script setup>
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Tag from "primevue/tag";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useAppStore } from "../store/app";
import { onBeforeUnmount, onMounted, ref } from "vue";
import Textarea from "primevue/textarea";
import axios from "axios";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { socket } from "../assets/js/socket";

const toast = useToast();
const appStore = useAppStore();

const selectedRequest = ref(null);
const requestDetails = ref("");

const requestDialogVisible = ref(false);
const selectedRequestVisible = ref(false);

const onSelectedRequest = (request) => {
  selectedRequest.value = request;
  selectedRequestVisible.value = true;
};

onMounted(() => {
  socket.connect();
  let postObject = {};
  if (appStore.userType === "patient") {
    postObject = {
      patient_id: appStore.personalDetails.patient_id,
    };
  } else if (appStore.userType === "nurse") {
    postObject = {
      county: appStore.personalDetails.county,
      city: appStore.personalDetails.city,
    };
  }
  axios
    .post(`${appStore.url}/${appStore.userType}/myRequests`, postObject, {
      withCredentials: true,
    })
    .then((response) => {
      if (response.status === 200) {
        if (appStore.userType === "patient") {
          appStore.updateRequests(response.data);
        } else {
          appStore.updateRequests(response.data.allRequests);
          appStore.updateAcceptedRequests(response.data.acceptedRequests);
        }
      }
    });

  socket.on("newRequest", (data) => {
    appStore.addRequest(data);
  });

  socket.on("acceptRequest", (data) => {
    if (appStore.userType === "nurse") {
      appStore.acceptRequest(data);
    } else {
      appStore.updateRequests(data);
    }
  });
});

onBeforeUnmount(() => {
  socket.disconnect();
});

/**
 * Send request to server
 */
const sendRequest = () => {
  // Check if request details are filled
  if (!requestDetails.value) {
    // Show error toast if request details are not filled
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Please fill in the request details",
      life: 3000,
    });
  } else {
    // Prepare request data
    const requestData = {
      lastname: appStore.personalDetails.lastName,
      firstname: appStore.personalDetails.firstName,
      patient_id: appStore.personalDetails.patient_id,
      email: appStore.loginDetails.email,
      requestDetails: requestDetails.value,
    };

    // Send request to server
    axios
      .post(`${appStore.url}/patient/newRequest`, requestData, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          // Show success toast if request is sent successfully
          toast.add({
            severity: "success",
            summary: "Success",
            detail: "Request has been sent",
            life: 3000,
          });
          // Close request dialog
          requestDialogVisible.value = false;
        }
      })
      .catch((error) => {
        // Show error toast if request could not be sent
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Request could not be sent",
          life: 3000,
        });
        console.log(error);
      });
  }
};

/**
 * Determines the tag type based on whether it is accepted or not.
 *
 * @param {boolean} accepted - Indicates whether the tag is accepted or not.
 * @returns {object} - An object with the severity and icon properties.
 */
const tagType = (isAccepted) => {
  if (isAccepted === true) {
    return {
      severity: "success",
      icon: "pi pi-check",
    };
  }
  return {
    severity: "warning",
    icon: "pi pi-times",
  };
};

const acceptRequest = () => {
  axios
    .put(
      `${appStore.url}/nurse/acceptRequest`,
      {
        requestId: selectedRequest.value.data.patient_id,
        nurse_id: appStore.personalDetails.nurse_id,
        county: appStore.personalDetails.county,
        city: appStore.personalDetails.city,
      },
      { withCredentials: true }
    )
    .catch((error) => {
      console.log(error);
    });
};

const chronicSuffer = (data) => {
  if (data !== null) {
    switch (data.illness) {
      case true:
        return "Da";
      case false:
        return "Nu";
      default:
        return "Nu";
    }
  } else {
    return "Nu";
  }
};
</script>
<style lang="scss">
.requests-view {
  margin-top: 1rem;
}

.illness-description-cell {
  width: 20rem;
  text-align: justify;
}

.request-button {
  margin-bottom: 1rem;
}

.dialog-content {
  .p-inputtextarea {
    resize: none;
    margin-bottom: 1rem;
  }
  p {
    width: 30vw;
    color: var(--gray-700);
  }

  div {
    padding: 0.25rem;
    span {
      font-weight: bold;
      color: var(--dark);
      margin-right: 0.5rem;
    }
    .pi-times,
    .p-tag-warning {
      color: #000;
    }
    .pi-check,
    .p-tag-success {
      color: #fff;
    }
  }
}

@media screen and (max-width: 851px) {
  .requests-view {
    width: 100%;
    .dashboard-card {
      width: 100%;
    }
  }
  .p-accordion{
    margin-top: 1rem;
  }
  .p-accordion .p-accordion-header .p-accordion-header-link {
    color: var(--blue-600);
  }
  p.request-details {
    display: flex;
    flex-flow: column;
  }
  .p-accordion-header{
    position: relative;
    .p-button{
      position: absolute;
      right: 0.5rem;
    }
  }
}
</style>