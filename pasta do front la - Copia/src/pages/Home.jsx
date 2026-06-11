import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', backgroundColor: '#FAFAFA', fontFamily: 'sans-serif', position: 'fixed', top: 0, left: 0 }}>
      
      {/* HEADER */}
      <header style={{ height: '60px', backgroundColor: '#FFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', borderBottom: '1px solid #E4E4E7', zIndex: 10 }}>
        <h2 style={{ color: '#4F46E5', margin: 0, fontSize: '20px', cursor: 'pointer' }} onClick={() => navigate('/home')}>MentorIA</h2>
        <button onClick={() => navigate('/login')} style={{ backgroundColor: '#EF4444', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Sair</button>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* SIDEBAR */}
        <aside style={{ width: '220px', backgroundColor: '#FFF', borderRight: '1px solid #E4E4E7', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ padding: '10px', borderRadius: '6px', cursor: 'pointer', backgroundColor: '#EEF2FF', color: '#4F46E5', fontWeight: 'bold' }} onClick={() => navigate('/home')}>🏠 Início</div>
          <div style={{ padding: '10px', borderRadius: '6px', cursor: 'pointer', color: '#71717A' }}>📚 Minhas Trilhas</div>
          
          {/* 🎯 BOTÃO CORRIGIDO AQUI: */}
          <div style={{ padding: '10px', borderRadius: '6px', cursor: 'pointer', color: '#71717A' }} onClick={() => navigate('/chat')}>🤖 Mentor IA</div>
          
          <div style={{ padding: '10px', borderRadius: '6px', cursor: 'pointer', color: '#71717A' }}>👤 Perfil</div>
        </aside>

        {/* CONTEÚDO PRINCIPAL DA HOME */}
        <main style={{ flex: 1, padding: '30px', boxSizing: 'border-box', overflowY: 'auto' }}>
          <h3 style={{ fontSize: '24px', color: '#18181B', margin: '0 0 8px 0' }}>Bem-vindo ao MentorIA, Guilherme!</h3>
          <p style={{ color: '#71717A', margin: '0 0 30px 0' }}>Escolha uma das opções na barra lateral ou clique no Mentor IA para iniciar sua mentoria inteligente.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div style={{ backgroundColor: '#FFF', padding: '20px', borderRadius: '8px', border: '1px solid #E4E4E7' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#4F46E5' }}>Últimas Trilhas</h4>
              <p style={{ margin: 0, color: '#71717A', fontSize: '14px' }}>Nenhuma trilha iniciada recentemente.</p>
            </div>
            <div onClick={() => navigate('/chat')} style={{ backgroundColor: '#FFF', padding: '20px', borderRadius: '8px', border: '1px solid #E4E4E7', cursor: 'pointer', transition: 'border-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#4F46E5'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E4E4E7'}>
              <h4 style={{ margin: '0 0 10px 0', color: '#4F46E5' }}>Falar com a IA 🤖</h4>
              <p style={{ margin: 0, color: '#71717A', fontSize: '14px' }}>Clique aqui para abrir o chat de estudos diretamente.</p>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
};

export default Home;