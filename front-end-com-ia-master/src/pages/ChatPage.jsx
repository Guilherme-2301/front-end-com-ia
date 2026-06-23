import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaRobot, FaUser, FaArrowLeft } from 'react-icons/fa';
import Chat from '../components/Chat.jsx';

const ChatPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', backgroundColor: '#FAFAFA', fontFamily: 'sans-serif', position: 'fixed', top: 0, left: 0 }}>
      <header style={{ height: '60px', backgroundColor: '#FFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', borderBottom: '1px solid #E4E4E7', zIndex: 10 }}>
        <h2 style={{ color: '#4F46E5', margin: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><FaRobot /> MentorIA</h2>
        <button onClick={() => navigate('/login')} style={{ backgroundColor: '#EF4444', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Sair</button>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <aside style={{ width: '220px', backgroundColor: '#FFF', borderRight: '1px solid #E4E4E7', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ padding: '10px', borderRadius: '6px', cursor: 'pointer', color: '#71717A', display: 'flex', alignItems: 'center', gap: '10px' }} onClick={() => navigate('/home')}><FaHome /> Início</div>
          <div style={{ padding: '10px', borderRadius: '6px', cursor: 'pointer', backgroundColor: '#EEF2FF', color: '#4F46E5', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}><FaRobot /> Mentor IA</div>
          <div style={{ padding: '10px', borderRadius: '6px', cursor: 'pointer', color: '#71717A', display: 'flex', alignItems: 'center', gap: '10px' }}><FaUser /> Perfil</div>
        </aside>

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '30px', boxSizing: 'border-box', overflow: 'hidden' }}>
          <div style={{ marginBottom: '20px' }}>
            <button onClick={() => navigate(-1)} style={{ backgroundColor: '#E4E4E7', border: 'none', color: '#18181B', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500' }}>
              <FaArrowLeft /> Voltar
            </button>
            <h3 style={{ fontSize: '24px', color: '#18181B', margin: '15px 0 0 0' }}>Chat com MentorIA</h3>
          </div>
          <Chat />
        </main>
      </div>
    </div>
  );
};

export default ChatPage;