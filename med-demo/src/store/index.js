import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => ({
        url: process.env.NODE_ENV === "development" ? "http://localhost:3000" : window.location.origin,
    })
})