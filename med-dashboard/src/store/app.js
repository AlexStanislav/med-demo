import { defineStore } from 'pinia'
import { io } from "socket.io-client";

export const useAppStore = defineStore('app', {
    /**
     * Initializes the state of the component.
     *
     * @return {Object} - The initial state object.
     */
    state: () => ({
        isMobile: () => {
            const userAgent = navigator.userAgent.toLowerCase();
            const mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];
          
            return mobileKeywords.some(keyword => userAgent.includes(keyword));
        },
        url: process.env.NODE_ENV === "development" ? "http://localhost:3000" : window.location.origin,
        userType: 'patient',
        personalDetails: {
            firstName: "John",
            lastName: "Doe",
            phone: "0123 456 789",
            address: "Str. 1, Nr. 2, Bl. 3, Sc. 4, Et. 5",
            city: "Oras",
            county: "Prahova",
            illness: false,
            illnessDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            sex: "Masculin",
            age: "18-30"
        },
        loginDetails: {
            email: "IjR1p@example.com",
            oldPassword: "oldPassword",
            newPassword: "newPassword",
        },
        requests: [
            {
                name: "John Doe",
                sex: "Masculin",
                age: "18-30",
                address: "Judet, Oras, Str. 1, Nr. 2, Bl. 3, Sc. 4, Et. 5",
                email: "test@test.com",
                phone: "0123456789",
                illness: true,
                illnessDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                requestDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                accepted: false
            }
        ],
        acceptedRequests: [],
        socket: null
    }),
    actions: {
        /**
         * Updates the personal details of the user.
         *
         * @param {object} personalDetails - The new personal details of the user.
         */
        updatePersonalDetails(personalDetails) {
            const pd = this.personalDetails;
            const p = personalDetails;
            pd.firstName = p.surname;
            pd.lastName = p.lastname;
            pd.phone = p.phone;
            pd.address = p.street;
            pd.city = p.city;
            pd.county = p.county;
            pd.illness = p.illness;
            pd.illnessDescription = p.illness_description;
            pd.sex = p.sex;
            pd.age = p.age;
            pd.patient_id = p.patient_id;
            pd.nurse_id = p.nurse_id;
        },

        /**
         * Set the user type.
         *
         * @param {type} userType - The user type to set.
         */
        setUserType(userType) {
            this.userType = userType
        },

        /**
         * Updates the login details for the user.
         *
         * @param {string} email - The new email address for the user.
         */
        updateLoginDetails(email) {
            this.loginDetails = { email };
        },

        createIOConnection() {
            this.socket = io(this.url);
        },

        /**
         * Add a new request to the requests array.
         * 
         * @param {object} request - The new request to add.
         */
        addRequest(request) {
            this.requests.push(request);
        },

        /**
         * Update the requests and filter them based on the accepted status while removing the patientInfo property.
         *
         * @param {Array} requests - The new requests to update.
         */
        updateRequests(requests) {
            for (const request of requests) {
                request["name"] = request.patientInfo["lastname"] + " " + request["surname"];
                request["sex"] = request.patientInfo["sex"];
                request["age"] = request.patientInfo["age"];
                request["email"] = request.email
                request["phone"] = request.patientInfo["phone"];
                request["address"] = request.patientInfo["county"] + ", " + request.patientInfo["city"] + ", " + request.patientInfo["street"];
                request["illness"] = request.patientInfo["illness"];
                request["illnessDescription"] = request.patientInfo["illness_description"];
                request["requestDescription"] = request.request_details;
                request["accepted"] = request.has_been_accepted
            }
            
            // Remove requests that do not have the patient_info object if the userType is nurse
            if (this.userType === 'nurse') {
                requests = requests.filter(request => request.patientInfo !== undefined);
            }

            for (const request of requests) {
                delete request.patientInfo
            }

            // Remove requests that have been accepted if the userType is nurse
            if(this.userType === 'nurse') {
                requests = requests.filter(request => request.has_been_accepted !== true);
            }

            this.requests = requests
        },
        /**
         * Update the accepted requests.
         * 
         * @param {Array} requests - The new requests to update.
         */
        updateAcceptedRequests(requests) {
            for (const request of requests) {
                request["name"] = request.patientInfo["lastname"] + " " + request["surname"];
                request["sex"] = request.patientInfo["sex"];
                request["age"] = request.patientInfo["age"];
                request["email"] = request.email
                request["phone"] = request.patientInfo["phone"];
                request["address"] = request.patientInfo["county"] + ", " + request.patientInfo["city"] + ", " + request.patientInfo["street"];
                request["illness"] = request.patientInfo["illness"];
                request["illnessDescription"] = request.patientInfo["illness_description"];
                request["requestDescription"] = request.request_details;
                request["accepted"] = request.has_been_accepted
            }

            this.acceptedRequests = requests
        },
        /**
         * Accept request and remove it from requests while updating the accepted requests.
         *
         * @param {string} requestId - The ID of the request to accept.
         */
        acceptRequest(requests) {
            // Remove accepted request from requests
            const allRequests = requests.filter(request => request.has_been_accepted === false);
            
            // Add accepted request to accepted requests
            const acceptedRequests = requests.filter(request => request.has_been_accepted === true);

            // Update requests
            this.updateRequests(allRequests);
            this.updateAcceptedRequests(acceptedRequests);
        }
    }
})