import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cadastro = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (!nome || !email || !senha) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    setErro('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/auth/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.mensagem || 'Erro ao cadastrar');
        return;
      }

      setSucesso('Conta criada com sucesso! Redirecionando...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setErro('Erro ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F3F4F6', fontFamily: 'sans-serif', position: 'fixed', top: 0, left: 0 }}>
      <div style={{ backgroundColor: '#FFF', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px', boxSizing: 'border-box' }}>

        <h2 style={{ textAlign: 'center', color: '#4F46E5', marginBottom: '12px', marginTop: 0 }}>Criar Conta</h2>
        <p style={{ textAlign: 'center', color: '#6B7280', marginBottom: '24px' }}>Cadastre-se no MentorIA para começar</p>

        {erro && (
          <div style={{ backgroundColor: '#FEE2E2', color: '#EF4444', padding: '10px', borderRadius: '4px', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>
            {erro}
          </div>
        )}

        {sucesso && (
          <div style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '10px', borderRadius: '4px', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>
            {sucesso}
          </div>
        )}

        <form onSubmit={handleCadastro} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>Nome Completo</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '14px', outline: 'none' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>E-mail</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu-email@exemplo.com" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '14px', outline: 'none' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>Senha</label>
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="••••••••" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '14px', outline: 'none' }} />
          </div>

          <button type="submit" disabled={loading} style={{ backgroundColor: '#4F46E5', color: '#FFF', border: 'none', padding: '12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', marginTop: '8px' }}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '14px', color: '#6B7280', marginTop: '24px', marginBottom: 0 }}>
          Já tem uma conta?{' '}
          <span onClick={() => navigate('/login')} style={{ color: '#4F46E5', cursor: 'pointer', fontWeight: '500' }}>Faça Login</span>
        </p>

      </div>
    </div>
  );
};

export default Cadastro;