import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
    connected: false
})

const URL = "http://localhost:3000"

export const socket = io(URL)
