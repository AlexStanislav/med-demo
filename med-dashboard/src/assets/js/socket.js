import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
    connected: false
})

const URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : window.location.origin

export const socket = io(URL)
