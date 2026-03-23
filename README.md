# Pasos seguidos para hacer el deploy:
1. Añadir el base: './' en el vite.config.ts para cambiar el punto de partida de las rutas de los assets a rutas relativas.
2. Sutituir el createWebHistory por el createWebHashHistory en el enrutado de Vue para evitar así el problema de las rutas al desplegar. 
