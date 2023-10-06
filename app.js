
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();
function formatData(input) {
    const grid = input.newboard.grids[0];
    const board = grid.value
      .map(row => row.map(cell => (cell === 0 ? '-' : cell)).join(''))
      .join(',');
    const solution = grid.solution.map(row => row.join('')).join(',');

    return {
      board,
      solution,
      difficulty: grid.difficulty.toLowerCase()
    };
  }
  
async function fetchDataFromEndpoint(endpointUrl) {
  try {
    const response = await fetch(endpointUrl);
    if (!response.ok) {
      throw new Error(`Error en la solicitud GET: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error en la solicitud GET: ${error.message}`);
  }
}

async function sendPostRequestWithJWT(url, jwt, dataToSend) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud POST: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error(`Error en la solicitud POST: ${error.message}`);
  }
}


async function main() {
  const endpointUrl = 'https://sudoku-api.vercel.app/api/dosuku/'; 
  const email = process.env.EMAIL; 
  const password = process.env.PASSWORD; 

  try {
   
    const fetchedData = await fetchDataFromEndpoint(endpointUrl);


    const formattedData = formatData(fetchedData); 

   
    const loginUrl = 'https://sudoku-api-ts.vercel.app/api/v1/auth/login/'; 
    const loginData = { email, password };
    const loginResponse = await sendPostRequestWithJWT(loginUrl, null, loginData);

   
    const jwt = loginResponse.token; 


    const finalUrl = 'https://sudoku-api-ts.vercel.app/api/v1/sudoku/add';
    const finalResponse = await sendPostRequestWithJWT(finalUrl, jwt, formattedData);

    console.log('Respuesta final:', finalResponse);
  } catch (error) {
    console.error('Error:', error);
  }
}

function asyncAutoAdd(iterations, time) {
    return new Promise((resolve, reject) => {
      let count = 0;
  
      function addSudokuByIterations() {
        if (count < iterations) {
            main();
          count++;
  
          setTimeout(addSudokuByIterations, time); 
        } else {
          resolve("Acción completada");
        }
      }
      addSudokuByIterations(); 
    });
  }


  async function start() {
    try {
      const iterations = 100;
      const time = 15000; 
  
      await asyncAutoAdd(iterations, time);
      console.log("All actions have been completed.");
    } catch (error) {
      console.error("Error:", error);
    }
  }

start();