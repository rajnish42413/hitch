import React, { Suspense, useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';

//lazy load
const Ploader = React.lazy(() => import('../../components/loader/PLoader'));
const Button = React.lazy(() => import('antd/lib/button'));
const AuthLayout = React.lazy(() => import('../../layouts/auth'));
const PopMenu = React.lazy(() => import('../home/popMenu'));
const LoginButtons = React.lazy(() => import('../../components/form/LoginButtons'));
const backgroundImage = require('../../assets/images/background-min.jpg');
const logo = require('../../assets/images/pakkijodi-logo.svg');

const Login = (props: any) => {
  const [visible, setVisible] = useState(false);
  const style = {
    background: `url(${backgroundImage}), linear-gradient(180deg, rgba(196, 196, 196, 0) 0%, #000000 78.32%)`,
    backgroundRepeat: 'no-repeat, repeat',
    backgroundSize: 'cover',
    height: '100vh',
    overflow: 'hidden',
  };

  return (
    <Suspense fallback={<Ploader />}>
      <AuthLayout header={false} style={style}>
        <Button
          type="link"
          onClick={() => setVisible(!visible)}
          style={{ float: 'right', padding: 0 }}
        >
          <MenuOutlined style={{ fontSize: '30px', color: '#fff', alignSelf: 'right' }} />
        </Button>

        <div style={{ position: 'relative', top: '7rem' }}>
          <img src={logo} alt="pakki jodi logo" />
          <h4 style={{ fontWeight: 'bold', fontSize: '24px', color: '#fff' }}>Shadi Made Easy</h4>
        </div>

        <LoginButtons />
      </AuthLayout>
      <PopMenu visible={visible} setVisible={(data: boolean) => setVisible(data)} />
    </Suspense>
  );
};

export default Login;
