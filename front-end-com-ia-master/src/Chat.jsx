import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton.jsx';
import ButtonWithIcon from './ButtonWithIcon.jsx';

const Chat = () => {
  const navigate = useNavigate();
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensagens, setMensagens] = useState([
    {
      id: 1,
      sender: 'ia',
      nome: 'MentorIA',
      avatar: '🤖',
      texto: 'Olá! Eu sou o seu mentor de IA. O que você gostaria de estudar ou revisar hoje?'
    }
  ]);

  const handleSendMessage = async (pergunta) => {
    const texto = pergunta || inputMessage;
    if (!texto.trim()) return;

    setMensagens(prev => [...prev, {
      id: Date.now(),
      sender: 'user',
      nome: 'Você',
      avatar: '👤',
      texto
    }]);

    setInputMessage('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:3001/chat/perguntar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ pergunta: texto }),
      });

      const data = await response.json();

      setMensagens(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ia',
        nome: 'MentorIA',
        avatar: '🤖',
        texto: data.resposta || 'Não consegui responder agora.'
      }]);
    } catch (error) {
      setMensagens(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ia',
        nome: 'MentorIA',
        avatar: '🤖',
        texto: 'Erro ao conectar com o servidor.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', backgroundColor: '#FAFAFA', fontFamily: 'sans-serif', position: 'fixed', top: 0, left: 0 }}>
      <header style={{ height: '60px', backgroundColor: '#FFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', borderBottom: '1px solid #E4E4E7', zIndex: 10 }}>
        <h2 style={{ color: '#4F46E5', margin: 0, fontSize: '20px', cursor: 'pointer' }} onClick={() => navigate('/home')}>MentorIA</h2>
        <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('usuario'); navigate('/login'); }} style={{ backgroundColor: '#EF4444', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Sair</button>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <aside style={{ width: '220px', backgroundColor: '#FFF', borderRight: '1px solid #E4E4E7', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ padding: '10px', borderRadius: '6px', cursor: 'pointer', color: '#71717A' }} onClick={() => navigate('/home')}>🏠 Início</div>
          <div style={{ padding: '10px', borderRadius: '6px', cursor: 'pointer', color: '#71717A' }}>📚 Minhas Trilhas</div>
          <div style={{ padding: '10px', borderRadius: '6px', cursor: 'pointer', backgroundColor: '#EEF2FF', color: '#4F46E5', fontWeight: 'bold' }}>🤖 Mentor IA</div>
          <div style={{ padding: '10px', borderRadius: '6px', cursor: 'pointer', color: '#71717A' }}>👤 Perfil</div>
        </aside>

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '30px', boxSizing: 'border-box', overflow: 'hidden' }}>
          <div style={{ marginBottom: '20px' }}>
            <BackButton />
            <h3 style={{ fontSize: '24px', color: '#18181B', margin: '10px 0 0 0' }}>Chat com MentorIA</h3>
          </div>

          <div style={{ flex: 1, backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E4E4E7', padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
            {mensagens.map((msg) => (
              <div key={msg.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row', maxWidth: '70%' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: msg.sender === 'user' ? '#EEF2FF' : '#E0E7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>{msg.avatar}</div>
                <div>
                  <div style={{ fontSize: '12px', color: '#71717A', marginBottom: '4px', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>{msg.nome}</div>
                  <div style={{ backgroundColor: msg.sender === 'user' ? '#4F46E5' : '#F4F4F5', color: msg.sender === 'user' ? '#FFF' : '#18181B', padding: '12px 16px', borderRadius: '12px', fontSize: '14px' }}>{msg.texto}</div>
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', alignSelf: 'flex-start', maxWidth: '70%' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#E0E7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🤖</div>
                <div style={{ backgroundColor: '#F4F4F5', color: '#71717A', padding: '12px 16px', borderRadius: '12px', fontSize: '14px' }}>Digitando...</div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
            <ButtonWithIcon title="O que estudar hoje?" icon="💡" onClick={() => handleSendMessage("O que estudar hoje?")} />
            <ButtonWithIcon title="Revisar meu progresso" icon="📈" onClick={() => handleSendMessage("Revisar meu progresso")} />
            <ButtonWithIcon title="Perguntar mais" icon="❓" onClick={() => handleSendMessage("Perguntar mais")} />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }} placeholder="Digite sua dúvida para o mentor..." style={{ flex: 1, padding: '14px', borderRadius: '8px', border: '1px solid #E4E4E7', fontSize: '14px', outline: 'none' }} />
            <button onClick={() => handleSendMessage()} disabled={loading} style={{ backgroundColor: '#4F46E5', color: '#FFF', border: 'none', padding: '0 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Enviar</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chat;