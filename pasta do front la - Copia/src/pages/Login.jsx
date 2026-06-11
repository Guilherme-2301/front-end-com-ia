import React, { useState } from 'react'; // 🎯 Importação explícita do React adicionada para matar o erro!
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Validação simples para permitir o teste
    if (!email || !senha) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    setErro('');
    // Redireciona direto para a Home após o login com sucesso
    navigate('/home');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F3F4F6', fontFamily: 'sans-serif', position: 'fixed', top: 0, left: 0 }}>
      <div style={{ backgroundColor: '#FFF', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px', boxSizing: 'border-box' }}>
        
        <h2 style={{ textAlign: 'center', color: '#4F46E5', marginBottom: '24px', margin_top: 0 }}>MentorIA</h2>
        <p style={{ textAlign: 'center', color: '#6B7280', marginBottom: '24px' }}>Faça login para acessar sua conta</p>

        {erro && (
          <div style={{ backgroundColor: '#FEE2E2', color: '#EF4444', padding: '10px', borderRadius: '4px', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>
            {erro}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu-email@exemplo.com"
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '14px', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '14px', outline: 'none' }}
            />
          </div>

          <button
            type="submit"
            style={{ backgroundColor: '#4F46E5', color: '#FFF', border: 'none', padding: '12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', marginTop: '8px', transition: 'background-color 0.2s' }}
          >
            Entrar
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '14px', color: '#6B7280', marginTop: '24px', marginBottom: 0 }}>
          Não tem uma conta?{' '}
          <span onClick={() => navigate('/cadastro')} style={{ color: '#4F46E5', cursor: 'pointer', fontWeight: '500' }}>
            Cadastre-se
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;