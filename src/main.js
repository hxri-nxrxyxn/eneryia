import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'
import { StatusBar } from '@capacitor/status-bar';

document.addEventListener("DOMContentLoaded", async function () {
    await StatusBar.hide(); // Hides the status bar
});

const app = mount(App, {
  target: document.getElementById('app'),
})

export default app
