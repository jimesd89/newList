<template>
    <div class="footer">
      <p>Un producto de <img class="logo" src="@/assets/P.png" alt="Palmero"></p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FooterComponent',
  };
  </script>
  
  <style>
  .footer {
    padding: 36px;
    text-align: center;
    font-size: 14px;
    }
    .logo {
  max-width: 150px; /* ajusta este valor según el tamaño deseado */
  height: 120px; /* para mantener la proporción */
}
  </style>