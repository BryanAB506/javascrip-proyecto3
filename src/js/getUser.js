document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('consultasTableBody');

    const fetchConsultas = async () => {
        try {
            const response = await fetch('http://localhost:3001/consultas'); 
            if (!response.ok) throw new Error('Error al obtener datos.');
            const consultas = await response.json();
            return consultas;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    };

    const populateTable = (consultas) => {
        tableBody.innerHTML = ''; 
        consultas.forEach(consulta => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${consulta.funcion || ''}</td>
                <td>${consulta.estudiante || ''}</td>
                <td>${consulta.fecha || ''}</td>
                <td>${consulta.hora || ''}</td>
                <td>${consulta.detalle || ''}</td>
            `;
            tableBody.appendChild(row);
        });
    };

    const loadConsultas = async () => {
        const consultas = await fetchConsultas();
        populateTable(consultas);
    };

    loadConsultas();
});
