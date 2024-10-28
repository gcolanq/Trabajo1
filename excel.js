document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("inputExcel").addEventListener("change", function (event) {
        const archivo = event.target.files[0];
        if (archivo) {
            const lector = new FileReader();

            lector.onload = function (e) {
                const datos = new Uint8Array(e.target.result);
                const libro = XLSX.read(datos, { type: "array" });
                const nombreHoja = libro.SheetNames[0];
                const hoja = libro.Sheets[nombreHoja];

                const datosExcel = XLSX.utils.sheet_to_json(hoja, { header: 1 });
                console.log(datosExcel); // Para ver los datos leídos
                mostrarDatosEspecificos(datosExcel);
            };
            lector.readAsArrayBuffer(archivo);
        }
    });
});

function mostrarDatosEspecificos(datos) {
    const nombreElemento = document.getElementById("nombre");
    const graficoBarras = document.getElementById("graficoBarras");
    nombreElemento.innerHTML = ""; // Limpiamos el contenido previo
    graficoBarras.innerHTML = ""; // Limpiamos el gráfico previo

    if (datos.length > 1) { // Verificamos que haya al menos dos filas
        for (let i = 1; i < datos.length; i++) { // Comenzamos en 1 para omitir el encabezado
            const nombre = datos[i][0];
            nombreElemento.appendChild(document.createTextNode(nombre + " "));

            if (datos[i][1] && typeof datos[i][1] === "number") { // Verificamos que haya un número en la segunda columna
                const altura = datos[i][1];
                console.log(`Nombre: ${nombre}, Altura: ${altura}`); // Log de nombre y altura

                const barra = document.createElement("div");
                barra.style.height = altura * 30 + "px"; // Ajusta el multiplicador
                barra.style.width = "30px";
                barra.style.backgroundColor = "#4CAF50";
                barra.style.margin = "5px";
                barra.style.display = "inline-block";

                graficoBarras.appendChild(barra); // Agregamos la barra al contenedor
                console.log("Barra añadida"); // Confirmación de que se añadió la barra
            } else {
                console.log(`No hay número válido en la fila ${i}`); // Mensaje si no hay un número válido
            }
        }
    } else {
        nombreElemento.textContent = "No disponible"; // Texto por defecto si no hay datos
    }
}