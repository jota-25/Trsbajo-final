
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBCSkXBrU2hJEZPxcLEvNa6xte4Ov05P4g",
  authDomain: "form-newproyect.firebaseapp.com",
  projectId: "form-newproyect",
  storageBucket: "form-newproyect.firebasestorage.app",
  messagingSenderId: "916975722099",
  appId: "1:916975722099:web:ab3f39f806fb27ff289406",
  measurementId: "G-FDYRDPCV5W"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("contactForm");
const msg = document.getElementById("formMessage"); // 👈 la habías comentado

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const asunto = document.getElementById("asunto").value;
  const mensaje = document.getElementById("mensaje").value;
  const fecha = new Date();

  try {
    await addDoc(collection(db, "Clientes"), {
      nombre,
      email,
      asunto,
      mensaje,
      fecha
    });

    msg.textContent = "Mensaje enviado con éxito";
    msg.style.color = "lightgreen";
    form.reset();
  } catch (error) {
    console.error("Error al enviar mensaje: ", error);
    msg.textContent = " Hubo un error al enviar tu mensaje";
    msg.style.color = "red";
  }
});
