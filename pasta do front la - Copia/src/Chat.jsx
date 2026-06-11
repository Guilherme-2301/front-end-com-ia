import React, { useState } from 'react';
import { FaPaperPlane, FaTrash, FaRobot, FaUser } from 'react-icons/fa';

const Chat = () => {
  const [mensagens, setMensagens] = useState([
    { id: 1, sender: 'ia', nome: 'MentorIA', texto: 'Olá, Guilherme! Eu sou o seu mentor de IA. O que vamos estudar hoje?' }
  ]);
  const [texto, setTexto] = useState('');

  const enviarMensagem = () => {
    if (!texto.trim()) return;

    const novaMensagem = {
      id: Date.now(),
      sender: 'user',
      nome: 'Você',
      texto: texto
    };

    setMensagens([...mensagens, novaMensagem]);
    setTexto(''); 

    setTimeout(() => {
      setMensagens(antigas => [...antigas, {
        id: Date.now() + 1,
        sender: 'ia',
        nome: 'MentorIA',
        texto: 'Entendi perfeitamente. Vamos analisar esse tópico com exemplos práticos.'
      }]);
    }, 1000);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <button onClick={() => setMensagens([])} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
          <FaTrash /> Limpar Conversa
        </button>
      </div>

      <div style={{ flex: 1, backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E4E4E7', padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
        {mensagens.map((msg) => (
          <div key={msg.id} style={{ display: 'flex', gap: '12px', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row', maxWidth: '70%' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: msg.sender === 'user' ? '#EEF2FF' : '#E0E7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4F46E5' }}>
              {msg.sender === 'user' ? <FaUser /> : <FaRobot />}
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#71717A', marginBottom: '4px', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>{msg.nome}</div>
              <div style={{ backgroundColor: msg.sender === 'user' ? '#4F46E5' : '#F4F4F5', color: msg.sender === 'user' ? '#FFF' : '#18181B', padding: '12px 16px', borderRadius: '12px', fontSize: '14px' }}>{msg.texto}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          value={texto} 
          onChange={(e) => setTexto(e.target.value)} 
          onKeyDown={(e) => { if (e.key === 'Enter') enviarMensagem(); }}
          placeholder="Digite sua dúvida e aperte Enter..." 
          style={{ flex: 1, padding: '14px', borderRadius: '8px', border: '1px solid #E4E4E7', fontSize: '14px', outline: 'none' }} 
        />
        <button onClick={enviarMensagem} style={{ backgroundColor: '#4F46E5', color: '#FFF', border: 'none', padding: '0 24px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
          Enviar <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Chat;