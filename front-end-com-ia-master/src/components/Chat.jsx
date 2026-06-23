import React, { useState } from 'react';
import { FaPaperPlane, FaTrash, FaRobot, FaUser } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { perguntarGemini } from '../services/geminiService';

const Chat = () => {
  const [mensagens, setMensagens] = useState([
    { id: 1, sender: 'ia', nome: 'MentorIA', texto: 'Olá, Guilherme! Eu sou o seu mentor de IA oficial do SENAI. O que vamos estudar hoje?' }
  ]);
  const [texto, setTexto] = useState('');
  const [loading, setLoading] = useState(false);

  const enviarMensagem = async () => {
    if (!texto.trim() || loading) return;

    const pergunta = texto;

    setMensagens((prev) => [
      ...prev,
      { id: Date.now(), sender: 'user', nome: 'Você', texto: pergunta }
    ]);

    setTexto('');
    setLoading(true);

    try {
      const respostaIA = await perguntarGemini(pergunta);

      setMensagens((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'ia', nome: 'MentorIA', texto: respostaIA }
      ]);
    } catch (erro) {
      console.error("Erro interno:", erro);
      setMensagens((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'ia', nome: 'MentorIA', texto: 'Ops, tive um problema para conectar com o Gemini. Verifique se o package.json foi instalado corretamente.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const perguntaRapida = (sugestao) => {
    if (loading) return;
    setTexto(sugestao);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* BOTÕES RÁPIDOS */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
        <button onClick={() => perguntaRapida('O que é useState no React?')} style={{ backgroundColor: '#EEF2FF', border: '1px solid #C7D2FE', color: '#4F46E5', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer' }}>💡 useState</button>
        <button onClick={() => perguntaRapida('Explique o comando npm install')} style={{ backgroundColor: '#EEF2FF', border: '1px solid #C7D2FE', color: '#4F46E5', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer' }}>💻 npm install</button>
        <button onClick={() => setMensagens([{ id: 1, sender: 'ia', nome: 'MentorIA', texto: 'Histórico limpo! Como posso ajudar?' }])} style={{ background: 'none', border: 'none', color: '#EF4444', marginLeft: 'auto', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
          <FaTrash /> Limpar
        </button>
      </div>

      {/* ÁREA DE MENSAGENS */}
      <div style={{ flex: 1, backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E4E4E7', padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
        {mensagens.map((msg) => (
          <div key={msg.id} style={{ display: 'flex', gap: '12px', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row', maxWidth: '80%' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: msg.sender === 'user' ? '#EEF2FF' : '#E0E7FF', display: 'flex', alignItems: 'center', color: '#4F46E5', justifyContent: 'center', flexShrink: 0 }}>
              {msg.sender === 'user' ? <FaUser /> : <FaRobot />}
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#71717A', marginBottom: '4px', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>{msg.nome}</div>
              <div style={{ backgroundColor: msg.sender === 'user' ? '#4F46E5' : '#F4F4F5', color: msg.sender === 'user' ? '#FFF' : '#18181B', padding: '12px 16px', borderRadius: '12px', fontSize: '14px' }}>
                <ReactMarkdown>{msg.texto}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}

        {/* INDICADOR CARREGANDO */}
        {loading && (
          <div style={{ display: 'flex', gap: '12px', alignSelf: 'flex-start', alignItems: 'center', color: '#71717A', fontSize: '14px' }}>
            <FaRobot style={{ color: '#4F46E5' }} /> <span>MentorIA está digitando...</span>
          </div>
        )}
      </div>

      {/* CAMPO DE ENTRADA */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          value={texto} 
          onChange={(e) => setTexto(e.target.value)} 
          onKeyDown={(e) => { if (e.key === 'Enter') enviarMensagem(); }}
          placeholder="Digite sua dúvida de programação e aperte Enter..." 
          style={{ flex: 1, padding: '14px', borderRadius: '8px', border: '1px solid #E4E4E7', fontSize: '14px', outline: 'none' }} 
          disabled={loading}
        />
        <button onClick={enviarMensagem} style={{ backgroundColor: loading ? '#9CA3AF' : '#4F46E5', color: '#FFF', border: 'none', padding: '0 24px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }} disabled={loading}>
          {loading ? 'Pensando...' : 'Enviar'} <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Chat;