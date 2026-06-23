export async function perguntarGemini(pergunta) {
  const token = localStorage.getItem('token');

  const response = await fetch('http://localhost:3001/chat/perguntar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ pergunta }),
  });

  const data = await response.json();
  return data.resposta;
}